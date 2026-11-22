# Auslieferung von www.nexifyai.de

Die Seite läuft als Cloudflare Worker `nexfiy-ai-studio`. Ausgeliefert wird auf zwei Wegen, die
beide `tools/deploy-live.sh` verwenden und deshalb gleich prüfen:

- **GitHub Actions** (`.github/workflows/deploy-live.yml`, Name „Deploy live“): nur von Hand
  gestartet, jeder Lauf wartet auf die Freigabe des Inhabers.
- **Server** (`tools/deploy-live.sh` direkt): lädt die Zugangsdaten aus
  `/etc/nexifyai/hermes.env`.

Es gibt keine automatische Auslieferung bei Push oder Merge.

## Was ein Lauf tut

Der Workflow läuft nur von `main` aus und hat zwei Jobs:

**Job „Commit festlegen“** (`aufloesen`, ohne Environment, ohne Secrets, nur Leserecht):

1. Checkout von `main` mit voller Historie.
2. Die Eingabe `ref` wird auf einen festen 40-stelligen SHA aufgelöst. Erlaubt sind `main`, also
   der Kopf von `main` beim Start, oder ein vollständiger Commit-SHA. Danach prüft
   `git merge-base --is-ancestor <sha> origin/main`, dass der Commit zur Historie von `main` gehört
   (aktueller Stand oder Rückweg auf einen früheren main-Commit). Alles andere bricht ab:
   Zweignamen, Kurz-SHAs, Commits außerhalb von `main`.
3. SHA, Betreff, Autor und Datum stehen in der **Zusammenfassung** des Laufs. Ist es nicht der
   aktuelle Kopf von `main`, steht dort ein Rollback-Hinweis.

**Job „Prüfen und bauen“** (`bauen`, ohne Environment, ohne Secrets, nur Leserecht):

1. Checkout genau des festgelegten SHA, ohne gespeicherte Git-Zugangsdaten. Danach prüft der Job,
   dass `git rev-parse HEAD` diesen SHA meldet.
2. `bun install --frozen-lockfile`, `npm run lint`, `npx tsc --noEmit`, `npm test`.
3. `npm run build`, danach `npm test` erneut. Jetzt laufen auch die Prüfungen der Build-Ausgabe
   (`src/test/build-ausgabe.test.ts`, `src/test/ssr-ausgabe.test.ts`, `src/lib/chat-bundle.test.ts`).
4. Der Job hält den Arbeitsbaum-Status (`git status --porcelain`) und eine sha256-Liste aller
   Dateien unter `.output/` fest. Die Prüfsumme dieser Liste gibt er als Job-Output weiter.
5. `.output/` und die Metadaten werden als Artefakt `build-<sha>` hochgeladen
   (Aufbewahrung 1 Tag).

**Job „Ausliefern“** (`deploy`, Environment `production`, wartet auf Freigabe):

1. Checkout nur des Deploy-Werkzeugs nach `werkzeug/`, und zwar aus dem Workflow-Commit
   (`github.sha`, der Kopf von `main` beim Start). Der Job prüft, dass HEAD diesem Commit
   entspricht. Ein Rückweg auf einen älteren Commit läuft dadurch mit dem aktuellen,
   CI-fähigen Skript.
2. Das Artefakt wird nach `app/` geladen. Die Prüfsumme der sha256-Liste muss dem Output des
   Build-Jobs entsprechen. Danach muss jede Datei zur Liste passen und die Anzahl der Dateien
   stimmen.
3. `werkzeug/tools/deploy-live.sh` wird mit diesen Angaben aufgerufen:
   - `DEPLOY_APP_DIR=app` und `DEPLOY_SKIP_BUILD=1`.
   - Commit, Betreff und Arbeitsbaum-Status kommen als `DEPLOY_COMMIT`,
     `DEPLOY_COMMIT_SUBJECT` und `DEPLOY_WORKTREE_STATUS_FILE` aus den vorigen Jobs. Einen
     Git-Checkout der Anwendung gibt es in diesem Job nicht.

   Die `wrangler.json` aus dem Artefakt verwendet das Skript nicht ungefiltert.
   `tools/wrangler-config.py` schreibt sie nach einer Allowlist neu, in ein frisches Verzeichnis
   außerhalb des Artefakts:
   - Übernommen werden nur `main`, `compatibility_date`, `compatibility_flags`, `no_bundle`,
     `rules` und `assets` (`binding`, `directory`). Alle anderen Schlüssel werden verworfen und
     im Protokoll gemeldet, zum Beispiel `build.command`, das Wrangler sonst bei `deploy` in einer
     Shell ausführt.
   - Fest vorgegeben sind `name`, `d1_databases` und `keep_vars`. `no_bundle` muss `true` sein.
   - `main` und `assets.directory` müssen innerhalb von `.output/` liegen.
   - Das Skript bricht ab, wenn im Artefakt `.env*`, `.dev.vars*`, `.wrangler` oder weitere
     Wrangler-Konfigurationen liegen. Über `.env` ließen sich sonst etwa
     `CLOUDFLARE_API_BASE_URL` oder `CLOUDFLARE_API_HEADERS` setzen.

   Wrangler läuft im selben frischen Verzeichnis. Die sha256-Liste reicht dafür nicht aus: Sie
   belegt nur, dass das Artefakt zwischen Build- und Deploy-Job unverändert blieb. Der Build-Job
   führt aber Repository-Code aus und könnte die Datei selbst so erzeugen. Dieselbe Prüfung
   gilt auf dem Server.

   Das Skript setzt den Worker-Namen `nexfiy-ai-studio`, das D1-Binding `DB` (`nexify-main`) und
   `keep_vars: true`. Es schreibt den Build-Stempel (`host: github-actions`, zusätzlich
   `run_url`) und ruft `wrangler deploy` auf (Version im Workflow fest). Aus dem
   Anwendungsstand läuft in diesem Job kein Code: Wrangler lädt das gebaute Worker-Bundle nur
   hoch. Nur dieser Schritt kennt das Token.
4. Über die Cloudflare-API prüft das Skript, dass der Worker das Binding `DB` vom Typ `d1` trägt
   (`GET /accounts/<Konto>/workers/scripts/nexfiy-ai-studio/settings`, `result.bindings`).
5. Readback: `https://www.nexifyai.de/.well-known/nexify-build.json` muss den ausgelieferten
   Commit (`commit_short`) melden, sonst schlägt der Lauf fehl.

Mit `dry_run` läuft alles bis `wrangler deploy --dry-run`; es wird nichts ausgeliefert und es
werden keine Zugangsdaten verlangt (die Freigabe ist trotzdem nötig, weil der Job im Environment
`production` läuft).

**Nicht Teil des Laufs:** D1-Migrationen werden nie angewendet (`migrations/*.sql` einzeln und
von Hand, siehe `docs/pwa-seo-geo.md`). Variablen und Secrets des Workers (z. B. `CHAT_AKTIV`,
`NINEROUTER_API_KEY`) werden nicht gesetzt; `keep_vars: true` lässt die im Dashboard gesetzten
Variablen stehen, Secrets löscht ein Deploy nie.

## Einmalige Einrichtung durch den Inhaber

### 1. Cloudflare-API-Token anlegen (minimale Rechte)

Cloudflare-Dashboard → **Manage Account** → **Account API Tokens** → **Create Token** →
benutzerdefiniertes Token:

- **Scope:** „Specified Workers“ → nur `nexfiy-ai-studio`.
- **Rolle:** **Editor** für diesen Worker.
- Keine weiteren Rechte: keine Zone-Rechte, kein D1, kein Admin.

Belege (Cloudflare-Doku, abgerufen 2026-11-22):

- developers.cloudflare.com/workers/authorization/workers/: `wrangler deploy` und
  `wrangler rollback` für einen bestehenden Worker brauchen **Editor** für diesen Worker. Editor
  darf auch die Worker-Einstellungen lesen (nötig für die Binding-Prüfung). Für ein Deploy mit
  D1-Binding sind **keine eigenen D1-Rechte** nötig; D1-Rechte braucht nur, wer die Datenbank
  direkt abfragt. **Workers Routes Write** ist nur nötig, wenn ein Deploy Routes oder Custom
  Domains ändert; `tools/deploy-live.sh` setzt keine Routes, deshalb entfällt es. Einen neuen
  Worker anlegen dürfte nur ein Admin auf Produktebene; das Token kann also nicht versehentlich
  einen zweiten Worker erzeugen.
- developers.cloudflare.com/workers/authorization/: Wrangler mit Account-Token braucht
  `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID` in der Umgebung.

Wenn das Konto die Worker-Rollen noch nicht anbietet: ersatzweise ein Token mit nur
**Account → Workers Scripts → Edit**, auf dieses eine Konto beschränkt (Vorlage „Edit Cloudflare
Workers“ ohne die Zone- und Speicherrechte).

### 2. Environment `production` in GitHub

Repository → **Settings** → **Environments** → **New environment** → Name `production`:

1. **Required reviewers** einschalten und den Inhaber eintragen. Optional „Prevent self-review“
   nur, wenn eine zweite Person freigibt (sonst kann der Inhaber seine eigenen Läufe nicht
   freigeben).
2. **Deployment branches and tags:** „Selected branches and tags“ → `main` (verhindert
   Läufe von anderen Zweigen; der Workflow muss dann von `main` gestartet werden).
3. **Environment secrets** → **Add environment secret**: Name `CLOUDFLARE_API_TOKEN`, Wert =
   Token aus Schritt 1.
4. **Environment variables** → **Add environment variable**: Name `CLOUDFLARE_ACCOUNT_ID`,
   Wert = Cloudflare-Konto-ID (keine geheime Angabe).

Fehlt Token oder Konto-ID, bricht `tools/deploy-live.sh` vor dem Deploy mit
„FEHLER: Zugangsdaten fehlen …“ ab.

## Ablauf einer Auslieferung

1. GitHub → **Actions** → **Deploy live** → **Run workflow**.
2. Bei „Use workflow from“ **`main`** wählen. Für `ref` gilt: `main` für den aktuellen Stand oder
   ein vollständiger SHA eines früheren main-Commits für einen Rückweg. Bei Bedarf `dry_run`
   anhaken. Dann **Run workflow**.
3. Den Lauf öffnen. Der Job „Commit festlegen“ ist durchgelaufen, in der **Zusammenfassung**
   stehen SHA, Betreff, Autor und Datum. Prüfen, ob genau dieser Commit ausgeliefert werden soll.
4. Ist „Prüfen und bauen“ grün, steht der Job „Ausliefern“ auf „Waiting“. **Review deployments** →
   `production` anhaken → **Approve and deploy**. Ohne Freigabe läuft nichts. Ein zweiter Lauf
   wartet, bis der erste fertig ist (`concurrency: deploy-live`).
5. Im Protokoll stehen am Ende `BINDING OK: DB (d1)` und `READBACK OK: live=<commit>`.

Die Sperre, dass nur von `main` aus ausgeliefert wird, setzt die Environment-Regel
„Deployment branches: main“ durch. Die `if`-Bedingungen im Workflow sind nur eine zusätzliche
Absicherung, denn die Workflow-Datei eines anderen Zweigs könnte sie entfernen.

Nachprüfen jederzeit: `tools/deploy-live.sh --verify-only` (auf dem passenden Commit) oder
`curl -s https://www.nexifyai.de/.well-known/nexify-build.json`.

## Rückweg

Ein fehlerhafter Stand wird auf die vorige Worker-Version zurückgesetzt:

- **Wrangler:** `npx wrangler rollback --name nexfiy-ai-studio` (vorige Version) oder
  `npx wrangler rollback <VERSION_ID> --name nexfiy-ai-studio`; Versionen listet
  `npx wrangler deployments list --name nexfiy-ai-studio`. Das Token aus Schritt 1 reicht dafür
  (Editor).
- **Dashboard:** Workers & Pages → `nexfiy-ai-studio` → **Deployments** → frühere Version →
  **Rollback**.
- Alternativ den Workflow mit dem vollständigen SHA des vorigen guten main-Commits als `ref`
  erneut laufen lassen. Gebaut und geprüft wird dann dieser Stand, das Deploy-Skript kommt aber
  aus dem aktuellen `main`.

Ein Rollback setzt nur den Code zurück; D1-Daten und Secrets bleiben unverändert. Danach meldet
der Build-Stempel wieder den älteren Commit.
