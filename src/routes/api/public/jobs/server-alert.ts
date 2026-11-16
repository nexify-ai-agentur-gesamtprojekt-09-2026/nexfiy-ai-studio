import { createFileRoute } from "@tanstack/react-router";
import { isServerWorker } from "@/lib/server-worker-auth";
import { serverAlertSchema } from "@/lib/server-alert";

/** Leitet eine Meldung der Server-Aufträge als Slack-Nachricht weiter; nur mit Server-Schlüssel. */
export const Route = createFileRoute("/api/public/jobs/server-alert")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await isServerWorker(request))) return new Response("Unauthorized", { status: 401 });
        const parsed = serverAlertSchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response("Ungültige Meldung", { status: 400 });
        const { quelle, stand, detail } = parsed.data;
        const titel = quelle === "ueberwachung" ? "Überwachung nexifyai.de" : "Foto-Freistellung";
        const zeichen = stand === "fehler" ? "🔴" : stand === "bericht" ? "📋" : "🟢";
        try {
          const { postSlackNotice } = await import("@/lib/inquiry-delivery.server");
          await postSlackNotice(`${zeichen} ${titel}: ${detail}`);
          return Response.json({ ok: true });
        } catch (error) {
          console.error("server alert failed", error instanceof Error ? error.message : error);
          return new Response("Slack-Meldung fehlgeschlagen", { status: 502 });
        }
      },
    },
  },
});
