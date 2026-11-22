# Arbeitsregeln für dieses Repository

Die Seite wird aus diesem Repository gebaut und als Cloudflare Worker ausgeliefert
(`tools/deploy-live.sh`). Der Zweig `main` ist der Auslieferungsstand.

## Schutzregeln

- **Veröffentlichte Historie nicht umschreiben.** Kein Force-Push, kein Rebase, Amend oder Squash
  bereits gepushter Commits. Jeder gepushte Zweig bleibt in einem lauffähigen Zustand.
- **Generierte Dateien nicht von Hand ändern.** Eine Datei, deren Kopf sie als automatisch
  erzeugt ausweist (zum Beispiel `src/routeTree.gen.ts`), entsteht durch den Build neu.
- **Datenbank.** Vorhandene Migrationen unter `migrations/` und Bestandsdaten nicht ändern.
- **Geheimnisse.** Keine Schlüssel, Tokens oder Passwörter im Repository. Zugangsdaten liegen als
  Bindings und Secrets beim Worker.

## Projektregeln

- Die Seiten sind übernommene Kopien des früheren Auftritts: jede Seite hält ihr Markup in der
  eigenen Routendatei und ihre ursprünglichen Stile in `src/styles/captured.css` (Startseite) oder
  `src/styles/pages/<seite>.css` (vollständige Aufnahmen unter `.site-import/`). Änderungen an
  anderer Stelle brechen die Kaskade der Aufnahme. Aufgenommene Klassen wie `tk-shop`, `tk-form`,
  `tk-field`, `tk-auth` werden deshalb nicht umbenannt.
- Gemeinsames Seitenverhalten (Chat-Panel, Kopfmenüs, Scroll- und Fuß-Attribute der Hülle,
  Filmplayer) liegt in `src/lib/imported-site.ts`, damit sich jede Seite gleich verhält; Routen
  binden nur dessen Hooks in ihr JSX ein.
- Die Kopie ist unabhängig vom früheren Auftritt: nie dorthin zurückschreiben und keine Assets von
  der ursprünglichen Domain einbinden. Heruntergeladene Medien liegen in `public/site-assets/` und
  `public/glass/`.
- Markenfilme laufen nur über `src/components/SiteFilm.tsx` mit Daten aus `src/lib/site-films.ts`
  und Stilen in `src/styles/site-film.css`, damit jede Seite denselben Player zeigt und ein Film
  genau einmal definiert ist.
- Adressregeln des Workers (Kurzadressen, stillgelegte Pfade, Antwort-Header) stehen in
  `src/lib/server-routing.ts` und sind durch `src/server.test.ts` abgedeckt.
