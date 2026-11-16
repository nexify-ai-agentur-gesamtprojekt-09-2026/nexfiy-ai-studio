# NX-LEAD-01 · Anfrageeingang absichern und Wochenzahl

## Ziel und Freigabe
Nur im Entwurf: höchstens **5 gespeicherte Anfragen je IP-Prüfsumme in rollierenden 60 Minuten**, Dublettenschutz für **gleiche normalisierte E-Mail + gleiche Nachricht innerhalb von 10 Minuten**, Einwilligungsnachweis und exakte Wochenzahlen im bestehenden Admin-Arbeitsplatz. Keine Veröffentlichung, neuen Dienste oder Änderungen an Chat-Modell und Datenschutzinhalt.

**Zu bestätigen: eigene Ratenbegrenzung.** Lovable Cloud besitzt dafür keine Standardfunktion. Die vorgeschlagene eigene Datenbanklösung wird deshalb durch Tests und Transaktionssperren abgesichert, nicht durch eine verwaltete Rate-Limit-Infrastruktur. Personen hinter derselben öffentlichen IP teilen sich das Limit; ein IP-Wechsel kann es umgehen. Eine fehlende oder ungültige verlässlich übermittelte IP führt zur sichtbaren Ablehnung, nicht zum ungeschützten Speichern. Die Planfreigabe bestätigt diesen Trade-off.

**Bestehende Rechte bleiben unverändert:** `anon` besitzt keine direkten Rechte auf `inquiries`; `authenticated` besitzt bereits SELECT unter Admin-RLS, aber kein INSERT, UPDATE oder DELETE. Dieses vorhandene SELECT bleibt für den Arbeitsplatz erhalten. Die Formulierung „weiterhin keine direkten Rechte“ wird entsprechend als **keine zusätzlichen Rechte** verstanden. Neue Schutz- und Salztabellen sind weder für `anon` noch `authenticated` zugänglich.

Der Entwurf hat eine eigene separate Datenbank. Strukturänderungen erreichen die App erst bei Annahme des Entwurfs; eigene Entwurfsdaten werden dabei nicht übertragen. Bereits vorhandene Beispieldaten sind erfunden und keine realen Anfragen.