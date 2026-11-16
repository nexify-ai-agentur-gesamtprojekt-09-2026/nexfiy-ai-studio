import { describe, expect, it } from "vitest";
import { compareTyres, tyreDiameter } from "./tyre-comparison";

describe("nominal tyre geometry", () => {
  it("matches the existing 205/55 R16 diameter of 631.9 mm", () => {
    expect(tyreDiameter({ width: 205, aspect: 55, rim: 16 })).toBeCloseTo(631.9, 6);
  });
  it("matches 225/45 R17 diameter 634.3 mm and clearance +1.2 mm", () => {
    const result = compareTyres(
      { width: 205, aspect: 55, rim: 16 },
      { width: 225, aspect: 45, rim: 17 },
    );
    expect(result?.after).toBeCloseTo(634.3, 6);
    expect(result?.clearance).toBeCloseTo(1.2, 6);
    expect(result?.differencePercent).toBeCloseTo(0.38, 2);
  });
  it("returns zero change for identical sizes", () => {
    const size = { width: 205, aspect: 55, rim: 16 };
    expect(compareTyres(size, size)?.differencePercent).toBe(0);
    expect(compareTyres(size, size)?.speedAt100).toBe(100);
  });
  it("rejects missing or invalid dimensions", () => {
    expect(tyreDiameter({ width: 0, aspect: 55, rim: 16 })).toBeNull();
    expect(
      compareTyres({ width: NaN, aspect: 55, rim: 16 }, { width: 205, aspect: 55, rim: 16 }),
    ).toBeNull();
  });
});
