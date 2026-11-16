import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FitmentChecklist } from "@/components/site/FitmentChecklist";
import { catalogCategoriesQuery } from "@/lib/teileklar-catalog.queries";
import capturedCSS from "../styles/pages/teileklar.kategorien.css?url";

export const Route = createFileRoute("/teileklar_/kategorien")({
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: "Kategorien und Prüfhinweise · TEILEKLAR.shop" },
      {
        name: "description",
        content:
          "Alle Kategorien des aktuellen TEILEKLAR-Katalogs mit Artikelzahl sowie Prüfhinweise nach Teileart für Ihre Fahrzeug- und Teilefrage.",
      },
      { property: "og:title", content: "Kategorien und Prüfhinweise · TEILEKLAR.shop" },
      {
        property: "og:description",
        content:
          "Alle Kategorien des aktuellen TEILEKLAR-Katalogs mit Artikelzahl sowie Prüfhinweise nach Teileart für Ihre Fahrzeug- und Teilefrage.",
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
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogCategoriesQuery()),
  component: Index,
});

const COUNT = new Intl.NumberFormat("de-DE");

function Index() {
  const { data } = useSuspenseQuery(catalogCategoriesQuery());
  return (
    <NexifyShell brand="teileklar">
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
                    <a href="/teileklar/shop">Katalog</a>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li>
                    <span aria-current="page">Kategorien</span>
                  </li>
                </ol>
              </nav>
              <span className={"hc-kicker"}>
                TEILEKLAR<span aria-hidden="true"> / </span>Shop
              </span>
              <h1 id="shop-categories-title">Kategorien</h1>
            </div>
          </div>
        </section>
        <section className={"hc-container tkc-browser"} aria-labelledby="tkc-categories-title">
          <header className="tkc-results-head">
            <h2 id="tkc-categories-title">Katalog nach Kategorie</h2>
            <p className="tkc-results-count">
              {COUNT.format(data.total)} Artikel in {data.categories.length} Kategorien
            </p>
          </header>
          <ul className="tkc-category-grid" role="list">
            {data.categories.map((entry) => (
              <li key={entry.category}>
                <a href={`/teileklar/shop?kategorie=${encodeURIComponent(entry.category)}#katalog`}>
                  {entry.category}
                  <span>{COUNT.format(entry.product_count)} Artikel</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className={"hc-container pc-supplement tk-shop-body"}>
          <p className="tk-meta">
            Für Fahrzeugteile zählt die Passung. Wählen Sie eine Teileart, um die wichtigen Angaben
            für Ihre Anfrage vorzubereiten.
          </p>
          <FitmentChecklist />
        </section>
      </div>
    </NexifyShell>
  );
}
