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
