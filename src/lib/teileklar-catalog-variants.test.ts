import { describe, expect, it } from "vitest";
import {
  formatPriceRange,
  groupAvailabilityLabel,
  normalizeCatalogSort,
  orderVariants,
  sizeRank,
  variantLabels,
} from "./teileklar-catalog";

const euro = (value: string | null) => value?.replace(/\s/g, " ") ?? null;

describe("Artikelgruppen im TEILEKLAR-Katalog", () => {
  it("lässt nur bekannte Sortierungen zu und fällt sonst auf „Empfohlen“ zurück", () => {
    expect(normalizeCatalogSort("preis-auf")).toBe("preis-auf");
    expect(normalizeCatalogSort("preis-ab")).toBe("preis-ab");
    expect(normalizeCatalogSort("name")).toBe("name");
    expect(normalizeCatalogSort("price;drop")).toBe("empfohlen");
    expect(normalizeCatalogSort(undefined)).toBe("empfohlen");
  });

  it("zeigt bei unterschiedlichen Ausführungspreisen „ab“ den günstigsten Preis", () => {
    expect(euro(formatPriceRange(6.3, 119.85))).toBe("ab 6,30 €");
    expect(euro(formatPriceRange(70.4, 70.4))).toBe("70,40 €");
    expect(formatPriceRange(null, null)).toBeNull();
  });

  it("benennt Ausführungen nur nach Merkmalen, die sich tatsächlich unterscheiden", () => {
    const labels = variantLabels([
      {
        id: "M1203136",
        specs: [
          { label: "Gewicht", value: "0.3 kg" },
          { label: "Zustand", value: "Neu" },
          { label: "EAN", value: "4007140025968" },
        ],
      },
      {
        id: "M1203138",
        specs: [
          { label: "Gewicht", value: "0.49 kg" },
          { label: "Zustand", value: "Neu" },
          { label: "EAN", value: "4007140025982" },
        ],
      },
    ]);
    expect(labels.get("M1203136")).toBe("Gewicht 0,3 kg");
    expect(labels.get("M1203138")).toBe("Gewicht 0,49 kg");
  });

  it("erfindet keine Größe, wenn der Katalog keinen Unterschied nennt", () => {
    const same = [{ label: "Gewicht", value: "1 kg" }];
    const labels = variantLabels([
      { id: "S37116817", specs: same },
      { id: "S37116818", specs: same },
    ]);
    expect(labels.get("S37116817")).toBe("Art.-Nr. S37116817");
    expect(labels.get("S37116818")).toBe("Art.-Nr. S37116818");
  });

  it("benennt Größen-Ausführungen nach dem abweichenden Namensende", () => {
    const labels = variantLabels([
      { id: "OMP-S", name: "Monokarting OMP SUMMER-K Rot S", specs: [] },
      { id: "OMP-XXL", name: "Monokarting OMP SUMMER-K Rot XXL", specs: [] },
      { id: "SP-46", name: "Rennstiefel Sparco Schwarz Größe 46", specs: [] },
    ]);
    expect(labels.get("OMP-S")).toBe("Monokarting OMP SUMMER-K Rot S");
    const sizes = variantLabels([
      { id: "OMP-S", name: "Monokarting OMP SUMMER-K Rot S", specs: [] },
      { id: "OMP-XXL", name: "Monokarting OMP SUMMER-K Rot XXL", specs: [] },
    ]);
    expect(sizes.get("OMP-S")).toBe("S");
    expect(sizes.get("OMP-XXL")).toBe("XXL");
    expect(labels.size).toBe(3);
  });

  it("ordnet Größen von klein nach groß und lässt Nicht-Größen unverändert", () => {
    expect(sizeRank("XS")! < sizeRank("M")!).toBe(true);
    expect(sizeRank("XL")! < sizeRank("3XL")!).toBe(true);
    expect(sizeRank("Größe 42")! < sizeRank("46")!).toBe(true);
    expect(sizeRank("Kinder 130")! < sizeRank("Kinder 140")!).toBe(true);
    expect(sizeRank("Kinder 140")! < sizeRank("S")!).toBe(true);
    expect(sizeRank("Art.-Nr. M1203136")).toBeNull();
    const variants = [{ id: "a" }, { id: "b" }, { id: "c" }];
    const sized = new Map([
      ["a", "XL"],
      ["b", "S"],
      ["c", "M"],
    ]);
    expect(orderVariants(variants, sized).map((v) => v.id)).toEqual(["b", "c", "a"]);
    const mixed = new Map([
      ["a", "XL"],
      ["b", "Art.-Nr. B"],
      ["c", "M"],
    ]);
    expect(orderVariants(variants, mixed).map((v) => v.id)).toEqual(["a", "b", "c"]);
  });

  it("macht gleiche Merkmalsbezeichnungen über die Artikelnummer eindeutig", () => {
    const labels = variantLabels([
      { id: "A1", specs: [{ label: "Gewicht", value: "1 kg" }] },
      { id: "A2", specs: [{ label: "Gewicht", value: "1 kg" }] },
      { id: "A3", specs: [{ label: "Gewicht", value: "2 kg" }] },
    ]);
    expect(labels.get("A1")).toBe("Gewicht 1 kg · Art.-Nr. A1");
    expect(labels.get("A3")).toBe("Gewicht 2 kg");
  });

  it("schreibt einer Gruppe keinen Bestand zu, den der Vertreter nicht hat", () => {
    expect(
      groupAvailabilityLabel({ stock: 0, delivery_note: "", in_stock: true, variant_count: 3 }),
    ).toBe("Einzelne Ausführungen vorrätig");
    expect(
      groupAvailabilityLabel({ stock: 0, delivery_note: "", in_stock: false, variant_count: 3 }),
    ).toBe("Verfügbarkeit auf Anfrage");
    expect(
      groupAvailabilityLabel({
        stock: 4,
        delivery_note: "Auf Lager",
        in_stock: true,
        variant_count: 3,
      }),
    ).toBe("Auf Lager");
  });
});
