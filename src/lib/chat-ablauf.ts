/**
 * Deterministische Antwort auf die Frage nach dem Projektablauf.
 *
 * Warum nicht über das Modell: „Ablauf“ wird regelmäßig als Frist oder Laufzeit missverstanden
 * (gemessen: „Zu einer allgemeinen Ablauffrist ist nichts hinterlegt“). Der Ablauf ist auf der
 * Website beschrieben und wird hier verbindlich wiedergegeben.
 */

const ABLAUF = /\b(ablauf|prozess|vorgehen|schritte)\b|\bwie läuft\b/iu;
const FRAGE = /\b(wie|was|welche[nsr]?|erkl\w*|beschreib\w*|gibt es|läuft)\b/iu;

export function ablaufAntwort(nachricht: string): string | null {
  const text = nachricht.trim();
  if (!text || !ABLAUF.test(text)) return null;
  if (!FRAGE.test(text) && text.split(/\s+/u).length > 3) return null;
  return [
    "Der Ablauf in fünf Schritten:",
    "1. Erstgespräch zu Ziel, Angebot und gewünschter Wirkung.",
    "2. Daraus folgen Umfang, Funktionen und Zeitplan.",
    "3. Offene Punkte klären, dann folgt ein Angebot mit Leistungen und Kosten.",
    "4. Mit Annahme des Angebots beginnt das Projekt.",
    "5. Übergabe mit Dateien, Dokumentation und Einweisung.",
    "Details: /wissen. Vorbereitung: /wissen/projekt-vorbereiten.",
  ].join("\n");
}
