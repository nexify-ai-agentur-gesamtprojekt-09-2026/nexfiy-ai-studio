/** TEILEKLAR ist ein eigener Mandant mit eigener Domain: alte Pfade gehören dorthin.
 *  public/_redirects bedient nur die Asset-Schicht (workers.dev); hinter www.nexifyai.de
 *  beantwortete das Framework /teileklar mit 404. Diese Tabelle greift im Worker selbst. */
export const TEILEKLAR_REDIRECTS: Record<string, string> = {
  "/teileklar/werkstatt": "https://teileklar.shop/werkstatt-partner",
  "/teileklar/fahrzeug-und-passung": "https://teileklar.shop/fitment-checker",
  "/teileklar/kategorien": "https://teileklar.shop/shop",
  "/teileklar/suche": "https://teileklar.shop/shop",
  "/teileklar/rechtliches": "https://teileklar.shop/impressum",
  "/teileklar/warenkorb": "https://teileklar.shop/shop",
  "/teileklar/kasse": "https://teileklar.shop/shop",
  "/teileklar/gutscheine": "https://teileklar.shop/shop",
  "/teileklar/bestellungen": "https://teileklar.shop/kundenportal",
  "/teileklar/termine": "https://teileklar.shop/werkstatt-partner",
};

/** Ziel für einen TEILEKLAR-Pfad; alles Unbekannte auf die Startseite des Shops. */
export function teileklarTarget(pathname: string): string | undefined {
  if (pathname !== "/teileklar" && !pathname.startsWith("/teileklar/")) return undefined;
  return TEILEKLAR_REDIRECTS[pathname.replace(/\/$/, "")] ?? "https://teileklar.shop/";
}
