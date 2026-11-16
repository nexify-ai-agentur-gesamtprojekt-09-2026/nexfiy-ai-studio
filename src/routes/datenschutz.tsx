import { GuideNavigation } from "@/components/site/GuideNavigation";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/datenschutz.css?url";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Ihre Daten. Ein klarer Zweck. · NeXify AI" }, { name: "description", content: "Datenhinweise zu Website, Konto, ORACLE, Agentenverbindungen und Anfragen. Die vollständige Datenschutzerklärung steht noch zur Prüfung." }, { property: "og:title", content: "Ihre Daten. Ein klarer Zweck. · NeXify AI" }, { property: "og:description", content: "Datenhinweise zu Website, Konto, ORACLE, Agentenverbindungen und Anfragen. Die vollständige Datenschutzerklärung steht noch zur Prüfung." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept page-privacy layout-document context-nexify"}>
              <section className={"identity-hero is-text-only"} aria-labelledby="page-title-privacy">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">Ihre Daten. Ein klarer Zweck.</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>Informationen und Recht</span>
                    <h1 id="page-title-privacy">Ihre Daten. Ein klarer Zweck.</h1>
                    <p className={"identity-body"}>Website, Konto, Produktberatung und individuelle Projekte verarbeiten unterschiedliche Informationen. Hier sind die vorhandenen Abläufe zugeordnet. Die vollständige Datenschutzerklärung bleibt in Prüfung: Empfänger, Rechtsgrundlagen, Aufbewahrung und mögliche Übermittlungen müssen abschließend bestätigt werden.</p>
                    <div className={"identity-links"}>
                      <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/kontakt">
                        <span>Mit NeXify Kontakt aufnehmen</span>
                        <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
                      </a>
                      <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/vertragsgrundlagen">Vereinbarung und Leistungsumfang</a>
                    </div>
                  </div>
                </div>
              </section>
              <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
                <a href="#content-privacy-ueberblick-0">Information passend zum Anliegen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-privacy-grundsatz-1">Transparenz vor der Nutzung<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-privacy-ueberblick-0" tabIndex={-1} aria-labelledby="content-privacy-ueberblick-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 02</span>
                    <h2 id="content-privacy-ueberblick-0-title">Information passend zum Anliegen</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Für eine Anfrage genügen Ihr Vorhaben und eine Kontaktmöglichkeit. Geben Sie in öffentliche Felder keine Passwörter, API-Schlüssel, Zahlungsdaten oder vertraulichen Kundendaten ein. Für Projektunterlagen vereinbaren wir einen eigenen Übergabeweg.</p>
                    <p>Für die ORACLE-Produktberatung werden Ihre Nachricht und der begrenzte Gesprächsverlauf über AI Gateway an ein KI-Modell übermittelt. Die Beratung verwendet die öffentlichen Produktinformationen, nicht Ihre Kontodaten. Der Gesprächsverlauf wird in dieser App nur während der geöffneten Seite gehalten; ein Neuladen setzt ihn zurück. Diese Aussage betrifft nicht die gesonderte Verarbeitung durch die beteiligten Dienste.</p>
                    
<h3>Anfrage und Beratung sind unterschiedliche Wege</h3>
<p>Das Anfrageformular speichert Name, E-Mail-Adresse, Unternehmen, Nachricht und die Seite, von der Sie senden, in der Datenbank dieser Website. Nur das Inhaberkonto von NeXify AI kann gespeicherte Anfragen lesen. Über jede neue Anfrage erhält NeXify AI eine Benachrichtigung in Slack, die nur Anfrageart, Vorgangsnummer, Name und gegebenenfalls Unternehmen enthält – nicht Ihre E-Mail-Adresse oder Nachricht. Wählen Sie stattdessen den angebotenen E-Mail-Entwurf, wird nichts gespeichert. Die ORACLE-Beratung dagegen verarbeitet Ihre eingegebene Frage über einen KI-Dienst. Nutzen Sie für beide Wege nur die Angaben, die für Ihr Anliegen erforderlich sind.</p>
<h3>Konto und Agentenverbindung</h3>
<p>Für die Registrierung verwenden Sie E-Mail-Adresse und Passwort. Anmeldung, E-Mail-Bestätigung und Passwortzurücksetzung werden über den Kontodienst verarbeitet. Die Anmeldung allein bestätigt weder einen aktivierten Suite-Arbeitsbereich noch einen API-Zugang.</p>
<p>Eine externe Agentenverbindung wird nach Anmeldung gesondert autorisiert. Die Website-Werkzeuge liefern ausschließlich festgelegte öffentliche Seitentitel, Pfade und Kontaktangaben. Die Anmeldung ist kein Anlass, diese Antworten um private Kontodaten oder Projektinhalte zu ergänzen. Welche Kontoinformationen im Autorisierungsvorgang geteilt werden, wird dort angezeigt.</p>
<h3>Suite, API und Agenturprojekt getrennt betrachten</h3>
<p>Die Suite kann eigene Arbeitsmaterialien und Teamzugänge verwenden; bei der API sendet eine eigene Anwendung Daten für einen Aufruf. Welche Dienste, Inhalte und Zugriffe dafür tatsächlich vorgesehen sind, muss am konkreten Produktzugang beschrieben sein. Diese Website-Beratung bestätigt keine Verarbeitung innerhalb eines bereits aktivierten Produkts.</p>
<p>Für beauftragte Websites, Portale, Kampagnen oder Automatisierungen werden die benötigten Daten und Übergabewege projektbezogen geklärt. Übergeben Sie vertrauliche Unterlagen erst über den dafür vereinbarten Weg, nicht über den öffentlichen ORACLE-Chat.</p>
<h3>TEILEKLAR-Anfragen</h3>
<p>Die TEILEKLAR-Hilfe ist eine Themenauswahl mit Anfrageübergabe, keine Teile-Matching-KI. Fahrzeugdaten, Teilenummer und Terminwunsch können in einem E-Mail-Entwurf stehen. Dieser Auftritt verarbeitet keine Onlinebestellung oder Zahlung; eine Anfrage erteilt keine Passungszusage.</p>
<div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/cookies">Sie wählen, was zusätzlich aktiv wird.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-privacy-grundsatz-1" tabIndex={-1} aria-labelledby="content-privacy-grundsatz-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 02</span>
                    <h2 id="content-privacy-grundsatz-1-title">Transparenz vor der Nutzung</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Der konkrete Dienst bestimmt die jeweilige Verarbeitung. Verantwortliche, Empfänger, Rechtsgrundlage und Fristen gehören in die geprüften Informationen dieses Dienstes; diese Übersicht ersetzt sie nicht.</p>
                  
<h3>Der Umfang dieser Information</h3>
<p>Eine vollständige Datenschutzerklärung muss die Verantwortlichen und die tatsächlich eingesetzten Dienste benennen. Diese Übersicht erläutert einzelne Abläufe, bestätigt aber keine vollständige rechtliche Prüfung und legt keine zusätzlichen Speicherfristen fest.</p>
<h3>Was vor einer abschließenden Freigabe noch feststehen muss</h3>
<p>Für jeden Dienst sind Anbieter und Verantwortlichkeit, Zweck, Datenkategorien, Empfänger, Rechtsgrundlage, Aufbewahrung beziehungsweise deren Kriterien und gegebenenfalls internationale Übermittlungen zu bestätigen. Die konkrete Bearbeitung von Auskunfts-, Berichtigungs-, Löschungs- und weiteren Datenschutzanliegen gehört ebenfalls in die abschließenden Unterlagen. Aus dieser Übersicht folgen keine erfundenen Fristen oder Zusagen zur Verarbeitung durch Dienstanbieter.</p>
<nav className="legal-scope-links" aria-label="Zugeordnete Datenhinweise"><a href="/impressum">Anbieterangaben</a><a href="/cookies">Browserspeicherung</a><a href="/ki-hinweise">KI-Beratung</a><a href="/teileklar/rechtliches">TEILEKLAR</a></nav>
</div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container is-plain"} aria-labelledby="finish-title-privacy">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Weiterführende Seiten</span>
                  <h2 id="finish-title-privacy">Weiterführende Seiten</h2>
                </div>
                <div className={"hc-finish-next"}>
                  <div className={"hc-finish-actions"}>
                    <a className={"hc-finish-primary"} href="/kontakt">Mit NeXify Kontakt aufnehmen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    <a className={"hc-text-link"} href="/vertragsgrundlagen">Vereinbarung und Leistungsumfang<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                  </div>
                </div>
              </section>
            </div>
    </NexifyShell>
  );
}

function ImportedSectionDieFACTORYEntdeckenMit() {
  return (
    <section className={"hc-container pc-guide"} aria-label="Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE">
      <details className={"hc-service-detail"}>
        <summary>
          <span>
            <strong className={"hc-service-name"}>Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE</strong>
          </span>
          <svg className={"hc-disclosure-icon"} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 12h14m-7-7v14" />
          </svg>
        </summary>
        <div className={"hc-service-body"}>
          <p>Die Seitenführung verbindet unsere Leistungen, Produkte und Projektwege. Sie können jeden Bereich auch direkt öffnen.</p>
          <GuideNavigation initial="business-website" />
        </div>
      </details>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-privacy">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-privacy">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/kontakt">Schildern Sie Ihr Vorhaben.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein paar Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der nächste Schritt aussieht.</p>
          <a aria-label="Schildern Sie Ihr Vorhaben. – Seite ansehen" className={"hc-text-link"} href="/kontakt">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/vertragsgrundlagen">Gute Zusammenarbeit hat klare Grundlagen.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Marke, Website, KI und Betreuung gehören zu einem abgestimmten Auftrag. Den verbindlichen Umfang legt die bestätigte Vereinbarung fest. Die Vertragsunterlagen bleiben bis zur gesonderten Endprüfung Entwürfe.</p>
          <a aria-label="Gute Zusammenarbeit hat klare Grundlagen. – Seite ansehen" className={"hc-text-link"} href="/vertragsgrundlagen">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/impressum">Impressum · NeXify AI by NeXify<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Anbieter dieser Website ist NeXify AI by NeXify, Inhaber Pascal Courbois, eine Eenmanszaak nach niederländischem Recht mit Anschrift in Venlo.</p>
          <a aria-label="Impressum · NeXify AI by NeXify – Seite ansehen" className={"hc-text-link"} href="/impressum">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/ki-hinweise">KI mit klarer Verantwortung.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>NeXify AI FACTORY verbindet menschliche Gestaltung mit KI-gestützter Arbeit. Kennzeichnung, Quellenprüfung und Freigaben gehören zum jeweiligen Einsatz. Eine KI-Ausgabe ist keine automatische Entscheidung oder Zusage.</p>
          <a aria-label="KI mit klarer Verantwortung. – Seite ansehen" className={"hc-text-link"} href="/ki-hinweise">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

