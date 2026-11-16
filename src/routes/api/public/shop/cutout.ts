import { createFileRoute } from "@tanstack/react-router";
import { isServerWorker } from "@/lib/server-worker-auth";
import { MAX_CUTOUT_BYTES, cutoutStoragePath, isWebpImage } from "@/lib/teileklar-cutout";

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

/** Prüft das Anmelde-Token und die Admin-Rolle mit den Rechten des Aufrufers, nicht mit Dienstrechten. */
async function verifyAdmin(request: Request): Promise<boolean> {
  const header = request.headers.get("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token || token.startsWith("sb_")) return false;
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Anmeldung ist nicht konfiguriert.");
  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}`, apikey: key } },
  });
  const user = await client.auth.getUser(token);
  if (user.error || !user.data.user) return false;
  const role = await client.rpc("has_role", { _user_id: user.data.user.id, _role: "admin" });
  return !role.error && role.data === true;
}

/**
 * Nimmt die freigestellte Fassung eines Produktfotos an (nur Admin-Konten).
 * Das Original bleibt unverändert; gespeichert wird zusätzlich, und nur für genau das angegebene Original.
 */
export const Route = createFileRoute("/api/public/shop/cutout")({
  server: {
    handlers: {
      /** Liste aktiver Artikel mit Foto, aber ohne gültige Freistellung – nur für den Server-Auftrag. */
      GET: async ({ request }) => {
        try {
          if (!(await isServerWorker(request))) return json(401, { error: "Nicht berechtigt" });
          const { supabaseAdmin: admin } = await import("@/integrations/supabase/client.server");
          const rows = await admin
            .from("teileklar_products")
            .select("id, image_path, image_cutout_of")
            .is("archived_at", null)
            .neq("image_path", "")
            .order("id")
            .limit(2000);
          if (rows.error) throw new Error(rows.error.message);
          const offen = (rows.data ?? [])
            .filter((r) => r.image_cutout_of !== r.image_path)
            .map((r) => ({ artikel: r.id, quelle: r.image_path }));
          return json(200, { offen });
        } catch (error) {
          console.error(
            "catalog cutout list failed",
            error instanceof Error ? error.message : error,
          );
          return json(500, { error: "Liste fehlgeschlagen" });
        }
      },
      POST: async ({ request }) => {
        try {
          if (!(await isServerWorker(request)) && !(await verifyAdmin(request)))
            return json(401, { error: "Nicht berechtigt" });
          const params = new URL(request.url).searchParams;
          const articleId = (params.get("artikel") ?? "").trim();
          const source = (params.get("quelle") ?? "").trim();
          if (!articleId || articleId.length > 80 || !source || source.length > 200)
            return json(400, { error: "Artikel oder Quelle fehlt" });
          const declared = Number(request.headers.get("Content-Length") ?? "0");
          if (declared > MAX_CUTOUT_BYTES) return json(413, { error: "Datei zu groß" });
          const bytes = new Uint8Array(await request.arrayBuffer());
          if (bytes.length === 0 || bytes.length > MAX_CUTOUT_BYTES)
            return json(413, { error: "Datei leer oder zu groß" });
          if (!isWebpImage(bytes)) return json(415, { error: "Nur WebP-Dateien" });

          const { supabaseAdmin: admin } = await import("@/integrations/supabase/client.server");
          const { CATALOG_IMAGE_BUCKET } = await import("@/lib/teileklar-image-mirror.server");
          const row = await admin
            .from("teileklar_products")
            .select("id, image_path")
            .eq("id", articleId)
            .is("archived_at", null)
            .maybeSingle();
          if (row.error) throw new Error(row.error.message);
          if (!row.data) return json(404, { error: "Artikel nicht aktiv" });
          if (row.data.image_path !== source)
            return json(409, { error: "Original hat sich geändert" });

          const digest = await crypto.subtle.digest("SHA-256", bytes);
          const hex = [...new Uint8Array(digest)]
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
          const path = cutoutStoragePath(articleId, hex);
          const upload = await admin.storage
            .from(CATALOG_IMAGE_BUCKET)
            .upload(path, bytes, { contentType: "image/webp", upsert: true });
          if (upload.error) throw new Error(upload.error.message);
          const update = await admin
            .from("teileklar_products")
            .update({ image_cutout_path: path, image_cutout_of: source })
            .eq("id", articleId)
            .eq("image_path", source);
          if (update.error) throw new Error(update.error.message);
          return json(200, { artikel: articleId, pfad: path });
        } catch (error) {
          console.error("catalog cutout failed", error instanceof Error ? error.message : error);
          return json(500, { error: "Speichern fehlgeschlagen" });
        }
      },
    },
  },
});
