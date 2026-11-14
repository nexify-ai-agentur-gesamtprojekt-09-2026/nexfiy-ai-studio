/** Content for the system pages (not found, error): which existing pages to suggest for a requested path. */
export type SuggestedPath = "/" | "/leistungen" | "/kontakt" | "/teileklar" | "/teileklar/werkstatt" | "/teileklar/partner-werden";

export interface PageSuggestion {
  to: SuggestedPath;
  label: string;
  description: string;
}

export type SiteArea = "nexify" | "teileklar";

const NEXIFY: PageSuggestion[] = [
  { to: "/", label: "Startseite", description: "Websites, Apps, Shops und KI – aus dem, was Ihr Unternehmen wirklich braucht." },
  { to: "/leistungen", label: "Leistungen", description: "Website, System, Kampagne – mit klarem Umfang aus einer Hand." },
  { to: "/kontakt", label: "Kontakt", description: "Schildern Sie Ihr Vorhaben in wenigen Sätzen." },
];

const TEILEKLAR: PageSuggestion[] = [
  { to: "/teileklar", label: "Schaufenster", description: "Zubehör für Auto und Motorrad mit klaren Angaben zu Passung und Preis." },
  { to: "/teileklar/werkstatt", label: "Werkstatt finden", description: "Werkstätten in Ihrer Nähe, gesucht nach PLZ oder Ort." },
  { to: "/teileklar/partner-werden", label: "Partner werden", description: "Vollständige Aufträge für Ihre Werkstatt." },
];

/** TEILEKLAR paths get shop suggestions, everything else the NeXify pages. */
export function siteAreaFor(pathname: string): SiteArea {
  return /^\/teileklar(\/|$)/.test(pathname) ? "teileklar" : "nexify";
}

export function suggestionsFor(pathname: string): PageSuggestion[] {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const list = siteAreaFor(normalized) === "teileklar" ? TEILEKLAR : NEXIFY;
  return list.filter((suggestion) => suggestion.to !== normalized);
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
