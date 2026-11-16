import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PwaInstallBar } from "./PwaInstallBar";

export function TeileklarFooter() {
  return <footer className="site-footer structured-footer footer-refined">
    <div className="footer-inner">
      <div className="footer-invitation"><div><h2>Welches Teil suchen Sie?</h2><p>Nennen Sie Fahrzeug, Teilenummer und Ihr Anliegen.</p></div><Button variant="brand" asChild><a href="/kontakt#anfrage">Anliegen beschreiben<ArrowRight aria-hidden="true" /></a></Button></div>
      <div className="footer-main"><div className="footer-brand-block"><a className="tk-wordmark" href="/teileklar">TEILE<span>KLAR</span></a><p>Teile, Fahrzeugfragen und Werkstattkontakte.</p></div><div className="footer-link-groups">
        <nav aria-label="Teile und Fahrzeug"><h2>Teile &amp; Fahrzeug</h2><a href="/teileklar/shop">Schaufenster</a><a href="/teileklar/suche">Teilesuche</a><a href="/teileklar/kategorien">Kategorien</a><a href="/teileklar/fahrzeug-und-passung">Fahrzeugpassung</a><a href="/teileklar/reifenrechner">Reifenrechner</a><a href="/teileklar/batterie-berater">Batterie-Hinweise</a></nav>
        <nav aria-label="Werkstatt und Konto"><h2>Werkstatt &amp; Konto</h2><a href="/teileklar/werkstatt">Werkstatt finden</a><a href="/teileklar/termine">Terminwunsch</a><a href="/teileklar/partner-werden">Partner werden</a><a href="/teileklar/gutscheine">Gutscheine</a><a href="/teileklar/bestellungen">Bestellungen</a><a href="/konto">Ihr Konto</a></nav>
        <nav aria-label="Rechtliches"><h2>Informationen</h2><a href="/teileklar/rechtliches">TEILEKLAR-Bedingungen</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/barrierefreiheit">Barrierefreiheit</a><a href="/kontakt">Kontakt</a></nav>
      </div></div>
      <div className="footer-bottom"><span className="footer-claim">TEILEKLAR — Na KLAR!</span><a className="footer-crosslink" href="/">NeXify AI →</a></div>
      <div className="footer-legal"><p>Vollständige Anbieter-, Datenschutz- und Kaufunterlagen stehen noch zur Prüfung und Freigabe.</p></div>
    </div>
    <PwaInstallBar />
  </footer>;
}