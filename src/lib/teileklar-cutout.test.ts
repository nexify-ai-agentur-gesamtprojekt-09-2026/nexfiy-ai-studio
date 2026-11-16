import { describe, expect, it } from "vitest";
import { activeCutout, cutoutStoragePath, isWebpImage } from "./teileklar-cutout";

const bytes = (text: string) => new TextEncoder().encode(text);

describe("Freigestellte Produktfotos", () => {
  it("nimmt nur WebP-Dateien an", () => {
    expect(isWebpImage(bytes("RIFF\u0000\u0000\u0000\u0000WEBPVP8L...."))).toBe(true);
    expect(isWebpImage(bytes("\u00ff\u00d8\u00ff\u00e0 JPEG-Datei ...."))).toBe(false);
    expect(isWebpImage(bytes("RIFF"))).toBe(false);
  });

  it("legt die freigestellte Fassung neben dem Original ab, ohne es zu ersetzen", () => {
    expect(cutoutStoragePath("M1203136", "0a1b2c3d4e5f67890000ffff")).toBe(
      "M1203136/cutout-0a1b2c3d4e5f6789.webp",
    );
  });

  it("zeigt nach einem neuen Original wieder das Original statt einer veralteten Freistellung", () => {
    const row = {
      image_path: "M1/aaaa.jpg",
      image_cutout_path: "M1/cutout-1111.webp",
      image_cutout_of: "M1/aaaa.jpg",
    };
    expect(activeCutout(row)).toBe("M1/cutout-1111.webp");
    expect(activeCutout({ ...row, image_path: "M1/bbbb.jpg" })).toBe("");
    expect(activeCutout({ ...row, image_cutout_path: "" })).toBe("");
  });
});
