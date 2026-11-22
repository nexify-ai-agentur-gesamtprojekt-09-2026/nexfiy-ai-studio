#!/usr/bin/env bash
# 2026-11-22 03:20 (Europe/Berlin): Deploy der Live-Site auf den bestehenden Worker.
# Grund: `npm run build` erzeugt .output/server/wrangler.json ohne Zielname und ohne D1-Binding.
# Ohne Override entsteht ein neuer Worker "nexify-ai-agentur-gesamtprojekt-..." ohne DB.
# Nutzung: tools/deploy-live.sh [--dry-run]
#
# 2026-11-22 (Europe/Berlin): Läuft auf dem Server und in GitHub Actions (.github/workflows/deploy-live.yml).
#   - Zugangsdaten: /etc/nexifyai/hermes.env wird geladen, wenn vorhanden (Server). Sonst müssen
#     CLOUDFLARE_API_TOKEN und CLOUDFLARE_ACCOUNT_ID in der Umgebung stehen (CI); fehlt eines, bricht
#     das Skript vor dem Deploy ab. --dry-run braucht keine Zugangsdaten.
#   - DEPLOY_HOST setzt das Stempelfeld "host" (Standard: Ausgabe von `hostname`).
#   - DEPLOY_SKIP_BUILD=1 verwendet einen bereits gebauten und getesteten Stand in .output/,
#     statt neu zu bauen (CI: genau das geprüfte Artefakt wird ausgeliefert).
#   - DEPLOY_COMMIT (40 Zeichen), DEPLOY_COMMIT_SUBJECT, DEPLOY_WORKTREE_STATUS_FILE: Commit-Angaben
#     für Stempel und Readback, wenn DEPLOY_APP_DIR kein Git-Checkout ist (CI: nur das gebaute
#     .output/ als Artefakt). Ohne DEPLOY_COMMIT wie bisher aus `git` im Anwendungsstand.
#   - DEPLOY_APP_DIR: Verzeichnis des auszuliefernden Anwendungsstands (CI); Standard: dieses Repo.
#   - WRANGLER_VERSION legt die Wrangler-Version fest (CI); ohne Angabe wie bisher `npx wrangler`.
#   - Nach dem Deploy wird über die Cloudflare-API geprüft, dass der Worker das D1-Binding DB hat.
#
# Was dieses Skript NICHT tut (bewusst, damit ein Deploy nie Daten oder Zugänge verändert):
#   - keine D1-Migrationen anwenden (migrations/*.sql einzeln und von Hand, siehe docs/pwa-seo-geo.md)
#   - keine Variablen oder Secrets setzen (CHAT_AKTIV, SENDER_EMAIL, ANFRAGE_TO, NINEROUTER_API_KEY,
#     CHAT_IP_SCHLUESSEL … werden im Cloudflare-Dashboard oder mit `wrangler secret put` gepflegt)
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
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

# 2026-11-22 (Europe/Berlin): Kurz-Commit für Readback; aus DEPLOY_COMMIT, sonst aus git.
commit_short() {
  if [ -n "${DEPLOY_COMMIT:-}" ]; then
    printf '%s\n' "${DEPLOY_COMMIT:0:10}"
  else
    git rev-parse --short=10 HEAD
  fi
}
if [ -n "${DEPLOY_COMMIT:-}" ] && ! printf '%s' "$DEPLOY_COMMIT" | grep -Eqx '[0-9a-f]{40}'; then
  echo "FEHLER: DEPLOY_COMMIT muss ein vollständiger 40-stelliger SHA sein." >&2
  exit 1
fi

# 2026-11-22 13:04: Nur pruefen, nichts bauen/deployen.
if [ "${1:-}" = "--verify-only" ]; then
  want="$(commit_short)"
  got="$(curl -sL --max-time 10 https://www.nexifyai.de/.well-known/nexify-build.json | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("commit_short",""))
except Exception: print("")' 2>/dev/null)"
  if [ "$got" = "$want" ]; then
    echo "READBACK OK: live=$got"
    curl -sL -o /dev/null -w 'Seite: HTTP %{http_code}, %{size_download} B\n' --max-time 15 https://www.nexifyai.de
    exit 0
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
  set -a; . "$HERMES_ENV"; set +a
fi
if [ "${1:-}" != "--dry-run" ]; then
  fehlend=""
  [ -n "${CLOUDFLARE_API_TOKEN:-}" ] || fehlend="$fehlend CLOUDFLARE_API_TOKEN"
  [ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ] || fehlend="$fehlend CLOUDFLARE_ACCOUNT_ID"
  if [ -n "$fehlend" ]; then
    echo "FEHLER: Zugangsdaten fehlen:$fehlend. Weder $HERMES_ENV noch die Umgebung liefern sie; kein Deploy." >&2
    exit 1
  fi
fi
export DEPLOY_HOST="${DEPLOY_HOST:-$(hostname)}"

# 2026-11-22 04:05 (Europe/Berlin): Der Build-Stempel wird beim Deploy aus dem Quellstand erzeugt.
# Grund (gemessen): public/.well-known/nexify-build.json wurde von Hand gepflegt und blieb zwei Commits
# hinter HEAD zurueck -> G-205 (P0) meldete dauerhaft FAIL, obwohl der Seiteninhalt identisch war.
# Ein Stempel, der den Commit behauptet, muss von diesem Commit selbst erzeugt werden.
python3 - <<'PY'
import json, os, subprocess
from datetime import datetime
def git(*a):
    return subprocess.run(["git", *a], capture_output=True, text=True).stdout.strip()
now = datetime.now().astimezone().strftime("%Y-%m-%dT%H:%M:%S%:z")
# 2026-11-22 12:25 (Europe/Berlin), B-206: Der Stempel belegte bisher nur den Commit, nicht den
# Zustand des Arbeitsbaums. Ein Deploy mit uncommitteten Aenderungen war damit von einem
# sauberen Deploy nicht unterscheidbar ("Ob der Deploy den committeten oder den Arbeitsbaum-Stand
# gebaut hat, ist nicht belegt"). Ab hier steht beides im Artefakt: Commit UND dirty-Liste.
# Der Stempel selbst wird beim Schreiben veraendert und zaehlt deshalb nicht als Aenderung.
# 2026-11-22 (Europe/Berlin): Mit DEPLOY_COMMIT (CI-Artefakt) kommen Commit, Betreff und
# Arbeitsbaum-Status aus dem Build-Job statt aus einem Git-Checkout.
_commit = os.environ.get("DEPLOY_COMMIT", "")
if _commit:
    _status_file = os.environ.get("DEPLOY_WORKTREE_STATUS_FILE", "")
    _status = open(_status_file, encoding="utf-8").read() if _status_file else ""
else:
    _status = git("status", "--porcelain")
_dirty_raw = [l for l in _status.splitlines() if l.strip()]
_dirty = [l for l in _dirty_raw if "nexify-build.json" not in l]
stamp = {
    "domain": "www.nexifyai.de",
    "worktree_dirty": bool(_dirty),
    "worktree_dirty_files": len(_dirty),
    "worktree_dirty_sample": _dirty[:10],
    # In GitHub Actions stehen hier Repository und Arbeitsverzeichnis des Laufs.
    "source_repo": os.environ.get("GITHUB_REPOSITORY") or "nexifyai-dev/nexfiy-ai-studio",
    "source_path": os.environ.get("DEPLOY_APP_DIR") or os.environ.get("GITHUB_WORKSPACE") or "/opt/nexifyai/repos/nexfiy-ai-studio",
    "commit": _commit or git("rev-parse", "HEAD"),
    "commit_short": _commit[:10] if _commit else git("rev-parse", "--short=10", "HEAD"),
    "commit_subject": os.environ.get("DEPLOY_COMMIT_SUBJECT", "") if _commit else git("log", "-1", "--pretty=%s"),
    "build_id": "",
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
  local want="$1" url="https://www.nexifyai.de/.well-known/nexify-build.json" i got
  for i in 1 2 3 4 5 6; do
    got="$(curl -sL --max-time 10 "$url" | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("commit_short",""))
except Exception: print("")' 2>/dev/null)"
    if [ "$got" = "$want" ]; then
      echo "READBACK OK: live=$got"
      curl -sL -o /dev/null -w 'Seite: HTTP %{http_code}, %{size_download} B\n' --max-time 15 https://www.nexifyai.de
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

# 2026-11-22 (Europe/Berlin): Ohne WRANGLER_VERSION unverändert `npx wrangler`; CI pinnt die Version.
if [ -n "${WRANGLER_VERSION:-}" ]; then
  WRANGLER=(npx --yes "wrangler@${WRANGLER_VERSION}")
else
  WRANGLER=(npx wrangler)
fi

cd "$WRANGLER_DIR"
if [ "${1:-}" = "--dry-run" ]; then
  "${WRANGLER[@]}" deploy --dry-run --config "$WRANGLER_DIR/wrangler.json"
  exit $?
fi
"${WRANGLER[@]}" deploy --config "$WRANGLER_DIR/wrangler.json"

cd "$ROOT_DIR"
verify_d1_binding
verify_live_stamp "$(commit_short)"
