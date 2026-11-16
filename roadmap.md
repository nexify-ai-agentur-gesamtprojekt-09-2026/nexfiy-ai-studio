# Roadmap
## NX-MCP-01 · Verbindung über nexifyai.de (16.11., 13:10 UTC)
- [x] Lesende Konfigurationsprüfung: OAuth und dynamische Registrierung aktiv, Zustimmungsadresse /.lovable/oauth/consent, Site URL nexifyai.de; keine Einstellungsänderung nötig (13:11 UTC)
- [x] Vier vorhandene Lese-Werkzeuge/SDK-Seiten bestätigt; Rückadresse lag tatsächlich oben in redirect_uri statt client.redirect_uri. Anzeige, konkrete Scopes, angemeldetes Konto, Ereignisfehler und Signup-Rückweg korrigiert; keine Rollen-/Konfigurationsänderung
- [x] Live 13:14 UTC: Registrierung 201 → Autorisierung 302 → Zustimmung 200 → Token 200 → initialize/tools/list 200; vier Tools. 13:18 UTC drei Leseaufrufe 200 ohne isError; Claude-Callback akzeptiert, 13:20 UTC echter Ablehnen-Rückweg access_denied ohne Code; bereits autorisierte sofortige Rückleitung ebenfalls belegt
- [x] Lokale Desktop-/Handyprüfung 1280/390 px, je 44px Buttons, kein Überlauf; simulierte Zulassen-/Ablehnenfehler und echte localhost-Origin-Ablehnung sichtbar. 149 Projekttests bestanden 13:21 UTC; Manifest vier unveränderte Tools, build OK. Bericht ops/nx-mcp-01-2026-11-16.md
- [x] Rückweg dokumentiert; NX-ORA-02, Server, BigBuy, bestehende Nutzerrechte unverändert. Keine neuen Dienste, keine Kostenverpflichtung; Diagnoseregistrierungen erhalten, keine Löschung
- [ ] Neue Zustimmungsanzeige erneut veröffentlichen und live prüfen: benötigt Veröffentlichung durch Pascal. Ursache von Pascals konkretem Client-Abbruch bleibt ohne Client/Fehlerbeschreibung offen; kanonischer Serverfluss ist live vollständig nachgewiesen

## Erneut hochgeladener Projektauftrag (16.11., 11:29 UTC)
- [x] Upload byteidentisch mit ops/references/nexify-project-chat-2026-11-16.md (SHA256 4bf9a383…301f3, 6893 Bytes); keine neuen Vorgaben, keine zweite Kopie
- [x] Startverhalten: ORACLE-Prüfthread 11:30 UTC rückgelesen – weiterhin nur Ausgangsanfrage + Revision 2, keine Kanalnachricht danach; keine weitere Meldung gesendet (unbestätigter Kanal, keine blinde Wiederholung). Slack-Verbindungen unverändert drei persönliche, keine Workspace-Freigabe belegt
- [x] Nächster autorisierter Auftrag: dringende Filmzeilen-Korrektur war nur in der Vorschau (live 0 neue Pfeilsymbole, Vorschau 2). 129 Tests bestanden, Vorschau 1280/390 px ohne Überlauf/Fehler; Veröffentlichung nach Arbeitsmodus „live bringen“
- [x] Veröffentlicht 11:33 UTC, live ab 11:34:42 UTC nachgewiesen: Startseite/Leistungen/Unternehmen × 1280/390 px HTTP 200, Aufklappzeile 44 px (43,4 px nur durch gewollte 3D-Neigung der Startseitenfigur), Enter öffnet, kein Überlauf, keine Konsolenfehler. Basis-Sicherheitsprüfung ohne Befund; Slack-Empfangsadressen live 200, Challenge exakt, ohne Signaturgeheimnis weiterhin keine Verarbeitung
## Markierte Film-Aufklappzeilen korrigieren (16.11., 11:18 UTC)
- [x] Gemeinsame Film-Fußzeile gegen konkurrierende Seitenregeln abgesichert: 16px-Symbol statt konkurrierender CSS-Pfeile, 44px-Aufklappzeile, Filmhinweis 12px/Transkript 14px mit identischen Einzügen. Texte, Filmzuordnung und abgenommenes Design erhalten
- [x] 12 Filmseiten × 1280/390/2554px = 36 Ansichten geprüft; 24 Transkripte per Enter geöffnet/Space geschlossen, sichtbarer Tastaturfokus, keine Überläufe/Laufzeitfehler. 11 bestehende Filmtests bestanden, build OK 11:20:52 UTC. Gemeldeter Seitenfehler nicht reproduzierbar: aktuelle Aufrufe HTTP 200. Veröffentlicht 11:33 UTC, live nachgeprüft (siehe oben)

## Nötige Slack-Workspace-Freigabe (16.11., 11:18 UTC)
- [x] Connector-Dialog ausdrücklich erneut geöffnet; Ergebnis erneut bestehendes persönliches „My Slack“, vorher/nachher dieselben drei Verbindungen. Nichts getrennt oder ersetzt
- [x] Offizielle Anleitung geprüft: separater Weg Connectors → Slack → Your apps in Slack → Connect Slack workspace; persönliche Neuanlage allein ist keine Installationsfreigabe. Beleg ops/slack-integration.md
- [ ] Pascal bzw. Workspace-Owner/Admin mit Slack-Installationsrecht bestätigt den vorgesehenen Workspace im separaten Freigabedialog; autorisierter Eintrag unter Your apps in Slack noch nicht belegt
- [ ] Einrichtung erst nach belegter Workspace-Freigabe fortsetzen und Provisionierungsergebnis prüfen; vollständiger Auslöser/Empfängerantwort bleiben offen, kein erneuter Provisionierungsloop, kein Deployment, keine neuen Kosten

## Eigenständige Slack-Einrichtung von Grund auf (16.11., 11:03 UTC)
- [x] Verwaltete Einrichtung versucht: zulässige Scopes/Mention+DM festgelegt; groups:history vom Tool nicht erlaubt. Ursprünglichen ORACLE-Bot und Nachrichtenausgang unverändert erhalten
- [ ] App-Erstellung blockiert: Provisionierungsdienst meldet auch nach abgeschlossenem Verbindungsdialog „No Slack workspace is connected“; Dialog wählte bestehendes persönliches My Slack. Pascal/Lovable-Workspace-Verantwortlicher muss Slack-Workspace für verwaltete App-Installation autorisieren
- [ ] Verdrahtung und vollständiger Slack-Auslöser warten auf erfolgreiche App-Erstellung und tatsächliche App-/Secret-Zuordnung; kein signierter Empfang/Empfängerantwort behauptet, keine Geheimnisse kopiert, kein Modellaufruf oder Deployment

## ORACLE-App-Einstellungen und echter Slack-Auslöser (16.11., 11:00 UTC)
- [x] Bestehende App-Einstellungen und Rückweg vorbereitet (ops/slack-oracle-settings-2026-11-16.md), alle drei Empfangsadressen live 200, 18 Tests bestanden, ORACLE im privaten Testkanal Mitglied
- [x] Sicheren Dialog erneut geöffnet; durch neue Nachricht vor Ausführung abgebrochen, keine Speicherung. Neuer Auftrag 11:03 UTC: verwaltete Einrichtung statt manueller Suche
- [ ] Vollständiger Slack-Auslöser wartet nach neuer Entscheidung 11:03 UTC auf verwaltete App-Erstellung; tatsächliche Gebühren bestehender Verträge nicht gemessen, keine neue kostenpflichtige Verpflichtung

## Bestehende Verbindungen eigenständig klären (16.11., 10:53 UTC)
- [x] Zugängliche Verbindungsliste und ORACLE-Zuordnung selbst geprüft; My Slack funktioniert, App-Manifestexport konkret missing_scope/app_configurations:read; Umfang nicht grantbar. Keine zweite App/Secret-Transfer/Dialogumgehung
- [x] Zwei begrenzte Slack-Suchseiten (40 Treffer) auf Verbindungsbelege ausgewertet, historische getrennte MCP-/HTTP-Wege nicht als aktuell bestätigt. Bestehender Prüfthread für einmalige Statusrevision genutzt und rückgelesen
- [ ] Aktuelle App-Konfiguration/konfigurationsberechtigten bestehenden Weg und externen Writer bestätigen: ORACLE-App-/Betriebsverantwortlicher, kein passendes zugängliches ORACLE-Health-/Writer-Werkzeug gefunden. Belege ops/project-context-2026-11-16.md

## Hochgeladener Projektauftrag integrieren (16.11., 10:53 UTC)
- [x] Original vollständig gelesen, unverändert unter ops/references/nexify-project-chat-2026-11-16.md erhalten und byteverglichen; Vorgaben berücksichtigt, kein zweites Aufgabenregister
- [x] Tatsächliches TanStack-Projekt, lokale Quellen, aktuelle URLs und Versionsmomentaufnahme belegt; formeller externer Writer/Lease bleibt ausdrücklich offen, kein zweiter Agent gestartet
- [x] Einmalige Revision 2 im bestehenden privaten Prüfthread angenommen und 10:56 UTC rückgelesen; genau eine Rückmeldung, null ORACLE-/Hermes-Antworten, keine neue Aufgabe/Modellaufruf. Zustellung ist kein ACK

## ORACLE-Anbindung fortsetzen (16.11., 10:35 UTC)
- [x] Slack-Verbindung und bestehende ORACLE-App-Zuordnung aktuell bestätigt, privater Ursprungskanal nicht extern geteilt; Thread vollständig ohne ACK, live Event-Handshake 200, keine zweite App/Modelländerung
- [x] 22 betroffene Sicherheits-/Empfangstests bestanden (10:37 UTC); realer Request-waitUntil im Nitro-Adapter vorhanden, kein Fehler oder ungeprüfter Umbau
- [ ] Signaturgeheimnis der bestehenden App: sicherer Dialog von Pascal abgelehnt, weiterhin nicht gesetzt; Empfang verarbeitet keine Ereignisse
- [ ] Bestehende App-Konfiguration und identischen ORACLE-Ausgang abstimmen: Pascal/App-Verantwortlicher; keine vorhandene Request-URL überschreiben, keine Verbindung ersetzen
- [ ] Vollständiger Roundtrip: wartet auf bestätigte Konfiguration/Zugang, tatsächlichen ACK und Rückschema; Statusrevision 2 10:56 UTC zugestellt/rückgelesen, kein Betriebsauftrag. Belege ops/slack-integration.md

## SSH-Hostidentität vor BigBuy bestätigen (16.11., 10:29 UTC)
- [x] Konsolenvergleich für Server 1 vorbereitet; 10:30 UTC Hostname/Hosting-IP liefern denselben öffentlichen ED25519-SHA256-Kandidaten, ausdrücklich unbestätigt. Anleitung/Abbruch/Rückweg: ops/server1/host-identity-2026-11-16.md; keine private Schlüsseldatei gelesen
- [ ] Unabhängige Bestätigung durch Pascal über die bestehende VPS-Konsole: vollständiger SHA256-/ED25519-Vergleich und Zeitpunkt fehlen; kein known_hosts-Vertrauenseintrag, kein SSH-Login
- [ ] BigBuy erst nach bestätigter Identität, geschütztem bestehenden Zugang und gedecktem Kostenrahmen einmal lesend prüfen; kein Importstart, keine Schlüsselsperrung, kein kostenpflichtiger Schritt — ZURÜCKGESTELLT 11:42 UTC auf Anweisung Pascal; Server-1-Identität 11:41 UTC per Konsole bestätigt

## Altbestand im Hintergrund der Startseite (16.11., 10:20 UTC)
- [x] Markierten Bereich Fertigung & Handwerk geprüft: alte dunkle hc-art-Medienfläche unter aktuellem Film transparent gesetzt, keine Medien gelöscht. 1280/390 px angesehen, kein Überlauf; Hintergrund transparent in beiden Ansichten

## Gesamte Slack-Lösung und AIFly ORACLE (16.11., 10:14 UTC)
- [x] Ziel als bestehender ORACLE-Slack-Bot eindeutig aufgelöst, vorhandene acht Kanäle vollständig gelesen; öffentliche Beratung bleibt getrennt, extern geteilter Relay gesperrt
- [x] Sechs Ablaufgruppen dokumentiert, Signatur-/Retry-/Ereignis-/Actor-/Thread-Schutz umgesetzt; Zustellbelege und bestehende Anfrageverweise additiv (Migration 0012), kein zweiter Taskstore
- [x] Arbeitsplatz mit Simulation und echtem Transporttest: 10:25 UTC Slack-API-Zustellung und gespeicherten Beleg im echten Inhaberkonto nachgewiesen; erneutes Laden 10:27 UTC, Desktop/Handy ohne Fehler/Überlauf, 29 Tests bestanden
- [x] Katalog-/Fotokopierabschluss und Servermeldungen mit Zustellbeleg angebunden; keine Nachtjobs gestartet, bestehende Zeitpläne unverändert
- [x] Veröffentlichung der vorbereiteten Empfangsadressen: mit Stand 16.11. 11:33 UTC veröffentlicht, alle drei Adressen live 200 (11:35 UTC); signierte Verarbeitung bleibt bis zum Signaturgeheimnis aus
- [ ] Bestehende ORACLE-App-Konfiguration/Signing Secret und identischer Bot-Ausgang: Pascal/ORACLE-Verantwortlicher bestätigt bestehende Empfangsadresse und sicheren Connector; nichts überschreiben, keine zweite App provisioniert
- [ ] Vollständiger ORACLE/Hermes/Reviewer-Roundtrip: ORACLE-ACK noch offen (zuletzt 10:26 UTC), führendes System/Writer/Lease und Rückschema fehlen; kein Dispatch gestartet. Details/Rückweg ops/slack-integration.md

## BigBuy-Prüfung und SSH-Stilllegung vorbereiten (16.11., 10:08 UTC)
- [ ] BigBuy: authentifizierter Statusabruf blockiert – strikte SSH-Hostprüfung Exit 255, bestätigter Server-Vertrauensnachweis fehlt; Kostenrahmen des GET offen. Öffentliche API-Referenz 10:12 UTC HTTP 200; kein Import oder Auth-Aufruf
- [x] SSH-Stilllegung mit Sicherung, Einzelbestätigung, Ersatz-/Notfalltest und Rückweg vorbereitet; historischen Plan zum Auftrennen korrigiert (mögliche neue Schlüsselaktivierung), keine Sperrung
- [ ] Frische SSH-Inventur/Nutzung und serverseitige Sicherungen: warten auf bestätigten Hostschlüssel und geschützten Zugang; beide VPS beim Hosting-Leseabruf 10:10 UTC running
- [x] Inhaberfreigaben, Belege und Kostenstatus dokumentiert: ops/server1/access-review-2026-11-16.md; Historie erhalten, keine Betriebs-/Rechteänderung

## Folgeauftrag Filme und verbleibende Arbeiten (16.11., 09:23 UTC)
- [x] Filme: zwei lokale Zuschnitte ohne unbelegte Leistungs-/Kundenaussagen; sonst gekennzeichnete Standbilder, Originale erhalten. 24 Filmansichten 1280/390 px, Ton und beide Untertitel geprüft
- [x] Pfeil der Transkriptzeile in beiden Zuständen ausgerichtet und angesehen, ohne Gestaltungswechsel
- [x] Vorhandene Produktnamen erklärt: NeX Agentic AIFly (kurz NeX), kombinierte Navigation NeX + AIFly ORACLE; FACTORY als Arbeitsweise auf Unternehmensseite erklärt, Rechtsnamen unverändert
- [x] Server 1: bestehende Überwachung und Freistellung aktiv; täglichen Lagebericht statt Doppelauftrag ergänzt. Zustellnachweis 09:41:29 UTC, sechs Servertests bestanden, Rückweg ops/server1/README.md
- [ ] BigBuy: Variablenfehler historisch nicht reproduzierbar; aktuelle Gültigkeit 10:13 UTC weiterhin OFFEN, Statusabruf durch fehlenden SSH-Vertrauensnachweis blockiert. HISTORIE 09.11. 401; pausierten Bestandssync nicht aktivieren
- [x] SSH: lokale geschützte Verwendung nach ausdrücklicher Antwort Pascal; keine Serverrechte oder authorized_keys geändert, vorhandener Stilllegungsplan bleibt Einzelentscheidung
- [ ] Mailabsender: keine Domain konfiguriert (Tool 16.11.); Einrichtungsdialog angeboten, Owner Pascal. ORACLE-Karte erneut abgebrochen, Autorisierung nur durch Pascal möglich
- [x] Vorhandenen Produktfoto-Entwurf geprüft, nicht versendet; keine ungeklärten Bildrechte übernehmen
- [ ] Echter Nachtlauf/erster neuer Foto-Upload erst nach 17.11. messbar; echtes iPhone bei Pascal. Keine automatische Nachprüfung aus diesem Chat behaupten
- [x] Nachweise, 111 Projekttests/sechs Servertests, 74 Seitenansichten, Rückweg und Inhaberaufgaben dokumentiert (.lovable/delivery-2026-11-16-filme-betrieb.md); Sicherheits-Schnellprüfung ohne Befund
- [x] Veröffentlichung live nachgewiesen 09:47 UTC: Start/Kontakt/Automatisierung/TEILEKLAR/Anmelden × 1280/390 px, neue Zuschnitte/Standbilder, 12px Kennzeichnung, kein Überlauf oder Laufzeitfehler

## Kommentar Kontaktseite (16.11.)
- [x] Kommentar 80c95bd2-dd43-44d0-b80a-a305a4faee35 gelesen: Standard-/Hover-Füllungen für Abschnittslinks getauscht; sechs Breiten-/Theme-Zustände ohne Geometrieänderung geprüft und im Thread beantwortet, nicht aufgelöst

## Domain-Reihenfolge (16.11.)
- [x] nexifyai.de veröffentlicht (05:51 UTC) und geprüft: Start, Kontakt, Shop 200, www leitet auf nexifyai.de, Shop-Bild 200, MCP ohne Anmeldung 401
- [x] nexifyai.cloud als Weiterleitung ergänzt (16.11. 07:47 UTC)
- [ ] teileklar.shop erst nach gesonderter Shop-Abnahme anschließen: mindestens 3720 Produkte, Livezahlung und erfolgreiche Testbestellung; bestehende Domain nicht vorzeitig umschalten

## Hostinger-Zugang und Engineering-Skill (16.11.)
- [x] Privates Composio-OAuth eingerichtet; Hostinger-Leseabruf bestätigt am 16.11. 02:51 UTC zwei laufende KVM-8-VPS, keine Betriebs- oder Rechteänderungen; Shell-Zugriff nicht geprüft
- [x] Hochgeladenen Engineering-Skill nach Auswahl aktiviert, unveränderte Quelle erhalten und Plattform-/Projekt-/Freigabegrenzen ergänzt

## Shop- und Werkstattseiten (16.11.)
- [x] 17 TEILEKLAR-Seiten geprüft; wiederholte Preis-/Bestands-/Werkstattverzeichnis-/Portalzusagen und Metadaten korrigiert, vorhandenes Rechtsarchiv unverändert erhalten
- [x] Shop-Einstiege, externe Werkstattsuche, Teileartenwahl, Termin-/Gutscheinformulare und Partnerdarstellung im bestehenden Design geschärft; keine Waren-, Zahlungs-, Buchungs- oder Partneranbindung simuliert
- [x] TEILEKLAR und fünf Formularseiten: 66 Ansichten bei 1280/390/320px ohne Überlauf/Laufzeitfehler; aktuelle Teilefrage, externe Kartenadresse, Batterieübergabe und Reifenwahl im Browser geprüft

## Formulare technisch und visuell (16.11.)
- [x] Reale Anfrage-/Kontoeingaben geprüft; Fehlerzählung, Eingabelimits, feldgenaue Kontofehler und klare Betreffzuordnung korrigiert; ältere Shop-/Suite-Zusagen auf Anmeldung/Registrierung/Passwortseite berichtigt
- [x] Gemeinsame Felder, Fokus, Abstände und Theme-Flächen vereinheitlicht; lange Entwürfe bleiben sichtbar, Kopierfehler werden ehrlich gezeigt und Angaben bleiben bearbeitbar
- [x] Anfragevorbereitung, Kopierfehler und Rückbearbeitung im Browser geprüft; 57 Tests bestanden. Echte Kontotransaktion/Zustellung, Safari-Gerät und Passungsfreigabe nicht nachgewiesen

## Glasflächen nach Apple-Design-Prüfung (16.11.)
- [x] Glasrollen für Navigation, Leseflächen und Menüs abgestimmt; helle/dunkle Ansicht geprüft, Fehlerfarbe im hellen Theme korrigiert. Sechs isolierte Textkontraststichproben an Guide/Chat-Einstieg/Formularlabel: 6,78–8,68:1; keine vollständige WCAG-Kontrastfreigabe
- [x] Final 7056 Geometriewerte in 28 Zuständen ohne Änderung gegenüber Ausgangsstand; Header oben/unten 8px, rechts bis 1280px 8px, bei 1705px vorhandene freie Flexfläche 198,72px ausdrücklich nicht als 8px behauptet
- [x] Erhöhter Kontrast, reduzierte Transparenz/Bewegung, Menüs, Installationshinweise und reale mobile ORACLE-Antwort mit API-Link geprüft; keine Laufzeitfehler

## App-Installation unter dem Footer (16.11.)
- [x] Gemeinsame Glas-Installationsleiste mit Browser-Installation und Anleitungen für iPhone/iPad, Android und Computer ergänzt; exakt mit Rechtslinks ausgerichtet (beide x=59,28px bei 1705px)
- [x] Gemäß Geräteauswahl nur Installation mit Internet umgesetzt; kein Offline-Worker und keine Zwischenspeicherung hinzugefügt, Manifest und vier App-Symbole erreichbar
- [x] Desktop/Handy 320–1705px, helle Ansicht, Fokus, Wiederherstellen, simuliertes Browser-Akzeptieren/Abbrechen/Fehler und bereits installierte Ansicht geprüft; 40 Tests bestanden, keine Laufzeitfehler
- [ ] Echte Geräteinstallation: Seite ist veröffentlicht – Installation auf echtem iPhone/Android durch Pascal prüfen; im Test nur simuliert

## Hintergrund und Tiefenwirkung (16.11.)
- [x] Markierte Hintergrundlinie als vollbreiten Abschnittsrand reproduziert und entfernt; Datenzeilen behalten ihre Orientierungslinien
- [x] Glasflächen, Chat-Einstiege und freigestellte Figuren mit abgestimmten Lichtkanten und Kontaktschatten verstärkt; Desktop/Handy ohne Überlauf geprüft
- [x] Guide und Fließtext auf Leistungen exakt ausgerichtet: Desktop beide x=489,48px, Handy beide x=24px; Header-Randabstände zuvor in sieben Breiten gemessen

## Durchgängige Typografie (16.11.)
- [x] Verbleibende Inhalts-, Konto-, Hilfe- und Systemseiten auf gemeinsame Überschriften, Textmaße und Absatzrhythmen abgestimmt
- [x] Chat-Einstieg, Antworten, Listen und Eingabe vereinheitlicht; echte Antwort mit H3-Zwischenüberschriften, 16px Schrift, 28px Zeilenhöhe und 24px Absatzrhythmus geprüft
- [x] 46 öffentliche Seiten bei 1280/390px ohne Überlauf geprüft; reale API-Beratung und Einstiegslink auch am Handy erfolgreich, Berechtigungen unverändert
- [x] Glasheader bei 320/390/600/768/900/1280/1705px vor und nach Scrollen geprüft: rechts/oben/unten je 8px zwischen Glas und rechtem Bedienelement; mobile Navigation und Escape funktionieren

## Produktdarstellung und zugeordnete Rechtstexte (16.11.)
- [x] Sechs Produktseiten und Agenturleistungen mit vergleichbaren Kurzprofilen, Voraussetzungen, Kostenprinzip, Beispiel und passenden Links ausgearbeitet; keine neuen Preise oder Fähigkeiten erfunden
- [x] Datenschutz, KI-Hinweise, Cookies, Vertragsgrundlagen und TEILEKLAR den vorhandenen Funktionen zugeordnet; wirkungslose importierte Diagnose-Auswahl nicht mehr als wirksame Einwilligung dargestellt
- [x] Beratungsgrundlage aktualisiert, irreführende Vorgangsnummer-Zusage auf bearbeiteten Seiten entfernt; Produkt-/Rechtsseiten bei 1280/390px und importiertes Rechtsarchiv geprüft; fehlende Anbieter-/Verarbeitungsangaben bleiben Freigabegrenze

## Glas und Header-Veredelung (16.11.)
- [x] Durchsichtige und milchige Glasflächen mit kohärenten Lichtkanten, Verläufen und Tiefenwirkung verfeinert
- [x] Header schmaler: rechts/oben/unten exakt 8px Innenabstand gemessen, 84px Gesamthöhe auf Desktop
- [x] Header beim Scrollen sichtbar mitgeführt; Abstände bei 1705/1280px oben und gescrollt identisch
- [x] Desktop/Handy und helle Ansicht geprüft; Transparenz-/Bewegungs-Fallbacks erhalten

## Stabiler Seitenstart (16.11.)
- [x] Falsche Startbreite und mobil vorzeitig sichtbaren Chat reproduziert und beseitigt
- [x] Gemeinsame Geometrie vor Hydration geladen, Schriftdateien vorgeladen und mobile Trennlinie sofort verborgen
- [x] Initiale Chatposition mit/ohne JavaScript verglichen; finaler mobiler Unternehmens-Kaltstart CLS 0; 46 öffentliche Inhaltsseiten ohne Laufzeitfehler geprüft

## Schriftbild und Informationskonzept (16.11.)
- [x] Gemeinsames Schriftbild mit klarer Hierarchie, festen Schriftgrößen und lesbaren Textmaßen gestaltet
- [x] Unternehmen, Startseiten und 28 weitere Themenseiten mit konkreten Unterüberschriften und Informationen erweitert; reine Konto-/Formulartexte nicht künstlich verlängert
- [x] Bestehende Fakten und Grenzen erhalten; keine Tarife oder Rechtsfreigabe erfunden
- [x] Desktop/Handy und vorhandene Abläufe geprüft; 35 Tests erfolgreich

## Technische Nacharbeit (16.11.)
- [x] 15 TEILEKLAR-Seiten an gemeinsamen Rahmen mit Hilfe, Navigation und Such-Anfrageübergabe angeschlossen
- [x] Angebots-/Terminaktionen und 24 Begleitungsmenüs an echte lokale Einstiege angeschlossen
- [x] Terminanfrage mit Prüfung und E-Mail-Übergabe im Browser vollständig getestet
- [x] Theme-Umschaltung, mobile Menübedienung, Fokusbegrenzung und Fokusrückkehr geprüft
- [x] Produkt-/Kategorieziel ergänzt, nominalen Reifenrechner und Checkliste implementiert und getestet
- [x] Desktop/Handy geprüft; ohne Waren-/Zahlungsanbindung keine falschen Ergebnisse angezeigt

## ORACLE-Produktberatung (15.11.)
- [x] Öffentliche Suite/API-Produktinformationen als begrenzte Beratungsgrundlage hinterlegt
- [x] AI-Gateway-Beratung mit geprüften lokalen Einstiegslinks im gemeinsamen ORACLE ergänzt
- [x] Echte Suite/API-Antworten, Folgefrage, Einstiegslink und erhaltene Eingabe bei Fehler am Handy geprüft (25 Tests bestanden)

## Anpassbare Seiten und Textkonzept (15.11.)
- [x] Automatisch abgestimmte Chatbreite und verschiebbare Grenze mit Maus/Tastatur ergänzt und geprüft
- [x] Ausrichtung, Schrift und Chat-Inhalt bei 1705/1280/900/390px geprüft; echte Folgefrage und API-Einstiegslink am Handy funktionieren
- [x] Produkt-/Angebots-/Preistextkonzept auf Kernseiten umgesetzt; Suite-FAQ von Agenturauftrag getrennt, rechtliche Entwurfsgrenzen sichtbar
- [x] UI/UX-Skill um das Textkonzept erweitert und aktiviert
- [x] Änderungen und verbleibende Fakten-/Freigabegrenzen geprüft; 28 Tests bestanden
- [x] Freigestellte Markenfiguren, Glasflächen sowie Farb- und Lichtwirkung in gemeinsamen NeXify-Flächen veredelt
- [x] Realistische Glaswirkung in gemeinsame NeXify-Bedienelemente integriert, reduzierte Transparenz und Fallback berücksichtigt
- [x] Leistungsseite auf Desktop und Handy vermessen; kein horizontaler Seitenüberlauf
- [x] Chatantworten: 16px Schrift, 26,4px Zeilenhöhe, 16px Absatzabstand; statische Formatierung und sichere Einstiegslinks geprüft
- [x] Bisherige Umsetzungen seit Task 01 anhand Chatvorgaben und Quellen auf Abweichungen geprüft; Befunde in .lovable/frontend-audit.md festgehalten

## Offene Grenzen aus der Gesamtprüfung
- [ ] Vollständige Datenschutz-/Vertragsangaben und Produkttarife: wartet auf verifizierte Angaben/Freigabe, keine Werte erfunden
- [ ] Eigenständiger API-Zugang: vorhandene Produktseite beschreibt Projekteinstellung; tatsächliche Selbstfreischaltung fehlt
- [ ] Echtes Safari/iPhone und externe MCP-OAuth-Autorisierung: bisher nicht abschließend nachgewiesen

## Erkannter älterer Nacharbeitsbestand (nicht als fertig bezeichnet)
- TEILEKLAR: Rahmen/Hilfe/Formulare/Reifenrechner technisch nachgearbeitet; reale Waren-/Zahlungs-/Werkstattdaten sowie automatische Passung benötigen eine echte externe Anbindung
- Seitenübergreifende ältere Teaser und importierte Rechtstexte benötigen weiter eine vollständige fachliche/redaktionelle Freigabe
- Projektweite Lint-Prüfung: zahlreiche bestehende Formatierungs-/Regelverletzungen; aktuelle Vorschau kompiliert fehlerfrei

## UI/UX-Vorgaben (15.11.)
- [x] Gemeinsame Video-Bedienung: getrennte 44px-Touch-Zonen, Lautstärke, Tastatur und Fehlerzustände verfeinert
- [x] Kopfbereich beim Scrollen: bestehende Glasfläche, Menü-Fokus und mobile Bedienung vereinheitlicht
- [x] Desktop/Handy: Bedienabläufe und sechs Seiten geprüft, 20 Tests bestanden; Anmeldung und MCP-Zugriff unverändert
- [x] Fehlende Beschreibungen und Social-Metadaten aller Inhaltsseiten ergänzt

- [x] Startseite von nexifyai.cloud kopieren
- [x] Seiten übernehmen: /leistungen, /kontakt, /teileklar, /teileklar/werkstatt, /teileklar/partner-werden
- [x] Menü-/Footer-Links auf die neuen Seiten verknüpfen und prüfen (Desktop + Handy)
- [x] Qualitätsanspruch (Ziel vom 14.11.): Seiten mit Original abgeglichen, Bedienelemente geprüft, keine Konsolenfehler
- [x] Videos auf Unterseiten verteilen (ein Film pro Seite, nur oben automatisch)
- [x] Handy/Safari: App-Installation (Startbildschirm) ergänzt; Safari-Test im Sandkasten nicht möglich (Video-Absturz der Test-Engine)

## Frontend-Feinschliff (Auftrag 14.11., autonome UX-Engine)
- [x] Layout-Sprünge beim Laden (CLS 0.1–0.23 auf Unterseiten) beseitigen – jetzt ≤ 0.002 auf allen Seiten
- [x] NeXify-Seiten-Stylesheets als cachebare Dateien statt 420-KB-Text in HTML + JS; ältere TEILEKLAR-Seiten noch nicht vollständig migriert
- [x] Deutsche, markengerechte Fehler- und „Seite nicht gefunden“-Seite
- [x] Kontakt- und Partnerformular: Prüfung mit verständlichen Fehlermeldungen, Bestätigung, Zustellung per E-Mail-Programm an mail@nexifyai.cloud
- [x] Bekannte Angebots-/Termin-/Frageknöpfe mit validiertem Anfrageentwurf verbunden
- [x] NeXify-Chat: echte ORACLE-Beratung mit Lade-/Fehlerzustand; ältere TEILEKLAR-Hilfe noch offen
- [x] Gemeinsame Menü-/Chat-Tastaturabläufe geprüft; vollständige Screenreader-/WCAG-Prüfung nicht bestätigt


## Fehlende Seiten übernehmen (Hinweis Nutzer 14.11. „dir fehlen aber Seiten“)
- [x] Rechtliche Seiten importiert; vollständige inhaltliche/rechtliche Freigabe nicht bestätigt
- [x] Produktseiten importiert; Verfügbarkeit/Zugang nur gemäß vorhandenen Informationen beschrieben
- [x] Angebots-, Leistungs-, Wissens- und Unternehmensseiten importiert
- [x] Konto: /anmelden, /registrieren mit echter Anmeldung vorhanden
- [x] Alle genannten TEILEKLAR-Seiten vorhanden; Produkt-/Kategorieziel ergänzt, fehlende Commerce-Anbindung transparent
- [x] Neue Seiten an gemeinsame Bausteine angeschlossen; 46 öffentliche Inhaltsseiten mit 200-Antwort und einem Inhaltsrahmen geprüft

## Interner Betriebsagent AIFly ORACLE (16.11.)
- [ ] Zugang „nexify.login-aifly-oracle“ klären und einordnen
- [ ] Umfang: Anfragen/Leads, TEILEKLAR, Kundenportal/Suite, Tagesbericht/Aufgaben
- [ ] Bestehenden ORACLE-Zugang lesend klären (keine Betriebsänderung, kein neuer Agent)
- [x] Pausiert auf Wunsch: Kontaktformular echt absenden + Slack-Meldung (Slack bereits verbunden)

## Offen (16.11.)
- [x] TEILEKLAR-Teilefragen speichern (Tabelle)
- [x] Anhang bis 10 MB, privat
- [x] Shop gefüllt: 3.720 Artikel aus dem bisherigen Shop-Feed, Katalog/Suche/Kategorien/Artikelseiten
- [ ] ORACLE: Nachricht 16.11. 03:41 in #oracle-agent-inbox gesendet – Antwort offen
- [x] Veröffentlicht: nexifyai.de erreichbar (16.11. 05:51 UTC)
- [x] Helles Design (#FFC758): Vergleich Startseite, Kontakt, Produktseite (Computer + Handy) erstellt; Farbkante im Beratungsfeld und Sprachauswahl in der Hauptversion behoben (übernimmt der Entwurf bei Annahme); TEILEKLAR bleibt dunkel
- [x] Helles Design abgelehnt (16.11.) – dunkles Graphite-Design bleibt

## Gesamtfertigstellung (16.11.)
- [ ] Skill hinzufügen („npx skills add <owner/repo>“) – wartet auf konkretes Repository von Pascal; Übernahme dann nur als geprüfte Dokumentation mit Herkunftsangabe
- [x] Studienkolleg-Aachen-Projekt lesend ausgewertet (nur Muster, keine Kundeninhalte); übernommen: Modellprüfung ohne stillen Ersatz + Zeitlimit für KI-Aufrufe (ORACLE), Regel in AGENTS.md
- [ ] KI-Modellvorgabe klären: Regel sagt DeepSeek V4.1 Flash 1017, ORACLE nutzt GPT-6 Astra (DeepSeek nicht im KI-Gateway); Messung im Schwesterprojekt: 1017 bestand JSON-Test nicht, 0731 schon – Entscheidung Pascal, dann 9router-Verbindung verknüpfen
- [ ] Liefernachweise je Paket (Abhängigkeiten, Abnahmebeleg, Rückweg) als agenturweite Vorlage – nach Pascals Freigabe des Formats
- [x] MCP-Zugang ohne Anmeldung und mit falschem Token: jeweils 401 (16.11.)
- [ ] MCP: Test mit gültigem fremdem Konto/Mandant – braucht zweites Testkonto
- [x] Sprachumschaltung (i18n): Auswahl DE/NL/FR/EN hatte keine Funktion und keine Übersetzungen – entfernt
- [ ] Mehrsprachigkeit NL/EN als echtes Vorhaben: Übersetzungen inkl. Rechtstexte brauchen Pascals Entscheidung und Freigabe der Texte
- [x] App-Leiste unter dem Footer: Abstand am Knopf „Nicht jetzt“ korrigiert (12 px statt 8 px; eingeklappt bündig mit Footer-Spalte)
- [x] Anfragen echt speichern + Slack-Meldung (Kontakt end-to-end geprüft; Partner, Termin, Gutschein, Teilefrage nutzen denselben Weg)
- [x] Geschützter Arbeitsplatz für Anfragen (Admin-Rolle, Status, Anhänge)
- [x] TEILEKLAR-Katalog (3720 Artikel) importieren, Liste/Suche/Kategorien/Artikelseite, Bildweiterleitung, täglicher Abgleich
  - [x] Import, Liste, Suche, Kategorien, Artikelseite, Seitenwechsel
  - [x] 14 Sortimentsbereiche aus Artikelnamen statt fehlerhafter Lieferantenkategorien (13 Artikel im Sammelbereich)
  - [x] Eigene Bildkopien: 410 Fotos in privater Ablage, 3.310 Artikel ohne Foto an beiden Quellen („Kein Produktfoto“), Artikel mit Foto zuerst
  - [ ] Fehlende Produktfotos (3.310) beim Lieferanten/Datenpfleger anfordern – Pascal
  - [ ] Zeitpläne (Katalog 02:00–02:55 UTC, Fotos 03:00–05:50 UTC) laufen erst nach Veröffentlichung gegen die echte Adresse – ersten Lauf prüfen
- [x] Texte zu Formular/Datenschutz an echtes Absenden angepasst
- [x] Shop-Kopfzeile: helle Ansicht und Handy-Menü geprüft (390 px ohne Überlauf, Menü öffnet und schließt per Esc)
- [x] Admin-Rolle: Inhaberkonto von Pascal bestätigt (16.11.) und freigeschaltet
- [ ] Eigener privater Slack-Kanal: Slack-Verbindung braucht Recht groups:write – bis dahin Meldung in Pascals Slack-Direktnachricht

## Autopilot (16.11., 05:46 UTC)
- [x] Sicherheit: Schnellprüfung ohne Befund, 0 bekannte Schwachstellen in 64 Abhängigkeiten; tiefe Prüfung zuletzt 14.11. (nicht neu gestartet)
- [x] ORACLE-Antwort in #oracle-agent-inbox lesend geprüft: 05:48 UTC weiterhin keine Antwort
- [x] 47 Seiten bei 1280px: 0 Laufzeitfehler, 0 Überlauf, 0 automatisch erkannte WCAG-A/AA-Verstöße (axe 4.10); 97 interne Links alle 200
- [x] Filme: alle fünf Markenfilme enthalten Sprache (lokal erkannt), nur einer hatte Text – Untertitel und „Gesprochener Text“ für alle fünf ergänzt, Untertitel-Knopf in der gemeinsamen Filmbedienung; 12 Filmseiten bei 1280/390px ohne Größenänderung, Untertitel bei 1280/390/320px im Browser geprüft. ANNAHME: Wortlaut automatisch erkannt, Markennamen von Hand gesetzt – Pascal bitte gegenlesen
- [x] aria-label auf zwei rollenlosen Containern (Kostenhinweis Startseite, Geräteliste App-Leiste) korrigieren
- [x] Handy-Durchlauf (390px): 47 Seiten ohne Überlauf/Laufzeitfehler
- [x] Anmeldeseite mit Rücksprungziel (z. B. vom Arbeitsplatz): Hydrationsfehler der Kontowechsel-Links behoben und geprüft
- [x] „Lovable“ entfernen: Favicon (Lovable-Herz) durch NeXify-Figur ersetzt (PNG + ICO 16/32/48); App-Symbole und Manifest waren bereits NeXify; ausgelieferte Seiten ohne „Lovable“
- [x] Plattform-Hinweis „Edit with Lovable“: bereits ausgeblendet (Einstellung gelesen 06:06 UTC); Live-Seiten ohne „Lovable“ im Seitentext
- [ ] Anmelde-E-Mails (Registrierung, Passwort) kommen noch mit Standard-Absender der Plattform – eigene Absenderdomain nexifyai.de einrichten (Dialog + DNS, Pascal)
- [x] Abschlussprüfung: 91 Tests, Typprüfung und Build ohne Fehler, Sicherheits-Schnellprüfung ohne Befund, 47 Seiten bei 1280/390px; erneute Veröffentlichung 06:08 UTC angestoßen
- [x] Formatierung vereinheitlicht (Prettier über src); verbleibend „any“-Hinweise, ohne Funktionsänderung

## Zurückgestellt (Pascal, 16.11.)
- Modellwechsel KI, Skill-Import, Veröffentlichung
- [ ] „Scrapen“ fehlender Produktfotos: nur mit Bildrechten (Hersteller-/Lieferantenfreigabe); ungeklärte Fremdbilder nicht übernehmen – Klärung Pascal

- [x] NeXify 9router (DeepSeek) mit Projekt verbunden; Test 16.11. 06:41 UTC: Modell deepseek/deepseek-v4.1-flash-1017 antwortet korrekt
- [x] ORACLE bleibt auf bisherigem KI-Modell (Pascal 16.11.) – keine Umstellung
- [ ] Wofür DeepSeek im Projekt eingesetzt werden soll, wenn nicht ORACLE – Entscheidung Pascal

- [x] ORACLE (ChatGPT) Anbindungsweg: MCP-Server nexifyai.de/mcp mit Anmeldung; neues lesendes Werkzeug „Anfragen lesen“ (nur Admin-Rolle)
- [ ] ORACLE in ChatGPT: Connector https://nexifyai.de/mcp anlegen und mit Inhaberkonto anmelden (Pascal)
- [x] Shopbilder: helle Studiofläche + Abschneide-Fehler behoben (Bild 218px in 190px-Feld → passt)

- [x] Server 1: BigBuy-Schlüssel in OpenBao/Starteinstellungen nur per Metadaten prüfen
- [ ] Eigenen MCP-Server (nexifyai.de/mcp) als Verbindung hier einbinden; Anleitung Claude Code/ChatGPT
- [x] Arbeitsplatz geprüft: Lesen/Ändern nur Admin per Datenbankregel, Rollenprüfung nur eigenes Konto, Scan ohne Befund (16.11.)
- [x] SSH-Schlüsselübersicht mit Markierungen (nichts löschen)
- [ ] SSH-Bereinigung: Plan liegt vor, wartet auf Freigabe
- [x] Unbekannte SSH-Anmeldungen geprüft
- [x] Arbeitsplatz-Sicherheitsprüfung
- [x] Alt-Texte: alle Bilder haben alt; 6 dekorative Markenzeichen zusätzlich aria-hidden (ORACLE ausgenommen)
- [ ] MCP lokal in der Desktop-App: Einrichtung durch Pascal (Einstellungen → Connectors → Local MCP servers); hier Verbindung zu nexifyai.de/mcp per Karte
- [x] Nächtliche Aufträge 16.11. 07:33 UTC testweise ausgelöst: beide 200 mit Anmeldung; erster Kaltstart lief in 5-s-Zeitlimit (07:30), Zeitplan danach zurückgesetzt. Erster echter Nachtlauf 17.11. 02:00 UTC prüfen
- [x] nexifyai.cloud + www leiten seit 16.11. 07:47 UTC über Tunnel (Server 1, eigener Port 8913) dauerhaft auf nexifyai.de, Pfad bleibt; Unteradressen/MX unverändert; Rückweg /root/nexifyai-cloud-weiterleitung-rueckweg.md. Hinweis: Hauptadresse geht per vorhandener Cloudflare-Regel erst auf www (2 Sprünge) – Regel nicht änderbar mit vorhandenem Zugang
- [x] Shop: Sortierung (empfohlen, Preis auf/ab, Name) und Varianten als ein Artikel mit Größenauswahl – 3.720 Artikel → 3.349 Kacheln (16.11.)
- [x] Shop: 397 von 410 Produktfotos freigestellt (13 bewusst ausgelassen: Rand nicht weiß), Originale erhalten; Werkzeug scripts/teileklar_cutout.py
- [x] HISTORIE korrigiert: neue Produktfotos werden seit 16.11. über Server 1 täglich 06:15 UTC freigestellt; erster echter neuer Upload bleibt offen
- [ ] Fehlende Produktfotos: kein Scraping fremder Seiten (Bildrechte); BigBuy-Zugang als Lieferantenquelle per EAN prüfen
- [x] Skill „NeXify-Kundendesign-Standard“ aktiv (mit Kontrastprüfung), Kopie + ZIP unter Dateien/skills (16.11.)
- [x] Helle Ansicht: grüne Status-/Aktivschrift unter 4.5:1 → neue Rolle --signal-text (Shop „Auf Lager“ 2,55 → 5,26:1); Fokusrahmen Katalog über --ring
- [x] Produktdarstellung: 16 Seiten mit Anthropic-Prüfregeln (knowledge-work-plugins e91a134) durch DeepSeek bewertet, 20 geprüfte Textverbesserungen in 26 Dateien übernommen, Bericht unter Dateien/produktdarstellung (16.11.)
- [x] Filmtexte: nach Auftrag 09:23 UTC auf geprüfte Zuschnitte/Standbilder umgestellt; Originale unverändert, Untertitel folgen Ton, keine erfundene Referenz
- [x] Produktnamen mit vorhandenen Fakten konsistent erklärt; FACTORY kein zusätzliches Produkt/Zugang, Rechtsarchive unverändert
Arbeitsmodus (Pascal, 16.11., „Autonomous Finisher Protocol“): Lücken selbst finden, schließen, prüfen, live bringen – innerhalb der harten Grenzen (keine Platzhalter/Mocks in Produktion, keine umgangenen Freigaben, keine Kosten).

- [x] Veröffentlicht 16.11. 08:35 UTC: Produkttexte, Shop (Sortierung, Varianten, freigestellte Fotos), Sitemap; live geprüft 37 Seiten × 1280/390 px ohne Fehler, Überlauf oder fehlende Alternativtexte
- [x] DeepSeek deepseek-v4.1-flash-1017 über 9router 16.11.: 16 Seitenbewertungen als JSON, Modellkennung jedes Mal bestätigt; 3 Läufe brauchten mehr Antwortspielraum
- [x] Arbeitsmodus erweitert (Omni-Enterprise-Papier 16.11.): alle Bereiche, gleiche harten Grenzen
- [x] Antwortzeiten gemessen 16.11.: 0,07–2,6 s schwankend auch bei statischen Seiten (Kaltstart der Auslieferung, nicht App-Code); Datenbankabfragen 10–27 ms, Index auf synced_at ergänzt
- [ ] Kaltstarts der Auslieferung (bis 3,4 s von Server 1) – nur über Hosting beeinflussbar, weiter beobachten
- [x] Server 1: Freistellung täglich 06:15 UTC eingerichtet, Probelauf 16.11.: 13 offen, 13 bewusst ausgelassen (Rand nicht weiß); Doku ops/server1/README.md
- [ ] Erster Freistellungs-Upload durch den Server-Auftrag mit neuem Foto nachweisen (nach Nachtlauf 17.11.)
- [x] Server 1: Überwachung alle 5 Min aktiv, Slack-Testmeldung 16.11. zugestellt; Grenze: bei Totalausfall nur Protokoll

## Slack-Empfangsadresse auf nexifyai.de (16.11., 11:50 UTC)
- [ ] Event-URL der App „NeXify Betriebsanbindung“ auf https://nexifyai.de/api/public/slack/events umstellen. BLOCKER: Das Einrichtungswerkzeug setzt die URL fest, und das Recht app_configurations fehlt. Lösung durch Pascal (Weiterleitung unter Domains) oder durch einen Slack-Admin.

## Brain- und Wissensinventar (16.11., 12:17 UTC)
- [ ] Brain (agentmemory, mcp-gateway, LightRAG, Wissensbasis) auf beiden Servern nur lesend per SSH inventarisieren; keine Geheimnisse, keine Änderungen
- [ ] Repository nexify-ai-finales-agentur-gesamtprojekt-09-2026 als Quelle für Jeff- und ORACLE-Funktionen auswerten (nur lesend)
