import type { FilmCue } from "./film-captions";

/** Every brand film of the site, defined once and reused by each page that shows it. */
export type SiteFilmId = "studio" | "angebot" | "fertigung" | "teileklar" | "arbeitsbereich";

export interface SiteFilmData {
  src: string;
  poster: string;
  label: string;
  alt: string;
  /** Length of the film in seconds; every cue has to end within it. */
  duration: number;
  /**
   * Spoken text with timings. Transcribed on 16.11.2026 from the audio track by local speech
   * recognition; brand names (NeXify, NeX, AIFly) were set by hand and await the owner's wording check.
   */
  captions: readonly FilmCue[];
}

export const SITE_FILMS: Record<SiteFilmId, SiteFilmData> = {
  arbeitsbereich: {
    src: "/site-assets/b82843cf77d572df.mp4",
    poster: "/site-assets/4b45951db0b51136.webp",
    label: "Gemeinsam am Arbeitsbereich",
    alt: "Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie",
    duration: 10,
    captions: [
      { start: 0.8, end: 2.6, text: "Schau mal, wie einfach das jetzt ist." },
      { start: 2.65, end: 5.6, text: "Mit NeXify haben wir alle Daten sofort im Überblick." },
      { start: 5.7, end: 7.9, text: "Das macht die Zusammenarbeit viel schneller." },
      { start: 7.95, end: 9.95, text: "Genauso haben wir uns das vorgestellt." },
    ],
  },
  studio: {
    src: "/site-assets/e27f88efd05374ec.mp4",
    poster: "/site-assets/05c51cdebbdd2aa6.webp",
    label: "Pascal im Studio",
    alt: "Markeninszenierung: Pascal, NeX und AIFly ORACLE im Eingangsbereich eines Gebäudes",
    duration: 10,
    captions: [
      { start: 0.4, end: 2.25, text: "Guten Tag, ich bin Pascal." },
      { start: 2.3, end: 6.1, text: "Wir bauen Websites, Shops und KI-Lösungen in höchster Qualität" },
      { start: 6.15, end: 7.9, text: "und zu einem fairen Preis." },
      { start: 7.95, end: 9.95, text: "Erzählen Sie mir, woran Sie gerade arbeiten." },
    ],
  },
  angebot: {
    src: "/site-assets/e3638738b1263f00.mp4",
    poster: "/site-assets/5c592a5dc791fcc3.webp",
    label: "Ihr Angebot, auf den Punkt.",
    alt: "Markeninszenierung: Pascal bespricht gedruckte Entwürfe und Materialmuster mit einem Gesprächspartner am Tisch",
    duration: 10,
    captions: [
      { start: 0.5, end: 2.5, text: "Schau mal, wie exakt das Modell ist." },
      { start: 2.55, end: 5.6, text: "Mit NeXify steuern wir die gesamte Anlage digital." },
      { start: 5.65, end: 8.15, text: "Jeder Schritt wird in Echtzeit synchronisiert." },
      { start: 8.2, end: 9.95, text: "Effizienter geht es wirklich nicht." },
    ],
  },
  fertigung: {
    src: "/site-assets/8b4870140b46d3f8.mp4",
    poster: "/site-assets/15fa9607b63661b1.webp",
    label: "Mehr Zeit für die Arbeit, die zählt.",
    alt: "Markeninszenierung: Pascal bespricht Unterlagen mit einem Mitarbeiter an einer Fertigungsanlage",
    duration: 10,
    captions: [
      { start: 0.45, end: 2.45, text: "Bei NeXify gehen wir neue Wege." },
      { start: 2.5, end: 5.5, text: "Mit intelligenter Technologie und echter Teamarbeit" },
      { start: 5.55, end: 7.6, text: "gestalten wir die Produktion von morgen." },
      { start: 7.65, end: 9.6, text: "Willkommen in der Zukunft." },
    ],
  },
  teileklar: {
    src: "/site-assets/086cadaa7ccbfdc9.mp4",
    poster: "/site-assets/506495187c091a6f.webp",
    label: "Das richtige Teil. Der richtige Weg.",
    alt: "Markeninszenierung: Pascal und eine Mitarbeiterin im Gespräch an einer Förderanlage mit Kartons",
    duration: 10,
    captions: [
      { start: 0.55, end: 3.7, text: "Hier bei NeX und AIFly läuft alles wie geschmiert." },
      { start: 3.75, end: 5.9, text: "Dank intelligenter Automatisierung" },
      { start: 5.95, end: 8.1, text: "haben wir jeden Prozess im Griff." },
      { start: 8.15, end: 9.95, text: "Gemeinsam schaffen wir das." },
    ],
  },
};
