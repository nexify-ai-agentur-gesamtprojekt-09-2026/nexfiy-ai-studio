import { describe, expect, it } from "vitest";
import { displayPath, siteAreaFor, suggestionsFor } from "./system-pages";

describe("not-found suggestions", () => {
  it("suggests TEILEKLAR pages for a missing TEILEKLAR address", () => {
    expect(suggestionsFor("/teileklar/warenkorb").map((s) => s.to)).toEqual([
      "/teileklar",
      "/teileklar/werkstatt",
      "/teileklar/partner-werden",
    ]);
  });

  it("suggests the NeXify pages for any other missing address", () => {
    expect(suggestionsFor("/impressum").map((s) => s.to)).toEqual(["/", "/leistungen", "/kontakt"]);
  });

  it("does not treat a look-alike path as TEILEKLAR", () => {
    expect(siteAreaFor("/teileklarheit")).toBe("nexify");
  });

  it("never suggests the page the visitor is already on", () => {
    expect(suggestionsFor("/kontakt/").map((s) => s.to)).not.toContain("/kontakt");
  });

  it("shortens very long addresses for display", () => {
    expect(displayPath("/" + "a".repeat(80), 20)).toHaveLength(20);
  });
});
