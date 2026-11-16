import { CATALOG_FEED_URL, CATALOG_MIN_COMPLETENESS, mapFeedItem, type CatalogRow } from "./teileklar-catalog";

const FEED_LIMIT = 500;
/** Überlappende Seiten fangen die nicht stabile Reihenfolge des Feeds ab (gemessen: ohne Überlappung fehlt ein Artikel). */
const FEED_STEP = 450;
const UPSERT_CHUNK = 500;

interface FeedPage { items: unknown[]; total: number }

async function fetchFeedPage(offset: number): Promise<FeedPage> {
  const response = await fetch(`${CATALOG_FEED_URL}?limit=${FEED_LIMIT}&offset=${offset}`, {
    headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0 (compatible; NeXifyCatalogSync/1.0)" },
    signal: AbortSignal.timeout(15000),
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`Katalog-Feed antwortet mit ${response.status}: ${body.slice(0, 200)}`);
  const parsed = JSON.parse(body) as { items?: unknown; total?: unknown };
  if (!Array.isArray(parsed.items) || typeof parsed.total !== "number") throw new Error("Katalog-Feed liefert ein unbekanntes Format.");
  return { items: parsed.items, total: parsed.total };
}

export interface CatalogSyncResult {
  reportedTotal: number;
  received: number;
  stored: number;
  rejected: number;
  archived: number;
  complete: boolean;
  durationMs: number;
}

/** Holt den vollständigen Feed, speichert alle gültigen Artikel und blendet nur bei vollständigem Abgleich fehlende Artikel aus. */
export async function syncTeileklarCatalog(): Promise<CatalogSyncResult> {
  const started = Date.now();
  const runStartedAt = new Date(started).toISOString();
  const first = await fetchFeedPage(0);
  const offsets: number[] = [];
  for (let offset = FEED_STEP; offset < first.total; offset += FEED_STEP) offsets.push(offset);
  const pages = [first, ...(await Promise.all(offsets.map(fetchFeedPage)))];

  const rows = new Map<string, CatalogRow>();
  let rejected = 0;
  for (const page of pages) {
    for (const raw of page.items) {
      const row = mapFeedItem(raw);
      if (row) rows.set(row.id, row);
      else rejected += 1;
    }
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const all = [...rows.values()].map((row) => ({ ...row, specs: row.specs as unknown as never, synced_at: runStartedAt, archived_at: null }));
  const chunks: (typeof all)[] = [];
  for (let index = 0; index < all.length; index += UPSERT_CHUNK) chunks.push(all.slice(index, index + UPSERT_CHUNK));
  const results = await Promise.all(chunks.map((chunk) => supabaseAdmin.from("teileklar_products").upsert(chunk, { onConflict: "id" })));
  const failed = results.find((result) => result.error);
  if (failed?.error) throw new Error(`Katalog konnte nicht gespeichert werden: ${failed.error.message}`);

  const complete = first.total > 0 && rows.size >= Math.ceil(first.total * CATALOG_MIN_COMPLETENESS);
  let archived = 0;
  if (complete) {
    const archive = await supabaseAdmin
      .from("teileklar_products")
      .update({ archived_at: runStartedAt }, { count: "exact" })
      .lt("synced_at", runStartedAt)
      .is("archived_at", null);
    if (archive.error) throw new Error(`Nicht mehr gelieferte Artikel konnten nicht ausgeblendet werden: ${archive.error.message}`);
    archived = archive.count ?? 0;
  }

  return { reportedTotal: first.total, received: rows.size, stored: all.length, rejected, archived, complete, durationMs: Date.now() - started };
}
