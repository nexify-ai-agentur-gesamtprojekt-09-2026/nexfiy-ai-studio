#!/usr/bin/env bash
# 2026-11-22 03:20 (Europe/Berlin): Deploy der Live-Site auf den bestehenden Worker.
# Grund: `npm run build` erzeugt .output/server/wrangler.json ohne Zielname und ohne D1-Binding.
# Ohne Override entsteht ein neuer Worker "nexify-ai-agentur-gesamtprojekt-..." ohne DB.
# Nutzung: tools/deploy-live.sh [--dry-run | --verify-only] [--skip-build]
#
# 2026-11-23 (Europe/Berlin): Ein Skript für alle drei Wege, damit jeder gleich prüft:
#   - Cloudflare Workers Builds (Normalfall: Merge nach main = live). Deploy-Command
#     `bash tools/deploy-live.sh --skip-build`. Erkennung über WORKERS_CI=1; Commit aus
#     WORKERS_CI_COMMIT_SHA, Token und Konto-ID stellt Cloudflare in der Umgebung bereit.
#   - GitHub Actions (.github/workflows/deploy-live.yml, nur von Hand: Notfall/Rückweg).
#   - Server (Notfall), Zugangsdaten aus /etc/nexifyai/hermes.env.
#   Ablauf: aktive Worker-Version als Rückweg-Anker festhalten (ohne Anker kein Deploy),
#   wrangler deploy, Binding DB prüfen, Readback des Stempels, Smoke-Test der Hauptpfade
#   (tools/deploy-pruefung.mjs). Schlägt etwas davon fehl: automatischer Rollback auf den Anker
#   (tools/worker-version.sh rollback), Exit 1. Ergebnis als kurze Tabelle im Protokoll, in
#   GitHub Actions zusätzlich in der Job-Zusammenfassung.
#
# 2026-11-22 (Europe/Berlin): Läuft auf dem Server und in GitHub Actions (.github/workflows/deploy-live.yml).
#   - Zugangsdaten: /etc/nexifyai/hermes.env wird geladen, wenn vorhanden (Server). Sonst müssen
#     CLOUDFLARE_API_TOKEN und CLOUDFLARE_ACCOUNT_ID in der Umgebung stehen (CI); fehlt eines, bricht
#     das Skript vor dem Deploy ab. --dry-run braucht keine Zugangsdaten.
#   - DEPLOY_HOST setzt das Stempelfeld "host" (Standard: Ausgabe von `hostname`).
#   - --skip-build oder DEPLOY_SKIP_BUILD=1 verwendet einen bereits gebauten und getesteten Stand in .output/,
#     statt neu zu bauen (CI: genau das geprüfte Artefakt wird ausgeliefert).
#   - DEPLOY_COMMIT (40 Zeichen), DEPLOY_COMMIT_SUBJECT, DEPLOY_WORKTREE_STATUS_FILE: Commit-Angaben
#     für Stempel und Readback, wenn DEPLOY_APP_DIR kein Git-Checkout ist (CI: nur das gebaute
#     .output/ als Artefakt). Ohne DEPLOY_COMMIT: WORKERS_CI_COMMIT_SHA (Workers Builds), sonst
#     wie bisher aus `git` im Anwendungsstand.
#   - DEPLOY_APP_DIR: Verzeichnis des auszuliefernden Anwendungsstands (CI); Standard: dieses Repo.
#   - WRANGLER_VERSION legt die Wrangler-Version fest; Standard 4.158.0 (auf allen Wegen gleich).
#   - Nach dem Deploy wird über die Cloudflare-API geprüft, dass der Worker das D1-Binding DB hat.
#
# Was dieses Skript NICHT tut (bewusst, damit ein Deploy nie Daten oder Zugänge verändert):
#   - keine D1-Migrationen anwenden (migrations/*.sql einzeln und von Hand, siehe docs/pwa-seo-geo.md)
#   - keine Variablen oder Secrets setzen (CHAT_AKTIV, SENDER_EMAIL, ANFRAGE_TO, NINEROUTER_API_KEY,
#     CHAT_IP_SCHLUESSEL … werden im Cloudflare-Dashboard oder mit `wrangler secret put` gepflegt)
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MODUS=""
for arg in "$@"; do
  case "$arg" in
    --dry-run|--verify-only) MODUS="$arg" ;;
    --skip-build) DEPLOY_SKIP_BUILD=1 ;;
    *) echo "FEHLER: unbekannte Option $arg (erlaubt: --dry-run, --verify-only, --skip-build)" >&2; exit 2 ;;
  esac
done
# 2026-11-22 (Europe/Berlin): DEPLOY_APP_DIR (optional) ist der Anwendungsstand, der gebaut und
# ausgeliefert wird. In CI liegt das Werkzeug (dieses Skript, aus dem Workflow-Commit) getrennt vom
# Anwendungsstand (festgelegter SHA, z. B. ein älterer main-Commit beim Rückweg). Ohne Angabe wie
# bisher: das Repository, in dem dieses Skript liegt.
if [ -n "${DEPLOY_APP_DIR:-}" ]; then
  ROOT_DIR="$(cd "$DEPLOY_APP_DIR" && pwd)"
else
  ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
fi
cd "$ROOT_DIR"
# Live-Adresse für Readback und Smoke-Test; nur die Tests setzen eine andere (lokaler Server).
LIVE_BASE="${LIVE_BASE:-https://www.nexifyai.de}"
export LIVE_BASE

# 2026-11-23 (Europe/Berlin): Commit, Betreff und Arbeitsbaum-Status für Stempel und Readback.
# Reihenfolge: DEPLOY_COMMIT (GitHub-Artefakt), WORKERS_CI_COMMIT_SHA (Workers Builds), git.
# git ist nur nötig, wenn keine der Variablen gesetzt ist.
hat_git() { command -v git >/dev/null 2>&1 && git -C "$ROOT_DIR" rev-parse --git-dir >/dev/null 2>&1; }
COMMIT="${DEPLOY_COMMIT:-${WORKERS_CI_COMMIT_SHA:-}}"
if [ -n "$COMMIT" ]; then
  if ! printf '%s' "$COMMIT" | grep -Eqx '[0-9a-f]{40}'; then
    echo "FEHLER: Commit (DEPLOY_COMMIT/WORKERS_CI_COMMIT_SHA) muss ein vollständiger 40-stelliger SHA sein." >&2
    exit 1
  fi
  # Workers Builds: der ausgecheckte Stand muss der gemeldete Commit sein.
  if [ -z "${DEPLOY_COMMIT:-}" ] && hat_git; then
    kopf="$(git -C "$ROOT_DIR" rev-parse HEAD)"
    if [ "$kopf" != "$COMMIT" ]; then
      echo "FEHLER: ausgecheckt ist $kopf, WORKERS_CI_COMMIT_SHA meldet $COMMIT; kein Deploy." >&2
      exit 1
    fi
  fi
elif hat_git; then
  COMMIT="$(git -C "$ROOT_DIR" rev-parse HEAD)"
else
  echo "FEHLER: kein Commit bekannt (weder DEPLOY_COMMIT, WORKERS_CI_COMMIT_SHA noch git)." >&2
  exit 1
fi
COMMIT_SHORT="${COMMIT:0:10}"
commit_short() { printf '%s\n' "$COMMIT_SHORT"; }
if [ -n "${DEPLOY_COMMIT_SUBJECT:-}" ] || [ -n "${DEPLOY_COMMIT:-}" ]; then
  COMMIT_SUBJECT="${DEPLOY_COMMIT_SUBJECT:-}"
elif hat_git; then
  COMMIT_SUBJECT="$(git -C "$ROOT_DIR" log -1 --format=%s "$COMMIT" 2>/dev/null || true)"
else
  COMMIT_SUBJECT=""
fi
if [ -n "${DEPLOY_WORKTREE_STATUS_FILE:-}" ]; then
  WORKTREE_STATUS="$(cat "$DEPLOY_WORKTREE_STATUS_FILE")"
elif hat_git; then
  WORKTREE_STATUS="$(git -C "$ROOT_DIR" status --porcelain)"
else
  WORKTREE_STATUS=""
fi
export STEMPEL_COMMIT="$COMMIT" STEMPEL_SUBJECT="$COMMIT_SUBJECT" STEMPEL_STATUS="$WORKTREE_STATUS"

# 2026-11-22 13:04: Nur pruefen, nichts bauen/deployen.
if [ "$MODUS" = "--verify-only" ]; then
  want="$(commit_short)"
  got="$(curl -sL --max-time 10 "$LIVE_BASE/.well-known/nexify-build.json" | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("commit_short",""))
except Exception: print("")' 2>/dev/null)"
  if [ "$got" = "$want" ]; then
    echo "READBACK OK: live=$got"
    curl -sL -o /dev/null -w 'Seite: HTTP %{http_code}, %{size_download} B\n' --max-time 15 "$LIVE_BASE"
    node "$SCRIPT_DIR/deploy-pruefung.mjs" smoke
    exit $?
  fi
  echo "READBACK FAIL: live=${got:-unbekannt} erwartet=$want" >&2
  exit 1
fi

if [ "${DEPLOY_SKIP_BUILD:-}" = "1" ]; then
  if [ ! -f .output/server/wrangler.json ]; then
    echo "FEHLER: DEPLOY_SKIP_BUILD=1, aber .output/server/wrangler.json fehlt (vorher npm run build)." >&2
    exit 1
  fi
  echo "Build übersprungen (DEPLOY_SKIP_BUILD=1): vorhandenes .output/ wird ausgeliefert."
else
  npm run build
fi
# 2026-11-22 (Europe/Berlin), Sicherheitsbefund PR #8: Die wrangler.json aus dem Build wird nicht
# ungefiltert verwendet. tools/wrangler-config.py übernimmt nur erlaubte Schlüssel (build.command u. a.
# werden verworfen und gemeldet), setzt Name, D1-Binding DB und keep_vars fest, verlangt Pfade
# innerhalb von .output/ und bricht bei .env*, .dev.vars*, .wrangler im Artefakt ab. Die Konfiguration
# liegt in einem frischen Verzeichnis außerhalb des Artefakts; Wrangler läuft auch dort.
WRANGLER_DIR="$(mktemp -d)"
trap 'rm -rf "$WRANGLER_DIR"' EXIT
python3 -I "$SCRIPT_DIR/wrangler-config.py" "$ROOT_DIR/.output" "$WRANGLER_DIR/wrangler.json"

# 2026-11-22 (Europe/Berlin): Server lädt seine Zugangsdaten aus hermes.env; in CI kommen sie aus
# der Umgebung (GitHub-Environment "production"). Fail-closed: ohne beide Werte kein Deploy.
# Die Werte werden nie ausgegeben.
HERMES_ENV="/etc/nexifyai/hermes.env"
if [ -f "$HERMES_ENV" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$HERMES_ENV"
  set +a
fi
if [ "$MODUS" != "--dry-run" ]; then
  fehlend=""
  [ -n "${CLOUDFLARE_API_TOKEN:-}" ] || fehlend="$fehlend CLOUDFLARE_API_TOKEN"
  [ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ] || fehlend="$fehlend CLOUDFLARE_ACCOUNT_ID"
  if [ -n "$fehlend" ]; then
    echo "FEHLER: Zugangsdaten fehlen:$fehlend. Weder $HERMES_ENV noch die Umgebung (Workers Builds, GitHub-Environment) liefern sie; kein Deploy." >&2
    exit 1
  fi
fi
if [ -z "${DEPLOY_HOST:-}" ] && [ "${WORKERS_CI:-}" = "1" ]; then
  DEPLOY_HOST="cloudflare-workers-builds"
fi
export DEPLOY_HOST="${DEPLOY_HOST:-$(hostname 2>/dev/null || uname -n)}"

# 2026-11-22 04:05 (Europe/Berlin): Der Build-Stempel wird beim Deploy aus dem Quellstand erzeugt.
# Grund (gemessen): public/.well-known/nexify-build.json wurde von Hand gepflegt und blieb zwei Commits
# hinter HEAD zurueck -> G-205 (P0) meldete dauerhaft FAIL, obwohl der Seiteninhalt identisch war.
# Ein Stempel, der den Commit behauptet, muss von diesem Commit selbst erzeugt werden.
python3 - <<'PY'
import json, os
from datetime import datetime
now = datetime.now().astimezone().strftime("%Y-%m-%dT%H:%M:%S%:z")
# 2026-11-22 12:25 (Europe/Berlin), B-206: Der Stempel belegt Commit UND Zustand des Arbeitsbaums
# (dirty-Liste); ein Deploy mit uncommitteten Aenderungen ist so von einem sauberen unterscheidbar.
# Der Stempel selbst wird beim Schreiben veraendert und zaehlt deshalb nicht als Aenderung.
# 2026-11-23 (Europe/Berlin): Commit, Betreff und Status kommen aus dem Shell-Teil oben
# (DEPLOY_COMMIT, WORKERS_CI_COMMIT_SHA oder git); hier wird kein git mehr aufgerufen.
_commit = os.environ["STEMPEL_COMMIT"]
_dirty_raw = [l for l in os.environ.get("STEMPEL_STATUS", "").splitlines() if l.strip()]
_dirty = [l for l in _dirty_raw if "nexify-build.json" not in l]
stamp = {
    "domain": "www.nexifyai.de",
    "worktree_dirty": bool(_dirty),
    "worktree_dirty_files": len(_dirty),
    "worktree_dirty_sample": _dirty[:10],
    # In GitHub Actions stehen hier Repository und Arbeitsverzeichnis des Laufs.
    "source_repo": os.environ.get("GITHUB_REPOSITORY") or "nexifyai-dev/nexfiy-ai-studio",
    "source_path": os.environ.get("DEPLOY_APP_DIR") or os.environ.get("GITHUB_WORKSPACE") or os.getcwd(),
    "commit": _commit,
    "commit_short": _commit[:10],
    "commit_subject": os.environ.get("STEMPEL_SUBJECT", ""),
    # Workers Builds: Kennung des Builds im Cloudflare-Dashboard.
    "build_id": os.environ.get("WORKERS_CI_BUILD_UUID", ""),
    "deployed_at": now,
    "host": os.environ["DEPLOY_HOST"],
    "served_by": "cloudflare worker nexfiy-ai-studio (.de)",
    "generated_at": now,
    "generator": "tools/deploy-live.sh",
    "worker_version": "",
}
# 2026-11-22 (Europe/Berlin): Läuft der Deploy in GitHub Actions, verweist der Stempel auf den Lauf.
if os.environ.get("GITHUB_RUN_ID"):
    stamp["run_url"] = "{}/{}/actions/runs/{}".format(
        os.environ.get("GITHUB_SERVER_URL", "https://github.com"),
        os.environ.get("GITHUB_REPOSITORY", ""),
        os.environ["GITHUB_RUN_ID"],
    )
with open(".output/public/.well-known/nexify-build.json", "w", encoding="utf-8") as fh:
    json.dump(stamp, fh, indent=2, ensure_ascii=False)
print("Stempel:", stamp["commit_short"], stamp["deployed_at"])
PY


# 2026-11-22 13:02 (Europe/Berlin): Nach dem Deploy wird der Live-Stempel gegen den
# gerade gebauten Commit geprueft. Ein Deploy ohne Readback ist nur eine Behauptung.
verify_live_stamp() {
  local want="$1" url="$LIVE_BASE/.well-known/nexify-build.json" got
  for _ in 1 2 3 4 5 6; do
    got="$(curl -sL --max-time 10 "$url" | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("commit_short",""))
except Exception: print("")' 2>/dev/null)"
    if [ "$got" = "$want" ]; then
      echo "READBACK OK: live=$got"
      curl -sL -o /dev/null -w 'Seite: HTTP %{http_code}, %{size_download} B\n' --max-time 15 "$LIVE_BASE"
      return 0
    fi
    sleep 3
  done
  echo "READBACK FAIL: live=${got:-unbekannt} erwartet=$want" >&2
  return 1
}

# 2026-11-22 (Europe/Berlin): Nach dem Deploy muss der Worker das D1-Binding DB tragen.
# Beleg über die Cloudflare-API (GET .../workers/scripts/<name>/settings, result.bindings).
# Der Token geht über stdin an curl (-H @-), damit er nicht in der Prozessliste steht.
verify_d1_binding() {
  local url="https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/workers/scripts/nexfiy-ai-studio/settings"
  local antwort
  if ! antwort="$(printf 'Authorization: Bearer %s\n' "$CLOUDFLARE_API_TOKEN" \
      | curl -sS --max-time 20 -H @- "$url")"; then
    echo "BINDING FAIL: Cloudflare-API nicht erreichbar" >&2
    return 1
  fi
  printf '%s' "$antwort" | python3 -c 'import json,sys
try:
    d = json.load(sys.stdin)
except Exception:
    print("BINDING FAIL: Antwort der Cloudflare-API ist kein JSON", file=sys.stderr); sys.exit(1)
if not d.get("success"):
    codes = [e.get("code") for e in d.get("errors") or []]
    print("BINDING FAIL: Cloudflare-API meldet Fehler %s" % codes, file=sys.stderr); sys.exit(1)
b = (d.get("result") or {}).get("bindings") or []
if any(x.get("name") == "DB" and x.get("type") == "d1" for x in b):
    print("BINDING OK: DB (d1)")
else:
    print("BINDING FAIL: kein Binding name=DB,type=d1; vorhanden: %s" % sorted((x.get("name"), x.get("type")) for x in b), file=sys.stderr); sys.exit(1)'
}

# 2026-11-23 (Europe/Berlin): Wrangler-Version auf allen Wegen fest (npm, veröffentlicht 2026-11-05).
WRANGLER_VERSION="${WRANGLER_VERSION:-4.158.0}"
export WRANGLER_VERSION
WRANGLER=(npx --yes "wrangler@${WRANGLER_VERSION}")

cd "$WRANGLER_DIR"
if [ "$MODUS" = "--dry-run" ]; then
  "${WRANGLER[@]}" deploy --dry-run --config "$WRANGLER_DIR/wrangler.json"
  exit $?
fi

# 2026-11-23 (Europe/Berlin): Rückweg-Anker. Ohne bekannte aktive Version kein Deploy
# (fail-closed): ein fehlerhafter Stand ließe sich sonst nicht automatisch zurücknehmen.
if ! VORHER="$("$SCRIPT_DIR/worker-version.sh" aktiv)"; then
  echo "FEHLER: aktive Worker-Version nicht lesbar; ohne Rückweg-Anker kein Deploy." >&2
  exit 1
fi
echo "Aktiv vor dem Deploy: $VORHER"

ERG_DEPLOY=fehler; ERG_BINDING=-; ERG_READBACK=-; ERG_SMOKE=-
ERG_ROLLBACK=-; ERG_SMOKE_ROLLBACK=-; NACHHER=""
SMOKE_MD="$WRANGLER_DIR/smoke.md"; SMOKE_RB_MD="$WRANGLER_DIR/smoke-rollback.md"

if "${WRANGLER[@]}" deploy --config "$WRANGLER_DIR/wrangler.json"; then
  ERG_DEPLOY=ok
  cd "$ROOT_DIR"
  if verify_d1_binding; then ERG_BINDING=ok; else ERG_BINDING=fehler; fi
  if verify_live_stamp "$(commit_short)"; then ERG_READBACK=ok; else ERG_READBACK=fehler; fi
  if node "$SCRIPT_DIR/deploy-pruefung.mjs" smoke --markdown > "$SMOKE_MD"; then
    ERG_SMOKE=ok
  else
    ERG_SMOKE=fehler
  fi
fi
cd "$ROOT_DIR"

if [ "$ERG_DEPLOY" = ok ] && [ "$ERG_BINDING" = ok ] && [ "$ERG_READBACK" = ok ] && [ "$ERG_SMOKE" = ok ]; then
  ERGEBNIS=ok
else
  ERGEBNIS=fehler
fi
NACHHER="$("$SCRIPT_DIR/worker-version.sh" aktiv 2>/dev/null || true)"
ENTSCHEIDUNG="$(node "$SCRIPT_DIR/deploy-pruefung.mjs" entscheidung \
  --vorher="$VORHER" --aktuell="$NACHHER" --ergebnis="$ERGEBNIS")"
if [ "$ENTSCHEIDUNG" = rollback ]; then
  echo "FEHLER: Auslieferung fehlgeschlagen; automatischer Rollback auf $VORHER." >&2
  if ROLLBACK_GRUND="Automatischer Rollback: Auslieferung von $COMMIT_SHORT fehlgeschlagen" \
      "$SCRIPT_DIR/worker-version.sh" rollback "$VORHER"; then
    ERG_ROLLBACK=ok
    if node "$SCRIPT_DIR/deploy-pruefung.mjs" smoke --markdown > "$SMOKE_RB_MD"; then
      ERG_SMOKE_ROLLBACK=ok
    else
      ERG_SMOKE_ROLLBACK=fehler
    fi
  else
    ERG_ROLLBACK=fehler
  fi
  NACHHER="$("$SCRIPT_DIR/worker-version.sh" aktiv 2>/dev/null || true)"
elif [ "$ENTSCHEIDUNG" = unmoeglich ]; then
  echo "FEHLER: Auslieferung fehlgeschlagen und kein Rückweg-Anker; Rollback von Hand (docs/auslieferung.md)." >&2
fi

# Kurze Tabelle statt seitenlanger Protokolle; in GitHub Actions zusätzlich als Zusammenfassung.
zusammenfassung() {
  echo "## Auslieferung"
  echo ""
  echo "| Feld | Wert |"
  echo "| --- | --- |"
  echo "| Commit | \`$COMMIT\` |"
  echo "| Weg | \`$DEPLOY_HOST\` |"
  echo "| Worker-Version vorher | \`$VORHER\` |"
  echo "| Worker-Version nachher | \`${NACHHER:--}\` |"
  echo "| wrangler deploy | $ERG_DEPLOY |"
  echo "| Binding DB (d1) | $ERG_BINDING |"
  echo "| Readback Stempel | $ERG_READBACK |"
  echo "| Smoke-Test | $ERG_SMOKE |"
  echo "| Rollback-Entscheidung | $ENTSCHEIDUNG |"
  echo "| Rollback | $ERG_ROLLBACK |"
  echo "| Smoke-Test nach Rollback | $ERG_SMOKE_ROLLBACK |"
  if [ -s "$SMOKE_MD" ]; then echo ""; echo "### Smoke-Test"; echo ""; cat "$SMOKE_MD"; fi
  if [ -s "$SMOKE_RB_MD" ]; then echo ""; echo "### Smoke-Test nach Rollback"; echo ""; cat "$SMOKE_RB_MD"; fi
}
echo ""
zusammenfassung
if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then zusammenfassung >> "$GITHUB_STEP_SUMMARY"; fi
if [ -n "${GITHUB_OUTPUT:-}" ]; then
  {
    echo "vorher=$VORHER"
    echo "nachher=$NACHHER"
    echo "ergebnis=$ERGEBNIS"
    echo "entscheidung=$ENTSCHEIDUNG"
    echo "rollback=$ERG_ROLLBACK"
  } >> "$GITHUB_OUTPUT"
fi
if [ "$ERGEBNIS" = ok ]; then
  echo "AUSLIEFERUNG OK: $COMMIT_SHORT live als ${NACHHER:-unbekannt}"
  exit 0
fi
echo "AUSLIEFERUNG FEHLGESCHLAGEN: Rollback=$ERG_ROLLBACK (Entscheidung $ENTSCHEIDUNG)" >&2
exit 1
