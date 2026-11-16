import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

/** Täglicher Abgleich des TEILEKLAR-Katalogs in kurzen Schritten; nur der verwaltete Zeitplan darf ihn auslösen. */
export const Route = createFileRoute("/api/public/jobs/teileklar-catalog-sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authFailure = await authenticateCronRequest(request);
        if (authFailure) return authFailure;
        let restart = false;
        try {
          restart = ((await request.json()) as { restart?: unknown }).restart === true;
        } catch {
          restart = false;
        }
        try {
          const { syncTeileklarCatalogStep } = await import("@/lib/teileklar-catalog-sync.server");
          const result = await syncTeileklarCatalogStep(new Date(), { restart });
          console.info("teileklar catalog sync step", result);
          let slack: "not_required" | "delivered_or_duplicate" | "failed" = "not_required";
          if (result.state === "abgeschlossen") {
            try {
              const { deliverJobNotice } = await import("@/lib/slack-job-notice.server");
              await deliverJobNotice(`catalog:${result.runDate}:${result.complete}`, "catalog",
                `Katalogabgleich ${result.runDate}: ${result.complete ? "vollständig" : "unvollständig"}. ${result.stored} von ${result.reportedTotal} Artikeln; ${result.archived} archiviert. Kein neuer Importauftrag ausgelöst.`);
              slack = "delivered_or_duplicate";
            } catch { slack = "failed"; console.error("catalog_slack_delivery_failed"); }
          }
          return Response.json({ success: result.complete !== false, slack, ...result });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("teileklar catalog sync failed", message);
          return Response.json({ success: false, error: message }, { status: 502 });
        }
      },
    },
  },
});
