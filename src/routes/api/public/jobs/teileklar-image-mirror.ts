import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

/** Holt neue Produktfotos in kleinen Schritten in die eigene Ablage; nur der verwaltete Zeitplan darf ihn auslösen. */
export const Route = createFileRoute("/api/public/jobs/teileklar-image-mirror")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authFailure = await authenticateCronRequest(request);
        if (authFailure) return authFailure;
        let limit: number | undefined;
        try {
          const body = (await request.json()) as { limit?: unknown };
          if (typeof body.limit === "number") limit = body.limit;
        } catch {
          limit = undefined;
        }
        try {
          const { mirrorCatalogImagesStep } = await import("@/lib/teileklar-image-mirror.server");
          const result = await mirrorCatalogImagesStep(limit);
          console.info("teileklar image mirror step", result);
          return Response.json({ success: result.failed === 0, ...result });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("teileklar image mirror failed", message);
          return Response.json({ success: false, error: message }, { status: 502 });
        }
      },
    },
  },
});
