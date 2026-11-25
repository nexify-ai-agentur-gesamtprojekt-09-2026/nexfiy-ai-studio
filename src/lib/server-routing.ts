import { isRetiredPath } from "./system-pages";

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
  // 2026-11-22 (Europe/Berlin): /login führt direkt auf /portale. Vorher ging es auf /anmelden;
  // diese Adresse leitet inzwischen selbst dorthin weiter (siehe TEMPORARY_REDIRECTS).
  "/login": "/portale",
  "/login/": "/portale",
  // 2026-11-21 02:30 ([ADDRESS]/Berlin): Backend-CTAs und alte Mails zeigten auf /konto (HTTP 404).
  // Der Kundenbereich heisst hier /portale; der Redirect haelt alte Links am Leben.
  "/konto": "/portale",
  "/konto/": "/portale",
  // 2026-11-22 (Europe/Berlin): alte Kurzadresse des Kundencenters. Es wird derzeit eingerichtet;
  // /portale erklärt den Stand und den Weg zum Zugang. Gleiche Domain, kein fremdes Ziel.
  "/kundenportal": "/portale",
  "/kundenportal/": "/portale",
};

/**
 * 2026-11-22 (Europe/Berlin): Vorläufige Weiterleitungen (302).
 * Warum getrennt: /kundencenter wird später der geschützte Einstieg des Kundencenters. Ein 301
 *   würde im Browser dauerhaft gespeichert und den Pfad auch dann noch auf /portale lenken;
 *   ein 302 lässt sich ohne Altlast wieder entfernen.
 */
export const TEMPORARY_REDIRECTS: Record<string, string> = {
  "/kundencenter": "/portale",
  "/kundencenter/": "/portale",
  // 2026-11-22 (Europe/Berlin): Die drei Kontoadressen zeigten denselben Hinweis wie /portale
  // („Kundencenter in Einrichtung"), also viermal dieselbe Seite. Bis es eine Anmeldung gibt,
  // führen sie vorläufig auf /portale. 302, weil die Adressen später wieder eigene Seiten werden;
  // die Routendateien bleiben dafür erhalten.
  "/anmelden": "/portale",
  "/anmelden/": "/portale",
  "/registrieren": "/portale",
  "/registrieren/": "/portale",
  "/passwort-vergessen": "/portale",
  "/passwort-vergessen/": "/portale",
  // /produkte hat keine Übersichtsseite; alle Produktadressen liegen darunter. Vorläufig auf das
  // erste Produkt, bis eine Übersicht entschieden ist.
  "/produkte": "/produkte/nex2fly",
  "/produkte/": "/produkte/nex2fly",
};

/**
 * Weiterleitung für einen Pfad, unabhängig von Groß- und Kleinschreibung (`/ANMELDEN`,
 * `/Registrieren`, `/Preise`). Alle Schlüssel oben sind klein geschrieben; Ziele bleiben, wie sie
 * stehen. `null`: keine Weiterleitung.
 */

/**
 * 2026-11-25 10:35 (Europe/Berlin): Alte Adressfamilien der frueheren Domain nexifyai.cloud.
 * Warum: nexifyai.cloud leitet seit dem Umzug auf www.nexifyai.de um, aber /wissen/<slug> und
 * /stadt/<slug> existieren dort nicht. Google folgt dem 301 und landet auf einer 404 — gemessen
 * am 25.11.2026 lieferten /wissen/ki-fuer-handwerker, /stadt/ki-agentur-heidelberg und drei weitere
 * 404, obwohl Google sie noch kennt. Diese Muster holen Besucher und Suchindex auf die zustaendige
 * Seite, statt sie ins Leere zu schicken.
 * Kein 410: die Inhalte sind nicht widerrufen, sie sind nur noch nicht wiederhergestellt.
 */
export const LEGACY_PREFIXES: { praefix: string; ziel: string }[] = [
  { praefix: "/wissen/", ziel: "/wissen" },
  { praefix: "/stadt/", ziel: "/regionen" },
  { praefix: "/blog/", ziel: "/wissen" },
  { praefix: "/ratgeber/", ziel: "/wissen" },
];

/** Pfade, die trotz Praefix eine eigene Seite haben und nicht umgeleitet werden duerfen. */
const LEGACY_AUSNAHMEN = new Set(["/wissen/projekt-vorbereiten"]);

/** 301 fuer alte Adressfamilien; `null`, wenn kein Muster greift. */
export function legacyWeiterleitungFuer(pfad: string): { ziel: string; status: 301 } | null {
  const p = pfad.toLowerCase().replace(/\/+$/, "") || "/";
  if (LEGACY_AUSNAHMEN.has(p)) return null;
  for (const { praefix, ziel } of LEGACY_PREFIXES) {
    if (p.startsWith(praefix) && p.length > praefix.length) return { ziel, status: 301 };
  }
  return null;
}

export function weiterleitungFuer(pfad: string): { ziel: string; status: 301 | 302 } | null {
  const schluessel = pfad.toLowerCase();
  const dauerhaft = PERMANENT_REDIRECTS[schluessel];
  if (dauerhaft) return { ziel: dauerhaft, status: 301 };
  const vorlaeufig = TEMPORARY_REDIRECTS[schluessel];
  if (vorlaeufig) return { ziel: vorlaeufig, status: 302 };
  return null;
}

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

/**
 * 2026-11-22 (Europe/Berlin): Frühere Shop-Adressen — `/teileklar` und alles darunter.
 * Sie laufen ohne Umweg in die normale Fehlerseite. Dafür bekommt das Framework die Adresse ohne
 * Schrägstrich am Ende, ohne doppelte Schrägstriche und ohne Querystring: sonst antwortet es auf
 * `/teileklar/` (307) oder `//teileklar` (308) zuerst mit einer Weiterleitung und reicht dabei den
 * Querystring weiter (beides nachgemessen).
 * Rückgabe `null` heißt: keine frühere Shop-Adresse, normaler Weg.
 */
export function retiredPathUrl(url: URL): URL | null {
  if (!isRetiredPath(url.pathname)) return null;
  // Pfad ausdrücklich setzen statt `new URL(pfad, origin)`: ein Pfad mit zwei Schrägstrichen am
  // Anfang würde dort als fremder Host gelesen.
  const ziel = new URL(url.origin);
  ziel.pathname = `/${url.pathname.split("/").filter(Boolean).join("/")}`;
  return ziel;
}

/** Antwort für eine frühere Shop-Adresse: immer 404 mit noindex, nie mit Weiterleitungs-Headern. */
export function asRetiredResponse(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.delete("location");
  headers.delete("refresh");
  headers.set("x-robots-tag", "noindex");
  const umleitung = response.status >= 300 && response.status < 400;
  return new Response(umleitung ? null : response.body, { status: 404, headers });
}
