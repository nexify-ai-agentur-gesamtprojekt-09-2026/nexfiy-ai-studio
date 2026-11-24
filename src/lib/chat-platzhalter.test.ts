// @vitest-environment node
import { describe, expect, it } from "vitest";
import { ersetzeKontaktPlatzhalter } from "@/lib/chat-platzhalter";
import { CHAT_KONTAKT_MAIL, CHAT_KONTAKT_TEL } from "@/lib/chat-seiten";

describe("Kontakt-Platzhalter in Modellantworten", () => {
  it("setzt für E-Mail-Platzhalter die veröffentlichte Adresse ein", () => {
    for (const platzhalter of [
      "[EMAIL]",
      "[E-Mail]",
      "[E-Mail-Adresse]",
      "[E-Mail Adresse]",
      "<EMAIL>",
      "[email]",
      "[EMAIL_ADDRESS]",
      "[Kontakt-Mail]",
    ]) {
      expect(ersetzeKontaktPlatzhalter(`Kontakt: ${platzhalter}.`)).toBe(
        `Kontakt: ${CHAT_KONTAKT_MAIL}.`,
      );
    }
  });

  it("setzt für Telefon-Platzhalter die veröffentlichte Nummer ein", () => {
    for (const platzhalter of ["[TELEFON]", "[Telefonnummer]", "<TEL>", "[PHONE]", "[Rufnummer]"]) {
      expect(ersetzeKontaktPlatzhalter(`Erreichbar: ${platzhalter}.`)).toBe(
        `Erreichbar: ${CHAT_KONTAKT_TEL}.`,
      );
    }
  });

  it("lässt normalen Text und echte Adressen unverändert", () => {
    for (const text of [
      "Bitte senden Sie uns eine E-Mail.",
      "Das Telefon klingelt.",
      `Schreiben Sie an ${CHAT_KONTAKT_MAIL}.`,
      "Kein Platzhalter [hier] und (dort).",
    ]) {
      expect(ersetzeKontaktPlatzhalter(text)).toBe(text);
    }
  });

  it("ersetzt mehrere Platzhalter in einem Satz", () => {
    expect(ersetzeKontaktPlatzhalter("E-Mail: [EMAIL], Telefon: [TELEFON]")).toBe(
      `E-Mail: ${CHAT_KONTAKT_MAIL}, Telefon: ${CHAT_KONTAKT_TEL}`,
    );
  });
});
