import { Search, Sun, Moon, Menu, UserRound, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentPage } from "@/hooks/use-current-page";
import { useSiteTheme } from "@/lib/use-site-theme";
import { useHeaderMenus } from "@/lib/imported-site";

export function TeileklarHeader() {
  const here = useCurrentPage();
  const { light, toggleTheme } = useSiteTheme();
  const menu = useHeaderMenus();
  const navigation = <nav className="tk-commerce-nav" aria-label="Shopnavigation">{[
    ["/teileklar", "TEILEKLAR"], ["/teileklar/shop", "Katalog"], ["/teileklar/kategorien", "Teilearten"], ["/teileklar/fahrzeug-und-passung", "Prüfhinweise"], ["/teileklar/werkstatt", "Werkstattsuche"], ["/teileklar/termine", "Terminwunsch"],
  ].map(([path, title]) => path && <a key={path} href={path} {...here(path)}>{title}</a>)}</nav>;
  return <header className="tk-commerce-header">
    <div className="tk-service-strip"><span>Auto &amp; Motorrad</span><a href="/teileklar/rechtliches">Rechtliche Hinweise</a><a href="/kontakt">Persönlicher Kontakt</a></div>
    <div className="tk-commerce-main">
      <a className="tk-wordmark" href="/teileklar">TEILE<span>KLAR</span><small>Fahrzeug. Teile. Klare Angaben.</small></a>
      <form method="get" action="/teileklar/shop" role="search" className="tk-header-search">
        <label className="visually-hidden" htmlFor="store-search">Katalog durchsuchen: Artikel, Marke, Artikelnummer oder EAN</label>
        <input id="store-search" maxLength={80} placeholder="Artikel, Marke oder Artikelnummer" type="search" name="q" />
        <Button variant="brand" size="icon" type="submit" aria-label="Katalog durchsuchen" title="Katalog durchsuchen"><Search aria-hidden="true" /></Button>
      </form>
      <div className="tk-header-account"><Button asChild variant="ghost" size="icon"><a href="/konto" aria-label="NeXify-Websitekonto" title="NeXify-Websitekonto"><UserRound aria-hidden="true" /></a></Button><Button asChild variant="ghost" size="icon"><a href="/teileklar/warenkorb" aria-label="Warenkorb: noch nicht verfügbar" title="Warenkorb: noch nicht verfügbar"><ShoppingBag aria-hidden="true" /></a></Button><Button className="theme-switch" variant="ghost" size="icon" role="switch" aria-checked={light} aria-label="Helle Ansicht" title={light ? "Dunkle Ansicht" : "Helle Ansicht"} onClick={toggleTheme}>{light ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}</Button></div>
    </div>
    <div className="tk-desktop-nav">{navigation}</div>
    <details className="tk-mobile-nav" open={menu.openMenu === "mobile"}><summary ref={menu.mobileSummary} aria-expanded={menu.openMenu === "mobile"} aria-label="Shopmenü" title="Shopmenü" onClick={menu.toggleMenu("mobile")}><Menu aria-hidden="true" /></summary>{navigation}</details>
  </header>;
}