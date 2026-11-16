import { describe, expect, it } from "vitest";
import { pageSplitSizes } from "./page-split";

describe("page and adviser widths", () => {
  it("keeps the default narrower than the page on desktop", () => {
    expect(pageSplitSizes(1705).preferred).toBe(511.5);
    expect(pageSplitSizes(1705).max).toBe(720);
  });
  it("protects the page at the narrow desktop breakpoint", () => {
    expect(pageSplitSizes(768)).toEqual({ min: 320, max: 328, preferred: 320 });
  });
});