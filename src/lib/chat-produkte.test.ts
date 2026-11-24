// @vitest-environment node
import { describe, expect, it } from "vitest";
import { produktAntwort } from "@/lib/chat-produkte";

describe("Produktfragen ohne Modell", () => {
  it("erklärt die NeX AIFly Suite", () => {
    for (const frage of [
      "Was ist die NeX AIFly Suite?",
      "Erklären Sie die NeX AIFly Suite.",
      "Suite?",
    ]) {
      const antwort = produktAntwort(frage);
      expect(antwort).toContain("Arbeitsbereich für Projekte");
      expect(antwort).toContain("/produkte/nex2fly");
      expect(antwort).not.toMatch(/Sitz|Anschrift|Vaals|Kleve/);
    }
  });

  it("erklärt Agenten, API und Skills", () => {
    expect(produktAntwort("Was ist NeX Agentic AI?")).toContain("/produkte/one");
    expect(produktAntwort("Was macht die NeXify API?")).toContain("/produkte/api");
    expect(produktAntwort("Was sind Skills und MCP?")).toContain("/produkte/skills-mcp");
  });

  it("greift nicht bei Kontakt- oder Preisfragen ohne Produktbezug", () => {
    expect(produktAntwort("Was kostet eine Website?")).toBeNull();
    expect(produktAntwort("Wie erreiche ich Sie?")).toBeNull();
    expect(produktAntwort("Ich nutze die Suite bereits.")).toBeNull();
  });
});
