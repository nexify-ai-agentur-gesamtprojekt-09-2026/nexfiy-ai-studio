# Arbeitsregeln für dieses Repository

Die Seite wird aus diesem Repository gebaut und als Cloudflare Worker ausgeliefert
(`tools/deploy-live.sh`). Der Zweig `main` ist der Auslieferungsstand: jeder Merge nach `main`
geht über GitHub Actions (`.github/workflows/deploy-live.yml`) automatisch live, nach Pflicht-CI
(`.github/workflows/ci.yml`), mit Smoke-Test und automatischem Rollback (`docs/auslieferung.md`).

Verbindlicher Unternehmensstandard (Zweige, Sicherheit, Qualität, Inhalte, Betrieb):
`docs/unternehmensstandard.md`. Die prüfbaren Regeln setzt `npm run standard` in der CI durch.

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
  anderer Stelle brechen die Kaskade der Aufnahme. Aufgenommene Klassen wie `tk-form`,
  `tk-field`, `tk-auth` werden deshalb nicht umbenannt.
- Gemeinsames Seitenverhalten (Kopfmenüs, Scroll- und Fuß-Attribute der Hülle, Filmplayer) liegt
  in `src/lib/imported-site.ts`, damit sich jede Seite gleich verhält; Routen binden nur dessen
  Hooks in ihr JSX ein.
- Der öffentliche KI-Chat ist ein Baustein in eigenen Dateien: Oberfläche `src/components/chat/`
  mit Stilen in `src/styles/site-chat.css` (eigene `nxc-`-Klassen, nie die aufgenommenen
  `aifly-panel`-Regeln), Browserlogik `src/lib/chat-client.ts` und `src/lib/chat-dock.ts`, Server
  `src/lib/chat-api.ts` mit Leitplanken `src/lib/chat-leitplanken.ts`. Was der Assistent sagen
  darf, steht einmal in `src/lib/chat-wissen.server.ts` und folgt den Seiteninhalten. Diese Datei
  ist nur für den Server: Systemvorgabe und Kennung dürfen nie ins Browser-Bundle
  (`src/lib/chat-bundle.test.ts` prüft das); der Browser bekommt Seitenliste und Kontaktadresse
  aus `src/lib/chat-seiten.ts`.
- Der Chat ist standardmäßig AUS: `/api/chat` antwortet nur, wenn die Worker-Variable `CHAT_AKTIV`
  genau `an`, `1`, `true` oder `on` lautet; sonst zeigt die Oberfläche „Der Assistent ist derzeit
  nicht verfügbar“ mit dem Weg zu `/kontakt`. Einschalten erst, nachdem der Inhaber die
  Rechtstexte (`/datenschutz`, `/ki-hinweise`) zum Chat freigegeben hat. Nötig sind außerdem das
  D1-Binding `DB` mit `migrations/0002-chat.sql` und `0003-chat-aufbewahrung.sql` sowie die
  Secrets `NINEROUTER_API_KEY` und `CHAT_IP_SCHLUESSEL` (HMAC-Schlüssel für den IP-Kurzwert,
  mindestens 16 Zeichen; nicht beiläufig wechseln, Limits und gespeicherter Verlauf hängen
  daran). Fehlt eines davon, bleibt der Chat geschlossen (503). Ein Cron ist nicht eingerichtet:
  alte Chatzeilen werden gelöscht, während Fragen gestellt werden (Standard 30 Tage,
  `CHAT_AUFBEWAHRUNG_TAGE`, Inhaberentscheidung), sonst von Hand wie in Migration 0003 beschrieben.
- Der Chat legt im Browser nur Sitzungsspeicher an (`sessionStorage`, Schlüssel `nexify-chat-v1`):
  Verlauf, Sitzungskennung und die Wahl „Panel angedockt offen“. Er endet mit dem Tab, setzt kein
  Cookie und ist für die vom Besucher gewünschte Funktion nötig. Jeder Zugriff ist gegen
  `SecurityError` gekapselt; Einzelheiten in `docs/pwa-seo-geo.md`.
- Die Kopie ist unabhängig vom früheren Auftritt: nie dorthin zurückschreiben und keine Assets von
  der ursprünglichen Domain einbinden. Heruntergeladene Medien liegen in `public/site-assets/` und
  `public/glass/`.
- Markenfilme laufen nur über `src/components/SiteFilm.tsx` mit Daten aus `src/lib/site-films.ts`
  und Stilen in `src/styles/site-film.css`, damit jede Seite denselben Player zeigt und ein Film
  genau einmal definiert ist.
- Adressregeln des Workers (Kurzadressen, stillgelegte Pfade, Antwort-Header) stehen in
  `src/lib/server-routing.ts` und sind durch `src/server.test.ts` abgedeckt.
