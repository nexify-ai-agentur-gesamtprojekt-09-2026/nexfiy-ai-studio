import { describe, expect, it } from "vitest";
import { canonicalFor, SITEMAP_PATHS } from "./sitemap";

describe("canonicalFor", () => {
  it("setzt für jede Sitemap-Seite die nexifyai.de-Adresse", () => {
    for (const p of SITEMAP_PATHS) expect(canonicalFor(p)).toBe(`https://nexifyai.de${p}`);
  });
  it("normalisiert abschließende Schrägstriche", () => {
    expect(canonicalFor("/kontakt/")).toBe("https://nexifyai.de/kontakt");
    expect(canonicalFor("/")).toBe("https://nexifyai.de/");
  });
  it("gibt Konto-, Kassen- und unbekannten Seiten keinen Canonical", () => {
    expect(canonicalFor("/anmelden")).toBeNull();
    expect(canonicalFor("/teileklar/kasse")).toBeNull();
    expect(canonicalFor("/gibt-es-nicht")).toBeNull();
  });
});
