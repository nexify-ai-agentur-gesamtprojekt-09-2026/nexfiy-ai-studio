import type { CSSProperties } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/teileklar.rechtliches.css?raw";
import { canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/teileklar_/rechtliches")({
  head: () => ({
    links: [canonicalLink("/teileklar/rechtliches")], meta: [{ title: "TEILEKLAR. Bedingungen mit eindeutiger Zuordnung. · TEILEKLAR.shop" }, { name: "description", content: "Handel und Werkstattservice brauchen eigene Anbieter-, Datenschutz- und Kaufunterlagen. Deren vollständige Freigabe steht aus; diese Übersicht bestätigt." }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  const [activeSlide0, setActiveSlide0] = useState(0);
  const carouselContent0 = (<>
{activeSlide0 === 0 && <Fragment key={0}>
<svg className={"glass-lens-filter"} width="0" height="0" aria-hidden="true" {...({ focusable: "false" } as any)}>
  <filter id="as-linse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "36", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-leiste" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-leiste.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "30", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-front" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-front.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "44", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
</svg>
<div className={"website"}>
  <a className={"skip-link"} href="#page-content">Zum Inhalt</a>
  <header className={"tk-commerce-header"}>
    <div className={"tk-service-strip"}>
      <span>Auto &amp; Motorrad · Alle Preise inkl. MwSt.</span>
      <a href="/teileklar/rechtliches" aria-current="page">Versand &amp; Rückgabe</a>
      <a href="/kontakt">Persönlicher Kontakt</a>
    </div>
    <div className={"tk-commerce-main"}>
      <a className={"tk-wordmark"} href="/teileklar">TEILE<span>KLAR</span><small>Passende Auswahl. Klare Angaben.</small></a>
      <form method="get" role="search" className={"tk-header-search"}>
        <label className={"visually-hidden"} htmlFor="store-search">Artikel, Marke oder Artikelnummer suchen</label>
        <input id="store-search" maxLength={120} placeholder="Artikel, Marke oder Artikelnummer" type="search" name="q" />
        <button className={"primary-button"} type="submit">Suchen</button>
      </form>
      <div className={"tk-header-account"}>
        <a href="/anmelden">Mein Konto</a>
        <a className={"tk-header-cart"} href="/teileklar/warenkorb">Warenkorb <span>–</span></a>
      </div>
    </div>
    <nav className={"tk-commerce-nav"} aria-label="Shopnavigation">
      <a href="/teileklar">Schaufenster</a>
      <a href="/teileklar/shop">Alle Artikel</a>
      <a href="/teileklar/kategorien">Kategorien</a>
      <a href="/teileklar/fahrzeug-und-passung">Fahrzeugpassung</a>
      <a href="/teileklar/werkstatt">Werkstätten</a>
      <a href="/teileklar/bestellungen">Meine Bestellungen</a>
    </nav>
  </header>
  <main id="page-content" tabIndex={-1}>
    <div className={"home-concept page-concept page-tk-legal layout-document context-teileklar"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="page-title-tk-legal">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
              <ol>
                <li>
                  <a href="/">Startseite</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                </li>
                <li className={"visually-hidden"}>
                  <span aria-current="page">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Informationen und Recht</span>
            <h1 id="page-title-tk-legal">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</h1>
            <p className={"identity-body"}>Handel und Werkstattservice brauchen eigene Anbieter-, Datenschutz- und Kaufunterlagen. Deren vollständige Freigabe steht aus; diese Übersicht bestätigt keine bereits geltenden Kaufbedingungen.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar">
                <span>Zur Fahrzeugwelt von TEILEKLAR</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/cookies">Optionale Funktionen verwalten</a>
            </div>
          </div>
        </div>
      </section>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        <a href="#content-tk-legal-ueberblick-0">Angebot und Vertragspartner gehören zusammen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-legal-anbieter-und-geltung-1">Die Unternehmenszuordnung offen ausweisen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-legal-ueberblick-0" tabIndex={-1} aria-labelledby="content-tk-legal-ueberblick-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-legal-ueberblick-0-title">Angebot und Vertragspartner gehören zusammen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Vor einem Kauf müssen Anbieter, Artikel, Markt und Bedingungen feststehen. Widerruf, Versand, Zahlung und Service werden dem konkreten Angebot zugeordnet, nicht aus einer allgemeinen Markenbeschreibung abgeleitet.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/impressum">NeXify AI FACTORY – Unternehmensangaben<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-legal-anbieter-und-geltung-1" tabIndex={-1} aria-labelledby="content-tk-legal-anbieter-und-geltung-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-legal-anbieter-und-geltung-1-title">Die Unternehmenszuordnung offen ausweisen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>TEILEKLAR bleibt ein eigenständiger Handels- und Werkstattbereich im NeXify-Markenauftritt. Historische Einzelunternehmensdaten werden nicht auf NeXify AI FACTORY übertragen. Die konkrete Anbieterzuordnung muss vor einem Kauf bestätigt sein.</p>
          </div>
        </section>
      </div>
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
            <div className={"pc-guide-controls"}>
              <label id="bb-customSelect-HkSy2-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-HkSy2-panel" aria-activedescendant="bb-customSelect-HkSy2-selectedOption" aria-labelledby="bb-customSelect-HkSy2-label" tabIndex={0}><span>Ihr Fahrzeug. Die passende Anfrage.</span></span><select tabIndex={-1} defaultValue="business-website"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-HkSy2-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option"} role="option">Ihr Projektbriefing</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-HkSy2-selectedOption">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
              <button type="button" aria-pressed="false">Begleitung starten</button>
            </div>
          </div>
        </details>
      </section>
      <section className={"hc-container pc-supplement"}>
        <div className={"tk-legal"}>
          <section id="agb" className={"tk-legal-doc"} aria-labelledby="agb-title">
            <h2 id="agb-title">Allgemeine Geschäftsbedingungen</h2>
            <p className={"tk-meta"}>Allgemeine Geschäftsbedingungen für den Verkauf über TEILEKLAR.</p>
            <div className={"tk-legal-section"}>
              <h3>1. Geltungsbereich</h3>
              <p>Diese Bedingungen gelten für alle Bestellungen über teileklar.shop in den Marktversionen Deutschland, Österreich, Schweiz, Niederlande, Belgien und Luxemburg. Abweichende Bedingungen des Kunden gelten nur bei schriftlicher Zustimmung.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>2. Vertragsschluss</h3>
              <p>Die Darstellung der Artikel ist kein bindendes Angebot. Der Vertrag kommt mit der Annahmeerklärung bzw. mit dem Versand der Ware zustande. Artikel mit dem Hinweis „Eine Frage offen“ werden erst nach Klärung der offenen Angabe freigegeben.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>3. Preise und Zahlung</h3>
              <p>Preise gelten in der Währung der jeweiligen Marktversion einschließlich der dort ausgewiesenen Steuer. Versandkosten, Pfand auf Starterbatterien und Zuschläge für Speditionsware werden vor dem Kauf im Warenkorb ausgewiesen. Zahlungsarten richten sich nach dem Markt.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>4. Lieferung</h3>
              <p>Angegebene Lieferzeiten sind voraussichtliche Zeiträume. Teilsendungen werden vor dem Kauf angekündigt. Für die Schweiz sind Zoll- und Steuerabwicklung im Preis enthalten, sofern ausgewiesen.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>5. Passung und Prüfpflicht</h3>
              <p>Angaben zur Passung beruhen auf Katalog- und Herstellerdaten mit angegebenem Stand. Der Kunde prüft vor dem Einbau die Übereinstimmung mit dem konkreten Fahrzeug. Sicherheitsrelevante Arbeiten sind von einer fachkundigen Werkstatt auszuführen.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>6. Rückgabe und Gewährleistung</h3>
              <p>Es gilt die gesetzliche Gewährleistung. Rückgaben erfolgen nach den Regeln der jeweiligen Marktversion; für Verbraucher gilt das gesetzliche Widerrufsrecht von 14 Tagen. Für Starterbatterien besteht ein Rücknahmeanspruch, das Pfand wird bei Rückgabe erstattet.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>7. Eigentumsvorbehalt</h3>
              <p>Die Ware bleibt bis zur vollständigen Bezahlung Eigentum des Anbieters.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>8. Haftung</h3>
              <p>Die Haftung für leichte Fahrlässigkeit ist auf vorhersehbare, vertragstypische Schäden begrenzt. Unberührt bleiben Haftung für Vorsatz, grobe Fahrlässigkeit, Personenschäden und Ansprüche nach Produkthaftungsrecht.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>9. Recht und Gerichtsstand</h3>
              <p>Es gilt das Recht der Niederlande; die Anwendung des CISG ist ausgeschlossen. Gerichtsstand ist Venlo, soweit gesetzlich zulässig. Zwingende Verbrauchergerichtsstände und Verbraucherschutzvorschriften des Wohnsitzstaates bleiben unberührt.</p>
            </div>
          </section>
          <section id="widerruf" className={"tk-legal-doc"} aria-labelledby="widerruf-title">
            <h2 id="widerruf-title">Widerrufsbelehrung</h2>
            <p className={"tk-meta"}>Widerrufsbelehrung für Verbraucher.</p>
            <div className={"tk-legal-section"}>
              <h3>Widerrufsrecht</h3>
              <p>Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe von Gründen den Vertrag zu widerrufen. Die Frist beginnt an dem Tag, an dem die Ware in Besitz genommen wurde. Bei Teilsendungen beginnt sie mit Erhalt der letzten Teilsendung.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>Ausübung</h3>
              <p>Zum Widerruf genügt eine eindeutige Erklärung per E-Mail an mail@teileklar.shop oder per Post an TEILEKLAR, Graaf van Loonstraat 1E, 5921 JA Venlo, Niederlande. Die Verwendung des Muster-Formulars ist möglich, aber nicht vorgeschrieben.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>Folgen</h3>
              <p>Erhaltene Zahlungen werden unverzüglich, spätestens binnen 14 Tagen nach Zugang des Widerrufs zurückgezahlt, mit demselben Zahlungsmittel wie bei der Zahlung. Die Rücksendekosten trägt der Anbieter, sofern nicht anders angegeben; die Ware ist unverzüglich, spätestens binnen 14 Tagen zurückzusenden.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>Wertersatz</h3>
              <p>Für einen Wertverlust ist Ersatz zu leisten, wenn dieser auf einen Umgang zurückgeht, der zur Prüfung der Ware nicht notwendig war – insbesondere bei bereits eingebauten oder eingelaufenen Bremsteilen und bei geöffneten Ölbehältnissen.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>Ausnahmen</h3>
              <p>Kein Widerrufsrecht besteht bei Waren, die nach Kundenspezifikation angefertigt wurden, sowie bei versiegelten Waren, die aus Gesundheits- oder Hygienegründen nicht zur Rückgabe geeignet sind, wenn die Versiegelung entfernt wurde.</p>
            </div>
            <div id="widerrufsformular" className={"tk-legal-section"}>
              <h3>Muster-Widerrufsformular</h3>
              <p>An TEILEKLAR, Graaf van Loonstraat 1E, 5921 JA Venlo, Niederlande, mail@teileklar.shop:</p>
              <p>Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der folgenden Waren: …</p>
              <p>Bestellt am … / erhalten am …</p>
              <p>Name und Anschrift des Verbrauchers …</p>
              <p>Datum, Unterschrift (bei Mitteilung auf Papier)</p>
            </div>
          </section>
        </div>
      </section>
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-legal">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-legal">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Zubehör und Teile mit klaren Angaben: Originalfotos des Lieferanten, Preise inklusive Mehrwertsteuer und Versandkosten, die Sie vor dem Kauf sehen.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>NEXIFY AI</span>
            <h3>
              <a href="/cookies">Sie wählen, was zusätzlich aktiv wird.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Notwendige Funktionen und optionale Messung haben unterschiedliche Aufgaben. Verständliche Einstellungen sollen vor optionaler Verarbeitung greifen. Die vollständige rechtliche Beschreibung wird noch geprüft.</p>
            <a aria-label="Sie wählen, was zusätzlich aktiv wird. – Seite ansehen" className={"hc-text-link"} href="/cookies">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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
      <section className={"hc-section hc-finish hc-container is-plain"} aria-labelledby="finish-title-tk-legal">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="finish-title-tk-legal">Weiterführende Seiten</h2>
        </div>
        <div className={"hc-finish-next"}>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar">Zur Fahrzeugwelt von TEILEKLAR<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/cookies">Optionale Funktionen verwalten<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Ihr Anliegen mit TEILEKLAR klären<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </main>
  <footer className={"site-footer structured-footer footer-refined"}>
    <div className={"footer-inner"}>
      <div className={"footer-invitation"}>
        <div>
          <h2>Lassen Sie uns über Ihr Vorhaben sprechen.</h2>
          <p>Erzählen Sie uns, was Sie verändern möchten. Wir klären gemeinsam den passenden nächsten Schritt.</p>
        </div>
        <a className={"nexify-control primary-button "} data-variant="primary" href="/kontakt">Projekt besprechen<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
      </div>
      <div className={"footer-main"}>
        <div className={"footer-brand-block"}>
          <a aria-label="Zur Startseite" className={"brand"} href="/teileklar">
            <span className={"nx-logo"} data-groesse="s">
              <span className={"nx-logo-wort"}>
                <span className={"nx-logo-name"}>TEILE<span className={"nx-logo-x"}>KLAR</span></span>
                <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
              </span>
            </span>
          </a>
          <p>Teile, Fahrzeugfragen und Werkstattkontakte. Beschreiben Sie, was Sie benötigen.</p>
          <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Anliegen beschreiben <span aria-hidden="true">→</span></a>
        </div>
        <div className={"footer-link-groups "}>
          <nav aria-label={"Produkte & Arbeitsbereiche"}>
            <h2>Produkte &amp; Arbeitsbereiche</h2>
            <a href="/teileklar">TEILEKLAR</a>
            <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
            <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.</a>
            <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
            <a href="/teileklar/partner-werden">Partner werden</a>
            <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
          </nav>
          <nav aria-label={"Leistungen & Zusammenarbeit"}>
            <h2>Leistungen &amp; Zusammenarbeit</h2>
            <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
            <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
            <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
          </nav>
          <nav aria-label="NeXify AI">
            <h2>NeXify AI</h2>
            <a href="/unternehmen">Über NeXify</a>
            <a href="/kontakt">Kontakt</a>
            <a href="/anmelden">Anmelden</a>
            <a href="/registrieren">Registrieren</a>
          </nav>
          <nav aria-label="Rechtliches">
            <h2>Rechtliches</h2>
            <a href="/teileklar/rechtliches" aria-current="page">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
            <a href="/ki-hinweise">KI-Hinweise</a>
            <a href="/barrierefreiheit">Barrierefreiheit</a>
            <a href="/cookies">Datenschutzeinstellungen</a>
          </nav>
        </div>
      </div>
      <div className={"footer-bottom"}>
        <span className={"footer-claim"}>TEILEKLAR — Na KLAR! <span aria-hidden="true">·</span> Teile · Fahrzeugzuordnung · Werkstatt · Partnerschaft</span>
        <a className={"footer-crosslink"} href="/">NeXify AI <span aria-hidden="true">→</span></a>
        <details className={"footer-overview"}>
          <summary aria-expanded="false" aria-controls="_r_3_">
            <span>Seitenübersicht</span>
            <span className={"footer-overview-marker"} aria-hidden="true">+</span>
          </summary>
          <div className={"footer-overview-panel"} id="_r_3_">
            <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
            <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
              <div className={"footer-overview-group"}>
                <h3>TEILEKLAR</h3>
                <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
                <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
                <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
                <a href="/teileklar/kasse">Zur Kasse. Schritt für Schritt.</a>
                <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.</a>
                <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
                <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
                <a href="/teileklar/partner-werden">Werkstatt? Werden Sie Partner.</a>
                <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
                <a href="/teileklar/shop">Auto &amp; Motorrad. Klar ausgewählt.</a>
                <a href="/teileklar/reifenrechner">Reifengrößen vergleichen.</a>
                <a href="/teileklar/batterie-berater">Die passende Batterie finden.</a>
              </div>
              <div className={"footer-overview-group"}>
                <h3>Rechtliches</h3>
                <a href="/teileklar/rechtliches" aria-current="page">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
              </div>
            </nav>
          </div>
        </details>
      </div>
      <div className={"footer-legal"}>
        <nav className={"footer-legal-direct"} aria-label="Rechtsdokumente">
          <a href="/teileklar/rechtliches" aria-current="page">TEILEKLAR: Anbieterinformationen und Datenschutz</a>
        </nav>
        <details className={"footer-legal-details"}>
          <summary aria-expanded="false" aria-controls="_r_2_">Hinweise zu den Rechtsdokumenten</summary>
          <div id="_r_2_">
            <p>Die Rechtsinformationen für TEILEKLAR sind direkt erreichbar. Vollständige Angaben zum Anbieter, Datenschutz und Verbraucherrechten im Shop stehen noch zur Prüfung und Freigabe.</p>
            <p>Eine öffentliche Übersicht der Drittanbieter-Komponenten und ihrer Lizenzen ist noch nicht verfügbar.</p>
          </div>
        </details>
      </div>
    </div>
    <div className={"footer-utilities"}>
      <details className={"diagnostic-consent"}>
        <summary>Fehlerdiagnose-Einstellungen</summary>
        <div className={"diagnostic-consent-content"}>
          <p>Optional: Fehlerdiagnose mit PostHog. Mit Ihrer Zustimmung können technische Fehlerstellen, Fehlertyp und App-Version übermittelt werden. Eingaben und Fehlertexte werden entfernt. Keine Marketing- oder Klickerfassung und keine Sitzungsaufzeichnung.</p>
          <p>Bei einer Übertragung erhält der Dienst Netzwerkdaten wie Ihre IP-Adresse.</p>
          <p>Ihre Auswahl gilt nur bis zum Neuladen und wird nicht gespeichert. Ablehnen schränkt die Seitenfunktionen nicht ein.</p>
          <p className={"diagnostic-consent-status"} role="status" aria-live="polite">Aus · noch keine Auswahl</p>
          <div className={"diagnostic-consent-actions"} role="group" aria-label="Fehlerdiagnose-Einstellungen">
            <button type="button" className={"\x6futline-button"}>Zulassen</button>
            <button type="button" className={"\x6futline-button"}>Ablehnen</button>
          </div>
          <a href="/datenschutz">Datenschutzhinweise</a>
        </div>
      </details>
    </div>
  </footer>
</div>
<button onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveSlide0(index => (index + 1 + 2) % 2); }} aria-expanded="false" aria-controls="aifly-panel" type="button" className={"nexify-control secondary-button reopen-chat"} data-variant="secondary"><span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true"><img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" /></span>TEILEKLAR Hilfe</button>
<aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" hidden>
  <div className={"chat-resize-handle"} role="separator" aria-orientation="vertical" aria-label="Chatbreite anpassen" tabIndex={0} aria-valuemin={360} aria-valuemax={952} aria-valuenow={360} />
  <div className={"panel-heading"}>
    <div className={"panel-heading-copy"}>
      <div className={"panel-identity"}>
        <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
          <img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
        </span>
        <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
      </div>
    </div>
    <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
  <div className={"sdk-orientation-view"}>
    <section className={"public-orientation"} aria-label="Willkommen bei TEILEKLAR" style={{ "--ca-fuss": "0px" } as CSSProperties}>
      <div className={"orientation-content"}>
        <div className={"orientation-intro"}>
          <div className={"orientation-host"}>
            <span className={"orientation-host-figure"} aria-hidden="true">
              <img alt="" width="512" height="512" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
            </span>
            <p className={"nx-oracle-name orientation-host-name"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></p>
          </div>
          <h3>Willkommen bei TEILEKLAR</h3>
          <p className={"orientation-intro-body"}>Willkommen bei TEILEKLAR. Worum geht es bei Ihnen: ein Ersatzteil, ein Werkstattbesuch oder eine Zusammenarbeit? Bei einer Teile- oder Werkstattfrage nennen Sie bitte Ihr Fahrzeug und beschreiben Sie Ihr Anliegen. Eine vorhandene Teilenummer hilft bei der Zuordnung.</p>
        </div>
        <div className={"orientation-history"} role="log" aria-live="polite" aria-relevant="additions text" aria-busy="false" />
        <div className={"orientation-starters"} role="group" aria-label="Ihr Fahrzeug-/Teile-Anliegen">
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">01</span>
            <span className={"orientation-starter-copy"}>
              <strong>Fahrzeug &amp; Teil</strong>
              <small>Mit Fahrzeugdaten und vorhandenem Hinweis zum passenden Teil starten.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">02</span>
            <span className={"orientation-starter-copy"}>
              <strong>Werkstatt-Anfrage</strong>
              <small>Leistung, Fahrzeug und Standort für die Werkstattsuche einordnen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">03</span>
            <span className={"orientation-starter-copy"}>
              <strong>Zusammenarbeit</strong>
              <small>Werkstattprofil, Zusammenarbeit und gemeinsamen Serviceweg besprechen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
        <ol className={"orientation-path orientation-path-quiet"} aria-label="Vom Anliegen zur passenden Anlaufstelle.">
          <li data-state="open"><small>01</small>Fahrzeug nennen</li>
          <li data-state="open"><small>02</small>Anliegen eingrenzen</li>
          <li data-state="open"><small>03</small>Nächsten Weg wählen</li>
        </ol>
      </div>
      <form className={"orientation-composer"}>
        <label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label>
        <textarea id="orientation-message" maxLength={1000} rows={1} placeholder="Ihr Fahrzeug-/Teile-Anliegen" aria-describedby="orientation-keys" required style={{ height: "0px" }} {...({ enterkeyhint: "send" } as any)} />
        <span id="orientation-keys" className={"visually-hidden"}>Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.</span>
        <div className={"orientation-composer-actions"}>
          <button className={"primary-button"} disabled aria-label="Nachricht senden">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      <p className={"connection-note orientation-status"} role="status" />
      <p className={"connection-note"}>Bitte keine Passwörter oder Zahlungsdaten eingeben. <a href="/teileklar/rechtliches" aria-current="page">Datenschutz</a></p>
    </section>
  </div>
</aside>
</Fragment>}
{activeSlide0 === 1 && <Fragment key={1}>
<svg className={"glass-lens-filter"} width="0" height="0" aria-hidden="true" {...({ focusable: "false" } as any)}>
  <filter id="as-linse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "36", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-leiste" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-leiste.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "30", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
  <filter id="as-linse-front" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="karte" {...({ href: "/glass/linse-front.svg" } as any)} />
    <feDisplacementMap in="SourceGraphic" in2="karte" {...({ scale: "44", xChannelSelector: "R", yChannelSelector: "G" } as any)} />
  </filter>
</svg>
<div className={"website"}>
  <a className={"skip-link"} href="#page-content">Zum Inhalt</a>
  <header className={"tk-commerce-header"}>
    <div className={"tk-service-strip"}>
      <span>Auto &amp; Motorrad · Alle Preise inkl. MwSt.</span>
      <a href="/teileklar/rechtliches" aria-current="page">Versand &amp; Rückgabe</a>
      <a href="/kontakt">Persönlicher Kontakt</a>
    </div>
    <div className={"tk-commerce-main"}>
      <a className={"tk-wordmark"} href="/teileklar">TEILE<span>KLAR</span><small>Passende Auswahl. Klare Angaben.</small></a>
      <form method="get" role="search" className={"tk-header-search"}>
        <label className={"visually-hidden"} htmlFor="store-search">Artikel, Marke oder Artikelnummer suchen</label>
        <input id="store-search" maxLength={120} placeholder="Artikel, Marke oder Artikelnummer" type="search" name="q" />
        <button className={"primary-button"} type="submit">Suchen</button>
      </form>
      <div className={"tk-header-account"}>
        <a href="/anmelden">Mein Konto</a>
        <a className={"tk-header-cart"} href="/teileklar/warenkorb">Warenkorb <span>–</span></a>
      </div>
    </div>
    <nav className={"tk-commerce-nav"} aria-label="Shopnavigation">
      <a href="/teileklar">Schaufenster</a>
      <a href="/teileklar/shop">Alle Artikel</a>
      <a href="/teileklar/kategorien">Kategorien</a>
      <a href="/teileklar/fahrzeug-und-passung">Fahrzeugpassung</a>
      <a href="/teileklar/werkstatt">Werkstätten</a>
      <a href="/teileklar/bestellungen">Meine Bestellungen</a>
    </nav>
  </header>
  <main id="page-content" tabIndex={-1}>
    <div className={"home-concept page-concept page-tk-legal layout-document context-teileklar"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="page-title-tk-legal">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
              <ol>
                <li>
                  <a href="/">Startseite</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                </li>
                <li className={"visually-hidden"}>
                  <span aria-current="page">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Informationen und Recht</span>
            <h1 id="page-title-tk-legal">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</h1>
            <p className={"identity-body"}>Handel und Werkstattservice brauchen eigene Anbieter-, Datenschutz- und Kaufunterlagen. Deren vollständige Freigabe steht aus; diese Übersicht bestätigt keine bereits geltenden Kaufbedingungen.</p>
            <div className={"identity-links"}>
              <a className={"nexify-control primary-button identity-primary-link"} data-variant="primary" href="/teileklar">
                <span>Zur Fahrzeugwelt von TEILEKLAR</span>
                <span aria-hidden="true" className={"identity-primary-arrow"}>→</span>
              </a>
              <a className={"nexify-control secondary-button identity-secondary-link"} data-variant="secondary" href="/cookies">Optionale Funktionen verwalten</a>
            </div>
          </div>
        </div>
      </section>
      <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
        <a href="#content-tk-legal-ueberblick-0">Angebot und Vertragspartner gehören zusammen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
        <a href="#content-tk-legal-anbieter-und-geltung-1">Die Unternehmenszuordnung offen ausweisen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M12 4v16M5 13l7 7 7-7" /></svg></a>
      </nav>
      <div className={"pc-sections"}>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-legal-ueberblick-0" tabIndex={-1} aria-labelledby="content-tk-legal-ueberblick-0-title">
          <div>
            <span className={"hc-kicker"}>01 / 02</span>
            <h2 id="content-tk-legal-ueberblick-0-title">Angebot und Vertragspartner gehören zusammen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>Vor einem Kauf müssen Anbieter, Artikel, Markt und Bedingungen feststehen. Widerruf, Versand, Zahlung und Service werden dem konkreten Angebot zugeordnet, nicht aus einer allgemeinen Markenbeschreibung abgeleitet.</p>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt</span>
              <a className={"hc-text-link"} href="/impressum">NeXify AI FACTORY – Unternehmensangaben<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            </div>
          </div>
        </section>
        <section className={"hc-intro hc-container pc-section"} id="content-tk-legal-anbieter-und-geltung-1" tabIndex={-1} aria-labelledby="content-tk-legal-anbieter-und-geltung-1-title">
          <div>
            <span className={"hc-kicker"}>02 / 02</span>
            <h2 id="content-tk-legal-anbieter-und-geltung-1-title">Die Unternehmenszuordnung offen ausweisen</h2>
          </div>
          <div className={"pc-section-body"}>
            <p>TEILEKLAR bleibt ein eigenständiger Handels- und Werkstattbereich im NeXify-Markenauftritt. Historische Einzelunternehmensdaten werden nicht auf NeXify AI FACTORY übertragen. Die konkrete Anbieterzuordnung muss vor einem Kauf bestätigt sein.</p>
          </div>
        </section>
      </div>
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
            <div className={"pc-guide-controls"}>
              <label id="bb-customSelect-HkSy2-label">Welchen Bereich möchten Sie erkunden?<div className={"bb-custom-select-container bb-customSelect"}><span className={"bb-custom-select-opener"} role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-HkSy2-panel" aria-activedescendant="bb-customSelect-HkSy2-selectedOption" aria-labelledby="bb-customSelect-HkSy2-label" tabIndex={0}><span>Ihr Fahrzeug. Die passende Anfrage.</span></span><select tabIndex={-1} defaultValue="business-website"><option value="business-website">Markenstart</option><option value="business-automation">KI im Betrieb</option><option value="business-growth">Wachstum &amp; Kampagnen</option><option value="business-apps">Digitale Arbeitsräume</option><option value="business-api">Agentische KI &amp; Integrationen</option><option value="knowledge-to-project">Ihr Projektbriefing</option><option value="teileklar-selection">Ihr Fahrzeug. Die passende Anfrage.</option><option value="teileklar-workshop">Werkstatt &amp; Zusammenarbeit</option><option value="teileklar-vouchers">Gutschein &amp; Bedingungen</option><option value="existing-client">Zusammenarbeit mit der FACTORY</option><option value="nex2fly-trial">NeX AIFly Suite · Ihr eigener Bereich</option></select><div id="bb-customSelect-HkSy2-panel" className={"bb-custom-select-panel"} role="listbox"><div className={"bb-custom-select-option"} role="option">Markenstart</div><div className={"bb-custom-select-option"} role="option">KI im Betrieb</div><div className={"bb-custom-select-option"} role="option">Wachstum &amp; Kampagnen</div><div className={"bb-custom-select-option"} role="option">Digitale Arbeitsräume</div><div className={"bb-custom-select-option"} role="option">Agentische KI &amp; Integrationen</div><div className={"bb-custom-select-option"} role="option">Ihr Projektbriefing</div><div className={"bb-custom-select-option bb-is-selected bb-has-focus"} role="option" id="bb-customSelect-HkSy2-selectedOption">Ihr Fahrzeug. Die passende Anfrage.</div><div className={"bb-custom-select-option"} role="option">Werkstatt &amp; Zusammenarbeit</div><div className={"bb-custom-select-option"} role="option">Gutschein &amp; Bedingungen</div><div className={"bb-custom-select-option"} role="option">Zusammenarbeit mit der FACTORY</div><div className={"bb-custom-select-option"} role="option">NeX AIFly Suite · Ihr eigener Bereich</div></div></div></label>
              <button type="button" aria-pressed="false">Begleitung starten</button>
            </div>
          </div>
        </details>
      </section>
      <section className={"hc-container pc-supplement"}>
        <div className={"tk-legal"}>
          <section id="agb" className={"tk-legal-doc"} aria-labelledby="agb-title">
            <h2 id="agb-title">Allgemeine Geschäftsbedingungen</h2>
            <p className={"tk-meta"}>Allgemeine Geschäftsbedingungen für den Verkauf über TEILEKLAR.</p>
            <div className={"tk-legal-section"}>
              <h3>1. Geltungsbereich</h3>
              <p>Diese Bedingungen gelten für alle Bestellungen über teileklar.shop in den Marktversionen Deutschland, Österreich, Schweiz, Niederlande, Belgien und Luxemburg. Abweichende Bedingungen des Kunden gelten nur bei schriftlicher Zustimmung.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>2. Vertragsschluss</h3>
              <p>Die Darstellung der Artikel ist kein bindendes Angebot. Der Vertrag kommt mit der Annahmeerklärung bzw. mit dem Versand der Ware zustande. Artikel mit dem Hinweis „Eine Frage offen“ werden erst nach Klärung der offenen Angabe freigegeben.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>3. Preise und Zahlung</h3>
              <p>Preise gelten in der Währung der jeweiligen Marktversion einschließlich der dort ausgewiesenen Steuer. Versandkosten, Pfand auf Starterbatterien und Zuschläge für Speditionsware werden vor dem Kauf im Warenkorb ausgewiesen. Zahlungsarten richten sich nach dem Markt.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>4. Lieferung</h3>
              <p>Angegebene Lieferzeiten sind voraussichtliche Zeiträume. Teilsendungen werden vor dem Kauf angekündigt. Für die Schweiz sind Zoll- und Steuerabwicklung im Preis enthalten, sofern ausgewiesen.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>5. Passung und Prüfpflicht</h3>
              <p>Angaben zur Passung beruhen auf Katalog- und Herstellerdaten mit angegebenem Stand. Der Kunde prüft vor dem Einbau die Übereinstimmung mit dem konkreten Fahrzeug. Sicherheitsrelevante Arbeiten sind von einer fachkundigen Werkstatt auszuführen.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>6. Rückgabe und Gewährleistung</h3>
              <p>Es gilt die gesetzliche Gewährleistung. Rückgaben erfolgen nach den Regeln der jeweiligen Marktversion; für Verbraucher gilt das gesetzliche Widerrufsrecht von 14 Tagen. Für Starterbatterien besteht ein Rücknahmeanspruch, das Pfand wird bei Rückgabe erstattet.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>7. Eigentumsvorbehalt</h3>
              <p>Die Ware bleibt bis zur vollständigen Bezahlung Eigentum des Anbieters.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>8. Haftung</h3>
              <p>Die Haftung für leichte Fahrlässigkeit ist auf vorhersehbare, vertragstypische Schäden begrenzt. Unberührt bleiben Haftung für Vorsatz, grobe Fahrlässigkeit, Personenschäden und Ansprüche nach Produkthaftungsrecht.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>9. Recht und Gerichtsstand</h3>
              <p>Es gilt das Recht der Niederlande; die Anwendung des CISG ist ausgeschlossen. Gerichtsstand ist Venlo, soweit gesetzlich zulässig. Zwingende Verbrauchergerichtsstände und Verbraucherschutzvorschriften des Wohnsitzstaates bleiben unberührt.</p>
            </div>
          </section>
          <section id="widerruf" className={"tk-legal-doc"} aria-labelledby="widerruf-title">
            <h2 id="widerruf-title">Widerrufsbelehrung</h2>
            <p className={"tk-meta"}>Widerrufsbelehrung für Verbraucher.</p>
            <div className={"tk-legal-section"}>
              <h3>Widerrufsrecht</h3>
              <p>Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe von Gründen den Vertrag zu widerrufen. Die Frist beginnt an dem Tag, an dem die Ware in Besitz genommen wurde. Bei Teilsendungen beginnt sie mit Erhalt der letzten Teilsendung.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>Ausübung</h3>
              <p>Zum Widerruf genügt eine eindeutige Erklärung per E-Mail an mail@teileklar.shop oder per Post an TEILEKLAR, Graaf van Loonstraat 1E, 5921 JA Venlo, Niederlande. Die Verwendung des Muster-Formulars ist möglich, aber nicht vorgeschrieben.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>Folgen</h3>
              <p>Erhaltene Zahlungen werden unverzüglich, spätestens binnen 14 Tagen nach Zugang des Widerrufs zurückgezahlt, mit demselben Zahlungsmittel wie bei der Zahlung. Die Rücksendekosten trägt der Anbieter, sofern nicht anders angegeben; die Ware ist unverzüglich, spätestens binnen 14 Tagen zurückzusenden.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>Wertersatz</h3>
              <p>Für einen Wertverlust ist Ersatz zu leisten, wenn dieser auf einen Umgang zurückgeht, der zur Prüfung der Ware nicht notwendig war – insbesondere bei bereits eingebauten oder eingelaufenen Bremsteilen und bei geöffneten Ölbehältnissen.</p>
            </div>
            <div className={"tk-legal-section"}>
              <h3>Ausnahmen</h3>
              <p>Kein Widerrufsrecht besteht bei Waren, die nach Kundenspezifikation angefertigt wurden, sowie bei versiegelten Waren, die aus Gesundheits- oder Hygienegründen nicht zur Rückgabe geeignet sind, wenn die Versiegelung entfernt wurde.</p>
            </div>
            <div id="widerrufsformular" className={"tk-legal-section"}>
              <h3>Muster-Widerrufsformular</h3>
              <p>An TEILEKLAR, Graaf van Loonstraat 1E, 5921 JA Venlo, Niederlande, mail@teileklar.shop:</p>
              <p>Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der folgenden Waren: …</p>
              <p>Bestellt am … / erhalten am …</p>
              <p>Name und Anschrift des Verbrauchers …</p>
              <p>Datum, Unterschrift (bei Mitteilung auf Papier)</p>
            </div>
          </section>
        </div>
      </section>
      <section className={"hc-section hc-container hc-process pc-related"} aria-labelledby="related-title-tk-legal">
        <header className={"hc-section-heading hc-process-heading"}>
          <div>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="related-title-tk-legal">Passende Themen</h2>
          </div>
          <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
        </header>
        <ol>
          <li>
            <span className={"hc-kicker"}>TEILEKLAR</span>
            <h3>
              <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Zubehör und Teile mit klaren Angaben: Originalfotos des Lieferanten, Preise inklusive Mehrwertsteuer und Versandkosten, die Sie vor dem Kauf sehen.</p>
            <a aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen" className={"hc-text-link"} href="/teileklar">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
          </li>
          <li>
            <span className={"hc-kicker"}>NEXIFY AI</span>
            <h3>
              <a href="/cookies">Sie wählen, was zusätzlich aktiv wird.<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M5 19 19 5M5 5h14v14" /></svg></a>
            </h3>
            <p>Notwendige Funktionen und optionale Messung haben unterschiedliche Aufgaben. Verständliche Einstellungen sollen vor optionaler Verarbeitung greifen. Die vollständige rechtliche Beschreibung wird noch geprüft.</p>
            <a aria-label="Sie wählen, was zusätzlich aktiv wird. – Seite ansehen" className={"hc-text-link"} href="/cookies">Seite ansehen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
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
      <section className={"hc-section hc-finish hc-container is-plain"} aria-labelledby="finish-title-tk-legal">
        <div className={"hc-finish-heading"}>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="finish-title-tk-legal">Weiterführende Seiten</h2>
        </div>
        <div className={"hc-finish-next"}>
          <div className={"hc-finish-actions"}>
            <a className={"hc-finish-primary"} href="/teileklar">Zur Fahrzeugwelt von TEILEKLAR<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <a className={"hc-text-link"} href="/cookies">Optionale Funktionen verwalten<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a>
            <button type="button" className={"hc-text-link"}>Ihr Anliegen mit TEILEKLAR klären<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </section>
    </div>
  </main>
  <footer className={"site-footer structured-footer footer-refined"}>
    <div className={"footer-inner"}>
      <div className={"footer-invitation"}>
        <div>
          <h2>Lassen Sie uns über Ihr Vorhaben sprechen.</h2>
          <p>Erzählen Sie uns, was Sie verändern möchten. Wir klären gemeinsam den passenden nächsten Schritt.</p>
        </div>
        <a className={"nexify-control primary-button "} data-variant="primary" href="/kontakt">Projekt besprechen<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg></a>
      </div>
      <div className={"footer-main"}>
        <div className={"footer-brand-block"}>
          <a aria-label="Zur Startseite" className={"brand"} href="/teileklar">
            <span className={"nx-logo"} data-groesse="s">
              <span className={"nx-logo-wort"}>
                <span className={"nx-logo-name"}>TEILE<span className={"nx-logo-x"}>KLAR</span></span>
                <span className={"nx-logo-claim"}>Chat it. Automate it.</span>
              </span>
            </span>
          </a>
          <p>Teile, Fahrzeugfragen und Werkstattkontakte. Beschreiben Sie, was Sie benötigen.</p>
          <a className={"nexify-control  footer-contact"} data-variant="text" href="/kontakt">Anliegen beschreiben <span aria-hidden="true">→</span></a>
        </div>
        <div className={"footer-link-groups "}>
          <nav aria-label={"Produkte & Arbeitsbereiche"}>
            <h2>Produkte &amp; Arbeitsbereiche</h2>
            <a href="/teileklar">TEILEKLAR</a>
            <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
            <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.</a>
            <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
            <a href="/teileklar/partner-werden">Partner werden</a>
            <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
          </nav>
          <nav aria-label={"Leistungen & Zusammenarbeit"}>
            <h2>Leistungen &amp; Zusammenarbeit</h2>
            <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
            <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
            <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
          </nav>
          <nav aria-label="NeXify AI">
            <h2>NeXify AI</h2>
            <a href="/unternehmen">Über NeXify</a>
            <a href="/kontakt">Kontakt</a>
            <a href="/anmelden">Anmelden</a>
            <a href="/registrieren">Registrieren</a>
          </nav>
          <nav aria-label="Rechtliches">
            <h2>Rechtliches</h2>
            <a href="/teileklar/rechtliches" aria-current="page">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
            <a href="/ki-hinweise">KI-Hinweise</a>
            <a href="/barrierefreiheit">Barrierefreiheit</a>
            <a href="/cookies">Datenschutzeinstellungen</a>
          </nav>
        </div>
      </div>
      <div className={"footer-bottom"}>
        <span className={"footer-claim"}>TEILEKLAR — Na KLAR! <span aria-hidden="true">·</span> Teile · Fahrzeugzuordnung · Werkstatt · Partnerschaft</span>
        <a className={"footer-crosslink"} href="/">NeXify AI <span aria-hidden="true">→</span></a>
        <details className={"footer-overview"}>
          <summary aria-expanded="false" aria-controls="_r_3_">
            <span>Seitenübersicht</span>
            <span className={"footer-overview-marker"} aria-hidden="true">+</span>
          </summary>
          <div className={"footer-overview-panel"} id="_r_3_">
            <p className={"footer-overview-hint"}>Alle Seiten dieses Bereichs, nach Themen geordnet</p>
            <nav aria-label="Seitenübersicht" className={"footer-overview-columns"}>
              <div className={"footer-overview-group"}>
                <h3>TEILEKLAR</h3>
                <a href="/teileklar">TEILEKLAR. Für Auto und Motorrad.</a>
                <a href="/teileklar/suche">Teil, Marke oder Nummer suchen.</a>
                <a href="/teileklar/kategorien">Alle Kategorien auf einen Blick.</a>
                <a href="/teileklar/warenkorb">Ihr Warenkorb. Alles im Blick.</a>
                <a href="/teileklar/kasse">Zur Kasse. Schritt für Schritt.</a>
                <a href="/teileklar/fahrzeug-und-passung">Passt das Teil? So prüfen Sie es.</a>
                <a href="/teileklar/termine">Termin? Direkt bei der Werkstatt.</a>
                <a href="/teileklar/gutscheine">Gutscheine gibt es noch nicht.</a>
                <a href="/teileklar/partner-werden">Werkstatt? Werden Sie Partner.</a>
                <a href="/teileklar/werkstatt">Eine Werkstatt in Ihrer Nähe.</a>
                <a href="/teileklar/shop">Auto &amp; Motorrad. Klar ausgewählt.</a>
                <a href="/teileklar/reifenrechner">Reifengrößen vergleichen.</a>
                <a href="/teileklar/batterie-berater">Die passende Batterie finden.</a>
              </div>
              <div className={"footer-overview-group"}>
                <h3>Rechtliches</h3>
                <a href="/teileklar/rechtliches" aria-current="page">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</a>
              </div>
            </nav>
          </div>
        </details>
      </div>
      <div className={"footer-legal"}>
        <nav className={"footer-legal-direct"} aria-label="Rechtsdokumente">
          <a href="/teileklar/rechtliches" aria-current="page">TEILEKLAR: Anbieterinformationen und Datenschutz</a>
        </nav>
        <details className={"footer-legal-details"}>
          <summary aria-expanded="false" aria-controls="_r_2_">Hinweise zu den Rechtsdokumenten</summary>
          <div id="_r_2_">
            <p>Die Rechtsinformationen für TEILEKLAR sind direkt erreichbar. Vollständige Angaben zum Anbieter, Datenschutz und Verbraucherrechten im Shop stehen noch zur Prüfung und Freigabe.</p>
            <p>Eine öffentliche Übersicht der Drittanbieter-Komponenten und ihrer Lizenzen ist noch nicht verfügbar.</p>
          </div>
        </details>
      </div>
    </div>
    <div className={"footer-utilities"}>
      <details className={"diagnostic-consent"}>
        <summary>Fehlerdiagnose-Einstellungen</summary>
        <div className={"diagnostic-consent-content"}>
          <p>Optional: Fehlerdiagnose mit PostHog. Mit Ihrer Zustimmung können technische Fehlerstellen, Fehlertyp und App-Version übermittelt werden. Eingaben und Fehlertexte werden entfernt. Keine Marketing- oder Klickerfassung und keine Sitzungsaufzeichnung.</p>
          <p>Bei einer Übertragung erhält der Dienst Netzwerkdaten wie Ihre IP-Adresse.</p>
          <p>Ihre Auswahl gilt nur bis zum Neuladen und wird nicht gespeichert. Ablehnen schränkt die Seitenfunktionen nicht ein.</p>
          <p className={"diagnostic-consent-status"} role="status" aria-live="polite">Aus · noch keine Auswahl</p>
          <div className={"diagnostic-consent-actions"} role="group" aria-label="Fehlerdiagnose-Einstellungen">
            <button type="button" className={"\x6futline-button"}>Zulassen</button>
            <button type="button" className={"\x6futline-button"}>Ablehnen</button>
          </div>
          <a href="/datenschutz">Datenschutzhinweise</a>
        </div>
      </details>
    </div>
  </footer>
</div>
<aside id="aifly-panel" className={"aifly-panel"} aria-label="AIFly ORACLE" style={{ "--chat-viewport-height": "864px", "--chat-viewport-top": "0px" } as CSSProperties}>
  <div className={"chat-resize-handle"} role="separator" aria-orientation="vertical" aria-label="Chatbreite anpassen" tabIndex={0} aria-valuemin={360} aria-valuemax={952} aria-valuenow={360} />
  <div className={"panel-heading"}>
    <div className={"panel-heading-copy"}>
      <div className={"panel-identity"}>
        <span className={"aifly-symbol oracle-companion"} data-state="idle" aria-hidden="true">
          <img alt="" width="34" height="34" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
        </span>
        <h2 className={"nx-oracle-name panel-brandline"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></h2>
      </div>
    </div>
    <button aria-label="Beratung einklappen" title="Beratung einklappen" type="button" className={"nexify-control icon-button panel-minimize"} data-variant="icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
  <div className={"sdk-orientation-view"}>
    <section className={"public-orientation"} aria-label="Willkommen bei TEILEKLAR" style={{ "--ca-fuss": "0px" } as CSSProperties}>
      <div className={"orientation-content"}>
        <div className={"orientation-intro"}>
          <div className={"orientation-host"}>
            <span className={"orientation-host-figure"} aria-hidden="true">
              <img alt="" width="512" height="512" decoding="async" src="/site-assets/9176c58a16ff634a.png" />
            </span>
            <p className={"nx-oracle-name orientation-host-name"}><strong>AIFly ORACLE</strong> <span className={"panel-identity-subtitle"}>with NeXify AI Intelligence by NeXify</span></p>
          </div>
          <h3>Willkommen bei TEILEKLAR</h3>
          <p className={"orientation-intro-body"}>Willkommen bei TEILEKLAR. Worum geht es bei Ihnen: ein Ersatzteil, ein Werkstattbesuch oder eine Zusammenarbeit? Bei einer Teile- oder Werkstattfrage nennen Sie bitte Ihr Fahrzeug und beschreiben Sie Ihr Anliegen. Eine vorhandene Teilenummer hilft bei der Zuordnung.</p>
        </div>
        <div className={"orientation-history"} role="log" aria-live="polite" aria-relevant="additions text" aria-busy="false" />
        <div className={"orientation-starters"} role="group" aria-label="Ihr Fahrzeug-/Teile-Anliegen">
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">01</span>
            <span className={"orientation-starter-copy"}>
              <strong>Fahrzeug &amp; Teil</strong>
              <small>Mit Fahrzeugdaten und vorhandenem Hinweis zum passenden Teil starten.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">02</span>
            <span className={"orientation-starter-copy"}>
              <strong>Werkstatt-Anfrage</strong>
              <small>Leistung, Fahrzeug und Standort für die Werkstattsuche einordnen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button type="button" className={"orientation-starter"} aria-pressed="false">
            <span className={"orientation-starter-index"} aria-hidden="true">03</span>
            <span className={"orientation-starter-copy"}>
              <strong>Zusammenarbeit</strong>
              <small>Werkstattprofil, Zusammenarbeit und gemeinsamen Serviceweg besprechen.</small>
            </span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
        <ol className={"orientation-path orientation-path-quiet"} aria-label="Vom Anliegen zur passenden Anlaufstelle.">
          <li data-state="open"><small>01</small>Fahrzeug nennen</li>
          <li data-state="open"><small>02</small>Anliegen eingrenzen</li>
          <li data-state="open"><small>03</small>Nächsten Weg wählen</li>
        </ol>
      </div>
      <form className={"orientation-composer"}>
        <label htmlFor="orientation-message">Ihr Fahrzeug-/Teile-Anliegen</label>
        <textarea id="orientation-message" maxLength={1000} rows={1} placeholder="Ihr Fahrzeug-/Teile-Anliegen" aria-describedby="orientation-keys" required style={{ height: "0px" }} {...({ enterkeyhint: "send" } as any)} />
        <span id="orientation-keys" className={"visually-hidden"}>Eingabetaste sendet, Umschalt und Eingabetaste beginnt eine neue Zeile.</span>
        <div className={"orientation-composer-actions"}>
          <button className={"primary-button"} disabled aria-label="Nachricht senden">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}>
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      <p className={"connection-note orientation-status"} role="status" />
      <p className={"connection-note"}>Bitte keine Passwörter oder Zahlungsdaten eingeben. <a href="/teileklar/rechtliches" aria-current="page">Datenschutz</a></p>
    </section>
  </div>
</aside>
</Fragment>}
</>);
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <div id="atelier" className={"workspace-shell site-teileklar is-closed"} data-site-import-carousel-root="0">{carouselContent0}</div>

    </>
  );
}
