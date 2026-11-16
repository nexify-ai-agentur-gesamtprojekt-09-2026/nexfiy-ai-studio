import { allowedImageSource } from "./teileklar-catalog";
import { activeCutout } from "./teileklar-cutout";

export const CATALOG_IMAGE_BUCKET = "teileklar-product-images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const DEFAULT_BATCH = 10;
const MAX_BATCH = 40;
const PARALLEL = 4;
const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

interface ImageFile {
  bytes: ArrayBuffer;
  type: string;
}

/**
 * Bildquellen in fester Reihenfolge: zuerst das Lieferanten-CDN, dann die Bildablage des bisherigen Shops.
 * Gemessen am 16.11.: das CDN liefert für viele Artikel leere Dateien oder 404, der bisherige Shop hält einen Teil davon vor.
 * Weiterleitungen werden nicht verfolgt, damit nur die freigegebenen Quellen gelesen werden.
 */
function imageCandidates(source: string): string[] {
  return [source, `https://teileklar.shop/api/shop/image?src=${encodeURIComponent(source)}`];
}

async function fetchImage(source: string): Promise<ImageFile | null> {
  for (const url of imageCandidates(source)) {
    let response: Response;
    try {
      response = await fetch(url, {
        redirect: "manual",
        headers: {
          Accept: "image/jpeg,image/png,image/webp",
          "User-Agent": "Mozilla/5.0 (compatible; NeXifyCatalogSync/1.0)",
        },
        signal: AbortSignal.timeout(10000),
      });
    } catch {
      continue;
    }
    if (response.status !== 200) {
      await response.body?.cancel();
      continue;
    }
    const type = (response.headers.get("content-type") ?? "").split(";")[0]?.trim() ?? "";
    const declared = Number(response.headers.get("content-length") ?? "-1");
    if (!IMAGE_TYPES[type] || declared === 0 || declared > MAX_IMAGE_BYTES) {
      await response.body?.cancel();
      continue;
    }
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength === 0 || bytes.byteLength > MAX_IMAGE_BYTES) continue;
    return { bytes, type };
  }
  return null;
}

async function contentHash(bytes: ArrayBuffer): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return Array.from(digest.slice(0, 8), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export interface ImageMirrorStep {
  processed: number;
  stored: number;
  missing: number;
  failed: number;
  remaining: number;
  durationMs: number;
}

/**
 * Holt Produktfotos für neue oder geänderte Bildquellen in die eigene private Ablage.
 * Fehlt ein Bild an allen Quellen, bleibt eine vorhandene Kopie erhalten; es wird nichts gelöscht.
 */
export async function mirrorCatalogImagesStep(requested?: number): Promise<ImageMirrorStep> {
  const started = Date.now();
  const batch = Math.min(Math.max(Math.trunc(requested ?? DEFAULT_BATCH), 1), MAX_BATCH);
  const { supabaseAdmin: admin } = await import("@/integrations/supabase/client.server");
  const pending = await admin
    .from("teileklar_products")
    .select("id, image_src, image_path")
    .eq("image_pending", true)
    .is("archived_at", null)
    .order("id")
    .limit(batch);
  if (pending.error) throw new Error(`Offene Bilder nicht lesbar: ${pending.error.message}`);
  const rows = pending.data ?? [];
  let stored = 0,
    missing = 0,
    failed = 0;

  const handle = async (row: (typeof rows)[number]) => {
    const source = allowedImageSource(row.image_src);
    const file = source ? await fetchImage(source) : null;
    let imagePath = row.image_path;
    if (file) {
      const path = `${row.id.replace(/[^A-Za-z0-9_-]/g, "_")}/${await contentHash(file.bytes)}.${IMAGE_TYPES[file.type]}`;
      const upload = await admin.storage
        .from(CATALOG_IMAGE_BUCKET)
        .upload(path, file.bytes, {
          contentType: file.type,
          cacheControl: "31536000",
          upsert: true,
        });
      if (upload.error) {
        failed += 1;
        console.error("catalog image upload failed", row.id, upload.error.message);
        return;
      }
      imagePath = path;
      stored += 1;
    } else {
      missing += 1;
    }
    const update = await admin
      .from("teileklar_products")
      .update({
        image_path: imagePath,
        image_checked_src: row.image_src,
        image_checked_at: new Date().toISOString(),
      })
      .eq("id", row.id);
    if (update.error) {
      failed += 1;
      console.error("catalog image state failed", row.id, update.error.message);
    }
  };

  for (let index = 0; index < rows.length; index += PARALLEL)
    await Promise.all(rows.slice(index, index + PARALLEL).map(handle));

  const remaining = await admin
    .from("teileklar_products")
    .select("id", { count: "exact", head: true })
    .eq("image_pending", true)
    .is("archived_at", null);
  if (remaining.error) throw new Error(`Offene Bilder nicht zählbar: ${remaining.error.message}`);
  return {
    processed: rows.length,
    stored,
    missing,
    failed,
    remaining: remaining.count ?? 0,
    durationMs: Date.now() - started,
  };
}

/** Liest eine gespeicherte Bildkopie für einen aktiven Katalogartikel; sonst null. */
export async function readCatalogImage(
  articleId: string,
): Promise<{ body: Blob; path: string } | null> {
  const { supabaseAdmin: admin } = await import("@/integrations/supabase/client.server");
  const row = await admin
    .from("teileklar_products")
    .select("image_path, image_cutout_path, image_cutout_of")
    .eq("id", articleId)
    .is("archived_at", null)
    .neq("image_path", "")
    .maybeSingle();
  if (row.error) throw new Error(`Bild nicht lesbar: ${row.error.message}`);
  if (!row.data) return null;
  // Freigestellte Fassung bevorzugen, solange sie zum aktuellen Original gehört.
  const path = activeCutout(row.data) || row.data.image_path;
  const file = await admin.storage.from(CATALOG_IMAGE_BUCKET).download(path);
  if (file.error || !file.data)
    throw new Error(`Bilddatei nicht lesbar: ${file.error?.message ?? "leer"}`);
  return { body: file.data, path };
}
