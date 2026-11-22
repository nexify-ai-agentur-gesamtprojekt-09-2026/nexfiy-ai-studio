import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/portale.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portale")({
  head: () => pageHead("/portale", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
    <NexifyShell>
      <div className={"home-concept page-concept page-portals layout-company context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-portals">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Kundencenter. In Einrichtung.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>NeXify kennenlernen
              </span>
              <h1 id="page-title-portals">Kundencenter. In Einrichtung.</h1>
              <p className={"identity-body"}>
                Kunden und Partner sollen je einen eigenen, geschützten Bereich erhalten. Das
                NeXify-Kundencenter wird derzeit eingerichtet. Zugänge vergeben wir persönlich je
                Kunde.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/kontakt"
                >
                  <span>Zugang anfragen</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
              </div>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <img
                  sizes="(max-width: 820px) 100vw, 60vw"
                  alt="Markeninszenierung: Pascal, NeX und AIFly ORACLE im Eingangsbereich eines Gebäudes"
                  width="2000"
                  height="1125"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  srcSet="/site-assets/ccf9a769cd5529fd.webp 800w, /site-assets/5815f36894bbd987.webp 1280w, /site-assets/05c51cdebbdd2aa6.webp 1920w"
                  src="/site-assets/05c51cdebbdd2aa6.webp"
                />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-portals-portals-1-0">
            Welcher Bereich für wen
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
          <a href="#content-portals-portals-2-1">
            Getrennt und geschützt
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
          <a href="#content-portals-portals-3-2">
            So erhalten Sie Zugang
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
        </nav>
        <div className={"pc-sections"}>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-portals-portals-1-0"
            tabIndex={-1}
            aria-labelledby="content-portals-portals-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 03</span>
              <h2 id="content-portals-portals-1-0-title">Welcher Bereich für wen</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Der Kundenbereich ist für Projektstand, Dokumente und Anfragen gedacht. Der
                Partnerbereich richtet sich an Partner von NeXify AI.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>Ihr nächster Schritt</span>
                <a className={"hc-text-link"} href="/kontakt">
                  Zugang anfragen
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
            </div>
          </section>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-portals-portals-2-1"
            tabIndex={-1}
            aria-labelledby="content-portals-portals-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 03</span>
              <h2 id="content-portals-portals-2-1-title">Getrennt und geschützt</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Jeder Bereich ist mit eigenen Rollen und Rechten geplant. Ein Zugang gilt für Ihren
                Bereich, nicht für einen anderen. Das NeXify-Kundencenter wird derzeit eingerichtet;
                eine Anmeldung ist noch nicht möglich.
              </p>
            </div>
          </section>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-portals-portals-3-2"
            tabIndex={-1}
            aria-labelledby="content-portals-portals-3-2-title"
          >
            <div>
              <span className={"hc-kicker"}>03 / 03</span>
              <h2 id="content-portals-portals-3-2-title">So erhalten Sie Zugang</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Die Bereiche richten wir je Kunde und Partner ein. Beschreiben Sie, wofür Sie einen
                Zugang brauchen. Wir nennen Ihnen den passenden Bereich und den nächsten Schritt.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-portals"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Ihr nächster Schritt</span>
            <h2 id="finish-title-portals">Wie möchten Sie fortfahren?</h2>
          </div>
          <div className={"hc-finish-next"}>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/kontakt">
                Zugang anfragen
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
              <a className={"hc-text-link"} href="/produkte/nex2fly">
                NeX AIFly Suite ansehen
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
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section
      className={"hc-section hc-container hc-process pc-related"}
      aria-labelledby="related-title-portals"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-portals">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NeXify AI</span>
          <h3>
            <a href="/produkte/nex2fly">
              NeX AIFly Suite. Ihr KI-Arbeitsbereich.
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
            </a>
          </h3>
          <p>
            Gespräche, Aufgaben, Dokumente und Projektwissen an einem Ort – in Ihrem eigenen
            Bereich. Den Zugang richten wir persönlich mit Ihnen ein.
          </p>
          <a
            aria-label="NeX AIFly Suite. Ihr KI-Arbeitsbereich. – Seite ansehen"
            className={"hc-text-link"}
            href="/produkte/nex2fly"
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
              focusable="false"
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </a>
        </li>
      </ol>
    </section>
  );
}
