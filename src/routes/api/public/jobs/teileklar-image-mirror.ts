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
          let slack: "not_required" | "delivered_or_duplicate" | "failed" = "not_required";
          if (result.processed > 0 && (result.remaining === 0 || result.failed > 0)) {
            try {
              const { deliverJobNotice } = await import("@/lib/slack-job-notice.server");
              const slot = result.failed > 0 ? Math.floor(Date.now() / 600000) : new Date().toISOString().slice(0, 10);
              await deliverJobNotice(`images:${slot}:${result.failed > 0 ? "failed" : "complete"}`, "images",
                `Fotokopie: ${result.stored} gespeichert, ${result.missing} ohne Quelle, ${result.failed} Fehler, ${result.remaining} offen. Originale bleiben erhalten.`);
              slack = "delivered_or_duplicate";
            } catch { slack = "failed"; console.error("images_slack_delivery_failed"); }
          }
          return Response.json({ success: result.failed === 0, slack, ...result });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("teileklar image mirror failed", message);
          return Response.json({ success: false, error: message }, { status: 502 });
        }
      },
    },
  },
});
