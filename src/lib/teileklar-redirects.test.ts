import { describe, expect, it } from "vitest";
import redirectsAsset from "../../public/_redirects?raw";
import { TEILEKLAR_REDIRECTS, teileklarTarget } from "./teileklar-redirects";

// Die Umleitung liegt zweimal vor: public/_redirects (Asset-Schicht, nur workers.dev) und
// TEILEKLAR_REDIRECTS (Worker, greift hinter jeder Domain). Der Test haelt beide gleich,
// damit eine Zeile nie nur auf einem der beiden Wege wirkt.
const assetRules = redirectsAsset
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) => line.split(/\s+/))
  .map(([from = "", to = ""]) => [from, to] as const)
  // /teileklar und /teileklar/* deckt der Rueckfall in teileklarTarget ab.
  .filter(([from, to]) => from.startsWith("/teileklar") && from !== "/teileklar")
  .filter(([from, to]) => !from.includes("*") && to.startsWith("http"));

describe("TEILEKLAR redirects", () => {
  it("covers every rule from public/_redirects", () => {
    expect(Object.entries(TEILEKLAR_REDIRECTS).sort()).toEqual([...assetRules].sort());
  });

  it("leaves other paths alone and sends unknown TEILEKLAR paths to the shop root", () => {
    expect(teileklarTarget("/leistungen")).toBeUndefined();
    expect(teileklarTarget("/teileklarheit")).toBeUndefined();
    expect(teileklarTarget("/teileklar/")).toBe("https://teileklar.shop/");
    expect(teileklarTarget("/teileklar/warenkorb")).toBe("https://teileklar.shop/shop");
  });
});
