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

export interface CatalogSpec {
  label: string;
  value: string;
}

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

const text = (value: unknown, max = 300) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Nur HTTPS-Bilder des Lieferanten-CDN sind erlaubt; alles andere wird verworfen. */
export function allowedImageSource(value: string): string | null {
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      !IMAGE_HOSTS.has(url.hostname) ||
      url.username ||
      url.password ||
      url.port
    )
      return null;
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
    const inner = url.pathname.endsWith("/api/shop/image")
      ? (url.searchParams.get("src") ?? "")
      : url.href;
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
  const value =
    typeof item["value"] === "number" && Number.isFinite(item["value"]) && item["value"] > 0
      ? Math.round(item["value"] * 100) / 100
      : null;
  const specs = Array.isArray(item["specs"])
    ? item["specs"]
        .flatMap((spec): CatalogSpec[] => {
          if (!spec || typeof spec !== "object") return [];
          const label = text((spec as Record<string, unknown>)["label"], 60);
          const specValue = text((spec as Record<string, unknown>)["value"], 200);
          return label && specValue ? [{ label, value: specValue }] : [];
        })
        .slice(0, 20)
    : [];
  const created = text(item["created_at"], 40);
  const stock =
    typeof item["stock"] === "number" && Number.isInteger(item["stock"]) && item["stock"] > 0
      ? item["stock"]
      : 0;
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

/**
 * Adresse der eigenen Bildkopie (private Ablage, ausgeliefert über /api/public/shop/image).
 * Der Dateiname enthält eine Inhaltsprüfsumme und dient als Versionsparameter, damit geänderte Fotos nicht aus dem Cache kommen.
 */
export function catalogImageUrl(articleId: string, imagePath: string): string | null {
  if (!articleId || !imagePath) return null;
  const version = imagePath.split("/").pop()?.split(".")[0] ?? "";
  return `/api/public/shop/image?artikel=${encodeURIComponent(articleId)}${version ? `&v=${encodeURIComponent(version)}` : ""}`;
}

const PRICE = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
export function formatPrice(value: number | null): string | null {
  return value === null ? null : PRICE.format(value);
}

/** Suchbegriff für PostgREST-Filter: Steuerzeichen der Filtersyntax entfernen, Länge begrenzen. */
export function normalizeCatalogQuery(value: unknown): string {
  return text(value, CATALOG_QUERY_MAX)
    .replace(/[%,()*\\:"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizePage(value: unknown): number {
  const page =
    typeof value === "number" ? value : typeof value === "string" ? Number.parseInt(value, 10) : 1;
  return Number.isInteger(page) && page >= 1 && page <= 1000 ? page : 1;
}

export function availabilityLabel(row: Pick<CatalogRow, "stock" | "delivery_note">): string {
  if (row.stock > 0) return row.delivery_note || "Laut Katalog vorrätig";
  return "Verfügbarkeit auf Anfrage";
}

/** Sortierungen der Katalogliste; der Schlüssel steht so in der Adresse (?sortierung=). */
export const CATALOG_SORTS = [
  { key: "empfohlen", label: "Empfohlen" },
  { key: "preis-auf", label: "Preis aufsteigend" },
  { key: "preis-ab", label: "Preis absteigend" },
  { key: "name", label: "Name A–Z" },
] as const;
export type CatalogSort = (typeof CATALOG_SORTS)[number]["key"];
export const DEFAULT_CATALOG_SORT: CatalogSort = "empfohlen";

export function normalizeCatalogSort(value: unknown): CatalogSort {
  return CATALOG_SORTS.some((sort) => sort.key === value)
    ? (value as CatalogSort)
    : DEFAULT_CATALOG_SORT;
}

/** Preis einer Artikelgruppe: bei unterschiedlichen Ausführungspreisen „ab“ dem günstigsten. */
export function formatPriceRange(min: number | null, max: number | null): string | null {
  const low = formatPrice(min);
  if (low === null) return formatPrice(max);
  return max !== null && max > (min as number) ? `ab ${low}` : low;
}

/** Feed-Merkmale nutzen Dezimalpunkte („0.46 kg“); angezeigt wird deutsche Schreibweise. */
export function germanDecimals(value: string): string {
  return value.replace(/(\d)\.(\d)/g, "$1,$2");
}

export interface CatalogVariantSource {
  id: string;
  name?: string;
  specs: CatalogSpec[];
}

/** Namensteil, in dem sich die Ausführungen unterscheiden (z. B. die Größe „XL“ am Namensende). */
function nameSuffixes(variants: CatalogVariantSource[]): Map<string, string> | null {
  const words = variants.map((variant) => (variant.name ?? "").split(" ").filter(Boolean));
  if (new Set(words.map((list) => list.join(" "))).size < 2) return null;
  let common = 0;
  while (words.every((list) => list.length > common && list[common] === words[0]![common]))
    common++;
  return new Map(
    variants.map((variant, index) => [variant.id, words[index]!.slice(common).join(" ")]),
  );
}

const VARIANT_IGNORED_SPECS = new Set(["EAN", "Zustand"]);

/**
 * Bezeichnung je Ausführung: nur Merkmale, die sich zwischen den Ausführungen unterscheiden.
 * Liefert der Katalog keinen Unterschied, bleibt nur die Artikelnummer – Größen werden nicht erfunden.
 */
export function variantLabels(variants: CatalogVariantSource[]): Map<string, string> {
  const labels = new Map<string, string>();
  const specLabels = [
    ...new Set(variants.flatMap((variant) => variant.specs.map((spec) => spec.label))),
  ].filter((label) => !VARIANT_IGNORED_SPECS.has(label));
  const differing = specLabels.filter((label) => {
    const values = new Set(
      variants.map((variant) => variant.specs.find((spec) => spec.label === label)?.value ?? ""),
    );
    return values.size > 1;
  });
  const suffixes = nameSuffixes(variants);
  for (const variant of variants) {
    const suffix = suffixes?.get(variant.id);
    if (suffix) {
      labels.set(variant.id, suffix);
      continue;
    }
    const parts = differing.flatMap((label) => {
      const value = variant.specs.find((spec) => spec.label === label)?.value;
      return value ? [`${label} ${germanDecimals(value)}`] : [];
    });
    labels.set(variant.id, parts.join(" · "));
  }
  const counts = new Map<string, number>();
  for (const label of labels.values()) counts.set(label, (counts.get(label) ?? 0) + 1);
  for (const [id, label] of labels) {
    if (!label) labels.set(id, `Art.-Nr. ${id}`);
    else if ((counts.get(label) ?? 0) > 1) labels.set(id, `${label} · Art.-Nr. ${id}`);
  }
  return labels;
}

const LETTER_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

/** Rang einer Größenangabe (S < M < XL, 42 < 44); null, wenn die Bezeichnung keine Größe ist. */
export function sizeRank(label: string): number | null {
  const value = label.replace(/^Größe\s+/, "").trim();
  const letter = LETTER_SIZES.indexOf(value);
  if (letter >= 0) return letter;
  const multi = /^([2-6])XL$/.exec(value);
  if (multi) return LETTER_SIZES.indexOf("XL") + Number(multi[1]) - 1;
  const number = /^(\d{1,2})(?:[,.](\d))?(?:-\d{1,2})?$/.exec(value);
  if (number) return 100 + Number(number[1]) + Number(number[2] ?? 0) / 10;
  return null;
}

/** Ausführungen nach Größe ordnen, wenn alle Bezeichnungen Größen sind; sonst Reihenfolge beibehalten. */
export function orderVariants<T extends { id: string }>(
  variants: T[],
  labels: Map<string, string>,
): T[] {
  const ranks = variants.map((variant) => sizeRank(labels.get(variant.id) ?? ""));
  if (ranks.some((rank) => rank === null)) return variants;
  return variants
    .map((variant, index) => ({ variant, rank: ranks[index] as number, index }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map((entry) => entry.variant);
}

/** Verfügbarkeit einer Artikelgruppe, ohne einzelnen Ausführungen Bestand zuzuschreiben. */
export function groupAvailabilityLabel(item: {
  stock: number;
  delivery_note: string;
  in_stock: boolean;
  variant_count: number;
}): string {
  if (item.stock > 0 || item.variant_count <= 1) return availabilityLabel(item);
  return item.in_stock ? "Einzelne Ausführungen vorrätig" : "Verfügbarkeit auf Anfrage";
}

export function catalogProductPath(id: string): string {
  return `/teileklar/produkt?artikel=${encodeURIComponent(id)}`;
}
