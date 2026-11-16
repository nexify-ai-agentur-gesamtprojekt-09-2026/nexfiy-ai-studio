import { describe, expect, it } from "vitest";
import { contactDraftPath, guideDestination } from "./site-navigation";
describe("public navigation", () => {
  it("routes Suite guidance to its independent product entry", () => { expect(guideDestination("nex2fly-trial")).toBe("/produkte/nex2fly"); });
  it("keeps contact drafts local and bounded", () => { const url = new URL(contactDraftPath("x".repeat(1200)), "https://app.invalid"); expect(url.pathname).toBe("/kontakt"); expect(url.searchParams.get("anliegen")?.length).toBe(1000); expect(url.hash).toBe("#anfrage"); });
  it("does not interpret an unknown guide value as a destination", () => { expect(guideDestination("https://outside.invalid")).toBe("/leistungen"); });
});