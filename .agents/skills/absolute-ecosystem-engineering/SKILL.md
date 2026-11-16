---
name: absolute-ecosystem-engineering
description: Projektgebundener Architect–Build–Harden–Deploy-ready-Ablauf für mehrstufige Entwicklungs-, Integrations- und Härtungsaufgaben an NeXify und TEILEKLAR. Verwenden bei Formularnacharbeit, externen Diensten, Sicherheitsprüfung und Betriebsübergabe; Auftrag und vorhandene Zugriffsrechte sind erforderliche Eingaben.
---

# Absolute Ecosystem Engineering

## Geltung
Der von Pascal bereitgestellte Upload ist Grundlage dieses Arbeitsablaufs. Das unveränderte Dokument liegt als Herkunftsbeleg unter `references/user-source.md`; seine Superlative sind keine Nachweise. Plattformregeln, `AGENTS.md`, projektbezogene Erinnerungen, freigegebene Markenwelt und aktuelle Rechte bleiben maßgeblich. Der Skill erteilt keine Deployment-, Zahlungs-, Lösch-, Datenzugriffs- oder Rechteänderungsfreigabe.

## Architect
1. Lies die betroffenen gemeinsamen Bausteine, Regeln und vorhandenen Prüfsignale. Bestimme Ziel, Scope, Akzeptanzkriterien, Abhängigkeiten und bei Betriebsrisiko einen nachvollziehbaren Rückweg.
2. Prüfe Mandantengrenzen und Datenbesitz. Verwende bestätigte bestehende Dienste; eine Chat-Verbindung ist kein Adapter der Anwendung. Halte NeXify, öffentliche Beratung und TEILEKLAR getrennt.
3. Behalte die tatsächliche TanStack-Start-/Worker-Architektur bei. Lade die Plattformanleitung vor Änderungen an Serverfunktionen, Auth, Rollen, Datenbank oder externen Diensten. Neue Muster brauchen belegten Bedarf.

## Build
1. Behebe die gemessene Fehlerklasse in kleinen vollständigen Paketen; aktualisiere gleichartige Pfade gemeinsam. Nutze gemeinsame Komponenten und semantische Tokens, ohne freigegebene Abstände und Marke neu zu gestalten.
2. Validiere Eingaben dort, wo sie verarbeitet werden. Binde Rechte an bestätigte Identität und RLS; niemals an frei editierbare Angaben. Beachte bestehende typisierte Verträge und dokumentiere Änderungen, ohne unnötige Schnittstellen einzuführen.
3. Gestalte Lade-, Fehler-, Leer- und Erfolgszustände wahrheitsgemäß. Eine Anfragevorbereitung ist kein Versand, ein Terminwunsch keine Buchung, ein Rechner keine Passungsfreigabe. Fehler dürfen keine erfundenen Ersatzwerte erzeugen.

## Harden
1. Ergänze kleine Verhaltenstests für betroffene Regeln und Regressionen. Prüfe reale Hauptwege und Tastaturbedienung auf Desktop/Handy, helle/dunkle Ansicht und reduzierte Bewegung/Transparenz; messe Überlauf und Layoutverschiebungen.
2. Prüfe externe Operationen auf sinnvolle Zeitlimits, Wiederholbarkeit, Idempotenz und bestehende Rate-Limits; führe Circuit Breaker nur bei belegtem Bedarf ein. Protokolliere keine Credentials, Tokens, Nachrichteninhalte oder personenbezogenen Daten.
3. Erhalte vorhandene Sicherheitsprüfungen und Nachweispins. Keine deaktivierten Tests, stillen Modellwechsel, breiteren anonymen Rechte oder fremden Skripte als Abkürzung.

## Deploy-ready und Übergabe
1. Lies Ergebnisse nach Änderungen zurück und führe einschlägige Tests aus. Halte Architekturentscheidungen in `AGENTS.md` und offene Aufgaben in `roadmap.md` fest.
2. Trenne Vorschau, Veröffentlichung, Produktion und Abnahme. Veröffentlichung erfolgt nur im tatsächlich freigegebenen Weg; Domain-Umschaltungen beachten die projektbezogenen Freigabekriterien.
3. Berichte auf Deutsch: Ergebnis, Messwert/Quelle/Zeitpunkt, offene Grenze und nächster Schritt. Kennzeichne SOLL, IST, ANNAHME, HISTORIE und OFFEN passend. Behaupte weder produktionsreifen Dauerbetrieb, Zero-Downtime, Zustellung noch vollständige Compliance ohne Funktionsnachweis.