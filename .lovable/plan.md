# Lesebericht NX-DESIGN-01 und Registerauszug (16.11.2026, 17:35 UTC, nur lesend)

## 1. Registerauszug (nur Auszug, nicht ganz gelesen)
Quelle: `loesungsregister.md`, SHA e1fb8f1, Stand 14.11.2026. Pascal hat sie heute bereitgestellt. Ich selbst habe sie nicht erneut abgerufen.

| Aussage im Register | Einordnung | Beleg im Projekt |
|---|---|---|
| Register ist erzeugt, kein Live-Nachweis, kein Ersatz für DECISIONS.md | Gilt als Regel | `DECISIONS.md` gibt es in diesem Projekt nicht: **OFFEN** |
| GitHub ist die kanonische Codequelle, GitLab nur Spiegel, kein zweiter Writer | Vereinbar mit dem SOLL | Hier schreibt Lovable. Wie der Abgleich nach GitHub läuft, ist nicht geprüft: **OFFEN** |
| Hermes-Orchestrierung (D019) | HISTORIE | Laut Serverbefund vom 16.11. meldet Hermes Speicherfehler |
| Vercel führend bis Migrationsabnahme | HISTORIE, abgelöst | Pascal am 16.11.: „Vercel ist raus“; DNS 185.158.133.1; Live-Auslieferung durch Lovable belegt. Ob die Migration formal abgenommen wurde: **OFFEN** |
| Cloudflare Workers geplant (D021) | HISTORIE | Die Lovable-Laufzeit ist workerd. Eine eigene Cloudflare-Entscheidung gibt es nicht: **OFFEN** |

Widerspruch: Die Projektanleitung nennt noch „Vercel-Projekt prj_…“ als Auslieferung. Das ist durch die Entscheidung vom 16.11. überholt, aber noch nicht nachgezogen.

## 2. NX-DESIGN-01, sachliche Prüfung
- **Nicht dokumentiert:** In `roadmap.md` und `ops/` gibt es keinen Eintrag zu NX-DESIGN-01. Gemessen habe ich nur den Code. Commit `1f7cba2`.
- **LCP:** Gemessen wurde 10,4 s, vorher 10,1 s, und das nur in der Entwicklungsvorschau. Für die Produktion gibt es keinen Messwert, und die Produktionsvorschau lieferte zuvor 500. **Keine Verbesserung belegt. Gate offen.**
- **Farbwerte:** 6.395 direkte Farbangaben (Hex, rgb, oklch) in den Stylesheets. Davon gehört ein unbekannter Teil zur TEILEKLAR-Markenwelt und muss bleiben. **Offen.**
- **Schrift:** 86 Regeln mit `font-display: optional`, zum Beispiel `preise-ablauf.css:559`. Angefragt war `swap` mit einem metrisch angepassten Ersatz. `size-adjust` und `ascent-override` stehen nur in den mitgeholten Seiten-Stylesheets (je 27–28 Treffer), nicht als eigene zentrale Ersatzschrift. **Anforderung nicht erfüllt.**
- **ORACLE-Hinweis:** Nicht mit einer echten Antwort getestet. **Offen.**
- **Grüner Build:** Er belegt nur, dass sich der Stand übersetzen lässt. Eine Abnahme ist er nicht.

## 3. Einzelner nächster sicherer Schritt, bereits freigegeben
Den Fehler 500 der Produktionsvorschau lesend klären: Protokoll und Aufruf prüfen, danach LCP auf dem Produktionsstand messen (Desktop und Handy). Das fällt unter die bestehende Belegpflicht („erst messen, dann melden“), ändert nichts und kostet nichts. Ohne diesen Messwert ist jede Schrift- oder Farbkorrektur unbelegt.

Nicht freigegeben und gesperrt bis zur Entscheidung durch Pascal:
- Umstellung der Schrift auf `swap`
- Bereinigung der Farbwerte (TEILEKLAR-Akzente ausgenommen)
- NX-LLM-01

Ich stoppe hier.
