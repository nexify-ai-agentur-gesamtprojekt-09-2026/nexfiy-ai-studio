// 2026-11-22 (Europe/Berlin): ENTWURF zur Freigabe durch den Inhaber – nicht freigegeben, keine
//   Rechtsberatung. Alle Stellen mit „[INHABER: …]" sind offen und vor dem Einsatz zu entscheiden.
// Warum: Die Fassung vom 19.11.2026 beschrieb ein Formular ohne Server (mailto), Eingabefelder auf
//   Konto-Seiten und das Cookie `sidebar_state`. Gemessener Ist-Zustand am Code (origin/main b2ed738):
//   - Kontaktformular: POST /api/anfrage → Cloudflare D1 (`anfragen`, migrations/0001) und
//     Benachrichtigung per Resend (src/lib/anfrage-api.ts); keine Löschroutine im Code.
//   - Browser: Service Worker + Cache Storage nur für die Offline-Seite (src/lib/pwa/service-worker.js),
//     localStorage `nexify-install-hinweis-geschlossen` (src/lib/pwa-client.ts), sessionStorage
//     `nexify-chat-v1` (src/lib/chat-client.ts). `sidebar_state` wird nirgends mehr gesetzt
//     (src/components/ui/sidebar.tsx ist nicht eingebunden).
//   - KI-Chat: standardmäßig aus (`CHAT_AKTIV`), speichert bei Betrieb in D1 (migrations/0002, 0003).
//   - Konto-/Anmeldeadressen leiten auf /portale um (src/lib/server-routing.ts).
import type { LegalSection } from "@/components/site/LegalSections";

export const datenschutzSections: LegalSection[] = [
  {
    id: "content-privacy-verantwortlicher-0",
    title: "Verantwortlicher",
    blocks: [
      <p key="p1">
        Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:
      </p>,
      <p key="p2">
        <strong>NeXify AI by NeXify, Inhaber Pascal Courbois</strong>
        <br />
        Graaf van Loonstraat 1E, 5921 JA Venlo, Niederlande
        <br />
        E-Mail: mail@nexifyai.cloud · Telefon: +31 6 133 188 56
        <br />
        KvK-Nummer: 90483944 · USt-IdNr.: NL865786276B01
      </p>,
    ],
  },
  {
    id: "content-privacy-grundsatz-1",
    title: "Grundsatz dieser Website",
    blocks: [
      <p key="p1">
        Diese Website informiert über unsere Leistungen und nimmt Anfragen entgegen. Sie setzt keine
        Werbe- oder Profiling-Dienste ein. Eine automatisierte Entscheidungsfindung im Sinne des
        Art. 22 DSGVO findet nicht statt. Personenbezogene Daten werden nur verarbeitet, soweit dies
        für den sicheren Betrieb der Seite, die Bearbeitung Ihrer Anfragen und – sofern
        eingeschaltet – den KI-Assistenten erforderlich ist.
      </p>,
      <p key="p2">
        [INHABER: Cloudflare Web Analytics wird derzeit von Cloudflare in die Seite eingeblendet,
        von der Sicherheitsrichtlinie der Seite (CSP) aber blockiert und deshalb nicht ausgeführt.
        Entscheidung: in Cloudflare abschalten (empfohlen) – dann diesen Absatz streichen – oder
        bewusst nutzen und als eigenen Abschnitt mit Rechtsgrundlage und Einwilligung aufnehmen.]
      </p>,
    ],
  },
  {
    id: "content-privacy-hosting-2",
    title: "Hosting und Auslieferung",
    blocks: [
      <p key="p1">
        Die Seite wird über das Netzwerk der Cloudflare, Inc., 101 Townsend Street, San Francisco,
        CA 94107, USA, ausgeliefert (CDN, DNS, Schutz vor Angriffen). Die Anwendung selbst läuft als
        Cloudflare Worker; Anfragen und – sofern eingeschaltet – Chatnachrichten werden in einer
        Datenbank bei Cloudflare (Cloudflare D1) gespeichert.
      </p>,
      <ul key="list">
        <li>
          <strong>Verarbeitete Daten:</strong> IP-Adresse, Zeitpunkt, angeforderte Adresse,
          Referrer, User-Agent, Antwortstatus, übertragene Datenmenge.
        </li>
        <li>
          <strong>Zweck:</strong> Auslieferung der Inhalte, Sicherheit und Stabilität des Dienstes,
          Abwehr von Angriffen.
        </li>
        <li>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          sicherem, stabilem Betrieb).
        </li>
        <li>
          <strong>Speicherdauer:</strong> sicherheitsrelevante Verbindungsdaten werden bei
          Cloudflare nach dessen Standard-Aufbewahrung gelöscht; eigene Zugriffsprotokolle mit
          Personenbezug führen wir nicht.
        </li>
        <li>
          <strong>Speicherort der Datenbank:</strong> [INHABER: Region bzw. Standortvorgabe der
          D1-Datenbank angeben, z. B. „EU“, sofern so eingerichtet].
        </li>
        <li>
          <strong>Drittland:</strong> Übermittlung in die USA auf Grundlage des EU-US Data Privacy
          Framework bzw. der EU-Standardvertragsklauseln. Mit Cloudflare besteht ein Vertrag zur
          Auftragsverarbeitung nach Art. 28 DSGVO.
        </li>
      </ul>,
    ],
  },
  {
    id: "content-privacy-kontakt-3",
    title: "Kontaktformular und Kontaktaufnahme",
    blocks: [
      <p key="p1">
        Wenn Sie das Anfrageformular dieser Website absenden, werden Ihre Angaben verschlüsselt an
        unseren Server übertragen und dort gespeichert. Ihre Anfrage erhält eine Anfrage-Nummer, die
        Ihnen direkt angezeigt wird.
      </p>,
      <ul key="list">
        <li>
          <strong>Verarbeitete Daten:</strong> Name, E-Mail-Adresse, Unternehmen (freiwillig),
          Inhalt Ihrer Nachricht, Zeitpunkt des Eingangs, Anfrage-Nummer, ein Schlüssel gegen
          doppeltes Absenden sowie ein gekürzter Hashwert Ihrer IP-Adresse. Die IP-Adresse selbst
          wird nicht gespeichert.
        </li>
        <li>
          <strong>Speicherort:</strong> Datenbank bei Cloudflare (Cloudflare D1, siehe „Hosting und
          Auslieferung“).
        </li>
        <li>
          <strong>Benachrichtigung:</strong> Über den E-Mail-Dienst Resend [INHABER: Anbieter mit
          Anschrift, z. B. „Resend, Inc., …“, sowie Drittland-Grundlage und
          Auftragsverarbeitungsvertrag angeben] erhalten wir eine E-Mail mit Name, E-Mail-Adresse,
          Unternehmen, Nachricht, Anfrage-Nummer und Eingangszeit in unser Postfach. Ihre
          E-Mail-Adresse wird dort als Antwortadresse eingetragen.
        </li>
        <li>
          <strong>Schutz vor Missbrauch:</strong> Je IP-Hashwert werden höchstens fünf Anfragen in
          zehn Minuten angenommen. Ein für Menschen unsichtbares Köderfeld erkennt automatische
          Einträge; ist es ausgefüllt, wird nichts gespeichert und nichts versendet.
        </li>
        <li>
          <strong>Zweck:</strong> Bearbeitung und Beantwortung Ihrer Anfrage; der IP-Hashwert dient
          ausschließlich der Mengenbegrenzung.
        </li>
        <li>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Durchführung
          vorvertraglicher Maßnahmen auf Ihre Anfrage). [INHABER: für Anfragen ohne Vertragsbezug
          zusätzlich Art. 6 Abs. 1 lit. f DSGVO nennen? Für Mengenbegrenzung und Köderfeld Art. 6
          Abs. 1 lit. f DSGVO (Schutz vor Missbrauch) bestätigen. Rolle der Pflicht-Checkbox „Ich
          bin einverstanden …“ klären: Einwilligung nach lit. a oder Kenntnisnahme – die Zustimmung
          wird derzeit nicht mitgespeichert.]
        </li>
        <li>
          <strong>Speicherdauer:</strong> [INHABER: Löschfrist für gespeicherte Anfragen festlegen,
          z. B. „… Monate nach abschließender Bearbeitung, soweit keine gesetzlichen
          Aufbewahrungspflichten bestehen“ – eine automatische Löschung ist derzeit nicht
          eingerichtet.] Entsteht aus der Anfrage ein Auftrag, gelten die gesetzlichen
          Aufbewahrungsfristen (handels- und steuerrechtlich in den Niederlanden bis zu sieben
          Jahre).
        </li>
        <li>
          <strong>Weitergabe:</strong> an Cloudflare (Speicherung) und Resend (Benachrichtigung) als
          Auftragsverarbeiter nach Art. 28 DSGVO; darüber hinaus nur zur Erfüllung eines Auftrags
          oder aufgrund gesetzlicher Pflicht.
        </li>
      </ul>,
      <p key="p2">
        Kann der Server eine Anfrage gerade nicht annehmen, bietet das Formular an, die fertige
        Nachricht in Ihrem E-Mail-Programm zu öffnen. Ihre Angaben wurden zu diesem Zeitpunkt
        bereits an unseren Server übermittelt; je nach Fehlerursache können sie dort auch schon
        gespeichert sein (siehe oben, gleiche Zwecke und Fristen). Mit dem Versand aus Ihrem
        E-Mail-Programm übermitteln Sie sie zusätzlich per E-Mail. Wenn Sie uns direkt per E-Mail
        oder Telefon kontaktieren, verarbeiten wir die mitgeteilten Angaben zu denselben Zwecken und
        auf denselben Rechtsgrundlagen.
      </p>,
    ],
  },
  {
    id: "content-privacy-chat-4",
    title: "KI-Assistent (Chat)",
    blocks: [
      <p key="p1">
        Auf dieser Website kann ein KI-Assistent angeboten werden. Er ist derzeit standardmäßig
        ausgeschaltet; dann wird keine Nachricht angenommen, gespeichert oder weitergegeben. Sofern
        der KI-Assistent eingeschaltet ist, gilt:
      </p>,
      <ul key="list">
        <li>
          <strong>Verarbeitete Daten:</strong> Ihre Nachrichten und die Antworten des Assistenten,
          eine zufällig erzeugte Sitzungskennung, der Zeitpunkt sowie ein Kurzwert Ihrer IP-Adresse,
          der mit einem geheimen Schlüssel gebildet wird (HMAC, IPv6 auf /64 gekürzt). Die
          IP-Adresse selbst wird nicht gespeichert.
        </li>
        <li>
          <strong>Speicherort:</strong> Datenbank bei Cloudflare (Cloudflare D1).
        </li>
        <li>
          <strong>Zweck:</strong> Beantwortung Ihrer Fragen, Fortführung des Gesprächsverlaufs
          innerhalb einer Sitzung und Begrenzung von Missbrauch (Höchstzahl an Fragen je Minute,
          Stunde und Tag).
        </li>
        <li>
          <strong>Übermittlung:</strong> Zur Beantwortung werden Ihre Nachricht und der bisherige
          Verlauf der Sitzung an einen KI-Router [INHABER: Betreiber des Routers unter
          ai-router.nexifyai.cloud angeben] und von dort an den Modellanbieter [INHABER: Anbieter,
          Sitz, Drittland-Grundlage und Auftragsverarbeitungsvertrag angeben] übermittelt. Der
          Kurzwert Ihrer IP-Adresse wird dabei nicht übermittelt.
        </li>
        <li>
          <strong>Rechtsgrundlage:</strong> [INHABER: Art. 6 Abs. 1 lit. f DSGVO (Interesse an einer
          schnellen Beantwortung von Fragen zu unseren Leistungen) oder lit. b DSGVO
          (vorvertragliche Anfrage) festlegen].
        </li>
        <li>
          <strong>Speicherdauer:</strong> [INHABER: 30 Tage bestätigen] – ältere Einträge werden
          gelöscht, sobald neue Fragen gestellt werden; ohne neue Fragen löschen wir von Hand.
        </li>
      </ul>,
      <p key="p2">
        Bitte geben Sie im Chat keine sensiblen Daten ein. Hinweise zum Umgang mit KI-Antworten
        stehen unter <a href="/ki-hinweise">KI-Hinweise</a>.
      </p>,
    ],
  },
  {
    id: "content-privacy-speicherung-5",
    title: "Speicherung im Browser",
    blocks: [
      <p key="p1">
        Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken. In Ihrem Browser werden nur
        Daten abgelegt, die für eine von Ihnen genutzte Funktion nötig sind:
      </p>,
      <ul key="list">
        <li>
          <strong>Offline-Speicher (Service Worker):</strong> die Offline-Seite mit Markenzeichen
          und zwei Schriftdateien, damit bei fehlender Verbindung ein Hinweis statt einer
          Fehlerseite erscheint. Darin stehen keine Angaben über Sie.
        </li>
        <li>
          <strong>Installationshinweis (lokaler Speicher):</strong> ein Merker, dass Sie den Hinweis
          zur Installation der Seite geschlossen haben. Er verlässt Ihr Gerät nicht.
        </li>
        <li>
          <strong>Chat-Fenster (Sitzungsspeicher):</strong> sobald Sie das Chat-Fenster öffnen, die
          Einstellung „Fenster offen“; sofern der KI-Assistent eingeschaltet ist, zusätzlich Ihr
          Gesprächsverlauf und die Sitzungskennung. Der Eintrag endet mit dem Schließen des Tabs.
        </li>
      </ul>,
      <ul key="list2">
        <li>
          <strong>Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG (unbedingt erforderlich für die
          von Ihnen gewünschte Funktion); eine Einwilligung ist dafür nicht erforderlich. [INHABER:
          Einordnung des Offline-Speichers als unbedingt erforderlich bestätigen.]
        </li>
        <li>
          <strong>Dauer:</strong> Offline-Speicher und Installationshinweis bis zum Löschen der
          Browserdaten, Chat-Fenster bis zum Schließen des Tabs.
        </li>
      </ul>,
      <p key="p2">
        Was genau gespeichert wird und wie Sie es löschen, steht unter{" "}
        <a href="/cookies">Cookies und Einwilligung</a>.
      </p>,
    ],
  },
  {
    id: "content-privacy-ressourcen-6",
    title: "Schriften, Bilder und KI-gestützte Inhalte",
    blocks: [
      <p key="p1">
        Schriftarten und Bilder werden von unserem eigenen Server ausgeliefert. Google Fonts oder
        vergleichbare Dienste werden nicht eingebunden. Verlinkungen zu externen Seiten führen erst
        nach Ihrem Klick dorthin; für die Datenverarbeitung auf der Zielseite ist deren Anbieter
        verantwortlich.
      </p>,
      <p key="p2">
        Texte und Bilder dieser Website entstehen mit Unterstützung von KI und werden vor
        Veröffentlichung redaktionell geprüft. Eine Verarbeitung Ihrer personenbezogenen Daten zu
        Trainingszwecken findet dabei nicht statt. Die Kennzeichnung richtet sich nach Art. 50 EU AI
        Act; Einzelheiten stehen unter <a href="/ki-hinweise">KI-Hinweise</a>.
      </p>,
    ],
  },
  {
    id: "content-privacy-sicherheit-7",
    title: "Sicherheit der Verarbeitung",
    blocks: [
      <p key="p1">
        Die Website wird ausschließlich über eine verschlüsselte Verbindung (TLS) ausgeliefert.
        Verwaltungszugänge sind auf wenige Personen beschränkt und durch Schlüssel statt Passwörter
        geschützt. IP-Adressen werden nicht im Klartext gespeichert, sondern nur als Kurzwert. Wir
        treffen die technischen und organisatorischen Maßnahmen nach Art. 32 DSGVO, um Daten gegen
        Verlust, Veränderung und unbefugten Zugriff zu schützen.
      </p>,
    ],
  },
  {
    id: "content-privacy-rechte-8",
    title: "Ihre Rechte",
    blocks: [
      <p key="p1">
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
        Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch
        gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO). Eine erteilte
        Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.
      </p>,
      <p key="p2">
        Für alle Anliegen genügt eine Nachricht an mail@nexifyai.cloud; nennen Sie bei Anfragen
        bitte die Anfrage-Nummer, beim Chat die Sitzungskennung, falls bekannt. Sie haben außerdem
        das Recht, sich bei einer Aufsichtsbehörde zu beschweren — in den Niederlanden bei der
        Autoriteit Persoonsgegevens, in Deutschland bei der für Ihren Wohnort zuständigen
        Landesbeauftragten für Datenschutz.
      </p>,
      <p key="p3">
        Stand: [INHABER: Datum der Freigabe]. Wir passen diese Erklärung an, sobald sich die
        Verarbeitung ändert.
      </p>,
    ],
  },
];
