#!/usr/bin/env bash
# 2026-11-23 (Europe/Berlin): Worker-Versionen für die automatische Auslieferung
# (.github/workflows/deploy-live.yml). Nutzung:
#   tools/worker-version.sh aktiv            gibt die aktive Version-ID des Workers aus
#   tools/worker-version.sh rollback <ID>    setzt den Worker auf Version <ID> zurück
#                                            (wrangler rollback) und prüft danach, dass <ID>
#                                            aktiv ist
# Braucht CLOUDFLARE_API_TOKEN und CLOUDFLARE_ACCOUNT_ID in der Umgebung (Server: aus
# /etc/nexifyai/hermes.env). Rechte: Workers Scripts Edit (bzw. Worker-Rolle Editor) genügt für
# Lesen der Deployments und für den Rollback. Der Token geht über stdin an curl (-H @-), damit er
# nicht in der Prozessliste steht, und wird nie ausgegeben. D1-Daten und Secrets ändert ein
# Rollback nicht; er setzt nur den Code der Worker-Version zurück.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKER="nexfiy-ai-studio"

HERMES_ENV="/etc/nexifyai/hermes.env"
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && [ -f "$HERMES_ENV" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$HERMES_ENV"
  set +a
fi
fehlend=""
[ -n "${CLOUDFLARE_API_TOKEN:-}" ] || fehlend="$fehlend CLOUDFLARE_API_TOKEN"
[ -n "${CLOUDFLARE_ACCOUNT_ID:-}" ] || fehlend="$fehlend CLOUDFLARE_ACCOUNT_ID"
if [ -n "$fehlend" ]; then
  echo "FEHLER: Zugangsdaten fehlen:$fehlend." >&2
  exit 1
fi

aktiv() {
  local url="https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/workers/scripts/${WORKER}/deployments"
  local antwort
  if ! antwort="$(printf 'Authorization: Bearer %s\n' "$CLOUDFLARE_API_TOKEN" \
      | curl -sS --max-time 20 -H @- "$url")"; then
    echo "VERSION FAIL: Cloudflare-API nicht erreichbar" >&2
    return 1
  fi
  printf '%s' "$antwort" | node "$SCRIPT_DIR/deploy-pruefung.mjs" aktive-version
}

case "${1:-}" in
  aktiv)
    aktiv
    ;;
  rollback)
    ziel="${2:-}"
    if ! printf '%s' "$ziel" | grep -Eqx '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'; then
      echo "FEHLER: rollback braucht eine Version-ID (UUID)." >&2
      exit 2
    fi
    if [ -n "${WRANGLER_VERSION:-}" ]; then
      WRANGLER=(npx --yes "wrangler@${WRANGLER_VERSION}")
    else
      WRANGLER=(npx wrangler)
    fi
    # Wrangler läuft in einem leeren Verzeichnis: keine Projekt-Konfiguration, keine .env.
    leer="$(mktemp -d)"
    trap 'rm -rf "$leer"' EXIT
    (cd "$leer" && "${WRANGLER[@]}" rollback "$ziel" --name "$WORKER" \
      --message "${ROLLBACK_GRUND:-Automatischer Rollback nach fehlgeschlagener Auslieferung}" --yes)
    for _ in 1 2 3 4 5; do
      ist="$(aktiv || true)"
      if [ "$ist" = "$ziel" ]; then
        echo "ROLLBACK OK: aktiv=$ist"
        exit 0
      fi
      sleep 3
    done
    echo "ROLLBACK FAIL: aktiv=${ist:-unbekannt} erwartet=$ziel" >&2
    exit 1
    ;;
  *)
    echo "Nutzung: $0 aktiv | rollback <VERSION_ID>" >&2
    exit 2
    ;;
esac
