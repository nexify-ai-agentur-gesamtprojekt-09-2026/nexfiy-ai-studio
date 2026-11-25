/** Content for the system pages (not found, error): which existing pages to suggest for a requested path. */
export type SuggestedPath = "/" | "/leistungen" | "/kontakt";

export interface PageSuggestion {
  to: SuggestedPath;
  label: string;
  description: string;
}

const NEXIFY: PageSuggestion[] = [
  {
    to: "/",
    label: "Startseite",
    description: "Websites, Apps, Shops und KI – aus dem, was Ihr Unternehmen wirklich braucht.",
  },
  {
    to: "/leistungen",
    label: "Leistungen",
    description: "Website, System, Kampagne – mit klarem Umfang aus einer Hand.",
  },
  {
    to: "/kontakt",
    label: "Kontakt",
    description: "Schildern Sie Ihr Vorhaben in wenigen Sätzen.",
  },
];

export function suggestionsFor(pathname: string): PageSuggestion[] {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return NEXIFY.filter((suggestion) => suggestion.to !== normalized);
}

/**
 * Stillgelegte Pfade dieser Domain (Inhaberentscheidung 22.11.2026): alte Shop-Adressen
 * (/teileklar) und der ehemalige Kundenauftritt (/studienkolleg) gibt es hier nicht mehr.
 * Studienkolleg liegt als eigener Mandant auf studienkolleg-aachen.online; eine Weiterleitung
 * auf fremde Domains ist untersagt, daher 404 mit noindex statt Umleitung.
 * Server und Fehlerseite fragen dieselbe Regel ab, damit beide denselben Pfadbereich meinen.
 * Auch mit mehreren Schrägstrichen am Anfang, die Browser und Proxys durchreichen.
 */
export function isRetiredPath(pathname: string): boolean {
  return /^\/+teileklar(\/|$)/i.test(pathname) || /^\/+studienkolleg(\/|$)/i.test(pathname);
}

/** Shortens long or encoded paths for display without breaking the layout. */
export function displayPath(pathname: string, max = 48): string {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Malformed escapes stay as they arrived.
  }
  return decoded.length > max ? `${decoded.slice(0, max - 1)}…` : decoded;
}
