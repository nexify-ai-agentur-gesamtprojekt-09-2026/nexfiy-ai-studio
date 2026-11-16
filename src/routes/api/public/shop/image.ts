import { createFileRoute } from "@tanstack/react-router";

/** Liefert die eigene Bildkopie eines aktiven Katalogartikels; andere Dateien der Ablage sind nicht erreichbar. */
export const Route = createFileRoute("/api/public/shop/image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const articleId = (new URL(request.url).searchParams.get("artikel") ?? "").trim();
        if (!articleId || articleId.length > 80)
          return new Response("Artikel fehlt", { status: 400 });
        try {
          const { readCatalogImage } = await import("@/lib/teileklar-image-mirror.server");
          const image = await readCatalogImage(articleId);
          if (!image)
            return new Response("Kein Bild", {
              status: 404,
              headers: { "Cache-Control": "public, max-age=3600" },
            });
          return new Response(image.body, {
            headers: {
              "Content-Type": image.body.type || "image/jpeg",
              "Cache-Control":
                "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400",
              "X-Content-Type-Options": "nosniff",
              "Content-Security-Policy": "default-src 'none'; sandbox",
            },
          });
        } catch (error) {
          console.error(
            "catalog image read failed",
            articleId,
            error instanceof Error ? error.message : error,
          );
          return new Response("Bild nicht verfügbar", { status: 502 });
        }
      },
    },
  },
});
