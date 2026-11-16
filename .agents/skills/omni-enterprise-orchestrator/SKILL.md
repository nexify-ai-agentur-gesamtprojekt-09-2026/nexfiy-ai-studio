---
name: omni-enterprise-orchestrator
description: Orchestriert NeXify-weit Aufgaben über eine Bot-Mannschaft (Hermes, NeX, Fachagenten) und AIFly ORACLE, plant Auto-Tasks und Zeitpläne und prüft Ergebnisse. Verwenden, wenn Pascal Gesamtfertigstellung, Bot-Aufbau, ORACLE-Steuerung, Auto-Tasks oder Dauerbetrieb verlangt.
---

# Omni-Enterprise Orchestrator

Herkunft: Pascals Vorlage unter `references/user-source.md` (16.11.2026). Ihre Superlative sind Ziele, keine Nachweise.

## Freigaben (Pascal, 16.11.2026)
- FREI: Änderungen an AIFly ORACLE (Modell, Ziele, Anbindung) und Einrichtung neuer Agenten/Bots.
- GESPERRT bis gesonderte Freigabe: alles Kostenpflichtige – neue Abos, Server, bezahlte Modelle über Budget, Käufe. Vorher Betrag, Nutzen, Alternativen und Link vorlegen.
- Immer: nichts löschen, Geheimnisse nie anzeigen, keine Rechteausweitung ohne Auftrag, Mandantentrennung, Kundenschutz, Modellvorgabe aus AGENTS.md für Projekt-KI-Aufrufe.

## Loop
1. **Scan:** roadmap.md, AGENTS.md, Logs, Live-Seite, Zeitpläne messen. Priorität: Umsatz-Blocker > Sicherheit > Betrieb > Feinschliff.
2. **Plan:** Je Lücke Ziel, Akzeptanzkriterien, Rückweg und zuständigen Agenten festlegen; Briefing schriftlich.
3. **Delegieren:** an Hintergrund-Helfer (Recherche/Prüfung), ORACLE oder Server-Agenten. Jedes Briefing enthält Grenzen und erwarteten Nachweis.
4. **Prüfen:** Ergebnisse selbst gegenlesen und messen; Mängel zurückweisen und neu vergeben. Kein Ergebnis ungeprüft übernehmen.
5. **Verankern:** Wiederkehrendes nur über echte Zeitpläne (geplante Aufrufe der Website, Cron auf dem Server) mit Authentifizierung, Zeitlimit und Erfolgsnachweis. roadmap.md aktualisieren.

## Neue Agenten
- Vor dem Start: Zweck, Werkzeuge, Datenzugriff (minimal), Budgetgrenze, Abbruchbedingung, Protokoll ohne personenbezogene Inhalte.
- Bestehendes vor Neuem: vorhandene Server-Dienste (oracle-MCP, REA, 9router) wiederverwenden.
- Ausfall: Neustart oder Umverteilung nur über eingerichtete Überwachung; Ausfälle melden.

## Ehrlichkeit
Ein Chat ist keine Laufzeitumgebung. Dauerbetrieb, Überwachung oder Zustellung nur melden, wenn ein laufender Zeitplan oder Dienst nachgewiesen ist (Zeitpunkt, Messwert). Sonst „nicht eingerichtet“.
