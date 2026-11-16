import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/teileklar.warenkorb.css?url";

export const Route = createFileRoute("/teileklar_/warenkorb")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "Warenkorb noch nicht verfügbar. · TEILEKLAR.shop" },
      {
        name: "description",
        content:
          "Der Warenkorb ist hier nicht angebunden. Nutzen Sie Prüfhinweise oder bereiten Sie eine Teilefrage vor.",
      },
      { property: "og:title", content: "Warenkorb noch nicht verfügbar. · TEILEKLAR.shop" },
      {
        property: "og:description",
        content:
          "Der Warenkorb ist hier nicht angebunden. Nutzen Sie Prüfhinweise oder bereiten Sie eine Teilefrage vor.",
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
    <NexifyShell brand="teileklar">
      <div className={"home-concept page-concept tk-shop"}>
        <section className={"identity-hero is-text-only"} aria-labelledby="shop-cart-title">
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
                    <span aria-current="page">Ihr Warenkorb</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                TEILEKLAR<span aria-hidden="true"> / </span>Shop
              </span>
              <h1 id="shop-cart-title">Ihr Warenkorb</h1>
            </div>
          </div>
        </section>
        <section className={"hc-container pc-supplement tk-shop-body"}>
          <div className="tk-empty" role="status">
            <h2>Warenkorb noch nicht angebunden</h2>
            <p>
              In diesem Auftritt können noch keine Artikel in einen Warenkorb gelegt oder bestellt
              werden. Für eine Teilefrage nutzen Sie die Anfrage.
            </p>
            <a className="hc-text-link" href="/teileklar/shop">
              Zum Katalogstand
            </a>
            <a className="hc-text-link" href="/kontakt#anfrage">
              Teil anfragen
            </a>
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}
