"""Überwachung auf Server 1 (alle 5 Minuten): ruft vier Adressen von nexifyai.de ab.

Meldet per Slack erst nach 2 Fehlläufen in Folge und einmal bei Wiederherstellung, damit es
keine Meldungsflut gibt. Rechte: nur der Server-Schlüssel für die Meldung. Ist nexifyai.de ganz
aus, scheitert auch die Meldung – dann steht der Ausfall nur im Protokoll (journalctl -u nexify-ueberwachung).
"""
import json, sys, time, urllib.error, urllib.request
from pathlib import Path

BASE = "https://nexifyai.de"
CHECKS = [("/", 200), ("/kontakt", 200), ("/teileklar/shop", 200), ("/mcp", 401)]
STATE = Path("/opt/nexify-worker/state/ueberwachung.json")
TOKEN = Path("/etc/nexify-worker/token").read_text().strip()

def status(path):
    t = time.monotonic()
    try:
        with urllib.request.urlopen(urllib.request.Request(BASE + path, headers={"User-Agent": "nexify-monitor/1"}), timeout=15) as r:
            code = r.status
    except urllib.error.HTTPError as e:
        code = e.code
    except Exception:
        code = 0
    return code, round(time.monotonic() - t, 2)

def alert(stand, detail):
    req = urllib.request.Request(BASE + "/api/public/jobs/server-alert", method="POST",
        data=json.dumps({"quelle": "ueberwachung", "stand": stand, "detail": detail[:300]}).encode(),
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req, timeout=20).read(); return True
    except Exception as e:
        print("Meldung fehlgeschlagen:", e, file=sys.stderr); return False

def main():
    STATE.parent.mkdir(parents=True, exist_ok=True)
    s = json.loads(STATE.read_text()) if STATE.exists() else {"fehlfolge": 0, "gemeldet": False}
    res = {p: status(p) for p, _ in CHECKS}
    bad = [f"{p} → {res[p][0] or 'keine Antwort'}" for p, want in CHECKS if res[p][0] != want]
    print(json.dumps({"ergebnis": res, "fehler": bad}))
    if bad:
        s["fehlfolge"] += 1
        if s["fehlfolge"] >= 2 and not s["gemeldet"]:
            s["gemeldet"] = alert("fehler", "Ausfall: " + ", ".join(bad))
    else:
        if s["gemeldet"]:
            alert("wieder-ok", "Alle Prüfungen wieder in Ordnung.")
        s = {"fehlfolge": 0, "gemeldet": False}
    STATE.write_text(json.dumps(s))

if __name__ == "__main__":
    main()
