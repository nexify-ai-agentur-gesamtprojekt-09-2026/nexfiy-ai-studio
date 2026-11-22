#!/usr/bin/env node
// Erzeugt public/sitemap.xml aus der Seitentabelle (src/lib/seo-pages.ts): nur Seiten, die in den
// Suchindex gehören, mit kanonischer Adresse und dem Datum der letzten Änderung ihrer Routendatei
// laut Git. Eine Routendatei mit noch nicht eingetragenen Änderungen bekommt das heutige Datum.
//
// Nutzung:  node tools/generate-sitemap.mjs          schreibt die Datei neu
//           node tools/generate-sitemap.mjs --check  meldet Abweichungen, schreibt nichts (Exit 1)
// Der Testlauf (src/lib/seo.test.ts) prüft dieselbe Regel; wer eine Route ändert oder anlegt,
// lässt dieses Skript laufen und trägt die Datei mit ein.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const ZIEL = path.join(REPO, "public", "sitemap.xml");
const ORIGIN = "https://www.nexifyai.de";
const { SEITEN } = await import(path.join(REPO, "src", "lib", "seo-pages.ts"));

function git(...args) {
  return execFileSync("git", args, { cwd: REPO, encoding: "utf8" }).trim();
}

/** Datum (JJJJ-MM-TT) der letzten Änderung einer Routendatei; heute, wenn sie gerade geändert ist. */
export function lastmod(datei) {
  const rel = `src/routes/${datei}`;
  const heute = new Date().toISOString().slice(0, 10);
  if (git("status", "--porcelain", "--", rel)) return heute;
  return git("log", "-1", "--format=%cs", "--", rel) || heute;
}

export function buildSitemap() {
  const zeilen = SEITEN.filter((seite) => seite.index).map(
    (seite) =>
      `  <url>\n    <loc>${ORIGIN}${seite.pfad}</loc>\n    <lastmod>${lastmod(seite.datei)}</lastmod>\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${zeilen.join("\n")}\n</urlset>\n`;
}

const neu = buildSitemap();
if (process.argv.includes("--check")) {
  const alt = readFileSync(ZIEL, "utf8");
  if (alt !== neu) {
    console.error("public/sitemap.xml weicht ab – node tools/generate-sitemap.mjs ausführen.");
    process.exit(1);
  }
  console.log("public/sitemap.xml ist aktuell.");
} else {
  writeFileSync(ZIEL, neu);
  console.log(`public/sitemap.xml geschrieben: ${SEITEN.filter((s) => s.index).length} Adressen.`);
}
