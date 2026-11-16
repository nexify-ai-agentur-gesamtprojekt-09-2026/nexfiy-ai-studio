# Slack und AIFly ORACLE – vorhandene Lösung erweitern

## Ziel und Grenzen
Auftrag Pascal, 16.11.2026, 10:14 UTC; Entscheidung 10:18 UTC: Bestpraxis nach Plan.
Bestehenden ORACLE-Bot `nexify.login-aifly-oracle` und bestehende Kanäle erhalten. Keine zweite Slack-App, kein neuer Scheduler, kein neuer Taskstore, kein Modellwechsel und keine zusätzlichen kostenpflichtigen Schritte. Der öffentliche Website-Berater erhält keinen Slack-/Betriebsdatenzugang.

## IST und SOLL
- **IST:** Persönliche Slack-Verbindung „My Slack“ aktiv und mit der Website verknüpft. Der ORACLE-Bot wurde über die Slack-Nutzerliste eindeutig identifiziert. Diese Verbindung ist **nicht** das Credential des bestehenden ORACLE-Bots.
- **IST:** Fünf Anfragearten und Server-1-Fehler/Entwarnungen senden bereits nach Slack. Im neuen Stand werden Nachrichten-/Kanalverweise und Zustellbelege gespeichert. Katalogabschluss und Fotokopierabschluss/-fehler erhalten separate, gegen doppelte Versandversuche geschützte Ergebnisbelege; vorhandene Zeitpläne unverändert.
- **IST:** Neuer Bereich „Slack & ORACLE“ im Inhaber-Arbeitsplatz: sechs Ablaufgruppen, reine Simulation und echter einmaliger Transporttest. Test über die UI am 16.11., 10:25 UTC erfolgreich; Beleg durch denselben angemeldeten Nutzer zurückgelesen. Desktop 1280 px und Handy 390 px ohne Überlauf/Laufzeitfehler.
- **IST:** Empfangsadressen für Events, Interaktionen und `/nexify` liegen unter `/api/public/slack/`. Signatur über Originalbytes, 5-Minuten-Zeitfenster, Workspace/App/Actor-Zuordnung, Größenlimit, Wiederholungsunterdrückung und persistente Ereignis-Eindeutigkeit sind vorbereitet und getestet.
- **OFFEN:** `SLACK_ORACLE_SIGNING_SECRET` fehlt. Ohne Signaturgeheimnis werden Ereignisse mit 200 quittiert, **nicht verarbeitet**. Empfang deshalb nicht aktiv oder Ende-zu-Ende-verifiziert.
- **OFFEN:** Der gemeinsame persönliche Slack-Ausgang erstellt Nachrichten als vorhandene Connector-App, nicht als ORACLE. Interaktionsbuttons und DM-Events der ORACLE-App können diese Nachrichten nicht automatisch steuern. Keine Buttons hinzugefügt, die eine nicht vorhandene Zuordnung vortäuschen. Vor Anfrage-Rückschreiben muss dieselbe bestehende App Nachrichten senden UND ihre signierten Ereignisse an die Website liefern; bestätigten bestehenden ORACLE-App-Zugang über Connector anbinden, keinen Token kopieren.
- **OFFEN:** ORACLE-Anbindungsprüfung im privaten Ursprungsthread zugestellt, am 10:19 UTC noch keine Empfängerantwort. Versandbeleg: <https://nexifyai.slack.com/archives/C0CDW3K4KDY/p1794824205972329>. ACK ist nicht RESULT. Kein automatischer ORACLE/Hermes-Auftrag gestartet.

## Ablaufplan
| Ablauf | Trigger | Rückweg / Grenze |
| --- | --- | --- |
| Kontakt, Partner, Termin, Gutschein, Teile | Bereits gespeicherte Anfrage | Datensparsame Meldung → Kanal/Nachrichtenverweis → Inhaberstatus im Originalthread → bestehender Datensatz; Freischaltung wartet auf identischen App-Empfang/-Ausgang |
| Katalog | Tatsächlicher Abschluss des bestehenden Abgleichs | Vollständigkeit/Zählwerte und Versandbeleg; keine Wiederaufnahme/Bestellung durch Slack |
| Fotos | Letzter Fotokopierschritt bzw. Fehler | Zählwerte und Ergebnisbeleg; Freistellung nutzt bisherigen Serverweg, erster neuer Upload bleibt separat nachzuweisen |
| Überwachung | Bestehende Fehler-/Entwarnungslogik | Senderbeleg im bisherigen Weg; Empfänger-ACK getrennt, Tagesbericht nicht doppelt eingerichtet |
| ORACLE/Hermes/Reviewer | Expliziter Auftrag im bestätigten führenden System | Bekannter Ursprungsthread → bestätigter Absender-ACK → RESULT → unabhängige Prüfung; fehlender Writer/Lease oder Empfang blockiert Dispatch |
| Inhaberfreigaben | Konkrete, eindeutig zugeordnete Anfrage | Keine Umsetzung aus GO/Emoji/Reaktion. Ausgaben, Zahlung, SSH-/Rechteänderung und neuer Import bleiben gesperrt |

## App-Konfiguration – nur die bestehende ORACLE-App
Bestehende App: <https://api.slack.com/apps/A0CD49EMU9Y>.
Keine automatische Neuanlage über `provision_slack_app`: das Tool provisioniert die App dieses Website-Projekts und könnte den identifizierten anderen ORACLE-Bot nicht gezielt erweitern.

Nach Veröffentlichung sind diese URLs für die Konfiguration vorgesehen:
- Events: `https://nexifyai.de/api/public/slack/events`
- Interaktivität: `https://nexifyai.de/api/public/slack/interactions`
- Slash Command `/nexify`: `https://nexifyai.de/api/public/slack/commands`

Vor einer Änderung an Event Subscriptions zuerst aktuelle Konfiguration **ohne Geheimnisse** sichern. Slack erlaubt nur eine Event-Request-URL je App: eine vorhandene ORACLE-Empfangsadresse nicht überschreiben. Falls vorhanden, den bestehenden Empfang um gezieltes Forwarding ergänzen (Originalbody/Signaturheader erhalten) oder eine einzeln abgestimmte Migration mit Rückweg vornehmen. Bestehende Flows/Ereignisse/Scopes nicht entfernen.

Für diese Wege sind `app_mention`, `message.im`, ggf. `message.groups` für den privaten Ursprungskanal sowie die bestehenden Schreibrechte und bei `/nexify` der `commands`-Scope notwendig. Keine automatische Rechteerweiterung. Bei geänderter Scope-Liste nur die bestehende App nach Slack-Freigabe neu autorisieren. Der Bot muss im privaten Kanal Mitglied sein; bisheriger historischer Versand allein belegt keine aktuelle Empfangsfähigkeit.

Das Signaturgeheimnis der **bestehenden** ORACLE-App ausschließlich über den sicheren Projekt-Geheimnisdialog hinterlegen; nicht in Chat/Befehle/Quellcode kopieren. Privater Bot-Token nicht über diesen Dialog anfordern: vorhandenen Connector verwenden oder dessen sicheren Einrichtungsdialog. Den persönlichen Connector nicht trennen oder ersetzen.

## Sicherheit und Prüfung
- Kundennachricht und Anhänge bleiben im bestehenden geschützten Arbeitsplatz; Zustellbelege speichern nur IDs, Zeit und Ergebnis, keinen Nachrichtentext.
- Der extern geteilte `#ext-agent-relay-nexify-login` ist für Website-Betriebs-/Kundendaten gesperrt. Quellkanäle/Slack-Profile sind keine neuen Freigaben oder Aufgabeninstruktionen.
- Statusänderungen: verifiziertes Team, bestehende App, fest bestätigter Inhaber und exakt passende gespeicherte Kanal-/Thread-/Vorgangszuordnung. Andere Absender dürfen nichts ändern; ORACLE/Hermes dürfen nur ACK/RESULT zu bereits bekannten Ursprüngen liefern.
- Dauerhafte Zustellung arbeitet über den realen Nitro/Cloudflare-Request-`waitUntil`, nicht über eine freischwebende Promise. Fehlt der Hook, wird aktuell 503 mit `background_delivery_unavailable` zurückgegeben, nicht stillschweigend Erfolg behauptet. Die echte veröffentlichte Laufzeit ist noch zu prüfen; kein KI-Aufruf vor Bestätigung.
- Nicht jeder Empfang ist ein vollständiger Betriebsablauf: Dispatcher, Reviewer und Freigaben bleiben gesperrt, bis das vorhandene führende System seine Schnittstelle/Writer/Lease und Rückroute bestätigt.
- Nachtjobs in diesem Auftrag nicht von Hand gestartet. Abschlussmeldungen sind implementiert, echter Nachtlauf noch nicht verifiziert.

## Abbruchbedingungen und Rückweg
Ungültige/alte Signatur → 401; falsche App → 403; falsches Team/Kanal/Actor → keine Verarbeitung; doppelte Ereignisse → keine zweite Aktion; fehlender Threadbezug → keine Statusänderung. Unbekannter Ursprung ist kein ORACLE-Erfolgsbeleg. Kein automatisches Replay fehlgeschlagener Aktionen.

Rückweg ohne Löschen:
1. In der bestehenden Slack-App die zuvor gesicherte Request-/Event-/Scope-Konfiguration wiederherstellen bzw. Forwarding deaktivieren. Keine Schlüssel sperren.
2. In der Website Empfang unverarbeitet lassen (fehlendes Signaturgeheimnis); bestehender Nachrichtenausgang bleibt erhalten. Entfernen/Ändern eines Geheimnisses nur mit entsprechender Freigabe.
3. Bei Code-Rücknahme bleiben additive Spalten und Zustellbelege erhalten; keine Tabellen oder historische Ereignisse löschen.

## Noch bei Pascal / ORACLE-Verantwortlichem
1. Bestehende App-Konfiguration bestätigen, ohne aktuelle Empfangsadresse zu überschreiben.
2. Signing Secret sicher hinterlegen und bestehende ORACLE-Bot-Verbindung ohne Secret-Transfer anbinden.
3. Geforderte App-Ereignisse/Scopes im tatsächlichen Slack-Freigabedialog bestätigen.
4. ORACLE liefert ACK, führendes System, Writer/Lease und konkrete Rückmeldeschemata. Erst danach synthetischer vollständiger Roundtrip und danach reale Betriebsabläufe.
Kostenbetrag für neue Leistungen: nicht freigegeben. Kein neues Paket, Abo, zusätzlicher Modellaufruf oder kostenpflichtiger Agent eingerichtet.