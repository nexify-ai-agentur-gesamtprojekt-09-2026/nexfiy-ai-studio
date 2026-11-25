// @vitest-environment node
import { execFile, spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

/**
 * Ablauf von tools/deploy-live.sh mit Rückweg-Anker, Smoke-Test und automatischem Rollback,
 * ohne Cloudflare: `npx` (Wrangler) und die Cloudflare-API in `curl` sind durch Stubs ersetzt,
 * die Live-Seite ist ein lokaler Server (LIVE_BASE). Der Stub merkt sich die aktive Version in
 * einer Datei; `wrangler deploy` setzt sie auf NEU, `wrangler rollback <ID>` auf <ID>.
 */
const SKRIPT = join(process.cwd(), "tools", "deploy-live.sh");
const ALT = "11111111-2222-4333-8444-555555555555";
const NEU = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
const SHA = "abcdef1234567890abcdef1234567890abcdef12";
const ordner: string[] = [];
let server: Server | undefined;

afterEach(() => {
  server?.close();
  server = undefined;
  for (const o of ordner.splice(0)) rmSync(o, { recursive: true, force: true });
});

function umgebung(deployOk: boolean) {
  const basis = mkdtempSync(join(tmpdir(), "deploy-ablauf-"));
  ordner.push(basis);
  const app = join(basis, "app");
  mkdirSync(join(app, ".output", "server"), { recursive: true });
  mkdirSync(join(app, ".output", "public", ".well-known"), { recursive: true });
  writeFileSync(join(app, ".output", "server", "index.mjs"), "export default {};\n");
  writeFileSync(
    join(app, ".output", "server", "wrangler.json"),
    JSON.stringify({
      name: "nexfiy-ai-studio",
      main: "index.mjs",
      compatibility_date: "2026-11-22",
      no_bundle: true,
      assets: { binding: "ASSETS", directory: "../public" },
    }),
  );
  const status = join(basis, "status.txt");
  writeFileSync(status, "");
  const aktiv = join(basis, "aktiv");
  writeFileSync(aktiv, ALT);
  const log = join(basis, "aufrufe.log");
  const bin = join(basis, "bin");
  mkdirSync(bin);
  writeFileSync(
    join(bin, "npx"),
    `#!/usr/bin/env bash
echo "npx $*" >> "${log}"
for a in "$@"; do
  case "$a" in
    deploy) ${deployOk ? `echo "${NEU}" > "${aktiv}"; exit 0` : "exit 1"} ;;
    rollback) shift_next=1 ;;
  esac
done
if printf '%s ' "$@" | grep -q ' rollback '; then
  id="$(printf '%s\\n' "$@" | grep -Ex '[0-9a-f-]{36}' | head -1)"
  echo "$id" > "${aktiv}"
fi
exit 0
`,
  );
  const echtesCurl = spawnSync("bash", ["-c", "command -v curl"], {
    encoding: "utf8",
  }).stdout.trim();
  writeFileSync(
    join(bin, "curl"),
    `#!/usr/bin/env bash
url="\${!#}"
case "$url" in
  https://api.cloudflare.com/*/settings)
    cat >/dev/null; echo '{"success":true,"result":{"bindings":[{"name":"DB","type":"d1"}]}}' ;;
  https://api.cloudflare.com/*/deployments)
    cat >/dev/null
    echo "{\\"success\\":true,\\"result\\":{\\"deployments\\":[{\\"created_on\\":\\"2026-11-23T00:00:00Z\\",\\"versions\\":[{\\"version_id\\":\\"$(cat "${aktiv}")\\",\\"percentage\\":100}]}]}}" ;;
  https://*) echo "unerwartete Adresse $url" >&2; exit 7 ;;
  *) exec "${echtesCurl}" "$@" ;;
esac
`,
  );
  chmodSync(join(bin, "npx"), 0o755);
  chmodSync(join(bin, "curl"), 0o755);
  return { app, status, aktiv, log, bin };
}

async function liveSeite(kaputt: string | null, commit: string) {
  server = createServer((req, res) => {
    const pfad = req.url || "/";
    if (pfad === "/.well-known/nexify-build.json") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ commit_short: commit.slice(0, 10) }));
    } else if (pfad === "/teileklar") {
      res.writeHead(404, { "x-robots-tag": "noindex" });
      res.end();
    } else {
      res.writeHead(pfad === kaputt ? 500 : 200);
      res.end("<h1>ok</h1>");
    }
  });
  await new Promise<void>((ok) => server!.listen(0, "127.0.0.1", ok));
  return `http://127.0.0.1:${(server!.address() as AddressInfo).port}`;
}

function starte(u: ReturnType<typeof umgebung>, base: string) {
  return new Promise<{ code: number; stdout: string; stderr: string }>((ok) => {
    execFile(
      "bash",
      [SKRIPT, "--skip-build"],
      {
        encoding: "utf8",
        timeout: 60000,
        env: {
          PATH: `${u.bin}:${process.env["PATH"] ?? ""}`,
          HOME: process.env["HOME"] ?? "",
          CLOUDFLARE_API_TOKEN: "dummy",
          CLOUDFLARE_ACCOUNT_ID: "dummy",
          DEPLOY_APP_DIR: u.app,
          DEPLOY_COMMIT: SHA,
          DEPLOY_COMMIT_SUBJECT: "Test",
          DEPLOY_WORKTREE_STATUS_FILE: u.status,
          DEPLOY_HOST: "test",
          LIVE_BASE: base,
          SMOKE_VERSUCHE: "1",
          SMOKE_PAUSE_MS: "0",
        },
      },
      (fehler, stdout, stderr) =>
        ok({ code: fehler ? Number((fehler as { code?: number }).code ?? 1) : 0, stdout, stderr }),
    );
  });
}

// Auf dem Server lädt das Skript /etc/nexifyai/hermes.env mit echten Zugangsdaten; dort nie.
describe.skipIf(existsSync("/etc/nexifyai/hermes.env"))("deploy-live.sh Ablauf", () => {
  it("liefert aus und setzt nichts zurück, wenn alle Prüfungen bestehen", async () => {
    const u = umgebung(true);
    const r = await starte(u, await liveSeite(null, SHA));
    expect(r.code).toBe(0);
    expect(r.stdout).toContain("AUSLIEFERUNG OK");
    expect(r.stdout).toContain(`| Worker-Version vorher | \`${ALT}\` |`);
    expect(r.stdout).toContain(`| Worker-Version nachher | \`${NEU}\` |`);
    expect(readFileSync(u.log, "utf8")).not.toContain("rollback");
    const stempel = JSON.parse(
      readFileSync(join(u.app, ".output", "public", ".well-known", "nexify-build.json"), "utf8"),
    );
    expect(stempel.commit).toBe(SHA);
  }, 70000);

  it("setzt bei fehlgeschlagenem Smoke-Test automatisch auf die vorige Version zurück", async () => {
    const u = umgebung(true);
    const r = await starte(u, await liveSeite("/kontakt", SHA));
    expect(r.code).toBe(1);
    expect(r.stdout).toContain("| Smoke-Test | fehler |");
    expect(r.stdout).toContain("| Rollback-Entscheidung | rollback |");
    expect(r.stdout).toContain("| Rollback | ok |");
    expect(readFileSync(u.log, "utf8")).toMatch(
      new RegExp(`rollback ${ALT} --name nexfiy-ai-studio`),
    );
    expect(readFileSync(u.aktiv, "utf8").trim()).toBe(ALT);
  }, 70000);

  it("setzt bei falschem Readback zurück", async () => {
    const u = umgebung(true);
    const r = await starte(u, await liveSeite(null, "0".repeat(40)));
    expect(r.code).toBe(1);
    expect(r.stdout).toContain("| Readback Stempel | fehler |");
    expect(readFileSync(u.aktiv, "utf8").trim()).toBe(ALT);
  }, 70000);

  it("setzt nicht zurück, wenn wrangler deploy nichts ausgeliefert hat", async () => {
    const u = umgebung(false);
    const r = await starte(u, await liveSeite(null, SHA));
    expect(r.code).toBe(1);
    expect(r.stdout).toContain("| wrangler deploy | fehler |");
    expect(r.stdout).toContain("| Rollback-Entscheidung | keiner |");
    expect(readFileSync(u.log, "utf8")).not.toContain("rollback");
  }, 70000);

  it("liefert ohne lesbaren Rückweg-Anker nicht aus", async () => {
    const u = umgebung(true);
    writeFileSync(u.aktiv, "kaputt");
    const r = await starte(u, await liveSeite(null, SHA));
    expect(r.code).toBe(1);
    expect(r.stderr).toContain("ohne Rückweg-Anker kein Deploy");
    expect(existsSync(u.log) ? readFileSync(u.log, "utf8") : "").not.toMatch(/ deploy /);
  }, 70000);
});

describe("deploy-live.sh Eingaben", () => {
  it("lehnt unbekannte Optionen ab", () => {
    const r = spawnSync("bash", [SKRIPT, "--irgendwas"], { encoding: "utf8" });
    expect(r.status).toBe(2);
  });
  it("lehnt einen WORKERS_CI_COMMIT_SHA ab, der nicht dem Checkout entspricht", () => {
    const r = spawnSync("bash", [SKRIPT, "--dry-run", "--skip-build"], {
      encoding: "utf8",
      env: {
        ...process.env,
        WORKERS_CI: "1",
        WORKERS_CI_COMMIT_SHA: "0".repeat(40),
        DEPLOY_COMMIT: "",
      },
    });
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("WORKERS_CI_COMMIT_SHA meldet");
  });
  it("lehnt einen unvollständigen Commit ab", () => {
    const r = spawnSync("bash", [SKRIPT, "--dry-run"], {
      encoding: "utf8",
      env: { ...process.env, DEPLOY_COMMIT: "abc123" },
    });
    expect(r.status).toBe(1);
  });
});
