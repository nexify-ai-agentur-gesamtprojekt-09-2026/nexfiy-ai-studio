import { describe, expect, it } from "vitest";
import { mayAutoplayFilm, normalizeVolume } from "./media-policy";

describe("brand film policy", () => {
  it("allows automatic playback only for the hero", () => {
    expect(mayAutoplayFilm(true, false)).toBe(true);
    expect(mayAutoplayFilm(false, false)).toBe(false);
  });
  it("does not autoplay when reduced motion is requested", () => {
    expect(mayAutoplayFilm(true, true)).toBe(false);
  });
  it("never automatically resumes a non-hero film on viewport re-entry", () => {
    expect(mayAutoplayFilm(false, false)).toBe(false);
    expect(mayAutoplayFilm(false, true)).toBe(false);
  });
  it("keeps volume within the media element's supported range", () => {
    expect(normalizeVolume(0.8)).toBe(0.8);
    expect(normalizeVolume(2)).toBe(1);
    expect(normalizeVolume(-1)).toBe(0);
    expect(normalizeVolume(NaN)).toBe(0);
  });
});
