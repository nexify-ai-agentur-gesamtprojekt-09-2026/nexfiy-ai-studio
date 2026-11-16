import { useId, useState } from "react";
import { compareTyres, type TyreSize } from "@/lib/tyre-comparison";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const options = { width: Array.from({ length: 17 }, (_, index) => 155 + index * 10), aspect: Array.from({ length: 11 }, (_, index) => 30 + index * 5), rim: Array.from({ length: 10 }, (_, index) => 13 + index) };
const format = (value: number, digits = 1) => value.toLocaleString("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export function TyreCalculator() {
  const [current, setCurrent] = useState<TyreSize>({ width: 205, aspect: 55, rim: 16 });
  const [planned, setPlanned] = useState<TyreSize>({ width: 225, aspect: 45, rim: 17 });
  const id = useId();
  const result = compareTyres(current, planned);
  const fields = (label: string, size: TyreSize, setSize: (value: TyreSize) => void, prefix: string) => <fieldset className="tk-form-grid tk-tyre-size"><legend>{label}: {size.width}/{size.aspect} R{size.rim}</legend>{([
    ["width", "Breite (mm)"], ["aspect", "Höhe (%)"], ["rim", "Zoll"],
  ] as const).map(([key, text]) => <div className="tk-field" key={key}><label htmlFor={`${id}-${prefix}-${key}`}>{text}</label><Select value={String(size[key])} onValueChange={(value) => setSize({ ...size, [key]: Number(value) })}><SelectTrigger id={`${id}-${prefix}-${key}`} aria-label={`${label} ${text}`}><SelectValue /></SelectTrigger><SelectContent>{options[key].map((value) => <SelectItem value={String(value)} key={value}>{value}</SelectItem>)}</SelectContent></Select></div>)}</fieldset>;
  return <section className="tk-form" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>Reifenrechner</h2><p className="tk-meta">Nennmaße vergleichen. Keine Fahrzeugfreigabe oder Passungszusage.</p>
    {fields("Aktuelle Größe", current, setCurrent, "current")}{fields("Geplante Größe", planned, setPlanned, "planned")}
    {result && <dl className="tk-tyre-results" aria-live="polite" aria-atomic="true">{[
      ["Durchmesser", `${format(result.before)} mm → ${format(result.after)} mm`],
      ["Abrollumfang", `${format(result.circumferenceBefore, 0)} mm → ${format(result.circumferenceAfter, 0)} mm`],
      ["Abweichung", `${result.differencePercent >= 0 ? "+" : ""}${format(result.differencePercent, 2)} %`],
      ["Bodenfreiheit", `${result.clearance >= 0 ? "+" : ""}${format(result.clearance)} mm`],
      ["Rechnerisches Tempo bei bisher 100 km/h", `${format(result.speedAt100)} km/h`],
    ].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>}
    <p className="tk-note">Die Berechnung verwendet Nennmaße, keine gemessenen Reifendaten. Zulässigkeit, Tragfähigkeit, Geschwindigkeitsindex, Felgenbreite und Freigängigkeit müssen getrennt geprüft werden.</p>
  </section>;
}