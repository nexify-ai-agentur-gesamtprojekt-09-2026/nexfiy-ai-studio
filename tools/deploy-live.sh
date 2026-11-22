#!/usr/bin/env bash
# 2026-11-22 03:20 (Europe/Berlin): Deploy der Live-Site auf den bestehenden Worker.
# Grund: `npm run build` erzeugt .output/server/wrangler.json ohne Zielname und ohne D1-Binding.
# Ohne Override entsteht ein neuer Worker "nexify-ai-agentur-gesamtprojekt-..." ohne DB.
# Nutzung: tools/deploy-live.sh [--dry-run]
set -euo pipefail
cd "$(dirname "$0")/.."

# 2026-11-22 13:04: Nur pruefen, nichts bauen/deployen.
if [ "${1:-}" = "--verify-only" ]; then
  want="$(git rev-parse --short=10 HEAD)"
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

npm run build
python3 - <<'PY'
import json
p = ".output/server/wrangler.json"
d = json.load(open(p))
d["name"] = "nexfiy-ai-studio"
d["d1_databases"] = [{
    "binding": "DB",
    "database_name": "nexify-main",
    "database_id": "2dbf4047-20ee-4a68-a258-26ee9eb100e4",
}]
json.dump(d, open(p, "w"), indent=2)
PY

set -a; . /etc/nexifyai/hermes.env; set +a

# 2026-11-22 04:05 (Europe/Berlin): Der Build-Stempel wird beim Deploy aus dem Quellstand erzeugt.
# Grund (gemessen): public/.well-known/nexify-build.json wurde von Hand gepflegt und blieb zwei Commits
# hinter HEAD zurueck -> G-205 (P0) meldete dauerhaft FAIL, obwohl der Seiteninhalt identisch war.
# Ein Stempel, der den Commit behauptet, muss von diesem Commit selbst erzeugt werden.
python3 - <<'PY'
import json, subprocess
from datetime import datetime
def git(*a):
    return subprocess.run(["git", *a], capture_output=True, text=True).stdout.strip()
now = datetime.now().astimezone().strftime("%Y-%m-%dT%H:%M:%S%:z")
# 2026-11-22 12:25 (Europe/Berlin), B-206: Der Stempel belegte bisher nur den Commit, nicht den
# Zustand des Arbeitsbaums. Ein Deploy mit uncommitteten Aenderungen war damit von einem
# sauberen Deploy nicht unterscheidbar ("Ob der Deploy den committeten oder den Arbeitsbaum-Stand
# gebaut hat, ist nicht belegt"). Ab hier steht beides im Artefakt: Commit UND dirty-Liste.
# Der Stempel selbst wird beim Schreiben veraendert und zaehlt deshalb nicht als Aenderung.
_dirty_raw = [l for l in git("status", "--porcelain").splitlines() if l.strip()]
_dirty = [l for l in _dirty_raw if "nexify-build.json" not in l]
stamp = {
    "domain": "www.nexifyai.de",
    "worktree_dirty": bool(_dirty),
    "worktree_dirty_files": len(_dirty),
    "worktree_dirty_sample": _dirty[:10],
    "source_repo": "nexifyai-dev/nexfiy-ai-studio",
    "source_path": "/opt/nexifyai/repos/nexfiy-ai-studio",
    "commit": git("rev-parse", "HEAD"),
    "commit_short": git("rev-parse", "--short=10", "HEAD"),
    "commit_subject": git("log", "-1", "--pretty=%s"),
    "build_id": "",
    "deployed_at": now,
    "host": "srv1243952",
    "served_by": "cloudflare worker nexfiy-ai-studio (.de)",
    "generated_at": now,
    "generator": "tools/deploy-live.sh",
    "worker_version": "",
}
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


cd .output/server
if [ "${1:-}" = "--dry-run" ]; then
  exec npx wrangler deploy --dry-run --config wrangler.json
fi
npx wrangler deploy --config wrangler.json

cd "$(dirname "$0")/.."
verify_live_stamp "$(git rev-parse --short=10 HEAD)"
