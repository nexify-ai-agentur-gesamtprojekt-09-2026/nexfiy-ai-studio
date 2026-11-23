# Auslieferung von www.nexifyai.de

Die Seite läuft als Cloudflare Worker `nexfiy-ai-studio`. Stand 2026-11-23: **Ein Merge nach
`main` geht automatisch live**, ohne Handarbeit, ohne Freigabe und ohne Secrets in GitHub.
Inhaber-Vorgabe: Bestpraxis, kein Mensch im Ablauf. Die Auslieferung übernimmt
**Cloudflare Workers Builds**, die GitHub-Integration von Cloudflare. Cloudflare verwaltet das
Build-Token selbst, deshalb muss bei einer Token-Rotation niemand etwas in GitHub nachtragen.

Der Schutz kommt aus fünf Stufen: Pflicht-CI vor dem Merge, Tests auf dem gebauten Stand im
Cloudflare-Build, Binding-Prüfung, Readback und Smoke-Test nach dem Deploy und zuletzt ein
automatischer Rollback auf die vorige Worker-Version.

## Normalablauf

1. Änderung als Pull Request gegen `main`.
2. Workflow **CI** (`.github/workflows/ci.yml`, Job „Prüfen“) läuft auf jedem PR:
   - Installation aus dem Lockfile;
   - Syntaxprüfung der Skripte unter `tools/`;
   - `npm run lint` und `npx tsc --noEmit`;
   - `npm test`, `npm run build`, danach `npm test` erneut mit Build-Ausgabe.

   Der Branch-Schutz lässt den Merge erst zu, wenn „Prüfen“ grün ist.
3. Merge. Cloudflare Workers Builds sieht den Push auf `main` und führt aus:
   - **Build-Command** `bun install --frozen-lockfile && npm run build && npm test`;
   - **Deploy-Command** `npm run deploy:cf`, also `bash tools/deploy-live.sh --skip-build`.
4. `tools/deploy-live.sh` liefert aus, prüft live und setzt bei einem Fehler selbst auf die vorige
   Version zurück. Die Einzelheiten stehen unter „Was das Deploy-Skript tut“. Am Ende des
   Build-Protokolls steht eine kurze Tabelle: Commit, Worker-Version vorher und nachher, Deploy,
   Binding, Readback, Smoke-Test und Rollback. Die letzte Zeile lautet
   `AUSLIEFERUNG OK: <commit> live als <version>` oder `AUSLIEFERUNG FEHLGESCHLAGEN: …`.
5. Ein fehlgeschlagener Build erscheint im Cloudflare-Dashboard unter Workers & Pages →
   `nexfiy-ai-studio` → **Deployments** → **Builds** als fehlgeschlagen. Ist der Fehler nach dem
   Deploy aufgetreten, ist live bereits wieder die vorige Version aktiv.

Schlägt schon der Build-Command fehl (Installation, Build oder Tests), wird nichts ausgeliefert;
live bleibt der vorige Stand.

### Weitere Wege (optional, nur Notfall)

Beide Wege nutzen ebenfalls `tools/deploy-live.sh` und prüfen deshalb gleich, Rollback
eingeschlossen.

- **GitHub Actions „Deploy live“** (`.github/workflows/deploy-live.yml`): nur von Hand, für einen
  Rückweg auf einen älteren main-Commit, einen Probelauf (`dry_run`) oder wenn Workers Builds
  gestört ist. Er braucht das GitHub-Environment `production` mit Token und Konto-ID (siehe
  „Optional: GitHub Actions als Notfallweg“). Ohne diese Einrichtung bricht er vor dem Deploy ab.
  Schlägt ein Lauf fehl, legt der Job „Fehler melden“ ein Issue mit dem Label `deploy-fehler`
  an, oder er ergänzt das offene Issue (Recht nur `issues: write`).
- **Server:** `tools/deploy-live.sh` direkt auf dem Server, Zugangsdaten aus
  `/etc/nexifyai/hermes.env`. Einzelprüfungen: `node tools/deploy-pruefung.mjs smoke`,
  `tools/worker-version.sh aktiv`, `tools/worker-version.sh rollback <VERSION_ID>`.

## Was das Deploy-Skript tut

`tools/deploy-live.sh` ist für alle drei Wege dasselbe Skript.

**Commit bestimmen.** Das Skript nimmt den ersten vorhandenen Wert:

1. `DEPLOY_COMMIT` (GitHub-Artefakt);
2. `WORKERS_CI_COMMIT_SHA`, das Workers Builds setzt; ist dort git vorhanden, muss
   `git rev-parse HEAD` denselben SHA melden, sonst gibt es keinen Deploy;
3. `git rev-parse HEAD`.

Betreff und Arbeitsbaum-Status kommen aus git, wenn es vorhanden ist. Ohne git bleiben sie leer.

**Build.** Mit `--skip-build` oder `DEPLOY_SKIP_BUILD=1` nutzt das Skript das fertige `.output/`.
In Workers Builds hat der Build-Command gebaut und getestet.

**Konfiguration.** Das Skript nutzt die `wrangler.json` aus dem Build nicht ungefiltert.
`tools/wrangler-config.py` schreibt sie nach einer Allowlist neu, in ein frisches Verzeichnis
außerhalb von `.output/`:

- Übernommen werden nur `main`, `compatibility_date`, `compatibility_flags`, `no_bundle`, `rules`
  und `assets` (`binding`, `directory`). Alle anderen Schlüssel werden verworfen und gemeldet,
  zum Beispiel `build.command`, das Wrangler sonst in einer Shell ausführt.
- Fest vorgegeben sind `name: nexfiy-ai-studio`, das D1-Binding `DB` (`nexify-main`) und
  `keep_vars: true`.
- Pfade müssen innerhalb von `.output/` liegen. Liegen dort `.env*`, `.dev.vars*` oder `.wrangler`,
  bricht das Skript ab.

Auch der Build selbst trägt den Namen: `vite.config.ts` gibt ihn Nitro mit
(`cloudflare.wrangler.name`). Workers Builds verlangt, dass der Name in der Konfiguration dem
verbundenen Worker entspricht.

**Zugangsdaten.** Gebraucht werden `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID`. In
Workers Builds stellt Cloudflare sie bereit. Auf dem Server kommen sie aus `hermes.env`, in
GitHub aus dem Environment. Fehlt eines, bricht das Skript vor dem Deploy ab und meldet „FEHLER:
Zugangsdaten fehlen …“. Die Werte erscheinen nie im Protokoll, und der Token geht über stdin an
`curl`.

**Stempel.** Das Skript schreibt `/.well-known/nexify-build.json`: Commit, Betreff,
Arbeitsbaum-Status, Weg (`host`: `cloudflare-workers-builds`, `github-actions` oder der
Servername) und in Workers Builds die Build-UUID als `build_id`.

**Auslieferung.** Die Schritte laufen in dieser Reihenfolge:

1. **Rückweg-Anker.** `tools/worker-version.sh aktiv` liest die aktive Worker-Version über
   `GET /accounts/<Konto>/workers/scripts/nexfiy-ai-studio/deployments` und hält sie fest. Ist
   sie nicht lesbar, gibt es keinen Deploy.
2. `wrangler deploy` mit fester Wrangler-Version (4.158.0, auf allen Wegen gleich).
3. **Binding.** Der Worker muss `DB` vom Typ `d1` tragen
   (`GET …/workers/scripts/nexfiy-ai-studio/settings`).
4. **Readback.** Der Stempel auf `https://www.nexifyai.de` muss den Commit melden
   (`commit_short`).
5. **Smoke-Test** (`tools/deploy-pruefung.mjs smoke`):
   - `/`, `/leistungen`, `/kontakt`, `/impressum`, `/datenschutz` und `/regionen` liefern
     HTTP 200; eine Weiterleitung zählt als Fehler;
   - `/teileklar` liefert 404 mit `X-Robots-Tag: noindex` und ohne `Location`;
   - jede Prüfung hat drei Versuche.
6. **Bewertung** (`tools/deploy-pruefung.mjs entscheidung`). Sind Schritt 2 bis 5 bestanden, ist
   der Lauf fertig. Sonst liest das Skript die aktive Version erneut:
   - Sie ist gleich dem Anker: Es wurde nichts ausgeliefert, ein Rollback ist nicht nötig.
   - Sie ist eine andere oder nicht lesbar: `wrangler rollback <Anker> --name nexfiy-ai-studio`.
     Danach prüft das Skript, dass der Anker wieder aktiv ist, und wiederholt den Smoke-Test.
   - Es gibt keinen gültigen Anker: kein automatischer Rollback, das Skript meldet das
     ausdrücklich.

   In jedem Fehlerfall endet das Skript mit Exit 1, also als fehlgeschlagener Build, auch nach
   einem gelungenen Rollback.

`--dry-run` läuft bis `wrangler deploy --dry-run`. Es liefert nichts aus und verlangt keine
Zugangsdaten. `--verify-only` prüft nur Readback und Smoke-Test.

**Nicht Teil der Auslieferung:**

- D1-Migrationen werden nie angewendet; `migrations/*.sql` laufen einzeln und von Hand, siehe
  `docs/pwa-seo-geo.md`.
- Variablen und Secrets des Workers (z. B. `CHAT_AKTIV`, `NINEROUTER_API_KEY`) setzt das Skript
  nicht. `keep_vars: true` lässt die im Dashboard gesetzten Variablen stehen, und ein Deploy
  löscht nie Secrets.

## Einmalige Einrichtung durch den Inhaber

Es gibt nur zwei Handgriffe: Workers Builds im Cloudflare-Dashboard verbinden und den
Branch-Schutz in GitHub setzen. Danach ist kein Mensch mehr nötig. In GitHub werden keine
Secrets gepflegt.

### 1. Cloudflare Workers Builds verbinden

Cloudflare-Dashboard → **Workers & Pages** → Worker **`nexfiy-ai-studio`** → **Settings** →
**Builds** → **Connect**:

1. **Git-Konto:** GitHub wählen. Beim ersten Mal die **Cloudflare-GitHub-App** autorisieren und
   für die Organisation **`nexify-ai-agentur-gesamtprojekt-09-2026`** installieren. Zugriff
   „Only select repositories“ → **`nexfiy-ai-studio`**.
2. **Repository:** `nexify-ai-agentur-gesamtprojekt-09-2026/nexfiy-ai-studio`.
3. **Branch:** `main`.
4. **Build-Command:**

   ```
   bun install --frozen-lockfile && npm run build && npm test
   ```

5. **Deploy-Command:**

   ```
   npm run deploy:cf
   ```

6. **Root directory:** leer lassen (Repository-Wurzel).
7. **API token:** die Vorgabe lassen. Cloudflare erzeugt und verwaltet das Token selbst.
8. **Build variables** (unter „Variables and secrets“; keine Secrets nötig):

   | Name | Wert | Zweck |
   | --- | --- | --- |
   | `SKIP_DEPENDENCY_INSTALL` | `1` | Installation nur über den Build-Command, streng nach `bun.lock` |
   | `NODE_VERSION` | `22` | dieselbe Node-Version wie in der CI |

9. **Connect** bzw. **Save**.
10. Unter **Settings → Builds → Branch control**: Production branch `main`,
    **Enable Preview Builds aus**. Andere Zweige bauen so nichts; PRs prüft die CI in GitHub.

Belege, Cloudflare-Doku, abgerufen 2026-11-23:

- `developers.cloudflare.com/workers/ci-cd/builds/`: „Settings → Builds → Connect“. Der
  Worker-Name im Dashboard muss dem `name` in der Wrangler-Konfiguration entsprechen.
- `…/builds/configuration/`: Build- und Deploy-Command. Workers Builds erzeugt standardmäßig
  selbst ein API-Token. Vorgegebene Variablen sind `WORKERS_CI=1`, `WORKERS_CI_COMMIT_SHA`,
  `WORKERS_CI_BRANCH` und `WORKERS_CI_BUILD_UUID`.
- `…/builds/build-image/`: Standard ist Node 24, `NODE_VERSION` überschreibt es. Bun 1.4.4 ist
  dabei, git und curl sind vorinstalliert, `SKIP_DEPENDENCY_INSTALL` schaltet die automatische
  Installation ab.
- `…/builds/build-branches/`: Branch control, „Enable Preview Builds“.

**Was das Cloudflare-Token tatsächlich braucht.** Geprüft in `tools/deploy-live.sh` und
`tools/worker-version.sh`: `wrangler deploy`, `wrangler rollback`, `GET …/settings` (Binding)
und `GET …/deployments` (aktive Version). Das Skript ruft D1 nie auf, **D1-Rechte sind also
nicht nötig**. Das von Workers Builds erzeugte Token enthält „Workers Scripts (edit)“ und
deckt damit alles ab.

**Erster Lauf.** Nach dem Verbinden einen beliebigen Merge nach `main` abwarten, oder unter
**Deployments → Builds** einen Build für `main` neu starten. Im Build-Protokoll sollte am Ende
`AUSLIEFERUNG OK` stehen.

### 2. Branch-Schutz für `main` in GitHub

Repository → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**:

1. Name `main`, **Enforcement status** „Active“, **Target branches** → „Include default branch“.
2. **Require a pull request before merging** einschalten (Anzahl Freigaben: 0 genügt).
3. **Require status checks to pass** einschalten → **Add checks** → `Prüfen` (aus Workflow
   „CI“; erscheint in der Auswahl, sobald CI einmal gelaufen ist).
   **Require branches to be up to date before merging** einschalten.
4. **Block force pushes** einschalten.

Danach landet auf `main` nur, was „Prüfen“ bestanden hat, und jeder Merge geht automatisch live.

### Optional: GitHub Actions als Notfallweg

Nur einrichten, wenn der Notfallweg „Deploy live“ in GitHub gewünscht ist. Repository →
**Settings** → **Environments** → **New environment** `production`:

- **Deployment branches:** nur `main`;
- **Environment secret** `CLOUDFLARE_API_TOKEN`: ein eigenes Account-Token mit
  „Account → Workers Scripts → Edit“, auf dieses Konto beschränkt;
- **Environment variable** `CLOUDFLARE_ACCOUNT_ID`;
- **Required reviewers** nicht nötig.

Wird das Token rotiert, muss es hier nachgetragen werden; der Normalweg ist davon nicht
betroffen.

## Prüfen, was live ist

- `curl -s https://www.nexifyai.de/.well-known/nexify-build.json`: die Felder `commit` und
  `build_id`.
- `node tools/deploy-pruefung.mjs smoke --commit=<erste 10 Zeichen des SHA>`.
- `tools/deploy-live.sh --verify-only` auf dem passenden Commit.

## Rückweg

Im Fehlerfall setzt das Deploy-Skript selbst auf die vorige Worker-Version zurück (siehe oben).
Von Hand gibt es diese Wege:

- **Dashboard (ohne Werkzeuge):** Workers & Pages → `nexfiy-ai-studio` → **Deployments** →
  frühere Version → **Rollback**.
- **Fehler dauerhaft beheben:** den verursachenden Merge per Revert-PR rückgängig machen. Nach dem
  Merge liefert Workers Builds den korrigierten Stand automatisch aus. Ein Rollback allein hält
  nur bis zum nächsten Merge.
- **Wrangler oder Server:** `tools/worker-version.sh rollback <VERSION_ID>`. Diesen Befehl oder
  `npx wrangler rollback --name nexfiy-ai-studio` mit Zugangsdaten ausführen. Die Versionen
  listet `npx wrangler deployments list --name nexfiy-ai-studio`.
- **GitHub Actions** (nur mit optionalem Environment): **Actions** → **Deploy live** → **Run
  workflow** von `main`, `ref` = vollständiger SHA des letzten guten main-Commits. Gebaut,
  geprüft und ausgeliefert wird dieser Stand, mit Smoke-Test und Auto-Rollback.

Ein Rollback setzt nur den Code zurück; D1-Daten und Secrets bleiben unverändert. Danach meldet
der Build-Stempel wieder den älteren Commit.
