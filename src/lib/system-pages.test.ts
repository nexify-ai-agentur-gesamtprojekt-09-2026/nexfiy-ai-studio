import { describe, expect, it } from "vitest";
import { displayPath, isRetiredPath, suggestionsFor } from "./system-pages";

describe("not-found suggestions", () => {
  it("treats a removed shop address like any other missing address", () => {
    expect(suggestionsFor("/teileklar/warenkorb").map((s) => s.to)).toEqual([
      "/",
      "/leistungen",
      "/kontakt",
    ]);
  });

  it("suggests the NeXify pages for any other missing address", () => {
    expect(suggestionsFor("/impressum").map((s) => s.to)).toEqual(["/", "/leistungen", "/kontakt"]);
  });

  it("never suggests the page the visitor is already on", () => {
    expect(suggestionsFor("/kontakt/").map((s) => s.to)).not.toContain("/kontakt");
  });

  it("recognises removed shop addresses, also with repeated leading slashes", () => {
    expect(isRetiredPath("/teileklar")).toBe(true);
    expect(isRetiredPath("/teileklar/kasse")).toBe(true);
    expect(isRetiredPath("//teileklar/kasse")).toBe(true);
    expect(isRetiredPath("/TEILEKLAR/shop")).toBe(true);
    expect(isRetiredPath("/teileklarheit")).toBe(false);
    expect(isRetiredPath("/kontakt")).toBe(false);
  });

  it("shortens very long addresses for display", () => {
    expect(displayPath("/" + "a".repeat(80), 20)).toHaveLength(20);
  });
});
