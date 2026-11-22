import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/wissen.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/wissen")({
  head: () => pageHead("/wissen", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
      <div className={"home-concept page-concept page-knowledge layout-article context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-knowledge">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">So arbeiten wir.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>Arbeitsweise
              </span>
              <h1 id="page-title-knowledge">So arbeiten wir.</h1>
              <p className={"identity-body"}>
                Vom ersten Gespräch bis zur Übergabe: Sie sehen früh, welche Richtung entsteht, was
                enthalten ist und welche Entscheidung als Nächstes ansteht.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/wissen/projekt-vorbereiten"
                >
                  <span>Briefing vorbereiten</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/leistungsumfang"
                >
                  Pakete ansehen
                </a>
              </div>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <img
                  sizes="(max-width: 820px) 100vw, 60vw"
                  alt="Markeninszenierung: Pascal geht mit NeX und AIFly ORACLE an einer Wand mit gerahmten Entwürfen entlang"
                  width="2000"
                  height="1125"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  srcSet="/site-assets/969916e616ebcc07.webp 800w, /site-assets/9638e03a7436afda.webp 1280w, /site-assets/e15257db84b63793.webp 1920w"
                  src="/site-assets/e15257db84b63793.webp"
                />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-knowledge-knowledge-customer-1-0">
            Vom Ziel zum Ergebnis
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
          <a href="#content-knowledge-knowledge-customer-2-1">
            Eine Übergabe, mit der Sie arbeiten können
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
            id="content-knowledge-knowledge-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-knowledge-knowledge-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-knowledge-knowledge-customer-1-0-title">Vom Ziel zum Ergebnis</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Zuerst klären wir Zielgruppe, Angebot und die gewünschte Wirkung. Daraus folgen
                Gestaltung, Inhalte, Funktionen und der Umfang.
              </p>
              <p>
                Ein Beispiel: Soll Ihre Website mehr passende Anfragen bringen, beginnen wir bei
                Angebot und Zielgruppe. Danach folgen Seitenführung und Kontaktweg. So wissen Sie
                bei jedem Teil des Projekts, warum es ihn gibt.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>Ihr nächster Schritt</span>
                <a className={"hc-text-link"} href="/wissen/projekt-vorbereiten">
                  Briefing vorbereiten
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
            id="content-knowledge-knowledge-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-knowledge-knowledge-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-knowledge-knowledge-customer-2-1-title">
                Eine Übergabe, mit der Sie arbeiten können
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Am Ende erhalten Sie das geprüfte Ergebnis mit den Dateien, der Dokumentation und
                der Einweisung, die im Angebot stehen. Offene Punkte und nächste Schritte halten wir
                schriftlich fest.
              </p>
              <p>
                Pflege und Aktualisierung übernehmen Sie selbst oder vereinbaren sie mit
                NeXify&nbsp;Care.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionDerPassendeEinstieg />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-knowledge"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Ihr nächster Schritt</span>
            <h2 id="finish-title-knowledge">Wie möchten Sie fortfahren?</h2>
          </div>
          <div className={"hc-finish-next"}>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/wissen/projekt-vorbereiten">
                Briefing vorbereiten
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
              <a className={"hc-text-link"} href="/leistungsumfang">
                Pakete ansehen
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
              <a className={"hc-text-link"} href="/kontakt">
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
              </a>
            </div>
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}

function ImportedSectionDerPassendeEinstieg() {
  return (
    <section
      className={"hc-section hc-container hc-product-story"}
      aria-labelledby="page-showcase-title"
    >
      <header className={"hc-section-heading"}>
        <div>
          <span className={"hc-kicker"}>Ihr nächster Schritt</span>
          <h2 id="page-showcase-title">Der passende Einstieg.</h2>
        </div>
        <p>Jede Seite beschreibt Umfang, Ablauf und den nächsten Schritt für ihren Bereich.</p>
      </header>
      <nav className={"hc-gallery"} aria-label="Der passende Einstieg.">
        <a className={"hc-gallery-card"} href="/wissen/projekt-vorbereiten">
          <figure className={"hc-art"}>
            <img
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal bespricht ein Dokument mit einer Gesprächspartnerin im Empfangsbereich"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/1a5734bbeb80a90b.webp 800w, /site-assets/855bb0082f7bbaf6.webp 1280w, /site-assets/7ab67fba9fccf952.webp 1920w"
              src="/site-assets/7ab67fba9fccf952.webp"
            />
          </figure>
          <h3>
            Ihr Briefing in fünf Fragen.
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
            Sie brauchen kein fertiges Konzept. Fünf Antworten genügen, damit aus Ihrer Idee ein
            Angebot werden kann.
          </p>
          <span className={"hc-text-link"}>
            Mehr erfahren
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
        <a className={"hc-gallery-card"} href="/leistungen">
          <figure className={"hc-art"}>
            <img
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal mit Layouttafeln, Modellen, NeX und AIFly ORACLE im Atelier"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/05d4134e5686af4f.webp 800w, /site-assets/55d521535e5fc86c.webp 1280w, /site-assets/5b8e74b98d950c05.webp 1920w"
              src="/site-assets/5b8e74b98d950c05.webp"
            />
          </figure>
          <h3>
            Website, System, Kampagne. Aus einer Hand.
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
            Drei Leistungsfelder, ein Ansprechpartner: Wir bauen Ihren Auftritt, entlasten Ihre
            Abläufe und bringen Ihr Angebot zu den richtigen Kunden. Sie wählen, wo wir anfangen.
          </p>
          <span className={"hc-text-link"}>
            Mehr erfahren
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
        <a className={"hc-gallery-card"} href="/kontakt">
          <figure className={"hc-art"}>
            <img
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal, NeX und AIFly ORACLE im Eingangsbereich eines Gebäudes"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/ccf9a769cd5529fd.webp 800w, /site-assets/5815f36894bbd987.webp 1280w, /site-assets/05c51cdebbdd2aa6.webp 1920w"
              src="/site-assets/05c51cdebbdd2aa6.webp"
            />
          </figure>
          <h3>
            Schildern Sie Ihr Vorhaben.
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
            Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein paar
            Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der nächste
            Schritt aussieht.
          </p>
          <span className={"hc-text-link"}>
            Mehr erfahren
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
      </nav>
    </section>
  );
}
