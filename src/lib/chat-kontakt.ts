/**
 * Deterministische Antwort auf Kontaktfragen (E-Mail, Telefon, Weg zu NeXify).
 *
 * Warum nicht über das Modell: Der Router maskiert E-Mail-Adressen und Rufnummern in der
 * Anfrage (gemessen am 24.11.2026). Das Modell sieht die veröffentlichten Werte nicht und
 * liefert Platzhalter oder gerät bei der Rufnummer (falsches Länderkennzeichen). Kontaktdaten
 * müssen exakt sein, deshalb werden genau diese Fragen ohne Modell beantwortet.
 *
 * Bewusst ohne Imports außer den öffentlichen Angaben: reine Funktion, direkt testbar.
 */

import { CHAT_KONTAKT_MAIL } from "@/lib/chat-seiten";

const MAIL_WORT = /\b(e-?mail(?:-?adresse)?|mailadresse|mail)\b/iu;
const TEL_WORT = /\b(telefon(?:nummer)?|rufnummer|durchwahl|anrufen|telefonisch|phone)\b/iu;
const KONTAKT_WORT = /\b(kontakt(?:ier\w*|aufnahme)?|erreich\w*|meld\w*)\b/iu;
const FRAGE_WORT =
  /\b(wie|wo|wohin|welche[nsr]?|gibt es|kann ich|kann man|lautet|nenn\w*|schreib\w*|sende\w*|erreich\w*|melde\w*)\b/iu;

/**
 * Gibt die fertige Antwort zurück, wenn die Nachricht eine Kontaktfrage ist; sonst `null`.
 * Kurze Nachrichten wie „E-Mail?“ gelten ebenfalls als Frage.
 */
export function kontaktAntwort(nachricht: string): string | null {
  const text = nachricht.trim();
  if (!text) return null;
  const mail = MAIL_WORT.test(text);
  const telefon = TEL_WORT.test(text);
  if (!mail && !telefon && !KONTAKT_WORT.test(text)) return null;
  const kurz = text.split(/\s+/u).length <= 3;
  if (!FRAGE_WORT.test(text) && !kurz) return null;

  const teile: string[] = [];
  if (mail) teile.push(`Per E-Mail erreichen Sie NeXify AI unter ${CHAT_KONTAKT_MAIL}.`);
  if (telefon) teile.push("Die Telefonnummer steht im Impressum: /impressum.");
  if (!mail && !telefon) {
    teile.push(`Per E-Mail: ${CHAT_KONTAKT_MAIL}.`);
    teile.push("Die Telefonnummer steht im Impressum: /impressum.");
  }
  teile.push("Für Ihr Anliegen: /kontakt.");
  return teile.join(" ");
}
