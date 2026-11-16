import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/teileklar.kasse.css?url";

export const Route = createFileRoute("/teileklar_/kasse")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Zur Kasse. Schritt für Schritt. · TEILEKLAR.shop" }, { name: "description", content: "Der Kassenbereich von TEILEKLAR für den nächsten Schritt Ihrer Bestellung." }, { property: "og:title", content: "Zur Kasse. Schritt für Schritt. · TEILEKLAR.shop" }, { property: "og:description", content: "Der Kassenbereich von TEILEKLAR für den nächsten Schritt Ihrer Bestellung." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept tk-shop"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="shop-checkout-title">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Brotkrumennavigation">
              <ol>
                <li>
                  <a href="/teileklar">TEILEKLAR.shop</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <a href="/teileklar/warenkorb">Warenkorb</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <span aria-current="page">Kasse</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Shop</span>
            <h1 id="shop-checkout-title">Kasse</h1>
          </div>
        </div>
      </section>
      <section className={"hc-container pc-supplement tk-shop-body"}>
        <div className="tk-empty" role="status"><h2>Onlinekauf noch nicht verfügbar</h2><p>Eine Waren- und Zahlungsanbindung ist in diesem Auftritt noch nicht vorhanden. Hier werden keine Bestellungen ausgelöst oder Zahlungen angenommen.</p><a className="hc-text-link" href="/teileklar/shop">Zum Schaufenster</a><a className="hc-text-link" href="/kontakt#anfrage">Teil anfragen</a></div>
      </section>
    </div>
  </NexifyShell>;
}
