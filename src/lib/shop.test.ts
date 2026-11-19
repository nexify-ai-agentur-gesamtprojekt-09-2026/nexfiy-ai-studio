import { describe, expect, it } from "vitest";
import {
  addToCart,
  applyQuery,
  cartCount,
  cartTotal,
  categoriesOf,
  formatEuro,
  inquiryMailto,
  matchesSearch,
  normalizeProduct,
  parsePrice,
  removeFromCart,
  setQuantity,
  type ShopProduct,
} from "./shop";

const bremse: ShopProduct = {
  id: "B-1",
  name: "Bremsbeläge vorn VW Golf VII",
  maker: "ATE",
  category: "Bremsen",
  price: 42.5,
  image: "",
};

const oel: ShopProduct = {
  id: "O-1",
  name: "Motoröl 5W-30 5 Liter",
  maker: "Castrol",
  category: "Öle",
  price: 34.99,
  image: "",
};

describe("parsePrice", () => {
  it("liest deutsche Preisangaben", () => {
    expect(parsePrice("7.06 €")).toBe(7.06);
    expect(parsePrice("1.234,56 €")).toBe(1234.56);
    expect(parsePrice("12,5")).toBe(12.5);
  });

  it("faellt bei Unsinn auf 0 zurueck", () => {
    expect(parsePrice("")).toBe(0);
    expect(parsePrice(null)).toBe(0);
    expect(parsePrice(undefined)).toBe(0);
  });
});

describe("normalizeProduct", () => {
  it("akzeptiert sku/brand/value als Alternativnamen", () => {
    const product = normalizeProduct({ sku: "X1", name: "Test", brand: "Bosch", value: 3 });
    expect(product).toEqual({
      id: "X1",
      name: "Test",
      maker: "Bosch",
      category: "",
      price: 3,
      image: "",
    });
  });

  it("verwirft Eintraege ohne Id oder Namen", () => {
    expect(normalizeProduct({ name: "ohne Id" })).toBeNull();
    expect(normalizeProduct({ id: "ohne Namen" })).toBeNull();
  });
});

describe("matchesSearch", () => {
  it("findet ueber Name, Hersteller und Kategorie", () => {
    expect(matchesSearch(bremse, "bremse")).toBe(true);
    expect(matchesSearch(bremse, "ate")).toBe(true);
    expect(matchesSearch(oel, "ole")).toBe(true);
    expect(matchesSearch(bremse, "castrol")).toBe(false);
  });

  it("ignoriert Gross-/Kleinschreibung und Umlaute", () => {
    expect(matchesSearch(oel, "MOTOROL")).toBe(true);
    expect(matchesSearch({ ...oel, name: "Ölfilter" }, "olfilter")).toBe(true);
  });

  it("verlangt alle Woerter", () => {
    expect(matchesSearch(bremse, "bremse golf")).toBe(true);
    expect(matchesSearch(bremse, "bremse castrol")).toBe(false);
  });
});

describe("applyQuery", () => {
  it("filtert nach Kategorie und sortiert", () => {
    const all = [bremse, oel];
    expect(applyQuery(all, { category: "Bremsen" })).toEqual([bremse]);
    expect(applyQuery(all, { sort: "preis-auf" }).map((p) => p.id)).toEqual(["O-1", "B-1"]);
    expect(applyQuery(all, { sort: "preis-ab" }).map((p) => p.id)).toEqual(["B-1", "O-1"]);
    expect(applyQuery(all, { sort: "name" }).map((p) => p.id)).toEqual(["B-1", "O-1"]);
  });

  it("blendet Seitenfenster ein", () => {
    const all = [bremse, oel];
    expect(applyQuery(all, { limit: 1 })).toHaveLength(1);
    expect(applyQuery(all, { offset: 1 }).map((p) => p.id)).toEqual(["O-1"]);
  });
});

describe("categoriesOf", () => {
  it("zaehlt Kategorien absteigend", () => {
    const list = [bremse, { ...bremse, id: "B-2" }, oel];
    expect(categoriesOf(list)).toEqual([
      { name: "Bremsen", count: 2 },
      { name: "Öle", count: 1 },
    ]);
  });
});

describe("Warenkorb", () => {
  it("legt Artikel einmal an und zaehlt danach hoch", () => {
    let cart = addToCart([], bremse);
    cart = addToCart(cart, bremse, 2);
    expect(cart).toHaveLength(1);
    expect(cart[0]?.quantity).toBe(3);
    expect(cartCount(cart)).toBe(3);
  });

  it("setzt Mengen und entfernt bei 0", () => {
    let cart = addToCart([], oel, 2);
    cart = setQuantity(cart, "O-1", 5);
    expect(cartCount(cart)).toBe(5);
    cart = setQuantity(cart, "O-1", 0);
    expect(cart).toHaveLength(0);
  });

  it("entfernt gezielt", () => {
    const cart = removeFromCart(addToCart(addToCart([], oel), bremse), "O-1");
    expect(cart.map((line) => line.id)).toEqual(["B-1"]);
  });

  it("rechnet die Summe auf zwei Stellen", () => {
    const cart = addToCart(addToCart([], bremse, 2), oel, 1);
    expect(cartTotal(cart)).toBe(119.99);
  });
});

describe("formatEuro", () => {
  it("schreibt deutsche Preise", () => {
    expect(formatEuro(1234.5)).toBe("1.234,50 €");
    expect(formatEuro(0)).toBe("0,00 €");
  });
});

describe("inquiryMailto", () => {
  it("enthaelt Positionen, Summe und Empfaenger", () => {
    const mail = inquiryMailto(addToCart([], bremse, 2), "mail@nexifyai.cloud");
    expect(mail.startsWith("mailto:mail@nexifyai.cloud?subject=")).toBe(true);
    const decoded = decodeURIComponent(mail);
    expect(decoded).toContain("2 × Bremsbeläge vorn VW Golf VII (B-1)");
    expect(decoded).toContain("Zwischensumme: 85,00 €");
  });
});
