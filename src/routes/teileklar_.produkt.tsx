import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { NexifyShell } from "@/components/site/NexifyShell";
import { CatalogImage } from "@/components/catalog/CatalogCard";
import { catalogProductQuery } from "@/lib/teileklar-catalog.queries";
import {
  availabilityLabel,
  catalogProductPath,
  formatPrice,
  germanDecimals,
  variantLabels,
} from "@/lib/teileklar-catalog";
import type { CatalogProduct } from "@/lib/teileklar-catalog.functions";
import capturedCSS from "../styles/pages/teileklar.shop.css?url";

interface ProductSearch {
  artikel?: string;
}

const DATE = new Intl.DateTimeFormat("de-DE", { dateStyle: "long", timeZone: "Europe/Berlin" });
const CONDITION: Record<string, string> = {
  NEW: "Neu",
  USED: "Gebraucht",
  REFURBISHED: "Aufbereitet",
};

export const Route = createFileRoute("/teileklar_/produkt")({
  validateSearch: (search: Record<string, unknown>): ProductSearch =>
    typeof search["artikel"] === "string" && search["artikel"].trim()
      ? { artikel: search["artikel"].trim().slice(0, 80) }
      : {},
  loaderDeps: ({ search }) => ({ id: search.artikel ?? "" }),
  loader: async ({ context, deps }) =>
    deps.id ? context.queryClient.ensureQueryData(catalogProductQuery(deps.id)) : null,
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} · TEILEKLAR.shop` : "Artikel · TEILEKLAR.shop";
    const description = loaderData
      ? `${loaderData.name}${loaderData.brand ? ` von ${loaderData.brand}` : ""}: Preis, Artikelnummer, EAN und Merkmale laut aktuellem TEILEKLAR-Katalog.`
      : "Artikelangaben aus dem TEILEKLAR-Katalog und die Angaben, die für eine Teilefrage benötigt werden.";
    return {
      links: [{ rel: "stylesheet", href: capturedCSS }],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: loaderData ? "product" : "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useLoaderDeps();
  return (
    <NexifyShell brand="teileklar">
      <div className="home-concept page-concept tk-shop">
        {id ? <ProductDetail id={id} /> : <ProductInformation />}
      </div>
    </NexifyShell>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="pc-breadcrumb hc-container" aria-label="Brotkrumennavigation">
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
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}

function ProductDetail({ id }: { id: string }) {
  const { data: product } = useSuspenseQuery(catalogProductQuery(id));
  if (!product) {
    return (
      <section className="hc-container tkc-browser">
        <Breadcrumb current="Artikel nicht gefunden" />
        <div className="tkc-empty" role="status">
          <h1>Dieser Artikel ist nicht im aktuellen Katalog.</h1>
          <p>
            Die Artikelnummer „{id}“ wurde nicht gefunden oder wird nicht mehr geführt. Suchen Sie
            im Katalog oder fragen Sie das Teil direkt an.
          </p>
          <div className="tk-actions">
            <a
              className="nexify-control primary-button"
              data-variant="primary"
              href={`/teileklar/shop?q=${encodeURIComponent(id)}#katalog`}
            >
              Im Katalog suchen
            </a>
            <a
              className="nexify-control secondary-button"
              data-variant="secondary"
              href={`/teileklar/suche?q=${encodeURIComponent(id)}#teilefrage`}
            >
              Teil anfragen
            </a>
          </div>
        </div>
      </section>
    );
  }
  const price = formatPrice(product.price_value);
  const specs = [
    { label: "Artikelnummer", value: product.id },
    ...(product.ean ? [{ label: "EAN", value: product.ean }] : []),
    ...(product.oe_number ? [{ label: "OE-Nummer", value: product.oe_number }] : []),
    ...(product.brand ? [{ label: "Marke", value: product.brand }] : []),
    ...(product.category ? [{ label: "Kategorie", value: product.category }] : []),
    ...product.specs
      .filter((spec) => spec.label !== "EAN" && spec.label !== "Zustand")
      .map((spec) => ({ label: spec.label, value: germanDecimals(spec.value) })),
    ...(product.condition
      ? [{ label: "Zustand", value: CONDITION[product.condition] ?? product.condition }]
      : []),
  ];
  const inquiry = `/teileklar/suche?q=${encodeURIComponent(`${product.name} (Artikel ${product.id})`)}#teilefrage`;
  return (
    <>
      <Breadcrumb current={product.name} />
      <section className="hc-container tkc-product" aria-labelledby="tkc-product-title">
        <CatalogImage id={product.id} path={product.image_path} alt={product.image_alt} eager />
        <div className="tkc-product-info">
          <span className="hc-kicker">
            {product.brand || "TEILEKLAR"}
            <span aria-hidden="true"> / </span>
            {product.category || "Katalog"}
          </span>
          <h1 id="tkc-product-title">{product.name}</h1>
          <p className="tkc-product-price">
            {price ?? "Preis auf Anfrage"}
            {price ? (
              <small>
                inkl. MwSt., zzgl. Versand · laut Katalog vom{" "}
                {DATE.format(new Date(product.synced_at))}
              </small>
            ) : null}
          </p>
          <ul className="tkc-badges" aria-label="Artikelstatus">
            <li>{availabilityLabel(product)}</li>
            {product.status_label ? <li>{product.status_label}</li> : null}
          </ul>
          {product.variants.length > 1 ? <VariantPicker product={product} /> : null}
          <div className="tk-actions">
            <a className="nexify-control primary-button" data-variant="primary" href={inquiry}>
              Diesen Artikel anfragen
            </a>
            <a
              className="nexify-control secondary-button"
              data-variant="secondary"
              href="/teileklar/shop#katalog"
            >
              Zurück zum Katalog
            </a>
          </div>
          <p className="tkc-notice">
            Bestellung und Bezahlung sind auf dieser Seite noch nicht freigeschaltet. Mit einer
            Anfrage klären wir Verfügbarkeit, Lieferzeit und Gesamtpreis. Ob der Artikel zu Ihrem
            Fahrzeug passt, bestätigt der Katalog nicht – nennen Sie dafür Ihre Fahrzeugdaten.
          </p>
          <h2 className="visually-hidden">Artikelmerkmale</h2>
          <dl className="tkc-specs">
            {specs.map((spec) => (
              <div key={spec.label} style={{ display: "contents" }}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

const COUNT = new Intl.NumberFormat("de-DE");

/** Ausführungen desselben Artikels; jede hat eine eigene Artikelseite, damit die Auswahl teilbar bleibt. */
function VariantPicker({ product }: { product: CatalogProduct }) {
  const labels = variantLabels(product.variants);
  return (
    <section className="tkc-variants" aria-labelledby="tkc-variants-title">
      <h2 id="tkc-variants-title">
        {COUNT.format(product.variants.length)} Ausführungen dieses Artikels
      </h2>
      <p>
        Jede Ausführung hat eine eigene Artikelnummer. Nennt der Katalog keine Größe, klären wir die
        passende Ausführung mit Ihrer Anfrage.
      </p>
      <ul role="list">
        {product.variants.map((variant) => {
          const current = variant.id === product.id;
          const price = formatPrice(variant.price_value);
          return (
            <li key={variant.id}>
              <a
                href={catalogProductPath(variant.id)}
                aria-current={current ? "page" : undefined}
                data-available={variant.stock > 0 || undefined}
              >
                <span className="tkc-variant-label">{labels.get(variant.id)}</span>
                <span className="tkc-variant-price">{price ?? "Preis auf Anfrage"}</span>
                <span className="tkc-variant-stock">{availabilityLabel(variant)}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ProductInformation() {
  return (
    <>
      <section className="identity-hero is-text-only">
        <div className="identity-scene">
          <div className="identity-copy">
            <span className="hc-kicker">TEILEKLAR / Artikel</span>
            <h1>Welchen Artikel suchen Sie?</h1>
            <p className="identity-body">
              Wählen Sie einen Artikel im Katalog, um Preis, Artikelnummer, EAN und Merkmale zu
              sehen. Ein Teil, das Sie dort nicht finden, können Sie direkt anfragen.
            </p>
          </div>
        </div>
      </section>
      <section className="hc-container pc-supplement tk-shop-body">
        <h2>Angaben für Ihre Teilefrage</h2>
        <ul className="tk-checklist">
          <li>Hersteller- oder Artikelnummer, sofern vorhanden</li>
          <li>Fahrzeugmodell, Motor, Baujahr und Schlüsselnummern</li>
          <li>Die benötigte Teileart und Ihre offene Frage</li>
        </ul>
        <div className="tk-actions">
          <a
            className="nexify-control primary-button"
            data-variant="primary"
            href="/teileklar/shop#katalog"
          >
            Zum Katalog
          </a>
          <a
            className="nexify-control secondary-button"
            data-variant="secondary"
            href="/teileklar/suche#teilefrage"
          >
            Teil anfragen
          </a>
        </div>
      </section>
    </>
  );
}
