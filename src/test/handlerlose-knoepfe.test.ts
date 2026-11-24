// @vitest-environment node
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Die Seiten sind übernommene Kopien; dabei kamen Schaltflächen ohne Verhalten mit
 * („Angebot anfragen", „Terminwunsch nennen", „Zulassen" …). Ein Knopf, der nichts tut, ist für
 * Besucher ein Defekt. Diese Prüfung findet jede `<button>` in Routen und Seitenrahmen, die weder
 * ein Formular absendet noch einen Klick-Handler trägt. Ziele gehören in einen Link.
 */
const WURZEL = join(process.cwd(), "src");
const ORDNER = ["routes", join("components", "site"), join("components", "chat")];

export function handlerloseKnoepfe(quelle: string): string[] {
  const funde: string[] = [];
  for (const treffer of quelle.matchAll(/<button\b[^>]*>/g)) {
    const tag = treffer[0];
    if (/\bonClick=/.test(tag) || /type="submit"/.test(tag)) continue;
    funde.push(tag.replace(/\s+/g, " "));
  }
  return funde;
}

describe("Keine Schaltfläche ohne Verhalten", () => {
  it("erkennt einen Knopf ohne Handler und lässt Knöpfe mit Handler oder Absenden durch", () => {
    expect(
      handlerloseKnoepfe('<button type="button" className={"hc-text-link"}>x</button>'),
    ).toHaveLength(1);
    expect(
      handlerloseKnoepfe('<button\n  type="button"\n  data-variant="secondary"\n>x</button>'),
    ).toHaveLength(1);
    expect(handlerloseKnoepfe('<button type="button" onClick={schliessen}>x</button>')).toEqual([]);
    expect(handlerloseKnoepfe('<button type="submit" disabled={senden}>x</button>')).toEqual([]);
  });

  it("Routen und Seitenrahmen enthalten keine", () => {
    const funde: string[] = [];
    let dateien = 0;
    for (const ordner of ORDNER) {
      for (const name of readdirSync(join(WURZEL, ordner))) {
        if (!name.endsWith(".tsx") || name.includes(".test.")) continue;
        dateien += 1;
        for (const tag of handlerloseKnoepfe(readFileSync(join(WURZEL, ordner, name), "utf8")))
          funde.push(`${ordner}/${name}: ${tag}`);
      }
    }
    expect(dateien).toBeGreaterThan(25);
    expect(funde).toEqual([]);
  });
});
