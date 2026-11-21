import {
  SEITENGROESSE,
  type KatalogArtikel,
  type KatalogErgebnis,
  type KatalogSuche,
} from "@/lib/teileklar-katalog";

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

function shopLink(q: string, seite = 1) {
  const parameter = new URLSearchParams();
  if (q) parameter.set("q", q);
  if (seite > 1) parameter.set("seite", String(seite));
  return `/teileklar/shop${parameter.size ? `?${parameter}` : ""}`;
}

function Artikelbild({ artikel }: { artikel: KatalogArtikel }) {
  return artikel.bild ? (
    <div className="tk-image">
      <img src={artikel.bild} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
    </div>
  ) : null;
}

export function KatalogSchaufenster({ ergebnis }: { ergebnis: KatalogErgebnis }) {
  if (ergebnis.status !== "bereit" || !ergebnis.artikel.length) return null;
  return (
    <div className="tk-window-products" aria-label="Artikel im Schaufenster">
      {ergebnis.artikel.slice(0, 6).map((artikel) => (
        <a
          key={artikel.id}
          className="tk-window-product"
          href={shopLink(artikel.sku || artikel.name)}
        >
          <Artikelbild artikel={artikel} />
          <span>{artikel.name}</span>
          {artikel.preis !== null && <span>{euro.format(artikel.preis)}</span>}
        </a>
      ))}
    </div>
  );
}

export function KatalogListe({
  ergebnis,
  suche,
  sucheId,
}: {
  ergebnis: KatalogErgebnis;
  suche: KatalogSuche;
  sucheId: string;
}) {
  return (
    <>
      <form action="/teileklar/shop" method="get" role="search" className="tk-search">
        <label htmlFor={sucheId}>Artikel suchen (Name, SKU oder EAN)</label>
        <div className="tk-search-row">
          <input
            key={suche.q}
            id={sucheId}
            name="q"
            type="search"
            maxLength={120}
            defaultValue={suche.q}
          />
          <button type="submit" className="hc-finish-primary">
            Suchen
          </button>
        </div>
      </form>
      <section className="tk-catalog-list" aria-label="Produkte">
        {ergebnis.status === "nicht-verfuegbar" ? (
          <div className="tk-empty" role="alert">
            <p>Der Katalog ist gerade nicht abrufbar.</p>
            <a className="hc-text-link" href={shopLink(suche.q, suche.seite)}>
              Erneut versuchen
            </a>
          </div>
        ) : (
          <>
            <p className="tk-meta" role="status">
              {ergebnis.gesamt.toLocaleString("de-DE")} Artikel
            </p>
            {ergebnis.artikel.length ? (
              <div className="tk-grid">
                {ergebnis.artikel.map((artikel) => (
                  <article className="tk-card" key={artikel.id}>
                    <Artikelbild artikel={artikel} />
                    <h2 className="tk-card-name">{artikel.name}</h2>
                    {artikel.sku && <p className="tk-meta">Artikelnummer: {artikel.sku}</p>}
                    <p className="tk-price">
                      {artikel.preis === null ? "Preis im Shop prüfen" : euro.format(artikel.preis)}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="tk-empty">
                <p>Auf dieser Seite sind keine Artikel vorhanden.</p>
                <a href={shopLink(suche.q)}>Zur ersten Seite</a>
              </div>
            )}
            {(suche.seite > 1 || suche.seite * SEITENGROESSE < ergebnis.gesamt) && (
              <nav className="identity-links" aria-label="Katalogseiten">
                {suche.seite > 1 && (
                  <a href={shopLink(suche.q, suche.seite - 1)}>Vorherige Seite</a>
                )}
                {suche.seite < 500 && suche.seite * SEITENGROESSE < ergebnis.gesamt && (
                  <a href={shopLink(suche.q, suche.seite + 1)}>Nächste Seite</a>
                )}
              </nav>
            )}
          </>
        )}
        <p>
          <a href="https://teileklar.shop/" className="hc-text-link">
            Zum TEILEKLAR-Shop für Bestellung und Verfügbarkeit
          </a>
        </p>
      </section>
    </>
  );
}
