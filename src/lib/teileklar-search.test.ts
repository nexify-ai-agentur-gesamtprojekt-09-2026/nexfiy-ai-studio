import { describe, expect, it } from "vitest";
import { partInquiryPath, workshopMapsUrl } from "./teileklar-search";
describe("TEILEKLAR search handoff", () => {
  it("uses the current part query, not a previous search", () => { expect(new URL(partInquiryPath(" Filter B "),"https://app.invalid").searchParams.get("anliegen")).toContain("Filter B\n"); });
  it("rejects empty and whitespace-only places", () => { expect(workshopMapsUrl("")).toBeNull(); expect(workshopMapsUrl("   ")).toBeNull(); });
  it("encodes the place without changing the external destination", () => { const url = new URL(workshopMapsUrl(" Venlo & Köln ") ?? "https://app.invalid"); expect(url.origin).toBe("https://www.google.com"); expect(url.searchParams.get("query")).toBe("Kfz Werkstatt Venlo & Köln"); });
});