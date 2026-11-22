#!/usr/bin/env bash
# 2026-11-22 03:20 (Europe/Berlin): Deploy der Live-Site auf den bestehenden Worker.
# Grund: `npm run build` erzeugt .output/server/wrangler.json ohne Zielname und ohne D1-Binding.
# Ohne Override entsteht ein neuer Worker "nexify-ai-agentur-gesamtprojekt-..." ohne DB.
# Nutzung: tools/deploy-live.sh [--dry-run]
set -euo pipefail
cd "$(dirname "$0")/.."

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
cd .output/server
if [ "${1:-}" = "--dry-run" ]; then
  exec npx wrangler deploy --dry-run --config wrangler.json
fi
npx wrangler deploy --config wrangler.json
