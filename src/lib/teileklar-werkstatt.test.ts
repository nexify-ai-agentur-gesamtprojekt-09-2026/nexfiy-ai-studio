import { describe, expect, it } from "vitest";
import { sucheWerkstaetten, type Ort, type Werkstatt } from "./teileklar-werkstatt";

const orte: Ort[] = [
  ["10115", "Berlin", "Berlin", 52.53, 13.38],
  ["10117", "Berlin", "Berlin", 52.52, 13.39],
  ["01067", "Dresden", "Sachsen", 51.06, 13.73],
  ["20095", "Hamburg", "Hamburg", 53.55, 10],
  ["12345", "Beispiel", "Brandenburg", 52.4, 13.4],
  ["54321", "Beispiel", "Hessen", 50.1, 8.6],
  ["85540", "Haar", "Bayern", 48.11, 11.73],
];
const betriebe: Werkstatt[] = [
  ["n2", "Weiter", 52.67, 13.38],
  ["n1", "Nah", 52.54, 13.38],
  ["w1", "Dresden", 51.06, 13.74],
];
const such = (q: string, radius = 25) => sucheWerkstaetten({ q, radius }, orte, betriebe);

describe("TEILEKLAR-Werkstattverzeichnis", () => {
  it("begrenzt die Luftlinie und sortiert aufsteigend", () => {
    expect(such("10115", 10)).toMatchObject({ status: "ok", total: 1, items: [{ id: "n1" }] });
    expect(such("10115")).toMatchObject({
      status: "ok",
      total: 2,
      items: [{ id: "n1" }, { id: "n2" }],
    });
  });
  it("akzeptiert führende Nullen und normalisiert Ortsnamen", () => {
    expect(such("01067")).toEqual(such("  DRESDEN "));
    expect(such(" BERLIN ")).toMatchObject({ status: "ok", total: 2 });
  });
  it("unterscheidet leere Treffer, unbekannten Ort und ungültige Eingaben", () => {
    expect(such("Hamburg")).toMatchObject({ status: "ok", total: 0 });
    expect(such("00000")).toEqual({ status: "unknown" });
    expect(such("1011")).toEqual({ status: "invalid" });
    expect(such("10115", 1000)).toEqual({ status: "invalid" });
  });
  it("fordert bei gleichnamigen Orten eine Auswahl statt zu raten", () => {
    expect(such("Beispiel")).toMatchObject({
      status: "ambiguous",
      options: ["12345 Beispiel (Brandenburg)", "54321 Beispiel (Hessen)"],
    });
    expect(such("12345 Beispiel (Hessen)")).toEqual({ status: "unknown" });
    expect(such("12345 Beispiel (Brandenburg)")).toEqual(such("12345"));
  });
  it("begrenzt Antworten und gibt nur öffentliche Felder aus", () => {
    const many: Werkstatt[] = Array.from({ length: 42 }, (_, i) => [
      `n${i}`,
      `Werkstatt ${i}`,
      52.54,
      13.38,
    ]);
    const result = sucheWerkstaetten({ q: "10115", radius: 25 }, orte, many);
    expect(result).toMatchObject({ status: "ok", total: 42 });
    if (result.status !== "ok") throw new Error("Keine Trefferliste");
    expect(result.items).toHaveLength(30);
    expect(Object.keys(result.items[0] ?? {}).sort()).toEqual(["distanceKm", "id", "name"]);
  });
});
