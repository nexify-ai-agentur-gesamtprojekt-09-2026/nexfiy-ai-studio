# Projektzuordnung und Originalquellen

Stand: 16.11.2026, 10:56 UTC. Anlass: Pascals Upload „SYSTEMPROMPT · NEXIFY PROJEKTCHAT“ und direkter Auftrag „Die Verbindungen kläre du“.

## SOLL
Der hochgeladene Projektauftrag gilt innerhalb bestehender Plattform-, Zugangs-, Kosten- und Mandantengrenzen. Er fordert quellengebundene Projektzuordnung, bestehenden Writer, stabiles Aufgabenregister und getrennte Zustell-/Empfangs-/Ausführungsbelege. Er erteilt keine neue kostenpflichtige Freigabe und umgeht weder abgelehnte Dialoge noch die ausstehende SSH-Hostbestätigung.

## Gelesene Originale und belastbare Zuordnung
| Quelle | Lesen / Versionsbeleg | Aussage / Grenze |
| --- | --- | --- |
| Pascals Originalupload | Vollständig 10:53 UTC gelesen, 6893 Bytes; unveränderte Kopie `ops/references/nexify-project-chat-2026-11-16.md`, Bytevergleich erfolgreich | Gültiger neuer Auftrag, kein Laufzeitnachweis |
| Upload-Prüfsumme | SHA256 `4bf9a383155267b1769edebf5f4dbb4dda34c52e8d151d1428bf29fe558301f3` | Nur nicht-geheimes Auftragsdokument; kein Geheimnishash |
| Root `AGENTS.md`, `src/lib/AGENTS.md` | In laufender Arbeit vollständig gelesen | Bestehende Architektur, Transport-/Ausführungsgrenzen; keine Rechtefreigabe |
| `roadmap.md`, `ops/slack-integration.md` | Vollständiger älterer Arbeitsstand sowie aktuelle betroffene Abschnitte gelesen | Bestehendes Aufgabenregister bleibt führend im lokalen Projekt, kein zweites Board |
| `package.json`, `vite.config.ts`, `src/server.ts`, `src/start.ts`, `src/router.tsx` | Vollständig gelesen | Tatsächliches Projekt ist TanStack Start, nicht das historische Next.js/pnpm-Monorepo |
| Projekt-URL-Dienst | Aktueller Abruf 10:54 UTC | Kanonisch `https://nexifyai.de`, veröffentlicht `https://nexfiy-ai-studio.lovable.app`, Vorschau eigenständige Preview-URL; Hosting-Metadaten sind keine fachliche Abnahme |
| Git-HEAD | Lokaler Leseabruf 10:54:31 UTC: `1c5c8c97302787fa6ff6d9465495af4b233d9b1c` | Momentaufnahme vor späterer Dokumentation, nicht behauptete Abschlussversion; Git-Zustand wird durch Plattform verwaltet |
| Slack-Verbindungen/Scopes | Aktuell `My Slack`, persönlich, projektverknüpft, zugänglich; Konfiguration gelesen | Funktionierender Chat-Leseweg, kein ORACLE-App-Konfigurationszugriff |
| Slack-Originalthread | Vollständig rückgelesen, `has_more:false` | Keine ORACLE-Antwort bis zu diesem Abruf; [Quelle](https://nexifyai.slack.com/archives/C0CDW3K4KDY/p1794824205972329) |

**IST:** Pascal ist Auftraggeber dieses Chats. Der aktuelle Bearbeiter bearbeitet diese Projektdokumentation; kein zweiter Agent wurde gestartet. **OFFEN:** Formeller externer Writer/Lease und projektübergreifendes führendes ORACLE-Register wurden nicht durch eine aktuelle Originalantwort bestätigt. Keine externen Aufgaben übernommen, keine Status-/Eigneränderungen an einem fremden Board.

## Verbindungen selbst geprüft
- **IST:** Slack Nutzer-/Kanaldaten bestätigen den vorhandenen Bot `nexify.login-aifly-oracle`, seine bekannte App und den privaten, nicht extern geteilten Ursprungskanal. Kein gleichnamiger fremder Bot ausgewählt.
- **IST:** Aktuelle vollständige zugängliche App-Verbindungsliste enthält genau eine Slack-Verbindung, `My Slack`, persönlich. Daraus keine Behauptung ableiten, außerhalb dieser Liste existiere kein anderer ORACLE-Zugang.
- **IST:** `apps.manifest.export` für die bestehende App wurde ausschließlich lesend über die vorhandene Verbindung aufgerufen. Slack antwortete `ok:false`, `missing_scope`, benötigt `app_configurations:read`. Die bereits gelesene Liste der grantbaren Connector-Scopes enthält diesen Umfang nicht. Kein Reconnect, keine Rechteausweitung, kein neuer Token und keine Neuanlage.
- **Quelle:** Slack dokumentiert für den [App-Manifestexport](https://docs.slack.dev/reference/methods/apps.manifest.export) ein Konfigurations-Token mit `app_configurations:read`. Persönlicher Nachrichtenzugriff ist kein App-Konfigurationszugriff. Ein Nicht-Erfolg ist hier durch konkrete Antwort und Dokumentation belegt, nicht geraten.
- **IST:** Zwei begrenzte Suchseiten zum Begriff ORACLE mit insgesamt 40 Treffern gelesen/auf relevante Verbindungsbelege ausgewertet; weitere Seiten vorhanden. **Keine** vollständige Wissensinventur behauptet.
- **HISTORIE:** Berichte aus `#agent-ops` vom 14./15.11. unterscheiden einen gebundenen `oracle_health`-/`oracle_ask`-Weg von fehlerhaften Container-HTTP-Pfaden. Beispiel [15.11., 03:06 UTC](https://nexifyai.slack.com/archives/C0C7GG39P0S/p1794712050798199). Das ist nicht die heute bestätigte Slack-App-Konfiguration und keine Erlaubnis, interne Ports aus dieser Vorschau anzusprechen oder kostenpflichtige Modelle aufzurufen.
- **OFFEN:** Fähigkeitsfindung über „Agent-Verbindungen“ liefert nach normaler und genauer Werkzeugsuche keine passenden ORACLE-Health-/Writer-Werkzeuge, sondern unpassende fremde Anbieter. Diese wurden nicht ausgeführt. Im Lovable-App-Katalog findet die aktuelle ORACLE-Suche keinen Treffer; daraus keine generelle API-Unmöglichkeit ableiten.
- **HISTORIE / RISIKOHINWEIS:** Ein älterer Slack-Bericht beschreibt ein Geheimnisoffenlegungsrisiko an einer anderen Betriebsadresse. Keine Credential-Adresse abgefragt, keine Werte übernommen und keine Sicherheitsfreigabe aus dem Bericht abgeleitet. Eine aktuelle Betriebsprüfung ist nicht Teil des nachgewiesenen Website-Zustands; ausschließlich den belegten Scope melden.

## Sichere Fortsetzung und Rückweg
**OFFEN:** Aktuelle nicht-geheime bestehende App-Konfiguration und formeller externer Writer müssen vom bestehenden ORACLE-App-/Betriebsverantwortlichen bestätigt werden. Signaturgeheimnis bleibt nach abgelehntem sicheren Dialog nicht gesetzt. Keine Wiederholung/Umgehung dieser Ablehnung. Ein bereits vorhandener autorisierter Konfigurationskanal darf verwendet werden, wenn er nachgewiesen ist; derzeit kein solcher Nachweis.

Rückmeldung ausschließlich einmal als neue Statusrevision im bestehenden privaten Prüfthread; keine neue Auftrags-ID, keine neue Aufgabe/Agent/Schedule, keine Modellantwort anfordern. Zustellannahme anschließend rücklesen; Bot-ACK und Verarbeitung bleiben getrennt. Scope: Originalquelle/Projektbeleg/Roadmap ergänzen, Anwendung und vorhandene Verbindungen unverändert. Frühere Dokumente erhalten, keine Löschung und kein Deployment.

**IST – Zustellbeleg, 10:56 UTC:** Revision 2 wurde von Slack angenommen und im ursprünglichen Thread zurückgelesen: genau eine passende Nachricht, null ORACLE-/Hermes-Antworten, keine weiteren Threadseiten. [Statusrevision](https://nexifyai.slack.com/archives/C0CDW3K4KDY/p1794826593231779). Nur Slack-Zustellung bestätigt, nicht ORACLE-Empfang/Verarbeitung. Letztes verfügbares Vorschausignal 10:56:34 UTC: `build OK`; keine Anwendungsänderung und kein Deployment.