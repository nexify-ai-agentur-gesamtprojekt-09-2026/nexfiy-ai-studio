/** Öffentliche Inhaltsseiten für Suchmaschinen. Konto-, Warenkorb- und Kassenseiten bleiben bewusst außen vor. */
export const SITE_ORIGIN = "https://nexifyai.de";

export const SITEMAP_PATHS = [
  "/",
  "/leistungen",
  "/leistungen/websites",
  "/leistungen/apps-portale",
  "/leistungen/agenten-automatisierung",
  "/leistungsumfang",
  "/loesungen",
  "/portale",
  "/preise-ablauf",
  "/produkte/aifly-oracle",
  "/produkte/api",
  "/produkte/nex-agentic-aifly",
  "/produkte/nex2fly",
  "/produkte/one",
  "/produkte/skills-mcp",
  "/unternehmen",
  "/wissen",
  "/wissen/projekt-vorbereiten",
  "/kontakt",
  "/teileklar",
  "/teileklar/shop",
  "/teileklar/kategorien",
  "/teileklar/suche",
  "/teileklar/werkstatt",
  "/teileklar/termine",
  "/teileklar/gutscheine",
  "/teileklar/partner-werden",
  "/teileklar/batterie-berater",
  "/teileklar/reifenrechner",
  "/teileklar/fahrzeug-und-passung",
  "/teileklar/rechtliches",
  "/impressum",
  "/datenschutz",
  "/cookies",
  "/ki-hinweise",
  "/barrierefreiheit",
  "/vertragsgrundlagen",
] as const;

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildSitemapXml(
  paths: readonly string[] = SITEMAP_PATHS,
  origin = SITE_ORIGIN,
): string {
  const entries = paths
    .map((path) => `  <url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

const SITEMAP_SET = new Set<string>(SITEMAP_PATHS);

/**
 * Kanonische Adresse einer öffentlichen Inhaltsseite auf nexifyai.de, sonst null.
 * Dieselben Seiten sind auch unter der Lovable-Vorschauadresse erreichbar; der Verweis
 * verhindert doppelte Inhalte in Suchmaschinen. Konto-, Warenkorb- und Kassenseiten erhalten keinen.
 */
export function canonicalFor(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return SITEMAP_SET.has(path) ? `${SITE_ORIGIN}${path}` : null;
}
