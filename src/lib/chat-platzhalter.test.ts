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

  it("setzt verstümmelte Fragmente der veröffentlichten Nummer gerade", () => {
    for (const fragment of [
      "Telefon 133 188 56 steht im Impressum.",
      "Telefon +49 133 188 56 steht im Impressum.",
      "Telefon [PERSON_NAME] 133 188 56 steht im Impressum.",
      "Telefon +31 6 133 188 56 steht im Impressum.",
    ]) {
      expect(ersetzeKontaktPlatzhalter(fragment)).toBe(
        `Telefon ${CHAT_KONTAKT_TEL} steht im Impressum.`,
      );
    }
  });

  it("setzt falsche Sitzangaben auf Venlo (Niederlande) zurück", () => {
    for (const text of [
      "NeXify AI hat seinen Sitz in Vaals, Niederlande.",
      "Der Sitz ist in Kleve (Deutschland).",
      "NeXify sitzt in Ludwigshafen.",
      "Das Unternehmen ist ansässig in Aachen.",
      "NeXify AI hat seinen Sitz in [ADDRESS].",
      "Sitz: [PERSON_NAME], Niederlande.",
    ]) {
      expect(ersetzeKontaktPlatzhalter(text)).toContain("Venlo (Niederlande)");
      expect(ersetzeKontaktPlatzhalter(text)).not.toMatch(/Vaals|Kleve|Ludwigshafen|Aachen/);
    }
  });

  it("lässt den korrekten Sitz unverändert", () => {
    const text = "NeXify AI hat seinen Sitz in Venlo (Niederlande).";
    expect(ersetzeKontaktPlatzhalter(text)).toBe(text);
  });

  it("ersetzt die falsche Domain nexify.ai", () => {
    expect(ersetzeKontaktPlatzhalter("Website: nexify.ai")).toBe("Website: www.nexifyai.de");
    expect(ersetzeKontaktPlatzhalter("Website: www.nexify.ai")).toBe("Website: www.nexifyai.de");
    expect(ersetzeKontaktPlatzhalter("Website: www.nexifyai.de")).toBe("Website: www.nexifyai.de");
  });

  it("ersetzt mehrere Platzhalter in einem Satz", () => {
    expect(ersetzeKontaktPlatzhalter("E-Mail: [EMAIL], Telefon: [TELEFON]")).toBe(
      `E-Mail: ${CHAT_KONTAKT_MAIL}, Telefon: ${CHAT_KONTAKT_TEL}`,
    );
  });
});
