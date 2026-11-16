import { describe, expect, it } from "vitest";
import { allowedImageSource, availabilityLabel, catalogImageUrl, feedImageSource, formatPrice, mapFeedItem, normalizeCatalogQuery, normalizePage } from "./teileklar-catalog";

const feedItem = {
  id: "V0103601", name: "3 in 1 Teleskop-Eiskratzer Removice InnovaGoods", maker: "InnovaGoods", category: "Autozubehör",
  price: "7.06 €", value: 7.06, sku: "V0103601", image: "/api/shop/image?src=https%3A%2F%2Fcdnbigbuy.com%2Fimages%2FV0103601_000_MKT5.jpg",
  alt: "3 in 1 Teleskop-Eiskratzer", brand: "InnovaGoods", oe: null, ean: "8435527823900", condition: "NEW", status_label: "Katalog-Artikel",
  delivery_short: "", source: "BigBuy", specs: [{ label: "Gewicht", value: "0.46 kg" }, { label: "", value: "leer" }], created_at: "2026-10-11T16:29:45.547923+00:00", stock: 0,
};

describe("TEILEKLAR-Katalog", () => {
  it("bildet einen Feed-Artikel vollständig ab", () => {
    const row = mapFeedItem(feedItem);
    expect(row).toMatchObject({ id: "V0103601", brand: "InnovaGoods", category: "Karosserie & Sicht", source_category: "Autozubehör", price_value: 7.06, ean: "8435527823900", oe_number: "", stock: 0 });
    expect(row?.image_src).toBe("https://cdnbigbuy.com/images/V0103601_000_MKT5.jpg");
    expect(row?.specs).toEqual([{ label: "Gewicht", value: "0.46 kg" }]);
  });
  it("verwirft Artikel ohne Kennung oder Namen", () => {
    expect(mapFeedItem({ name: "Ohne ID" })).toBeNull();
    expect(mapFeedItem({ id: "X1" })).toBeNull();
  });
  it("übernimmt keinen Preis von null oder kleiner", () => {
    expect(mapFeedItem({ ...feedItem, value: 0 })?.price_value).toBeNull();
  });
  it("lässt nur HTTPS-Bilder des Lieferanten-CDN zu", () => {
    expect(allowedImageSource("https://cdnbigbuy.com/images/a.jpg")).toBe("https://cdnbigbuy.com/images/a.jpg");
    expect(allowedImageSource("http://cdnbigbuy.com/images/a.jpg")).toBeNull();
    expect(allowedImageSource("https://evil.example/cdnbigbuy.com/a.jpg")).toBeNull();
    expect(allowedImageSource("https://cdnbigbuy.com.evil.example/a.jpg")).toBeNull();
    expect(feedImageSource("/api/shop/image?src=https%3A%2F%2F169.254.169.254%2F")).toBe("");
    expect(catalogImageUrl("https://cdnbigbuy.com/images/a.jpg")).toBe("/api/public/shop/image?src=https%3A%2F%2Fcdnbigbuy.com%2Fimages%2Fa.jpg");
  });
  it("formatiert Preise in Euro nach deutscher Schreibweise", () => {
    expect(formatPrice(7.06)?.replace(/\s/g, " ")).toBe("7,06 €");
    expect(formatPrice(null)).toBeNull();
  });
  it("entfernt Filter-Steuerzeichen aus Suchbegriffen", () => {
    expect(normalizeCatalogQuery("  Eis,kratzer (rot)*  ")).toBe("Eis kratzer rot");
    expect(normalizeCatalogQuery("x".repeat(200))).toHaveLength(80);
  });
  it("begrenzt Seitenzahlen auf gültige Werte", () => {
    expect(normalizePage("3")).toBe(3);
    expect(normalizePage("-1")).toBe(1);
    expect(normalizePage("abc")).toBe(1);
  });
  it("behauptet ohne Bestand keine Lieferbarkeit", () => {
    expect(availabilityLabel({ stock: 0, delivery_note: "Auf Lager" })).toBe("Verfügbarkeit auf Anfrage");
    expect(availabilityLabel({ stock: 17, delivery_note: "Auf Lager" })).toBe("Auf Lager");
  });
});
