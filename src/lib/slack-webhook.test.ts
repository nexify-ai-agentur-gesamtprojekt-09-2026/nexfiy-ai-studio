import { afterEach, expect, it, vi } from "vitest";
import { receiveSlack } from "./slack-webhook.server";
import { SLACK_WORKSPACE } from "./slack-flows";

vi.mock("./slack-workflows.server", () => ({ processSlackInput: vi.fn() }));
afterEach(() => vi.unstubAllEnvs());
const secret = "synthetic-webhook-test-only";
async function signedRequest(body: string) {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`v0:${timestamp}:${body}`)));
  return new Request("https://example.invalid/api/public/slack/events", { method: "POST", body,
    headers: { "x-slack-request-timestamp": timestamp, "x-slack-signature": `v0=${Array.from(bytes, x => x.toString(16).padStart(2,"0")).join("")}` } });
}
it("bestätigt die Slack-URL ohne Geheimnis und ohne Ereignisverarbeitung", async () => {
  const response = await receiveSlack(new Request("https://example.invalid", { method: "POST", body: JSON.stringify({ type: "url_verification", challenge: "synthetic-challenge" }) }), "events");
  expect(await response.json()).toEqual({ challenge: "synthetic-challenge" });
});
it("ignoriert Ereignisse ohne eingerichtetes Signaturgeheimnis", async () => {
  vi.stubEnv("SLACK_ORACLE_SIGNING_SECRET", "");
  expect((await receiveSlack(new Request("https://example.invalid", { method: "POST", body: "{}" }), "events")).status).toBe(200);
});
it("weist falsche Signaturen zurück und verarbeitet keine Slack-Wiederholung", async () => {
  vi.stubEnv("SLACK_ORACLE_SIGNING_SECRET", secret);
  expect((await receiveSlack(new Request("https://example.invalid", { method: "POST", body: "{}" }), "events")).status).toBe(401);
  expect((await receiveSlack(new Request("https://example.invalid", { method: "POST", body: "{}", headers: { "x-slack-retry-num": "1" } }), "events")).status).toBe(200);
});
it("acknowledgt ein signiertes Ereignis vor abgewarteter Folgearbeit über den echten Runtime-Hook", async () => {
  vi.stubEnv("SLACK_ORACLE_SIGNING_SECRET", secret);
  const request = await signedRequest(JSON.stringify({ api_app_id: SLACK_WORKSPACE.oracleApp, team_id: SLACK_WORKSPACE.team,
    event_id: "evt-test", event: { type: "app_mention", user: SLACK_WORKSPACE.owner, channel: SLACK_WORKSPACE.inbox, ts: "1.2", text: "status" } }));
  const tasks: Promise<unknown>[] = [];
  Object.assign(request, { waitUntil: (task: Promise<unknown>) => tasks.push(task) });
  expect((await receiveSlack(request, "events")).status).toBe(200);
  expect(tasks.length).toBe(1);
  await Promise.all(tasks);
});
it("weist fremde Slack-Apps trotz gültiger Testsignatur zurück", async () => {
  vi.stubEnv("SLACK_ORACLE_SIGNING_SECRET", secret);
  expect((await receiveSlack(await signedRequest('{"api_app_id":"AOTHER"}'), "events")).status).toBe(403);
});
it("weist JSON-null und zu große Nachrichten ohne Verarbeitung zurück", async () => {
  expect((await receiveSlack(new Request("https://example.invalid", { method: "POST", body: "null" }), "events")).status).toBe(400);
  expect((await receiveSlack(new Request("https://example.invalid", { method: "POST", body: "x".repeat(65537) }), "events")).status).toBe(413);
});