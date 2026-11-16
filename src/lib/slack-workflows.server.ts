import { decideSlackInput, slackOverviewText, type SlackInput } from "./slack-flows";
import { STATUS_LABELS } from "./inquiry-inbox";
import { postSlackNotice } from "./inquiry-delivery.server";

/** Kein zweiter Auftragsbestand: ausschließlich Beleg schreiben und bestehende Vorgänge aktualisieren. */
export async function processSlackInput(input: SlackInput): Promise<void> {
  const decision = decideSlackInput(input);
  if (decision.kind === "ignore") return;
  const { supabaseAdmin: admin } = await import("@/integrations/supabase/client.server");
  const receipt = await admin.from("slack_delivery_receipts").insert({
    team_id: input.team, event_key: input.key, actor_id: input.actor, channel_id: input.channel,
    thread_ts: input.thread ?? null, flow_id: decision.kind === "status" ? "inquiry" : "oracle",
  }).select("id").single();
  if (receipt.error?.code === "23505") return;
  if (receipt.error || !receipt.data) throw new Error("slack_receipt_write_failed");
  const receiptId = receipt.data.id;
  try {
    let reply: string | null = null;
    let entityId: string | null = null;
    let entityTable: "inquiries" | "teileklar_part_inquiries" | null = null;
    if (decision.kind === "status") {
      for (const table of ["inquiries", "teileklar_part_inquiries"] as const) {
        const found = await admin.from(table).select("id, slack_channel_id, slack_message_ts").eq("id", decision.id).maybeSingle();
        if (found.error) throw new Error("slack_entity_read_failed");
        if (!found.data) continue;
        if (found.data.slack_channel_id !== input.channel || !input.thread || found.data.slack_message_ts !== input.thread)
          throw new Error("slack_entity_thread_mismatch");
        const changed = await admin.from(table).update({ status: decision.status, updated_at: new Date().toISOString() }).eq("id", decision.id);
        if (changed.error) throw new Error("slack_status_update_failed");
        entityId = decision.id; entityTable = table;
        reply = `Vorgang ${decision.id}: ${STATUS_LABELS[decision.status]}. Im Arbeitsplatz gespeichert.`;
        break;
      }
      if (!entityId) throw new Error("slack_entity_not_found");
    } else if (decision.kind === "overview") reply = slackOverviewText();
    else if (decision.kind === "blocked") reply = "Keine Aktion ausgelöst. Unterstützt sind Ablaufstatus und eindeutige Statusänderungen im Anfrage-Thread. Kosten, Import, SSH und Rechte bleiben gesperrt.";
    else {
      // Fremde ACK/RESULT brauchen einen vorher bekannten Ursprung, sonst sind sie kein belastbarer Beleg.
      const origin = await admin.from("slack_delivery_receipts").select("id").eq("channel_id", input.channel).eq("thread_ts", input.thread ?? "").neq("id", receiptId).limit(1);
      if (origin.error || !origin.data?.length) throw new Error("slack_unknown_origin");
    }
    if (reply) await postSlackNotice(reply, { channel: input.channel, ...(input.thread ? { threadTs: input.thread } : {}) });
    const done = await admin.from("slack_delivery_receipts").update({
      outcome: decision.kind === "ack" ? "ack" : decision.kind === "blocked" ? "ignored" : "result",
      entity_id: entityId, entity_table: entityTable, updated_at: new Date().toISOString(),
    }).eq("id", receiptId);
    if (done.error) throw new Error("slack_receipt_update_failed");
  } catch (error) {
    const code = error instanceof Error && /^slack_[a-z_]+$/.test(error.message) ? error.message : "slack_processing_failed";
    const failed = await admin.from("slack_delivery_receipts").update({ outcome: "failed", error_code: code, updated_at: new Date().toISOString() }).eq("id", receiptId);
    if (failed.error) console.error("slack_receipt_failure_write_failed");
    throw new Error(code);
  }
}