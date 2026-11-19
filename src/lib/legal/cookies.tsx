// 2026-11-19 19:26 (Europe/Berlin): Cookie-Erklärung eingesetzt (Freigabe Inhaber 19.11.2026).
// Warum: Live-Seite trug „wird noch geprüft"; gemessen ist genau ein technisch notwendiges Cookie
//   (sidebar_state) und kein Analyse-/Werbe-Dienst im Code.
import type { LegalSection } from "@/components/site/LegalSections";

export const cookiesSections: LegalSection[] = [
  {
    id: "content-cookies-kurzfassung-0",
    title: "Kurzfassung",
    blocks: [
      <p key="p1">
        Diese Website verwendet <strong>keine</strong> Cookies für Analyse, Werbung oder
        Profilbildung. Ein Einwilligungs-Banner ist deshalb nicht nötig, weil nichts
        Einwilligungspflichtiges gesetzt wird.
      </p>,
    ],
  },
  {
    id: "content-cookies-speicherung-1",
    title: "Was gespeichert wird",
    blocks: [
      <ul key="list">
        <li>
          <strong>sidebar_state</strong> (Cookie) — merkt sich, ob die Seitenleiste geöffnet oder
          geschlossen ist. Dauer: bis zum Löschen der Browserdaten. Grundlage: § 25 Abs. 2 Nr. 2
          TDDDG, unbedingt erforderlich für die gewünschte Funktion.
        </li>
      </ul>,
      <p key="p1">
        Diese Angabe wird ausschließlich lokal in Ihrem Browser ausgewertet und nicht an uns oder an
        Dritte übermittelt.
      </p>,
    ],
  },
  {
    id: "content-cookies-nicht-2",
    title: "Was nicht stattfindet",
    blocks: [
      <ul key="list">
        <li>
          keine Webanalyse (kein Google Analytics, kein Matomo, keine vergleichbaren Dienste),
        </li>
        <li>keine Werbe- oder Retargeting-Pixel,</li>
        <li>keine Social-Media-Plugins mit Datenübertragung,</li>
        <li>keine Profile über Ihr Nutzungsverhalten,</li>
        <li>keine Einbindung externer Schriftarten, Karten oder Videoplattformen.</li>
      </ul>,
    ],
  },
  {
    id: "content-cookies-optin-3",
    title: "Wenn Sie einwilligen möchten",
    blocks: [
      <p key="p1">
        Optionale Verarbeitung ist derzeit nicht aktiv — Sie müssen also nichts einwilligen. Sollte
        künftig eine Messung hinzukommen, wird sie erst nach Ihrer ausdrücklichen Einwilligung aktiv
        (Opt-in nach § 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO) und diese Seite vorher ergänzt.
        Ihre Entscheidung bleibt dann jederzeit änderbar.
      </p>,
    ],
  },
  {
    id: "content-cookies-loeschen-4",
    title: "Speicherung löschen",
    blocks: [
      <p key="p1">
        In jedem gängigen Browser lassen sich gespeicherte Website-Daten über die Einstellungen für
        den Datenschutz löschen. Danach startet die Seite mit den Standard-Einstellungen.
      </p>,
      <p key="p2">Stand: 19. November 2026.</p>,
    ],
  },
];
