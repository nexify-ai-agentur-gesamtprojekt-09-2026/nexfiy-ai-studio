// @vitest-environment node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Was im Browser ankommt (`.output/public` nach `npm run build`), trägt keine Spuren des
 * früheren Shop-Auftritts und des früheren Baukastens. Einzige erlaubte Stelle für das Wort
 * „teileklar": die Regel, die frühere Shop-Adressen als 404 erkennt (`isRetiredPath`).
 * Ohne Build wird die Prüfung übersprungen; die Stilquellen prüft der zweite Test immer.
 */
const AUSGABE = join(process.cwd(), ".output", "public");
const TEXT = /\.(?:js|mjs|css|html|txt|xml|json|webmanifest|svg|map)$/;
const ERLAUBT = /\/\^\\\/\+teileklar\(\\\/\|\$\)\/i/g;

function dateien(ordner: string): string[] {
  return readdirSync(ordner).flatMap((name) => {
    const pfad = join(ordner, name);
    return statSync(pfad).isDirectory() ? dateien(pfad) : TEXT.test(name) ? [pfad] : [];
  });
}

export function spuren(text: string): string[] {
  const ohneRegel = text.replace(ERLAUBT, "");
  return [...ohneRegel.matchAll(/.{0,40}(?:teileklar|lovable).{0,40}/gi)].map((m) => m[0]);
}

describe("Auslieferung ohne Altspuren", () => {
  it("die Prüfung erkennt Spuren und lässt nur die 404-Regel durch", () => {
    expect(spuren("function k(e){return/^\\/+teileklar(\\/|$)/i.test(e)}")).toEqual([]);
    expect(spuren(".site-teileklar .x{color:red}")).toHaveLength(1);
    expect(spuren("/*__lovable_stylesheet_boundary__*/")).toHaveLength(1);
    expect(spuren('href="/teileklar/shop"')).toHaveLength(1);
  });

  it("die Stilquellen enthalten keine Selektoren des früheren Shops", () => {
    const stile = join(process.cwd(), "src", "styles");
    const quellen = [
      ...readdirSync(stile).filter((name) => name.endsWith(".css")),
      ...readdirSync(join(stile, "pages")).map((name) => join("pages", name)),
    ];
    expect(quellen.length).toBeGreaterThan(25);
    for (const quelle of quellen) {
      const css = readFileSync(join(stile, quelle), "utf8");
      expect(spuren(css), quelle).toEqual([]);
      expect(css, quelle).not.toMatch(/\.tk-shop(?![\w-])/);
    }
  });

  it.skipIf(!existsSync(AUSGABE))("die gebaute Auslieferung enthält keine", () => {
    const funde: string[] = [];
    const alle = dateien(AUSGABE);
    expect(alle.length).toBeGreaterThan(30);
    for (const datei of alle)
      for (const spur of spuren(readFileSync(datei, "utf8")))
        funde.push(`${datei.slice(AUSGABE.length)}: ${spur}`);
    expect(funde).toEqual([]);
  });
});
