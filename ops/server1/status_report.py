"""Datensparsame Website-Zeilen für den vorhandenen täglichen Lagebericht, ohne Netzwerk oder Schlüssel."""
import json
from datetime import datetime, timezone
from pathlib import Path

CHECKS = [("/", 200), ("/kontakt", 200), ("/teileklar/shop", 200), ("/mcp", 401)]

def website_status(state, now):
    stamp = state.get("letzte_pruefung_utc")
    if not isinstance(stamp, str):
        return "OFFEN Website: kein aktueller Messnachweis. Owner: Server 1."
    try:
        at = datetime.fromisoformat(stamp)
        if at.tzinfo is None:
            raise ValueError("UTC-Zeit fehlt")
    except ValueError:
        return "OFFEN Website: ungültiger Messzeitpunkt. Owner: Server 1."
    age = (now - at).total_seconds()
    if age < 0 or age > 900:
        return "OFFEN Website: Messung älter als 15 Minuten oder unplausibel. Owner: Server 1; Überwachung prüfen."
    rows = state.get("ergebnis", {})
    parts = []
    healthy = True
    for path, want in CHECKS:
        row = rows.get(path)
        if not isinstance(row, list) or len(row) != 2 or not isinstance(row[0], int) or not isinstance(row[1], (int, float)):
            healthy = False
            parts.append(f"{path}: OFFEN")
            continue
        healthy = healthy and row[0] == want
        parts.append(f"{path}: {row[0] or 'keine Antwort'}/{row[1]:.2f}s")
    label = "IST Website OK" if healthy else "IST Website FEHLER/OFFEN"
    return f"{label} ({at:%Y-%m-%d %H:%M} UTC): " + ", ".join(parts) + ". Owner: Server 1."

def main():
    path = Path("/opt/nexify-worker/state/ueberwachung.json")
    if not path.exists():
        print("OFFEN Website: Überwachungsnachweis fehlt. Owner: Server 1.")
        return 1
    state = json.loads(path.read_text())
    print(website_status(state, datetime.now(timezone.utc)))
    print("Kosten: nicht gemessen; keine neue kostenpflichtige Verpflichtung. Freistellung 06:15 UTC; erster Nacht-Upload noch unbestätigt. Nächster Schritt: Laufnachweis und echtes iPhone (Pascal).")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())