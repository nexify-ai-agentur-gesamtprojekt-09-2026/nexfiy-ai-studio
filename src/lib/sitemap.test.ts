import { describe, expect, it } from "vitest";
import { buildSitemapXml, SITEMAP_PATHS } from "./sitemap";

describe("sitemap", () => {
  it("lists every path on the canonical nexifyai.de origin", () => {
    const xml = buildSitemapXml();
    expect(xml).toContain("<loc>https://nexifyai.de/</loc>");
    expect(xml).toContain("<loc>https://nexifyai.de/teileklar/werkstatt</loc>");
    expect(xml.match(/<loc>/g)).toHaveLength(SITEMAP_PATHS.length);
  });

  it("keeps account, cart and checkout pages out", () => {
    for (const hidden of [
      "/anmelden",
      "/registrieren",
      "/konto",
      "/arbeitsplatz",
      "/teileklar/kasse",
      "/teileklar/warenkorb",
    ]) {
      expect(SITEMAP_PATHS as readonly string[]).not.toContain(hidden);
    }
  });

  it("contains no duplicate paths", () => {
    expect(new Set(SITEMAP_PATHS).size).toBe(SITEMAP_PATHS.length);
  });
});
