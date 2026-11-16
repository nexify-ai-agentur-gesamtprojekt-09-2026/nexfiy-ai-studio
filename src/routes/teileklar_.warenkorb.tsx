import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import capturedCSS from "../styles/pages/teileklar.warenkorb.css?url";

export const Route = createFileRoute("/teileklar_/warenkorb")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Ihr Warenkorb. Alles im Blick. · TEILEKLAR.shop" }, { name: "description", content: "Ihr Warenkorb bei TEILEKLAR mit den ausgewählten Artikeln im Überblick." }, { property: "og:title", content: "Ihr Warenkorb. Alles im Blick. · TEILEKLAR.shop" }, { property: "og:description", content: "Ihr Warenkorb bei TEILEKLAR mit den ausgewählten Artikeln im Überblick." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  component: Index,
});

function Index() {
  return <NexifyShell brand="teileklar">
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
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Shop</span>
            <h1 id="shop-cart-title">Ihr Warenkorb</h1>
          </div>
        </div>
      </section>
      <section className={"hc-container pc-supplement tk-shop-body"}>
        <div className={"tk-empty"} role="alert"><h2>Warenkorb derzeit nicht verfügbar</h2><p>Der Shop kann Ihren Warenkorb momentan nicht abrufen. Bitte versuchen Sie es später erneut oder sprechen Sie uns an.</p><a className={"hc-text-link"} href="/teileklar/shop">Zum Shop<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a> · <a className={"hc-text-link"} href="/kontakt">Kontakt aufnehmen<svg className={"hc-arrow"} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...({ focusable: "false" } as any)}><path d="M4 12h16M13 5l7 7-7 7" /></svg></a></div>
      </section>
    </div>
  </NexifyShell>;
}
