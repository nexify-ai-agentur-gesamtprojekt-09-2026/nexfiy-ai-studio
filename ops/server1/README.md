# Server 1 (srv1243952): Freistellung und Überwachung

Eingerichtet 16.11.2026 als systemd-Timer unter dem Dienstbenutzer `nexifyworker` (keine Login-Shell, kein Root).

| Auftrag | Zeitplan | Datei |
| --- | --- | --- |
| Freistellung neuer Produktfotos | täglich 06:15 UTC (nach der Fotokopie) | `freistellung.py` |
| Überwachung nexifyai.de | alle 5 Minuten | `ueberwachung.py` |
| Website-Status im bestehenden Lagebericht | vorhandener täglicher Timer `nexify-lagebericht.timer`, 06:45 UTC | `status_report.py` |

## Zugriffsrechte
- Schlüssel `/etc/nexify-worker/token` (root:nexifyworker, 640), auf dem Server erzeugt. Die App kennt nur den SHA-256-Wert (`SERVER_WORKER_TOKEN_SHA256`); kein Geheimnis wurde übertragen.
- Der Schlüssel erlaubt genau: Liste offener Fotos lesen (`GET /api/public/shop/cutout`), Freistellung hochladen (`POST` dort, nur für das aktuelle Original), Meldung senden (`POST /api/public/jobs/server-alert`, Slack ohne Personendaten).
- Der Benutzer `nexifyworker` besitzt keine Datenbank-, Speicher-, Admin- oder Slack-Zugangsdaten. Andere, bereits vorhandene Serverdienste haben ihren eigenen Slack-Helfer; dieser wurde weder gelesen noch kopiert. systemd: `NoNewPrivileges`, `ProtectSystem=strict`, Schreiben nur in `/opt/nexify-worker/state` und isoliertem `/tmp`.

## Abbruchbedingungen
- Freistellung: Schlüssel abgelehnt (401/403), 5 Fehler in Folge, höchstens 300 Fotos pro Lauf, Laufzeit max. 60 Min. Fotos ohne weißen Rand werden ausgelassen und gemerkt (nicht erneut versucht, solange das Original gleich bleibt).
- Überwachung: Meldung erst nach 2 Fehlläufen in Folge, einmal; Entwarnung bei Wiederherstellung. Laufzeit max. 60 s.
- Grenze: Ist nexifyai.de vollständig aus, scheitert auch die Slack-Meldung (sie läuft über die Website). Der Ausfall steht dann nur in `journalctl -u nexify-ueberwachung`.
- Der vorhandene Lagebericht nutzt den bereits vorhandenen unabhängigen Slack-Helfer des Servers; seine Website-Ergänzung liest ausschließlich Statuscodes, Antwortzeiten und Messzeitpunkt. Keine zusätzlichen Schlüssel, kein zusätzlicher Zeitplan. Eine Messung älter als 15 Minuten wird als OFFEN gemeldet, nicht als gesund.
- Überwachung: vier Abrufe parallel mit je 10 s Grenze; Meldung höchstens 8 s. Fehlgeschlagene Entwarnung bleibt offen und wird erneut versucht.

## Rückweg dieser Ergänzung
Vor Austausch liegen Zeitstempel-Sicherungen von `ueberwachung.py` und `/usr/local/bin/nexify-lagebericht.sh` in `/opt/nexify-worker/backups/20261116T094051Z/`. Alte Dateien zurückkopieren; die unveränderten Timer bleiben bestehen. Kein Schlüssel und keine Daten werden gelöscht.

## Rückweg
```
systemctl disable --now nexify-freistellung.timer nexify-ueberwachung.timer
```
Schlüssel sperren: Projekt-Geheimnis `SERVER_WORKER_TOKEN_SHA256` ändern – danach lehnt die Website den Server ab. Dateien bleiben erhalten (nichts wird gelöscht). Hochgeladene Freistellungen sind getrennt vom Original; das Original bleibt immer unverändert.

## Installation / Aktualisierung
Aus dem Projekt: `scripts/teileklar_cutout.py` und dieses Verzeichnis auf den Server kopieren, `bash install.sh` als root.
`status_report.py` wird vom bestehenden Lagebericht über `/opt/nexify-worker/venv/bin/python /opt/nexify-worker/status_report.py` aufgerufen. Der Bericht ist ein Aggregat, keine Abnahme, keine Umsatz- oder Kostenmessung. Erster neuer Freistellungs-Upload und echtes iPhone bleiben unbestätigt.

## Nachweise 16.11.2026
- 09:41 UTC: Überwachung `Result=success`, Website 200/200/200/401. Antwortzeiten 1,75/2,42/5,90/2,60 s.
- 09:41:29 UTC: bestehender Lagebericht `Result=success`, `ExecMainStatus=0`, Protokoll „Lagebericht zugestellt“. Ein nächster planmäßiger Versand ist noch nicht geprüft.
- Freistellungsprobelauf 09:41:34 UTC: 13 offene, bereits bewusst ausgelassene Bilder; 0 neue Bearbeitungen, 0 Uploads, 0 Fehler. Daher keine behauptete Upload-Abnahme.
- BigBuy: gesuchter Variablenfehler in den untersuchten Importprogrammen nicht reproduzierbar. Vorhandene Konfiguration kennt `BIGBUY_API_KEY`; dokumentierter 401 vom 09.11. ist HISTORIE, aktuelle Gültigkeit OFFEN. Pausierter alter Bestandslauf unverändert, keine Aktivierung, keine Bestellung.
- Ein neuer Server-Schlüssel, zusätzliche Agentenschleifen oder kostenpflichtige Verpflichtungen wurden nicht eingerichtet. Betriebskosten werden nicht aus Exit-Codes abgeleitet.
