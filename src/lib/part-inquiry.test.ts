import { describe, expect, it } from "vitest";
import { normalizePartInquiry, validateAttachment, validatePartInquiry } from "./part-inquiry";
const ok = normalizePartInquiry({ name: "A B", email: "a@b.de", vehicle: "VW Golf 2018", part: "Bremsscheibe", consent: "on" });
describe("part inquiry", () => {
  it("accepts a complete inquiry without attachment", () => expect(validatePartInquiry(ok, null)).toEqual({}));
  it("rejects attachments above 10 MB", () => expect(validateAttachment({ size: 10 * 1024 * 1024 + 1, type: "image/png" })).toBeDefined());
  it("accepts exactly 10 MB", () => expect(validateAttachment({ size: 10 * 1024 * 1024, type: "application/pdf" })).toBeUndefined());
  it("rejects other file types", () => expect(validateAttachment({ size: 100, type: "application/zip" })).toBeDefined());
  it("requires consent", () => expect(validatePartInquiry({ ...ok, consent: false }, null).consent).toBeDefined());
});
