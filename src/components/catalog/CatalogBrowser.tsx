import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogCard } from "./CatalogCard";
import { partInquiryPath } from "@/lib/teileklar-search";
import type { CatalogCategory, CatalogListResult } from "@/lib/teileklar-catalog.functions";

function shopHref(params: { q?: string; kategorie?: string; seite?: number }) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.kategorie) search.set("kategorie", params.kategorie);
  if (params.seite && params.seite > 1) search.set("seite", String(params.seite));
  const query = search.toString();
  return `/teileklar/shop${query ? `?${query}` : ""}#katalog`;
}

const COUNT = new Intl.NumberFormat("de-DE");

/** Katalogansicht mit Suche, Kategorien, Trefferliste und Seiten; arbeitet mit normalen Links, damit jede Ansicht teilbar bleibt. */
export function CatalogBrowser({ result, categories }: { result: CatalogListResult; categories: CatalogCategory[] }) {
  const { q, category, page, pages, total, items } = result;
  const first = total === 0 ? 0 : (page - 1) * 24 + 1;
  const last = Math.min(total, page * 24);
  return (
    <section className="hc-container tkc-browser" id="katalog" aria-labelledby="tkc-results-title" tabIndex={-1}>
      <form className="tkc-search" role="search" method="get" action="/teileklar/shop">
        <label htmlFor="tkc-query">Artikel, Marke, Artikelnummer oder EAN</label>
        <div className="tkc-search-row">
          <input id="tkc-query" name="q" type="search" maxLength={80} defaultValue={q} placeholder="z. B. Eiskratzer, Warnweste, 8435527823900" />
          {category ? <input type="hidden" name="kategorie" value={category} /> : null}
          <Button variant="brand" type="submit"><Search aria-hidden="true" />Suchen</Button>
        </div>
      </form>

      <nav className="tkc-categories" aria-label="Kategorien">
        <a href={shopHref({ q })} aria-current={!category ? "true" : undefined}>Alle Kategorien</a>
        {categories.map((entry) => (
          <a key={entry.category} href={shopHref({ q, kategorie: entry.category })} aria-current={category === entry.category ? "true" : undefined}>
            {entry.category}<span>{COUNT.format(entry.product_count)}</span>
          </a>
        ))}
      </nav>

      <header className="tkc-results-head">
        <h2 id="tkc-results-title">
          {q ? <>Treffer für „{q}“</> : category ? category : "Alle Artikel"}
        </h2>
        <p className="tkc-results-count" role="status">
          {total === 0 ? "Keine Artikel gefunden" : `${COUNT.format(first)}–${COUNT.format(last)} von ${COUNT.format(total)} Artikeln`}
          {q || category ? <> · <a href={shopHref({})}>Filter zurücksetzen</a></> : null}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="tkc-empty">
          <h3>{q ? <>Für „{q}“ gibt es im aktuellen Katalog keinen Treffer.</> : "In dieser Auswahl gibt es keine Artikel."}</h3>
          <p>Prüfen Sie die Schreibweise oder suchen Sie nach Artikelnummer oder EAN. Ein gesuchtes Teil können Sie auch direkt anfragen.</p>
          <div className="tk-actions">
            <a className="nexify-control primary-button" data-variant="primary" href={`/teileklar/suche?q=${encodeURIComponent(q)}#teilefrage`}>Teil anfragen</a>
            <a className="nexify-control secondary-button" data-variant="secondary" href={partInquiryPath(q)}>Persönlich nachfragen</a>
          </div>
        </div>
      ) : (
        <ul className="tkc-grid" role="list">
          {items.map((item) => <li key={item.id}><CatalogCard item={item} /></li>)}
        </ul>
      )}

      {pages > 1 ? (
        <nav className="tkc-pagination" aria-label="Seiten">
          {page > 1 ? <a href={shopHref({ q, kategorie: category, seite: page - 1 })} rel="prev">Zurück</a> : <span aria-disabled="true">Zurück</span>}
          <span className="tkc-page-status">Seite {page} von {pages}</span>
          {page < pages ? <a href={shopHref({ q, kategorie: category, seite: page + 1 })} rel="next">Weiter</a> : <span aria-disabled="true">Weiter</span>}
        </nav>
      ) : null}

      <p className="tkc-legal">Preise laut aktuellem TEILEKLAR-Katalog, inklusive Mehrwertsteuer, zuzüglich Versand. Bestellung und Bezahlung sind auf dieser Seite noch nicht freigeschaltet; Artikel können Sie unverbindlich anfragen. Angaben zur Fahrzeugpassung bestätigt der Katalog nicht.</p>
    </section>
  );
}
