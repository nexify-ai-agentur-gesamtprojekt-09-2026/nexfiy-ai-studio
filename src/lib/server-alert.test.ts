import { describe, expect, it } from "vitest";
import { serverAlertSchema } from "./server-alert";

describe("Betriebsmeldungen", () => {
  it("erlaubt den Tagesbericht der vorhandenen Überwachung", () => {
    expect(
      serverAlertSchema.safeParse({
        quelle: "ueberwachung",
        stand: "bericht",
        detail: "Status 200/200/200/401",
      }).success,
    ).toBe(true);
  });
  it("begrenzt Meldungen auf 300 Zeichen", () => {
    expect(
      serverAlertSchema.safeParse({
        quelle: "ueberwachung",
        stand: "fehler",
        detail: "a".repeat(301),
      }).success,
    ).toBe(false);
  });
  it("weist andere Aufgaben und zusätzliche Daten zurück", () => {
    expect(
      serverAlertSchema.safeParse({ quelle: "zahlung", stand: "bericht", detail: "Status" })
        .success,
    ).toBe(false);
    expect(
      serverAlertSchema.safeParse({
        quelle: "ueberwachung",
        stand: "bericht",
        detail: "Status",
        email: "test@example.invalid",
      }).success,
    ).toBe(false);
  });
});
