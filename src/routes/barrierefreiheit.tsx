import { GuideNavigation } from "@/components/site/GuideNavigation";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/barrierefreiheit.css?url";

export const Route = createFileRoute("/barrierefreiheit")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Qualität soll zugänglich sein. · NeXify AI" }, { name: "description", content: "Informationen zur zugänglichen Nutzung und Barrierefreiheit der NeXify-Website." }, { property: "og:title", content: "Qualität soll zugänglich sein. · NeXify AI" }, { property: "og:description", content: "Informationen zur zugänglichen Nutzung und Barrierefreiheit der NeXify-Website." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return (
    <NexifyShell>
            <div className={"home-concept page-concept page-accessibility layout-document context-nexify"}>
              <section className={"identity-hero is-text-only"} aria-labelledby="page-title-accessibility">
                <div className={"identity-scene"}>
                  <div className={"identity-copy"}>
                    <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                      <ol>
                        <li>
                          <a href="/">Startseite</a>
                        </li>
                        <li className={"visually-hidden"}>
                          <span aria-current="page">Qualität soll zugänglich sein.</span>
                        </li>
                      </ol>
                    </nav>
                    <span className={"hc-kicker"}>NEXIFY AI<span aria-hidden="true"> / </span>Informationen und Recht</span>
                    <h1 id="page-title-accessibility">Qualität soll zugänglich sein.</h1>
                    <p className={"identity-body"}>Gutes Design trägt auch bei Tastaturbedienung, größerem Text und reduzierter Bewegung. Wir entwickeln diese Zugänglichkeit weiter; eine umfassend bestätigte Konformität wird hier nicht erklärt.</p>
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
                <a href="#content-accessibility-ueberblick-0">Lesbar, bedienbar, nachvollziehbar<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
                <a href="#content-accessibility-anspruch-rueckmeldung-1">Ihr Hinweis verbessert die nächste Version<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
              </nav>
              <div className={"pc-sections"}>
                <section className={"hc-intro hc-container pc-section"} id="content-accessibility-ueberblick-0" tabIndex={-1} aria-labelledby="content-accessibility-ueberblick-0-title">
                  <div>
                    <span className={"hc-kicker"}>01 / 02</span>
                    <h2 id="content-accessibility-ueberblick-0-title">Lesbar, bedienbar, nachvollziehbar</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Klare Hierarchien, sichtbarer Fokus und verständliche Beschriftungen gehören zum Gestaltungsanspruch. Medien unterstützen die Botschaft; wichtige Informationen dürfen nicht allein von Bewegung oder Farbe abhängen.</p>
                    
<h3>Information bleibt unabhängig von Effekten</h3>
<p>Eine Überschrift soll den folgenden Abschnitt verständlich benennen. Fehlermeldungen müssen den betroffenen Schritt nennen, statt nur eine Farbe zu ändern. Das gilt gleichermaßen für die Seitennavigation, eine Anfrage und die Produktberatung.</p>
<div className={"hc-service-detail pc-module"}>
                      <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
                      <a className={"hc-text-link"} href="/kontakt">Ihr Projekt an die Factory<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                </section>
                <section className={"hc-intro hc-container pc-section"} id="content-accessibility-anspruch-rueckmeldung-1" tabIndex={-1} aria-labelledby="content-accessibility-anspruch-rueckmeldung-1-title">
                  <div>
                    <span className={"hc-kicker"}>02 / 02</span>
                    <h2 id="content-accessibility-anspruch-rueckmeldung-1-title">Ihr Hinweis verbessert die nächste Version</h2>
                  </div>
                  <div className={"pc-section-body"}>
                    <p>Beschreiben Sie eine Barriere mit Seite, betroffener Funktion und Gerät. Über den Kontaktweg erreicht Ihr Hinweis das Projektteam. Übermitteln Sie dabei keine Zugangsdaten oder vertraulichen Inhalte.</p>
                  
<h3>Eine hilfreiche Rückmeldung</h3>
<p>Nennen Sie die Seitenadresse, was Sie tun wollten und was tatsächlich passiert ist. Gerät, Browser und eine Beschreibung der betroffenen Stelle helfen bei der Eingrenzung. Eine umfassende Prüfung aller Hilfsmittel und Geräte steht weiterhin aus.</p>
</div>
                </section>
              </div>
              <ImportedSectionDieFACTORYEntdeckenMit />
              <ImportedSectionPassendeThemen />
              <section className={"hc-section hc-finish hc-container is-plain"} aria-labelledby="finish-title-accessibility">
                <div className={"hc-finish-heading"}>
                  <span className={"hc-kicker"}>Weiterführende Seiten</span>
                  <h2 id="finish-title-accessibility">Weiterführende Seiten</h2>
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
    <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-accessibility">
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-accessibility">Passende Themen</h2>
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
            <a href="/datenschutz">Ihre Daten. Ein klarer Zweck.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
          </h3>
          <p>Vertrauen braucht nachvollziehbaren Umgang mit Informationen. Für Website, Anfragen und Arbeitsbereiche sind Zweck, Verantwortlichkeit und Aufbewahrung getrennt auszuweisen. Die vollständige Datenschutzerklärung ist noch in Prüfung.</p>
          <a aria-label="Ihre Daten. Ein klarer Zweck. – Seite ansehen" className={"hc-text-link"} href="/datenschutz">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
        </li>
      </ol>
    </section>
  );
}

