import { describe, expect, it } from "vitest";
import { isPublicPlaybackFilm } from "./site-film-policy";

describe("öffentliche Filmfreigabe", () => {
  it("lässt ausschließlich die beiden geprüften Zuschnitte zur Wiedergabe zu", () => {
    expect(isPublicPlaybackFilm("kennenlernen")).toBe(true);
    expect(isPublicPlaybackFilm("zusammenarbeit")).toBe(true);
    for (const film of ["studio", "angebot", "fertigung", "teileklar", "arbeitsbereich"] as const) {
      expect(isPublicPlaybackFilm(film)).toBe(false);
    }
  });
});
