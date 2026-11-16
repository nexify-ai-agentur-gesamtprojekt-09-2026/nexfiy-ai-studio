import { describe, expect, it } from "vitest";
import { buildInquiryNotice, inquiryReference } from "./inquiry-notification";

const base = { kind: "contact" as const, id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Erika Muster", workspaceUrl: "https://nexifyai.de/arbeitsplatz" };

describe("Slack-Meldung zu Anfragen", () => {
  it("nennt Art, Vorgangsnummer und Absender", () => {
    const text = buildInquiryNotice({ ...base, company: "Muster GmbH" });
    expect(text).toContain("Projektanfrage (Kontakt) · Vorgang 3FA85F64");
    expect(text).toContain("Von: Erika Muster (Muster GmbH)");
  });
  it("enthält weder E-Mail-Adresse noch Nachrichtentext", () => {
    const text = buildInquiryNotice(base);
    expect(text).not.toMatch(/@/);
  });
  it("entschärft Slack-Steuerzeichen aus Besucherangaben", () => {
    const text = buildInquiryNotice({ ...base, name: "<!channel> *Test*" });
    expect(text).not.toContain("<!channel>");
    expect(text).not.toContain("*");
  });
  it("Vorgangsnummer besteht aus den ersten acht Zeichen der ID", () => {
    expect(inquiryReference("14b7c23e-aaaa-bbbb-cccc-000000000000")).toBe("14B7C23E");
  });
});
