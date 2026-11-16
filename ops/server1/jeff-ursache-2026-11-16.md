# NX-ORA-01 · Ursache „NeXify (Jeff) nicht erreichbar" (nur lesend, 16.11.2026, 12:25–12:40 UTC)

Zugang: SSH root, strikte Hostprüfung (Fingerabdruck am 16.11. bestätigt). Nichts geändert, kein Dienst angefasst, kein Orakel-Aufruf ausgelöst (das Orakel-Protokoll enthält die echten Aufrufe der Schleife; ein eigener Aufruf hätte eine Zeile angehängt). BigBuy unberührt.

## Ursache (IST)
**Konfigurations-/Datenproblem, kein Netzweg-, Authentifizierungs- oder Modellproblem.**
Die Schleife legt jede offene Aufgabe als Auswahloption an (`/usr/local/bin/nx-jeff-workloop`, Zeile 695). In `/opt/nexifyai/state/jeff-workloop/aufgaben.json` stehen 3.638 Aufgaben, davon 3.442 „offen“ (3.517 mit Präfix `MAIL-`, mutmaßlich aus `nexifyai-drip-campaign.py`). Der Router lehnt mehr als 255 Optionen ab:

- Beleg `/var/log/nexifyai/jeff-orakel.jsonl`, 2026-11-16T12:19:54Z: HTTP 422, Modell `openrouter/typesafe/jev-1.13`, Dauer 0,94 s, `"Dictionary should have at most 255 items after validation, not 3444"` (loc `questions.naechste.choice.criteria`).
- `frage()` wertet jedes Nicht-200 als „nicht verfügbar“ → `jeff()` liefert None → Zeile 718 schreibt „nicht erreichbar -> idle“. Die Meldung ist irreführend.
- Gegenprobe im selben Protokoll: Health-Aufrufe 2026-11-16T12:19:21Z und 12:24:27Z → HTTP 200, gleiches Endpunkt `127.0.0.1:20128/v1/systemone`, gleiches Modell. Router erreichbar, Schlüssel gültig, Modell vorhanden.
- Letzte 600 Einträge: 157 Schleifenaufrufe, alle 422; 210 Health-Aufrufe, alle 200.
- Korrektur der Zeitangabe: 12:18 war Ortszeit (CET) = 11:18 UTC. Erste „nicht erreichbar“-Zeile im Journal: 2026-11-14T18:14:48Z.

## Slack-Brücke (IST)
- DM-Kanal `D0C0XB8K9PH` → ORACLE `127.0.0.1:8891`, Poll 6 s, läuft seit 2026-11-15T05:05:53Z.
- Letzte verarbeitete Nachricht (`last_ts` in state.json): 2026-11-09T00:47:21Z. Seitdem keine neue Nachricht in dieser DM.
- Seit Neustart ein Fehler (DNS, 05:05:53Z). Erfolgreiche Abrufe werden nicht protokolliert → genauer letzter Abruf OFFEN; letzte Antwortzeile liegt außerhalb der Journal-Aufbewahrung, OFFEN.

## agentmemory (IST)
Pfadpräfix `/agentmemory/` auf `127.0.0.1:3111`, `Authorization: Bearer` mit `AGENTMEMORY_SECRET` aus `/etc/nexifyai/hermes.env`. GET `health`, `actions?limit=`, `memories?limit=` → 200. `search` ist kein GET (405) – Methode/Body OFFEN.

## Schritt 3 – Vorschlag (NICHT ausgeführt, Freigabe Pascal)
Datei `/usr/local/bin/nx-jeff-workloop`, Zeile 695:
```
alt: choices = {t["id"]: f"{t['id']}: {t['titel']}" for t in offen}
neu: choices = {t["id"]: f"{t['id']}: {t['titel']}" for t in [x for x in offen if not x["id"].startswith("MAIL-")][:240]}
```
(240 + 4 Sonderoptionen < 255). Mail-Aufgaben bleiben in der Datei unverändert, werden nur nicht zur Auswahl gestellt.
Ablauf: Sicherung `cp -a nx-jeff-workloop nx-jeff-workloop.bak-20261116-choices`, Änderung, `python3 -m py_compile`, `systemctl restart nx-jeff-workloop`, danach eine Journalzeile „NeXify waehlt: …“ als Beleg.
Rückweg: Sicherung zurückkopieren, Dienst neu starten.
Risiko: gering bis mittel – die Schleife beginnt danach wieder echte Arbeit (Codex-Läufe bis 30 min) an den 240 ältesten Nicht-Mail-Aufgaben; ob diese Ausführung gewollt ist, ist Pascals Entscheidung. Die Mail-Flut selbst (Quelle der 3.517 Einträge) wird damit nicht behoben.
