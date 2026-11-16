import { INQUIRY_SLACK_CHANNEL } from "./inquiry-notification";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/slack/api";

type SlackNoticeOptions = { channel?: string; threadTs?: string; blocks?: unknown[] };
/** Sendet eine Slack-Meldung über die verbundene Slack-Verbindung; wirft mit Status und Antwort bei jedem Fehler. */
export async function postSlackNotice(text: string, options: SlackNoticeOptions = {}): Promise<{ channel: string; ts: string }> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const slackKey = process.env["SLACK_API_KEY"];
  if (!lovableKey) throw new Error("LOVABLE_API_KEY fehlt");
  if (!slackKey) throw new Error("SLACK_API_KEY fehlt – Slack-Verbindung nicht verknüpft");
  const response = await fetch(`${GATEWAY_URL}/chat.postMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": slackKey,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      channel: options.channel ?? INQUIRY_SLACK_CHANNEL,
      text,
      ...(options.threadTs ? { thread_ts: options.threadTs } : {}),
      ...(options.blocks ? { blocks: options.blocks } : {}),
      unfurl_links: false,
      unfurl_media: false,
    }),
    signal: AbortSignal.timeout(8000),
  });
  const body = await response.text();
  if (!response.ok)
    throw new Error(`Slack-Meldung fehlgeschlagen [${response.status}]: ${body.slice(0, 300)}`);
  const parsed = JSON.parse(body) as { ok?: boolean; error?: string; channel?: string; ts?: string };
  if (!parsed.ok) throw new Error(`Slack-Meldung abgelehnt: ${parsed.error ?? "unbekannt"}`);
  if (!parsed.channel || !parsed.ts) throw new Error("Slack-Zustellbeleg fehlt");
  return { channel: parsed.channel, ts: parsed.ts };
}

type NoticeTable = "inquiries" | "teileklar_part_inquiries";

/**
 * Meldet eine bereits gespeicherte Anfrage und hält das Ergebnis am Datensatz fest.
 * Ein Slack-Fehler macht die Anfrage nicht ungültig, bleibt aber im Arbeitsplatz sichtbar (slack_error).
 */
export async function deliverInquiryNotice(
  table: NoticeTable,
  id: string,
  text: string,
): Promise<boolean> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  try {
    const sent = await postSlackNotice(text);
    const update = await supabaseAdmin
      .from(table)
      .update({ slack_notified_at: new Date().toISOString(), slack_error: null,
        slack_channel_id: sent.channel, slack_message_ts: sent.ts })
      .eq("id", id);
    if (update.error) throw new Error("Slack-Zustellung erfolgt; Vorgangszuordnung konnte nicht gespeichert werden.");
    const { SLACK_WORKSPACE } = await import("./slack-flows");
    const receipt = await supabaseAdmin.from("slack_delivery_receipts").insert({
      team_id: SLACK_WORKSPACE.team, event_key: `outbound:${table}:${id}:${sent.ts}`,
      actor_id: "website", channel_id: sent.channel, thread_ts: sent.ts, flow_id: "inquiry",
      entity_table: table, entity_id: id, outcome: "result",
    });
    if (receipt.error) throw new Error("Slack-Zustellung erfolgt; Rückmeldebeleg konnte nicht gespeichert werden.");
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("inquiry slack notice failed", { table, id, message });
    const update = await supabaseAdmin
      .from(table)
      .update({ slack_error: message.slice(0, 500) })
      .eq("id", id);
    if (update.error) console.error("inquiry notice error update failed", update.error);
    return false;
  }
}

/** Absolute Adresse des Arbeitsplatzes auf der aktuell aufgerufenen Domain. */
export async function workspaceUrl(path = "/arbeitsplatz"): Promise<string> {
  const { getRequestHost, getRequestProtocol } = await import("@tanstack/react-start/server");
  const host = getRequestHost();
  const protocol = getRequestProtocol();
  return `${protocol}://${host}${path}`;
}
