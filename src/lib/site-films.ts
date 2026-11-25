/** Every brand film of the site, defined once and reused by each page that shows it. */
export type SiteFilmId = "studio" | "angebot" | "fertigung" | "tablet";

export interface SiteFilmData {
  src: string;
  poster: string;
  label: string;
  alt: string;
  /** Gesprochener Text, Wort für Wort wie im Ton des Films (Barrierefreiheit). */
  transcript?: string;
  /**
   * Gesetzt: Der Film wird nicht ausgespielt. SiteFilm zeigt dann nur das Standbild, ohne Video,
   * Bedienelemente und Transkript. Die Videodatei bleibt in public/site-assets/. Der Text nennt
   * den Grund und was geschehen muss, bevor der Film wieder erscheint.
   */
  ausgeblendet?: string;
}

export const SITE_FILMS: Record<SiteFilmId, SiteFilmData> = {
  studio: {
    src: "/site-assets/e27f88efd05374ec.mp4",
    poster: "/site-assets/05c51cdebbdd2aa6.webp",
    label: "Pascal im Studio",
    alt: "Markeninszenierung: Pascal, NeX und AIFly ORACLE im Eingangsbereich eines Gebäudes",
    transcript:
      "Guten Tag, ich bin Pascal. Wir bauen Websites, Shops und KI-Lösungen in höchster Qualität und zu einem fairen Preis. Erzählen Sie mir, woran Sie gerade arbeiten.",
    // 2026-11-25, 10:08 Uhr: Pascal entscheidet, dass der Studiofilm sichtbar ist ("Ist doch alles da").
    // Der Ton ist seine eigene Aussage; das Transkript bleibt wortgleich, damit es nicht abweicht.
  },
  angebot: {
    src: "/site-assets/e3638738b1263f00.mp4",
    poster: "/site-assets/5c592a5dc791fcc3.webp",
    label: "Ihr Angebot, auf den Punkt.",
    alt: "Markeninszenierung: Pascal bespricht gedruckte Entwürfe und Materialmuster mit einem Gesprächspartner am Tisch",
  },
  fertigung: {
    src: "/site-assets/8b4870140b46d3f8.mp4",
    poster: "/site-assets/15fa9607b63661b1.webp",
    label: "Mehr Zeit für die Arbeit, die zählt.",
    alt: "Markeninszenierung: Pascal bespricht Unterlagen mit einem Mitarbeiter an einer Fertigungsanlage",
  },
  tablet: {
    src: "/site-assets/b82843cf77d572df.mp4",
    poster: "/site-assets/4b45951db0b51136.webp",
    label: "Pascal und eine Gesprächspartnerin am Tablet",
    alt: "Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie",
  },
};
