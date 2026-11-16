#!/bin/bash
# NX-ORA-02 · Schritt 3 + 4 (freigegeben 16.11.2026 12:31 UTC). Auf Server 1 als root ausführen.
# Ändert nur Zeile 695 von nx-jeff-workloop. aufgaben.json bleibt unberührt.
set -euo pipefail
F=/usr/local/bin/nx-jeff-workloop
B=$F.bak-20261116-choices
# Vorprüfung: gibt es eine Freigabestufen-Begrenzung (A/B/C)? Nur anzeigen.
grep -niE 'stufe|freigabe|dry.?run|nur_lesen|readonly' "$F" || echo "KEINE Stufenbegrenzung gefunden -> nach erster Wahl anhalten"
systemctl is-active nx-jeff-workloop; journalctl -u nx-jeff-workloop -n 2 --no-pager -o short-iso
[ -e "$B" ] && { echo "Sicherung existiert bereits, Abbruch"; exit 1; }
cp -a "$F" "$B"
ALT='    choices = {t["id"]: f"{t['"'"'id'"'"']}: {t['"'"'titel'"'"']}" for t in offen}'
NEU='    choices = {t["id"]: f"{t['"'"'id'"'"']}: {t['"'"'titel'"'"']}" for t in [x for x in offen if not x["id"].startswith("MAIL-")][:240]}'
python3 - "$F" "$ALT" "$NEU" <<'P'
import sys; f,alt,neu=sys.argv[1:]; z=open(f).read().split("\n")
assert z[694]==alt, "Zeile 695 weicht ab, Abbruch"; z[694]=neu; open(f,"w").write("\n".join(z))
P
python3 -m py_compile "$F" && echo "py_compile OK" || { cp -a "$B" "$F"; echo "py_compile FEHLER, zurückgesetzt"; exit 1; }
diff "$B" "$F" || true
systemctl restart nx-jeff-workloop
# Ersten Zyklus abwarten, dann VOR einer Ausführung anhalten (keine Stufenbegrenzung vorhanden).
for i in $(seq 1 60); do
  if journalctl -u nx-jeff-workloop --since "-10min" --no-pager | grep -q 'NeXify waehlt'; then
    systemctl stop nx-jeff-workloop; echo "ANGEHALTEN nach erster Wahl"; break; fi; sleep 2; done
journalctl -u nx-jeff-workloop --since "-10min" --no-pager -o short-iso | tail -8
tail -n 2 /var/log/nexifyai/jeff-orakel.jsonl | cut -c1-200
# Rückweg: cp -a "$B" "$F" && systemctl restart nx-jeff-workloop
