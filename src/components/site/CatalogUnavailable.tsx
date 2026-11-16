import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { partInquiryPath } from "@/lib/teileklar-search";

/** No product backend exists in this copy; preserve searches as explicit inquiries. */
export function CatalogUnavailable() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("q")?.slice(0, 120) ?? "";
    setQuery(value);
    setSearched(value);
  }, []);
  return (
    <section className="hc-container pc-supplement tk-shop-body">
      <form
        className="tk-search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setSearched(query.trim());
          const url = new URL(window.location.href);
          if (query.trim()) url.searchParams.set("q", query.trim());
          else url.searchParams.delete("q");
          window.history.replaceState(null, "", url);
        }}
      >
        <label htmlFor="catalog-query">Artikel, Marke oder Artikelnummer</label>
        <div className="tk-search-row">
          <input
            id="catalog-query"
            name="q"
            maxLength={120}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSearched("");
            }}
          />
          <Button variant="brand" type="submit" disabled={!query.trim()}>
            <Search aria-hidden="true" />
            Angabe übernehmen
          </Button>
        </div>
      </form>
      <div className="tk-empty" role="status">
        <h2>Der Warenkatalog ist noch nicht angebunden.</h2>
        <p>
          {searched ? (
            <>
              Für „{searched}“ können hier noch keine Artikel oder Verfügbarkeiten abgerufen werden.
            </>
          ) : (
            "Artikel, Preise und Verfügbarkeiten lassen sich hier noch nicht abrufen."
          )}
        </p>
        <div className="tk-actions">
          <Button variant="brand" asChild>
            <a href={partInquiryPath(query)}>Teil anfragen</a>
          </Button>
          <Button variant="glass" asChild>
            <a href="/teileklar/fahrzeug-und-passung">Prüfhinweise</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
