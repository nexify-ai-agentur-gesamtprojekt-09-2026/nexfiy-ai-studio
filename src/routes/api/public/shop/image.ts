import { createFileRoute } from "@tanstack/react-router";
import { allowedImageSource } from "@/lib/teileklar-catalog";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Bildweiterleitung für Katalogartikel: nur freigegebene Lieferantenbilder, nur Bildformate, begrenzte Größe. */
export const Route = createFileRoute("/api/public/shop/image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const source = allowedImageSource(new URL(request.url).searchParams.get("src") ?? "");
        if (!source) return new Response("Bildquelle nicht erlaubt", { status: 400 });
        let upstream: Response;
        try {
          upstream = await fetch(source, { headers: { Accept: "image/avif,image/webp,image/jpeg,image/png" }, redirect: "error", signal: AbortSignal.timeout(10000) });
        } catch (error) {
          console.error("catalog image fetch failed", source, error instanceof Error ? error.message : error);
          return new Response("Bild nicht erreichbar", { status: 502 });
        }
        if (!upstream.ok) return new Response("Bild nicht gefunden", { status: upstream.status === 404 ? 404 : 502 });
        const type = upstream.headers.get("content-type") ?? "";
        if (!/^image\/(jpeg|png|webp|avif|gif)$/.test(type.split(";")[0]?.trim() ?? "")) return new Response("Kein Bildformat", { status: 415 });
        const length = Number(upstream.headers.get("content-length") ?? "0");
        if (length > MAX_IMAGE_BYTES) return new Response("Bild zu groß", { status: 413 });
        const body = await upstream.arrayBuffer();
        if (body.byteLength > MAX_IMAGE_BYTES) return new Response("Bild zu groß", { status: 413 });
        return new Response(body, {
          headers: {
            "Content-Type": type,
            "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
            "X-Content-Type-Options": "nosniff",
            "Content-Security-Policy": "default-src 'none'; sandbox",
          },
        });
      },
    },
  },
});
