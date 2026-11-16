import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GUIDE_DESTINATIONS, guideDestination } from "@/lib/site-navigation";

export function GuideNavigation({
  initial,
  brand = "nexify",
}: {
  initial?: string;
  brand?: "nexify" | "teileklar";
}) {
  const entries =
    brand === "teileklar"
      ? GUIDE_DESTINATIONS.filter((entry) => entry.value.startsWith("teileklar-"))
      : GUIDE_DESTINATIONS;
  const [value, setValue] = useState(
    initial ?? (brand === "teileklar" ? "teileklar-selection" : "business-website"),
  );
  const id = useId();
  return (
    <div className="pc-guide-controls">
      <label htmlFor={id}>
        Welchen Bereich möchten Sie erkunden?
        <select id={id} value={value} onChange={(event) => setValue(event.target.value)}>
          {entries.map((entry) => (
            <option key={entry.value} value={entry.value}>
              {entry.label}
            </option>
          ))}
        </select>
      </label>
      <Button variant="glass" asChild>
        <a href={guideDestination(value)}>
          Bereich öffnen
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}
