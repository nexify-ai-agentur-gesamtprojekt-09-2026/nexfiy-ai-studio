import { describe, expect, it } from "vitest";
import {
  CONTACT_HANDOFF_KEY,
  CONTACT_HANDOFF_MAX_AGE_MS,
  HANDOFF_OMISSION,
  ORACLE_HANDOFF_HEADING,
  composeOracleHandoff,
  mergeHandoffText,
  takeContactHandoff,
  writeContactHandoff,
  type HandoffMessage,
} from "./contact-handoff";

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
  };
}

const conversation: HandoffMessage[] = [
  { role: "user", content: "Wir möchten Angebote mit KI schneller erstellen." },
  { role: "assistant", content: "Die Suite passt, weil …", recommendation: "suite" },
  { role: "user", content: "Wir sind zwölf Personen im Vertrieb." },
  { role: "assistant", content: "Dann empfehle ich …", recommendation: "both" },
];

describe("composeOracleHandoff", () => {
  it("transfers only the visitor's own messages, never the model's answers", () => {
    const text = composeOracleHandoff(conversation);
    expect(text.startsWith(ORACLE_HANDOFF_HEADING)).toBe(true);
    expect(text).toContain("Wir möchten Angebote mit KI schneller erstellen.");
    expect(text).toContain("Wir sind zwölf Personen im Vertrieb.");
    expect(text).not.toContain("Die Suite passt");
    expect(text).not.toContain("Dann empfehle ich");
  });

  it("names the latest suggestion with catalog product names", () => {
    expect(composeOracleHandoff(conversation)).toContain(
      "Vorgeschlagener Einstieg aus der Beratung: NeX AIFly Suite und NeXify API",
    );
    expect(
      composeOracleHandoff([
        { role: "user", content: "Eigene Software erweitern" },
        { role: "assistant", content: "…", recommendation: "api" },
      ]),
    ).toContain("Vorgeschlagener Einstieg aus der Beratung: NeXify API");
  });

  it("adds no suggestion when ORACLE asked for clarification", () => {
    const text = composeOracleHandoff([
      { role: "user", content: "Was ist das richtige für uns?" },
      { role: "assistant", content: "Bitte beschreiben Sie …", recommendation: "clarify" },
    ]);
    expect(text).not.toContain("Vorgeschlagener Einstieg");
  });

  it("returns nothing without visitor text", () => {
    expect(composeOracleHandoff([{ role: "assistant", content: "Hallo" }])).toBe("");
  });

  it("stays within the form limit and keeps the opening plus the newest messages", () => {
    const messages: HandoffMessage[] = Array.from({ length: 6 }, (_, index) => [
      { role: "user" as const, content: `${index}:` + "x".repeat(990) },
      { role: "assistant" as const, content: "Antwort", recommendation: "suite" as const },
    ]).flat();
    const text = composeOracleHandoff(messages);
    expect(text.length).toBeLessThanOrEqual(4000);
    expect(text).toContain("0:");
    expect(text).toContain("5:");
    expect(text).not.toContain("1:");
    expect(text).toContain(HANDOFF_OMISSION);
  });
});

describe("contact handoff storage", () => {
  it("is read exactly once", () => {
    const storage = memoryStorage();
    writeContactHandoff(storage, "oracle", "  Mein Vorhaben  ", 1_000);
    expect(takeContactHandoff(storage, 2_000)).toEqual({
      origin: "oracle",
      text: "Mein Vorhaben",
      createdAt: 1_000,
    });
    expect(storage.data.has(CONTACT_HANDOFF_KEY)).toBe(false);
    expect(takeContactHandoff(storage, 2_000)).toBeNull();
  });

  it("discards drafts older than 30 minutes", () => {
    const storage = memoryStorage();
    writeContactHandoff(storage, "oracle", "Alt", 0);
    expect(CONTACT_HANDOFF_MAX_AGE_MS).toBe(30 * 60 * 1000);
    expect(takeContactHandoff(storage, 30 * 60 * 1000 + 1)).toBeNull();
    expect(storage.data.has(CONTACT_HANDOFF_KEY)).toBe(false);
  });

  it("accepts a draft at exactly 30 minutes", () => {
    const storage = memoryStorage();
    writeContactHandoff(storage, "teileklar-help", "Bremsscheibe", 0);
    expect(takeContactHandoff(storage, 30 * 60 * 1000)?.origin).toBe("teileklar-help");
  });

  it("rejects tampered or malformed entries and removes them", () => {
    for (const raw of [
      "{",
      JSON.stringify({ origin: "fremd", text: "x", createdAt: 1 }),
      JSON.stringify({ origin: "oracle", text: "", createdAt: 1 }),
      JSON.stringify({ origin: "oracle", text: "x".repeat(4001), createdAt: 1 }),
      JSON.stringify({ origin: "oracle", text: "x", createdAt: "1" }),
    ]) {
      const storage = memoryStorage({ [CONTACT_HANDOFF_KEY]: raw });
      expect(takeContactHandoff(storage, 2)).toBeNull();
      expect(storage.data.has(CONTACT_HANDOFF_KEY)).toBe(false);
    }
  });

  it("refuses empty drafts and surfaces storage failures", () => {
    expect(() => writeContactHandoff(memoryStorage(), "oracle", "   ")).toThrow();
    const blocked = {
      setItem: () => {
        throw new DOMException("blocked", "SecurityError");
      },
    };
    expect(() => writeContactHandoff(blocked, "oracle", "Text")).toThrow("blocked");
  });
});

describe("mergeHandoffText", () => {
  it("keeps text the visitor already typed", () => {
    expect(mergeHandoffText("Bereits notiert.", "Aus dem Chat.")).toBe(
      "Bereits notiert.\n\nAus dem Chat.",
    );
  });
  it("does not duplicate the same draft", () => {
    expect(mergeHandoffText("Aus dem Chat.", "Aus dem Chat.")).toBe("Aus dem Chat.");
  });
  it("stays within the form limit", () => {
    expect(mergeHandoffText("a".repeat(3990), "b".repeat(50)).length).toBe(4000);
  });
});
