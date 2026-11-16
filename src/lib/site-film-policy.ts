import type { SiteFilmId } from "./site-films";

/** Nur nachbearbeitete Aufnahmen gehen öffentlich in die Wiedergabe; Originale bleiben erhalten. */
export function isPublicPlaybackFilm(film: SiteFilmId): boolean {
  return film === "kennenlernen" || film === "zusammenarbeit";
}
