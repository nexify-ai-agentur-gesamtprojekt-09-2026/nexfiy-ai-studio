"""Nächtlicher Auftrag auf Server 1: neue Produktfotos freistellen und hochladen.

Rechte: Server-Schlüssel (/etc/nexify-worker/token) – darf nur die Liste offener Fotos lesen,
Freistellungen hochladen und Meldungen senden. Keine Datenbank-, Speicher- oder Admin-Rechte.
Abbruch: 401/403 (Schlüssel ungültig), 5 Fehler in Folge, oder 300 Fotos pro Lauf erreicht.
"""
import io, json, sys, time, urllib.error, urllib.parse, urllib.request
from pathlib import Path
sys.path.insert(0, "/opt/nexify-worker")
from PIL import Image
from teileklar_cutout import cutout

BASE = "https://nexifyai.de"
TOKEN = Path("/etc/nexify-worker/token").read_text().strip()
STATE = Path("/opt/nexify-worker/state/freistellung-ausgelassen.json")
MAX_PER_RUN = 300

def call(method, path, data=None, ctype=None, timeout=60):
    headers = {"Authorization": f"Bearer {TOKEN}", "User-Agent": "nexify-worker/1"}
    if ctype: headers["Content-Type"] = ctype
    req = urllib.request.Request(BASE + path, data=data, method=method, headers=headers)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()

def alert(stand, detail):
    try:
        call("POST", "/api/public/jobs/server-alert",
             json.dumps({"quelle": "freistellung", "stand": stand, "detail": detail[:300]}).encode(), "application/json", 20)
    except Exception as e:
        print("Meldung fehlgeschlagen:", e, file=sys.stderr)

def main():
    STATE.parent.mkdir(parents=True, exist_ok=True)
    skipped = json.loads(STATE.read_text()) if STATE.exists() else {}
    try:
        offen = json.loads(call("GET", "/api/public/shop/cutout"))["offen"]
    except urllib.error.HTTPError as e:
        alert("fehler", f"Liste nicht abrufbar (HTTP {e.code}); Lauf abgebrochen."); return 1
    todo = [o for o in offen if skipped.get(o["artikel"]) != o["quelle"]][:MAX_PER_RUN]
    ok = ausgelassen = 0; fehler_folge = 0; fehler = 0
    for o in todo:
        try:
            raw = call("GET", "/api/public/shop/image?" + urllib.parse.urlencode({"artikel": o["artikel"]}))
            tmp = Path("/tmp/nexify-cutout-src")
            Image.open(io.BytesIO(raw)).convert("RGB").save(tmp, "PNG")
            img, info = cutout(str(tmp))
            if img is None or not info["ok"]:
                skipped[o["artikel"]] = o["quelle"]; ausgelassen += 1; fehler_folge = 0; continue
            buf = io.BytesIO(); img.save(buf, "WEBP", quality=84, method=4)
            q = urllib.parse.urlencode({"artikel": o["artikel"], "quelle": o["quelle"]})
            call("POST", f"/api/public/shop/cutout?{q}", buf.getvalue(), "image/webp")
            ok += 1; fehler_folge = 0
        except urllib.error.HTTPError as e:
            if e.code in (401, 403):
                alert("fehler", "Server-Schlüssel abgelehnt; Lauf abgebrochen."); break
            fehler += 1; fehler_folge += 1
        except Exception as e:
            fehler += 1; fehler_folge += 1; print("Fehler", o["artikel"], e, file=sys.stderr)
        if fehler_folge >= 5:
            alert("fehler", f"5 Fehler in Folge; Lauf abgebrochen nach {ok} Freistellungen."); break
        time.sleep(0.3)
    STATE.write_text(json.dumps(skipped))
    print(json.dumps({"offen": len(offen), "bearbeitet": len(todo), "freigestellt": ok, "ausgelassen": ausgelassen, "fehler": fehler}))
    if fehler and fehler_folge < 5:
        alert("fehler", f"{ok} freigestellt, {ausgelassen} ausgelassen, {fehler} Fehler.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
