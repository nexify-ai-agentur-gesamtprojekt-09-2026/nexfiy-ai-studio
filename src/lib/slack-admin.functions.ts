import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getSlackDeliveryStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const role = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (role.error || !role.data) throw new Error("Dieser Bereich ist dem Inhaberkonto vorbehalten.");
    const receipts = await context.supabase.from("slack_delivery_receipts")
      .select("id, created_at, flow_id, outcome, error_code, entity_id")
      .order("created_at", { ascending: false }).limit(30);
    if (receipts.error) throw new Error("Slack-Belege konnten nicht geladen werden.");
    return { receipts: receipts.data, inboundConfigured: Boolean(process.env["SLACK_ORACLE_SIGNING_SECRET"]),
      oracleConfirmed: receipts.data.some((row) => row.flow_id === "oracle" && row.outcome === "ack") };
  });

/** Einmaliger Transporttest, kein ORACLE-Auftrag und kein Modellaufruf. */
export const sendSlackDeliveryTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const role = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (role.error || !role.data) throw new Error("Dieser Bereich ist dem Inhaberkonto vorbehalten.");
    const { deliverJobNotice } = await import("./slack-job-notice.server");
    const id = crypto.randomUUID();
    await deliverJobNotice(`transport-test:${id}`, "monitoring", `NeXify Slack-Transporttest ${id}. Nur Zustellprüfung: keine Betriebsaktion, kein Modellaufruf. Empfang durch ORACLE wird damit nicht bestätigt.`);
    return { id };
  });