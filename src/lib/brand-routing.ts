/**
 * Markentrennung fuer die produktive NeXify-Domain.
 * Der Cloudflare-SSR-Worker muss Redirects selbst behandeln: _redirects deckt
 * dynamische Worker-Routen nicht verlaesslich ab.
 * Keine Query-Parameter ueber Mandantengrenzen uebertragen (PII/Tracking).
 */
const SHOP_ORIGIN = 'https://teileklar.shop';

export const LEGACY_TEILEKLAR_PATHS: Readonly<Record<string, string>> = Object.freeze({
  '/teileklar/werkstatt': '/werkstatt-partner',
  '/teileklar/fahrzeug-und-passung': '/fitment-checker',
  '/teileklar/kategorien': '/shop',
  '/teileklar/suche': '/shop',
  '/teileklar/rechtliches': '/impressum',
  '/teileklar/warenkorb': '/shop',
  '/teileklar/kasse': '/shop',
  '/teileklar/gutscheine': '/shop',
  '/teileklar/bestellungen': '/kundenportal',
  '/teileklar/termine': '/werkstatt-partner',
});

/** Return an absolute redirect target for public GET/HEAD requests; never an arbitrary host. */
export function legacyTeileklarRedirect(rawUrl: string, method = 'GET'): string | null {
  if (method !== 'GET' && method !== 'HEAD') return null;
  let url: URL;
  try { url = new URL(rawUrl); } catch { return null; }
  if (url.protocol !== 'https:' || !['nexifyai.de', 'www.nexifyai.de'].includes(url.hostname)) return null;
  const path = url.pathname.replace(/\/+$/, '') || '/';
  if (path !== '/teileklar' && !path.startsWith('/teileklar/')) return null;
  const destination = LEGACY_TEILEKLAR_PATHS[path] ?? '/';
  return new URL(destination, SHOP_ORIGIN).toString();
}
