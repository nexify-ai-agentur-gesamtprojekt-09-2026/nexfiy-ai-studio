import { beforeEach, expect, it, vi } from "vitest";
import { SLACK_WORKSPACE, type SlackInput } from "./slack-flows";

const mocks = vi.hoisted(() => ({ from: vi.fn(), post: vi.fn() }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { from: mocks.from } }));
vi.mock("./inquiry-delivery.server", () => ({ postSlackNotice: mocks.post }));
import { processSlackInput } from "./slack-workflows.server";
const base: SlackInput = { key: "event", actor: SLACK_WORKSPACE.owner, team: SLACK_WORKSPACE.team,
  channel: "DTEST", thread: "1.2", kind: "message", bot: false,
  text: "status 3fa85f64-5717-4562-b3fc-2c963f66afa6 in_bearbeitung" };
const receiptId = "7a5cf5d5-0ddc-4435-9328-a1ec2ea923ea";
function receiptChain(error: unknown = null) {
  return { insert: () => ({ select: () => ({ single: async () => ({ data: error ? null : { id: receiptId }, error }) }) }),
    update: vi.fn(() => ({ eq: async () => ({ error: null }) })) };
}
beforeEach(() => { mocks.from.mockReset(); mocks.post.mockReset(); mocks.post.mockResolvedValue({ channel: "DTEST", ts: "1.3" }); });
it("führt ein doppelt angeliefertes Ereignis nicht erneut aus", async () => {
  mocks.from.mockReturnValue(receiptChain({ code: "23505" }));
  await processSlackInput(base);
  expect(mocks.from).toHaveBeenCalledTimes(1);
  expect(mocks.post).not.toHaveBeenCalled();
});
it("ändert den bestehenden Vorgang nur im zugeordneten Ursprungsthread", async () => {
  const update = vi.fn(() => ({ eq: async () => ({ error: null }) }));
  mocks.from.mockImplementation(table => table === "slack_delivery_receipts" ? receiptChain() : {
    select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", slack_channel_id: "DTEST", slack_message_ts: "1.2" }, error: null }) }) }), update,
  });
  await processSlackInput(base);
  expect(update).toHaveBeenCalledWith(expect.objectContaining({ status: "in_bearbeitung" }));
  expect(mocks.post).toHaveBeenCalledWith(expect.any(String), { channel: "DTEST", threadTs: "1.2" });
});
it("verweigert eine Statusänderung aus einem fremden Thread", async () => {
  const update = vi.fn();
  mocks.from.mockImplementation(table => table === "slack_delivery_receipts" ? receiptChain() : {
    select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", slack_channel_id: "DTEST", slack_message_ts: "different" }, error: null }) }) }), update,
  });
  await expect(processSlackInput(base)).rejects.toThrow("slack_entity_thread_mismatch");
  expect(update).not.toHaveBeenCalled();
  expect(mocks.post).not.toHaveBeenCalled();
});