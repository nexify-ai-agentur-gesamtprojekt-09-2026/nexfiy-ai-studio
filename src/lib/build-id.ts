import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Kennung des Builds für den Service Worker (vite.config.ts). Sie entsteht aus dem Commit und dem
 * Inhalt der Dateien, die der Worker ausliefert oder speichert – nicht aus der Uhrzeit. Derselbe
 * Stand ergibt dieselbe Kennung; ein zweiter Build ohne Änderung wirft also keine Caches weg und
 * meldet Browsern keinen neuen Worker. Nur im Build benutzt, nie im Browser-Bündel.
 */
export const KENNUNGS_DATEIEN = [
  "src/lib/pwa/service-worker.js",
  "src/lib/pwa/abschalt-worker.js",
  "src/lib/offline-page.ts",
  "src/lib/pwa-config.ts",
  "src/lib/site-facts.ts",
];

/** Reine Funktion: gleiche Teile, gleiche Kennung. 12 Zeichen, nur Kleinbuchstaben und Ziffern. */
export function buildKennung(teile: readonly string[]): string {
  const hash = createHash("sha256");
  for (const teil of teile) hash.update(String(teil.length)).update("\u0000").update(teil);
  return hash.digest("hex").slice(0, 12);
}

export function buildId(wurzel: string = process.cwd()): string {
  let commit = "";
  try {
    commit = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: wurzel,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    // Ohne Git (Archiv, Container ohne .git) trägt allein der Inhalt die Kennung.
  }
  return buildKennung([
    commit,
    ...KENNUNGS_DATEIEN.map((datei) => readFileSync(path.join(wurzel, datei), "utf8")),
  ]);
}
