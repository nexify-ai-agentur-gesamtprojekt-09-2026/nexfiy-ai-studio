import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { WorkshopSearch } from "@/components/site/WorkshopSearch";
import capturedCSS from "../styles/pages/teileklar.werkstatt.css?url";

export const Route = createFileRoute("/teileklar_/werkstatt")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "Werkstatt in Ihrer Nähe · TEILEKLAR.shop" },
      {
        name: "description",
        content:
          "Eine externe Google-Maps-Suche nach PLZ oder Ort vorbereiten. Ein eigenes Werkstattverzeichnis und Buchungssystem sind nicht angebunden.",
      },
      { property: "og:title", content: "Werkstatt in Ihrer Nähe · TEILEKLAR.shop" },
      {
        property: "og:description",
        content:
          "Eine externe Google-Maps-Suche nach PLZ oder Ort vorbereiten. Ein eigenes Werkstattverzeichnis und Buchungssystem sind nicht angebunden.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  return (
    <NexifyShell brand="teileklar">
      <div className={"home-concept page-concept tk-shop"}>
        <section className={"identity-hero is-text-only"} aria-labelledby="workshop-search-title">
          <div className={"identity-scene"}>
            <div className={"identity-copy"}>
              <nav className={"pc-breadcrumb"} aria-label="Brotkrumennavigation">
                <ol>
                  <li>
                    <a href="/teileklar">TEILEKLAR.shop</a>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li>
                    <span aria-current="page">Werkstatt in Ihrer Nähe</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                TEILEKLAR<span aria-hidden="true"> / </span>Werkstattsuche
              </span>
              <h1 id="workshop-search-title">Werkstatt in Ihrer Nähe</h1>
              <p className={"identity-body"}>
                Nennen Sie PLZ oder Ort für eine externe Kartensuche. Diese Seite zeigt keine eigene
                Betriebsliste; einen Termin vereinbaren Sie direkt mit der gewählten Werkstatt.
              </p>
            </div>
          </div>
        </section>
        <WorkshopSearch />
      </div>
    </NexifyShell>
  );
}
