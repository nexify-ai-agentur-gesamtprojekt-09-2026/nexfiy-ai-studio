// Aufruf: node tools/generate-sitemap.mjs (ohne Shebang: die Tests importieren die Datei über Vite).
// Erzeugt public/sitemap.xml aus der Seitentabelle (src/lib/seo-pages.ts): nur Seiten, die in den
// Suchindex gehören, mit kanonischer Adresse und dem Datum der letzten Änderung ihrer Routendatei
// laut Git. Eine Routendatei mit noch nicht eingetragenen Änderungen bekommt das heutige Datum.
//
// 2026-11-23 (Europe/Berlin): Die Sitemap entsteht im Build (`npm run build` ruft dieses Skript vor
// `vite build` auf, Vite kopiert public/ nach .output/public/) und ist nicht mehr eingecheckt
// (.gitignore). Grund: Eine eingecheckte Datei veraltete mit jedem Commit, der eine Route nach dem
// letzten Erzeugen änderte, und hielt dann main/CI rot. Die Tests prüfen die Regeln am erzeugten
// Inhalt (src/lib/seo.test.ts) und an der gebauten Datei (dort, sobald .output/ existiert).
// Ohne Git (Paket ohne Historie) oder in einer flachen Kopie gilt das heutige Datum bzw. das
// Datum des vorhandenen Commits; die Auslieferung baut mit voller Historie.
//
// Nutzung:  node tools/generate-sitemap.mjs   schreibt public/sitemap.xml
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REPO = path.resolve(import.meta.dirname, "..");
const ZIEL = path.join(REPO, "public", "sitemap.xml");
const ORIGIN = "https://www.nexifyai.de";
const { SEITEN } = await import(pathToFileURL(path.join(REPO, "src", "lib", "seo-pages.ts")).href);

function git(...args) {
  try {
    return execFileSync("git", args, {
      cwd: REPO,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
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

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  writeFileSync(ZIEL, buildSitemap());
  console.log(`public/sitemap.xml geschrieben: ${SEITEN.filter((s) => s.index).length} Adressen.`);
}
