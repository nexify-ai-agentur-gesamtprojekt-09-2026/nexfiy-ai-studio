# Mehrsprachigkeit: Stand und Weg

Stand 22.11.2026. Die Website gibt es in einer Sprache: Deutsch (`<html lang="de">`). Deshalb
setzt keine Seite `hreflang` oder `x-default`, es gibt keinen Sprachumschalter, und die Sitemap
nennt keine Sprachvarianten. Ein Verweis auf eine Sprachfassung, die es nicht gibt, wäre falsch;
`npm test` und `tools/live-check.mjs` melden jedes `hreflang` als Fehler.

## Was vorbereitet ist

- Titel, Beschreibungen und Kurznamen aller Seiten liegen als Daten in `src/lib/seo-pages.ts`,
  nicht in den Routen.
- Kanonische Adressen, Vorschaukarten und strukturierte Daten entstehen an einer Stelle
  (`src/lib/seo.ts`); die Sprache steht dort in einer Konstante (`SPRACHE`).
- Unternehmensangaben liegen in `src/lib/site-facts.ts`.

## Was fehlt

1. **Inhalte als Daten.** Die Seitentexte stehen fest im Markup der Routendateien
   (`src/routes/*.tsx`), ebenso Kopf, Fußzeile und Chat-Panel. Für eine zweite Sprache müssen sie
   in Textdateien je Sprache ausgelagert werden; sonst entstünden 28 kopierte Routen je Sprache.
2. **Übersetzungen.** Niederländisch, Englisch und Französisch brauchen eine Durchsicht durch
   Muttersprachler, die Rechtsseiten zusätzlich eine fachliche Prüfung. Maschinell übersetzte
   Seiten werden nicht veröffentlicht.
3. **Offline-Seite, Installationshinweis, Fehlerseiten und Manifest** je Sprache.

## Wie Sprachpfade angelegt würden

- Deutsch bleibt ohne Präfix (`/kontakt`), weitere Sprachen bekommen eines: `/nl/kontakt`,
  `/en/kontakt`, `/fr/kontakt`. Im Router ist das ein optionales Segment vor den Seiten
  (`{-$sprache}`), das nur die Werte `nl`, `en`, `fr` annimmt; alles andere bleibt 404.
- `seo-pages.ts` bekommt je Sprache Titel, Beschreibung und Kurzname; `pageHead` setzt dann je
  Seite `<link rel="alternate" hreflang="…">` für jede vorhandene Fassung und `x-default` auf die
  deutsche. Eine Fassung wird erst verlinkt, wenn die Seite in dieser Sprache vollständig ist.
- `<html lang>`, `og:locale`, `inLanguage` in den strukturierten Daten und die Sitemap
  (`xhtml:link`-Einträge) folgen derselben Tabelle.
- Der Sprachumschalter kommt erst mit der ersten vollständigen zweiten Fassung.
