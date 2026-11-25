/**
 * Deterministische Antworten auf Kontakt- und Standortfragen (E-Mail, Telefon, Sitz, Anschrift).
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
  if (telefon) teile.push("Die Telefonnummer steht hier: /impressum.");
  if (!mail && !telefon) {
    teile.push(`Per E-Mail: ${CHAT_KONTAKT_MAIL}.`);
    teile.push("Die Telefonnummer steht hier: /impressum.");
  }
  teile.push("Für Ihr Anliegen: /kontakt.");
  return teile.join(" ");
}

const SITZ_WORT =
  /\b(sitz\w*|firmensitz|hauptsitz|standort|anschrift|postanschrift|venlo|niederlande[n]?)\b/iu;
const ADRESSE_WORT = /\badresse\b/iu;
const WO_FRAGE = /\bwo\b[^.!?]{0,40}\b(nexify|sie|euch|ihr|unternehmen|firma|agentur)\b/iu;
const ORT_FRAGE = /\b(wo|wohin|woher|welche[rsn]?|lautet|nenn\w*|sitzt|ansässig|befindet)\b/iu;

/**
 * Beantwortet Fragen nach Sitz oder Anschrift deterministisch. Nötig, weil der Router Ortsnamen
 * maskiert: Das Modell sieht „Venlo“ nicht und rät dann einen Ort (gemessen: „Kleve (Deutschland)“).
 */
export function sitzAntwort(nachricht: string): string | null {
  const text = nachricht.trim();
  if (!text) return null;
  if (MAIL_WORT.test(text)) return null; // „E-Mail-Adresse“ ist keine Standortfrage.
  const sitz = SITZ_WORT.test(text) || ADRESSE_WORT.test(text) || WO_FRAGE.test(text);
  if (!sitz) return null;
  if (!ORT_FRAGE.test(text) && text.split(/\s+/u).length > 3) return null;
  return "NeXify AI ist in Venlo (Niederlande) ansässig. Die vollständige Anschrift steht hier: /impressum.";
}
