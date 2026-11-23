#!/usr/bin/env node
// Durchsetzung des Unternehmensstandards (docs/unternehmensstandard.md), ohne Abhängigkeiten.
// Läuft in .github/workflows/ci.yml (Job "Prüfen") und im Build-Job von deploy-live.yml sowie
// lokal als `npm run standard`. Exit 0 = alle Regeln erfüllt, Exit 1 = mindestens ein Verstoß.
//
// Aufruf: node tools/standard-pruefung.mjs [--root=<verzeichnis>]
//
// Dateiliste: in einem Git-Arbeitsbaum alle versionierten und alle neuen, nicht ignorierten
// Dateien (`git ls-files --cached --others --exclude-standard`); sonst ein Durchlauf des
// Verzeichnisses ohne node_modules, .git, .output, dist und coverage.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

/** Dokumente und Dateien, die der Standard voraussetzt. */
export const PFLICHT_DATEIEN = [
  "AGENTS.md",
  "README.md",
  "SECURITY.md",
  "docs/unternehmensstandard.md",
  "docs/auslieferung.md",
  "docs/codespaces.md",
  ".github/dependabot.yml",
  ".github/workflows/ci.yml",
  ".devcontainer/devcontainer.json",
];

/** Dateinamen, die nie versioniert werden (Zugangsdaten, Schlüssel). */
const VERBOTENE_NAMEN = [
  { muster: /^\.env(\..+)?$/, grund: "Umgebungsdatei (.env*)" },
  { muster: /^\.dev\.vars(\..+)?$/, grund: "Wrangler-Geheimnisdatei (.dev.vars*)" },
  { muster: /\.(pem|key|p12|pfx|jks|keystore)$/i, grund: "Schlüssel- oder Zertifikatsdatei" },
  { muster: /^id_(rsa|dsa|ecdsa|ed25519)(\.pub)?$/, grund: "SSH-Schlüssel" },
];

/** Bekannte Token-Formate. Präfix plus Mindestlänge, damit normale Wörter nicht anschlagen. */
const TOKEN_MUSTER = [
  { name: "Cloudflare-Account-Token (cfat_)", muster: /\bcfat_[A-Za-z0-9_-]{20,}/ },
  { name: "Cloudflare-User-Token (cfut_)", muster: /\bcfut_[A-Za-z0-9_-]{20,}/ },
  { name: "GitHub-Token (ghp_/gho_/ghs_/ghu_/ghr_)", muster: /\bgh[pousr]_[A-Za-z0-9]{30,}/ },
  { name: "GitHub-Fine-grained-Token (github_pat_)", muster: /\bgithub_pat_[A-Za-z0-9_]{20,}/ },
  { name: "API-Schlüssel (sk-)", muster: /(?<![A-Za-z0-9_-])sk-[A-Za-z0-9_-]{20,}/ },
  { name: "Privater Schlüssel (PEM)", muster: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

const AUSGESCHLOSSEN = new Set([
  "node_modules",
  ".git",
  ".output",
  "dist",
  "coverage",
  ".wrangler",
]);
const MAX_GROESSE = 5 * 1024 * 1024;

function dateiListe(root) {
  try {
    const ausgabe = execFileSync(
      "git",
      ["-C", root, "ls-files", "-z", "--cached", "--others", "--exclude-standard"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 },
    );
    const istWurzel = execFileSync("git", ["-C", root, "rev-parse", "--show-toplevel"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (resolve(istWurzel) === resolve(root)) {
      const liste = [...new Set(ausgabe.split("\0").filter(Boolean))];
      // Gelöschte, aber noch versionierte Dateien überspringen.
      return { quelle: "git", dateien: liste.filter((d) => existsSync(join(root, d))) };
    }
  } catch {
    // kein Git-Arbeitsbaum: Verzeichnis durchlaufen
  }
  const dateien = [];
  const lauf = (ordner) => {
    for (const eintrag of readdirSync(ordner, { withFileTypes: true })) {
      if (AUSGESCHLOSSEN.has(eintrag.name)) continue;
      const pfad = join(ordner, eintrag.name);
      if (eintrag.isDirectory()) lauf(pfad);
      else if (eintrag.isFile()) dateien.push(relative(root, pfad).split(sep).join("/"));
    }
  };
  lauf(root);
  return { quelle: "verzeichnis", dateien: dateien.sort() };
}

function lies(root, datei) {
  try {
    return readFileSync(join(root, datei), "utf8");
  } catch {
    return null;
  }
}

/** Zerlegt einen Workflow grob in Kopf (oberste Ebene) und Jobs (Einrückung 2 unter `jobs:`). */
export function workflowStruktur(text) {
  const zeilen = text.split(/\r?\n/);
  const kopf = [];
  const jobs = [];
  let inJobs = false;
  let job = null;
  for (const [i, zeile] of zeilen.entries()) {
    if (/^\S/.test(zeile) && !zeile.startsWith("#")) {
      inJobs = /^jobs:\s*(#.*)?$/.test(zeile);
      job = null;
      if (!inJobs) kopf.push({ nr: i + 1, zeile });
      continue;
    }
    if (inJobs) {
      const kennung = /^ {2}([A-Za-z0-9_-]+):\s*(#.*)?$/.exec(zeile);
      if (kennung) {
        job = { name: kennung[1], nr: i + 1, zeilen: [] };
        jobs.push(job);
      } else if (job) {
        job.zeilen.push({ nr: i + 1, zeile });
      }
    } else if (kopf.length) {
      kopf.push({ nr: i + 1, zeile });
    }
  }
  return { kopf, jobs };
}

/** Rechte-Block unterhalb einer Zeile `permissions:` (eingerückt) oder einzeiliger Wert. */
function rechteBlock(zeilen, startIndex, einrueckung) {
  const erste = zeilen[startIndex].zeile;
  const inline = /permissions:\s*([^#\s][^#]*)?/.exec(erste)?.[1]?.trim();
  if (inline) return [inline];
  const werte = [];
  for (let i = startIndex + 1; i < zeilen.length; i++) {
    const z = zeilen[i].zeile;
    if (!z.trim() || z.trim().startsWith("#")) continue;
    const tiefe = z.length - z.trimStart().length;
    if (tiefe <= einrueckung) break;
    werte.push(z.trim().replace(/\s*#.*$/, ""));
  }
  return werte;
}

function pruefeWorkflow(datei, text, verstoss, versionen) {
  const { kopf, jobs } = workflowStruktur(text);

  // Regel: Actions per 40-stelligem Commit-SHA gepinnt.
  for (const [i, zeile] of text.split(/\r?\n/).entries()) {
    const treffer = /^\s*(?:-\s+)?uses:\s*["']?([^"'\s#]+)/.exec(zeile);
    if (!treffer) continue;
    const ziel = treffer[1];
    if (ziel.startsWith("./")) continue;
    if (ziel.startsWith("docker://")) {
      if (!/@sha256:[0-9a-f]{64}$/.test(ziel))
        verstoss(
          "actions-gepinnt",
          `${datei}:${i + 1}`,
          `Container nicht per Digest gepinnt: ${ziel}`,
        );
      continue;
    }
    if (!/^[^@\s]+@[0-9a-f]{40}$/.test(ziel))
      verstoss(
        "actions-gepinnt",
        `${datei}:${i + 1}`,
        `nicht per 40-stelligem SHA gepinnt: ${ziel}`,
      );
  }

  // Regel: kein pull_request_target (fremder Code mit Schreibrechten und Secrets).
  if (
    /^\s*pull_request_target\s*:/m.test(text) ||
    /\bon:\s*\[?[^\n]*pull_request_target/.test(text)
  )
    verstoss("kein-pull-request-target", datei, "Auslöser pull_request_target ist nicht erlaubt");

  // Regel: Rechte auf oberster Ebene vorhanden und nur lesend.
  const kopfIndex = kopf.findIndex((k) => /^permissions:/.test(k.zeile));
  if (kopfIndex < 0) {
    verstoss("permissions-workflow", datei, "kein `permissions:` auf oberster Ebene");
  } else {
    for (const wert of rechteBlock(kopf, kopfIndex, 0)) {
      if (!/^(read-all|\{\s*\}|[a-z-]+:\s*(read|none))$/.test(wert))
        verstoss(
          "permissions-workflow",
          `${datei}:${kopf[kopfIndex].nr}`,
          `oberste Ebene darf nur lesen, gefunden: ${wert}`,
        );
    }
  }

  // Regel: jeder Job setzt eigene, minimale Rechte; write-all nie.
  if (!jobs.length) verstoss("permissions-job", datei, "keine Jobs gefunden");
  for (const job of jobs) {
    const idx = job.zeilen.findIndex((z) => /^ {4}permissions:/.test(z.zeile));
    if (idx < 0) {
      verstoss(
        "permissions-job",
        `${datei}:${job.nr}`,
        `Job \`${job.name}\` ohne \`permissions:\``,
      );
      continue;
    }
    for (const wert of rechteBlock(job.zeilen, idx, 4)) {
      if (/write-all/.test(wert))
        verstoss(
          "permissions-job",
          `${datei}:${job.zeilen[idx].nr}`,
          `Job \`${job.name}\`: write-all`,
        );
    }
  }

  // Regel: actions/checkout ohne gespeicherte Zugangsdaten.
  const zeilen = text.split(/\r?\n/);
  for (const [i, zeile] of zeilen.entries()) {
    if (!/uses:\s*["']?actions\/checkout@/.test(zeile)) continue;
    const tiefe = zeile.length - zeile.trimStart().length;
    let gefunden = false;
    for (let j = i + 1; j < zeilen.length; j++) {
      const z = zeilen[j];
      if (!z.trim()) continue;
      const t = z.length - z.trimStart().length;
      if (t < tiefe || (t === tiefe && z.trimStart().startsWith("- "))) break;
      if (/persist-credentials:\s*false/.test(z)) gefunden = true;
    }
    if (!gefunden)
      verstoss(
        "checkout-ohne-credentials",
        `${datei}:${i + 1}`,
        "actions/checkout ohne `persist-credentials: false`",
      );
  }

  // Versionen für den Abgleich mit dem Dev-Container sammeln.
  for (const [i, zeile] of zeilen.entries()) {
    const node = /node-version:\s*["']?([0-9][0-9.x]*)["']?/.exec(zeile);
    if (node) versionen.node.push({ ort: `${datei}:${i + 1}`, wert: node[1] });
    const bun = /bun-version:\s*["']?([0-9][0-9.]*)["']?/.exec(zeile);
    if (bun) versionen.bun.push({ ort: `${datei}:${i + 1}`, wert: bun[1] });
  }
}

/** Node-Hauptversion und Bun-Version aus .devcontainer/devcontainer.json (JSONC, per Muster). */
export function devcontainerVersionen(text) {
  const node =
    /"image"\s*:\s*"[^"]*javascript-node:(\d+)/.exec(text)?.[1] ??
    /features\/node:\d+"\s*:\s*\{[^}]*"version"\s*:\s*"(\d+)/.exec(text)?.[1] ??
    null;
  const bun = /bun-v(\d+\.\d+\.\d+)/.exec(text)?.[1] ?? null;
  return { node, bun };
}

export function pruefe(root) {
  const verstoesse = [];
  const verstoss = (regel, ort, text) => verstoesse.push({ regel, ort, text });
  const { quelle, dateien } = dateiListe(root);
  const menge = new Set(dateien);

  // Pflichtdateien.
  for (const datei of PFLICHT_DATEIEN) {
    if (!menge.has(datei) && !existsSync(join(root, datei)))
      verstoss("pflicht-doku", datei, "Pflichtdatei fehlt");
  }

  // Verbotene Dateien und eingecheckte Sitemap.
  for (const datei of dateien) {
    const name = basename(datei);
    for (const { muster, grund } of VERBOTENE_NAMEN) {
      if (muster.test(name)) verstoss("keine-geheimnisdateien", datei, `${grund} ist versioniert`);
    }
    if (datei === "public/sitemap.xml")
      verstoss(
        "sitemap-nicht-eingecheckt",
        datei,
        "entsteht im Build (tools/generate-sitemap.mjs)",
      );
  }

  // Workflows.
  const versionen = { node: [], bun: [] };
  const workflows = dateien.filter((d) => /^\.github\/workflows\/[^/]+\.ya?ml$/.test(d));
  for (const datei of workflows) {
    const text = lies(root, datei);
    if (text !== null) pruefeWorkflow(datei, text, verstoss, versionen);
  }

  // CI ruft diese Prüfung selbst auf.
  const ci = lies(root, ".github/workflows/ci.yml");
  if (ci !== null && !/npm run standard|tools\/standard-pruefung\.mjs/.test(ci))
    verstoss("ci-ruft-standard", ".github/workflows/ci.yml", "Schritt `npm run standard` fehlt");

  // Dependabot deckt Actions und JavaScript-Pakete ab.
  const dependabot = lies(root, ".github/dependabot.yml");
  if (dependabot !== null) {
    if (!/package-ecosystem:\s*["']?github-actions/.test(dependabot))
      verstoss("dependabot", ".github/dependabot.yml", "Ökosystem github-actions fehlt");
    if (!/package-ecosystem:\s*["']?(npm|bun)["']?/.test(dependabot))
      verstoss("dependabot", ".github/dependabot.yml", "Ökosystem npm/bun fehlt");
  }

  // Dev-Container und Workflows nutzen dieselben Versionen.
  const dc = lies(root, ".devcontainer/devcontainer.json");
  if (dc !== null) {
    const soll = devcontainerVersionen(dc);
    if (!soll.node)
      verstoss(
        "versionen-gleich",
        ".devcontainer/devcontainer.json",
        "Node-Version nicht erkennbar",
      );
    if (!soll.bun)
      verstoss(
        "versionen-gleich",
        ".devcontainer/devcontainer.json",
        "Bun-Version nicht erkennbar",
      );
    if (soll.node && !versionen.node.length)
      verstoss("versionen-gleich", ".github/workflows", "kein `node-version:` in den Workflows");
    for (const { ort, wert } of versionen.node) {
      if (soll.node && wert.split(".")[0] !== soll.node)
        verstoss("versionen-gleich", ort, `Node ${wert}, Dev-Container ${soll.node}`);
    }
    for (const { ort, wert } of versionen.bun) {
      if (soll.bun && wert !== soll.bun)
        verstoss("versionen-gleich", ort, `Bun ${wert}, Dev-Container ${soll.bun}`);
    }
  }

  // Keine Tokens nach bekannten Mustern im Inhalt.
  for (const datei of dateien) {
    const pfad = join(root, datei);
    let puffer;
    try {
      if (statSync(pfad).size > MAX_GROESSE) continue;
      puffer = readFileSync(pfad);
    } catch {
      continue;
    }
    if (puffer.subarray(0, 8000).includes(0)) continue; // Binärdatei
    const text = puffer.toString("utf8");
    for (const { name, muster } of TOKEN_MUSTER) {
      if (!muster.test(text)) continue;
      const nr = text.slice(0, text.search(muster)).split("\n").length;
      verstoss("keine-tokens", `${datei}:${nr}`, `${name} gefunden (Wert nicht ausgegeben)`);
    }
  }

  return { quelle, anzahlDateien: dateien.length, anzahlWorkflows: workflows.length, verstoesse };
}

function main() {
  const arg = process.argv.slice(2).find((a) => a.startsWith("--root="));
  const root = resolve(arg ? arg.slice("--root=".length) : process.cwd());
  const ergebnis = pruefe(root);
  if (ergebnis.verstoesse.length) {
    console.error(
      `Standard-Prüfung: ${ergebnis.verstoesse.length} Verstoß/Verstöße (docs/unternehmensstandard.md)`,
    );
    for (const v of ergebnis.verstoesse) console.error(`  [${v.regel}] ${v.ort}: ${v.text}`);
    process.exit(1);
  }
  console.log(
    `Standard-Prüfung bestanden: ${ergebnis.anzahlDateien} Dateien (${ergebnis.quelle}), ` +
      `${ergebnis.anzahlWorkflows} Workflows.`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
