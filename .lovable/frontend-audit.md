# Gesamtprüfung seit dem Erstimport

Stand: 16. November 2026. Grundlage: frühere Aufträge, aktuelle Quellen, sechs Testsuiten und gezielte Browsermessungen. Keine vollständige Geräte-, Rechts- oder Produktionsfreigabe.

## In dieser Runde korrigiert
- ORACLE-Antworten: statische Formatierung, 16px Schrift / 26,4px Zeilenhöhe, 16px Absatzabstände, getrennte Sprecher und katalogbasierte Einstiegslinks. Modell-HTML, Bilder und fremde Links werden nicht dargestellt.
- Suite-Einstieg und FAQ von Agenturbeauftragung getrennt; Agenturangebote und Produktkosten sprachlich getrennt. Bestehende API-Zugangsbedingungen bleiben erhalten, bis andere verifizierte Bedingungen vorliegen.
- Sieben ältere Videoplayer auf SiteFilm umgestellt, vorhandenen Arbeitsbereichsfilm in den gemeinsamen Katalog aufgenommen.
- Nicht-Hero-Filme starten beim Zurückscrollen nicht mehr automatisch; reduzierte Bewegung wird beim erneuten automatischen Start geprüft.
- Deutsche Dokument-Standardsprache; Cookie-Seite behauptet keine verfügbaren Einstellungen mehr.

## Erkannte offene Abweichungen
1. TEILEKLAR-Rahmen/Hilfe vereinheitlicht; öffentliche Hilfe ist ausdrücklich keine automatische Teileprüfung.
2. Bekannte Angebots-/Termin-/Frageknöpfe und 24 Begleitungsmenüs angeschlossen. Formulare verwenden weiterhin E-Mail-Übergabe, keine serverseitige Zustellung.
3. Warenkatalog, Werkstattverzeichnis und Zahlungsablauf fehlen extern; keine vorgetäuschten Ladefehler mehr. Suchbegriffe gehen in Anfrageentwürfe, Werkstattsuche öffnet auf Wunsch Karten.
4. Nominaler Reifenvergleich funktioniert und ist getestet, erteilt keine Fahrzeugfreigabe. Produkt-/Kategorieziel ergänzt; automatische Passung/Batterieauswahl fehlen weiterhin.
5. Terminanfrage mit Pflichtfeldprüfung und gültiger E-Mail-Übergabe getestet; keine Online-Terminreservierung.
6. Theme-Schalter funktioniert und bleibt gespeichert; TEILEKLAR-Styles als Dateien eingebunden.
7. API-Produktseite verlangt derzeit eine Projekteinstellung. Das steht im Spannungsfeld zum gewünschten vollständig eigenständigen DIY-Zugang. Einen nicht vorhandenen Freischaltungsablauf zu versprechen wäre falsch.
8. Gesamte Texte, wiederholte Teaser und Rechtsseiten sind noch nicht abschließend redigiert. Produkttarife sowie vollständige Datenschutz-/Vertragsinformationen warten auf verifizierte Angaben/Freigabe.
9. Manifest und iOS-Metadaten sind vorhanden, jedoch kein Offlinebetrieb. Echtes Safari/iPhone, vollständige WCAG-Konformität und externer MCP-OAuth-Client-Flow sind nicht abschließend getestet.
10. Projekt-Lint meldet zahlreiche bestehende Formatierungs- und weitere Regelverletzungen; Tests und Vorschau-Kompilierung sind davon getrennte Signale.

## Nicht als Abweichung werten
- Lokale Cover-Bilder liefern keine absolute HTTPS-URL: OG-/Twitter-Bildtags werden dafür korrekt weggelassen.
- Anmeldung und geschützter MCP-Zugriff bleiben unverändert. Es wurden keine anderen Sicherheitsfunde bearbeitet oder ignoriert.
- Die Original-Website wurde nicht verändert; verwendete Medien bleiben lokal.

## Messungen
Leistungsseite: 1705px = 1185px Seite + 8px Trennlinie + 512px Chat; 1280px = 888px + 8px + 384px; 900px = 572px + 8px + 320px. Bei 390px ist der Chat eine eigene Vollbildansicht. Keine horizontale Überbreite in den gemessenen Ansichten.

## Technische und gestalterische Nacharbeit 16.11.
- 46 öffentliche Inhaltsseiten: HTTP 200, genau ein main, keine Browser-Laufzeitfehler. 35 Tests erfolgreich.
- Desktop-Mausziehen: 384px → 483px; einklappen gibt volle Seitenbreite frei. Mobile Menüs, Escape, Fokusbegrenzung und Fokusrückkehr funktionieren.
- Chatposition vor/nach Hydration bei 1280px identisch; mobil vor Öffnung unsichtbar. Finaler mobiler Unternehmens-Kaltstart CLS 0 im geprüften Lauf; keine allgemeine Core-Web-Vitals-Garantie.
- Header sticky, 84px Desktop-Gesamthöhe; Buttonabstand rechts/oben/unten jeweils 8px vor/nach 800px Scroll bei 1705 und 1280px.
- Shared Schriftbild und Glasrollen verfeinert; Unternehmen, Startseiten und 28 Themenseiten mit konkreterer Gliederung erweitert. Fachliche/Rechtsfreigabe bleibt ausstehend.