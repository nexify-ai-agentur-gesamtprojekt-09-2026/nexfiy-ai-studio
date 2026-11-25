// 2026-11-19 19:25 (Europe/Berlin): Datenschutzerklärung eingesetzt (Freigabe Inhaber 19.11.2026).
// Warum: Die Live-Seite trug an dieser Stelle den Platzhalter „noch in Prüfung"; der geprüfte Entwurf
//   (state/rechtstexte/datenschutz-entwurf.md) beschreibt den gemessenen Ist-Zustand der Seite.
// Grundlage: Anfrageformular mit Serververarbeitung (Cloudflare D1, Versand ueber Resend),
//              keine Analyse-Tools, ein technisch notwendiges Cookie,
//   Auslieferung über Cloudflare, Schriften und Bilder vom eigenen Server.
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
        Diese Website ist eine Informationsseite. Sie setzt keine Analyse-, Werbe- oder
        Profiling-Dienste ein. Eine automatisierte Entscheidungsfindung im Sinne des Art. 22 DSGVO
        findet nicht statt. Personenbezogene Daten werden nur verarbeitet, soweit dies für den
        sicheren Betrieb der Seite und für die Bearbeitung Ihrer Anfragen erforderlich ist.
      </p>,
    ],
  },
  {
    id: "content-privacy-hosting-2",
    title: "Hosting und Auslieferung",
    blocks: [
      <p key="p1">
        Die Seite wird über das Netzwerk der Cloudflare, Inc., 101 Townsend Street, San Francisco,
        CA 94107, USA, ausgeliefert (CDN, DNS, Schutz vor Angriffen).
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
          <strong>Drittland:</strong> Übermittlung in die USA auf Grundlage des EU-US Data Privacy
          Framework bzw. der EU-Standardvertragsklauseln. Mit Cloudflare besteht ein Vertrag zur
          Auftragsverarbeitung nach Art. 28 DSGVO.
        </li>
      </ul>,
    ],
  },
  {
    id: "content-privacy-kontakt-3",
    title: "Kontaktaufnahme",
    blocks: [
      <p key="p1">
        Wenn Sie uns per E-Mail, Telefon oder über ein Anfrageformular kontaktieren, verarbeiten wir
        die von Ihnen mitgeteilten Angaben (Name, Kontaktdaten, Inhalt der Anfrage), um Ihr Anliegen
        zu bearbeiten.
      </p>,
      <ul key="list">
        <li>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Anbahnung oder Erfüllung
          eines Vertrags) bzw. Art. 6 Abs. 1 lit. f DSGVO (Bearbeitung Ihrer Anfrage).
        </li>
        <li>
          <strong>Speicherdauer:</strong> bis zur abschließenden Bearbeitung, anschließend nach den
          gesetzlichen Aufbewahrungsfristen (handels- und steuerrechtlich in den Niederlanden bis zu
          sieben Jahre), danach Löschung.
        </li>
        <li>
          <strong>Weitergabe:</strong> keine Weitergabe an Dritte, außer zur Erfüllung eines
          Auftrags (dann als Auftragsverarbeitung nach Art. 28 DSGVO) oder aufgrund gesetzlicher
          Pflicht.
        </li>
      </ul>,
      <p key="p2">
        Das Anfrageformular dieser Website überträgt Ihre Angaben an unseren Server, sobald Sie es
        absenden. Verarbeitet werden Name, E-Mail-Adresse, optional der Unternehmensname und Ihre
        Nachricht. Die Anfrage wird in einer Datenbank bei Cloudflare (Cloudflare, Inc.) gespeichert
        und per E-Mail an uns zugestellt; für den Versand setzen wir Resend (Resend, Inc., USA) ein.
        Beides sind Auftragsverarbeiter nach Art. 28 DSGVO. Für die Zustellung in die USA stützen wir
        uns auf die Standardvertragsklauseln nach Art. 46 Abs. 2 DSGVO.
      </p>,
      <p key="p3">
        Zur Abwehr von Missbrauch speichern wir zusätzlich einen gekürzten Prüfwert Ihrer
        IP-Adresse (SHA-256, 24 Zeichen) und den Zeitpunkt des Eingangs; die vollständige
        IP-Adresse wird nicht gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO für die
        Bearbeitung Ihrer Anfrage und Art. 6 Abs. 1 lit. f DSGVO für den Missbrauchsschutz.
      </p>,
    ],
  },
  {
    id: "content-privacy-speicherung-4",
    title: "Eingabefelder und Speicherung",
    blocks: [
      <p key="p1">
        Einzelne Seiten zeigen Eingabefelder (zum Beispiel Anmeldung, Registrierung). Diese Felder
        sind derzeit nicht an einen Server angebunden: Ihre Eingaben verbleiben im Browser und
        werden nicht übertragen oder gespeichert. Sobald eine Übertragung aktiviert wird, ergänzen
        wir diese Erklärung vorher.
      </p>,
      <p key="p2">
        Cookies zu Analyse- oder Werbezwecken setzt diese Website nicht. Gespeichert wird
        ausschließlich eine technisch notwendige Einstellung für die Bedienoberfläche (Zustand der
        Seitenleiste), damit Ihre Auswahl beim nächsten Aufruf erhalten bleibt.
      </p>,
      <ul key="list">
        <li>
          <strong>Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG (unbedingt erforderlich für die
          vom Nutzer gewünschte Funktion) bzw. Art. 6 Abs. 1 lit. f DSGVO.
        </li>
        <li>
          <strong>Dauer:</strong> bis zum Löschen der Browserdaten.
        </li>
        <li>Eine Einwilligung ist dafür nicht erforderlich; ein Cookie-Banner entfällt deshalb.</li>
      </ul>,
      <p key="p3">
        Was genau gespeichert wird und wie Sie es löschen, steht unter{" "}
        <a href="/cookies">Cookies und Einwilligung</a>.
      </p>,
    ],
  },
  {
    id: "content-privacy-ressourcen-5",
    title: "Schriften, Bilder und KI",
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
      <p key="p3">
        Der KI-Chat auf dieser Website beantwortet Fragen zu unseren Leistungen. Dabei werden Ihre
        Nachricht, die Antwort, eine Sitzungskennung, der Zeitpunkt und ein Kurzwert Ihrer
        IP-Adresse (HMAC, kein Klartext) gespeichert. Die Speicherung dient dem Gesprächsverlauf und
        der Begrenzung von Missbrauch; sie liegt bei unserem Hosting-Anbieter Cloudflare und wird
        nach 30 Tagen gelöscht, spätestens bei der nächsten Anfrage. Zur Beantwortung wird Ihre
        Frage über unseren Router an einen Modell-Anbieter übermittelt. Eine Verwendung Ihrer
        Eingaben zu Trainingszwecken erfolgt durch uns nicht. Rechtsgrundlage ist unser berechtigtes
        Interesse an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO). Bitte geben Sie
        keine Passwörter und keine besonderen Kategorien personenbezogener Daten ein.
      </p>,
    ],
  },
  {
    id: "content-privacy-sicherheit-6",
    title: "Sicherheit der Verarbeitung",
    blocks: [
      <p key="p1">
        Die Website wird ausschließlich über eine verschlüsselte Verbindung (TLS) ausgeliefert.
        Verwaltungszugänge sind auf wenige Personen beschränkt und durch Schlüssel statt Passwörter
        geschützt. Wir treffen die technischen und organisatorischen Maßnahmen nach Art. 32 DSGVO,
        um Daten gegen Verlust, Veränderung und unbefugten Zugriff zu schützen; da diese Website
        selbst keine personenbezogenen Daten speichert, beziehen sie sich auf den sicheren Betrieb
        und die abgesicherte Auslieferung.
      </p>,
    ],
  },
  {
    id: "content-privacy-rechte-6",
    title: "Ihre Rechte",
    blocks: [
      <p key="p1">
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
        Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch
        gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO). Eine erteilte
        Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.
      </p>,
      <p key="p2">
        Für alle Anliegen genügt eine Nachricht an mail@nexifyai.cloud. Sie haben außerdem das
        Recht, sich bei einer Aufsichtsbehörde zu beschweren — in den Niederlanden bei der
        Autoriteit Persoonsgegevens, in Deutschland bei der für Ihren Wohnort zuständigen
        Landesbeauftragten für Datenschutz.
      </p>,
      <p key="p3">
        Stand: 19. November 2026. Wir passen diese Erklärung an, sobald sich die Verarbeitung
        ändert, zum Beispiel bei Aktivierung eines Formular-Backends oder eines Analyse-Werkzeugs.
      </p>,
    ],
  },
];
