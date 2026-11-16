# Server 1 (srv1243952): Freistellung und Überwachung

Eingerichtet 16.11.2026 als systemd-Timer unter dem Dienstbenutzer `nexifyworker` (keine Login-Shell, kein Root).

| Auftrag | Zeitplan | Datei |
| --- | --- | --- |
| Freistellung neuer Produktfotos | täglich 06:15 UTC (nach der Fotokopie) | `freistellung.py` |
| Überwachung nexifyai.de | alle 5 Minuten | `ueberwachung.py` |

## Zugriffsrechte
- Schlüssel `/etc/nexify-worker/token` (root:nexifyworker, 640), auf dem Server erzeugt. Die App kennt nur den SHA-256-Wert (`SERVER_WORKER_TOKEN_SHA256`); kein Geheimnis wurde übertragen.
- Der Schlüssel erlaubt genau: Liste offener Fotos lesen (`GET /api/public/shop/cutout`), Freistellung hochladen (`POST` dort, nur für das aktuelle Original), Meldung senden (`POST /api/public/jobs/server-alert`, Slack ohne Personendaten).
- Keine Datenbank-, Speicher-, Admin- oder Slack-Zugangsdaten auf dem Server. systemd: `NoNewPrivileges`, `ProtectSystem=strict`, Schreiben nur in `/opt/nexify-worker/state`.

## Abbruchbedingungen
- Freistellung: Schlüssel abgelehnt (401/403), 5 Fehler in Folge, höchstens 300 Fotos pro Lauf, Laufzeit max. 60 Min. Fotos ohne weißen Rand werden ausgelassen und gemerkt (nicht erneut versucht, solange das Original gleich bleibt).
- Überwachung: Meldung erst nach 2 Fehlläufen in Folge, einmal; Entwarnung bei Wiederherstellung. Laufzeit max. 60 s.
- Grenze: Ist nexifyai.de vollständig aus, scheitert auch die Slack-Meldung (sie läuft über die Website). Der Ausfall steht dann nur in `journalctl -u nexify-ueberwachung`.

## Rückweg
```
systemctl disable --now nexify-freistellung.timer nexify-ueberwachung.timer
```
Schlüssel sperren: Projekt-Geheimnis `SERVER_WORKER_TOKEN_SHA256` ändern – danach lehnt die Website den Server ab. Dateien bleiben erhalten (nichts wird gelöscht). Hochgeladene Freistellungen sind getrennt vom Original; das Original bleibt immer unverändert.

## Installation / Aktualisierung
Aus dem Projekt: `scripts/teileklar_cutout.py` und dieses Verzeichnis auf den Server kopieren, `bash install.sh` als root.
