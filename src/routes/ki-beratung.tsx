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
                Ihre KI-Strategie beginnt nicht mit Software. Sondern mit den richtigen Fragen.
              </h1>
              <p className={"identity-body"}>
                Gemeinsam analysieren wir Ihre Unternehmensprozesse, identifizieren sinnvolle
                Einsatzmöglichkeiten künstlicher Intelligenz und entwickeln eine Strategie, die zu
                Ihrem Unternehmen passt.
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

        <section className={"kb-abschnitt"} aria-labelledby="kb-problem">
          <div className={"hc-container kb-schmal"}>
            <h2 id="kb-problem">Sie möchten KI einsetzen. Aber wo anfangen?</h2>
            <p>
              Viele Unternehmen stehen vor der Frage, welche KI-Lösungen tatsächlich sinnvoll sind,
              welche Prozesse automatisiert werden können und wie sich Investitionen wirtschaftlich
              gestalten lassen. Wir helfen Ihnen, diese Fragen systematisch zu beantworten und
              fundierte Entscheidungen zu treffen.
            </p>
          </div>
        </section>

        <section className={"kb-abschnitt"} id="leistungen" aria-labelledby="kb-leistungen">
          <div className={"hc-container"}>
            <div className={"hc-section-heading"}>
              <h2 id="kb-leistungen">Von der ersten Idee bis zur konkreten KI-Strategie.</h2>
              <p>
                Acht Beratungsbereiche, ein Tagessatz. Sie wählen, worauf wir den Tag konzentrieren
                – meist sind es zwei oder drei Bereiche, die zusammengehören.
              </p>
            </div>
            <div className={"kb-raster"}>
              {BERATUNG_BEREICHE.map((b, i) => (
                <article className={"kb-karte"} key={b.titel}>
                  <span className={"kb-nummer"} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{b.titel}</h3>
                  <p>{b.nutzen}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={"kb-abschnitt"} aria-labelledby="kb-zielgruppen">
          <div className={"hc-container"}>
            <div className={"hc-section-heading"}>
              <h2 id="kb-zielgruppen">
                Beratung, die dort ansetzt, wo Ihr Unternehmen heute steht.
              </h2>
            </div>
            <div className={"kb-drei"}>
              <article className={"kb-karte"}>
                <h3>Sie fangen an</h3>
                <p>
                  KI ist ein Thema, aber noch nicht im Alltag. Wir klären zuerst, welche Aufgaben
                  überhaupt infrage kommen – und welche besser bleiben, wie sie sind.
                </p>
              </article>
              <article className={"kb-karte"}>
                <h3>Sie nutzen schon Werkzeuge</h3>
                <p>
                  Einzelne Mitarbeitende arbeiten mit KI-Assistenten, ohne gemeinsame Regel. Wir
                  bringen das zusammen, prüfen Nutzen und schließen die Lücken bei Daten und
                  Rechten.
                </p>
              </article>
              <article className={"kb-karte"}>
                <h3>Sie wollen integrieren</h3>
                <p>
                  Ein konkreter Prozess soll angebunden werden. Wir prüfen Voraussetzungen, Aufwand
                  und Risiken, bevor Sie in eine Lösung investieren.
                </p>
              </article>
            </div>
            <p className={"kb-hinweis"}>
              Angesprochen sind Unternehmer und Geschäftsführungen, Fachabteilungen, kleine und
              mittelständische Unternehmen sowie Verantwortliche für Digitalisierung.
            </p>
          </div>
        </section>

        <section className={"kb-abschnitt"} id="ablauf" aria-labelledby="kb-ablauf">
          <div className={"hc-container"}>
            <div className={"hc-section-heading"}>
              <h2 id="kb-ablauf">Gemeinsam von der Analyse zur Handlungsempfehlung.</h2>
            </div>
            <ol className={"kb-ablauf"}>
              {BERATUNG_ABLAUF.map((s, i) => (
                <li key={s.titel}>
                  <span className={"kb-nummer"} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{s.titel}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className={"kb-tag"}>
              <h3>Der Beratungstag: {BERATUNG_TAG_STUNDEN} Stunden, klar geteilt</h3>
              <ul>
                {BERATUNG_TAGESTEILE.map((t) => (
                  <li key={t.titel}>
                    <strong>{t.titel}</strong>
                    <span>{t.minuten} Minuten</span>
                    <p>{t.text}</p>
                  </li>
                ))}
              </ul>
              <p className={"kb-hinweis"}>
                Umfang und Tiefe hängen von der Komplexität des untersuchten Bereichs ab. Bei sehr
                breiten Vorhaben empfehlen wir zwei Tage statt einen zu überladen.
              </p>
            </div>
          </div>
        </section>

        <section className={"kb-abschnitt"} aria-labelledby="kb-ergebnisse">
          <div className={"hc-container kb-zwei"}>
            <div>
              <h2 id="kb-ergebnisse">
                Sie erhalten Klarheit, Orientierung und einen konkreten Fahrplan.
              </h2>
              <p>
                Am Ende des Tages steht keine Präsentation, die im Ordner verschwindet, sondern eine
                Dokumentation, mit der Sie weiterarbeiten können – auch ohne uns.
              </p>
            </div>
            <ul className={"kb-liste"}>
              {BERATUNG_ERGEBNISSE.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={"kb-abschnitt"} id="preis" aria-labelledby="kb-preis">
          <div className={"hc-container kb-preisblock"}>
            <div>
              <h2 id="kb-preis">Professionelle Beratung. Transparent kalkuliert.</h2>
              <p>
                Ein Tag, ein Preis, keine Staffelung nach Gesprächsdauer. Der Beratungstag ist ein
                eigenständiges Angebot und keine Vorstufe zu einem Entwicklungsauftrag.
              </p>
              <ul className={"kb-liste"}>
                <li>
                  {BERATUNG_TAG_STUNDEN} Stunden einschließlich Vorbereitung, Arbeitszeit und
                  Dokumentation
                </li>
                <li>Ergebnisdokumentation mit priorisierten Empfehlungen</li>
                <li>Weitere Beratungstage, Schulungen und Coaching separat zum selben Tagessatz</li>
                <li>Online oder vor Ort; Reiseaufwand wird vor der Beauftragung abgestimmt</li>
                <li>Kein Abonnement, keine automatische Verlängerung, keine Umsetzungspflicht</li>
              </ul>
            </div>
            <div className={"kb-preiskarte"}>
              <span className={"kb-kicker"}>Beratungstag</span>
              <p className={"kb-gross"}>
                {BERATUNG_PREIS_NETTO} €<span> netto</span>
              </p>
              <p className={"kb-klein"}>zuzüglich gegebenenfalls anwendbarer Umsatzsteuer</p>
              <p className={"kb-klein"}>
                Das Angebot richtet sich an Geschäftskunden. Zusätzliche Tage und Vor-Ort-Termine
                werden vor der Beauftragung ausdrücklich vereinbart.
              </p>
              <a className={"nexify-control primary-button"} data-variant="primary" href="#anfrage">
                <span>Beratungstag anfragen</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className={"kb-abschnitt"} id="fragen" aria-labelledby="kb-fragen">
          <div className={"hc-container kb-schmal"}>
            <h2 id="kb-fragen">Häufige Fragen</h2>
            {BERATUNG_FAQS.map((f) => (
              <details className={"kb-frage"} key={f.frage}>
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
          </div>
        </section>

        <section
          className={"kb-abschnitt kb-anfrage"}
          id="anfrage"
          aria-labelledby="kb-anfrage-titel"
        >
          <div className={"hc-container kb-zwei"}>
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
