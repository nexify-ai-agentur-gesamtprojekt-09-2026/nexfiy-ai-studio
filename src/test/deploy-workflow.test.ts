import { spawnSync } from "node:child_process";
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

/**
 * Schritte aus .github/workflows/deploy-live.yml, die über den Erfolg eines Rückwegs oder die
 * Aussage im Fehler-Issue entscheiden. Die `run:`-Blöcke werden wörtlich aus der Workflow-Datei
 * gelesen und mit bash ausgeführt; `gh` und `curl` sind Stubs.
 */
const WURZEL = process.cwd();
const DEPLOY = readFileSync(join(WURZEL, ".github", "workflows", "deploy-live.yml"), "utf8");
const CI = readFileSync(join(WURZEL, ".github", "workflows", "ci.yml"), "utf8");
const SHA = "abcdef1234567890abcdef1234567890abcdef12";
const ANDERER = "8d73146aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

const ordner: string[] = [];
afterEach(() => {
  for (const o of ordner.splice(0)) rmSync(o, { recursive: true, force: true });
});
function tmp(name: string) {
  const o = mkdtempSync(join(tmpdir(), name));
  ordner.push(o);
  return o;
}

/** Zeilen eines Jobs (Einrückung 2 unter `jobs:`). */
function jobZeilen(text: string, job: string) {
  const zeilen = text.split("\n");
  const start = zeilen.findIndex((z) => z === `  ${job}:`);
  if (start < 0) throw new Error(`Job ${job} fehlt`);
  const ende = zeilen.findIndex((z, i) => i > start && /^ {2}\S/.test(z));
  return zeilen.slice(start + 1, ende < 0 ? undefined : ende);
}

/** Namen der Schritte eines Jobs, in Reihenfolge. */
function schrittNamen(text: string, job: string) {
  return jobZeilen(text, job)
    .map((z) => /^ {6}- name: (.+)$/.exec(z)?.[1])
    .filter((n): n is string => Boolean(n));
}

/** Der `run: |`-Block eines Schritts, ohne Einrückung. */
function runBlock(text: string, job: string, schritt: string) {
  const zeilen = jobZeilen(text, job);
  const start = zeilen.findIndex((z) => z === `      - name: ${schritt}`);
  if (start < 0) throw new Error(`Schritt ${schritt} fehlt in ${job}`);
  let i = start + 1;
  while (i < zeilen.length && zeilen[i] !== "        run: |") {
    if (/^ {6}- /.test(zeilen[i] ?? "")) throw new Error(`Schritt ${schritt} ohne run-Block`);
    i++;
  }
  const block: string[] = [];
  for (i++; i < zeilen.length; i++) {
    const z = zeilen[i] ?? "";
    if (z.trim() && !z.startsWith("          ")) break;
    block.push(z.slice(10));
  }
  return block.join("\n");
}

function bash(skript: string, cwd: string, env: Record<string, string>) {
  const r = spawnSync("bash", ["-c", skript], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, ...env },
  });
  return { code: r.status, aus: `${r.stdout}${r.stderr}` };
}

describe("Deploy live: Job bauen prüft wie ci.yml", () => {
  it("dieselben Prüfschritte in derselben Reihenfolge (auch Skripte (Syntax))", () => {
    const pruef = [
      "Unternehmensstandard",
      "Abhängigkeiten installieren",
      "Skripte (Syntax)",
      "Lint",
      "Typprüfung",
      "Tests (Quellen)",
      "Build",
    ];
    const ci = schrittNamen(CI, "pruefen").filter((n) => pruef.includes(n));
    const bauen = schrittNamen(DEPLOY, "bauen").filter((n) => pruef.includes(n));
    expect(ci).toEqual(pruef);
    expect(bauen).toEqual(pruef);
  });

  it("Syntaxprüfung legt kein __pycache__ an (sonst erschiene der Stempel als geändert)", () => {
    for (const block of [
      runBlock(DEPLOY, "bauen", "Skripte (Syntax)"),
      runBlock(CI, "pruefen", "Skripte (Syntax)"),
    ]) {
      expect(block).not.toContain("-m py_compile");
    }
    const app = tmp("syntax-");
    mkdirSync(join(app, "tools"));
    copyFileSync(
      join(WURZEL, "tools", "wrangler-config.py"),
      join(app, "tools", "wrangler-config.py"),
    );
    copyFileSync(join(WURZEL, "tools", "deploy-live.sh"), join(app, "tools", "deploy-live.sh"));
    copyFileSync(join(WURZEL, "tools", "live-check.mjs"), join(app, "tools", "live-check.mjs"));
    const r = bash(runBlock(DEPLOY, "bauen", "Skripte (Syntax)"), app, {});
    expect(r.aus).toContain("python3 compile OK");
    expect(r.code).toBe(0);
    expect(existsSync(join(app, "tools", "__pycache__"))).toBe(false);

    // Gegenprobe: ein Syntaxfehler hält den Schritt rot.
    writeFileSync(join(app, "tools", "kaputt.sh"), "if then\n");
    expect(bash(runBlock(DEPLOY, "bauen", "Skripte (Syntax)"), app, {}).code).not.toBe(0);
  });
});

describe("Deploy live: Unternehmensstandard beim Rückweg auf ältere main-Commits", () => {
  const SCHRITT = () => runBlock(DEPLOY, "bauen", "Unternehmensstandard");
  const git = (root: string, ...args: string[]) => {
    const r = spawnSync(
      "git",
      ["-C", root, "-c", "user.name=t", "-c", "user.email=t@example.invalid", ...args],
      { encoding: "utf8" },
    );
    expect(r.status, r.stderr).toBe(0);
    return r.stdout.trim();
  };

  /** Repository mit einem Werkzeug-Commit (enthält die Prüfung) und einem Anwendungsstand. */
  function repoMit(app: Record<string, string>) {
    const root = tmp("rueckweg-");
    git(root, "init", "-q");
    mkdirSync(join(root, "tools"));
    copyFileSync(
      join(WURZEL, "tools", "standard-pruefung.mjs"),
      join(root, "tools", "standard-pruefung.mjs"),
    );
    git(root, "add", "-A");
    git(root, "commit", "-qm", "werkzeug");
    const werkzeug = git(root, "rev-parse", "HEAD");
    git(root, "rm", "-rq", "tools");
    for (const [pfad, inhalt] of Object.entries(app)) writeFileSync(join(root, pfad), inhalt);
    git(root, "add", "-A");
    git(root, "commit", "-qm", "anwendung");
    const soll = git(root, "rev-parse", "HEAD");
    const temp = tmp("runner-");
    const summary = join(temp, "summary.md");
    writeFileSync(summary, "");
    const env = { SOLL: soll, WERKZEUG: werkzeug, RUNNER_TEMP: temp, GITHUB_STEP_SUMMARY: summary };
    return { root, env, summary };
  }

  const ALT_PAKET = JSON.stringify({ name: "alt", scripts: { build: "vite build" } });

  it("Stand ohne Skript standard (z. B. 8d73146): Geheimnisprüfung aus dem Werkzeug, Warnung", () => {
    // Ohne Pflichtdoku und mit eingecheckter Sitemap wie im damaligen Stand.
    const u = repoMit({ "package.json": ALT_PAKET, "README.md": "# alt\n", "sitemap.xml": "<x/>" });
    const r = bash(SCHRITT(), u.root, u.env);
    expect(r.aus).toContain("::warning title=Unternehmensstandard::");
    expect(r.aus).toContain("Standard-Prüfung (nur Geheimnisse) bestanden");
    expect(r.code).toBe(0);
    expect(readFileSync(u.summary, "utf8")).toContain("älter als der Standard");
  });

  it("Gegenprobe: ein Token im alten Stand hält den Schritt rot", () => {
    const token = ["gh", "p_", "c".repeat(36)].join("");
    const u = repoMit({ "package.json": ALT_PAKET, "notiz.md": `T=${token}\n` });
    const r = bash(SCHRITT(), u.root, u.env);
    expect(r.code).toBe(1);
    expect(r.aus).toContain("[keine-tokens] notiz.md:1");
    expect(r.aus).not.toContain(token);
  });

  it("Gegenprobe: ohne Prüfung im Werkzeug-Stand bricht der Schritt ab", () => {
    const u = repoMit({ "package.json": ALT_PAKET });
    const r = bash(SCHRITT(), u.root, { ...u.env, WERKZEUG: u.env.SOLL });
    expect(r.code).toBe(1);
    expect(r.aus).toContain("fehlt im Werkzeug-Stand");
  });

  it("Stand mit Skript standard: dessen eigener Standard läuft, keine Warnung", () => {
    const paket = JSON.stringify({
      name: "neu",
      scripts: { standard: "node -e \"console.log('EIGENER STANDARD')\"" },
    });
    const u = repoMit({ "package.json": paket });
    const r = bash(SCHRITT(), u.root, u.env);
    expect(r.code).toBe(0);
    expect(r.aus).toContain("EIGENER STANDARD");
    expect(r.aus).not.toContain("::warning");
  });
});

describe("Deploy live: Lage im Fehler-Issue", () => {
  const SCHRITT = () =>
    runBlock(DEPLOY, "melden", "Issue anlegen oder ergänzen (Label deploy-fehler)");

  function melden(env: Record<string, string>, stempel: string | null) {
    const basis = tmp("melden-");
    const bin = join(basis, "bin");
    mkdirSync(bin);
    const log = join(basis, "aufrufe.log");
    // gh: kein offenes Issue; create/comment werden nur protokolliert.
    writeFileSync(join(bin, "gh"), `#!/usr/bin/env bash\necho "gh $*" >> "${log}"\nexit 0\n`);
    // curl: liefert den Stempel oder scheitert (nicht erreichbar).
    writeFileSync(
      join(bin, "curl"),
      stempel === null
        ? `#!/usr/bin/env bash\necho "curl $*" >> "${log}"\nexit 7\n`
        : `#!/usr/bin/env bash\necho "curl $*" >> "${log}"\nprintf '%s' '${stempel}'\n`,
    );
    chmodSync(join(bin, "gh"), 0o755);
    chmodSync(join(bin, "curl"), 0o755);
    const r = bash(SCHRITT(), basis, {
      PATH: `${bin}:${process.env["PATH"]}`,
      LAUF: "https://example.invalid/run/1",
      ANLASS: "push",
      SHA,
      BETREFF: "Betreff",
      J_AUFLOESEN: "success",
      J_BAUEN: "success",
      J_DEPLOY: "failure",
      VORHER: "",
      NACHHER: "",
      ERGEBNIS: "",
      ENTSCHEIDUNG: "",
      ROLLBACK: "",
      STEMPEL_URL: "https://example.invalid/.well-known/nexify-build.json",
      ...env,
    });
    expect(r.code, r.aus).toBe(0);
    return {
      bericht: readFileSync(join(basis, "bericht.md"), "utf8"),
      log: existsSync(log) ? readFileSync(log, "utf8") : "",
    };
  }

  it("deploy ohne Ergebnis (z. B. Zeitlimit nach wrangler deploy): Ergebnis unbekannt, Stempel gelesen", () => {
    const m = melden({}, JSON.stringify({ commit: SHA }));
    expect(m.bericht).toContain("Ergebnis unbekannt");
    expect(m.bericht).not.toContain("live ist unverändert");
    expect(m.bericht).toContain("= auszuliefernder Commit");
    expect(m.log).toContain("curl ");
    expect(m.log).toContain("gh issue create");
  });

  it("deploy ohne Ergebnis, live meldet anderen Commit: vermutlich unverändert", () => {
    const m = melden({}, JSON.stringify({ commit: ANDERER }));
    expect(m.bericht).toContain("Ergebnis unbekannt");
    expect(m.bericht).toContain("`8d73146aaa`, nicht der auszuliefernde Commit");
  });

  it("Stempel nicht erreichbar oder fremder Inhalt: nicht lesbar, nichts übernommen", () => {
    expect(melden({}, null).bericht).toContain("| nicht lesbar |");
    const fremd = melden({}, JSON.stringify({ commit: "`| @someone [x](y)" }));
    expect(fremd.bericht).toContain("| nicht lesbar |");
    expect(fremd.bericht).not.toContain("@someone");
  });

  it("deploy übersprungen (bauen rot): vor dem Deploy abgebrochen, kein Stempel-Abruf", () => {
    const m = melden({ J_BAUEN: "failure", J_DEPLOY: "skipped" }, JSON.stringify({ commit: SHA }));
    expect(m.bericht).toContain("Vor dem Deploy abgebrochen");
    expect(m.log).not.toContain("curl ");
  });

  it("gelungener Rollback bleibt eindeutig", () => {
    const m = melden(
      { ERGEBNIS: "fehler", ENTSCHEIDUNG: "rollback", ROLLBACK: "ok" },
      JSON.stringify({ commit: SHA }),
    );
    expect(m.bericht).toContain("Rollback auf die vorige Worker-Version ist erfolgt");
    expect(m.log).not.toContain("curl ");
  });
});

describe("Deploy live: Zugangsdaten", () => {
  it("Token und Konto-ID stehen im Probelauf (dry_run) nicht in der Umgebung", () => {
    const zeilen = jobZeilen(DEPLOY, "deploy").filter((z) =>
      /^ {10}CLOUDFLARE_(API_TOKEN|ACCOUNT_ID):/.test(z),
    );
    expect(zeilen).toHaveLength(2);
    for (const z of zeilen)
      expect(z).toMatch(/\$\{\{ inputs\.dry_run != true && \(.+\) \|\| '' \}\}$/);
  });

  it("deploy-live.sh ruft python3 nur isoliert (-I) auf", () => {
    const skript = readFileSync(join(WURZEL, "tools", "deploy-live.sh"), "utf8");
    const aufrufe = skript.split("\n").filter((z) => /(^|[|;(]\s*)python3\b/.test(z.trim()));
    expect(aufrufe.length).toBeGreaterThanOrEqual(5);
    for (const z of aufrufe) expect(z).toMatch(/python3 -I\b/);
  });
});
