import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { Button } from "@/components/ui/button";
import capturedCSS from "../styles/pages/teileklar.shop.css?url";

export const Route = createFileRoute("/teileklar_/produkt")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Artikelinformationen · TEILEKLAR.shop" }, { name: "description", content: "Welche Artikelangaben für eine Anfrage und die Prüfung der Fahrzeugpassung benötigt werden." }, { property: "og:title", content: "Artikelinformationen · TEILEKLAR.shop" }, { property: "og:description", content: "Artikelnummer, Fahrzeugdaten und Herstellerangaben für eine gezielte Teileanfrage." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: ProductInformation,
});
function ProductInformation() {
  return <NexifyShell brand="teileklar"><div className="home-concept page-concept tk-shop"><section className="identity-hero is-text-only"><div className="identity-scene"><div className="identity-copy"><span className="hc-kicker">TEILEKLAR / Artikel</span><h1>Welchen Artikel suchen Sie?</h1><p className="identity-body">Hier ist noch kein Warenkatalog angebunden. Deshalb können wir keinen Artikel mit Preis, Bestand oder Passungsdaten anzeigen.</p></div></div></section><section className="hc-container pc-supplement tk-shop-body"><h2>Angaben für Ihre Teilefrage</h2><ul className="tk-checklist"><li>Hersteller- oder Artikelnummer, sofern vorhanden</li><li>Fahrzeugmodell, Motor, Baujahr und Schlüsselnummern</li><li>Die benötigte Teileart und Ihre offene Frage</li></ul><div className="tk-actions"><Button variant="brand" asChild><a href="/kontakt#anfrage">Teil anfragen</a></Button><Button variant="glass" asChild><a href="/teileklar/fahrzeug-und-passung">Passung vorbereiten</a></Button></div></section></div></NexifyShell>;
}