"""Überwachung auf Server 1 (alle 5 Minuten): ruft vier Adressen von nexifyai.de ab.

Meldet per Slack erst nach 2 Fehlläufen in Folge und einmal bei Wiederherstellung, damit es
keine Meldungsflut gibt. Rechte: nur der Server-Schlüssel für die Meldung. Ist nexifyai.de ganz
aus, scheitert auch die Meldung – dann steht der Ausfall nur im Protokoll (journalctl -u nexify-ueberwachung).
"""
import json, sys, time, urllib.error, urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

BASE = "https://nexifyai.de"
CHECKS = [("/", 200), ("/kontakt", 200), ("/teileklar/shop", 200), ("/mcp", 401)]
STATE = Path("/opt/nexify-worker/state/ueberwachung.json")
TOKEN_FILE = Path("/etc/nexify-worker/token")

def status(path):
    t = time.monotonic()
    try:
        with urllib.request.urlopen(urllib.request.Request(BASE + path, headers={"User-Agent": "nexify-monitor/1"}), timeout=10) as r:
            code = r.status
    except urllib.error.HTTPError as e:
        code = e.code
    except Exception:
        code = 0
    return code, round(time.monotonic() - t, 2)

def alert(stand, detail):
    req = urllib.request.Request(BASE + "/api/public/jobs/server-alert", method="POST",
        data=json.dumps({"quelle": "ueberwachung", "stand": stand, "detail": detail[:300]}).encode(),
        headers={"Authorization": f"Bearer {TOKEN_FILE.read_text().strip()}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=8) as response:
            return json.loads(response.read()).get("ok") is True
    except Exception as e:
        print("Meldung fehlgeschlagen:", e, file=sys.stderr); return False

def update_state(s, res, notify):
    bad = [f"{p} → {res[p][0] or 'keine Antwort'}" for p, want in CHECKS if res[p][0] != want]
    if bad:
        s["fehlfolge"] = s.get("fehlfolge", 0) + 1
        if s["fehlfolge"] >= 2 and not s.get("gemeldet", False):
            s["gemeldet"] = notify("fehler", "Ausfall: " + ", ".join(bad))
    else:
        s["fehlfolge"] = 0
        if s.get("gemeldet", False):
            # Entwarnung erst nach bestätigter Zustellung abhaken, sonst erneut versuchen.
            if notify("wieder-ok", "Alle Prüfungen wieder in Ordnung."):
                s["gemeldet"] = False
    return bad

def main():
    STATE.parent.mkdir(parents=True, exist_ok=True)
    s = json.loads(STATE.read_text()) if STATE.exists() else {"fehlfolge": 0, "gemeldet": False}
    with ThreadPoolExecutor(max_workers=4) as pool:
        res = dict(zip((p for p, _ in CHECKS), pool.map(status, (p for p, _ in CHECKS))))
    bad = update_state(s, res, alert)
    now = datetime.now(timezone.utc)
    s["letzte_pruefung_utc"] = now.isoformat()
    s["ergebnis"] = res
    print(json.dumps({"ergebnis": res, "fehler": bad}))
    STATE.write_text(json.dumps(s))

if __name__ == "__main__":
    main()
