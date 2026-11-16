import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CatalogCard } from "@/components/catalog/CatalogCard";
import { catalogListQuery } from "@/lib/teileklar-catalog.queries";
import { normalizeCatalogQuery } from "@/lib/teileklar-catalog";
import { PartInquiryForm } from "@/components/forms/PartInquiryForm";
import capturedCSS from "../styles/pages/teileklar.suche.css?url";

export const Route = createFileRoute("/teileklar_/suche")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Teil anfragen · TEILEKLAR.shop" }, { name: "description", content: "Passende Artikel im TEILEKLAR-Katalog sehen und ein Teil mit Fahrzeugdaten und optionalem Foto unverbindlich anfragen." }, { property: "og:title", content: "Teil anfragen · TEILEKLAR.shop" }, { property: "og:description", content: "Passende Artikel im TEILEKLAR-Katalog sehen und ein Teil mit Fahrzeugdaten und optionalem Foto unverbindlich anfragen." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  staticData: { importedDocument: { html: { "lang": "de", "style": { colorScheme: "dark" } as import("react").CSSProperties }, body: {  } } },
  validateSearch: (search: Record<string, unknown>): { q?: string } => {
    const q = normalizeCatalogQuery(search["q"]);
    return q ? { q } : {};
  },
  loaderDeps: ({ search }) => ({ q: search.q ?? "" }),
  loader: ({ context, deps }) => (deps.q ? context.queryClient.ensureQueryData(catalogListQuery({ q: deps.q, category: "", page: 1 })) : null),
  component: Index,
});

const COUNT = new Intl.NumberFormat("de-DE");

function CatalogMatches({ q }: { q: string }) {
  const { data } = useSuspenseQuery(catalogListQuery({ q, category: "", page: 1 }));
  return <section className="hc-container tkc-browser tkc-related" aria-labelledby="tkc-matches-title">
    <header className="tkc-results-head"><h2 id="tkc-matches-title">Passende Artikel im Katalog</h2><p className="tkc-results-count" role="status">{data.total === 0 ? <>Kein Katalogtreffer für „{q}“ – fragen Sie das Teil unten direkt an.</> : <>{COUNT.format(data.total)} Treffer für „{q}“</>}</p></header>
    {data.items.length ? <ul className="tkc-grid" role="list">{data.items.slice(0, 8).map((item) => <li key={item.id}><CatalogCard item={item} /></li>)}</ul> : null}
    {data.total > 8 ? <div className="tk-actions"><a className="nexify-control secondary-button" data-variant="secondary" href={`/teileklar/shop?q=${encodeURIComponent(q)}#katalog`}>Alle {COUNT.format(data.total)} Treffer ansehen</a></div> : null}
  </section>;
}

function Index() {
  const { q } = Route.useLoaderDeps();
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
                  <a href="/teileklar/shop">Katalog</a>
                  <span aria-hidden="true">/</span>
                </li>
                <li>
                  <span aria-current="page">Teilefrage</span>
                </li>
              </ol>
            </nav>
            <span className={"hc-kicker"}>TEILEKLAR<span aria-hidden="true"> / </span>Shop</span>
            <h1 id="shop-search-title">Teil anfragen</h1>
          </div>
        </div>
      </section>
      {q ? <CatalogMatches q={q} /> : null}
      <section className="pc-section" id="teilefrage"><PartInquiryForm initialPart={q} /></section>
    </div>
</NexifyShell>;
}
