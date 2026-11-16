---
name: nexify-kundendesign-standard
description: Verbindlicher NeXify-Agenturstandard für jedes Kundendesign. Verwenden, wenn ein Kundenprojekt, eine Kundenmarke, ein Corporate Design, eine Token-Datei (tokens.<kunde>.css), ein Relaunch, eine Landingpage oder ein Shop für einen Kunden gestaltet, übernommen oder geprüft wird. Führt die festen Graphite-Agenturregeln (Rollen, Kontrast, Glas, Typografie, Bedienung, Medien, Texte, Mandantentrennung) mit den Projektdaten des Kunden zusammen und prüft das Ergebnis messbar.
---

# NeXify-Kundendesign-Standard

Jedes Kundendesign besteht aus zwei Schichten:
- **Agenturstandard (fest):** Struktur, Qualität, Barrierefreiheit, Bedienung, Texte. Gilt in jedem Projekt unverändert.
- **Kundenmarke (variabel):** Farben, Schriften, Logo, Bildwelt, Tonalität. Kommt ausschließlich aus den Projektdaten des Kunden.

Die Graphite-Bibliothek (`src/design-system/graphite/`) ist die Vorlage für die Struktur, nie für die Kundenmarke. NeXify-Farben (#C0EE38), -Schriften oder -Logos erscheinen nie im Kundenmandanten.

## Ablauf

1. **Projektdaten erfassen.** Quellen in dieser Reihenfolge lesen: Kundenbriefing und freigegebene CI-Unterlagen, Projektwissen/AGENTS.md des Kundenprojekts, bestehender Kundenauftritt, Rückfragen beim Inhaber. Daraus das Markenprofil füllen (Vorlage unten). Jede Angabe kennzeichnen: SOLL, IST (gemessen/belegt), ANNAHME, OFFEN. Fehlende Werte bleiben OFFEN – keine erfundenen Farben, Schriften, Slogans, Referenzen oder Preise.
2. **Rollen zuordnen.** Kundenfarben auf dieselben Rollen abbilden, die Graphite verwendet (`--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--border-strong`, `--input`, `--ring`, `--signal-text`, Glasrollen `--glass-*`, `--radius`, `--font-brand-text`, `--font-brand-display`, `--font-brand-mono`, Typo-Rollen `--type-*`, `--leading-*`, `--measure-*`). Werte in `oklch()` schreiben. Die Kundenmarke bekommt eine eigene Datei `tokens.<kunde>.css`, die nur Rollen überschreibt; Komponenten bleiben unverändert und nutzen ausschließlich Rollen.
3. **Beide Ansichten ableiten.** Dunkel unter `:root`, hell unter `html[data-theme="light"]` (ein Dokument-Attribut, nach der Hydration gelesen). Bietet der Kunde bewusst nur eine Ansicht an, das im Markenprofil festhalten. `--primary-foreground` nach Kontrast wählen, nicht nach Geschmack. Grün/Markenfarbe als Schrift oder Indikator immer über `--signal-text` bzw. `--ring`, weil helle Markenfarben auf hellem Grund meist unter 4.5:1 fallen.
4. **Prüfen, bevor gebaut wird.** `python3 scripts/check_tokens.py <basis-tokens.css> tokens.<kunde>.css` ausführen (Dateien werden in Reihenfolge überlagert). Der Lauf muss „bestanden" melden; „HINWEIS"-Zeilen bewusst entscheiden und begründen. Transparente Werte meldet das Skript als „PRÜFEN" – diese im Browser messen.
5. **Umsetzen.** Token-Datei vor den Seiten-Styles laden, `theme.css` nach `@import "tailwindcss"`. Kundenschriften und -logos lokal ablegen (Lizenz im Markenprofil vermerken), nie vom Kundenserver nachladen.
6. **Abnehmen.** Desktop (1280 px) und Handy (390 px), dunkel und hell: Screenshots ansehen, Tastaturfokus durchgehen, Überlauf prüfen, Axe/WCAG A/AA laufen lassen, echte Kontraste kritischer Stellen (Status-Texte, aktive Navigation, Fokus) im Browser messen. Ergebnis mit Messwerten berichten; was nicht geprüft wurde, ausdrücklich nennen.

## Agenturstandard (in jedem Kundendesign)

- **Kontrast:** Text ≥ 4.5:1, große Schrift ≥ 3:1, Fokus und Indikatoren ohne Text ≥ 3:1 – in beiden Ansichten.
- **Raster und Form:** 8-px-Raster mit 4-px-Feinschritten; Radien nur aus `--radius` abgeleitet; stabile Medienmaße ohne Layoutsprünge.
- **Typografie:** feste Größenstufen je Rolle (Seitentitel, Abschnitt, Zwischenüberschrift, Fließtext, Lead, Detail, Beschriftung) statt stufenlos skalierter Schrift; Zeilenlänge Fließtext ≤ 64 Zeichen, Zeilenhöhe redaktionell 1.75. Der Kunde ändert Schriftfamilien, nicht die Rollen.
- **Glas und Tiefe:** maßvoll; Glas nur über die Materialrollen. Immer deckende Rückfallwerte für fehlendes `backdrop-filter`, `prefers-reduced-transparency` und `prefers-contrast: more`. Fließtext steht auf lesbarer Fläche, nie direkt auf Glas über Bildern.
- **Bedienung:** sichtbarer Hover-, Aktiv- und Tastaturfokus an jedem Bedienelement; Touch-Ziele ≥ 44 × 44 px ohne Überlappung; Übergänge 150–300 ms; `prefers-reduced-motion` respektieren.
- **Medien:** höchstens ein Film pro Seite startet automatisch (der Hero-Film); Steuerung klein, nur Symbole, überall gleich; Untertitel und Transkript aus einer Quelle; jedes Bild mit beschreibendem Alternativtext, dekorative Bilder `alt=""` plus `aria-hidden="true"`.
- **Zustände:** Laden, Fehler und Leerzustand sind gestaltet und sagen, was als Nächstes zu tun ist.
- **Texte:** natürliches, konkretes Deutsch (bzw. Zielsprache des Kunden); Aufzählungen und Fragen gestaltet darstellen, nicht untereinander wegschreiben. Keine leeren Superlative, keine erfundenen Zahlen, Preise, Zertifikate oder Zitate. Funktionslose Bedienelemente (z. B. Sprachauswahl ohne Übersetzung) nicht anzeigen.
- **Metadaten:** je Seite eigener Titel, Beschreibung, `og:title`, `og:description`, `og:type`, `twitter:card`.

## Mandanten- und Kundenschutz

- Kundendaten, Kundenwissen und Kunden-Tokens bleiben im Mandanten des Kunden; nie in die Graphite-Bibliothek oder in NeXify-Seiten zurückführen.
- Auf NeXify-eigenen Seiten keine Kundennamen, Logos, Fallbeispiele oder Galerien – auch nicht anonymisiert. Auf der Kundenseite eigene Referenzen des Kunden nur mit dessen Freigabe; Platzhalter für Kundenstimmen werden nicht veröffentlicht.
- Keine Gestaltung, die dem Kunden Zusagen unterstellt (Lieferzeit, Passgenauigkeit, Rechtsfreigabe), die nicht belegt sind.

## Markenprofil (Vorlage, je Projekt ausfüllen)

| Feld | Wert | Status (SOLL/IST/ANNAHME/OFFEN) | Quelle, Datum |
| --- | --- | --- | --- |
| Marke / Mandant | | | |
| Zielgruppe, Sprache(n) | | | |
| Primärfarbe (Hex + oklch) | | | |
| Neutraltöne dunkel / hell | | | |
| Signalfarben (Erfolg, Warnung, Fehler) | | | |
| Schriften + Lizenz | | | |
| Logo-Dateien (SVG, Schutzzone) | | | |
| Ansichten (dunkel/hell/beide) | | | |
| Tonalität, verbotene Begriffe | | | |
| Bildwelt, Rechte | | | |
| Rechtliche Angaben (Impressum, Datenschutz) | | | |

## Bericht

Ergebnis zuerst (Token-Datei, Prüflauf „bestanden"), dann Belege (Kontrastwerte, Screenshots je Ansicht und Gerät, Axe-Befunde), dann offene Punkte mit Verantwortlichem. „Bereit" ist nicht „abgenommen" – die Abnahme erteilt der Kunde bzw. der Inhaber.
