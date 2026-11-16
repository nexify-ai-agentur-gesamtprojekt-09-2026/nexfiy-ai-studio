# Wiederherstellungsplan: Slack-Aufträge und Ergebnisrückmeldung über ORACLE (Jeff)

Stand 16.11.2026, 12:15 UTC. Quelle ist nur der lesende Befund von 12:11–12:16 UTC (`ops/server1/oracle-jeff-bestand-2026-11-16.md`). Für diesen Plan wurde kein neuer Serverzugriff ausgeführt. Die von Pascal genannte Quelle „[Repository oder frühere Adresse]“ ist ein unausgefüllter Platzhalter und damit OFFEN.

## Was „Jeff“ ist (IST, aus /opt/verify-preise-2311/docs/jeff-integration.md)
- `nx-jeff` ist ein Entscheidungsorakel mit dem Modell jev-1.13 (frei), angebunden über den lokalen Router :20128. Es führt keinen Chat und liefert nur choice, score, eine freie Antwort und go/no-go mit Risiko und Rückweg.
- Exit 3 bedeutet „nicht erreichbar“. Dann gilt: konservativ handeln und niemals „Jeff hat zugestimmt“ ohne Antwort.
- Eingesetzt wird Jeff bei Codex-Hooks, Doku-Gate, CI- und Deploy-Gate, im Orchestrator (cto/owner) und für den Audit-Trail in agentmemory.

## ORACLE früher und heute (IST)
- Eine ORACLE-Rolle (eve) läuft lokal auf :8891.
- Eine Slack-DM-Brücke fragt alle 6 s ab, leitet an ORACLE weiter und antwortet in Slack.
- Die Jeff-Arbeitsschleife (Autotasks) ruht seit 15.11. 12:18 UTC, Meldung „Jeff nicht erreichbar“.
- Eine A2A-Annahme und eine Eskalation für die oracle-Gruppe sind vorhanden.

## Phasen (jede Phase braucht eine eigene Freigabe von Pascal)
| # | Schritt | Art | Abnahme | Abbruch/Rückweg |
|---|---|---|---|---|
| 1 | Prüfaufruf der Arbeitsschleife einmal so ausführen, wie die Schleife ihn selbst aufruft (Benutzer, Umgebung) | lesend | Ursache benannt | nichts geändert |
| 2 | Brücke prüfen: abgefragte DM, letzter Abruf, Antwortweg | lesend | Kanal, Bot und letzter Erfolg belegt | nichts geändert |
| 3 | Korrektur der Ursache aus Schritt 1, minimal und mit gesicherter Originaldatei | Änderung | Schleife meldet „erreichbar“ | Original zurückspielen, Dienst wie vorher |
| 4 | Ein Testauftrag von Pascal per Slack-DM mit „status“ | Funktionstest | Annahme, Verarbeitung und Antwort mit Zeit und Referenz | keine Wiederholung bei Ausbleiben, erst rücklesen |
| 5 | Ausführungen durch Autotasks einzeln freischalten | Freigabe | pro Auftragstyp go/no-go durch Jeff und Pascal | Schleife auf idle |

## Grenzen
- Keine Kosten.
- BigBuy bleibt unverändert.
- Kein zweiter Agent; die Website-Slack-App bleibt getrennt.
- Ausführungen bleiben gesperrt, bis Phase 5 freigegeben ist.
