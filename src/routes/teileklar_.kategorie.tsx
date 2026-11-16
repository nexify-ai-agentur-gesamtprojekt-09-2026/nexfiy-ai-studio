import { createFileRoute } from "@tanstack/react-router";
import { NexifyShell } from "@/components/site/NexifyShell";
import { FitmentChecklist } from "@/components/site/FitmentChecklist";
import capturedCSS from "../styles/pages/teileklar.fahrzeug-und-passung.css?url";

export const Route = createFileRoute("/teileklar_/kategorie")({
  head: () => ({ links: [{ rel: "stylesheet", href: capturedCSS }], meta: [{ title: "Teilearten und Prüfhinweise · TEILEKLAR.shop" }, { name: "description", content: "Prüfhinweise nach Teileart: Bremsen, Batterie, Beleuchtung, Filter, Fahrwerk und Reifen." }, { property: "og:title", content: "Teilearten und Prüfhinweise · TEILEKLAR.shop" }, { property: "og:description", content: "Die passenden Fahrzeug- und Herstellerangaben für Ihre Teilefrage vorbereiten." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { name: "robots", content: "noindex" }] }),
  component: CategoryInformation,
});
function CategoryInformation() {
  return <NexifyShell brand="teileklar"><div className="home-concept page-concept tk-shop"><section className="identity-hero is-text-only"><div className="identity-scene"><div className="identity-copy"><span className="hc-kicker">TEILEKLAR / Teilearten</span><h1>Ähnliche Teile unterscheiden.</h1><p className="identity-body">Wählen Sie die Teileart für passende Prüfhinweise. Eine Artikelliste wird erst mit einem angebundenen Warenkatalog verfügbar.</p></div></div></section><section className="hc-container pc-supplement"><FitmentChecklist /></section></div></NexifyShell>;
}