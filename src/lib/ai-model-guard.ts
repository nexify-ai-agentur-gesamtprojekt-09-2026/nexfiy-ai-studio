/**
 * Agenturweite Regel für verwaltete KI-Aufrufe: kein stiller Modellersatz.
 * Die Antwort zählt nur, wenn das gemeldete Antwortmodell exakt dem angeforderten entspricht
 * (das Gateway meldet die Kennung ohne Anbieterpräfix, z. B. „gpt-6-astra“ für „openai/gpt-6-astra“).
 */
export function isRequestedModel(requested: string, reported: unknown): boolean {
  if (typeof reported !== "string" || reported.length === 0) return false;
  const bare = requested.includes("/") ? requested.slice(requested.indexOf("/") + 1) : requested;
  return reported === requested || reported === bare;
}

/** Obergrenze für die Wartezeit eines öffentlichen KI-Aufrufs; ohne automatische Wiederholung. */
export const PUBLIC_AI_TIMEOUT_MS = 45_000;
