import { SiteFilm } from "../components/SiteFilm";
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/captured.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead("/", {
      links: [
        { rel: "stylesheet", href: capturedCSS },
        {
          rel: "preload",
          as: "image",
          href: "/site-assets/05c51cdebbdd2aa6.webp",
          fetchPriority: "high",
        },
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

function Index() {
  useImportedLayout();
  return (
    <NexifyShell heroActionSelector=".identity-primary-link">
      {({ chatOpen, openChat }) => (
        <>
          <div className={"home-concept"} data-fx="on">
            <ImportedSectionEinGesprChEin onOpenChat={openChat} />
            <section className={"hc-intro hc-container is-in"} aria-labelledby="hc-intro-title">
              <div>
                <span className={"hc-kicker"}>Hier fängt die Arbeit an</span>
                <h2 id="hc-intro-title">Wo hakt es gerade?</h2>
              </div>
              <p>
                Eine Website, die Ihr Angebot nicht erklärt. Ein Vorgang, der jeden Tag Zeit kostet.
                Eine Idee ohne nächsten Schritt. Zeigen Sie uns die Stelle, an der es hakt.
              </p>
            </section>
            <ImportedNavWoHaktEsGerade />
            <ImportedSectionWasKNnenWir />
            <section
              id="zusammenarbeit"
              className={"hc-section hc-process hc-container"}
              aria-labelledby="hc-process-title"
            >
              <header
                className={"hc-section-heading is-in"}
                data-site-import-scroll-header={
                  '{"desktop":{"added":["is-in"],"removed":[],"threshold":2592}}'
                }
              >
                <div>
                  <span className={"hc-kicker"}>Zusammenarbeit</span>
                  <h2 id="hc-process-title">Mit Pascal am Tisch.</h2>
                </div>
                <p>
                  Sie sehen früh, welche Richtung entsteht, was enthalten ist und welche
                  Entscheidung als Nächstes ansteht. Vier Schritte führen vom Gespräch zur Übergabe.
                </p>
              </header>
              <figure className={"hc-plate hc-plate-process"}>
                <img
                  src="/site-assets/5c592a5dc791fcc3.webp"
                  srcSet="/site-assets/b4c1010258293e22.webp 800w, /site-assets/55ecd78d79c41c10.webp 1280w, /site-assets/5c592a5dc791fcc3.webp 1920w"
                  sizes="(max-width: 820px) 100vw, 80vw"
                  width="2000"
                  height="1125"
                  alt="Markeninszenierung: Pascal bespricht gedruckte Entwürfe und Materialmuster mit einem Gesprächspartner am Tisch"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <ol>
                <li className={"is-in"}>
                  <h3>Wir verstehen, was Sie erreichen möchten.</h3>
                  <p>
                    Wir sprechen über Ihr Angebot, Ihre Kunden, die bisherige Lösung und den
                    Maßstab, an dem das Ergebnis bestehen muss.
                  </p>
                </li>
                <li className={"is-in"}>
                  <h3>Sie erhalten einen klaren Leistungsrahmen.</h3>
                  <p>
                    Leistungen, Ihre Mitwirkung, Termine, Optionen und Kosten stehen getrennt und
                    verständlich im Angebot.
                  </p>
                </li>
                <li className={"is-in"}>
                  <h3>Konzept, Text und Design entstehen gemeinsam.</h3>
                  <p>
                    Sie sehen an vereinbarten Punkten ein schlüssiges Gesamtbild und entscheiden,
                    wie es weitergeht.
                  </p>
                </li>
                <li className={"is-in"}>
                  <h3>Wir prüfen, übergeben und bleiben erreichbar.</h3>
                  <p>
                    Wir prüfen das vereinbarte Ergebnis und übergeben es nachvollziehbar. Pflege und
                    Weiterentwicklung können Sie dazubuchen.
                  </p>
                </li>
              </ol>
            </section>
            <ImportedSectionEigeneWerkzeugeFR />
            <section
              id="budget"
              className={"hc-section hc-budget hc-container"}
              aria-labelledby="hc-budget-title"
            >
              <div className={"hc-budget-story"}>
                <header
                  className={"hc-section-heading is-in"}
                  data-site-import-scroll-header={
                    '{"desktop":{"added":["is-in"],"removed":[],"threshold":5184}}'
                  }
                >
                  <span className={"hc-kicker"}>Kosten und Umfang</span>
                  <h2 id="hc-budget-title">Sie wissen vor dem Start, was enthalten ist.</h2>
                  <p>
                    Vor dem Start erhalten Sie ein Angebot mit klar abgegrenztem Umfang. Sie
                    entscheiden, was jetzt entsteht und was später folgt.
                  </p>
                  <div
                    className={"hc-rate is-in"}
                    aria-label="Individuell nach vereinbartem Umfang"
                    data-site-import-scroll-header={
                      '{"desktop":{"added":["is-in"],"removed":[],"threshold":5832}}'
                    }
                  >
                    <span>Klare Kalkulationsbasis</span>
                    <strong>Individuell</strong>
                    <small>nach vereinbartem Umfang</small>
                    <p>
                      Der Preis folgt dem Umfang, den wir mit Ihnen vereinbaren. Externe Kosten
                      weisen wir getrennt aus.
                    </p>
                  </div>
                  <a className={"hc-text-link"} href="/preise-ablauf">
                    Mehr zu Kosten und Ablauf
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
                      <path d="M4 12h16M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </header>
                <div className={"hc-costs is-in"}>
                  <div>
                    <h3>Entwicklung</h3>
                    <p>
                      Konzept, Text, Design und Technik ordnen wir im Angebot einem konkreten
                      Ergebnis zu.
                    </p>
                  </div>
                  <div>
                    <h3>Betreuung danach</h3>
                    <p>
                      Pflege, Weiterentwicklung und persönliche Unterstützung vereinbaren wir als
                      eigenen Baustein.
                    </p>
                  </div>
                  <div>
                    <h3>Externe Kosten</h3>
                    <p>
                      Hosting, Software, KI-Nutzung sowie Medien- und Werbebudget weisen wir offen
                      aus, nicht versteckt im Projektpreis.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section
              className={"hc-section hc-finish hc-container"}
              aria-labelledby="hc-finish-title"
            >
              <div className={"hc-finish-heading is-in"}>
                <span className={"hc-kicker"}>Kommen Sie rein.</span>
                <h2 id="hc-finish-title">Woran arbeiten Sie gerade?</h2>
              </div>
              <div className={"hc-finish-next is-in"}>
                {openChat ? (
                  <p>
                    Website, Shop oder ein Ablauf, der jeden Tag Zeit kostet: Ein paar Sätze genügen
                    für den Anfang. Sie entscheiden, ob daraus eine persönliche Anfrage wird.
                  </p>
                ) : (
                  <p>
                    Website, Shop oder ein Ablauf, der jeden Tag Zeit kostet: Ein paar Sätze im
                    Kontaktformular genügen für den Anfang. Alles Weitere klären wir im Gespräch.
                  </p>
                )}
                <div className={"hc-finish-actions"}>
                  <VorhabenKnopf
                    openChat={openChat}
                    chatOpen={chatOpen}
                    className={"nexify-control primary-button hc-finish-primary"}
                  >
                    Vorhaben schildern
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
                      <path d="M4 12h16M13 5l7 7-7 7" />
                    </svg>
                  </VorhabenKnopf>
                </div>
                <small />
              </div>
            </section>
            <HomeFaq />
          </div>
        </>
      )}
    </NexifyShell>
  );
}

// 2026-11-22 03:02 (Europe/Berlin): Eine Quelle fuer sichtbare FAQ und FAQPage-Markup.
// Google verlangt Deckungsgleichheit; Aenderung nur hier. Antworten nur mit belegten
// Aussagen der eigenen Seiten (Prozess, Preise, Zielgruppe, Kontakt).
const HOME_FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Welche Leistungen bietet NeXify AI?",
    a: "Marken und Websites, Apps und Portale sowie Automatisierung und KI. Dazu kommen Kampagnen-Landingpages und die Betreuung nach der Übergabe.",
  },
  {
    q: "Wie läuft ein Projekt ab?",
    a: "Erstgespräch, Leistungsrahmen, Konzept mit Text und Design, Umsetzung und Übergabe. Nach der Übergabe bleiben wir für Pflege und Weiterentwicklung erreichbar.",
  },
  {
    q: "Was kostet ein Projekt?",
    a: "Das steht im Angebot, das Sie vor dem Start erhalten. Es grenzt den Umfang klar ab und weist externe Kosten getrennt aus.",
  },
  {
    q: "An wen richtet sich das Angebot?",
    a: "An Unternehmen: Das Angebot richtet sich an Unternehmer im Sinne des §\u00a014\u00a0BGB (B2B). Die Zusammenarbeit läuft überwiegend online.",
  },
  {
    q: "Wie nehme ich Kontakt auf?",
    a: "Über das Kontaktformular, per E-Mail oder telefonisch. Sie erhalten eine persönliche Rückmeldung zu Ihrem Vorhaben.",
  },
];

function HomeFaq() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.nexifyai.de/#faq",
    mainEntity: HOME_FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <section
      id="faq"
      className={"hc-section hc-container"}
      aria-labelledby="hc-faq-title"
      style={{ scrollMarginTop: "7rem" }}
    >
      <header className={"hc-section-heading is-in"}>
        <div>
          <span className={"hc-kicker"}>Häufige Fragen</span>
          <h2 id="hc-faq-title">Was vor dem Start geklärt ist.</h2>
        </div>
        <p>Kurze Antworten auf die Fragen, die im ersten Gespräch am häufigsten kommen.</p>
      </header>
      {/* Karten wie die übrigen Abschnitte der Seite (Stile: site-korrekturen.css). Die Reihenfolge
          trägt keine Bedeutung, deshalb eine Liste ohne Ziffern. */}
      <ul className={"nx-faq"}>
        {HOME_FAQ.map(({ q, a }) => (
          <li key={q} className={"is-in"}>
            <h3>{q}</h3>
            <p>{a}</p>
            {q === HOME_FAQ.at(-1)?.q ? (
              <a className={"hc-text-link"} href="/kontakt">
                Zum Kontaktformular
              </a>
            ) : null}
          </li>
        ))}
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </section>
  );
}

/**
 * „Vorhaben schildern“: öffnet den KI-Chat, wenn er eingeschaltet ist; sonst ein echter Link auf
 * das Kontaktformular (der Server rendert dann keinen Chat, src/lib/chat-schalter.ts).
 */
function VorhabenKnopf({
  openChat,
  chatOpen,
  className,
  children,
}: {
  openChat: (() => void) | null;
  chatOpen?: boolean;
  className: string;
  children: import("react").ReactNode;
}) {
  if (!openChat)
    return (
      <a href="/kontakt" className={className} data-variant="primary">
        {children}
      </a>
    );
  return (
    <button
      aria-controls="nexify-chat"
      aria-expanded={chatOpen}
      type="button"
      className={className}
      data-variant="primary"
      onClick={openChat}
    >
      {children}
    </button>
  );
}

function ImportedSectionEinGesprChEin({ onOpenChat }: { onOpenChat: (() => void) | null }) {
  return (
    <section className={"identity-hero"} aria-labelledby="home-headline">
      <div className={"identity-scene"}>
        <div className={"identity-copy"}>
          <h1 id="home-headline">
            <span>Ein Gespräch. </span>
            <span>Ein Projekt, </span>
            <span className={"identity-title-accent"}>das passt.</span>
          </h1>
          <p className={"identity-subtitle"}>
            Websites, Apps, Shops und KI – aus dem, was Ihr Unternehmen wirklich braucht.
          </p>
          <p className={"identity-body"}>
            Die Zusammenarbeit läuft überwiegend online, vom ersten Gespräch bis zur Übergabe. Vor
            dem Start wissen Sie, was enthalten ist.
          </p>
          <div className={"identity-links"}>
            <VorhabenKnopf
              openChat={onOpenChat}
              className={"nexify-control primary-button identity-primary-link"}
            >
              <span>Vorhaben schildern</span>
              <span aria-hidden="true" className={"identity-primary-arrow"}>
                →
              </span>
            </VorhabenKnopf>
          </div>
        </div>
        <div className={"identity-media"}>
          <figure className={"identity-hero-photo"}>
            <SiteFilm film="studio" eager />
          </figure>
        </div>
      </div>
    </section>
  );
}

function ImportedNavWoHaktEsGerade() {
  return (
    <nav className={"hc-gallery hc-container"} aria-label="Wo hakt es gerade?">
      <article className={"hc-gallery-card is-in"}>
        <div className={"identity-media hc-art hc-art-0"}>
          <figure className={"identity-hero-photo"}>
            <SiteFilm film="angebot" />
          </figure>
        </div>
        <a className={"hc-gallery-link"} href="/leistungen/websites">
          <span className={"hc-scene-context"}>Marke &amp; Dienstleistung</span>
          <h3>
            Ihr Angebot, auf den Punkt.
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
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </h3>
          <p>
            Wir ordnen Leistungen, Sprache und Design. So zeigt Ihre Website verständlich, was Sie
            anbieten, und führt zur Anfrage.
          </p>
          <small className={"hc-scene-value"}>
            Ziel: passende Gespräche mit den richtigen Kunden.
          </small>
          <span className={"hc-text-link"}>
            Websites &amp; Markenauftritt
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
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </article>
      <article className={"hc-gallery-card is-in"}>
        <div className={"identity-media hc-art hc-art-1"}>
          <figure className={"identity-hero-photo"}>
            <SiteFilm film="fertigung" />
          </figure>
        </div>
        <a className={"hc-gallery-link"} href="/leistungen/agenten-automatisierung">
          <span className={"hc-scene-context"}>Fertigung &amp; Handwerk</span>
          <h3>
            Mehr Zeit für die Arbeit, die zählt.
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
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </h3>
          <p>
            Wir sehen uns mit Ihnen einen wiederkehrenden Vorgang an. Dann prüfen wir, wo Daten,
            Freigaben und KI Ihrem Team Arbeit abnehmen.
          </p>
          <small className={"hc-scene-value"}>
            Ziel: weniger Doppelarbeit und ein verlässlicherer Ablauf.
          </small>
          <span className={"hc-text-link"}>
            KI im Arbeitsablauf
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
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </article>
    </nav>
  );
}

function ImportedSectionWasKNnenWir() {
  return (
    <section
      id="leistungen"
      className={"hc-section hc-container hc-service-story"}
      aria-labelledby="hc-services-title"
    >
      <div className={"hc-service-layout"}>
        <header
          className={"hc-section-heading is-in"}
          data-site-import-scroll-header={
            '{"desktop":{"added":["is-in"],"removed":[],"threshold":1296}}'
          }
        >
          <span className={"hc-kicker"}>Was wir für Sie tun</span>
          <h2 id="hc-services-title">Was können wir für Sie bauen?</h2>
          <p>
            Marken und Websites, vernetzte Abläufe oder Kampagnen: Wir beginnen bei einer konkreten
            Aufgabe in Ihrem Unternehmen.
          </p>
          <a className={"hc-text-link"} href="/kontakt">
            Ihr Vorhaben mit uns besprechen
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
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </a>
          <figure className={"hc-plate hc-plate-services"}>
            <img
              src="/site-assets/5b8e74b98d950c05.webp"
              srcSet="/site-assets/05d4134e5686af4f.webp 800w, /site-assets/55d521535e5fc86c.webp 1280w, /site-assets/5b8e74b98d950c05.webp 1920w"
              sizes="(max-width: 820px) 100vw, 40vw"
              width="2000"
              height="1125"
              alt="Markeninszenierung: Pascal mit Layouttafeln, Modellen, NeX und AIFly ORACLE im Atelier"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </header>
        <div className={"hc-service-list"}>
          <details className={"hc-service-detail is-in"} open>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Marke, Text &amp; Website</strong>
                <span className={"hc-service-lead"}>
                  Ein Auftritt, der nach Ihrem Unternehmen aussieht – und sich auch so anfühlt.
                </span>
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
              <ul>
                <li>Positionierung, Seitenstruktur und klare Texte für Ihr Angebot</li>
                <li>Art Direction und Webdesign, eigens für Ihr Unternehmen entworfen</li>
                <li>
                  Umsetzung für Telefon und Bildschirm, klarer Anfrageweg, persönliche Übergabe
                </li>
              </ul>
              <p className={"hc-caption"}>
                Für Neugründung oder Relaunch. Umfang, Sprachen und Funktionen vereinbaren wir vor
                dem Start fest.
              </p>
              <a className={"hc-text-link"} href="/leistungen/websites">
                Leistung und Umfang ansehen
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
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </details>
          <details className={"hc-service-detail is-in"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Systeme &amp; Automatisierung</strong>
                <span className={"hc-service-lead"}>
                  Weniger Routine, mehr Überblick – ohne Ihre Arbeitsweise in ein fremdes System zu
                  pressen.
                </span>
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
              <ul>
                <li>Einen konkreten, wiederkehrenden Ablauf vollständig verstehen</li>
                <li>Vorhandene Systeme, Daten und Freigaben gezielt verbinden</li>
                <li>Fehlerfälle prüfen, Verantwortlichkeiten klären und Bedienung dokumentieren</li>
              </ul>
              <p className={"hc-caption"}>
                Wir beginnen bewusst mit einem Ablauf. Erst wenn er zuverlässig funktioniert, planen
                wir den nächsten.
              </p>
              <a className={"hc-text-link"} href="/leistungen/agenten-automatisierung">
                Leistung und Umfang ansehen
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
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </details>
          <details className={"hc-service-detail is-in"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Sichtbarkeit &amp; Kampagne</strong>
                <span className={"hc-service-lead"}>
                  Gefunden werden, verstanden werden und den richtigen Anlass für eine Anfrage
                  schaffen.
                </span>
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
              <ul>
                <li>Angebot, Zielgruppe und Suchanliegen klar herausarbeiten</li>
                <li>Landingpage, Inhalte und Werbemittel aus einem visuellen Konzept entwickeln</li>
                <li>
                  Suchmaschinen und KI-Antworten (SEO, GEO), lokale Signale und Auswertung abstimmen
                </li>
              </ul>
              <p className={"hc-caption"}>
                Werbebudget, Plattformkosten und laufende Betreuung weisen wir getrennt aus.
              </p>
              <a className={"hc-text-link"} href="/loesungen">
                Leistung und Umfang ansehen
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
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionEigeneWerkzeugeFR() {
  return (
    <section
      id="produktwelt"
      className={"hc-section hc-container hc-product-story"}
      aria-labelledby="hc-products-title"
    >
      <header
        className={"hc-section-heading is-in"}
        data-site-import-scroll-header={
          '{"desktop":{"added":["is-in"],"removed":[],"threshold":3888}}'
        }
      >
        <div>
          <span className={"hc-kicker"}>Produkte von NeXify</span>
          <h2 id="hc-products-title">Eigene Werkzeuge für konkrete Arbeit.</h2>
        </div>
        <p>
          Die NeX AIFly Suite, die Agenten NeX und AIFly ORACLE und die NeXify API haben je eine
          eigene Aufgabe. Wir sagen Ihnen offen, was zu Ihrem Vorhaben passt.
        </p>
      </header>
      <div className={"hc-products"}>
        <a className={"hc-product is-in"} href="/produkte/nex2fly">
          <figure className={"hc-product-art"}>
            <img
              src="/site-assets/4b45951db0b51136.webp"
              srcSet="/site-assets/5764558ff1c73ead.webp 800w, /site-assets/fba47bfd29e56755.webp 1280w, /site-assets/4b45951db0b51136.webp 1920w"
              sizes="(max-width: 900px) 100vw, 50vw"
              width="2000"
              height="1125"
              alt="Markeninszenierung: Pascal und eine Gesprächspartnerin schauen gemeinsam auf ein Tablet; NeX und AIFly ORACLE begleiten sie"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div>
            <h3>NeX AIFly Suite</h3>
            <p>
              Ihr eigener Arbeitsbereich für Gespräche, Aufgaben, Dokumente und Projektwissen.
              Zugang auf Anfrage.
            </p>
            <span className={"hc-text-link"}>
              Suite kennenlernen
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
                <path d="M4 12h16M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </a>
        <a className={"hc-product is-in"} href="/produkte/one">
          <figure className={"hc-product-art"}>
            <img
              src="/site-assets/a28276c0cb67aeef.webp"
              srcSet="/site-assets/4651eb82c8a87835.webp 800w, /site-assets/62994bb0701a3e15.webp 1280w, /site-assets/a28276c0cb67aeef.webp 1920w"
              sizes="(max-width: 900px) 100vw, 50vw"
              width="2000"
              height="1125"
              alt="Markeninszenierung: Pascal im Gespräch mit einer Person in Hygienekleidung an einer Produktionsanlage"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div>
            <h3>NeX Agentic AI</h3>
            <p>Der Agent für klar umrissene Aufgaben – mit den Werkzeugen, die Sie zulassen.</p>
            <span className={"hc-text-link"}>
              Agenten kennenlernen
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
                <path d="M4 12h16M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </a>
        <a className={"hc-product is-in"} href="/produkte/api">
          <figure className={"hc-product-art"}>
            <img
              src="/site-assets/df162c342bb041e0.webp"
              srcSet="/site-assets/3c2a16020520a9d2.webp 800w, /site-assets/310f26f4c183ff5d.webp 1280w, /site-assets/df162c342bb041e0.webp 1920w"
              sizes="(max-width: 900px) 100vw, 50vw"
              width="2000"
              height="1125"
              alt="Markeninszenierung: Pascal und ein Gesprächspartner betrachten Pläne und ein technisches Modell auf einem Arbeitstisch"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div>
            <h3>NeXify API</h3>
            <p>
              KI-Funktionen von NeXify in Ihrer eigenen Anwendung. Den Zugang erhalten Sie im
              Projekt.
            </p>
            <span className={"hc-text-link"}>
              API ansehen
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
                <path d="M4 12h16M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

function useImportedLayout() {
  useEffect(() => {
    const scrollingAreas = Array.from(
      document.querySelectorAll<HTMLElement>("[data-site-import-scroll-root]"),
    );
    const scrollTop = () =>
      scrollingAreas.find(
        (node) =>
          node.clientHeight > 0 &&
          node.scrollHeight > node.clientHeight &&
          /^(auto|scroll)$/.test(getComputedStyle(node).overflowY),
      )?.scrollTop ?? window.scrollY;
    const scrollHeaders = Array.from(
      document.querySelectorAll<HTMLElement>("[data-site-import-scroll-header]"),
    )
      .slice(0, 128)
      .flatMap((node) => {
        try {
          const states = JSON.parse(node.dataset["siteImportScrollHeader"] || "{}");
          if (!states || typeof states !== "object") return [];
          for (const key of ["desktop", "mobile"]) {
            const state = states[key];
            if (
              !state ||
              !Array.isArray(state.added) ||
              !Array.isArray(state.removed) ||
              state.added.length + state.removed.length > 32
            )
              delete states[key];
          }
          return [
            {
              node,
              states,
              original: new Set(node.classList),
              originalFill: node.getAttribute("fill"),
              transform: node.style.getPropertyValue("transform"),
              priority: node.style.getPropertyPriority("transform"),
            },
          ];
        } catch {
          return [];
        }
      });
    function syncScrollHeaders(reset = false) {
      for (const { node, states, original, originalFill, transform, priority } of scrollHeaders) {
        if (!reset && node.getAttribute("data-import-menu-open") === "true") continue;
        const state = states[innerWidth < 768 ? "mobile" : "desktop"];
        if (
          [states.desktop, states.mobile].some((entry) => entry && Object.hasOwn(entry, "fill"))
        ) {
          if (originalFill === null) node.removeAttribute("fill");
          else node.setAttribute("fill", originalFill);
        }
        if (states.desktop?.transform || states.mobile?.transform) {
          if (transform) node.style.setProperty("transform", transform, priority);
          else node.style.removeProperty("transform");
        }
        for (const value of [states.desktop, states.mobile].filter(Boolean) as {
          added: string[];
          removed: string[];
        }[]) {
          for (const token of [...(value.added || []), ...(value.removed || [])]) {
            if (typeof token !== "string" || !token || /\s/.test(token)) continue;
            node.classList.toggle(token, original.has(token));
          }
        }
        if (reset || !state || !Number.isFinite(state.threshold) || scrollTop() < state.threshold)
          continue;
        let until = state.until;
        if (
          typeof state.untilAnchor === "string" &&
          /^\d$/.test(state.untilAnchor) &&
          Number.isFinite(state.untilProgress) &&
          Math.abs(state.untilProgress) <= 2
        ) {
          const anchor = document.querySelector<HTMLElement>(
            '[data-site-import-header-end="' + state.untilAnchor + '"]',
          );
          if (anchor)
            until =
              anchor.getBoundingClientRect().top + scrollTop() + innerHeight * state.untilProgress;
        }
        if (Number.isFinite(until) && scrollTop() >= until) continue;
        if (state.fill === null) node.removeAttribute("fill");
        else if (
          typeof state.fill === "string" &&
          state.fill.length <= 256 &&
          !/url\(/i.test(state.fill)
        )
          node.setAttribute("fill", state.fill);
        if (
          typeof state.transform === "string" &&
          state.transform.length <= 128 &&
          CSS.supports("transform", state.transform)
        )
          node.style.setProperty("transform", state.transform, "important");
        for (const token of state.added || [])
          if (typeof token === "string" && token && !/\s/.test(token)) node.classList.add(token);
        for (const token of state.removed || [])
          if (typeof token === "string" && token && !/\s/.test(token)) node.classList.remove(token);
      }
    }
    const handleScroll = () => {
      syncScrollHeaders();
    };
    function resizeSummaries() {
      syncScrollHeaders();
    }
    const loopingVideos = Array.from(
      document.querySelectorAll<HTMLVideoElement>("video[loop]:not([autoplay]):not([controls])"),
    )
      .filter((video) => video.muted && !video.closest("[data-site-import-carousel-store]"))
      .slice(0, 32);
    const videoObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      }
    });
    loopingVideos.forEach((video) => videoObserver.observe(video));
    document.addEventListener("load", handleScroll, true);
    resizeSummaries();
    const parallaxFrame = requestAnimationFrame(handleScroll);
    window.addEventListener("resize", resizeSummaries);
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => {
      videoObserver.disconnect();
      loopingVideos.forEach((video) => video.pause());
      cancelAnimationFrame(parallaxFrame);
      syncScrollHeaders(true);
      document.removeEventListener("load", handleScroll, true);
      window.removeEventListener("resize", resizeSummaries);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);
}
