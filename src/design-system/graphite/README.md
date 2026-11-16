# NeXify Graphite – Designbibliothek

Abgenommene Markenwelt (Stand 16.11.2026): dunkles Graphite, grünes X `#C0EE38`, maßvolles Glas, helle Ansicht über `html[data-theme="light"]`.

## Bausteine
- `tokens.css` – Farben, Schriften, Glas, Radien, helle Ansicht, Barrierefreiheits-Rückfallwerte. Einzige Quelle.
- `theme.css` – Zuordnung für Tailwind v4 (`bg-primary`, `font-heading` …).
- Schriften liegen unter `/site-assets/` und müssen im Zielprojekt mitkopiert werden.

## Einsatz
1. `tokens.css` vor allen Seiten-Styles importieren, `theme.css` nach `@import "tailwindcss"`.
2. Komponenten nutzen nur Rollen (`--primary`, `--glass-fill` …), nie feste Farben.

## Kundenprojekte
Kundenmarken bekommen eine eigene `tokens.<kunde>.css`, die dieselben Rollen überschreibt. Keine NeXify-Farben, -Schrift oder -Logos im Kundenmandanten; Kunden-Tokens nie in diese Bibliothek zurückführen.
