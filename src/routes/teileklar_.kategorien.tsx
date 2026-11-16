import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/teileklar.kategorien.css?url";

export const Route = createFileRoute("/teileklar_/kategorien")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Alle Kategorien auf einen Blick. · TEILEKLAR.shop" }, { name: "description", content: "Entdecken Sie die Kategorien für Auto- und Motorradzubehör bei TEILEKLAR." }, { property: "og:title", content: "Alle Kategorien auf einen Blick. · TEILEKLAR.shop" }, { property: "og:description", content: "Entdecken Sie die Kategorien für Auto- und Motorradzubehör bei TEILEKLAR." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept tk-shop"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="shop-categories-title">
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
                  <span aria-current="page">Kategorien</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Shop</span>
            <h1 id="shop-categories-title">Kategorien</h1>
          </div>
        </div>
      </section>
      <section className={"hc-container pc-supplement tk-shop-body"}>
        <p role="alert" className={"tk-alert"}>Die Kategorien konnten nicht geladen werden.</p>
      </section>
    </div>
  </NexifyShell>;
}
