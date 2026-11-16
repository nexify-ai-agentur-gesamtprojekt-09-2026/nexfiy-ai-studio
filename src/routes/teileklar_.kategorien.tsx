import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { FitmentChecklist } from "@/components/site/FitmentChecklist";
import capturedCSS from "../styles/pages/teileklar.kategorien.css?url";

export const Route = createFileRoute("/teileklar_/kategorien")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Prüfhinweise nach Teileart. · TEILEKLAR.shop" }, { name: "description", content: "Prüfhinweise nach Teileart für Ihre Fahrzeug- und Teilefrage. Keine Artikelliste oder automatische Passungsprüfung." }, { property: "og:title", content: "Prüfhinweise nach Teileart. · TEILEKLAR.shop" }, { property: "og:description", content: "Prüfhinweise nach Teileart für Ihre Fahrzeug- und Teilefrage. Keine Artikelliste oder automatische Passungsprüfung." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
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
        <p className="tk-meta">Der Warenkatalog ist noch nicht angebunden. Wählen Sie eine Teileart, um die wichtigen Angaben für Ihre Anfrage vorzubereiten.</p>
        <FitmentChecklist />
      </section>
    </div>
  </NexifyShell>;
}
