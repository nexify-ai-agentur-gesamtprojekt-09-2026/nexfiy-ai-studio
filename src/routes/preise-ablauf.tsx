import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/preise-ablauf.css?url";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/preise-ablauf")({
  head: () => pageHead("/preise-ablauf", { links: [{ rel: "stylesheet", href: capturedCSS }] }),
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
      <div className={"home-concept page-concept page-pricing layout-product context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-pricing">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">Sie kennen die Kosten vor dem Start.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NeXify AI<span aria-hidden="true"> / </span>Zusammenarbeit
              </span>
              <h1 id="page-title-pricing">Sie kennen die Kosten vor dem Start.</h1>
              <p className={"identity-body"}>
                Vor jedem Auftrag steht ein Angebot mit abgegrenztem Umfang. Entwicklung, Betreuung
                danach und externe Kosten sind getrennt ausgewiesen.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/kontakt"
                >
                  <span>Vorhaben schildern</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/leistungsumfang"
                >
                  Pakete vergleichen
                </a>
              </div>
              {/* 2026-11-22 (Europe/Berlin): B2B-Abgrenzung nach § 14 BGB. Steht unter den Knöpfen,
                  damit der Weg zum Kontakt auf dem ersten Bildschirm bleibt. Die Seite nennt
                  keine Preise; der Satz spricht deshalb von Angeboten. */}
              <p className={"identity-body identity-note"}>
                Das Angebot richtet sich an Unternehmer im Sinne des § 14 BGB. Angebote gelten für
                geschäftliche Auftraggeber; die Umsatzsteuer wird gesondert ausgewiesen.
              </p>
            </div>
            <div className={"identity-media"}>
              <figure className={"identity-hero-photo"}>
                <img
                  sizes="(max-width: 820px) 100vw, 60vw"
                  alt="Markeninszenierung: Pascal erläutert Unterlagen am Besprechungstisch, begleitet von NeX und AIFly ORACLE"
                  width="2000"
                  height="1125"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  srcSet="/site-assets/473f72e3022cee69.webp 800w, /site-assets/51e21ce2ea9575ee.webp 1280w, /site-assets/9c2f1ce694c2ed13.webp 1920w"
                  src="/site-assets/9c2f1ce694c2ed13.webp"
                />
              </figure>
            </div>
          </div>
        </section>
        <nav className={"hc-anchors hc-container"} aria-label="Auf dieser Seite">
          <a href="#content-pricing-pricing-customer-1-0">
            Drei Kostenarten, klar getrennt
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
          <a href="#content-pricing-pricing-customer-2-1">
            Ihr Budget bestimmt den Einstieg
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
            id="content-pricing-pricing-customer-1-0"
            tabIndex={-1}
            aria-labelledby="content-pricing-pricing-customer-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 02</span>
              <h2 id="content-pricing-pricing-customer-1-0-title">
                Drei Kostenarten, klar getrennt
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Entwicklung: Konzept, Texte, Gestaltung und Technik für das vereinbarte Ergebnis –
                einmalig.
              </p>
              <p>Betreuung danach: Pflege und Weiterentwicklung, wenn Sie sie wünschen.</p>
              <p>
                Externe Kosten: Hosting, Software, KI-Nutzung und Werbebudget, offen ausgewiesen
                statt im Projektpreis versteckt.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>Ihr nächster Schritt</span>
                <a className={"hc-text-link"} href="/leistungsumfang">
                  Drei Pakete. Ein klarer Umfang.
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
            id="content-pricing-pricing-customer-2-1"
            tabIndex={-1}
            aria-labelledby="content-pricing-pricing-customer-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 02</span>
              <h2 id="content-pricing-pricing-customer-2-1-title">
                Ihr Budget bestimmt den Einstieg
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Sind Budget oder Zeit begrenzt, legen wir gemeinsam fest, welches Ergebnis Sie
                zuerst brauchen. Daraus wird ein abgegrenzter Einstieg; alles Weitere steht als
                Option daneben.
              </p>
              <p>
                Sie entscheiden auf Grundlage des Angebots. Zusätzliche Arbeit stimmen wir mit Ihnen
                ab, bevor sie entsteht.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionDerPassendeEinstieg />
        <ImportedSectionKlarheitVorDemErsten />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-pricing"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Ihr nächster Schritt</span>
            <h2 id="finish-title-pricing">Wie möchten Sie fortfahren?</h2>
          </div>
          <div className={"hc-finish-next"}>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/kontakt">
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
              <a className={"hc-text-link"} href="/leistungsumfang">
                Pakete vergleichen
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
        <p>
          Wählen Sie den Bereich, der zu Ihrem Vorhaben passt. Umfang, Ablauf und nächste Schritte
          finden Sie auf der jeweiligen Seite.
        </p>
      </header>
      <nav className={"hc-gallery"} aria-label="Der passende Einstieg.">
        <a className={"hc-gallery-card"} href="/leistungsumfang">
          <figure className={"hc-art"}>
            <img
              sizes="(max-width: 640px) 100vw, 520px"
              alt="Markeninszenierung: Pascal hört einer Person am Besprechungstisch zu; NeX und AIFly ORACLE begleiten das Gespräch"
              width="2000"
              height="1125"
              loading="lazy"
              decoding="async"
              srcSet="/site-assets/70809ce466d6c39a.webp 800w, /site-assets/1870403fa2b90dde.webp 1280w, /site-assets/3c8726341a94b928.webp 1920w"
              src="/site-assets/3c8726341a94b928.webp"
            />
          </figure>
          <h3>
            Drei Pakete. Ein klarer Umfang.
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
            Markenstart, KI im Betrieb oder Wachstum: Aus Ihrem Ziel wird ein Auftrag mit benannten
            Ergebnissen, wählbaren Optionen und Kosten, die Sie vor dem Start kennen.
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

function ImportedSectionKlarheitVorDemErsten() {
  return (
    <section
      className={"hc-section hc-container hc-service-story"}
      aria-labelledby="page-questions-title"
    >
      <div className={"hc-service-layout"}>
        <header className={"hc-section-heading"}>
          <span className={"hc-kicker"}>Sechs Fragen zu Ihrem Vorhaben</span>
          <h2 id="page-questions-title">Klarheit vor dem ersten Schritt.</h2>
          <p>
            Die Antworten beschreiben Umfang, Ablauf und Grenzen – damit Sie Ihr Vorhaben sicher
            einordnen können.
          </p>
          <a className={"hc-text-link"} href="/kontakt">
            Vorhaben beschreiben
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
        <div className={"hc-service-list"}>
          <details className={"hc-service-detail"} open>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Für wen ist es geeignet?</strong>
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
                Für Unternehmen, die ein Vorhaben planen und Projektkosten von laufender Betreuung
                und Verbrauch trennen möchten.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Welchen Nutzen haben Sie?</strong>
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
                Sie können den Einstieg priorisieren und Erweiterungen bewusst wählen. Externe
                Kosten werden nicht als Bestandteil eines unklaren Pauschalpreises versteckt.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Wie läuft es ab?</strong>
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
                Sie beschreiben Ihr Vorhaben. Pascal klärt Ziel, vorhandene Grundlagen und Umfang
                mit Ihnen. Danach folgen Angebot, Ihre Freigabe, Umsetzung, Prüfung und Übergabe.
                Laufende Betreuung wird separat vereinbart.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was kostet es?</strong>
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
                Der Aufwand und die Kosten werden für Ihr Vorhaben im Angebot festgelegt. Hosting,
                Software, KI-Verbrauch und gegebenenfalls Medienbudget werden separat ausgewiesen.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>
                  Welche Voraussetzungen und Grenzen gelten?
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
                Ein Angebot nennt den Gesamtaufwand. Fremdkosten, Steuern und laufende Leistungen
                weist es getrennt aus.
              </p>
            </div>
          </details>
          <details className={"hc-service-detail"}>
            <summary>
              <span>
                <strong className={"hc-service-name"}>Was können Sie jetzt tun?</strong>
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
                Beschreiben Sie Ihr Vorhaben über das Kontaktformular. Nennen Sie Ziel, vorhandene
                Systeme und Ihre wichtigste Frage. Sie erhalten eine Anfrage-Nummer; die Anfrage ist
                noch keine Beauftragung.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
