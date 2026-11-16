import { CATALOG_FEED_URL, CATALOG_MIN_COMPLETENESS, mapFeedItem, type CatalogRow } from "./teileklar-catalog";

const FEED_LIMIT = 500;
/** Überlappende Seiten fangen die nicht stabile Reihenfolge des Feeds ab (gemessen: ohne Überlappung fehlt ein Artikel). */
const FEED_STEP = 450;
/** Seiten je Aufruf: hält jeden Aufruf deutlich unter der Zeitgrenze des Zeitplans. */
const PAGES_PER_CALL = 1;

interface FeedPage { items: unknown[]; total: number }

async function fetchFeedPage(offset: number): Promise<FeedPage> {
  const response = await fetch(`${CATALOG_FEED_URL}?limit=${FEED_LIMIT}&offset=${offset}`, {
    headers: { Accept: "application/json", "User-Agent": "Mozilla/5.0 (compatible; NeXifyCatalogSync/1.0)" },
    signal: AbortSignal.timeout(10000),
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`Katalog-Feed antwortet mit ${response.status}: ${body.slice(0, 200)}`);
  const parsed = JSON.parse(body) as { items?: unknown; total?: unknown };
  if (!Array.isArray(parsed.items) || typeof parsed.total !== "number") throw new Error("Katalog-Feed liefert ein unbekanntes Format.");
  return { items: parsed.items, total: parsed.total };
}

export interface CatalogSyncStep {
  runDate: string;
  state: "fortgesetzt" | "abgeschlossen" | "bereits_abgeschlossen";
  reportedTotal: number;
  nextOffset: number;
  stored: number;
  rejected: number;
  archived: number;
  complete: boolean | null;
  durationMs: number;
}

type Admin = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

async function finalizeRun(admin: Admin, runDate: string, startedAt: string, reportedTotal: number) {
  const seen = await admin.from("teileklar_products").select("id", { count: "exact", head: true }).gte("synced_at", startedAt);
  if (seen.error) throw new Error(`Abgleich konnte nicht gezählt werden: ${seen.error.message}`);
  const seenCount = seen.count ?? 0;
  const complete = reportedTotal > 0 && seenCount >= Math.ceil(reportedTotal * CATALOG_MIN_COMPLETENESS);
  let archived = 0;
  if (complete) {
    const archive = await admin.from("teileklar_products").update({ archived_at: new Date().toISOString() }, { count: "exact" }).lt("synced_at", startedAt).is("archived_at", null);
    if (archive.error) throw new Error(`Nicht mehr gelieferte Artikel konnten nicht ausgeblendet werden: ${archive.error.message}`);
    archived = archive.count ?? 0;
  }
  const done = await admin.from("teileklar_catalog_sync_runs").update({
    complete, archived, received: seenCount, finished_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    last_error: complete ? null : `Unvollständig: ${seenCount} von ${reportedTotal} Artikeln geliefert; nichts ausgeblendet.`,
  }).eq("run_date", runDate);
  if (done.error) throw new Error(`Abgleich konnte nicht abgeschlossen werden: ${done.error.message}`);
  return { complete, archived, seenCount };
}

/**
 * Ein Schritt des täglichen Abgleichs: verarbeitet einige Feed-Seiten und setzt den Fortschritt im Tagesprotokoll fort.
 * Nach der letzten Seite werden nur bei vollständigem Abgleich nicht mehr gelieferte Artikel ausgeblendet (nie gelöscht).
 */
export async function syncTeileklarCatalogStep(now = new Date()): Promise<CatalogSyncStep> {
  const started = Date.now();
  const runDate = now.toISOString().slice(0, 10);
  const { supabaseAdmin: admin } = await import("@/integrations/supabase/client.server");

  const existing = await admin.from("teileklar_catalog_sync_runs").select("*").eq("run_date", runDate).maybeSingle();
  if (existing.error) throw new Error(`Abgleichsprotokoll nicht lesbar: ${existing.error.message}`);
  let run = existing.data;
  let firstPage: FeedPage | null = null;
  if (!run) {
    firstPage = await fetchFeedPage(0);
    const created = await admin.from("teileklar_catalog_sync_runs").insert({ run_date: runDate, reported_total: firstPage.total }).select("*").single();
    if (created.error) throw new Error(`Abgleich konnte nicht begonnen werden: ${created.error.message}`);
    run = created.data;
  }
  if (run.finished_at) {
    return { runDate, state: "bereits_abgeschlossen", reportedTotal: run.reported_total, nextOffset: run.next_offset, stored: run.received, rejected: run.rejected, archived: run.archived, complete: run.complete, durationMs: Date.now() - started };
  }

  const offsets: number[] = [];
  for (let offset = run.next_offset; offsets.length < PAGES_PER_CALL && offset < Math.max(run.reported_total, 1); offset += FEED_STEP) offsets.push(offset);
  const pages = await Promise.all(offsets.map((offset) => (offset === 0 && firstPage ? firstPage : fetchFeedPage(offset))));

  const rows = new Map<string, CatalogRow>();
  let rejected = 0;
  for (const page of pages) for (const raw of page.items) {
    const row = mapFeedItem(raw);
    if (row) rows.set(row.id, row);
    else rejected += 1;
  }
  const syncedAt = new Date().toISOString();
  if (rows.size > 0) {
    const upsert = await admin.from("teileklar_products").upsert(
      [...rows.values()].map((row) => ({ ...row, specs: row.specs as unknown as never, synced_at: syncedAt, archived_at: null })),
      { onConflict: "id" },
    );
    if (upsert.error) {
      await admin.from("teileklar_catalog_sync_runs").update({ last_error: upsert.error.message.slice(0, 500), updated_at: syncedAt }).eq("run_date", runDate);
      throw new Error(`Katalog konnte nicht gespeichert werden: ${upsert.error.message}`);
    }
  }

  const nextOffset = (offsets.at(-1) ?? run.next_offset) + FEED_STEP;
  const progress = await admin.from("teileklar_catalog_sync_runs").update({
    next_offset: nextOffset, received: run.received + rows.size, rejected: run.rejected + rejected, last_error: null, updated_at: syncedAt,
  }).eq("run_date", runDate);
  if (progress.error) throw new Error(`Fortschritt konnte nicht gespeichert werden: ${progress.error.message}`);

  if (nextOffset >= run.reported_total) {
    const result = await finalizeRun(admin, runDate, run.started_at, run.reported_total);
    return { runDate, state: "abgeschlossen", reportedTotal: run.reported_total, nextOffset, stored: result.seenCount, rejected: run.rejected + rejected, archived: result.archived, complete: result.complete, durationMs: Date.now() - started };
  }
  return { runDate, state: "fortgesetzt", reportedTotal: run.reported_total, nextOffset, stored: run.received + rows.size, rejected: run.rejected + rejected, archived: 0, complete: null, durationMs: Date.now() - started };
}
