import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteFilm } from "./SiteFilm";
import { SITE_FILMS, type SiteFilmId } from "../lib/site-films";

const FILME = Object.keys(SITE_FILMS) as SiteFilmId[];
const ausgeblendet = FILME.filter((id) => SITE_FILMS[id].ausgeblendet);
const sichtbar = FILME.filter((id) => !SITE_FILMS[id].ausgeblendet);

describe("SiteFilm", () => {
  it("der Studiofilm ist sichtbar (Entscheidung 25.11.), sein Transkript bleibt wortgleich mit dem Ton", () => {
    expect(sichtbar).toContain("studio");
    expect(SITE_FILMS.studio.transcript).toBe(
      "Guten Tag, ich bin Pascal. Wir bauen Websites, Shops und KI-Lösungen in höchster Qualität und zu einem fairen Preis. Erzählen Sie mir, woran Sie gerade arbeiten.",
    );
  });

  it.each(ausgeblendet)("%s: ausgeblendet – nur Standbild, kein Video, kein Transkript", (id) => {
    const html = renderToStaticMarkup(<SiteFilm film={id} eager />);
    const film = SITE_FILMS[id];
    expect(html).not.toContain("<video");
    expect(html).not.toContain(film.src);
    expect(html).not.toContain("Gesprochener Text");
    expect(html).not.toContain("atelier-film-controls");
    expect(html).not.toMatch(/class="atelier-film[ "]/);
    expect(html).toContain(`src="${film.poster}"`);
    expect(html).toContain(`alt="${film.alt}"`);
  });

  it.each(sichtbar)("%s: sichtbar – Video mit Bedienung", (id) => {
    const html = renderToStaticMarkup(<SiteFilm film={id} />);
    expect(html).toContain("<video");
    expect(html).toContain(SITE_FILMS[id].src);
  });
});
