import { execFile, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { join } from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";

/**
 * tools/deploy-pruefung.mjs entscheidet in der automatischen Auslieferung, welche Worker-Version
 * aktiv ist, ob die Hauptpfade live stimmen und ob auf die vorige Version zurückgesetzt wird.
 * tools/worker-version.sh bricht ohne Zugangsdaten und ohne gültige Version-ID vor jedem
 * Netzaufruf ab. Die Tests laufen ohne Netz und ohne Cloudflare.
 */
const PRUEFUNG = join(process.cwd(), "tools", "deploy-pruefung.mjs");
const VERSION_SH = join(process.cwd(), "tools", "worker-version.sh");
const run = promisify(execFile);

const A = "11111111-2222-4333-8444-555555555555";
const B = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";

function lauf(args: string[], input?: string) {
  return spawnSync("node", [PRUEFUNG, ...args], { encoding: "utf8", input: input ?? "" });
}

describe("aktive-version", () => {
  it("nimmt die Version mit dem größten Anteil im neuesten Deployment", () => {
    const antwort = {
      success: true,
      result: {
        deployments: [
          { created_on: "2026-11-20T10:00:00Z", versions: [{ version_id: B, percentage: 100 }] },
          {
            created_on: "2026-11-22T10:00:00Z",
            versions: [
              { version_id: B, percentage: 10 },
              { version_id: A, percentage: 90 },
            ],
          },
        ],
      },
    };
    const r = lauf(["aktive-version"], JSON.stringify(antwort));
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe(A);
  });

  it("bricht bei API-Fehler, leerer Liste oder ungültiger ID ab", () => {
    expect(lauf(["aktive-version"], '{"success":false,"errors":[{"code":10000}]}').status).toBe(1);
    expect(lauf(["aktive-version"], '{"success":true,"result":{"deployments":[]}}').status).toBe(1);
    const kaputt = { result: { deployments: [{ versions: [{ version_id: "x; rm -rf /" }] }] } };
    expect(lauf(["aktive-version"], JSON.stringify(kaputt)).status).toBe(1);
    expect(lauf(["aktive-version"], "kein json").status).toBe(1);
  });
});

describe("entscheidung", () => {
  const e = (vorher: string, aktuell: string, ergebnis: string) =>
    lauf(["entscheidung", `--vorher=${vorher}`, `--aktuell=${aktuell}`, `--ergebnis=${ergebnis}`]);

  it("kein Rollback, wenn alles bestanden ist", () => {
    expect(e(A, B, "ok").stdout.trim()).toBe("keiner");
  });
  it("Rollback, wenn eine neue Version live und fehlerhaft ist", () => {
    expect(e(A, B, "fehler").stdout.trim()).toBe("rollback");
    // Aktive Version nicht lesbar: sicherheitshalber zurück auf die bekannte vorige.
    expect(e(A, "", "fehler").stdout.trim()).toBe("rollback");
  });
  it("kein Rollback, wenn die aktive Version unverändert ist", () => {
    expect(e(A, A, "fehler").stdout.trim()).toBe("keiner");
  });
  it("unmöglich ohne gültige vorige Version", () => {
    expect(e("", B, "fehler").stdout.trim()).toBe("unmoeglich");
    expect(e("abc", B, "fehler").stdout.trim()).toBe("unmoeglich");
  });
  it("verlangt ein gültiges Ergebnis", () => {
    expect(e(A, B, "vielleicht").status).toBe(2);
  });
});

describe("smoke", () => {
  let server: Server | undefined;
  afterEach(() => server?.close());

  async function starte(
    antwort: (pfad: string) => { status: number; headers?: object; body?: string },
  ) {
    server = createServer((req, res) => {
      const a = antwort(req.url || "/");
      res.writeHead(a.status, { "content-type": "text/html", ...(a.headers || {}) });
      res.end(a.body ?? "");
    });
    await new Promise<void>((ok) => server!.listen(0, "127.0.0.1", ok));
    return `http://127.0.0.1:${(server!.address() as AddressInfo).port}`;
  }

  function gesund(pfad: string) {
    if (pfad === "/teileklar") return { status: 404, headers: { "x-robots-tag": "noindex" } };
    if (pfad === "/.well-known/nexify-build.json")
      return { status: 200, body: JSON.stringify({ commit_short: "abcdef1234" }) };
    return { status: 200, body: "<h1>ok</h1>" };
  }

  it("besteht bei 200 auf den Hauptpfaden, 404+noindex auf /teileklar und passendem Stempel", async () => {
    const base = await starte(gesund);
    const r = await run("node", [
      PRUEFUNG,
      "smoke",
      `--base=${base}`,
      "--commit=abcdef1234",
      "--versuche=1",
      "--markdown",
    ]);
    for (const pfad of [
      "/",
      "/leistungen",
      "/kontakt",
      "/impressum",
      "/datenschutz",
      "/regionen",
      "/teileklar",
    ])
      expect(r.stdout).toContain(`\`${pfad}\``);
    expect(r.stdout).not.toContain("FEHLER");
  });

  it("schlägt fehl bei 500, fehlendem noindex oder falschem Stempel", async () => {
    const base = await starte((pfad) => {
      if (pfad === "/kontakt") return { status: 500 };
      if (pfad === "/teileklar") return { status: 404 };
      return gesund(pfad);
    });
    const fehler = await run("node", [
      PRUEFUNG,
      "smoke",
      `--base=${base}`,
      "--commit=0000000000",
      "--versuche=1",
    ]).then(
      () => null,
      (e: { code: number; stdout: string }) => e,
    );
    expect(fehler?.code).toBe(1);
    expect(fehler?.stdout).toContain("SMOKE FAIL /kontakt 500");
    expect(fehler?.stdout).toContain("SMOKE FAIL /teileklar 404");
    expect(fehler?.stdout).toContain("live=abcdef1234 erwartet=0000000000");
  });

  it("wertet eine Weiterleitung nicht als Erfolg", async () => {
    const base = await starte((pfad) =>
      pfad === "/impressum" ? { status: 302, headers: { location: "/" } } : gesund(pfad),
    );
    const fehler = await run("node", [PRUEFUNG, "smoke", `--base=${base}`, "--versuche=1"]).then(
      () => null,
      (e: { code: number; stdout: string }) => e,
    );
    expect(fehler?.code).toBe(1);
    expect(fehler?.stdout).toContain("SMOKE FAIL /impressum 302");
  });
});

describe("worker-version.sh", () => {
  const ohneZugang = { PATH: process.env["PATH"] ?? "", HOME: process.env["HOME"] ?? "" };

  // Auf dem Server lädt das Skript /etc/nexifyai/hermes.env; dort entfällt dieser Fall.
  it.skipIf(existsSync("/etc/nexifyai/hermes.env"))("bricht ohne Zugangsdaten ab", () => {
    const r = spawnSync("bash", [VERSION_SH, "aktiv"], { encoding: "utf8", env: ohneZugang });
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("Zugangsdaten fehlen");
  });

  it("verlangt für rollback eine Version-ID (UUID)", () => {
    const env = { ...ohneZugang, CLOUDFLARE_API_TOKEN: "dummy", CLOUDFLARE_ACCOUNT_ID: "dummy" };
    for (const id of ["", "latest", "1234", `${A}; echo x`]) {
      const r = spawnSync("bash", [VERSION_SH, "rollback", id], { encoding: "utf8", env });
      expect(r.status).toBe(2);
    }
  });
});
