/**
 * Adressregeln des Worker-Einstiegs (`src/server.ts`), als reine Funktionen ohne Framework-Import,
 * damit sie im Testlauf ohne Worker-Runtime prüfbar sind.
 */

// 2026-11-19 19:45 (Europe/Berlin): Dauerhafte Weiterleitungen für kurze Adressen.
// Warum: /preise ist laut Kanalvorgabe der Einstieg für Angebotsanfragen (SOUL §0c), die Seite
//   selbst heißt /preise-ablauf — /preise lief deshalb ins Leere (404). Ein 301 hält gesetzte
//   Links und den Suchindex zusammen, ohne eine zweite Preisseite zu pflegen.
export const PERMANENT_REDIRECTS: Record<string, string> = {
  "/preise": "/preise-ablauf",
  "/preise/": "/preise-ablauf",
  // 2026-11-21 01:40 ([ADDRESS]): /login -> /anmelden (Seite heisst hier so).
  "/login": "/anmelden",
  "/login/": "/anmelden",
  // 2026-11-21 02:30 ([ADDRESS]/Berlin): Backend-CTAs und alte Mails zeigten auf /konto (HTTP 404).
  // Der Kundenbereich heisst hier /portale; der Redirect haelt alte Links am Leben.
  "/konto": "/portale",
  "/konto/": "/portale",
  // 2026-11-22 (Europe/Berlin): Kurzadressen des Kundencenters. Es wird derzeit eingerichtet;
  // /portale erklärt den Stand und den Weg zum Zugang. Gleiche Domain, kein fremdes Ziel.
  "/kundencenter": "/portale",
  "/kundencenter/": "/portale",
  "/kundenportal": "/portale",
  "/kundenportal/": "/portale",
};

/**
 * 2026-11-22 (Europe/Berlin): Jede 404-Antwort trägt `X-Robots-Tag: noindex`.
 * Warum: Inhaberentscheidung vom 22.11.2026 — die früheren Shop-Adressen (/teileklar und alles
 *   darunter) gibt es auf dieser Domain nicht mehr. Sie antworten mit 404 über die normale
 *   Fehlerseite und sollen aus dem Suchindex fallen. Das Meta-Tag der Fehlerseite allein genügt
 *   dafür nicht; der Header gilt auch für Abrufe, die das HTML nicht auswerten.
 * Was hier bewusst fehlt: eine Weiterleitung. Es gibt kein Ziel auf einer anderen Domain, also
 *   auch keinen Weg, auf dem Querystrings, Kampagnen- oder Personendaten dorthin gelangen.
 */
export function withNoindexOnNotFound(response: Response): Response {
  if (response.status !== 404) return response;
  const headers = new Headers(response.headers);
  headers.set("x-robots-tag", "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
