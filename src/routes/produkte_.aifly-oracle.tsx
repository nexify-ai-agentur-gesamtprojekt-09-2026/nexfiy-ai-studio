import { ProductOverview } from "@/components/site/ProductOverview";
import { GuideNavigation } from "@/components/site/GuideNavigation";
import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/produkte.aifly-oracle.css?url";

export const Route = createFileRoute("/produkte_/aifly-oracle")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "AIFly ORACLE. Erst ordnen, dann handeln. · NeXify AI" },
      {
        name: "description",
        content: "AIFly ORACLE unterstützt beim Ordnen von Fragen, Wissen und nächsten Schritten.",
      },
      { property: "og:title", content: "AIFly ORACLE. Erst ordnen, dann handeln. · NeXify AI" },
      {
        property: "og:description",
        content: "AIFly ORACLE unterstützt beim Ordnen von Fragen, Wissen und nächsten Schritten.",
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
    <NexifyShell>
      <div className={"home-concept page-concept page-aifly-oracle layout-company context-nexify"}>
        <section className={"identity-hero"} aria-labelledby="page-title-aifly-oracle">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Sie sind hier">
                <ol>
                  <li>
                    <a href="/">Startseite</a>
                  </li>
                  <li className={"visually-hidden"}>
                    <span aria-current="page">AIFly ORACLE. Erst ordnen, dann handeln.</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                NEXIFY AI<span aria-hidden="true"> / </span>NeXify kennenlernen
              </span>
              <h1 id="page-title-aifly-oracle">AIFly ORACLE. Erst ordnen, dann handeln.</h1>
              <p className={"identity-body"}>
                Suite oder API: AIFly ORACLE hilft Ihnen, Ihr Vorhaben einzuordnen. Die Beratung
                nutzt öffentliche Produktinformationen und verweist auf die passende Einstiegsseite.
              </p>
              <div className={"identity-links"}>
                <a
                  className={"nexify-control primary-button identity-primary-link"}
                  data-variant="primary"
                  href="/ki-hinweise"
                >
                  <span>KI-Hinweise lesen</span>
                  <span aria-hidden="true" className={"identity-primary-arrow"}>
                    →
                  </span>
                </a>
                <a
                  className={"nexify-control secondary-button identity-secondary-link"}
                  data-variant="secondary"
                  href="/produkte/nex-agentic-aifly"
                >
                  NeX Agentic AIFly kennenlernen
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
          <a href="#content-aifly-oracle-oracle-1-0">
            Ordnung vor der Arbeit
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
          <a href="#content-aifly-oracle-oracle-2-1">
            Wer entscheidet was
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
          <a href="#content-aifly-oracle-oracle-3-2">
            Was Sie heute auf der Website erleben
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

        <ProductOverview
          id="oracle"
          label="Öffentliche Produktberatung"
          title="Suite oder API? Mit einer konkreten Frage beginnen."
          summary="Im Website-Chat hilft ORACLE bei der Produktauswahl. Diese Beratung ist von einer individuell vereinbarten Agentenlösung zu unterscheiden."
          facts={[
            {
              label: "Heute nutzbar",
              content:
                "Vorhaben allgemein beschreiben, Suite und API vergleichen und den passenden öffentlichen Einstieg öffnen.",
            },
            {
              label: "Grundlage",
              content:
                "Ein begrenzter Katalog öffentlicher Produktinformationen, keine Kontodaten oder privaten Projektunterlagen.",
            },
            {
              label: "Grenzen",
              content:
                "Keine Verträge, Zahlungen, Terminbuchungen, Guthabenprüfung oder Produktfreischaltung.",
            },
            {
              label: "Für Ihr Vorhaben",
              content:
                "Arbeitsoberfläche und Teamwissen sprechen für die Suite; KI innerhalb eigener Software spricht für die API.",
            },
          ]}
          example="Sie möchten KI im Team einsetzen, wissen aber noch nicht, ob eine eigene Anwendung nötig ist. Beschreiben Sie das gewünschte Ergebnis ohne vertrauliche Angaben; ORACLE erklärt die beiden Wege."
          links={[
            { label: "Suite ansehen", href: "/produkte/nex2fly" },
            { label: "API ansehen", href: "/produkte/api" },
            { label: "Datenhinweise", href: "/datenschutz" },
          ]}
        />
        <div className={"pc-sections"}>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-aifly-oracle-oracle-1-0"
            tabIndex={-1}
            aria-labelledby="content-aifly-oracle-oracle-1-0-title"
          >
            <div>
              <span className={"hc-kicker"}>01 / 03</span>
              <h2 id="content-aifly-oracle-oracle-1-0-title">Ordnung vor der Arbeit</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                AIFly ORACLE zerlegt ein Vorhaben in Aufgaben, ordnet Zuständigkeiten zu und macht
                sichtbar, was wovon abhängt. So ist klar, was als Nächstes dran ist und wer es
                erledigt.
              </p>
              <p>
                In Kundenprojekten vereinbaren wir vorab, welche Werkzeuge und Verbindungen AIFly
                ORACLE nutzt.
              </p>

              <h3>Abhängigkeiten sichtbar machen</h3>
              <p>
                Bei einem Vorhaben kann ein Entwurf erst entstehen, wenn Quellen, Ziel und
                Zuständigkeit feststehen. ORACLE ist für diese Ordnung gedacht. Welche Werkzeuge es
                außerhalb der öffentlichen Website nutzen darf, wird für den jeweiligen Einsatz
                gesondert festgelegt.
              </p>
              <div className={"hc-service-detail pc-module"}>
                <span className={"hc-caption"}>
                  AIFly ORACLE · KI-Assistent<span aria-hidden="true"> · </span>Ihr nächster Schritt
                </span>
                <a className={"hc-text-link"} href="/ki-hinweise">
                  KI-Hinweise lesen
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
            id="content-aifly-oracle-oracle-2-1"
            tabIndex={-1}
            aria-labelledby="content-aifly-oracle-oracle-2-1-title"
          >
            <div>
              <span className={"hc-kicker"}>02 / 03</span>
              <h2 id="content-aifly-oracle-oracle-2-1-title">Wer entscheidet was</h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Fachliche Entscheidungen, technische Änderungen und verbindliche Zusagen haben
                jeweils eine benannte verantwortliche Person. Das legen wir vor dem Einsatz fest.
              </p>
              <p>
                Verträge, Zahlungen und Zusagen entscheiden Menschen. AIFly ORACLE bereitet vor und
                ordnet.
              </p>

              <h3>Vorbereiten, prüfen und ausführen unterscheiden</h3>
              <p>
                Eine Empfehlung ist keine Freigabe. Ein formulierter Entwurf ist kein Versand.
                Gerade bei Folgen für Kunden, Verträge oder Zahlungen muss der verantwortliche
                Mensch den nächsten verbindlichen Schritt bestätigen.
              </p>
            </div>
          </section>
          <section
            className={"hc-intro hc-container pc-section"}
            id="content-aifly-oracle-oracle-3-2"
            tabIndex={-1}
            aria-labelledby="content-aifly-oracle-oracle-3-2-title"
          >
            <div>
              <span className={"hc-kicker"}>03 / 03</span>
              <h2 id="content-aifly-oracle-oracle-3-2-title">
                Was Sie heute auf der Website erleben
              </h2>
            </div>
            <div className={"pc-section-body"}>
              <p>
                Im Chat vergleicht ORACLE Suite und API anhand Ihres Vorhabens. Es hat keinen
                Zugriff auf Konten oder private Projekte und führt keine Aktionen aus. Es ist ein
                KI-System und kann sich irren; prüfen Sie wichtige Angaben auf der Produktseite.
              </p>
              <p>
                Der Chat schließt keine Verträge, bucht keine Termine und löst keine Zahlungen aus.
                Ihre Anfrage senden Sie selbst ab.
              </p>

              <h3>Die Grenzen der öffentlichen Beratung</h3>
              <p>
                Der Chat vergleicht Suite und API anhand öffentlicher Informationen. Er prüft weder
                Ihr Guthaben noch aktivierte Werkzeuge oder private Dokumente. Für eine belastbare
                Einordnung genügt eine allgemeine Beschreibung Ihres Vorhabens ohne vertrauliche
                Angaben.
              </p>
            </div>
          </section>
        </div>
        <ImportedSectionDieFACTORYEntdeckenMit />
        <ImportedSectionPassendeThemen />
        <section
          className={"hc-section hc-finish hc-container"}
          aria-labelledby="finish-title-aifly-oracle"
        >
          <div className={"hc-finish-heading"}>
            <span className={"hc-kicker"}>Im Detail</span>
            <h2 id="finish-title-aifly-oracle">Wie möchten Sie fortfahren?</h2>
          </div>
          <div className={"hc-finish-next"}>
            <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
            <div className={"hc-finish-actions"}>
              <a className={"hc-finish-primary"} href="/ki-hinweise">
                KI-Hinweise lesen
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
              <a className={"hc-text-link"} href="/produkte/nex-agentic-aifly">
                NeX Agentic AIFly kennenlernen
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
                  {...({ focusable: "false" } as any)}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </a>
              <button type="button" className={"hc-text-link"}>
                Terminwunsch nennen
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

function ImportedSectionDieFACTORYEntdeckenMit() {
  return (
    <section
      className={"hc-container pc-guide"}
      aria-label="Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE"
    >
      <details className={"hc-service-detail"}>
        <summary>
          <span>
            <strong className={"hc-service-name"}>
              Die FACTORY entdecken · mit Pascal, NeX und AIFly ORACLE
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
            Hier finden Sie unsere Leistungen, Produkte und Projektwege. Sie können jeden Bereich
            auch direkt öffnen.
          </p>
          <GuideNavigation initial="business-website" />
        </div>
      </details>
    </section>
  );
}

function ImportedSectionPassendeThemen() {
  return (
    <section
      className={"hc-section hc-container hc-process pc-related"}
      aria-labelledby="related-title-aifly-oracle"
    >
      <header className={"hc-section-heading hc-process-heading"}>
        <div>
          <span className={"hc-kicker"}>Weiterführende Seiten</span>
          <h2 id="related-title-aifly-oracle">Passende Themen</h2>
        </div>
        <p>Wählen Sie den nächsten Schritt, der zu Ihrem Vorhaben passt.</p>
      </header>
      <ol>
        <li>
          <span className={"hc-kicker"}>NEXIFY AI</span>
          <h3>
            <a href="/ki-hinweise">
              KI mit klarer Verantwortung.
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
            NeXify AI FACTORY verbindet menschliche Gestaltung mit KI-gestützter Arbeit.
            Kennzeichnung, Quellenprüfung und Freigaben gehören zum jeweiligen Einsatz. Eine
            KI-Ausgabe ist keine automatische Entscheidung oder Zusage.
          </p>
          <a
            aria-label="KI mit klarer Verantwortung. – Seite ansehen"
            className={"hc-text-link"}
            href="/ki-hinweise"
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
            <a href="/produkte/nex-agentic-aifly">
              NeX Agentic AIFly. Der Agent, der ausführt.
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
            NeX übernimmt klar umrissene Aufgaben: recherchieren, vorbereiten, wiederkehrende
            Schritte erledigen – mit den Werkzeugen, die Sie dafür zulassen.
          </p>
          <a
            aria-label="NeX Agentic AIFly. Der Agent, der ausführt. – Seite ansehen"
            className={"hc-text-link"}
            href="/produkte/nex-agentic-aifly"
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
            <a href="/kontakt">
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
                {...({ focusable: "false" } as any)}
              >
                <path d="M5 19 19 5M5 5h14v14" />
              </svg>
            </a>
          </h3>
          <p>
            Eine neue Website, ein Shop, ein Ablauf, der Zeit kostet, oder eine Kampagne: Ein paar
            Sätze genügen. Pascal Courbois klärt mit Ihnen, was Sie brauchen und wie der nächste
            Schritt aussieht.
          </p>
          <a
            aria-label="Schildern Sie Ihr Vorhaben. – Seite ansehen"
            className={"hc-text-link"}
            href="/kontakt"
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
            <a href="/unternehmen">
              Ein Ansprechpartner. Ein Agententeam.
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
            NeXify AI ist die Agentur von Pascal Courbois in Venlo. Pascal gibt Idee, Gestaltung und
            Richtung vor; die KI-Agenten NeX und AIFly ORACLE arbeiten aus. Wir nennen das AI
            FACTORY.
          </p>
          <a
            aria-label="Ein Ansprechpartner. Ein Agententeam. – Seite ansehen"
            className={"hc-text-link"}
            href="/unternehmen"
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
  );
}
