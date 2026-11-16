import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { CatalogUnavailable } from "@/components/site/CatalogUnavailable";
import capturedCSS from "../styles/pages/teileklar.suche.css?url";

export const Route = createFileRoute("/teileklar_/suche")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Teil, Marke oder Nummer benennen. · TEILEKLAR.shop" }, { name: "description", content: "Teil, Marke oder Artikelnummer für eine Anfrage benennen. Hier werden keine Katalogtreffer oder Verfügbarkeiten abgerufen." }, { property: "og:title", content: "Teil, Marke oder Nummer benennen. · TEILEKLAR.shop" }, { property: "og:description", content: "Teil, Marke oder Artikelnummer für eine Anfrage benennen. Hier werden keine Katalogtreffer oder Verfügbarkeiten abgerufen." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept tk-shop"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="shop-search-title">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Brotkrumennavigation">
              <ol>
                <li>
                  <a href="/teileklar">TEILEKLAR.shop</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <a href="/teileklar/shop">Shop</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <span aria-current="page">Teilefrage vorbereiten</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Shop</span>
            <h1 id="shop-search-title">Teilefrage vorbereiten</h1>
          </div>
        </div>
      </section>
      <CatalogUnavailable />
    </div>
</NexifyShell>;
}
