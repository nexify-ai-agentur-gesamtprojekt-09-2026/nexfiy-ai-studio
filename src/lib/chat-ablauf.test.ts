// @vitest-environment node
import { describe, expect, it } from "vitest";
import { ablaufAntwort } from "@/lib/chat-ablauf";

describe("Projektablauf ohne Modell", () => {
  it("gibt die fünf Schritte wieder", () => {
    for (const frage of ["Wie läuft ein Projekt ab?", "Wie ist der Ablauf?", "Ablauf?"]) {
      const antwort = ablaufAntwort(frage);
      expect(antwort).toContain("Erstgespräch");
      expect(antwort).toContain("Übergabe");
      expect(antwort).toContain("/wissen");
      expect(antwort).not.toMatch(/Frist|Laufzeit|Ablaufdatum/i);
    }
  });

  it("greift nicht bei anderen Themen", () => {
    expect(ablaufAntwort("Was kostet eine Website?")).toBeNull();
    expect(ablaufAntwort("Wie erreiche ich Sie?")).toBeNull();
    expect(ablaufAntwort("Ich prüfe den Ablauf intern.")).toBeNull();
  });
});
