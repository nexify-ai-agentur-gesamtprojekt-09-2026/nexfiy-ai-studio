/**
 * Setzt Kontaktangaben ein, die der Modellrouter als Platzhalter zurückgibt.
 *
 * Warum: Der Router maskiert E-Mail-Adressen und Telefonnummern in Anfrage und Antwort
 * (gemessen am 24.11.2026: „Per E-Mail an [EMAIL]“. Das Modell sieht die veröffentlichte
 * Adresse dadurch nicht und gibt den Platzhalter an den Besucher weiter. Für den Besucher ist
 * das ein sichtbarer Fehler.
 *
 * Ersetzt werden ausschließlich die im Impressum veröffentlichten, unveränderlichen Werte aus
 * `chat-seiten.ts`. Andere Platzhalter und freier Text bleiben unberührt.
 */

import { CHAT_KONTAKT_MAIL, CHAT_KONTAKT_TEL } from "@/lib/chat-seiten";

/** `[EMAIL]`, `[E-Mail]`, `[E-Mail-Adresse]`, `<EMAIL>`, `[EMAIL_ADDRESS]`, `[Kontakt-Mail]` … */
const MAIL_PLATZHALTER =
  /[[<(]\s*(?:e-?mail(?:[-_ ]?(?:adresse|address))?|mail|kontakt-?mail|email[-_ ]?address)\s*[\]>)]/giu;

/** `[TELEFON]`, `[Telefonnummer]`, `<TEL>`, `[PHONE]`, `[Rufnummer]` … */
const TEL_PLATZHALTER =
  /[[<(]\s*(?:telefon(?:nummer)?|tel|rufnummer|phone(?:[-_ ]?number)?)\s*[\]>)]/giu;

/**
 * Verstümmelte Fragmente der veröffentlichten Nummer: Der Router maskiert sie, das Modell ergänzt
 * dann etwa ein falsches Länderkennzeichen. Erkannt wird der unverwechselbare Rumpf 133 188 56,
 * ersetzt wird der gesamte Ausdruck durch die veröffentlichte Nummer.
 */
const TEL_FRAGMENT =
  /(?:\+?\d{1,3}[\s/-]*)?(?:\[PERSON_NAME\][\s/-]*)?(?:6[\s/-]*)?133[\s/-]*188[\s/-]*56/g;

/**
 * Sitzangaben: Der Router maskiert Ortsnamen, das Modell rät dann einen Ort (gemessen: „Vaals“,
 * „Kleve“, „Ludwigshafen“). Jede Sitzangabe wird auf den veröffentlichten Sitz zurückgesetzt.
 */
const SITZ_ANGABE =
  /(\b(?:Sitz|sitzt|niedergelassen|ansässig)\b[^.\n]{0,24}?(?:\bin\s+|:\s*))(?:[A-ZÄÖÜ][\wäöüß-]*|\[[A-ZÄÖÜ_]+\])(?:\s*\([^)]{0,30}\))?(?:,\s*(?:Niederlande|Deutschland))?/gu;

/** Falsche Domain (gemessen: „nexify.ai“); die Website ist www.nexifyai.de. */
const FALSCHE_DOMAIN = /\b(?:www\.)?nexify\.ai\b/giu;

export function ersetzeKontaktPlatzhalter(text: string): string {
  return text
    .replace(MAIL_PLATZHALTER, CHAT_KONTAKT_MAIL)
    .replace(TEL_PLATZHALTER, CHAT_KONTAKT_TEL)
    .replace(TEL_FRAGMENT, CHAT_KONTAKT_TEL)
    .replace(SITZ_ANGABE, "$1Venlo (Niederlande)")
    .replace(FALSCHE_DOMAIN, "www.nexifyai.de");
}
