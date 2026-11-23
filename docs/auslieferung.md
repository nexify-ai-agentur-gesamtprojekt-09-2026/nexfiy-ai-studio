# Auslieferung von www.nexifyai.de

Die Seite läuft als Cloudflare Worker `nexfiy-ai-studio`. Stand 2026-11-23: **Ein Merge nach
`main` geht automatisch live**, ohne Handarbeit und ohne Freigabe (Inhaber-Vorgabe: Bestpraxis,
kein Mensch im Ablauf). Ausgeliefert wird über **GitHub Actions** mit einem
**Account-API-Token** von Cloudflare. Ein solches Token gehört dem Cloudflare-Konto, nicht einer
Person. Es läuft deshalb weiter, wenn sich Personen oder ihre Rechte ändern; Cloudflare empfiehlt
es für CI.

Der Schutz ist mehrstufig:

1. Pflicht-CI vor dem Merge.
2. Dieselben Prüfungen noch einmal auf dem auszuliefernden Commit.
3. Prüfsummen des Build-Artefakts und Allowlist für die Wrangler-Konfiguration.
4. Nach dem Deploy: Binding-Prüfung, Readback und Smoke-Test.
5. Zuletzt ein automatischer Rollback auf die vorige Worker-Version.

## Normalablauf

1. Die Änderung kommt als Pull Request gegen `main`.
2. Der Workflow **CI** (`.github/workflows/ci.yml`, Job „Prüfen“) läuft auf jedem PR:
   - Installation aus dem Lockfile;
   - Syntaxprüfung der Skripte unter `tools/`;
   - `npm run lint` und `npx tsc --noEmit`;
   - `npm test`, dann `npm run build`, dann erneut `npm test` mit Build-Ausgabe.

   Der Branch-Schutz lässt den Merge erst zu, wenn „Prüfen“ grün ist.
3. Nach dem Merge startet der Push auf `main` den Workflow **Deploy live**
   (`.github/workflows/deploy-live.yml`). Der Job „Prüfen und bauen“ prüft genau diesen Commit
   noch einmal wie die CI. Nur wenn er grün ist, läuft „Ausliefern“ (`needs`).
4. `tools/deploy-live.sh` liefert aus, prüft live und setzt bei einem Fehler selbst auf die vorige
   Version zurück (siehe „Was das Deploy-Skript tut“).
5. Das Ergebnis steht in der **Zusammenfassung** des Laufs: Commit, Worker-Version vorher und
   nachher, Deploy, Binding, Readback, Smoke-Test je Pfad und Rollback.
6. Schlägt ein Lauf fehl, legt der Job „Fehler melden“ ein GitHub-Issue mit dem Label
   `deploy-fehler` an. Ist schon eines offen, ergänzt er es um einen Kommentar. Das Issue sagt,
   ob der Rollback gelungen ist; GitHub benachrichtigt die Beobachter des Repositorys. Der Job
   hat als einziger Schreibrecht, und zwar nur `issues: write`.

**Mehrere Merges kurz hintereinander:** Es läuft immer nur eine Auslieferung
(`concurrency: deploy-live`). Ein laufender Lauf wird nie abgebrochen. GitHub hält höchstens
einen wartenden Lauf, ein neuerer Push ersetzt also einen noch wartenden älteren. Ausgeliefert
wird am Ende der neueste Stand.

**Fehlt das Token:** Der Schritt „Zugangsdaten vorhanden?“ bricht vor jedem Deploy ab. Die
Meldung lautet „Auslieferung nicht eingerichtet: Im Environment production fehlt …“ und
verweist auf diese Datei. Live bleibt unverändert, und es entsteht ein Issue `deploy-fehler`.

### Weitere Wege

Alle Wege nutzen `tools/deploy-live.sh` und prüfen deshalb gleich, einschließlich Rollback.

- **Von Hand in GitHub:** Rückweg auf einen älteren main-Commit oder ein Probelauf, siehe
  „Rückweg“.
- **Server, nur im Notfall:** `tools/deploy-live.sh` direkt auf dem Server. Die Zugangsdaten
  kommen aus `/etc/nexifyai/hermes.env`. Einzelprüfungen:
  - `node tools/deploy-pruefung.mjs smoke`
  - `tools/worker-version.sh aktiv`
  - `tools/worker-version.sh rollback <VERSION_ID>`
- **Cloudflare Workers Builds, dokumentierte Alternative, nicht eingeschaltet:** Das Skript läuft
  auch dort, als Deploy-Command `npm run deploy:cf`. Es erkennt `WORKERS_CI=1` und nimmt den
  Commit aus `WORKERS_CI_COMMIT_SHA`. Workers Builds unterstützt derzeit aber nur User-Tokens,
  also personengebundene Tokens (developers.cloudflare.com/workers/ci-cd/builds/configuration/).
  Deshalb ist der Primärweg GitHub Actions. **Nie beide Wege gleichzeitig verbinden**, sonst
  wird jeder Merge doppelt ausgeliefert.

## Was ein Lauf tut

**Job „Commit festlegen“** (`aufloesen`, ohne Environment, ohne Secrets, nur Leserecht):

1. Er checkt `main` mit voller Historie aus.
2. Er legt den Commit fest: bei einem Push `github.sha`, von Hand die Eingabe `ref`. Erlaubt
   sind `main` oder ein vollständiger 40-stelliger SHA. Danach prüft
   `git merge-base --is-ancestor <sha> origin/main`, dass der Commit zur Historie von `main`
   gehört. Alles andere bricht ab.
3. SHA, Anlass, Betreff, Autor und Datum stehen in der Zusammenfassung. Ist es nicht der aktuelle
   Kopf von `main`, steht dort ein Rollback-Hinweis.

**Job „Prüfen und bauen“** (`bauen`, ohne Environment, ohne Secrets, nur Leserecht):

1. Er checkt genau diesen SHA mit voller Historie aus (die Sitemap braucht die Git-Daten) und
   prüft, dass `HEAD` stimmt.
2. Er führt `bun install --frozen-lockfile`, lint, `tsc --noEmit`, `npm test`, `npm run build`
   und noch einmal `npm test` aus.
3. Er hält den Arbeitsbaum-Status und eine sha256-Liste aller Dateien unter `.output/` fest und
   lädt beides als Artefakt `build-<sha>` hoch.

**Job „Ausliefern“** (`deploy`, Environment `production`, ohne Freigabe):

1. Er checkt nur das Deploy-Werkzeug aus dem Workflow-Commit (`github.sha`) nach `werkzeug/` aus.
2. Er lädt das Artefakt. Die Prüfsumme der sha256-Liste muss stimmen, und jede Datei muss zur
   Liste passen.
3. „Zugangsdaten vorhanden?“: Token und Konto-ID müssen gesetzt sein (siehe oben).
4. Er ruft `werkzeug/tools/deploy-live.sh --skip-build` auf. Commit, Betreff und
   Arbeitsbaum-Status kommen aus den vorigen Jobs. Aus dem Anwendungsstand läuft in diesem Job
   kein Code; Wrangler lädt das gebaute Bundle nur hoch.

Mit `dry_run` (nur von Hand) läuft alles bis `wrangler deploy --dry-run`. Es wird nichts
ausgeliefert, und das Skript verlangt keine Zugangsdaten.

## Was das Deploy-Skript tut

`tools/deploy-live.sh` ist für alle Wege dasselbe Skript.

- **Commit:** `DEPLOY_COMMIT` (GitHub-Artefakt), sonst `WORKERS_CI_COMMIT_SHA` (Workers Builds;
  muss dem Checkout entsprechen), sonst `git rev-parse HEAD`.
- **Konfiguration:** `tools/wrangler-config.py` schreibt die `wrangler.json` aus dem Build nach
  einer Allowlist neu, in ein frisches Verzeichnis außerhalb von `.output/`.
  - Übernommen werden nur `main`, `compatibility_date`, `compatibility_flags`, `no_bundle`,
    `rules` und `assets`. Alles andere wird verworfen und gemeldet, etwa `build.command` oder
    `routes`.
  - Fest gesetzt werden `name: nexfiy-ai-studio`, das D1-Binding `DB` (`nexify-main`) und
    `keep_vars: true`.
  - Liegen `.env*`, `.dev.vars*` oder `.wrangler` im Artefakt, bricht das Skript ab.
  - Auch der Build trägt den Namen: `vite.config.ts` gibt ihn Nitro mit.
- **Stempel:** `/.well-known/nexify-build.json` mit Commit, Betreff, Arbeitsbaum-Status, Weg
  (`host`) und, in GitHub Actions, dem Link zum Lauf (`run_url`).
- **Ablauf der Auslieferung:**
  1. **Rückweg-Anker:** `tools/worker-version.sh aktiv` liest die aktive Worker-Version über
     `GET /accounts/<Konto>/workers/scripts/nexfiy-ai-studio/deployments` und hält sie fest. Ist
     sie nicht lesbar, wird nicht ausgeliefert.
  2. `wrangler deploy` mit fester Wrangler-Version (4.158.0).
  3. **Binding:** Der Worker muss `DB` vom Typ `d1` tragen
     (`GET …/workers/scripts/nexfiy-ai-studio/settings`).
  4. **Readback:** Der Stempel auf `https://www.nexifyai.de` muss den Commit melden.
  5. **Smoke-Test** (`tools/deploy-pruefung.mjs smoke`):
     - `/`, `/leistungen`, `/kontakt`, `/impressum`, `/datenschutz` und `/regionen` liefern
       HTTP 200; eine Weiterleitung zählt als Fehler;
     - `/teileklar` liefert 404 mit `X-Robots-Tag: noindex` und ohne `Location`;
     - jede Prüfung bekommt drei Versuche.
  6. **Bewertung** (`tools/deploy-pruefung.mjs entscheidung`):
     - Ist alles bestanden, ist der Lauf fertig.
     - Ist die aktive Version noch der Anker, wurde nichts ausgeliefert; ein Rollback ist nicht
       nötig.
     - Ist eine andere Version aktiv oder ist sie nicht lesbar, folgt
       `wrangler rollback <Anker> --name nexfiy-ai-studio`. Danach prüft das Skript, dass der
       Anker aktiv ist, und wiederholt den Smoke-Test.
     - Ohne gültigen Anker gibt es keinen automatischen Rollback; das Skript meldet das
       ausdrücklich.

     In jedem Fehlerfall endet das Skript mit Exit 1, auch nach einem gelungenen Rollback.
- **Zugangsdaten** erscheinen nie im Protokoll. Der Token steht nur im Schritt, der ihn braucht,
  und geht über stdin an `curl`.

**Nicht Teil der Auslieferung:**

- D1-Migrationen werden nie angewendet (`migrations/*.sql` einzeln und von Hand, siehe
  `docs/pwa-seo-geo.md`).
- Variablen und Secrets des Workers werden nicht gesetzt. `keep_vars: true` lässt die im
  Dashboard gesetzten Variablen stehen; Secrets löscht ein Deploy nie.
- Routen und Custom Domains ändert das Skript nicht, weil die Allowlist `routes` verwirft.

## Einmalige Einrichtung durch den Inhaber

Einzige Handarbeit: Token und Konto-ID einmal hinterlegen und den Branch-Schutz setzen. Danach ist
für eine Auslieferung kein Mensch mehr nötig.

### 1. Account-API-Token bei Cloudflare anlegen

Cloudflare-Dashboard → **Manage Account** → **Account API Tokens** → **Create Token** →
**Create Custom Token**:

- **Token name:** `github-actions nexfiy-ai-studio`.
- **Permissions:**
  - **Account → Workers Scripts → Edit** (Pflicht: `wrangler deploy`, `wrangler rollback`,
    Einstellungen und Deployments lesen).
  - **Account → Account Settings → Read** (optional, schadet nicht: Wrangler liest damit
    Kontoangaben).
- **Account Resources:** Include → nur dieses Konto.
- Keine Zone-Rechte. **Workers Routes** ist nicht nötig, weil der Deploy keine Routen setzt.
- **D1 ist für die Auslieferung nicht nötig.** Das Skript ruft D1 nie auf, und ein Deploy mit
  D1-Binding braucht keine eigenen D1-Rechte. Erst wenn künftig Migrationen per CI laufen
  sollen, kommt **Account → D1 → Edit** dazu.
- **Client IP Address Filtering:** leer lassen, denn GitHub-Runner haben wechselnde Adressen.
  **TTL:** ohne Ablauf, oder mit Ablaufdatum und Erinnerung zur Rotation.
- **Continue to summary** → **Create Token**. Das Token wird nur einmal angezeigt: kopieren und
  direkt in Schritt 2 eintragen.

Was der Ablauf mit dem Token tatsächlich aufruft, geprüft in `tools/deploy-live.sh` und
`tools/worker-version.sh`: `wrangler deploy`, `wrangler rollback`,
`GET …/workers/scripts/nexfiy-ai-studio/settings` und
`GET …/workers/scripts/nexfiy-ai-studio/deployments`.

**Konto-ID:** Dashboard → **Workers & Pages** → rechte Spalte „Account ID“, oder Konto-Startseite
→ „Copy account ID“.

### 2. Environment `production` in GitHub

Repository → **Settings** → **Environments** → **New environment** → Name `production`:

1. **Deployment branches and tags:** „Selected branches and tags“ → **Add deployment branch or
   tag rule** → `main`. Nur `main` kommt an das Token.
2. **Environment secrets** → **Add environment secret**: Name `CLOUDFLARE_API_TOKEN`, Wert = Token
   aus Schritt 1.
3. **Environment variables** → **Add environment variable**: Name `CLOUDFLARE_ACCOUNT_ID`, Wert =
   Konto-ID. Die Konto-ID ist nicht geheim.
4. **Required reviewers nicht einschalten.** Sonst wartet jede Auslieferung auf einen Klick.

Bei einer Rotation wird nur der Wert von `CLOUDFLARE_API_TOKEN` ersetzt; sonst ändert sich nichts.

### 3. Branch-Schutz für `main`

Repository → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**:

1. Name `main`, **Enforcement status** „Active“, **Target branches** → „Include default branch“.
2. **Require a pull request before merging** einschalten (Anzahl Freigaben: 0 genügt).
3. **Require status checks to pass** einschalten → **Add checks** → `Prüfen`. Der Check stammt aus
   dem Workflow „CI“ und erscheint in der Auswahl, sobald die CI einmal gelaufen ist.
   **Require branches to be up to date before merging** einschalten.
4. **Block force pushes** einschalten.

Danach landet auf `main` nur, was „Prüfen“ bestanden hat, und jeder Merge geht automatisch live.

## Prüfen, was live ist

- `curl -s https://www.nexifyai.de/.well-known/nexify-build.json` (Feld `commit`)
- `node tools/deploy-pruefung.mjs smoke --commit=<erste 10 Zeichen des SHA>`
- `tools/deploy-live.sh --verify-only` auf dem passenden Commit

## Rückweg

Im Fehlerfall setzt der Lauf selbst auf die vorige Worker-Version zurück. Von Hand:

- **Per Workflow:** GitHub → **Actions** → **Deploy live** → **Run workflow**. Bei „Use workflow
  from“ **`main`** wählen, `ref` = vollständiger SHA des letzten guten main-Commits, dann
  **Run workflow**.
  - Gebaut, geprüft und ausgeliefert wird dieser Stand, mit Smoke-Test und Auto-Rollback.
  - `dry_run` anhaken für einen Probelauf.
- **Dauerhaft:** den verursachenden Merge per Revert-PR rückgängig machen. Ein Rollback allein
  hält nur bis zum nächsten Merge.
- **Dashboard:** Workers & Pages → `nexfiy-ai-studio` → **Deployments** → frühere Version →
  **Rollback**.
- **Wrangler oder Server:**
  - `tools/worker-version.sh rollback <VERSION_ID>` oder
    `npx wrangler rollback --name nexfiy-ai-studio`;
  - die Versionen listet `npx wrangler deployments list --name nexfiy-ai-studio`.

Ein Rollback setzt nur den Code zurück; D1-Daten und Secrets bleiben unverändert. Danach meldet
der Build-Stempel wieder den älteren Commit.
