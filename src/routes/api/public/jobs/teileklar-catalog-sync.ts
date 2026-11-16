import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

/** Täglicher Abgleich des TEILEKLAR-Katalogs; nur der verwaltete Zeitplan darf ihn auslösen. */
export const Route = createFileRoute("/api/public/jobs/teileklar-catalog-sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authFailure = await authenticateCronRequest(request);
        if (authFailure) return authFailure;
        try {
          const { syncTeileklarCatalog } = await import("@/lib/teileklar-catalog-sync.server");
          const result = await syncTeileklarCatalog();
          console.info("teileklar catalog sync", result);
          return Response.json({ success: true, ...result }, { status: result.complete ? 200 : 207 });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error("teileklar catalog sync failed", message);
          return Response.json({ success: false, error: message }, { status: 502 });
        }
      },
    },
  },
});
