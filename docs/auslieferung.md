# Auslieferung von www.nexifyai.de

Die Seite läuft als Cloudflare Worker `nexfiy-ai-studio`. Ausgeliefert wird auf zwei Wegen, die
beide `tools/deploy-live.sh` verwenden und deshalb gleich prüfen:

- **GitHub Actions** (`.github/workflows/deploy-live.yml`, Name „Deploy live“): nur von Hand
  gestartet, jeder Lauf wartet auf die Freigabe des Inhabers.
- **Server** (`tools/deploy-live.sh` direkt): lädt die Zugangsdaten aus
  `/etc/nexifyai/hermes.env`.

Es gibt keine automatische Auslieferung bei Push oder Merge.

## Was ein Lauf tut

1. Checkout des gewählten Stands (`ref`, Standard `main`).
2. `bun install --frozen-lockfile`, `npm run lint`, `npx tsc --noEmit`, `npm test`.
3. `npm run build`, danach `npm test` erneut: jetzt laufen auch die Prüfungen der Build-Ausgabe
   (`src/test/build-ausgabe.test.ts`, `src/test/ssr-ausgabe.test.ts`, `src/lib/chat-bundle.test.ts`).
4. `tools/deploy-live.sh` mit `DEPLOY_SKIP_BUILD=1`: liefert genau das geprüfte `.output/` aus.
   Das Skript setzt Worker-Name `nexfiy-ai-studio`, das D1-Binding `DB` (`nexify-main`) und
   `keep_vars: true`, schreibt den Build-Stempel (`host: github-actions`, zusätzlich `run_url`)
   und ruft `wrangler deploy` (Version fest im Workflow) auf.
5. Prüfung über die Cloudflare-API, dass der Worker das Binding `DB` vom Typ `d1` trägt
   (`GET /accounts/<Konto>/workers/scripts/nexfiy-ai-studio/settings`, `result.bindings`).
6. Readback: `https://www.nexifyai.de/.well-known/nexify-build.json` muss den ausgelieferten
   Commit (`commit_short`) melden. Sonst schlägt der Lauf fehl.

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
2. `ref` wählen (Standard `main`), bei Bedarf `dry_run` anhaken → **Run workflow**.
3. Der Lauf steht auf „Waiting“. **Review deployments** → `production` anhaken →
   **Approve and deploy**. Ohne Freigabe läuft nichts; ein zweiter Lauf wartet, bis der erste
   fertig ist (`concurrency: deploy-live`).
4. Im Protokoll am Ende: `BINDING OK: DB (d1)` und `READBACK OK: live=<commit>`.

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
- Alternativ den Workflow mit dem vorigen guten Commit als `ref` erneut laufen lassen.

Ein Rollback setzt nur den Code zurück; D1-Daten und Secrets bleiben unverändert. Danach meldet
der Build-Stempel wieder den älteren Commit.
