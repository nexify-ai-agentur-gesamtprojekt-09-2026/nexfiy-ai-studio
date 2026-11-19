# Roadmap
- [x] Startseite von nexifyai.cloud kopieren
- [x] Seiten übernehmen: /leistungen, /kontakt, /teileklar, /teileklar/werkstatt, /teileklar/partner-werden
- [x] Menü-/Footer-Links auf die neuen Seiten verknüpfen und prüfen (Desktop + Handy)
- [x] Qualitätsanspruch (Ziel vom 14.11.): Seiten mit Original abgeglichen, Bedienelemente geprüft, keine Konsolenfehler
- [x] Videos auf Unterseiten verteilen (ein Film pro Seite, nur oben automatisch)
- [x] Handy/Safari: App-Installation (Startbildschirm) ergänzt; Safari-Test im Sandkasten nicht möglich (Video-Absturz der Test-Engine)

## Frontend-Feinschliff (Auftrag 14.11., autonome UX-Engine)
- [x] Layout-Sprünge beim Laden (CLS 0.1–0.23 auf Unterseiten) beseitigen – jetzt ≤ 0.002 auf allen Seiten
- [x] Seiten-Stylesheets als cachebare Dateien statt 420-KB-Text in HTML + JS (pixelgleich geprüft)
- [x] Deutsche, markengerechte Fehler- und „Seite nicht gefunden“-Seite
- [x] Kontakt- und Partnerformular: Prüfung mit verständlichen Fehlermeldungen, Bestätigung, Zustellung per E-Mail-Programm an mail@nexifyai.cloud
- [ ] Buttons ohne Funktion (z. B. „Angebot anfragen“, „Terminwunsch nennen“) mit echter Funktion belegen
- [x] Chat-Eingabe: verständlicher Zustand statt stillem Nichts beim Absenden (ohne Backend durch sichtbaren Verfügbarkeitshinweis und Kontaktweg ersetzt)
- [ ] Tastatur & Screenreader: Fokus-Ringe, Menüs, Chat-Panel auf allen Seiten prüfen


## Fehlende Seiten übernehmen (Hinweis Nutzer 14.11. „dir fehlen aber Seiten“)
- [ ] Rechtliches: /impressum, /datenschutz, /cookies, /barrierefreiheit, /ki-hinweise, /vertragsgrundlagen
- [ ] Produkte: /produkte/nex2fly, /produkte/one, /produkte/api, /produkte/aifly-oracle, /produkte/nex-agentic-aifly, /produkte/skills-mcp
- [ ] Angebot & Wissen: /loesungen, /preise-ablauf, /leistungsumfang, /leistungen/websites, /leistungen/agenten-automatisierung, /leistungen/apps-portale, /wissen, /wissen/projekt-vorbereiten, /unternehmen, /portale
- [ ] Konto: /anmelden, /registrieren
- [ ] TEILEKLAR: /teileklar/rechtliches, /shop, /kategorien, /kategorie, /produkt, /fahrzeug-und-passung, /suche, /warenkorb, /kasse, /bestellungen, /termine, /gutscheine, /reifenrechner, /batterie-berater
- [ ] Neue Seiten an gemeinsame Bausteine anschließen (Stylesheet-Datei, Filme, Formulare, Menüs) und Links prüfen

## Frontend-Korrekturen 18.11.2026
- [x] Angebots-, Termin-, Kampagnen- und Frage-CTAs führen zum Kontaktformular mit passender, ausschließlich lokal vorausgefüllter Einleitung.
- [x] Chat ohne Backend: sichtbarer Verfügbarkeitshinweis mit Kontaktweg statt nicht absendbarer Eingabe; Themenkarten verlinken echte Seiten.
- [x] TEILEKLAR-Hilfe an gemeinsamen Panel-Zustand angeschlossen, ohne beim Öffnen Formularfelder durch eine zweite Seitenkopie zu ersetzen.
- [x] Native Bereichsauswahl mit funktionierenden Zielen statt importierter, funktionsloser Combobox-Kopie.
- [x] Fokus-Ringe, Escape/Fokusrückgabe, mobile Fokusbegrenzung und korrekte native Disclosure-Zustände ergänzt und durch Regressionstests abgesichert.
- [ ] Vollständige manuelle Tastatur-/Screenreader- und Safari-Abnahme auf allen Seiten. Automatisierte Prüfungen ersetzen diese Abnahme nicht.

Die älteren Punkte „fehlende Seiten“ sind ein Import-Backlog, kein aktueller Fehlbestand: viele Routen existieren bereits. Ihre vollständige Inhalts- und Funktionsabnahme bleibt separat offen. Anmeldung, Registrierung, Passwortversand, Produktdaten, Warenkorb/Kasse, Werkstattsuche und KI benötigen weiterhin echte Backend-Anbindungen. Dieses Frontend-Update simuliert diese Dienste nicht. Design-/Markenentscheidungen aus PR #2 bleiben unverändert offen.
