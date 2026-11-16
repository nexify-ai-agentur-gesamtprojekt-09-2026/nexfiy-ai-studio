# BigBuy-Zugang, Freigaben und SSH-Stilllegung

Stand: 16.11.2026, 10:13 UTC. Auftrag: Pascal, 10:08 UTC.
Arbeitsablauf: Omni-Enterprise-Orchestrator, unabhängige Fachprüfung und eigene Gegenprüfung.

## Ergebnis

- **IST:** Beide VPS werden im bestehenden Hostinger-Zugang als `running` gemeldet. Abruf am 16.11., 10:10 UTC.
- **OFFEN:** Die aktuelle Gültigkeit des BigBuy-Zugangs ist **nicht festgestellt**. Es gab keinen authentifizierten BigBuy-Aufruf, keinen Importstart und keine Bestellung.
- **IST:** Der SSH-Versuch zu Server 1 wurde vor der Anmeldung durch die strikte Server-Vertrauensprüfung abgebrochen (Exit 255: `Host key verification failed`). Es fehlt ein unabhängig bestätigter Server-Hostschlüssel im aktuellen Arbeitsumfeld. Die Prüfung wurde nicht abgeschaltet.
- **IST:** Die vorhandene lokale private SSH-Datei hat aktuell Modus `0644`; die frühere geschützte temporäre Kopie ist nicht vorhanden. Nur Dateimetadaten wurden geprüft, keine Schlüsselwerte gelesen, kopiert, ausgegeben oder übertragen. Kein `chmod` ausgeführt.
- **IST:** `authorized_keys`, Serverdienste, Importprogramme, Zeitpläne, Rollen und Anbieterpakete wurden in diesem Auftrag nicht verändert.
- **SOLL:** Kostenpflichtige Schritte, automatische Wiederholungen, Import, Bestellungen, neue Zugangsfreischaltungen und vorzeitige SSH-Sperrungen bleiben ausgeschlossen.

## 1. BigBuy: sichere Prüfmethode und aktuelle Grenze

Die öffentliche, offizielle API-Referenz wurde um 10:12 UTC ohne Anmeldung mit HTTP 200 gelesen:
<https://api.bigbuy.eu/rest/doc.json>.

Sie beschreibt einen ausdrücklich dafür vorgesehenen Authentifizierungsstatus-Abruf:

| Umgebung | Einzelner Leseabruf |
| --- | --- |
| Produktion | `GET https://api.bigbuy.eu/rest/user/auth/status.json` |
| Sandbox | `GET https://api.sandbox.bigbuy.eu/rest/user/auth/status.json` |

**SOLL – Ablauf nach Beseitigung der Zugangsgrenzen:**
1. Ausschließlich Server 1 und das bereits vorhandene BigBuy-Geheimnis verwenden. Keine Schlüsselübermittlung an diesen Chat, keine neue Verbindung mit kopierten Credentials.
2. Produktions-/Sandbox-Zuordnung aus der wirksamen Konfiguration feststellen; nichts umschalten. Ein Sandbox-Erfolg ist kein Produktionsnachweis.
3. Vorher bestätigen, dass der einzelne Statusabruf vom vorhandenen Vertrag gedeckt ist und keine zusätzliche kostenpflichtige Verpflichtung auslöst. Ein Preis pro Abruf ist in der geprüften Referenz nicht angegeben: **OFFEN**, nicht als kostenlos behauptet.
4. Nur die dokumentierte Statusadresse ansprechen, maximal ein Abruf, 15 Sekunden Gesamtlaufzeit, TLS-Prüfung aktiv, keine Weiterleitungen und keine Wiederholung. Kein Importmodul starten oder importieren, keine Jobs anstoßen.
5. Authentifizierung nur innerhalb des Servers im Speicher; keine Schlüssel in Befehlsargumenten, Protokollen oder Dateien. Geheimnisse nicht ausgeben, nicht hashen und nicht an Diagnoseausgaben anhängen.
6. Nur UTC-Zeitpunkt, Umgebung, HTTP-Status, Dauer und einen geprüften Ergebniscode zurückgeben. Keine Rohantwort, Header, Kontodaten oder Schlüsselwerte ausgeben.

**Auswertung:** Die Referenz nennt für diesen Endpunkt 200, 404, 415 und 429. HTTP 200 mit passender Erfolgsantwort belegt die Annahme des Zugangs für diesen Statusabruf, **nicht** Katalog-, Foto-, Bestellrechte oder Nutzungsrechte. 401 bedeutet abgelehnte/fehlende Authentifizierung, nicht automatisch einen abgelaufenen Schlüssel; 403 kann eine Berechtigungsgrenze sein. 402 ist hier nicht dokumentiert und rechtfertigt weder Zahlung noch Tarifwechsel. Bei anderen Antworten, Weiterleitung, TLS-Fehler, Timeout oder ungeklärter Abrechnung abbrechen und OFFEN melden. Allgemeine HTTP-Semantik: <https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.2>.

**HISTORIE:** Ein 401 vom 09.11. und ein Entwurf zur Variablenanpassung beweisen keine aktuelle Ablehnung. Die vorherige Prüfung um 09:47 UTC konnte den angenommenen Variablenfehler nicht reproduzieren. Daher keine spekulative Korrektur des Importprogramms. Der alte Bestandsabgleich bleibt unberührt.

**Rückweg dieser Prüfung:** Keine Konfigurationsänderung nötig. Nach dem einmaligen Leseabruf endet der Prozess; Import und Zeitpläne bleiben unverändert. Providerseitige Zugriffsprotokolle sind mögliche Spuren auch eines Leseabrufs.

## 2. SSH: überarbeiteter Stilllegungsplan, nicht ausgeführt

### Warum der frühere Entwurf nicht ungeprüft ausgeführt werden darf

**HISTORIE:** Die Übersicht von 07:00 UTC und der Entwurf von 07:05 UTC beschreiben doppelte, vermeintlich zusammengeklebte und temporär benannte Einträge auf beiden Servern. Die frühere Übersicht ist erhalten; ihre 30-Tage-Zahlen sind in diesem Auftrag **nicht neu gemessen**. Aktueller Zeilenstand, tatsächlich wirksame Einschränkungen und Vollständigkeit der damaligen Logs bleiben OFFEN.

**SOLL:** Zusammengeklebte Zeilen nicht automatisch auftrennen. OpenSSH erwartet einen Schlüssel pro Zeile; ein angehängter zweiter Schlüssel kann bisher nur Kommentar bzw. unwirksamer Rest sein. Ein Zeilenumbruch würde ihn möglicherweise erstmals aktivieren, ohne Einschränkungen der ersten Zeile zu übernehmen. Ebenso kann das Entfernen der ganzen Zeile den ersten, funktionierenden Zugang sperren. Das ist keine harmlose Formatkorrektur. Quelle: <https://man.openbsd.org/OpenBSD-current/man8/sshd.8>.

### Vorläufige Entscheidungsliste

Alle Namen sind **historische Kommentare**, keine bestätigten Besitzer und keine sichere Identifikation eines einzelnen Schlüssels. Die Liste erteilt keine Stilllegungsfreigabe; aktuelle, eindeutige Zuordnung muss serverseitig erfolgen. Keine Schlüsselwerte oder Fingerabdrücke werden in diesem Bericht wiederholt.

| Historischer Kandidat | Bereich | Behandlung vor Einzelentscheidung |
| --- | --- | --- |
| `cowork-*` mit Datums-/Sitzungsbezug | Server 1/2, root | Besitzer, Zweck und aktuellen Einsatz klären; aktiv lassen |
| `cowork-deploy-ephemeral` | Server 1/2, root | Deployment-Abhängigkeiten klären; aktiv lassen |
| `cowork-teileklar-mobilefix-2026-09-01` | Server 2, root | Besitzer und Ersatzweg bestätigen; aktiv lassen |
| `composio-bench-suite-*` (zwei historisch erfasste Einträge) | Server 2, root | Benchmark-/Recovery-Rolle getrennt prüfen; aktiv lassen |
| `claude-code-session-20260726` mit angehängtem Eintrag | Server 1, root/nexify-admin | **Sperre für automatische Bearbeitung:** mögliche Rechteausweitung durch Auftrennen |
| RSA ohne Kommentar (zwei historisch erfasste Einträge) | Server 1, nexify-admin | Unbekannte Herkunft ist keine Stilllegungsfreigabe; aktiv lassen |
| Historische Duplikate `nexify-agents`, `cursor-cloud-agent`, `nexify-pc` | Server 1 | Nur nach Vergleich vollständiger Optionen/Schlüssel und laufender Referenzen; gleiches Schlüsselmaterial allein genügt nicht |

**Nicht zur Stilllegung vorgeschlagen:** Inhaberzugang, Server-zu-Server-Verbindungen, Backup-/Recovery-Zugänge, laufende Administratorverbindungen, `dsh-local-mac-nex2fly-rot` und eingeschränktes `aifly-vercel`. Auch diese Zuordnungen sind vor Änderungen aktuell zu bestätigen. Kein Name oder fehlender Logtreffer ist allein ein Sicherheits- oder Entbehrlichkeitsbeweis.

### Vorbedingungen für jede spätere Änderung

1. Server 1 und Server 2 getrennt behandeln. Aktuelle wirksame `AuthorizedKeysFile`/`AuthorizedKeysCommand`, Konten, `Match`-Regeln und Dateieinschränkungen lesen. Hostinger-Kontoschlüssel sind nicht automatisch die effektiven Servereinträge; das Entfernen aus dem Hostingkonto ersetzt keine serverseitige Stilllegung.
2. Aktuelle Einträge lokal auf dem jeweiligen Server eindeutig zuordnen und vollständige Optionen erhalten. Keine private Schlüsseldatei lesen oder transferieren. Protokollierte Nutzung nur zusammen mit belegtem Zeitraum/Logabdeckung bewerten; fehlende Treffer heißen nicht „unbenutzt“.
3. Pascal bestätigt **jeden konkreten Eintrag, Konto, Server und Zweck**. Unbekannte Inhaber oder fehlender Ersatzweg blockieren die Änderung.
4. Zwei unabhängig neu getestete Zugänge und der getestete Hostinger-Notfallzugang müssen funktionieren. Eine bloß offene alte SSH-Sitzung ist kein ausreichender Ersatztest. Die laufende Sitzung während Änderung und Nachprüfung offen halten.
5. Vorher je betroffener Datei eine unveränderliche, zeitgestempelte Sicherung **auf demselben Server** anlegen, unter einem geschützten Verzeichnis ohne Überschreiben vorhandener Sicherungen. Inhalt, Besitzer und Modus erhalten; Rücklesbarkeit vor Änderung prüfen. Keine Geheimnisse exportieren.
6. Nur den separat freigegebenen Eintrag aus der aktiven Datei archivieren. Keine Löschung aus der Sicherung, keine automatische Normalisierung, keine Optionenübernahme auf neue Zeilen, keine `sshd`-/Firewall-/Rollenänderung.
7. Nach genau einer Änderung: vollständige Datei und Rechte rücklesen, verbliebenen Zugang aus einer frischen zweiten Verbindung positiv testen; Stilllegung nur durch gezielten Negativtest als bestätigt melden, sofern der betreffende Besitzer diesen Test ohne Schlüsseltransfer ausführen kann. Fehlt der Negativtest, Status „aus aktiver Datei archiviert; Zugangsverweigerung nicht abschließend getestet“.
8. Server-zu-Server-Verbindung, Backup, Deployment und betroffene Jobs prüfen. Erst bei bestandener Nachprüfung nächste Einzeländerung. Bei einem Fehler sofort Rückweg; keine Folgeänderungen.

### Rückweg – jetzt nur vorbereitet

**OFFEN:** Aktuelle, serverseitige Sicherungen der betroffenen `authorized_keys` und ein getesteter SSH-Restore sind in diesem Auftrag nicht angelegt oder nachgewiesen. Die Sicherung der Überwachungsdateien von 09:40 UTC ist **keine SSH-Sicherung**.

Nach ausdrücklicher Freigabe wird für jede betroffene Datei die tatsächlich angelegte Sicherung und das aktive Ziel protokolliert. Ein Operator wählt diese beiden Pfade; der Rückweg ist dann:

```text
cp -a -- "$CONFIRMED_BACKUP_FILE" "$CONFIRMED_AUTHORIZED_KEYS_FILE"
```

Das ist eine Vorlage, **kein aktuell ausführbarer Befehl**: Variablen müssen auf dem Server auf die vorher geprüften, realen Pfade gesetzt sein. Nie einen vermuteten Backupnamen verwenden. Vorhandene aktive Datei zunächst im gleichen geschützten Sicherungsverzeichnis archivieren, dann Original mit Modus/Besitzer zurückkopieren. Aus neuer Verbindung erneut anmelden und wirksame Einschränkungen prüfen. Kein SSH-Daemon-Neustart notwendig; bei verlorener Verbindung den vorher getesteten Hostinger-Notfallzugang verwenden. In diesem Auftrag wurde keiner dieser Schritte ausgeführt.

**Abbruchbedingungen:** unbekannter Server-Hostschlüssel, ungeschützte private Zugangsdatei, unklarer Schlüsselbesitzer, neue Aktivierung durch Formatänderung, Verlust von Optionen, fehlende aktuelle Sicherung, ungetesteter Notfall-/Ersatzweg, unerwartete Dateiveränderung während Bearbeitung oder fehlgeschlagener Funktionstest.

## 3. Noch benötigte Freigaben und Nachweise

| Punkt | Wer / nächster Schritt | Kosten und Grenze | Link |
| --- | --- | --- | --- |
| Server-Vertrauensnachweis | Pascal/Serververantwortlicher: öffentlichen SSH-Hostschlüssel über bestehende vertrauenswürdige Hostinger-Konsole bestätigen; keine privaten Schlüssel senden | Keine neue Verpflichtung; keine unbestätigte Vertrauensübernahme | <https://hpanel.hostinger.com/> |
| Geschützte lokale SSH-Nutzung | Frühere Freigabe „Datei lokal schützen“ vom 16.11., 09:33 UTC existiert; vor weiterer Nutzung sicheren bestehenden Zugang herstellen, ohne Secret-Transfer. In diesem Lauf nicht ausgeführt | Keine erneute Freigabe behauptet; aktuelle geschützte Datei fehlt | <https://hpanel.hostinger.com/> |
| BigBuy-Statusabruf | Bestehender Auftrag erlaubt lesende Prüfung; es fehlt kein neuer Importauftrag, sondern sicherer Serverzugang und Bestätigung des bereits gedeckten Kostenrahmens | Betrag pro Abruf **OFFEN**; kein Paketkauf, Upgrade oder Schlüsseltransfer | <https://www.bigbuy.eu/> |
| Importstart / Fotoübernahme | Separater Auftrag erst nach gültigem Produktionszugang; Datenumfang, Zielmandant, Foto-/Weiterverwendungsrechte und Rückweg festlegen | **Nicht freigegeben**; API-Erfolg ist keine Nutzungsrechtefreigabe | <https://www.bigbuy.eu/> |
| SSH-Stilllegung | Pascal: konkrete serverseitig identifizierte Einträge einzeln bestätigen, nach Ersatz-/Notfalltest und Sicherung | **Nicht freigegeben**; alle bisherigen Zugänge bleiben aktiv | <https://hpanel.hostinger.com/> |
| Mailabsender | Pascal: bestehenden Einrichtungsdialog bestätigen, Domain und vorhandenen Kostenrahmen festlegen | Domain laut früherer Abfrage nicht eingerichtet; nicht neu gemessen; kein Tarifwechsel | <https://lovable.dev/> |
| ORACLE/MCP | Pascal: eigene Verbindungskarte in der jeweiligen Anwendung bestätigen | Historisch abgebrochen; in diesem Lauf keine Verbindung hinzugefügt | <https://chatgpt.com/> |
| Produktfotoanfrage | Pascal: Empfänger und Nutzungsrechte bestätigen; bestehender Entwurf bleibt unversendet | Keine Veröffentlichung ungeklärter Fotos, kein Versand | <https://www.bigbuy.eu/> |
| Shop-Domain / Livezahlung | Pascal: getrennte Shop-Abnahme, mindestens 3720 Produkte, Livezahlung und erfolgreiche Testbestellung | Weiterhin gesperrt bis Abnahme; keine Umschaltung | <https://teileklar.shop/> |
| Echtes iPhone | Pascal: bestehende veröffentlichte Seite auf echtem Gerät prüfen | Kein Zugang oder kostenpflichtiger Dienst nötig | <https://nexifyai.de/> |

**Zeitabhängig, keine neue Freigabe:** Echter Nachtlauf, Lagebericht und erster neuer Foto-Upload nach dem 17.11. sind separat nachzumessen. Keine Nachprüfung oder Chat-Neustart nach Ende dieses Auftrags zugesagt.

## 4. Prüfbelege und Grenzen

- Hostinger-Leseabruf: 16.11., 10:10 UTC, zwei VPS `running`, bestehende private Verbindung. Das belegt den Hostingzustand, keinen SSH- oder BigBuy-Zugriff.
- Lokale Dateimetadaten und fehlende Vertrauensdateien: 10:09–10:11 UTC. Keine privaten Inhalte gelesen.
- Strikter SSH-Verbindungsversuch: 10:11 UTC, Exit 255, vor Anmeldung abgebrochen. Kein Serverbefehl ausgeführt.
- Öffentliche BigBuy-Referenz: 10:12 UTC, HTTP 200, Statusendpunkt und Antwortcodes selbst gegen Fachprüfung abgeglichen. Kein authentifizierter Zugriff.
- Früherer SSH-Plan/Übersicht und Lieferbericht: als HISTORIE gelesen, nicht als aktuelle Serverinventur ausgegeben. Originale erhalten.
- Die Monorepo-Werkzeuge `tools/project_skills.py`, `config/project-skills.json`, `tools/context_executor.py` fehlen in diesem tatsächlichen TanStack-Projekt. Deshalb kein entsprechender Verify-/Context-Test behauptet oder ersetzt.
- Nur Dokumentation/Roadmap geändert, keine Anwendung, keine Migration und kein Serverprogramm. Kein neuer Funktionstest der Website, kein Deployment, keine Tests außer den beschriebenen Lese-/Vertrauensprüfungen notwendig oder behauptet. Letztes vorhandenes Vorschausignal: `build OK` um 10:09:47 UTC.
- Keine Käufe, Bestellungen, Abonnements oder Tarifwechsel ausgelöst. Tatsächliche Gebühren bestehender Anbieter sind nicht gemessen; „0 Kosten“ wird daraus nicht abgeleitet.

## Nächster Schritt

Zuerst den Server-Hostschlüssel über einen bestehenden vertrauenswürdigen Hostinger-Zugang bestätigen und geschützte SSH-Nutzung herstellen. Dann genau einen gedeckten BigBuy-Statusabruf durchführen. Danach erst die aktuelle SSH-Entscheidungsliste und Sicherungen auf dem jeweiligen Server erzeugen; **jede Stilllegung benötigt Pascals Einzelbestätigung**.