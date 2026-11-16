# Bestehende ORACLE-App: Einstellungen und echter Rückweg

Stand: 16.11.2026, 11:02 UTC. Auftrag Pascal, 11:00 UTC. Bestehende App `nexify.login-aifly-oracle`: <https://api.slack.com/apps/A0CD49EMU9Y>. Keine Neuanlage, kein Ersatz des persönlichen Slack-Connectors und kein kostenpflichtiger Schritt.

## SOLL – nur additive Einstellungen

Die bestehende App-Konfiguration zuerst in Slack über **App Manifest** als nicht-geheimes Original erhalten; keine Token/Signing Secrets in diese Sicherung aufnehmen. Kein vollständiges Ersatzmanifest einfügen: bestehende Funktionen, Ereignisse, Scopes, URLs und Tokenrotation bleiben erhalten.

| Bereich in der vorhandenen App | Vorbereiteter Wert | Grenze |
| --- | --- | --- |
| Event Subscriptions → Request URL | `https://nexifyai.de/api/public/slack/events` | Nur wenn aktuell kein anderer Empfänger besteht und Socket Mode nicht aktiv ist; andernfalls bestehende Weiterleitung/Migration erst konkret abstimmen |
| Subscribe to bot events | `app_mention`, `message.im`, `message.groups` | Bestehende Liste ergänzen, nicht ersetzen; `message.groups` nur für benötigten privaten Ursprungskanal |
| OAuth & Permissions → Bot Token Scopes | `app_mentions:read`, `im:history`, `groups:history`, `chat:write` | Nur fehlende notwendige Rechte über tatsächlichen Slack-Freigabedialog ergänzen; keine extern geteilten Kanäle freigeben |
| Interactivity & Shortcuts → Request URL | `https://nexifyai.de/api/public/slack/interactions` | Noch keine Website-Buttons aktivieren; vorhandenen Interaktions-Empfänger nicht überschreiben |
| Slash Commands → `/nexify` → Request URL | `https://nexifyai.de/api/public/slack/commands` | Nur konfliktfrei vorbereiten; `commands` nur bei tatsächlich gewähltem Slash-Command-Test erforderlich |
| Basic Information → App Credentials → Signing Secret | Sicheres Eingabefeld `SLACK_ORACLE_SIGNING_SECRET` | Nur existierendes providerseitiges Signaturgeheimnis eintragen; nicht neu generieren, nicht in Chat/Datei kopieren |

**Wichtig:** Socket Mode benutzt einen bestehenden WebSocket-Empfänger statt HTTP-Events. Nicht deaktivieren und keine bisherige Request-URL überschreiben. Ein Signaturgeheimnis allein leitet noch keine Ereignisse zur Website und schafft keinen berechtigten ORACLE-Bot-Ausgang.

## IST – ohne App-Verwaltungszugriff selbst geprüft

- `My Slack`: zugänglich, persönlich, projektverknüpft; das ist nicht der vorhandene ORACLE-App-Ausgang.
- Alle drei Empfangsadressen liefern auf nicht-mutierende Test-POSTs HTTP 200 (11:01 UTC). Event-Challenge exakt korrekt; Laufzeiten 1963 ms Events, 125 ms Commands, 2085 ms Interaktionen. 200 ohne eingerichtetes Secret bedeutet keine Ereignisverarbeitung.
- Liste verschlüsselter Projektnamen 11:01 UTC: `SLACK_ORACLE_SIGNING_SECRET` fehlt; Werte nicht gelesen. Neuer sicherer Dialog ist durch diesen Auftrag ausdrücklich freigegeben.
- Vorheriger lesender App-Manifestexport scheiterte konkret mit `missing_scope/app_configurations:read`. Dieser Umfang ist in der grantbaren Liste des vorhandenen Connectors nicht enthalten; Reconnect würde ihn nicht schaffen. Daher keine erneute Autorisierung dieses Connectors und kein neuer Token.

## Nur diese Schritte benötigen Pascals Zugriff

1. **Bestehende Slack-App-Verwaltung:** aktuelle Event-URL, Interaktivitäts-URL, Socket-Mode-Status und Ereignis-/Scope-Liste nicht-geheim bestätigen bzw. das bestehende Manifest bereitstellen. Nur bei leerem, konfliktfreiem Empfänger die oben vorbereiteten Werte eintragen; nötige Slack-Rechtefreigabe selbst bestätigen. Kein Paketkauf, kein Tokenreset.
2. **Sicheres Signing-Secret-Feld:** vorhandenen Wert ausschließlich aus Basic Information in den sicheren Dialog eintragen. Der Assistent erhält den Wert nicht. Kein Bot-Token in dieses Feld.
3. **Echter Nutzer-Auslöser nach bestätigter Konfiguration:** im privaten `#oracle-agent-inbox` als Pascal genau einmal `@nexify.login-aifly-oracle status` senden, alternativ den konfliktfrei eingerichteten `/nexify status`. Die Website behandelt das deterministisch ohne KI. Ein als Connector-App versandter Test ist kein menschlicher Auslöser; solche Bot-Nachrichten werden zum Schleifenschutz nicht als Inhaberbefehl akzeptiert.

Ein vorhandener anderer ORACLE-Empfänger kann bei Mention/Command einen Modellaufruf starten. Deshalb **vor** dem Auslöser bestätigen, dass diese konkrete Status-Aktion nur die deterministische Website-Logik erreicht und keine kostenpflichtige Modellverarbeitung auslöst. Bei unbekannter Route/Kostenwirkung keinen Trigger senden.

## Akzeptanzkriterien für den vollständigen Test

1. Echte Slack-Aktion vom fest bestätigten Inhaber; nicht von diesem Agenten nachgebautes Signaturpayload.
2. Slack liefert signiertes Ereignis der identischen bestehenden App; Team, App und Inhaber stimmen, privater zulässiger Kanal, Ereignis-ID eindeutig.
3. Empfang 200 innerhalb des Slack-Zeitfensters und tatsächlich registrierte Nachbearbeitung, keine bloße URL-Challenge.
4. Der Empfänger erzeugt deterministisch eine echte Antwort im gleichen Kanal/Ursprungsthread; Sender-App eindeutig aus Slack-Nachrichtendaten bestimmen. Antwort der allgemeinen Connector-App nicht als Antwort des ORACLE-Bots ausgeben.
5. Empfangs-/Ergebnisbeleg wird gespeichert und im angemeldeten Inhaber-Arbeitsplatz zurückgelesen; keine reale Kundenanfrage verändern.
6. Soll der bestehende ORACLE-Bot selbst antworten, muss dessen vorhandener berechtigter Ausgang angebunden sein. Ein Website-Statusreply über `My Slack` erfüllt dieses Kriterium nicht. Keine erfundene ORACLE-Antwort, kein zusätzliches Modell und kein unbestätigter Ersatzsender.

**OFFEN:** App-Konfiguration, identischer vorhandener ORACLE-Ausgang, sicher gespeichertes Signing Secret, echter Nutzer-Trigger und Empfängerantwort. Vollständiger Roundtrip ist vor diesen Nachweisen nicht geprüft.

## Abbruch und Rückweg

Abbruch bei anderem bestehenden Empfänger/Socket Mode, unbekannter Kostenwirkung, fehlendem App-Zugang, abgelehntem Dialog, falscher Signatur/App/Team/Actor, fehlendem Zeitfenster/Nachbearbeitung oder fehlender Antwort. Keine automatische Wiederholung.

Diese Vorbereitung ändert keine App. Eine spätere freigegebene additive App-Änderung wird aus dem zuvor erhaltenen Manifest/den originalen Einstellungen zurückgestellt; Geheimnisse und Zustellhistorie nicht löschen. Kein automatischer Dienstneustart, keine Schlüsselrotation und keine Veröffentlichung ohne separat bestätigten Bedarf.

Quellen: [Slack App Manifest](https://docs.slack.dev/reference/app-manifest), [app_mention](https://docs.slack.dev/reference/events/app_mention/), [Socket Mode](https://docs.slack.dev/apis/events-api/using-socket-mode), [Konfigurations-Export](https://docs.slack.dev/reference/methods/apps.manifest.export); vorhandene `slack-webhook.server.ts`, `slack-flows.ts`, `slack-workflows.server.ts` vollständig in diesem Auftrag gelesen.