// @vitest-environment node
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { draftService } from "@/test/draft-clients";
import { ISOLATED_DB_SKIP_REASON, isolatedTestDb, skipWithoutIsolatedDb } from "@/test/isolated-db";
import { submitInquiry } from "./inquiry.functions";
import { deliverInquiryNotice } from "./inquiry-delivery.server";
import { INQUIRY_CONSENT_VERSION } from "./inquiry-consent";

const state = vi.hoisted(() => ({ ip: undefined as string | undefined, rpc: vi.fn(), deliver: vi.fn().mockResolvedValue(true) }));
vi.mock("@tanstack/react-start", () => ({ createServerFn: () => ({ validator: (validate: (input: unknown) => unknown) => ({
  handler: (handle: (args: { data: unknown }) => unknown) => (args: { data: unknown }) => handle({ data: validate(args.data) }),
}) }) }));
vi.mock("@tanstack/react-start/server", () => ({ getRequest: () => new Request("http://localhost:8080/kontakt"), getRequestIP: () => state.ip, setResponseHeader: vi.fn() }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc: state.rpc } }));
vi.mock("./inquiry-delivery.server", () => ({ deliverInquiryNotice: state.deliver, workspaceUrl: async () => "http://localhost:8080/arbeitsplatz" }));

describe.skipIf(skipWithoutIsolatedDb)(`NX-LEAD-01 Vorschau-Browser mit echter Speicherung und Test-Slack", () => {
  it("bestätigt Formular, Wochenzahl, Dublette, sechste Ablehnung und tatsächliche Admin-Statuspflege", async () => {
    const service = draftService();
    const runId = crypto.randomUUID();
    state.rpc.mockImplementation((name, args) => service.rpc(name, args));
    state.deliver.mockClear();
    expect(vi.isMockFunction(deliverInquiryNotice)).toBe(true);
    const log = vi.spyOn(console, "warn").mockImplementation(() => {});
    const outcomes: Awaited<ReturnType<typeof submitInquiry>>[] = [];
    const server = createServer(async (request, response) => {
      try {
        const parts = [];
        for await (const part of request) parts.push(Buffer.from(part));
        const input = JSON.parse(Buffer.concat(parts).toString());
        state.ip = typeof input.ip === "string" ? input.ip : undefined;
        const result = await submitInquiry({ data: input.data });
        outcomes.push(result);
        response.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(result));
      } catch { response.writeHead(500).end("Isolierter Test fehlgeschlagen."); }
    });
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Isolierter Testlistener fehlt.");
    try {
      const result = await promisify(execFile)("python3", ["scripts/check-inquiry-flow.py"], { timeout: 120000, env: { ...process.env, NX_LEAD_TEST_ENDPOINT: `http://127.0.0.1:${address.port}`, NX_LEAD_TEST_RUN_ID: runId, NX_LEAD_TEST_IP: `2001:db8:${parseInt(runId.slice(0, 4), 16).toString(16)}:feed::10` } });
      const browser = JSON.parse(result.stdout.trim());
      expect(browser).toMatchObject({ form_flow: "passed", weekly_delta: 6, admin_status_readback: true, page_errors: 0, real_submission_block_attempts: 0 });
      expect(outcomes.filter(row => row.ok)).toHaveLength(6);
      expect(outcomes.filter(row => !row.ok && row.reason === "duplicate")).toHaveLength(1);
      expect(outcomes.filter(row => !row.ok && row.reason === "rate_limited")).toHaveLength(1);
      expect(state.deliver).toHaveBeenCalledTimes(6);
      expect(log.mock.calls).toEqual([["rate_guard_ip_missing"], ["rate_guard_ip_missing"]]);
      const rows = await service.from("inquiries").select("consent_version,consent_at").eq("email", `nx-lead-browser-${runId}@example.test`);
      expect(rows.data).toHaveLength(6);
      expect(rows.data?.every(row => row.consent_version === INQUIRY_CONSENT_VERSION && row.consent_at !== null)).toBe(true);
    } finally { log.mockRestore(); await new Promise<void>(resolve => server.close(() => resolve())); }
  }, 150000);
});