import { SLACK_WORKSPACE } from "./slack-flows";
import { postSlackNotice } from "./inquiry-delivery.server";

/** Zeitpläne bleiben führend; ein eindeutiger Zustellbeleg verhindert wiederholte Abschlussmeldungen. */
export async function deliverJobNotice(key: string, flow: "catalog" | "images" | "monitoring", text: string) {
  const { supabaseAdmin: admin } = await import("@/integrations/supabase/client.server");
  const created = await admin.from("slack_delivery_receipts").insert({ team_id: SLACK_WORKSPACE.team,
    event_key: key, flow_id: flow, actor_id: "website-job", channel_id: SLACK_WORKSPACE.owner,
  }).select("id").single();
  if (created.error?.code === "23505") return { duplicate: true };
  if (created.error || !created.data) throw new Error("slack_job_receipt_failed");
  try {
    const sent = await postSlackNotice(text);
    const done = await admin.from("slack_delivery_receipts").update({ outcome: "result", channel_id: sent.channel,
      thread_ts: sent.ts, updated_at: new Date().toISOString() }).eq("id", created.data.id);
    if (done.error) throw new Error("slack_job_receipt_update_failed");
    return { duplicate: false };
  } catch {
    const failed = await admin.from("slack_delivery_receipts").update({ outcome: "failed", error_code: "slack_delivery_failed", updated_at: new Date().toISOString() }).eq("id", created.data.id);
    if (failed.error) console.error("slack_job_failure_receipt_failed");
    throw new Error("slack_job_delivery_failed");
  }
}