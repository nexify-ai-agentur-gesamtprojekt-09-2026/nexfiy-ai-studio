import { slackInputSchema, SLACK_WORKSPACE, type SlackInput } from "./slack-flows";
import { verifySlackSignature } from "./slack-signature";

type RuntimeRequest = Request & { waitUntil?: (promise: Promise<unknown>) => void };

export async function receiveSlack(request: Request, transport: "events" | "commands" | "interactions"): Promise<Response> {
  if (Number(request.headers.get("content-length") ?? "0") > 65536) return new Response("Too large", { status: 413 });
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > 65536) return new Response("Too large", { status: 413 });
  let payload: Record<string, unknown>;
  try {
    if (transport === "events") payload = JSON.parse(raw);
    else {
      const params = new URLSearchParams(raw);
      payload = transport === "interactions" ? JSON.parse(params.get("payload") ?? "{}") : Object.fromEntries(params);
    }
  } catch { return new Response("Invalid body", { status: 400 }); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return new Response("Invalid body", { status: 400 });
  if (transport === "events" && payload["type"] === "url_verification" && typeof payload["challenge"] === "string")
    return Response.json({ challenge: payload["challenge"] });
  if (request.headers.has("x-slack-retry-num")) return new Response(null, { status: 200 });
  // Jedes Signaturgeheimnis gehört genau einer App: die verwaltete Betriebsanbindung (teamgebunden) oder die bestehende ORACLE-App.
  const operationsSecret = process.env[`SLACK_SIGNING_SECRET_${SLACK_WORKSPACE.team}`];
  const oracleSecret = process.env["SLACK_ORACLE_SIGNING_SECRET"];
  if (!operationsSecret && !oracleSecret) return new Response(null, { status: 200 });
  const timestamp = request.headers.get("x-slack-request-timestamp");
  const signature = request.headers.get("x-slack-signature");
  const viaOperations = Boolean(operationsSecret) && await verifySlackSignature(operationsSecret!, timestamp, signature, raw);
  const viaOracle = !viaOperations && Boolean(oracleSecret) && await verifySlackSignature(oracleSecret!, timestamp, signature, raw);
  if (!viaOperations && !viaOracle) return new Response("Unauthorized", { status: 401 });
  if (viaOracle && payload["api_app_id"] !== SLACK_WORKSPACE.oracleApp) return new Response("Wrong app", { status: 403 });
  let candidate: unknown;
  if (transport === "events") {
    const event = payload["event"] as Record<string, unknown> | undefined;
    if (!event || typeof event !== "object" || !["app_mention", "message"].includes(String(event["type"]))) return new Response(null, { status: 200 });
    if (event["subtype"] && event["subtype"] !== "bot_message") return new Response(null, { status: 200 });
    candidate = { key: payload["event_id"], team: payload["team_id"], actor: event["user"], channel: event["channel"],
      thread: event["thread_ts"] ?? event["ts"], text: event["text"], bot: Boolean(event["bot_id"]), kind: "message" };
  } else if (transport === "commands") {
    if (payload["command"] !== "/nexify") return new Response("Unsupported command", { status: 400 });
    candidate = { key: payload["trigger_id"], team: payload["team_id"], actor: payload["user_id"], channel: payload["channel_id"], text: payload["text"] ?? "status", bot: false, kind: "command" };
  } else {
    const user = payload["user"] as Record<string, unknown> | undefined;
    const team = payload["team"] as Record<string, unknown> | undefined;
    const channel = payload["channel"] as Record<string, unknown> | undefined;
    const message = payload["message"] as Record<string, unknown> | undefined;
    const actions = payload["actions"];
    const action = Array.isArray(actions) ? actions[0] as Record<string, unknown> | undefined : undefined;
    if (payload["type"] !== "block_actions" || action?.["action_id"] !== "nexify_inquiry_status") return new Response(null, { status: 200 });
    let value: unknown; try { value = JSON.parse(String(action["value"])); } catch { return new Response("Invalid action", { status: 400 }); }
    candidate = { key: payload["trigger_id"], team: team?.["id"], actor: user?.["id"], channel: channel?.["id"], thread: message?.["ts"], text: "", bot: false, kind: "interaction", action: value };
  }
  const parsed = slackInputSchema.safeParse(candidate);
  if (!parsed.success) return new Response("Invalid event", { status: 400 });
  const runtimeRequest = request as RuntimeRequest;
  const { decideSlackInput } = await import("./slack-flows");
  if (decideSlackInput(parsed.data).kind === "ignore") return new Response(null, { status: 200 });
  if (typeof runtimeRequest.waitUntil !== "function")
    return Response.json({ ok: false, error: "background_delivery_unavailable", response_type: "ephemeral",
      text: "Nicht verarbeitet: Der sichere Rückmeldeweg ist in dieser Laufzeit nicht verfügbar. Es wurde keine Aktion ausgelöst." });
  // Keine Arbeit oder KI vor ACK starten: realer Runtime-Kontext hält den nachgelagerten Prozess am Leben.
  const input: SlackInput = parsed.data;
  runtimeRequest.waitUntil(Promise.resolve().then(async () => {
    const { processSlackInput } = await import("./slack-workflows.server");
    await processSlackInput(input);
  }).catch(() => console.error("slack_background_processing_failed")));
  return new Response(null, { status: 200 });
}