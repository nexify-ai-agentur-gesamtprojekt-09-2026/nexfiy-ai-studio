import { describe, expect, it } from "vitest";
import { countByFilter, matchesFilter, replyHref, toInboxItems, type GeneralInquiryRow, type PartInquiryRow } from "./inquiry-inbox";

const general: GeneralInquiryRow = { id: "aaaaaaaa-1111-2222-3333-444444444444", created_at: "2026-11-16T03:00:00Z", kind: "partner", name: "Erika", email: "erika@example.test", company: "Muster KFZ", message: "Hallo", source_path: "/teileklar/partner-werden", status: "erledigt", slack_notified_at: "2026-11-16T03:00:01Z", slack_error: null };
const part: PartInquiryRow = { id: "bbbbbbbb-1111-2222-3333-444444444444", created_at: "2026-11-16T04:00:00Z", name: "Max", email: "max@example.test", vehicle: "VW Golf 2015", part: "Bremsscheibe", message: "", status: "neu", slack_notified_at: null, slack_error: "Slack-Meldung abgelehnt: channel_not_found", attachment_path: "x/anhang.pdf", attachment_name: "schein.pdf", attachment_size: 2048 };

describe("Arbeitsplatz-Posteingang", () => {
  it("sortiert neueste zuerst und vereinheitlicht beide Quellen", () => {
    const items = toInboxItems([general], [part]);
    expect(items.map((item) => item.reference)).toEqual(["BBBBBBBB", "AAAAAAAA"]);
    expect(items[0]?.kind).toBe("part");
    expect(items[0]?.attachment?.name).toBe("schein.pdf");
  });
  it("zeigt einen fehlgeschlagenen Slack-Versand sichtbar an", () => {
    const [item] = toInboxItems([], [part]);
    expect(item?.slack).toEqual({ state: "fehler", error: "Slack-Meldung abgelehnt: channel_not_found" });
  });
  it("offen umfasst nur neue und laufende Anfragen", () => {
    const items = toInboxItems([general], [part]);
    expect(items.filter((item) => matchesFilter(item, "offen")).map((item) => item.status)).toEqual(["neu"]);
    expect(countByFilter(items)).toMatchObject({ offen: 1, erledigt: 1, archiviert: 0, alle: 2 });
  });
  it("Antwort-Link adressiert den Absender mit Vorgangsnummer", () => {
    const [item] = toInboxItems([general], []);
    expect(item && replyHref(item)).toBe("mailto:erika@example.test?subject=Ihre%20Partneranfrage%20%C2%B7%20Vorgang%20AAAAAAAA");
  });
});
