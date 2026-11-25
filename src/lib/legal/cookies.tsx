// 2026-11-22 (Europe/Berlin): ENTWURF zur Freigabe durch den Inhaber – nicht freigegeben, keine
//   Rechtsberatung. Stellen mit „[INHABER: …]" sind offen.
// Warum: Die Fassung vom 19.11.2026 nannte `sidebar_state` als einziges Cookie. Das Cookie wird nicht
//   mehr gesetzt (src/components/ui/sidebar.tsx ist nirgends eingebunden). Tatsächlich legt die Seite
//   ab: Cache Storage des Service Workers (src/lib/pwa/service-worker.js), localStorage
//   `nexify-install-hinweis-geschlossen` (src/lib/pwa-client.ts) und sessionStorage `nexify-chat-v1`
//   (src/lib/chat-client.ts).
import type { LegalSection } from "@/components/site/LegalSections";

export const cookiesSections: LegalSection[] = [
  {
    id: "content-cookies-kurzfassung-0",
    title: "Kurzfassung",
    blocks: [
      <p key="p1">
        Diese Website setzt selbst <strong>keine</strong> Cookies und verwendet keine Speicherung
        für Analyse, Werbung oder Profilbildung. Im Browser abgelegt wird nur, was für eine von
        Ihnen genutzte Funktion nötig ist. Ein Einwilligungs-Banner ist deshalb nicht nötig, weil
        nichts Einwilligungspflichtiges gesetzt wird.
      </p>,
      <p key="p2">
        [INHABER: prüfen, ob Sicherheitsfunktionen von Cloudflare (z. B. Bot-Schutz) eigene Cookies
        wie <code>__cf_bm</code> setzen; falls ja, hier mit Zweck und Dauer aufnehmen.]
      </p>,
    ],
  },
  {
    id: "content-cookies-speicherung-1",
    title: "Was gespeichert wird",
    blocks: [
      <ul key="list">
        <li>
          <strong>Offline-Speicher</strong> (Cache Storage des Service Workers) — die Offline-Seite
          samt Markenzeichen und zwei Schriftdateien, einmalig nach dem ersten Laden der Seite
          abgelegt (nicht bei aktiviertem Datensparmodus des Browsers). Zeigt bei fehlender
          Verbindung einen Hinweis statt einer Fehlerseite. Enthält keine Angaben über Sie. Dauer:
          bis zum Löschen der Browserdaten oder bis zur nächsten Version der Seite.
        </li>
        <li>
          <strong>nexify-install-hinweis-geschlossen</strong> (lokaler Speicher des Browsers) —
          merkt sich, dass Sie den Hinweis zur Installation der Seite geschlossen haben. Wird erst
          beim Schließen des Hinweises angelegt. Dauer: bis zum Löschen der Browserdaten.
        </li>
        <li>
          <strong>nexify-chat-v1</strong> (Sitzungsspeicher des Tabs) — wird angelegt, sobald Sie
          das Chat-Fenster öffnen, und merkt sich, ob es offen ist. Sofern der KI-Assistent
          eingeschaltet ist, enthält der Eintrag zusätzlich Ihren Gesprächsverlauf und die
          Sitzungskennung. Dauer: bis zum Schließen des Tabs.
        </li>
      </ul>,
      <p key="p1">
        Grundlage: § 25 Abs. 2 Nr. 2 TDDDG, unbedingt erforderlich für die von Ihnen gewünschte
        Funktion. [INHABER: Einordnung des Offline-Speichers als unbedingt erforderlich bestätigen.]
        Die Einträge werden lokal in Ihrem Browser ausgewertet und nicht an uns oder an Dritte
        übermittelt. Ihre Chatnachrichten selbst gehen nur beim Absenden an unseren Server;
        Einzelheiten stehen in der <a href="/datenschutz">Datenschutzerklärung</a>.
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
      <p key="p1">
        [INHABER: Cloudflare Web Analytics wird derzeit von Cloudflare eingeblendet, von der
        Sicherheitsrichtlinie der Seite aber blockiert. Abschalten (empfohlen) – dann bleibt diese
        Liste unverändert – oder aufnehmen und diese Seite entsprechend ändern.]
      </p>,
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
        In jedem gängigen Browser lassen sich gespeicherte Website-Daten (Cookies, lokaler Speicher
        und Cache) über die Einstellungen für den Datenschutz löschen. Der Chat-Eintrag endet
        ohnehin mit dem Schließen des Tabs. Danach startet die Seite mit den Standard-Einstellungen.
      </p>,
      <p key="p2">Stand: [INHABER: Datum der Freigabe].</p>,
    ],
  },
];
