import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { workshopMapsUrl } from "@/lib/teileklar-search";

export function WorkshopSearch() {
  const [place, setPlace] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapsUrl = workshopMapsUrl(result);
  return <section className="hc-container pc-supplement tk-shop-body">
    <form className="tk-search" noValidate onSubmit={(event) => { event.preventDefault(); if (!workshopMapsUrl(place)) { setError(true); inputRef.current?.focus(); return; } setError(false); setResult(place.trim()); }}>
      <label htmlFor="workshop-place">PLZ oder Ort</label><div className="tk-search-row"><input ref={inputRef} id="workshop-place" name="place" autoComplete="address-level2" value={place} onChange={(event) => { setPlace(event.target.value); setResult(""); setError(false); }} required maxLength={80} aria-invalid={error} aria-describedby={error ? "workshop-error" : undefined} /><Button variant="brand" type="submit">Kartensuche vorbereiten</Button></div>
      {error && <p id="workshop-error" className="tk-alert" role="alert">Bitte geben Sie eine PLZ oder einen Ort ein.</p>}
    </form>
    <div role="status" className="tk-empty"><p>Ein eigenes Werkstattverzeichnis ist nicht angebunden. Die Kartensuche öffnet Google Maps erst nach Ihrem Klick; Termine vereinbaren Sie direkt mit dem Betrieb.</p><div className="tk-actions">
      {mapsUrl && <Button variant="glass" asChild><a href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" />Google Maps: {result}</a></Button>}
      <Button variant="ghost" asChild><a href="/teileklar/termine">Terminwunsch anfragen</a></Button>
    </div></div>
  </section>;
}