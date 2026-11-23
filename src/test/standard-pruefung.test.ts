import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

/**
 * tools/standard-pruefung.mjs setzt docs/unternehmensstandard.md in der CI durch. Jede Regel wird
 * an einem kleinen, regelkonformen Beispiel-Repository geprüft und dann mit genau einem Verstoß
 * gegengeprüft: die Prüfung muss scheitern und die Regel nennen.
 */
const PRUEFUNG = join(process.cwd(), "tools", "standard-pruefung.mjs");

// Token-Beispiele zur Laufzeit zusammengesetzt, damit das Repository selbst keines enthält.
const z = (...teile: string[]) => teile.join("");
const FAKE = {
  cfat: z("cf", "at_", "A".repeat(40)),
  cfut: z("cf", "ut_", "B".repeat(40)),
  ghp: z("gh", "p_", "c".repeat(36)),
  pat: z("github", "_pat_", "D".repeat(30)),
  sk: z("s", "k-", "e".repeat(32)),
  pem: z("-----BEGIN ", "RSA PRIVATE", " KEY-----"),
};

const SHA = "3d3c42e5aac5ba805825da76410c181273ba90b1";

const CI = `name: CI
on:
  pull_request:
    branches: [main]
permissions:
  contents: read
jobs:
  pruefen:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      code-quality: write
    steps:
      - uses: actions/checkout@${SHA} # v7.0.1
        with:
          persist-credentials: false
      - uses: actions/setup-node@${SHA}
        with:
          node-version: "22"
      - run: npm run standard
      - uses: oven-sh/setup-bun@${SHA}
        with:
          bun-version: "1.4.4"
`;

const DEVCONTAINER = `// Kommentar
{
  "image": "mcr.microsoft.com/devcontainers/javascript-node:22",
  "onCreateCommand": "curl -fsSL https://bun.sh/install | bash -s 'bun-v1.4.4'"
}
`;

const DEPENDABOT = `version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
  - package-ecosystem: "bun"
    directory: "/"
`;

function grundbestand(): Record<string, string> {
  return {
    "AGENTS.md": "# Regeln\n",
    "README.md": "# Projekt\nDie task-force arbeitet am desk-top; sk-kurz ist kein Schlüssel.\n",
    "SECURITY.md": "# Sicherheit\n",
    "docs/unternehmensstandard.md":
      "# Standard\nPräfixe cfat_, cfut_, ghp_, github_pat_, sk- sind verboten.\n",
    "docs/auslieferung.md": "# Auslieferung\n",
    "docs/codespaces.md": "# Codespaces\n",
    ".github/dependabot.yml": DEPENDABOT,
    ".github/workflows/ci.yml": CI,
    ".devcontainer/devcontainer.json": DEVCONTAINER,
    "public/robots.txt": "User-agent: *\n",
  };
}

const ordner: string[] = [];
afterEach(() => {
  while (ordner.length) rmSync(ordner.pop()!, { recursive: true, force: true });
});

function repo(dateien: Record<string, string | null>) {
  const root = mkdtempSync(join(tmpdir(), "standard-"));
  ordner.push(root);
  for (const [pfad, inhalt] of Object.entries(dateien)) {
    if (inhalt === null) continue;
    mkdirSync(dirname(join(root, pfad)), { recursive: true });
    writeFileSync(join(root, pfad), inhalt);
  }
  return root;
}

function pruefe(root: string) {
  const r = spawnSync("node", [PRUEFUNG, `--root=${root}`], { encoding: "utf8" });
  return { code: r.status, aus: `${r.stdout}${r.stderr}` };
}

function mitAenderung(aenderung: Record<string, string | null>) {
  return pruefe(repo({ ...grundbestand(), ...aenderung }));
}

describe("Unternehmensstandard im Repository", () => {
  it("dieses Repository erfüllt den Standard", () => {
    const r = pruefe(process.cwd());
    expect(r.aus).toContain("Standard-Prüfung bestanden");
    expect(r.code).toBe(0);
  });
});

describe("Standard-Prüfung an Beispielen", () => {
  it("ein regelkonformes Beispiel besteht (normale Wörter mit sk- schlagen nicht an)", () => {
    const r = mitAenderung({});
    expect(r.aus).toContain("Standard-Prüfung bestanden");
    expect(r.code).toBe(0);
  });

  const faelle: [string, Record<string, string | null>, string][] = [
    ["fehlende Pflichtdoku", { "SECURITY.md": null }, "[pflicht-doku] SECURITY.md"],
    [
      "fehlender Standard",
      { "docs/unternehmensstandard.md": null },
      "[pflicht-doku] docs/unternehmensstandard.md",
    ],
    [
      "fehlendes dependabot.yml",
      { ".github/dependabot.yml": null },
      "[pflicht-doku] .github/dependabot.yml",
    ],
    ["versionierte .env", { ".env": "A=1\n" }, "[keine-geheimnisdateien] .env"],
    [
      "versionierte .env.production",
      { "app/.env.production": "A=1\n" },
      "[keine-geheimnisdateien] app/.env.production",
    ],
    ["versionierte .dev.vars", { ".dev.vars": "A=1\n" }, "[keine-geheimnisdateien] .dev.vars"],
    ["Schlüsseldatei", { "certs/server.key": "x\n" }, "[keine-geheimnisdateien] certs/server.key"],
    ["SSH-Schlüssel", { id_ed25519: "x\n" }, "[keine-geheimnisdateien] id_ed25519"],
    [
      "eingecheckte Sitemap",
      { "public/sitemap.xml": "<urlset/>\n" },
      "[sitemap-nicht-eingecheckt]",
    ],
    [
      "Cloudflare-Account-Token",
      { "notiz.md": `token ${FAKE.cfat}\n` },
      "[keine-tokens] notiz.md:1",
    ],
    [
      "Cloudflare-User-Token",
      { "src/a.ts": `\n\nconst t = "${FAKE.cfut}";\n` },
      "[keine-tokens] src/a.ts:3",
    ],
    ["GitHub-Token", { "x.sh": `export T=${FAKE.ghp}\n` }, "[keine-tokens] x.sh:1"],
    ["Fine-grained-Token", { "x.json": `{"t":"${FAKE.pat}"}\n` }, "[keine-tokens] x.json:1"],
    ["sk-Schlüssel", { "x.env.txt": `KEY=${FAKE.sk}\n` }, "[keine-tokens] x.env.txt:1"],
    ["privater Schlüssel", { "x.txt": `${FAKE.pem}\nabc\n` }, "[keine-tokens] x.txt:1"],
    [
      "Action per Tag",
      {
        ".github/workflows/ci.yml": CI.replace(
          `actions/setup-node@${SHA}`,
          "actions/setup-node@v4",
        ),
      },
      "[actions-gepinnt] .github/workflows/ci.yml:17",
    ],
    [
      "Action per Kurz-SHA",
      {
        ".github/workflows/ci.yml": CI.replace(
          `oven-sh/setup-bun@${SHA}`,
          "oven-sh/setup-bun@3d3c42e",
        ),
      },
      "[actions-gepinnt]",
    ],
    [
      "Container ohne Digest",
      {
        ".github/workflows/b.yml": CI.replace(`actions/setup-node@${SHA}`, "docker://alpine:3"),
      },
      "[actions-gepinnt] .github/workflows/b.yml",
    ],
    [
      "Workflow ohne permissions",
      { ".github/workflows/ci.yml": CI.replace("permissions:\n  contents: read\njobs:", "jobs:") },
      "[permissions-workflow]",
    ],
    [
      "Schreibrecht auf oberster Ebene",
      {
        ".github/workflows/ci.yml": CI.replace(
          "permissions:\n  contents: read\njobs:",
          "permissions:\n  contents: write\njobs:",
        ),
      },
      "[permissions-workflow]",
    ],
    [
      "write-all auf oberster Ebene",
      {
        ".github/workflows/ci.yml": CI.replace(
          "permissions:\n  contents: read\njobs:",
          "permissions: write-all\njobs:",
        ),
      },
      "[permissions-workflow]",
    ],
    [
      "Job ohne permissions",
      {
        ".github/workflows/ci.yml": CI.replace(
          "    permissions:\n      contents: read\n      code-quality: write\n",
          "",
        ),
      },
      "Job `pruefen` ohne `permissions:`",
    ],
    [
      "Job mit write-all",
      {
        ".github/workflows/ci.yml": CI.replace(
          "    permissions:\n      contents: read\n      code-quality: write\n",
          "    permissions: write-all\n",
        ),
      },
      "Job `pruefen`: write-all",
    ],
    [
      "Checkout mit gespeicherten Zugangsdaten",
      {
        ".github/workflows/ci.yml": CI.replace(
          "        with:\n          persist-credentials: false\n",
          "",
        ),
      },
      "[checkout-ohne-credentials] .github/workflows/ci.yml:14",
    ],
    [
      "pull_request_target",
      { ".github/workflows/ci.yml": CI.replace("  pull_request:\n", "  pull_request_target:\n") },
      "[kein-pull-request-target]",
    ],
    [
      "CI ohne Standard-Schritt",
      { ".github/workflows/ci.yml": CI.replace("      - run: npm run standard\n", "") },
      "[ci-ruft-standard]",
    ],
    [
      "abweichende Node-Version",
      { ".github/workflows/ci.yml": CI.replace('node-version: "22"', 'node-version: "20"') },
      "[versionen-gleich] .github/workflows/ci.yml:19: Node 20, Dev-Container 22",
    ],
    [
      "abweichende Bun-Version",
      { ".devcontainer/devcontainer.json": DEVCONTAINER.replace("bun-v1.4.4", "bun-v1.5.0") },
      "Bun 1.4.4, Dev-Container 1.5.0",
    ],
    [
      "Dependabot ohne Actions",
      { ".github/dependabot.yml": DEPENDABOT.replace('"github-actions"', '"docker"') },
      "[dependabot] .github/dependabot.yml: Ökosystem github-actions fehlt",
    ],
    [
      "Dependabot ohne Pakete",
      { ".github/dependabot.yml": DEPENDABOT.replace('"bun"', '"pip"') },
      "Ökosystem npm/bun fehlt",
    ],
  ];

  it.each(faelle)("erkennt: %s", (_name, aenderung, erwartet) => {
    const r = mitAenderung(aenderung);
    expect(r.code).toBe(1);
    expect(r.aus).toContain(erwartet);
  });

  it("gibt gefundene Token-Werte nie aus", () => {
    const r = mitAenderung({ "notiz.md": `${FAKE.ghp} ${FAKE.cfat}\n` });
    expect(r.code).toBe(1);
    expect(r.aus).not.toContain(FAKE.ghp);
    expect(r.aus).not.toContain(FAKE.cfat);
  });

  it("überspringt node_modules, .output und Binärdateien", () => {
    const r = mitAenderung({
      "node_modules/x/.env": "A=1\n",
      ".output/public/sitemap.xml": "<urlset/>\n",
      "public/bild.bin": `\0\0${FAKE.ghp}`,
    });
    expect(r.aus).toContain("Standard-Prüfung bestanden");
    expect(r.code).toBe(0);
  });
});

describe("Standard-Prüfung im Git-Arbeitsbaum", () => {
  const git = (root: string, ...args: string[]) =>
    spawnSync(
      "git",
      ["-C", root, "-c", "user.name=t", "-c", "user.email=t@example.invalid", ...args],
      {
        encoding: "utf8",
      },
    );

  it("ignorierte Build-Sitemap zählt nicht, versionierte schon", () => {
    const root = repo({
      ...grundbestand(),
      ".gitignore": "/public/sitemap.xml\n",
      "public/sitemap.xml": "<urlset/>\n",
    });
    expect(git(root, "init", "-q").status).toBe(0);
    expect(git(root, "add", "-A").status).toBe(0);
    let r = pruefe(root);
    expect(r.aus).toContain("(git)");
    expect(r.code).toBe(0);

    expect(git(root, "add", "-f", "public/sitemap.xml").status).toBe(0);
    r = pruefe(root);
    expect(r.code).toBe(1);
    expect(r.aus).toContain("[sitemap-nicht-eingecheckt] public/sitemap.xml");
  });
});
