import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assertValidCues,
  filmCaptionsPath,
  filmTranscript,
  formatVttTime,
  toWebVtt,
} from "./film-captions";
import { SITE_FILMS } from "./site-films";

const publicDir = join(__dirname, "../../public");

describe("brand film captions", () => {
  it("gives every brand film captions, because all five films contain speech", () => {
    for (const film of Object.values(SITE_FILMS)) expect(film.captions.length).toBeGreaterThan(0);
  });

  it("keeps every cue ordered, non-overlapping and inside the film", () => {
    for (const film of Object.values(SITE_FILMS))
      expect(() => assertValidCues(film.captions, film.duration)).not.toThrow();
  });

  it("serves caption files identical to the cue definitions", () => {
    for (const [id, film] of Object.entries(SITE_FILMS)) {
      const served = readFileSync(join(publicDir, filmCaptionsPath(id)), "utf8");
      expect(served).toBe(toWebVtt(film.captions));
    }
  });

  it("keeps the existing studio transcript wording", () => {
    expect(filmTranscript(SITE_FILMS.studio.captions)).toBe(
      "Guten Tag, ich bin Pascal. Wir bauen Websites, Shops und KI-Lösungen in höchster Qualität und zu einem fairen Preis. Erzählen Sie mir, woran Sie gerade arbeiten.",
    );
  });

  it("formats WebVTT timestamps", () => {
    expect(formatVttTime(0.4)).toBe("00:00:00.400");
    expect(formatVttTime(9.95)).toBe("00:00:09.950");
    expect(formatVttTime(3725.5)).toBe("01:02:05.500");
  });

  it("rejects overlapping, empty or overlong cues", () => {
    expect(() =>
      assertValidCues(
        [
          { start: 0, end: 2, text: "a" },
          { start: 1.5, end: 3, text: "b" },
        ],
        10,
      ),
    ).toThrow();
    expect(() => assertValidCues([{ start: 0, end: 2, text: " " }], 10)).toThrow();
    expect(() => assertValidCues([{ start: 9, end: 11, text: "a" }], 10)).toThrow();
    expect(() => assertValidCues([], 10)).toThrow();
  });
});
