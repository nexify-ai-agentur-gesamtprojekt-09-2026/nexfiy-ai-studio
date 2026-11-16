import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/teileklar.bestellungen.css?url";

export const Route = createFileRoute("/teileklar_/bestellungen")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Bestellungen · TEILEKLAR" }, { name: "description", content: "Bestellverwaltung ist hier nicht angebunden. Eine Website-Anmeldung zeigt keine TEILEKLAR-Bestellungen an." }, { property: "og:title", content: "Bestellungen · TEILEKLAR" }, { property: "og:description", content: "Bestellverwaltung ist hier nicht angebunden. Eine Website-Anmeldung zeigt keine TEILEKLAR-Bestellungen an." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
    <div className={"home-concept page-concept tk-shop"}>
      <section className={"identity-hero is-text-only"} aria-labelledby="shop-orders-title">
        <div className={"identity-scene"}>
          <div className={"identity-copy"}>
            <nav className={"pc-breadcrumb"} aria-label="Brotkrumennavigation">
              <ol>
                <li>
                  <a href="/teileklar">TEILEKLAR.shop</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <span aria-current="page">Ihre Bestellungen</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Kundenkonto</span>
            <h1 id="shop-orders-title">Bestellverwaltung: aktueller Stand</h1>
          </div>
        </div>
      </section>
      <section className={"hc-container pc-supplement tk-shop-body"}>
        <div className="tk-empty" role="status"><h2>Keine Bestellanbindung vorhanden</h2><p>Dieser Auftritt ist noch nicht mit einem Bestellsystem verbunden. Eine Anmeldung zeigt deshalb hier keine Bestellungen an.</p><a className="hc-text-link" href="/kontakt#anfrage">Frage zu einer Bestellung stellen</a></div>
      </section>
    </div>
  </NexifyShell>;
}
