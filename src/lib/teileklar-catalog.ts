/**
 * TEILEKLAR-Katalog: Abbildung des bestehenden Shop-Feeds auf eigene Datensätze, Bildquellen-Freigabe und Anzeigeformate.
 * Rein und testbar; Abgleich, Abfragen und Bildweiterleitung nutzen nur diese Regeln.
 */
import { catalogArea } from "./teileklar-areas";

export const CATALOG_FEED_URL = "https://teileklar.shop/api/shop/products";
export const CATALOG_PAGE_SIZE = 24;
export const CATALOG_QUERY_MAX = 80;
/** Ein Abgleich gilt nur als vollständig, wenn mindestens dieser Anteil der gemeldeten Artikel geliefert wurde. */
export const CATALOG_MIN_COMPLETENESS = 0.95;

const IMAGE_HOSTS = new Set(["cdnbigbuy.com", "www.cdnbigbuy.com"]);

export interface CatalogSpec { label: string; value: string }

export interface CatalogRow {
  id: string;
  name: string;
  brand: string;
  /** Sortimentsbereich, aus dem Artikelnamen abgeleitet (siehe teileklar-areas.ts). */
  category: string;
  /** Unveränderte Kategorie des Lieferanten-Feeds, nur zur Nachvollziehbarkeit. */
  source_category: string;
  price_value: number | null;
  ean: string;
  oe_number: string;
  condition: string;
  image_src: string;
  image_alt: string;
  specs: CatalogSpec[];
  status_label: string;
  delivery_note: string;
  stock: number;
  source: string;
  feed_created_at: string | null;
}

const text = (value: unknown, max = 300) => (typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "");

/** Nur HTTPS-Bilder des Lieferanten-CDN sind erlaubt; alles andere wird verworfen. */
export function allowedImageSource(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !IMAGE_HOSTS.has(url.hostname) || url.username || url.password || url.port) return null;
    return url.href;
  } catch {
    return null;
  }
}

/** Der Feed liefert Bilder als eigene Weiterleitung (/api/shop/image?src=…); hier wird die Originalquelle herausgelöst. */
export function feedImageSource(image: unknown): string {
  const raw = text(image, 1000);
  if (!raw) return "";
  try {
    const url = new URL(raw, "https://teileklar.shop");
    const inner = url.pathname.endsWith("/api/shop/image") ? url.searchParams.get("src") ?? "" : url.href;
    return allowedImageSource(inner) ?? "";
  } catch {
    return "";
  }
}

export function mapFeedItem(raw: unknown): CatalogRow | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const id = text(item["id"], 80) || text(item["sku"], 80);
  const name = text(item["name"]) || text(item["feed_title"]);
  if (!id || !name) return null;
  const value = typeof item["value"] === "number" && Number.isFinite(item["value"]) && item["value"] > 0 ? Math.round(item["value"] * 100) / 100 : null;
  const specs = Array.isArray(item["specs"])
    ? item["specs"].flatMap((spec): CatalogSpec[] => {
        if (!spec || typeof spec !== "object") return [];
        const label = text((spec as Record<string, unknown>)["label"], 60);
        const specValue = text((spec as Record<string, unknown>)["value"], 200);
        return label && specValue ? [{ label, value: specValue }] : [];
      }).slice(0, 20)
    : [];
  const created = text(item["created_at"], 40);
  const stock = typeof item["stock"] === "number" && Number.isInteger(item["stock"]) && item["stock"] > 0 ? item["stock"] : 0;
  return {
    id,
    name,
    brand: text(item["brand"], 120) || text(item["maker"], 120),
    category: catalogArea(name),
    source_category: text(item["category"], 120),
    price_value: value,
    ean: text(item["ean"], 20).replace(/[^0-9]/g, ""),
    oe_number: text(item["oe"], 80),
    condition: text(item["condition"], 20),
    image_src: feedImageSource(item["image"]),
    image_alt: text(item["alt"]) || name,
    specs,
    status_label: text(item["status_label"], 60),
    delivery_note: text(item["delivery_short"], 120),
    stock,
    source: text(item["source"], 60),
    feed_created_at: created && !Number.isNaN(Date.parse(created)) ? created : null,
  };
}

/** Eigene Bildadresse, damit Besucher keine Inhalte direkt vom Lieferanten laden. */
export function catalogImageUrl(source: string): string | null {
  const allowed = allowedImageSource(source);
  return allowed ? `/api/public/shop/image?src=${encodeURIComponent(allowed)}` : null;
}

const PRICE = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
export function formatPrice(value: number | null): string | null {
  return value === null ? null : PRICE.format(value);
}

/** Suchbegriff für PostgREST-Filter: Steuerzeichen der Filtersyntax entfernen, Länge begrenzen. */
export function normalizeCatalogQuery(value: unknown): string {
  return text(value, CATALOG_QUERY_MAX).replace(/[%,()*\\:"']/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizePage(value: unknown): number {
  const page = typeof value === "number" ? value : typeof value === "string" ? Number.parseInt(value, 10) : 1;
  return Number.isInteger(page) && page >= 1 && page <= 1000 ? page : 1;
}

export function availabilityLabel(row: Pick<CatalogRow, "stock" | "delivery_note">): string {
  if (row.stock > 0) return row.delivery_note || "Laut Katalog vorrätig";
  return "Verfügbarkeit auf Anfrage";
}

export function catalogProductPath(id: string): string {
  return `/teileklar/produkt?artikel=${encodeURIComponent(id)}`;
}
