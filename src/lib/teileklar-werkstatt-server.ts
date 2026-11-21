import { createServerFn } from "@tanstack/react-start";
import {
  sucheWerkstaetten,
  type Ort,
  type Werkstatt,
  type WerkstattSuche,
} from "./teileklar-werkstatt";
import orteJson from "./teileklar-werkstattdaten/geonames-orte.json?raw";
import betriebeJson from "./teileklar-werkstattdaten/osm-werkstaetten.json?raw";

const orte: Ort[] = JSON.parse(orteJson);
const betriebe: Werkstatt[] = JSON.parse(betriebeJson);

function validate(value: unknown): WerkstattSuche {
  if (!value || typeof value !== "object") return { q: "", radius: 0 };
  const { q, radius } = value as Record<string, unknown>;
  return {
    q: typeof q === "string" && q.length <= 80 ? q : "",
    radius: typeof radius === "number" ? radius : 0,
  };
}

export const getTeileklarWerkstaetten = createServerFn({ method: "POST" })
  .validator(validate)
  .handler(({ data }) => sucheWerkstaetten(data, orte, betriebe));
