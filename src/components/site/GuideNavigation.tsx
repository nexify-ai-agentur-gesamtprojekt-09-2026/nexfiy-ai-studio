import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GUIDE_DESTINATIONS, guideDestination } from "@/lib/site-navigation";

export function GuideNavigation({ initial = "business-website" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  const id = useId();
  return <div className="pc-guide-controls">
    <label htmlFor={id}>Welchen Bereich möchten Sie erkunden?
      <select id={id} value={value} onChange={(event) => setValue(event.target.value)}>
        {GUIDE_DESTINATIONS.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}
      </select>
    </label>
    <Button variant="glass" asChild><a href={guideDestination(value)}>Bereich öffnen<ArrowRight aria-hidden="true" /></a></Button>
  </div>;
}