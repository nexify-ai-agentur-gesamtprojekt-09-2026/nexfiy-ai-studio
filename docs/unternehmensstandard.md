# Unternehmensstandard für www.nexifyai.de

Stand 23.11.2026. Verbindlich für jede Änderung in diesem Repository, für Menschen und Agenten.
Was maschinell prüfbar ist, prüft `tools/standard-pruefung.mjs` (`npm run standard`) in jeder CI;
ein Verstoß hält den Check „Prüfen“ rot. Einzelheiten zum Ablauf stehen in
[auslieferung.md](auslieferung.md), Arbeitsregeln in [AGENTS.md](../AGENTS.md).

**Aufträge und offene Punkte** werden nicht hier verwaltet, sondern im führenden Register des
Monorepos `nexify-ai-finales-agentur-gesamtprojekt-09-2026`: `config/acceptance-coverage.json`,
Abschnitt `requirements_reconciliation` (laut dortiger `AGENTS.md`, Führungsentscheidung
04.11.2026), mit der Arbeitsliste `docs/09-final/offene-arbeiten-2026-11-14.md` (OA-Nummern).
Welches dieser Register führt, ist dort selbst noch offen (OA-061, Entscheidung des Inhabers).
Die Punkte unter „OFFEN“ unten sind dorthin zu übernehmen; hier stehen sie nur als Verweis.

## 1. Ebenen und Zuständigkeiten

| Ebene      | Was                                                                                                                       | Zuständig                                                            | Beleg                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------- |
| Quelle     | Zweig `main` auf GitHub ist der Auslieferungsstand                                                                        | Inhaber (Merge), ein Writer je Scope                                 | `AGENTS.md`                                                 |
| Prüfen     | Workflow „CI“, Job „Prüfen“, auf jedem PR und Push                                                                        | automatisch                                                          | `.github/workflows/ci.yml`                                  |
| Ausliefern | Workflow „Deploy live“ nach jedem Push auf `main`: dieselben Prüfungen, Build, Deploy, Smoke-Test, automatischer Rollback | automatisch, Token im Environment `production`                       | `.github/workflows/deploy-live.yml`, `tools/deploy-live.sh` |
| Rücklesen  | Build-Stempel `/.well-known/nexify-build.json` muss den Commit melden                                                     | automatisch im Deploy; von Hand `tools/deploy-live.sh --verify-only` | `docs/auslieferung.md`                                      |
| Notfall    | `tools/deploy-live.sh` direkt auf dem Server                                                                              | nur Inhaber oder ausdrücklich Beauftragte                            | `docs/auslieferung.md`, „Weitere Wege“                      |

Der Server-Weg ist kein zweiter Normalweg. Wer ihn nutzt, liefert nur einen Commit aus `main` aus
und vermerkt den Anlass im Register.

## 2. Zweige und Pull Requests

- Agenten arbeiten auf Zweigen `claude/<thema>` und öffnen einen **Draft-PR** gegen `main`.
  Gemergt wird erst, wenn „Prüfen“ grün ist; jeder Merge geht live.
- Kein Force-Push, kein Rebase, Amend oder Squash gepushter Commits, kein Löschen fremder Zweige.
  Die Rulesets „Regelsaetze“ und „RulesetV2“ sperren auf allen Zweigen Force-Push und Löschen
  (gelesen über die GitHub-API, 23.11.2026, 02:10 UTC).
- Ein PR, ein Thema. Generierte Dateien (`src/routeTree.gen.ts`, `public/sitemap.xml`) entstehen
  im Build.

## 3. Sicherheit

- **Zugangsdaten:** Das Cloudflare-Token ist ein Account-API-Token mit nur
  „Workers Scripts: Edit“ (optional „Account Settings: Read“), hinterlegt ausschließlich im
  GitHub-Environment `production`, das nur `main` erreicht. Worker-Secrets liegen beim Worker.
- **Nie im Repository oder Chat:** Schlüssel, Tokens, Passwörter, `.env*`, `.dev.vars*`,
  Schlüsseldateien. Geprüft: Dateinamen und Token-Muster (`cfat_`, `cfut_`, `ghp_` u. a.,
  `github_pat_`, `sk-`, private PEM-Schlüssel).
- **Actions:** jede `uses:`-Angabe per 40-stelligem Commit-SHA gepinnt (Tag als Kommentar);
  `permissions:` auf oberster Ebene nur lesend und in jedem Job ausdrücklich gesetzt; Schreibrechte
  nur im Job, der sie braucht; `actions/checkout` immer mit `persist-credentials: false`; kein
  Auslöser `pull_request_target`.
- **Abhängigkeiten:** Dependabot (`.github/dependabot.yml`) wöchentlich für GitHub Actions und die
  JavaScript-Pakete (Ökosystem `bun`, weil `bun.lock` das Lockfile ist), gruppiert, höchstens zwei
  offene PRs je Ökosystem. Dependabot-PRs werden wie jeder PR geprüft und nicht automatisch
  gemergt.
- **Meldeweg** für Schwachstellen: [SECURITY.md](../SECURITY.md).

## 4. Qualität

- Pflicht vor jedem Merge, in dieser Reihenfolge in „Prüfen“: Unternehmensstandard, Installation
  aus dem Lockfile, Syntax der Skripte, `npm run lint`, `npx tsc --noEmit`, `npm test`,
  `npm run build`, `npm test` mit Build-Ausgabe und Abdeckung.
- Die Testabdeckung (Cobertura) geht an GitHub Code Quality, außer bei PRs aus Forks und von
  Dependabot (nur lesendes Token).
- Neue Prüflogik bekommt Tests mit Gegenprobe: der Test muss scheitern, wenn die Regel verletzt ist.
- Dev-Container und Workflows nutzen dieselben Versionen (Node 22, Bun 1.4.4); geprüft.

## 5. Inhalte

- Keine unbelegten Aussagen auf der Seite: Zahlen, Kunden, Auszeichnungen, Preise und Fristen nur
  mit Beleg. Unternehmensangaben stehen einmal in `src/lib/site-facts.ts`, wortgleich zum
  Impressum.
- Rechtstexte (`/impressum`, `/datenschutz`, `/ki-hinweise`, AGB) ändern sich nur mit
  ausdrücklicher Freigabe des Inhabers. Der Chat bleibt aus, bis diese Freigabe vorliegt
  (`AGENTS.md`).
- Modellaufrufe nur über den kontrollierten Adapter (`src/lib/chat-api.ts`), Modell
  `deepseek/deepseek-v4.1-flash-1017`, Reasoning `high`, ohne Ersatzmodell.

## 6. Betrieb

- **Überwachung:** Jede Auslieferung liest den Build-Stempel zurück und prüft die Hauptpfade
  (`tools/deploy-pruefung.mjs smoke`). Eine dauerhafte Überwachung zwischen den Auslieferungen
  gibt es nicht (siehe OFFEN).
- **Fehler:** Ein fehlgeschlagener Lauf legt ein Issue mit Label `deploy-fehler` an oder ergänzt
  das offene. Wer es sieht, prüft „Lage“ im Issue und handelt nach `docs/auslieferung.md`.
- **Rückweg:** automatischer Rollback im Lauf; von Hand Workflow „Deploy live“ mit `ref` = SHA des
  letzten guten main-Commits; dauerhaft per Revert-PR.
- D1-Migrationen und Worker-Variablen setzt kein automatischer Weg; nur von Hand, einzeln
  (`docs/pwa-seo-geo.md`).

## 7. Abhängigkeiten zu anderen Systemen

| System                                     | Rolle                                      | Beleg                                                                                 | Stand                                              |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Cloudflare Worker `nexfiy-ai-studio`       | Laufzeit der Seite                         | `tools/deploy-live.sh`, `tools/wrangler-config.py`                                    | belegt                                             |
| Cloudflare D1 `nexify-main` (Binding `DB`) | Anfragen, Chatverlauf                      | `tools/wrangler-config.py`, `migrations/`                                             | belegt; Migrationsstand live nicht geprüft         |
| Resend                                     | Versand der Anfrage-Mails                  | `src/lib/anfrage-api.ts` (`RESEND_API_KEY`)                                           | im Code belegt; Konfiguration live nicht geprüft   |
| KI-Router `ai-router.nexifyai.cloud`       | Chat-Antworten                             | `src/lib/chat-api.ts` (`NINEROUTER_API_KEY`)                                          | im Code belegt; Chat standardmäßig aus             |
| `teileklar.shop`                           | getrenntes System, nicht Teil dieser Seite | `/teileklar*` antwortet 404 mit `noindex` (Smoke-Test); Monorepo `DECISIONS.md` D-023 | Trennung belegt; Quell-Repository und Writer offen |
| GitLab `ops-scripts`                       | —                                          | in diesem Repository und im Monorepo nicht gefunden                                   | OFFEN                                              |

## 8. Durchsetzung

`tools/standard-pruefung.mjs` prüft ohne Abhängigkeiten (Tests: `src/test/standard-pruefung.test.ts`):

| Regel                                     | Inhalt                                                                                                                                                          |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pflicht-doku`                            | `AGENTS.md`, `README.md`, `SECURITY.md`, diese Datei, `docs/auslieferung.md`, `docs/codespaces.md`, `.github/dependabot.yml`, `ci.yml`, Dev-Container vorhanden |
| `keine-geheimnisdateien`                  | keine `.env*`, `.dev.vars*`, `*.pem`, `*.key`, `*.p12`, `*.pfx`, `id_rsa*` u. a. versioniert                                                                    |
| `keine-tokens`                            | keine Tokens nach bekannten Mustern im Inhalt (Wert wird nie ausgegeben)                                                                                        |
| `sitemap-nicht-eingecheckt`               | `public/sitemap.xml` nicht versioniert                                                                                                                          |
| `actions-gepinnt`                         | jede `uses:`-Angabe per 40-stelligem SHA (Container per Digest)                                                                                                 |
| `permissions-workflow`, `permissions-job` | Rechte oben nur lesend, jeder Job mit eigenem `permissions:`, nie `write-all`                                                                                   |
| `checkout-ohne-credentials`               | `actions/checkout` mit `persist-credentials: false`                                                                                                             |
| `kein-pull-request-target`                | Auslöser `pull_request_target` nicht verwendet                                                                                                                  |
| `versionen-gleich`                        | `node-version`/`bun-version` aller Workflows = Dev-Container                                                                                                    |
| `dependabot`                              | Ökosysteme `github-actions` und `npm`/`bun` eingetragen                                                                                                         |
| `ci-ruft-standard`                        | `ci.yml` führt `npm run standard` aus                                                                                                                           |

Eine Regel abzuschwächen oder zu entfernen ist eine Änderung dieses Standards und braucht die
Freigabe des Inhabers im PR.

## Inhaberentscheidungen

- 23.11.2026: Seiteninhalte bleiben unverändert (Startseite in der Fassung nach #11, Studiofilm ausgeblendet). Inhaltliche Änderungen nur auf ausdrückliche Anweisung.

## OFFEN

Ist-Stand gemessen am 23.11.2026, 02:10 UTC (GitHub-API, Build-Stempel). In das führende Register
übernehmen; hier nicht fortschreiben.

| Nr. | Punkt                                                                                                                                                                                                                                                                                                                                                                                                        | Owner                                     | Nächste Aktion                                                                                                                                                         | Fällig                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| S1  | Token fehlt im Environment `production`: die letzten drei Läufe „Deploy live“ (PR 16, 18, 17) brechen bei „Zugangsdaten vorhanden?“ ab, Issue #14 `deploy-fehler` offen. Live meldet Commit `8d73146` (PR 12), ausgeliefert vom Server `srv1243952`; `main` ist 14 Commits weiter.                                                                                                                           | Inhaber                                   | Token und Konto-ID nach `docs/auslieferung.md`, Abschnitt 1 und 2, hinterlegen; Lauf von Hand mit `ref=main` starten                                                   | vor dem nächsten Merge |
| S2  | Pflicht-Check fehlt (GitHub-API, 23.11.2026, 02:52 UTC): aktiv sind nur „Regelsaetze“ und „RulesetV2“ (alle Zweige: `deletion`, `non_fast_forward`) und „Copilot review for default branch“ (`copilot_code_review`). Es gibt keine Regel `pull_request` und keine `required_status_checks`; ein direkter Push auf `main` löst „Deploy live“ ohne vorherigen CI-Lauf aus (dort prüft nur „Prüfen und bauen“). | Inhaber                                   | Ruleset nach `docs/auslieferung.md`, Abschnitt 3: PR-Pflicht, Check „Prüfen“, „up to date“                                                                             | vor dem nächsten Merge |
| S3  | Keine Überwachung zwischen Auslieferungen (Verfügbarkeit, Fehlerrate).                                                                                                                                                                                                                                                                                                                                       | Inhaber (Entscheidung, Dienst und Kosten) | Dienst wählen; bis dahin nur Readback im Deploy                                                                                                                        | offen                  |
| S4  | Quell-Repository, Writer und Deployweg von `teileklar.shop` nicht belegt (Monorepo D-023, Offen 1).                                                                                                                                                                                                                                                                                                          | Inhaber                                   | im führenden Register entscheiden                                                                                                                                      | offen                  |
| S5  | GitLab `ops-scripts`: Rolle und Ort nicht belegt; Richtung GitHub/GitLab als Quelle ist im Register G27 `decision_evidence_required`.                                                                                                                                                                                                                                                                        | Inhaber                                   | Entscheidung zu G27; danach Abhängigkeit hier eintragen                                                                                                                | offen                  |
| S6  | Welches Register führt (OA-061).                                                                                                                                                                                                                                                                                                                                                                             | Inhaber                                   | eine Zeile in der Monorepo-`AGENTS.md`                                                                                                                                 | offen                  |
| S7  | Erledigt 23.11.2026 (lesend geprüft): D1 `nexify-main` (Region EEUR) hat 0001 `anfragen` und 0002 `chat_nachrichten`; 0003 (`versuche`, Index `chat_tenant_zeit`) noch nicht angewendet, bewusst bis zur Chat-Freigabe. Zusätzliche Alt-Tabelle `contact_requests` ohne Migration in diesem Repo (nicht angefasst). Resend: `nexifyai.de` verifiziert, eu-west-1, Tracking aus.                              | —                                         | 0003 erst bei Chat-Freigabe anwenden                                                                                                                                   | erledigt               |
| S8  | Kundenprojekt Studienkolleg Aachen: Resend-Domain `studienkollegaachen.de` steht auf „failed“ (23.11.2026). DNS liegt bei Strato (`rzone.de`); es fehlen TXT `resend._domainkey`, TXT `send` (SPF), MX `send` → `feedback-smtp.eu-west-1.amazonses.com` (zeigt auf `smtpin.rzone.de`).                                                                                                                       | Inhaber/Kunde (Strato-Zugang)             | Einträge bei Strato setzen, danach in Resend „Verify“                                                                                                                  | offen                  |
| S9  | Branch-Regel des Environments `production` nicht verifiziert: `GET …/environments/production` und `…/deployment-branch-policies` liefern über den Agenten-Zugang HTTP 403 (23.11.2026, 02:52 UTC). Sie ist der einzige Schutz, der das Token außerhalb von `main` fernhält (die `if: github.ref == 'refs/heads/main'` stehen in der Workflow-Datei des jeweiligen Zweigs selbst).                            | Inhaber                                   | Settings → Environments → `production` → „Deployment branches and tags“: nur `main` zulassen (`docs/auslieferung.md`, Abschnitt 2, Schritt 1); Ergebnis hier vermerken | vor dem nächsten Merge |
