// 2026-11-19 21:00 (Europe/Berlin): Kanonische URL zentral, damit jede Seite genau eine
// canonical-Angabe bekommt. Grund: der Audit gegen www.nexifyai.de fand 0/43 Seiten mit
// canonical; ohne sie konkurrieren .de, www-Variante und alte .cloud-Links in der Suche.
export const SITE_ORIGIN = "https://www.nexifyai.de";

export function canonicalUrl(path: string): string {
  const clean = path === "/" ? "/" : "/" + path.replace(/^\/+/, "").replace(/\/+$/, "");
  return SITE_ORIGIN + clean;
}

export function canonicalLink(path: string) {
  return { rel: "canonical", href: canonicalUrl(path) };
}
