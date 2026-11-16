# ORACLE und Jeff: Bestand auf den Servern (nur lesend erhoben, 16.11.2026, 12:11–12:16 UTC)

Zugang: SSH als root mit der vorhandenen Schlüsseldatei (geschützte Kopie in /tmp, Modus 0600). Strikte Hostprüfung gegen die Fingerabdrücke, die Pascal um 11:41 UTC in der Konsole bestätigt hat. Auf den Servern wurde nichts geändert, BigBuy nicht aufgerufen.

## IST – Server 1 (srv1243952)
| Dienst | Zustand | Aufgabe |
|---|---|---|
| nexifyai-oracle-agent | läuft seit 15.11. 05:05 UTC, lokal 127.0.0.1:8891, HTTP 200 | ORACLE-Rolle (eve, self-hosted) |
| nexifyai-slack-oracle-bridge | läuft; fragt eine Slack-Direktnachricht alle 6 s ab | Slack-DM → ORACLE → Antwort |
| nx-jeff-workloop | läuft, meldet aber seit 15.11. 12:18 UTC alle 5 Min. „NeXify (Jeff) nicht erreichbar -> idle“ | Orakel-getriebene Arbeitsschleife (Autotasks) |
| nx-jeff health | 12:16 UTC: verfügbar, HTTP 200, Modell jev-1.13-free, Endpunkt lokal :20128 | Jeff-Orakel (choice/score/go-no-go) |
| nexifyai-oracle-health-check | letzter Lauf 12:00 UTC „ok“ | Überwachung |
| hermes-gateway | läuft; Warnungen: MCP „mem“ Anmeldung fehlgeschlagen | Messaging-Gateway |
| nexify-a2a-consumer | letzter Lauf 12:12 UTC, keine neuen Eingänge | ORACLE-Eingänge quittieren |

Dokumentation zu Jeff: /opt/verify-preise-2311/docs/jeff-integration.md (Exit 3 = nicht erreichbar → konservativ handeln).

## IST – Server 2 (srv1941843)
Weitere Hermes-Installation (Docker), Ablage nexify-jeff-marketplace mit Plugin „jeff“, inaktiver Dienst nex2fly-oracle-feed. Keine laufende ORACLE-Bridge gefunden.

## Befund
- SOLL Pascal: ORACLE auf Jeff-Basis wie vor AIfly. IST: Diese Grundlage existiert bereits und läuft auf Server 1; ein Neuaufbau ist nicht nötig.
- Ursache, dass die Autotasks ruhen: Die Arbeitsschleife hält Jeff für nicht erreichbar, obwohl `nx-jeff health` um 12:16 UTC verfügbar meldet. Warum die Schleife einen anderen Befund bekommt (Dienstbenutzer, Umgebung oder Prüfaufruf), ist OFFEN.
- Annahme von Slack-Aufträgen ist über die bestehende DM-Bridge vorhanden; dass sie Ende-zu-Ende antwortet, ist nicht geprüft.

## Gesperrt bis zu Pascals gesonderter Freigabe
Neustart oder Änderungen an Diensten, Testaufrufe an ORACLE/Jeff mit Ausführung, Slack-Testnachricht an die Bridge.
