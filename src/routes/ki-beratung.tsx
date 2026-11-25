import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { SiteFilm } from "../components/SiteFilm";
import { BeratungForm } from "../components/forms/BeratungForm";
import capturedCSS from "../styles/pages/leistungen.css?url";
import beratungCSS from "../styles/pages/ki-beratung.css?url";
import { pageHead } from "@/lib/seo";
import {
  BERATUNG_ABLAUF,
  BERATUNG_BEREICHE,
  BERATUNG_ERGEBNISSE,
  BERATUNG_FAQS,
  BERATUNG_PREIS_NETTO,
  BERATUNG_TAGESTEILE,
  BERATUNG_TAG_STUNDEN,
} from "@/lib/beratung";

export const Route = createFileRoute("/ki-beratung")({
  head: () =>
    pageHead("/ki-beratung", {
      links: [
        { rel: "stylesheet", href: capturedCSS },
        { rel: "stylesheet", href: beratungCSS },
      ],
    }),
  staticData: {
    importedDocument: {
      html: {
        lang: "de",
        "data-theme": "dark",
        style: { colorScheme: "dark" } as import("react").CSSProperties,
      },
      body: {},
    },
  },
  component: Index,
});

const springe = [
  ["#leistungen", "Beratungsleistungen"],
  ["#ablauf", "Ablauf"],
  ["#preis", "Preis"],
  ["#fragen", "Fragen"],
  ["#anfrage", "Anfrage"],
] as const;

function Index() {
  return (
    <NexifyShell>
      <div className={"home-concept page-concept page-services layout-service context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-beratung">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">KI-Beratung</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>KI-Beratung
              </span>
              <h1 id="page-title-beratung">
                KI-Beratung: Ihre KI-Strategie beginnt nicht mit Software. Sondern mit den richtigen
                Fragen.
              </h1>
              <p className={"identity-body"}>
                In der KI-Beratung analysieren wir gemeinsam Ihre Unternehmensprozesse,
                identifizieren sinnvolle Einsatzmöglichkeiten künstlicher Intelligenz und entwickeln
                eine Strategie, die zu Ihrem Unternehmen passt.
              </p>
              <p className={"kb-preiszeile"}>
                <strong>{BERATUNG_PREIS_NETTO} €</strong> netto pro Beratungstag
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="#anfrage"
                >
                  <span>Beratungstag anfragen</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="#leistungen"
                >
                  Beratungsleistungen entdecken
                </a>
              </div>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <SiteFilm film="studio" eager />
              </figure>
            </div>
          </div>
        </section>

        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          {springe.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
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
                focusable="false"
              >
                <path d="M12 4v16M5 13l7 7 7-7" />
              </svg>
            </a>
          ))}
        </nav>

        <section className={"hc-intro hc-container pc-section"} aria-labelledby="kb-problem">
          <div className={"hc-section-heading"}>
            <span className={"hc-kicker"}>Ausgangslage</span>
            <h2 id="kb-problem">Sie möchten KI einsetzen. Aber wo anfangen?</h2>
            <p>
              Viele Unternehmen stehen vor der Frage, welche KI-Lösungen tatsächlich sinnvoll sind,
              welche Prozesse automatisiert werden können und wie sich Investitionen wirtschaftlich
              gestalten lassen. Wir helfen Ihnen, diese Fragen systematisch zu beantworten und
              fundierte Entscheidungen zu treffen.
            </p>
          </div>
        </section>

        <section
          className={"hc-section hc-container hc-service-story"}
          id="leistungen"
          aria-labelledby="kb-leistungen"
        >
          <div className={"hc-section-heading"}>
            <span className={"hc-kicker"}>Beratungsbereiche</span>
            <h2 id="kb-leistungen">Von der ersten Idee bis zur konkreten KI-Strategie.</h2>
            <p>
              Acht Beratungsbereiche, ein Tagessatz. Sie wählen, worauf wir den Tag konzentrieren –
              meist sind es zwei oder drei Bereiche, die zusammengehören.
            </p>
          </div>
          <ol className={"hc-service-list"}>
            {BERATUNG_BEREICHE.map((b, i) => (
              <li className={"hc-service-detail"} key={b.titel}>
                <span className={"hc-caption"} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={"hc-service-name"}>{b.titel}</h3>
                  <p className={"hc-service-body"}>{b.nutzen}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={"hc-section hc-container"} aria-labelledby="kb-zielgruppen">
          <div className={"hc-section-heading"}>
            <span className={"hc-kicker"}>Für wen</span>
            <h2 id="kb-zielgruppen">Beratung, die dort ansetzt, wo Ihr Unternehmen heute steht.</h2>
          </div>
          <div className={"hc-visibility-grid"}>
            <article>
              <h3 className={"hc-service-name"}>Sie fangen an</h3>
              <p className={"hc-service-body"}>
                KI ist ein Thema, aber noch nicht im Alltag. Wir klären zuerst, welche Aufgaben
                überhaupt infrage kommen – und welche besser bleiben, wie sie sind.
              </p>
            </article>
            <article>
              <h3 className={"hc-service-name"}>Sie nutzen schon Werkzeuge</h3>
              <p className={"hc-service-body"}>
                Einzelne Mitarbeitende arbeiten mit KI-Assistenten, ohne gemeinsame Regel. Wir
                bringen das zusammen, prüfen Nutzen und schließen die Lücken bei Daten und Rechten.
              </p>
            </article>
            <article>
              <h3 className={"hc-service-name"}>Sie wollen integrieren</h3>
              <p className={"hc-service-body"}>
                Ein konkreter Prozess soll angebunden werden. Wir prüfen Voraussetzungen, Aufwand und
                Risiken, bevor Sie in eine Lösung investieren.
              </p>
            </article>
          </div>
          <p className={"hc-service-body"}>
            Angesprochen sind Unternehmer und Geschäftsführungen, Fachabteilungen, kleine und
            mittelständische Unternehmen sowie Verantwortliche für Digitalisierung.
          </p>
        </section>

        <section className={"hc-section hc-container"} id="ablauf" aria-labelledby="kb-ablauf">
          <div className={"hc-section-heading"}>
            <span className={"hc-kicker"}>Ablauf</span>
            <h2 id="kb-ablauf">Gemeinsam von der Analyse zur Handlungsempfehlung.</h2>
          </div>
          <ol className={"hc-service-list"}>
            {BERATUNG_ABLAUF.map((s, i) => (
              <li className={"hc-service-detail"} key={s.titel}>
                <span className={"hc-caption"} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={"hc-service-name"}>{s.titel}</h3>
                  <p className={"hc-service-body"}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={"hc-service-detail pc-module"}>
            <span className={"hc-caption"}>
              Der Beratungstag: {BERATUNG_TAG_STUNDEN} Stunden, klar geteilt
            </span>
            <ul className={"hc-service-list"}>
              {BERATUNG_TAGESTEILE.map((te) => (
                <li className={"hc-service-detail"} key={te.titel}>
                  <span className={"hc-caption"}>{te.minuten} Minuten</span>
                  <div>
                    <h3 className={"hc-service-name"}>{te.titel}</h3>
                    <p className={"hc-service-body"}>{te.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={"hc-service-body"}>
              Umfang und Tiefe hängen von der Komplexität des untersuchten Bereichs ab. Bei sehr
              breiten Vorhaben empfehlen wir zwei Tage statt einen zu überladen.
            </p>
          </div>
        </section>

        <section
          className={"hc-section hc-container hc-service-story"}
          aria-labelledby="kb-ergebnisse"
        >
          <div className={"hc-service-layout"}>
            <div>
              <span className={"hc-kicker"}>Ergebnis</span>
              <h2 id="kb-ergebnisse">
                Sie erhalten Klarheit, Orientierung und einen konkreten Fahrplan.
              </h2>
              <p className={"hc-service-body"}>
                Am Ende des Tages steht keine Präsentation, die im Ordner verschwindet, sondern eine
                Dokumentation, mit der Sie weiterarbeiten können – auch ohne uns.
              </p>
            </div>
            <ul className={"hc-service-list"}>
              {BERATUNG_ERGEBNISSE.map((e) => (
                <li className={"hc-service-detail"} key={e}>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={"hc-section hc-container"} id="preis" aria-labelledby="kb-preis">
          <div className={"hc-service-layout"}>
            <div>
              <span className={"hc-kicker"}>Preis</span>
              <h2 id="kb-preis">Professionelle Beratung. Transparent kalkuliert.</h2>
              <p className={"hc-service-body"}>
                Ein Tag, ein Preis, keine Staffelung nach Gesprächsdauer. Der Beratungstag ist ein
                eigenständiges Angebot und keine Vorstufe zu einem Entwicklungsauftrag.
              </p>
              <ul className={"hc-service-list"}>
                <li className={"hc-service-detail"}>
                  {BERATUNG_TAG_STUNDEN} Stunden einschließlich Vorbereitung, Arbeitszeit und
                  Dokumentation
                </li>
                <li className={"hc-service-detail"}>
                  Ergebnisdokumentation mit priorisierten Empfehlungen
                </li>
                <li className={"hc-service-detail"}>
                  Weitere Beratungstage, Schulungen und Coaching separat zum selben Tagessatz
                </li>
                <li className={"hc-service-detail"}>
                  Online oder vor Ort; Reiseaufwand wird vor der Beauftragung abgestimmt
                </li>
                <li className={"hc-service-detail"}>
                  Kein Abonnement, keine automatische Verlängerung, keine Umsetzungspflicht
                </li>
              </ul>
            </div>
            <div className={"hc-service-detail pc-module"}>
              <span className={"hc-caption"}>Beratungstag</span>
              <div className={"hc-costs"}>{BERATUNG_PREIS_NETTO} € netto</div>
              <p className={"hc-service-body"}>
                zuzüglich gegebenenfalls anwendbarer Umsatzsteuer. Das Angebot richtet sich an
                Geschäftskunden. Zusätzliche Tage und Vor-Ort-Termine werden vor der Beauftragung
                ausdrücklich vereinbart.
              </p>
              <a className={"nexify-control primary-button"} data-variant="primary" href="#anfrage">
                <span>Beratungstag anfragen</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className={"hc-section hc-container"} id="fragen" aria-labelledby="kb-fragen">
          <div className={"hc-section-heading"}>
            <h2 id="kb-fragen">Häufige Fragen</h2>
          </div>
          {BERATUNG_FAQS.map((f) => (
            <details className={"nx-faq"} key={f.frage}>
              <summary>
                <span>{f.frage}</span>
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
              <p>{f.antwort}</p>
            </details>
          ))}
        </section>

        <section
          className={"hc-section hc-container"}
          id="anfrage"
          aria-labelledby="kb-anfrage-titel"
        >
          <div className={"hc-service-layout"}>
            <div>
              <h2 id="kb-anfrage-titel">Ihre Beratungsanfrage</h2>
              <p>
                Die Anfrage ist unverbindlich. Wir prüfen Ihre Angaben, stimmen den passenden
                Beratungsbereich und einen Termin persönlich mit Ihnen ab – erst danach entsteht ein
                Angebot.
              </p>
              <p className={"kb-klein"}>
                Vertrauliche Prozessdaten gehören nicht in dieses Formular. Details klären wir im
                Gespräch.
              </p>
            </div>
            <BeratungForm privacyHref="/datenschutz" />
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}
