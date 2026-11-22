/** Every brand film of the site, defined once and reused by each page that shows it. */
export type SiteFilmId = "studio" | "angebot" | "fertigung";

export interface SiteFilmData {
  src: string;
  poster: string;
  label: string;
  alt: string;
  transcript?: string;
}

export const SITE_FILMS: Record<SiteFilmId, SiteFilmData> = {
  studio: {
    src: "/site-assets/e27f88efd05374ec.mp4",
    poster: "/site-assets/05c51cdebbdd2aa6.webp",
    label: "Pascal im Studio",
    alt: "Markeninszenierung: Pascal, NeX und AIFly ORACLE im Eingangsbereich eines Gebäudes",
    transcript:
      "Guten Tag, ich bin Pascal. Wir bauen Websites, Shops und KI-Lösungen in höchster Qualität und zu einem fairen Preis. Erzählen Sie mir, woran Sie gerade arbeiten.",
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
};
