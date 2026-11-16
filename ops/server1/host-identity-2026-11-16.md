# SSH-Hostidentität: Konsolenbestätigung vor BigBuy

Stand: 16.11.2026, 10:31 UTC. Auftrag: Pascal, 10:29 UTC.
Arbeitsablauf: Omni-Enterprise-Orchestrator. Nur Vorbereitung und öffentliche Leseprüfung; kein SSH-Login.

## Ergebnis und benötigter Fingerabdruck

**IST:** Der vorhandene private Hostinger-Zugang meldet Server 1 `srv1243952.hstgr.cloud`, IPv4 `72.62.152.47`, als `running` (Abruf 10:30 UTC). Öffentliche DNS-Auflösung stimmt mit der Hosting-IP überein. Das bestätigt die Kontozuordnung, noch nicht den SSH-Hostschlüssel.

**IST – unbestätigter Netzwerkkandidat:** Zwei voneinander getrennte, nicht authentifizierte SSH-Scans gegen Hostname und IPv4 liefern denselben öffentlichen ED25519-Hostschlüssel (Port 22, Scan-Exit jeweils 0, 10:30:14/10:30:33 UTC). Der lokale Vergleich des vollständigen öffentlichen Schlüsselmaterials stimmt überein. Beide Scans nutzen denselben Netzweg und ersetzen keinen unabhängigen Vertrauensnachweis.

```text
Server 1: srv1243952.hstgr.cloud
IPv4:     72.62.152.47
Port:     22
Typ:      ED25519 (256 Bit)
SHA256:q0fUJEDnyPaw+Wc1ScvgeT3i2JD9grbvJjRlyipIPvU
```

**OFFEN:** Pascal hat diesen Fingerabdruck noch nicht über die vertrauenswürdige VPS-Konsole bestätigt. Es wurde kein Vertrauenseintrag angelegt. Dieser Fingerabdruck gehört zum **öffentlichen Server-Hostschlüssel**, nicht zu Pascals privatem Anmeldeschlüssel; private Schlüssel wurden nicht gelesen und dürfen nicht übermittelt werden.

## 1. Bestätigung durch Pascal in der VPS-Konsole

1. Den bestehenden [Hostinger-Zugang](https://hpanel.hostinger.com/) direkt öffnen und normal anmelden; keine Zugangsdaten hier einfügen.
2. **VPS → Server 1 `srv1243952.hstgr.cloud` → Verwalten → Übersicht → Web Console**. Im Hostingkonto die IPv4 `72.62.152.47` abgleichen. Die Anleitung zur Konsole stammt von [Hostinger](https://www.hostinger.com/support/how-to-use-the-web-console-in-hostinger/).
3. Nur die bestehende Konsolensitzung/den vorhandenen berechtigten Zugang nutzen. Bei fehlendem Zugang, Passwortproblem, leerer Konsole oder Browser-Vertrauenswarnung abbrechen. **Kein** Passwortreset, Neustart, Notfallmodus, neue Berechtigung oder Umgehung einer Warnung gehört zu diesem Auftrag.
4. In der Konsole genau diesen lesenden Befehl ausführen:

```bash
sudo ssh-keygen -E sha256 -lf /etc/ssh/ssh_host_ed25519_key.pub
```

5. Den vollständigen `SHA256:`-Wert Zeichen für Zeichen mit dem obigen Kandidaten vergleichen; die Ausgabe muss den Typ **ED25519** nennen. Nur den öffentlichen Fingerabdruck und die Aussage „in der VPS-Konsole auf Server 1 geprüft“ zurückmelden – keine private Datei, kein Passwort, kein API-Schlüssel, kein vollständiges Terminalprotokoll.
6. Bei fehlender `.pub`-Datei oder Abweichung: **Stopp**. Nicht auf die gleichnamige Datei ohne `.pub` ausweichen, keinen anderen Algorithmus ungeprüft übernehmen und keinen Hostschlüssel erzeugen. Der Serververantwortliche muss zuerst den tatsächlich verwendeten öffentlichen ED25519-Hostschlüssel klären. Eine abweichende Ausgabe ist kein Anlass, lokale Vertrauenseinträge automatisch zu entfernen.

**Akzeptanzkriterium:** Der über den bestehenden Hostingzugang eindeutig ausgewählte Server zeigt in seiner Konsole genau den vollständigen SHA256-Wert des ED25519-Netzwerkkandidaten; Pascal bestätigt Server, Typ und Wert sowie den Zeitpunkt. Ohne diesen unabhängigen Beleg bleibt die Identität **UNBESTÄTIGT**. Für Server 2 gilt keinerlei abgeleitete Freigabe.

## 2. Erst danach: strikter SSH-Zugang und ein BigBuy-Leseabruf

**SOLL, noch nicht ausgeführt:**

- Frischen Netzwerkkandidaten gegen den unabhängig bestätigten Wert prüfen. Bei Änderung oder Mehrdeutigkeit erneut stoppen. Nur den exakt bestätigten öffentlichen Schlüssel in einer getrennten zweckgebundenen Host-Vertrauensdatei verwenden; vorhandene Einträge unverändert erhalten.
- SSH bleibt auf `StrictHostKeyChecking=yes`; für diesen Nachweis ausdrücklich ED25519 auswählen (`HostKeyAlgorithms=ssh-ed25519`). Kein `accept-new`, keine automatische Zustimmung, kein `UserKnownHostsFile=/dev/null`, kein Entfernen alter Einträge, kein Algorithmus-Fallback. Der Scan allein erteilt nie Vertrauen.
- Bestehenden geschützten Anmeldeweg verwenden. **HISTORIE:** Die private lokale Datei hatte um 10:09 UTC Modus `0644`; sie wurde in diesem Auftrag weder geöffnet, kopiert, geschützt noch verwendet. Fehlt ein sicherer bestehender Zugang, bleibt SSH blockiert. Keine serverseitige Rechteänderung und keine Schlüsselsperrung.
- Bereits erteilter Auftrag erlaubt ausschließlich einen lesenden BigBuy-Statusabruf. Vorher wirksame Produktions-/Sandbox-Zuordnung und vertraglich gedeckten Kostenrahmen bestätigen; keine Umgebung umschalten. Die Kosten pro Abruf bleiben **OFFEN**; keine neue Verpflichtung, kein Paketkauf, kein Upgrade.
- Nur den offiziellen Status-GET verwenden: Produktion `https://api.bigbuy.eu/rest/user/auth/status.json` oder bestehende Sandbox `https://api.sandbox.bigbuy.eu/rest/user/auth/status.json`. Maximal ein Abruf, 15 Sekunden Gesamtzeit, TLS-Prüfung aktiv, keine Weiterleitung und keine Wiederholung. Details/Quelle: [bisherige Zugangsprüfung](access-review-2026-11-16.md), öffentliche [BigBuy-Referenz](https://api.bigbuy.eu/rest/doc.json), dort um 10:12 UTC gelesen.
- Geheimnis nur durch den vorhandenen berechtigten Serverprozess verwenden, niemals hier lesen oder anzeigen; kein Importmodul laden, kein Importstart, keine Jobs/Bestellungen/Fotokopien auslösen. Nur UTC-Zeit, Umgebung, HTTP-Status, Dauer und geprüften Ergebniscode melden; keine Rohantwort, Header oder Kontodaten.
- Authentifizierungsstatus-Erfolg belegt weder Katalog-/Bestellrechte noch Bildnutzungsrechte. Bei ungeklärter Abrechnung, fehlendem Zugang, unerwarteter Antwort oder Fehler abbrechen und **OFFEN** melden.

## 3. Abbruch und Rückweg

**SOLL:** Abbruch bei fehlender unabhängiger Bestätigung, Fingerabdruckabweichung, falschem Server, unbekanntem Algorithmus, unsicherem Anmeldeweg, fehlender Berechtigung oder ungeklärtem Kostenrahmen. Keine selbstständige Reparatur, Schlüsselrotation oder Sicherheitslockerung.

**IST:** In diesem Auftrag keine Änderungen an Servern, `known_hosts`, `authorized_keys`, privaten Schlüsseln, Passwort, Firewall, SSH-Dienst, Importen oder Zeitplänen. Daher kein Server-Restore erforderlich. Bestehende Zugänge und frühere Dokumente bleiben erhalten. Die beiden unbestätigten öffentlichen Kandidaten liegen nur getrennt unter `/tmp/ssh-host-verification/`; dieses Verzeichnis ist keine aktive SSH-Vertrauensdatei. Dokumentation wird additiv abgelegt, nichts gelöscht.

Für die später freigegebene Verwendung gilt: zweckgebundene Vertrauensdatei bei einem Abbruch nicht mehr referenzieren, aber erhalten; vorhandene globale Hostdateien und Zugangsrechte bleiben unangetastet. Kein SSH-Neustart und keine Schlüsselsperrung.

## 4. Nachweise und verbleibende Aufgaben

| Status | Aufgabe | Verantwortlich |
| --- | --- | --- |
| IST | Hosting-IP sowie zwei identische öffentliche ED25519-Kandidaten ermittelt, vollständiges Material verglichen | Assistent, 16.11.2026 10:30 UTC |
| OFFEN | Unabhängiger Fingerabdruckvergleich in der bestehenden VPS-Konsole | Pascal/Serververantwortlicher |
| OFFEN | Sicherer bereits berechtigter Anmeldeweg; keine Übertragung privater Schlüssel | Pascal/Serververantwortlicher |
| OFFEN | Bestehender Vertrag deckt den einmaligen BigBuy-Status-GET ohne kostenpflichtigen Zusatzschritt | Pascal/BigBuy-Vertragsverantwortlicher |
| OFFEN | BigBuy-Gültigkeit: nicht geprüft, kein authentifizierter BigBuy-Aufruf | Assistent erst nach erfüllten Voraussetzungen |

**Prüfgrenzen:** Keine VPS-Konsole geöffnet, kein Host-Vertrauen bestätigt, kein SSH-Login, kein BigBuy-Statusabruf. Keine neue kostenpflichtige Verpflichtung ausgelöst; Gebühren bestehender Verträge sind nicht gemessen. Erstes lokales Scannerkommando scheiterte an einem Werkzeugparameter vor Netzwerkzugriff; korrigierte öffentliche Scans waren erfolgreich. Keine Anwendungsdatei geändert und kein Website-Funktionstest, Deployment oder Sicherheitsnachweis für die gesamte Website behauptet. Die verlangten Monorepo-Werkzeuge fehlen weiterhin in diesem TanStack-Projekt; kein Ersatztest als deren Erfolg ausgegeben.