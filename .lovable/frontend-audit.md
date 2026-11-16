# Gesamtprüfung seit dem Erstimport

Stand: 16. November 2026. Grundlage: frühere Aufträge, aktuelle Quellen, sechs Testsuiten und gezielte Browsermessungen. Keine vollständige Geräte-, Rechts- oder Produktionsfreigabe.

## In dieser Runde korrigiert
- ORACLE-Antworten: statische Formatierung, 16px Schrift / 26,4px Zeilenhöhe, 16px Absatzabstände, getrennte Sprecher und katalogbasierte Einstiegslinks. Modell-HTML, Bilder und fremde Links werden nicht dargestellt.
- Suite-Einstieg und FAQ von Agenturbeauftragung getrennt; Agenturangebote und Produktkosten sprachlich getrennt. Bestehende API-Zugangsbedingungen bleiben erhalten, bis andere verifizierte Bedingungen vorliegen.
- Sieben ältere Videoplayer auf SiteFilm umgestellt, vorhandenen Arbeitsbereichsfilm in den gemeinsamen Katalog aufgenommen.
- Nicht-Hero-Filme starten beim Zurückscrollen nicht mehr automatisch; reduzierte Bewegung wird beim erneuten automatischen Start geprüft.
- Deutsche Dokument-Standardsprache; Cookie-Seite behauptet keine verfügbaren Einstellungen mehr.

## Erkannte offene Abweichungen
1. TEILEKLAR besitzt noch kopierte Rahmen und unvollständige Chatbedienung; neuere Seiten nutzen nicht alle gemeinsamen Bausteine. Der öffentliche Suite/API-Berater ist kein Teileberater.
2. Angebote/Terminwünsche und „Begleitung starten“ enthalten noch wirkungslose Knöpfe. Kontakt- und Partnerformulare verwenden E-Mail-Übergabe, keine serverseitige Zustellung.
3. Shop, Warenkorb und Kasse sind nicht mit einem funktionierenden Warenkatalog oder Zahlungsablauf verbunden. Such-, Filter- und Wiederholen-Knöpfe sind teilweise statisch.
4. Passungsoberfläche und Reifenrechner sind keine vollständigen Rechner; Batterie-Berater ist ausdrücklich noch nicht verfügbar. Produkt- und Kategorie-Detailseiten fehlen.
5. TEILEKLAR-Terminformular verwendet noch eine native, nicht angeschlossene Übermittlung.
6. Theme-Schalter hat noch keine funktionale Umschaltung. Einige TEILEKLAR-Seiten betten große Styles als Text ein.
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