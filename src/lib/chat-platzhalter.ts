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
const TEL_FRAGMENT = /(?:\+?\d{1,3}[\s/-]*)?(?:\[PERSON_NAME\][\s/-]*)?(?:6[\s/-]*)?133[\s/-]*188[\s/-]*56/g;

export function ersetzeKontaktPlatzhalter(text: string): string {
  return text
    .replace(MAIL_PLATZHALTER, CHAT_KONTAKT_MAIL)
    .replace(TEL_PLATZHALTER, CHAT_KONTAKT_TEL)
    .replace(TEL_FRAGMENT, CHAT_KONTAKT_TEL);
}
