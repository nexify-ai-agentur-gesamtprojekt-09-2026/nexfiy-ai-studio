import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PwaInstallBar } from "./PwaInstallBar";

export function TeileklarFooter() {
  return <footer className="site-footer structured-footer footer-refined">
    <div className="footer-inner">
      <div className="footer-invitation"><div><h2>Frage zu Fahrzeug oder Teil?</h2><p>Nennen Sie Fahrzeug, Teilenummer und Ihr Anliegen.</p></div><Button variant="brand" asChild><a href="/kontakt#anfrage">Anliegen beschreiben<ArrowRight aria-hidden="true" /></a></Button></div>
      <div className="footer-main"><div className="footer-brand-block"><a className="tk-wordmark" href="/teileklar">TEILE<span>KLAR</span></a><p>Teile, Fahrzeugfragen und Werkstattkontakte.</p></div><div className="footer-link-groups">
        <nav aria-label="Teile und Fahrzeug"><h2>Teile &amp; Fahrzeug</h2><a href="/teileklar/shop">Katalogstand</a><a href="/teileklar/suche">Teilefrage vorbereiten</a><a href="/teileklar/kategorien">Teilearten</a><a href="/teileklar/fahrzeug-und-passung">Prüfhinweise</a><a href="/teileklar/reifenrechner">Reifenrechner</a><a href="/teileklar/batterie-berater">Batterie-Hinweise</a></nav>
        <nav aria-label="Werkstatt und Kontakt"><h2>Werkstatt &amp; Kontakt</h2><a href="/teileklar/werkstatt">Externe Werkstattsuche</a><a href="/teileklar/termine">Terminwunsch</a><a href="/teileklar/partner-werden">Partnerschaft anfragen</a><a href="/teileklar/gutscheine">Gutschein-Hinweise</a><a href="/teileklar/bestellungen">Bestellverwaltung: Stand</a><a href="/konto">NeXify-Websitekonto</a></nav>
        <nav aria-label="Rechtliches"><h2>Informationen</h2><a href="/teileklar/rechtliches">TEILEKLAR-Bedingungen</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/barrierefreiheit">Barrierefreiheit</a><a href="/kontakt">Kontakt</a></nav>
      </div></div>
      <div className="footer-bottom"><span className="footer-claim">TEILEKLAR — Na KLAR!</span><a className="footer-crosslink" href="/">NeXify AI →</a></div>
      <div className="footer-legal"><p>Vollständige Anbieter-, Datenschutz- und Kaufunterlagen stehen noch zur Prüfung und Freigabe.</p></div>
    </div>
    <PwaInstallBar />
  </footer>;
}