/**
 * Livebestand fuer die TEILEKLAR-Referenzstrecken.
 *
 * Warum: Die Seiten zeigten erfundene Artikel und Schaltflaechen ohne Wirkung. Hier kommen
 * die echten Artikel aus dem Kundenbestand (ueber `getShopProducts`), dazu Suche, Sortierung
 * und ein Warenkorb, der im Browser bleibt. Der Abschluss ist bewusst eine Bestellanfrage
 * per E-Mail — eine zweite Kasse auf der Agenturseite waere eine Dublette zum echten Shop.
 *
 * 2026-11-19 22:20 (Europe/Berlin) — angelegt.
 */
import { useCallback, useEffect, useMemo, useState, type ReactElement } from "react";
import { getShopProducts, type ShopPage } from "@/lib/shop-server";
import {
  addToCart,
  applyQuery,
  cartCount,
  cartTotal,
  categoriesOf,
  formatEuro,
  inquiryMailto,
  removeFromCart,
  setQuantity,
  type CartLine,
  type ShopProduct,
} from "@/lib/shop";
import { INQUIRY_RECIPIENT } from "@/lib/inquiry";

const CART_KEY = "teileklar-cart-v1";

type Mode = "shop" | "suche" | "kategorien" | "warenkorb";

const TITLES: Record<Mode, string> = {
  shop: "Livebestand TEILEKLAR",
  suche: "Artikel suchen",
  kategorien: "Kategorien im Bestand",
  warenkorb: "Deine Anfrage",
};

export function LiveShop({ mode }: { mode: Mode }) {
  const [page, setPage] = useState<ShopPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"relevanz" | "preis-auf" | "preis-ab" | "name">("relevanz");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartReady, setCartReady] = useState(false);

  // Warenkorb aus dem Browser laden (erst im Client, damit SSR und Client gleich starten).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) setCart(JSON.parse(raw) as CartLine[]);
    } catch {
      /* defekter Speicher: leer starten */
    }
    setCartReady(true);
  }, []);

  useEffect(() => {
    if (!cartReady) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* Speicher voll oder gesperrt: Warenkorb gilt nur fuer diese Sitzung */
    }
  }, [cart, cartReady]);

  const load = useCallback(async (search: string) => {
    setLoading(true);
    try {
      const result = await getShopProducts({ data: { q: search, limit: 36 } });
      setPage(result);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load("");
  }, [load]);

  // Suche erst nach kurzer Pause, damit nicht jeder Tastendruck eine Anfrage ausloest.
  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (query.trim() === term) return;
      setTerm(query.trim());
      void load(query.trim());
    }, 400);
    return () => window.clearTimeout(handle);
  }, [query, term, load]);

  const products = page?.items ?? [];
  const categories = useMemo(() => categoriesOf(products), [products]);
  const visible = useMemo(
    () => applyQuery(products, { category: mode === "kategorien" ? "" : category, sort }),
    [products, category, sort, mode],
  );

  const count = cartCount(cart);
  const total = cartTotal(cart);

  return (
    <section className="live-shop" aria-labelledby="live-shop-title">
      <h2 id="live-shop-title">{TITLES[mode]}</h2>
      <p className="live-shop__hint">
        Echte Artikel aus dem TEILEKLAR-Bestand
        {page ? ` (${page.total.toLocaleString("de-DE")} Artikel)` : ""}. Preise und Verfügbarkeit
        bestätigt der Shop vor der Lieferung.
      </p>

      {mode !== "warenkorb" && (
        <div className="live-shop__controls">
          <label className="live-shop__field">
            <span>Suchbegriff</span>
            <input
              type="search"
              value={query}
              maxLength={80}
              placeholder="z. B. Bremse, Batterie, Sonax"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="live-shop__field">
            <span>Sortierung</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
              <option value="relevanz">Relevanz</option>
              <option value="preis-auf">Preis aufsteigend</option>
              <option value="preis-ab">Preis absteigend</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      )}

      {mode === "kategorien" && categories.length > 0 && (
        <div className="live-shop__controls" role="group" aria-label="Kategorie wählen">
          <button type="button" onClick={() => setCategory("")} aria-pressed={category === ""}>
            Alle
          </button>
          {categories.map((entry) => (
            <button
              key={entry.name}
              type="button"
              onClick={() => setCategory(entry.name)}
              aria-pressed={category === entry.name}
            >
              {entry.name} ({entry.count})
            </button>
          ))}
        </div>
      )}

      <p className="live-shop__status" aria-live="polite">
        {loading
          ? "Bestand wird geladen …"
          : page?.source === "unavailable"
            ? "Der Bestand ist gerade nicht erreichbar — bitte später erneut versuchen."
            : `${visible.length} von ${products.length} geladenen Artikeln · Warenkorb: ${count}`}
      </p>

      {mode === "warenkorb" ? (
        <>
          {cart.length === 0 ? (
            <p className="live-shop__empty">Noch keine Artikel ausgewählt.</p>
          ) : (
            <>
              <ul className="live-shop__cart">
                {cart.map((line) => (
                  <li key={line.id}>
                    <span>
                      <strong>{line.name}</strong>
                      <br />
                      <span className="live-shop__meta">
                        {line.id} · {formatEuro(line.price)} je Stück
                      </span>
                    </span>
                    <label>
                      <span className="live-shop__meta">Menge</span>
                      <br />
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={line.quantity}
                        onChange={(event) =>
                          setCart((current) =>
                            setQuantity(current, line.id, Number(event.target.value)),
                          )
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setCart((current) => removeFromCart(current, line.id))}
                    >
                      Entfernen
                    </button>
                  </li>
                ))}
              </ul>
              <p className="live-shop__sum">Zwischensumme: {formatEuro(total)}</p>
              <a className="live-shop__cta" href={inquiryMailto(cart, INQUIRY_RECIPIENT)}>
                Bestellanfrage per E-Mail senden
              </a>
            </>
          )}
        </>
      ) : (
        <ul className="live-shop__grid">
          {visible.map((product: ShopProduct) => (
            <li key={product.id} className="live-shop__card">
              <h3>{product.name}</h3>
              <p className="live-shop__meta">
                {product.maker || "TEILEKLAR"} · {product.category || "Sortiment"} · {product.id}
              </p>
              <p className="live-shop__price">{formatEuro(product.price)}</p>
              <button
                type="button"
                onClick={() => setCart((current) => addToCart(current, product))}
              >
                In den Warenkorb
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * Haengt den Livebestand an eine bestehende Referenzseite, ohne deren generiertes Markup
 * anzufassen: die Seite bleibt wie importiert, der Livebereich kommt darunter.
 */
export function withLiveShop(Inner: () => ReactElement, mode: Mode): () => ReactElement {
  return function LiveShopRoute() {
    return (
      <>
        <Inner />
        <LiveShop mode={mode} />
      </>
    );
  };
}
