/**
 * TEILEKLAR-Livebestand: Normalisierung, Suche, Sortierung und Warenkorb.
 *
 * Warum: Die Referenzstrecken unter /teileklar/* zeigten bisher erfundene Artikel und
 * Schaltflaechen ohne Wirkung. Hier liegt die reine Logik, damit sie testbar bleibt und
 * die Seiten nur noch Darstellung sind. Datenquelle ist der echte Bestand des Kunden
 * (teileklar.shop), gelesen ueber die Serverfunktion in `shop-server.ts`.
 *
 * 2026-11-19 21:40 (Europe/Berlin) — angelegt.
 */

export interface ShopProduct {
  id: string;
  name: string;
  maker: string;
  category: string;
  price: number;
  image: string;
}

export interface CartLine extends ShopProduct {
  quantity: number;
}

export interface ShopQuery {
  search?: string;
  category?: string;
  sort?: "relevanz" | "preis-auf" | "preis-ab" | "name";
  limit?: number;
  offset?: number;
}

/** Preisangabe aus dem Bestand ist ein String wie "7.06 €" — hier nur die Zahl. */
export function parsePrice(raw: unknown): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw !== "string") return 0;
  const cleaned = raw
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}\b)/g, "")
    .replace(",", ".");
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

/** Der Bestand liefert gemischte Feldnamen; hier auf eine Form ziehen. */
export function normalizeProduct(raw: Record<string, unknown>): ShopProduct | null {
  const pick = (...keys: string[]): unknown => {
    for (const key of keys) {
      const value = raw[key];
      if (value !== undefined && value !== null && value !== "") return value;
    }
    return undefined;
  };
  const id = String(pick("id", "sku") ?? "").trim();
  const name = String(pick("name") ?? "").trim();
  if (!id || !name) return null;
  return {
    id,
    name,
    maker: String(pick("maker", "brand") ?? "").trim(),
    category: String(pick("category") ?? "").trim(),
    price: parsePrice(pick("value", "price")),
    image: String(pick("image") ?? "").trim(),
  };
}

/** Suchbegriff trifft Name, Hersteller oder Kategorie — ohne Akzent-/Umlautfallen. */
export function matchesSearch(product: ShopProduct, term: string): boolean {
  const needle = fold(term);
  if (!needle) return true;
  const haystack = fold(`${product.name} ${product.maker} ${product.category} ${product.id}`);
  return needle.split(/\s+/).every((part) => haystack.includes(part));
}

function fold(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function applyQuery(products: ShopProduct[], query: ShopQuery = {}): ShopProduct[] {
  let result = products;
  if (query.category) {
    const wanted = fold(query.category);
    result = result.filter((p) => fold(p.category) === wanted);
  }
  if (query.search) {
    result = result.filter((p) => matchesSearch(p, query.search as string));
  }
  switch (query.sort) {
    case "preis-auf":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "preis-ab":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "name":
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "de"));
      break;
    default:
      break;
  }
  const offset = Math.max(0, query.offset ?? 0);
  const limit = query.limit && query.limit > 0 ? query.limit : result.length;
  return result.slice(offset, offset + limit);
}

export function categoriesOf(products: ShopProduct[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    if (!p.category) continue;
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "de"));
}

/* ------------------------------- Warenkorb ------------------------------- */

export function addToCart(lines: CartLine[], product: ShopProduct, quantity = 1): CartLine[] {
  const amount = Math.max(1, Math.trunc(quantity));
  const existing = lines.find((line) => line.id === product.id);
  if (existing) {
    return lines.map((line) =>
      line.id === product.id ? { ...line, quantity: line.quantity + amount } : line,
    );
  }
  return [...lines, { ...product, quantity: amount }];
}

export function setQuantity(lines: CartLine[], id: string, quantity: number): CartLine[] {
  const amount = Math.trunc(quantity);
  if (amount <= 0) return lines.filter((line) => line.id !== id);
  return lines.map((line) => (line.id === id ? { ...line, quantity: amount } : line));
}

export function removeFromCart(lines: CartLine[], id: string): CartLine[] {
  return lines.filter((line) => line.id !== id);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartTotal(lines: CartLine[]): number {
  return Math.round(lines.reduce((sum, line) => sum + line.price * line.quantity, 0) * 100) / 100;
}

/** Deutsche Preisausgabe nach DIN 5008: 1.234,56 € */
export function formatEuro(value: number): string {
  return `${value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
}

/**
 * Bestellanfrage als mailto — bewusst kein Checkout: der Kunde hat keine offene
 * Bestellstrecke, und eine zweite Kasse auf der Agenturseite waere eine Dublette.
 */
export function inquiryMailto(lines: CartLine[], recipient: string): string {
  const subject = `Bestellanfrage TEILEKLAR (${cartCount(lines)} Position(en))`;
  const body = [
    "Guten Tag,",
    "",
    "ich interessiere mich für folgende Artikel:",
    "",
    ...lines.map(
      (line, index) =>
        `${index + 1}. ${line.quantity} × ${line.name} (${line.id}) — ${formatEuro(line.price * line.quantity)}`,
    ),
    "",
    `Zwischensumme: ${formatEuro(cartTotal(lines))}`,
    "",
    "Bitte prüfen Sie Verfügbarkeit und Lieferzeit und senden Sie mir ein Angebot.",
    "",
    "Mit freundlichen Grüßen",
  ].join("\n");
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
