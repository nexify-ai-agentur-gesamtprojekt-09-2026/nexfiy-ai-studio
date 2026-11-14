import { describe, expect, it } from "vitest";
import {
  MAX_MAILTO_LENGTH,
  buildInquiryMail,
  errorSummary,
  firstInvalidField,
  normalizeInquiry,
  validateInquiry,
  type InquiryValues,
} from "./inquiry";

const valid: InquiryValues = {
  name: "Erika Muster",
  email: "erika@firma.de",
  company: "",
  message: "Wir brauchen einen neuen Shop für unsere Ersatzteile.",
  consent: true,
};

describe("inquiry rules", () => {
  it("requires name, e-mail, message and consent on the contact form", () => {
    const errors = validateInquiry("contact", normalizeInquiry({}));
    expect(Object.keys(errors)).toEqual(["name", "email", "message", "consent"]);
  });

  it("leaves the company optional on the contact form", () => {
    expect(validateInquiry("contact", valid)).toEqual({});
  });

  it("requires the workshop name on the partner form", () => {
    expect(validateInquiry("partner", valid).company).toBe("Bitte nennen Sie Ihre Werkstatt oder Ihren Betrieb.");
  });

  it("rejects an e-mail address without a domain", () => {
    expect(validateInquiry("contact", { ...valid, email: "erika@firma" }).email).toMatch(/prüfen/);
  });

  it("asks for at least ten characters of message", () => {
    expect(validateInquiry("contact", { ...valid, message: "Hallo" }).message).toBeDefined();
    expect(validateInquiry("contact", { ...valid, message: "Neue Website" }).message).toBeUndefined();
  });

  it("focuses fields in form order", () => {
    expect(firstInvalidField({ consent: "x", email: "y" })).toBe("email");
  });

  it("counts problems in the summary", () => {
    expect(errorSummary({ name: "a" })).toBe("Bitte prüfen Sie eine Angabe.");
    expect(errorSummary({ name: "a", email: "b" })).toBe("Bitte prüfen Sie 2 Angaben.");
  });

  it("trims input and reads the consent checkbox", () => {
    expect(normalizeInquiry({ name: "  Erika   Muster ", email: " ERIKA@FIRMA.DE ", consent: "on" })).toMatchObject({
      name: "Erika Muster",
      email: "erika@firma.de",
      consent: true,
    });
  });
});

describe("inquiry e-mail hand-off", () => {
  it("addresses the NeXify inbox with the visitor's details", () => {
    const mail = buildInquiryMail("contact", { ...valid, company: "Muster GmbH" });
    expect(mail.href.startsWith("mailto:mail@nexifyai.cloud?subject=")).toBe(true);
    expect(mail.subject).toBe("Projektanfrage von Erika Muster (Muster GmbH)");
    expect(mail.body).toContain("E-Mail: erika@firma.de");
    expect(mail.shortened).toBe(false);
  });

  it("names the workshop in partner requests", () => {
    expect(buildInquiryMail("partner", { ...valid, company: "KFZ Berger" }).subject).toBe("TEILEKLAR Partneranfrage: KFZ Berger");
  });

  it("keeps very long messages within the mail-link limit", () => {
    const mail = buildInquiryMail("contact", { ...valid, message: "Ä ".repeat(2000) });
    expect(mail.href.length).toBeLessThanOrEqual(MAX_MAILTO_LENGTH);
    expect(mail.shortened).toBe(true);
    expect(mail.body).toContain("Ä Ä Ä");
  });
});
