/**
 * Serverfunktion fuer den TEILEKLAR-Livebestand.
 *
 * Warum: Der Bestand des Kunden liegt unter https://teileklar.shop/api/shop/products und
 * erlaubt kein CORS. Der Browser darf ihn deshalb nicht direkt lesen; diese Funktion holt
 * ihn serverseitig, normalisiert ihn und cached das Ergebnis kurz.
 *
 * Grenzen (bewusst): Upstream kennt nur `q`, `limit`, `offset` — keine Kategorie- und
 * Sortierparameter. Kategorie/Sortierung passieren daher im Client auf der geladenen
 * Seite. Wenn der Kunde echte Filter bekommt, faellt das hier ohne Aenderung weg.
 *
 * 2026-11-19 21:45 (Europe/Berlin) — angelegt.
 */
import { createServerFn } from "@tanstack/react-start";
import { normalizeProduct, type ShopProduct } from "./shop";

const UPSTREAM = "https://teileklar.shop/api/shop/products";
const CACHE_MS = 5 * 60 * 1000;
const MAX_LIMIT = 60;

interface ShopQueryInput {
  q?: string;
  limit?: number;
  offset?: number;
}

export interface ShopPage {
  items: ShopProduct[];
  total: number;
  fetchedAt: string;
  source: "live" | "cache" | "unavailable";
}

const cache = new Map<string, { at: number; page: ShopPage }>();

async function loadPage(q: string, limit: number, offset: number): Promise<ShopPage> {
  const key = `${q}|${limit}|${offset}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) {
    return { ...hit.page, source: "cache" };
  }

  const url = new URL(UPSTREAM);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  if (q) url.searchParams.set("q", q);

  try {
    const response = await fetch(url, {
      headers: { accept: "application/json", "user-agent": "nexifyai-website/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`upstream ${response.status}`);
    const payload = (await response.json()) as {
      items?: Record<string, unknown>[];
      total?: number;
    };
    const items = (payload.items ?? [])
      .map(normalizeProduct)
      .filter((item): item is ShopProduct => item !== null);
    const page: ShopPage = {
      items,
      total: Number(payload.total ?? items.length),
      fetchedAt: new Date().toISOString(),
      source: "live",
    };
    cache.set(key, { at: Date.now(), page });
    return page;
  } catch {
    // Letzter bekannter Stand ist besser als eine leere Seite — aber als solcher gekennzeichnet.
    if (hit) return { ...hit.page, source: "cache" };
    return { items: [], total: 0, fetchedAt: new Date().toISOString(), source: "unavailable" };
  }
}

export const getShopProducts = createServerFn({ method: "GET" })
  .validator((input: ShopQueryInput | undefined) => {
    const q = typeof input?.q === "string" ? input.q.trim().slice(0, 80) : "";
    const limit = Math.min(Math.max(Number(input?.limit ?? 24), 1), MAX_LIMIT);
    const offset = Math.max(Number(input?.offset ?? 0), 0);
    return { q, limit, offset };
  })
  .handler(async ({ data }): Promise<ShopPage> => loadPage(data.q, data.limit, data.offset));
