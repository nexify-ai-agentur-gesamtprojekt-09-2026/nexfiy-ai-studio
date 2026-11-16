import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { GuideNavigation } from "@/components/site/GuideNavigation";
import capturedCSS from "../styles/pages/teileklar.rechtliches.css?url";

export const Route = createFileRoute("/teileklar_/rechtliches")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "TEILEKLAR. Bedingungen mit eindeutiger Zuordnung. · TEILEKLAR.shop" },
      {
        name: "description",
        content:
          "Hinweise zu TEILEKLAR-Anfragen, Fahrzeugprüfung und Anbieterzuordnung. Kein Onlinekauf; importierte Kauftexte sind nicht freigegeben.",
      },
      {
        property: "og:title",
        content: "TEILEKLAR. Bedingungen mit eindeutiger Zuordnung. · TEILEKLAR.shop",
      },
      {
        property: "og:description",
        content:
          "Hinweise zu TEILEKLAR-Anfragen, Fahrzeugprüfung und Anbieterzuordnung. Kein Onlinekauf; importierte Kauftexte sind nicht freigegeben.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: {
    importedDocument: {
      html: { lang: "de", style: { colorScheme: "dark" } as import("react").CSSProperties },
      body: {},
    },
  },
  component: Index,
});

function Index() {
  return (
    <NexifyShell brand="teileklar">
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
                    <span aria-current="page">
                      TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.
                    </span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                TEILEKLAR<span aria-hidden="true"> / </span>Informationen und Recht
              </span>
              <h1 id="page-title-tk-legal">TEILEKLAR. Bedingungen mit eindeutiger Zuordnung.</h1>
              <p className={"identity-body"}>
                Handel und Werkstattservice brauchen eigene Anbieter-, Datenschutz- und
                Kaufunterlagen. Deren vollständige Freigabe steht aus; diese Übersicht bestätigt
                keine bereits geltenden Kaufbedingungen.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/teileklar"
                >
                  <span>Zur Fahrzeugwelt von TEILEKLAR</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/cookies"
                >
                  Optionale Funktionen verwalten
                </a>
              </div>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-tk-legal-ueberblick-0">
            Angebot und Vertragspartner gehören zusammen
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              {...({ focusable: "false" } as any)}
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </a>
          <a href="#content-tk-legal-anbieter-und-geltung-1">
            Die Unternehmenszuordnung offen ausweisen
            <svg
              className={"hc-arrow"}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              {...({ focusable: "false" } as any)}
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </a>
        </nav>
        <div className={"pc-sections"}>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-tk-legal-ueberblick-0"
            tabIndex={-1}
            aria-labelledby="content-tk-legal-ueberblick-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-tk-legal-ueberblick-0-title">
                Angebot und Vertragspartner gehören zusammen
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Vor einem Kauf müssen Anbieter, Artikel, Markt und Bedingungen feststehen. Widerruf,
                Versand, Zahlung und Service werden dem konkreten Angebot zugeordnet, nicht aus
                einer allgemeinen Markenbeschreibung abgeleitet.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>
                  AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt
                </span>
                <a className={"hc-text-link"} href="/impressum">
                  NeXify AI FACTORY – Unternehmensangaben
                  <svg
                    className={"hc-arrow"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    {...({ focusable: "false" } as any)}
                  >
                    <path d="M4 12h16M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-tk-legal-anbieter-und-geltung-1"
            tabIndex={-1}
            aria-labelledby="content-tk-legal-anbieter-und-geltung-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-tk-legal-anbieter-und-geltung-1-title">
                Die Unternehmenszuordnung offen ausweisen
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                TEILEKLAR bleibt ein eigenständiger Handels- und Werkstattbereich im
                NeXify-Markenauftritt. Historische Einzelunternehmensdaten werden nicht auf NeXify
                AI FACTORY übertragen. Die konkrete Anbieterzuordnung muss vor einem Kauf bestätigt
                sein.
              </p>
              <h3>Was dieser Auftritt tatsächlich ermöglicht</h3>
              <p>
                Ein Artikelkatalog mit Preisangaben, Themeninformationen, ein nominaler
                Reifenvergleich und eine Teileanfrage sind vorhanden. Bestellung, Onlinezahlung und
                bestätigte Werkstattbuchung sind nicht angeschlossen; Katalogpreise sind keine
                Bestellbestätigung. Es werden keine aktuellen Versand-, Kauf- oder
                Rückgabekonditionen aus diesen Funktionen abgeleitet.
              </p>
              <h3>Fahrzeugangaben und Terminwünsche</h3>
              <p>
                Fahrzeugdaten und Teilenummern helfen bei einer Anfrage, bestätigen aber keine
                Passung. Der Reifenrechner vergleicht rechnerische Nennmaße und erteilt keine
                Zulassungs- oder Fahrzeugfreigabe. Ein versendeter Terminwunsch ist erst nach
                gesonderter Bestätigung ein vereinbarter Termin.
              </p>
              <nav
                className="legal-scope-links"
                aria-label="Hinweise zu den vorhandenen Funktionen"
              >
                <a href="/teileklar/fahrzeug-und-passung">Fahrzeugprüfung</a>
                <a href="/teileklar/termine">Terminanfrage</a>
                <a href="/datenschutz">Datenhinweise zu Anfragen</a>
              </nav>
            </div>
          </section>
        </div>
        <section
          className={"hc-container pc-guide"}
          aria-label="TEILEKLAR · Fahrzeug, Werkstatt und Hinweise"
        >
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>
                  TEILEKLAR · Fahrzeug, Werkstatt und Hinweise
                </strong>
              </span>
              <svg
                className={"hc-disclosure-icon"}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14m-7-7v14" />
              </svg>
            </summary>
            <div className={"hc-service-body"}>
              <p>
                Fahrzeugangaben, Werkstattsuche und Gutschein-Hinweise bleiben getrennte Themen.
              </p>
              <GuideNavigation brand="teileklar" />
            </div>
          </details>
        </section>
        <section className={"hc-container pc-supplement"}>
          <div className={"tk-legal"}>
            <p className="tk-note" role="note">
              Die nachfolgenden Texte stammen aus dem importierten Auftritt und sind nicht als
              aktuelle Kaufbedingungen freigegeben. Anbieter-, Länder-, Adress- und Zahlungsangaben
              müssen vor einem Verkauf geprüft werden. Dieser Auftritt bietet keinen Onlinekauf.
            </p>
            <details className="legal-archive">
              <summary>Importierte Kauftexte · nicht freigegeben</summary>
              <section id="agb" className={"tk-legal-doc"} aria-labelledby="agb-title">
                <h2 id="agb-title">Allgemeine Geschäftsbedingungen</h2>
                <p className={"tk-meta"}>
                  Allgemeine Geschäftsbedingungen für den Verkauf über TEILEKLAR.
                </p>
                <div className={"tk-legal-section"}>
                  <h3>1. Geltungsbereich</h3>
                  <p>
                    Diese Bedingungen gelten für alle Bestellungen über teileklar.shop in den
                    Marktversionen Deutschland, Österreich, Schweiz, Niederlande, Belgien und
                    Luxemburg. Abweichende Bedingungen des Kunden gelten nur bei schriftlicher
                    Zustimmung.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>2. Vertragsschluss</h3>
                  <p>
                    Die Darstellung der Artikel ist kein bindendes Angebot. Der Vertrag kommt mit
                    der Annahmeerklärung bzw. mit dem Versand der Ware zustande. Artikel mit dem
                    Hinweis „Eine Frage offen“ werden erst nach Klärung der offenen Angabe
                    freigegeben.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>3. Preise und Zahlung</h3>
                  <p>
                    Preise gelten in der Währung der jeweiligen Marktversion einschließlich der dort
                    ausgewiesenen Steuer. Versandkosten, Pfand auf Starterbatterien und Zuschläge
                    für Speditionsware werden vor dem Kauf im Warenkorb ausgewiesen. Zahlungsarten
                    richten sich nach dem Markt.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>4. Lieferung</h3>
                  <p>
                    Angegebene Lieferzeiten sind voraussichtliche Zeiträume. Teilsendungen werden
                    vor dem Kauf angekündigt. Für die Schweiz sind Zoll- und Steuerabwicklung im
                    Preis enthalten, sofern ausgewiesen.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>5. Passung und Prüfpflicht</h3>
                  <p>
                    Angaben zur Passung beruhen auf Katalog- und Herstellerdaten mit angegebenem
                    Stand. Der Kunde prüft vor dem Einbau die Übereinstimmung mit dem konkreten
                    Fahrzeug. Sicherheitsrelevante Arbeiten sind von einer fachkundigen Werkstatt
                    auszuführen.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>6. Rückgabe und Gewährleistung</h3>
                  <p>
                    Es gilt die gesetzliche Gewährleistung. Rückgaben erfolgen nach den Regeln der
                    jeweiligen Marktversion; für Verbraucher gilt das gesetzliche Widerrufsrecht von
                    14 Tagen. Für Starterbatterien besteht ein Rücknahmeanspruch, das Pfand wird bei
                    Rückgabe erstattet.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>7. Eigentumsvorbehalt</h3>
                  <p>Die Ware bleibt bis zur vollständigen Bezahlung Eigentum des Anbieters.</p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>8. Haftung</h3>
                  <p>
                    Die Haftung für leichte Fahrlässigkeit ist auf vorhersehbare, vertragstypische
                    Schäden begrenzt. Unberührt bleiben Haftung für Vorsatz, grobe Fahrlässigkeit,
                    Personenschäden und Ansprüche nach Produkthaftungsrecht.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>9. Recht und Gerichtsstand</h3>
                  <p>
                    Es gilt das Recht der Niederlande; die Anwendung des CISG ist ausgeschlossen.
                    Gerichtsstand ist Venlo, soweit gesetzlich zulässig. Zwingende
                    Verbrauchergerichtsstände und Verbraucherschutzvorschriften des Wohnsitzstaates
                    bleiben unberührt.
                  </p>
                </div>
              </section>
              <section id="widerruf" className={"tk-legal-doc"} aria-labelledby="widerruf-title">
                <h2 id="widerruf-title">Widerrufsbelehrung</h2>
                <p className={"tk-meta"}>Widerrufsbelehrung für Verbraucher.</p>
                <div className={"tk-legal-section"}>
                  <h3>Widerrufsrecht</h3>
                  <p>
                    Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe von Gründen den Vertrag
                    zu widerrufen. Die Frist beginnt an dem Tag, an dem die Ware in Besitz genommen
                    wurde. Bei Teilsendungen beginnt sie mit Erhalt der letzten Teilsendung.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>Ausübung</h3>
                  <p>
                    Zum Widerruf genügt eine eindeutige Erklärung per E-Mail an mail@teileklar.shop
                    oder per Post an TEILEKLAR, Graaf van Loonstraat 1E, 5921 JA Venlo, Niederlande.
                    Die Verwendung des Muster-Formulars ist möglich, aber nicht vorgeschrieben.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>Folgen</h3>
                  <p>
                    Erhaltene Zahlungen werden unverzüglich, spätestens binnen 14 Tagen nach Zugang
                    des Widerrufs zurückgezahlt, mit demselben Zahlungsmittel wie bei der Zahlung.
                    Die Rücksendekosten trägt der Anbieter, sofern nicht anders angegeben; die Ware
                    ist unverzüglich, spätestens binnen 14 Tagen zurückzusenden.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>Wertersatz</h3>
                  <p>
                    Für einen Wertverlust ist Ersatz zu leisten, wenn dieser auf einen Umgang
                    zurückgeht, der zur Prüfung der Ware nicht notwendig war – insbesondere bei
                    bereits eingebauten oder eingelaufenen Bremsteilen und bei geöffneten
                    Ölbehältnissen.
                  </p>
                </div>
                <div className={"tk-legal-section"}>
                  <h3>Ausnahmen</h3>
                  <p>
                    Kein Widerrufsrecht besteht bei Waren, die nach Kundenspezifikation angefertigt
                    wurden, sowie bei versiegelten Waren, die aus Gesundheits- oder Hygienegründen
                    nicht zur Rückgabe geeignet sind, wenn die Versiegelung entfernt wurde.
                  </p>
                </div>
                <div id="widerrufsformular" className={"tk-legal-section"}>
                  <h3>Muster-Widerrufsformular</h3>
                  <p>
                    An TEILEKLAR, Graaf van Loonstraat 1E, 5921 JA Venlo, Niederlande,
                    mail@teileklar.shop:
                  </p>
                  <p>
                    Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der
                    folgenden Waren: …
                  </p>
                  <p>Bestellt am … / erhalten am …</p>
                  <p>Name und Anschrift des Verbrauchers …</p>
                  <p>Datum, Unterschrift (bei Mitteilung auf Papier)</p>
                </div>
              </section>
            </details>
          </div>
        </section>
        <section
          className={"hc-section hc-container hc-process pc-related"}
          aria-labelledby="related-title-tk-legal"
        >
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
                <a href="/teileklar">
                  TEILEKLAR. Für Auto und Motorrad.
                  <svg
                    className={"hc-arrow"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    {...({ focusable: "false" } as any)}
                  >
                    <path d="M5 19 19 5M5 5h14v14" />
                  </svg>
                </a>
              </h3>
              <p>
                Katalog, Informationen zu Fahrzeug und Teilen sowie Teileanfragen. Bestellung und
                Bezahlung sind in diesem Auftritt noch nicht freigeschaltet.
              </p>
              <a
                aria-label="TEILEKLAR. Für Auto und Motorrad. – Seite ansehen"
                className={"hc-text-link"}
                href="/teileklar"
              >
                Seite ansehen
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <span className={"hc-kicker"}>NEXIFY AI</span>
              <h3>
                <a href="/cookies">
                  Sie wählen, was zusätzlich aktiv wird.
                  <svg
                    className={"hc-arrow"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    {...({ focusable: "false" } as any)}
                  >
                    <path d="M5 19 19 5M5 5h14v14" />
                  </svg>
                </a>
              </h3>
              <p>
                Notwendige Funktionen und optionale Messung haben unterschiedliche Aufgaben.
                Verständliche Einstellungen sollen vor optionaler Verarbeitung greifen. Die
                vollständige rechtliche Beschreibung wird noch geprüft.
              </p>
              <a
                aria-label="Sie wählen, was zusätzlich aktiv wird. – Seite ansehen"
                className={"hc-text-link"}
                href="/cookies"
              >
                Seite ansehen
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <span className={"hc-kicker"}>NEXIFY AI</span>
              <h3>
                <a href="/impressum">
                  Impressum · NeXify AI by NeXify
                  <svg
                    className={"hc-arrow"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    {...({ focusable: "false" } as any)}
                  >
                    <path d="M5 19 19 5M5 5h14v14" />
                  </svg>
                </a>
              </h3>
              <p>
                Anbieter dieser Website ist NeXify AI by NeXify, Inhaber Pascal Courbois, eine
                Eenmanszaak nach niederländischem Recht mit Anschrift in Venlo.
              </p>
              <a
                aria-label="Impressum · NeXify AI by NeXify – Seite ansehen"
                className={"hc-text-link"}
                href="/impressum"
              >
                Seite ansehen
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <span className={"hc-kicker"}>NEXIFY AI</span>
              <h3>
                <a href="/datenschutz">
                  Ihre Daten. Ein klarer Zweck.
                  <svg
                    className={"hc-arrow"}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    {...({ focusable: "false" } as any)}
                  >
                    <path d="M5 19 19 5M5 5h14v14" />
                  </svg>
                </a>
              </h3>
              <p>
                Vertrauen braucht nachvollziehbaren Umgang mit Informationen. Für Website, Anfragen
                und Arbeitsbereiche sind Zweck, Verantwortlichkeit und Aufbewahrung getrennt
                auszuweisen. Die vollständige Datenschutzerklärung ist noch in Prüfung.
              </p>
              <a
                aria-label="Ihre Daten. Ein klarer Zweck. – Seite ansehen"
                className={"hc-text-link"}
                href="/datenschutz"
              >
                Seite ansehen
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          </ol>
        </section>
        <section
          className={"hc-section hc-finish hc-container is-plain"}
          aria-labelledby="finish-title-tk-legal"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Weiterführende Seiten</span>
            <h2 id="finish-title-tk-legal">Weiterführende Seiten</h2>
          </div>
          <div className={"hc-finish-next"}>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/teileklar">
                Zur Fahrzeugwelt von TEILEKLAR
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
              <a className={"hc-text-link"} href="/cookies">
                Optionale Funktionen verwalten
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
              <button type="button" className={"hc-text-link"}>
                Ihr Anliegen mit TEILEKLAR klären
                <svg
                  className={"hc-arrow"}
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}
