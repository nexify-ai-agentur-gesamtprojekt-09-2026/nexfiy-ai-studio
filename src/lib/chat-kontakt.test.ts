// @vitest-environment node
import { describe, expect, it } from "vitest";
import { kontaktAntwort } from "@/lib/chat-kontakt";
import { CHAT_KONTAKT_MAIL, CHAT_KONTAKT_TEL } from "@/lib/chat-seiten";

describe("Kontaktfragen ohne Modell", () => {
  it("beantwortet E-Mail-Fragen mit der veröffentlichten Adresse", () => {
    for (const frage of [
      "Wie erreiche ich Sie per E-Mail?",
      "Welche E-Mail-Adresse haben Sie?",
      "Nennen Sie mir Ihre E-Mail.",
      "E-Mail?",
    ]) {
      const antwort = kontaktAntwort(frage);
      expect(antwort).toContain(CHAT_KONTAKT_MAIL);
      expect(antwort).toContain("/kontakt");
      expect(antwort).not.toContain(CHAT_KONTAKT_TEL);
    }
  });

  it("verweist bei Telefonfragen auf das Impressum, ohne die Nummer zu nennen", () => {
    for (const frage of [
      "Wie lautet Ihre Telefonnummer?",
      "Kann ich Sie auch telefonisch erreichen?",
      "Telefon?",
    ]) {
      const antwort = kontaktAntwort(frage);
      expect(antwort).toContain("/impressum");
      expect(antwort).not.toContain(CHAT_KONTAKT_TEL);
      expect(antwort).not.toMatch(/\+\d/);
    }
  });

  it("nennt bei allgemeinen Kontaktfragen beide Wege", () => {
    const antwort = kontaktAntwort("Wie erreiche ich Sie?");
    expect(antwort).toContain(CHAT_KONTAKT_MAIL);
    expect(antwort).toContain("/impressum");
    expect(antwort).toContain("/kontakt");
  });

  it("greift nicht bei Aussagen oder anderen Themen", () => {
    for (const text of [
      "Ich habe Ihnen gestern eine E-Mail geschickt.",
      "Das Telefon klingelt bei uns im Büro.",
      "Was kostet eine Website?",
      "Wie läuft ein Projekt ab?",
    ]) {
      expect(kontaktAntwort(text)).toBeNull();
    }
  });
});
