import { describe, expect, it } from "vitest";
import { decideSlackInput, SLACK_WORKSPACE, type SlackInput } from "./slack-flows";

const base: SlackInput = { key: "evt-1", team: SLACK_WORKSPACE.team, actor: SLACK_WORKSPACE.owner,
  channel: SLACK_WORKSPACE.inbox, text: "status", kind: "message", bot: false };
describe("Slack-Betriebsgrenzen", () => {
  it("lässt den bestätigten Inhaber den Ablaufstatus lesen", () => {
    expect(decideSlackInput(base).kind).toBe("overview");
  });
  it("sperrt Rückmeldungen über den extern geteilten Relay", () => {
    expect(decideSlackInput({ ...base, channel: SLACK_WORKSPACE.externalRelay })).toEqual({ kind: "ignore", reason: "channel_not_allowed" });
  });
  it("erteilt einem anderen Nutzer keine Statusrechte", () => {
    expect(decideSlackInput({ ...base, actor: "UOTHER" })).toEqual({ kind: "ignore", reason: "owner_required" });
  });
  it("unterscheidet ORACLE-Empfang von Ergebnis", () => {
    expect(decideSlackInput({ ...base, actor: SLACK_WORKSPACE.oracle, bot: true, thread: "1.2", text: "ACK NX-1" }).kind).toBe("ack");
    expect(decideSlackInput({ ...base, actor: SLACK_WORKSPACE.oracle, bot: true, thread: "1.2", text: "RESULT NX-1" }).kind).toBe("result");
  });
  it("ignoriert eigene und unbekannte Bot-Nachrichten gegen Schleifen", () => {
    expect(decideSlackInput({ ...base, actor: "UUNKNOWNBOT", bot: true }).kind).toBe("ignore");
  });
  it("startet weder Import noch Kauf oder SSH-Sperrung", () => {
    for (const text of ["import starten", "kaufen", "SSH sperren", "GO", "👍"])
      expect(decideSlackInput({ ...base, text }).kind).toBe("blocked");
  });
  it("bindet Statusänderung an einen vollständigen Vorgang und erlaubten Status", () => {
    expect(decideSlackInput({ ...base, text: "status 3fa85f64-5717-4562-b3fc-2c963f66afa6 in_bearbeitung" })).toEqual({ kind: "status", id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", status: "in_bearbeitung" });
    expect(decideSlackInput({ ...base, text: "status 3FA85F64 erledigt" }).kind).toBe("blocked");
  });
});