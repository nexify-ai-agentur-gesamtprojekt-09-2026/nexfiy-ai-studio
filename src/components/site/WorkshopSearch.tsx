import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function WorkshopSearch() {
  const [place, setPlace] = useState("");
  const [result, setResult] = useState("");
  return <section className="hc-container pc-supplement tk-shop-body"><form className="tk-search" onSubmit={(event) => { event.preventDefault(); setResult(place.trim()); }}><label htmlFor="workshop-place">PLZ oder Ort</label><div className="tk-search-row"><input id="workshop-place" value={place} onChange={(event) => setPlace(event.target.value)} required maxLength={80} /><Button variant="brand" type="submit">Werkstätten suchen</Button></div></form><div role="status" className="tk-empty"><p>Ein Werkstattverzeichnis ist hier noch nicht angebunden. Sie können direkt in Karten suchen oder Ihren Terminwunsch anfragen.</p>{result && <Button variant="glass" asChild><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Kfz Werkstatt ${result}`)}`} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" />Werkstätten in {result} in Karten suchen</a></Button>}<Button variant="ghost" asChild><a href="/teileklar/termine">Terminwunsch anfragen</a></Button></div></section>;
}