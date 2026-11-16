import { createFileRoute, type ErrorComponentProps } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NexifyShell } from "@/components/site/NexifyShell";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { catalogCategoriesQuery, catalogListQuery } from "@/lib/teileklar-catalog.queries";
import {
  DEFAULT_CATALOG_SORT,
  normalizeCatalogQuery,
  normalizeCatalogSort,
  normalizePage,
  type CatalogSort,
} from "@/lib/teileklar-catalog";
import capturedCSS from "../styles/pages/teileklar.shop.css?url";

interface ShopSearch {
  q?: string;
  kategorie?: string;
  seite?: number;
  sortierung?: CatalogSort;
}

const TITLE = "Katalog Auto & Motorrad · TEILEKLAR.shop";
const DESCRIPTION =
  "Aktueller TEILEKLAR-Katalog: Artikel nach Name, Marke, Artikelnummer oder EAN finden, nach Kategorie filtern und unverbindlich anfragen.";

export const Route = createFileRoute("/teileklar_/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const q = normalizeCatalogQuery(search["q"]);
    const kategorie =
      typeof search["kategorie"] === "string" ? search["kategorie"].slice(0, 120) : "";
    const seite = normalizePage(search["seite"]);
    const sortierung = normalizeCatalogSort(search["sortierung"]);
    return {
      ...(q ? { q } : {}),
      ...(kategorie ? { kategorie } : {}),
      ...(seite > 1 ? { seite } : {}),
      ...(sortierung !== DEFAULT_CATALOG_SORT ? { sortierung } : {}),
    };
  },
  loaderDeps: ({ search }) => ({
    q: search.q ?? "",
    category: search.kategorie ?? "",
    page: search.seite ?? 1,
    sort: search.sortierung ?? DEFAULT_CATALOG_SORT,
  }),
  loader: async ({ context, deps }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(catalogListQuery(deps)),
      context.queryClient.ensureQueryData(catalogCategoriesQuery()),
    ]);
  },
  head: () => ({
    links: [{ rel: "stylesheet", href: capturedCSS }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
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
  errorComponent: CatalogError,
  component: Index,
});

const COUNT = new Intl.NumberFormat("de-DE");
const DATE = new Intl.DateTimeFormat("de-DE", { dateStyle: "long", timeZone: "Europe/Berlin" });

function Hero({ total, syncedAt }: { total?: number; syncedAt?: string | null }) {
  return (
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
                <span aria-current="page">Katalog</span>
              </li>
            </ol>
          </nav>
          <span className={"hc-kicker"}>
            TEILEKLAR<span aria-hidden="true"> / </span>Katalog
          </span>
          <h1 id="shop-catalog-title">Artikel finden. Klar angefragt.</h1>
          {total ? (
            <p className="identity-body">
              {COUNT.format(total)} Artikel im aktuellen Katalog
              {syncedAt ? `, Stand ${DATE.format(new Date(syncedAt))}` : ""}. Suchen Sie nach Name,
              Marke, Artikelnummer oder EAN und fragen Sie einen Artikel unverbindlich an.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Index() {
  const deps = Route.useLoaderDeps();
  const { data: result } = useSuspenseQuery(catalogListQuery(deps));
  const { data: overview } = useSuspenseQuery(catalogCategoriesQuery());
  return (
    <NexifyShell brand="teileklar">
      <div className={"home-concept page-concept tk-shop"}>
        <Hero total={overview.total} syncedAt={overview.syncedAt} />
        <CatalogBrowser result={result} categories={overview.categories} />
      </div>
    </NexifyShell>
  );
}

function CatalogError({ error, reset }: ErrorComponentProps) {
  // Technische Details gehören ins Protokoll, nicht vor Besucher.
  console.error("teileklar catalog unavailable", error);
  return (
    <NexifyShell brand="teileklar">
      <div className={"home-concept page-concept tk-shop"}>
        <Hero />
        <section className="hc-container tkc-browser">
          <div className="tkc-empty" role="alert">
            <h2>Der Katalog ist gerade nicht erreichbar.</h2>
            <p>
              Bitte laden Sie die Seite in einem Moment erneut. Ein gesuchtes Teil können Sie
              jederzeit direkt anfragen.
            </p>
            <div className="tk-actions">
              <button
                type="button"
                className="nexify-control primary-button"
                data-variant="primary"
                onClick={reset}
              >
                Erneut laden
              </button>
              <a className="hc-text-link" href="/teileklar/suche#teilefrage">
                Teil direkt anfragen
              </a>
            </div>
          </div>
        </section>
      </div>
    </NexifyShell>
  );
}
