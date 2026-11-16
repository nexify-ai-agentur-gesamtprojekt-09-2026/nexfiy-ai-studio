import { Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentPage } from "@/hooks/use-current-page";
import { useSiteTheme } from "@/lib/use-site-theme";

export function TeileklarHeader() {
  const here = useCurrentPage();
  const { light, toggleTheme } = useSiteTheme();
  return <header className="tk-commerce-header">
    <div className="tk-service-strip"><span>Auto &amp; Motorrad</span><a href="/teileklar/rechtliches">Versand &amp; Rückgabe</a><a href="/kontakt">Persönlicher Kontakt</a></div>
    <div className="tk-commerce-main">
      <a className="tk-wordmark" href="/teileklar">TEILE<span>KLAR</span><small>Passende Auswahl. Klare Angaben.</small></a>
      <form method="get" action="/teileklar/suche" role="search" className="tk-header-search">
        <label className="visually-hidden" htmlFor="store-search">Artikel, Marke oder Artikelnummer suchen</label>
        <input id="store-search" maxLength={120} placeholder="Artikel, Marke oder Artikelnummer" type="search" name="q" />
        <Button variant="brand" size="icon" type="submit" aria-label="Artikel suchen" title="Artikel suchen"><Search aria-hidden="true" /></Button>
      </form>
      <div className="tk-header-account"><a href="/konto">Mein Konto</a><a className="tk-header-cart" href="/teileklar/warenkorb">Warenkorb</a><Button className="theme-switch" variant="ghost" size="icon" role="switch" aria-checked={light} aria-label="Helle Ansicht" title={light ? "Dunkle Ansicht" : "Helle Ansicht"} onClick={toggleTheme}>{light ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}</Button></div>
    </div>
    <nav className="tk-commerce-nav" aria-label="Shopnavigation">{[
      ["/teileklar", "Schaufenster"], ["/teileklar/shop", "Alle Artikel"], ["/teileklar/kategorien", "Kategorien"], ["/teileklar/fahrzeug-und-passung", "Fahrzeugpassung"], ["/teileklar/werkstatt", "Werkstätten"], ["/teileklar/bestellungen", "Meine Bestellungen"],
    ].map(([path, title]) => path && <a key={path} href={path} {...here(path)}>{title}</a>)}</nav>
  </header>;
}