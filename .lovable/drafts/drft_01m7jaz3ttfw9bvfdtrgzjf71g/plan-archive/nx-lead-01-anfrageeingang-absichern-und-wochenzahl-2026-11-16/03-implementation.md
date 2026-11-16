## Umsetzung

### A · Begrenzung und Dublettenschutz
- Den vorhandenen `submitInquiry`-Eingang beibehalten; Validierung und Honeypot zuerst, dann die serverseitige IP-Ermittlung. Keine IP aus Formulardaten und kein beliebiger `X-Forwarded-For`-Fallback. Die vertrauenswürdige Hosting-Kopfzeile wird überprüft; in lokalen Tests wird sie kontrolliert gesetzt. Fehlt die verlässliche Herkunft, bleibt die Produktivabnahme offen.
- Zufälliger, dauerhaft servergeschützter Salzwert in einer neuen, RLS-geschützten Tabelle; Erzeugung beim ersten gültigen Aufruf. SHA-256 nur serverseitig berechnen. Weder IP noch Salz oder Prüfsumme erscheinen in Browserantworten, Slack oder Protokollen.
- Eine Datenbanktransaktion prüft Dublette und Limit und speichert höchstens eine neue Anfrage. Sperren schützen auch parallele Aufrufe und gleiche Dubletten von verschiedenen IPs. Schutzdaten halten je Prüfsumme nur die maximal fünf relevanten Annahmezeitpunkte, nicht rohe IPs oder Nachrichtentexte.
- Eine Dublette wird vor dem Limit geprüft, verbraucht keinen weiteren Platz und löst **keine zweite Slack-Meldung** aus. Freundlicher Hinweis ohne fremde Vorgangsnummer oder Anfrageinhalt; Formular bleibt bearbeitbar. Limit-/Dublettenablehnungen bieten nicht automatisch den E-Mail-Ausweichversand an.
- Keine automatische Wiederholung nach unklarem Speicherergebnis; serverseitige Fehler lassen Eingaben erhalten.

### B · Nachweis der Einwilligung
- Additiv `consent_version text` und `consent_at timestamptz` an `inquiries`; vorhandene Zeilen bleiben unverändert und bekommen keinen erfundenen Nachweis.
- Aktuellen Wortlaut unverändert einer versionierten Codekonstante zuordnen. Server setzt Version und Zeit ausschließlich nach erfolgreicher Zustimmungsprüfung, in derselben Speichertransaktion; keine vom Browser frei gesetzten Werte.

### C · Wochenzahlen
- Kleiner ungerahmter Zahlenbereich vor dem bestehenden Posteingang: **Projektanfragen / Kontakt** und **TEILEKLAR-Anfragen** separat, mit gemeinsamem Von-/Bis-Zeitpunkt.
- Rollierende sieben Tage, Zeitraum intern UTC, Darstellung in Europe/Berlin. TEILEKLAR umfasst Partner-, Termin-, Gutschein- und separate Teileanfragen.
- Authentifizierte Serverfunktion mit erneuter Adminprüfung und vorhandenen RLS-Leserechten. Exakte Datenbankzählung statt Zählen der auf 500 begrenzten Posteingangsliste; Antwort enthält nur Zahlen und Zeitraum. Lade-/Fehlerzustand statt falscher Null. Aktualisieren lädt auch die Zahlen neu.
- Keine neuen Rechte, Cookies, Besucherkennungen, KI-Aufrufe oder Datenübertragung an weitere Dienste. Keine Änderung am vorhandenen UPDATE-Recht.

## Nachweise und Abnahmekriterien
- Bestehende Tests plus gezielte Regeln: erste fünf Annahmen, **sechste abgewiesen**, rollierende Stunden-/10-Minuten-Grenzen, Dublette mit **genau einer Zeile und einem gemockten Slack-Aufruf**, Parallelität, gesetzte Einwilligungsfelder und exakte getrennte Wochenzahl einschließlich Grenzzeitpunkten.
- Datenbankintegration in der isolierten Entwurfsdatenbank mit Transaktionen/Rollback, ohne Löschung bestehender Zeilen. Rollenprüfungen bestätigen unverändertes SELECT/fehlendes INSERT/UPDATE/DELETE auf `inquiries` und keinerlei Zugriff auf neue Tabellen/Funktionen für `anon`/`authenticated`.
- Browserprüfung mit realer Entwurfs-Adminanmeldung, echten Formulardaten und Rücklesen der Wochenzahl; externe Slack-Aufrufe werden im Test blockiert/gemockt. Desktop und Handy, Eingaben bei Ablehnung erhalten.
- Projekttests ausführen; Typ-/Vollbuild-Ergebnis aus den automatischen Prüfungen ablesen, nicht durch manuelle Builds ersetzen. Fehlende Ergebnisse und unverifizierte Hosting-IP ausdrücklich als OFFEN melden. Keine Behauptung „abnahmebereit“, solange zentrale Nachweise fehlen.
- Ergebnisbericht mit Revision, UTC-Zeit, Testzahlen und **abnahmebereit ja/nein**, getrennt nach Entwurf, veröffentlicht und live. Lesende Zweitprüfung nach dem Omni-Enterprise-Orchestrator.

## Rückweg und Grenzen
Vor Annahme: Codeänderungen über die Entwurfshistorie zurücknehmen, additive Tabellen/Spalten und alle Daten erhalten; nichts löschen. Keine automatischen Änderungen am veröffentlichten Stand. Bei späterer Rücknahme bleiben Einwilligungsnachweise erhalten; ein ungeschützter Eingang wird nicht still reaktiviert.

Annahme des Entwurfs bringt die registrierten additiven Strukturänderungen in die App, aber keine Entwurfsdaten und keine Veröffentlichung. Umfang bleibt ausschließlich NX-LEAD-01; Server, BigBuy und Kundenprojekte bleiben unberührt.