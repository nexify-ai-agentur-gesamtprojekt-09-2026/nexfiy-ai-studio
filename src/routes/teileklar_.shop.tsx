import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { CatalogUnavailable } from "@/components/site/CatalogUnavailable";
import capturedCSS from "../styles/pages/teileklar.shop.css?url";

export const Route = createFileRoute("/teileklar_/shop")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Auto \u0026 Motorrad · TEILEKLAR.shop" }, { name: "description", content: "Katalogstand und Vorbereitung einer Teilefrage. Aktuelle Artikel, Preise und Bestände sind nicht angebunden." }, { property: "og:title", content: "Auto \u0026 Motorrad · TEILEKLAR.shop" }, { property: "og:description", content: "Katalogstand und Vorbereitung einer Teilefrage. Aktuelle Artikel, Preise und Bestände sind nicht angebunden." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept tk-shop"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="shop-catalog-title">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Brotkrumennavigation">
              <ol>
                <li>
                  <a href="/teileklar">TEILEKLAR.shop</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <span aria-current="page">Ihre Teilefrage vorbereiten.</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Shop</span>
            <h1 id="shop-catalog-title">Ihre Teilefrage vorbereiten.</h1>
          </div>
        </div>
      </section>
      <CatalogUnavailable />
    </div>
</NexifyShell>;
}
