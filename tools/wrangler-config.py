#!/usr/bin/env python3
"""Schreibt die Wrangler-Konfiguration für die Auslieferung neu (Allowlist).

2026-11-22 (Europe/Berlin), Sicherheitsbefund PR #8: `.output/server/wrangler.json` entsteht im
Build und damit aus Repository-Code. Im CI liegt sie im Artefakt des Build-Jobs. Die sha256-Liste
schützt sie nur vor Veränderung zwischen Build- und Deploy-Job, nicht vor einem Build, der sie
absichtlich so erzeugt. Wrangler führt Teile der Konfiguration aus bzw. lässt sich darüber umlenken:

- `build.command` wird bei `wrangler deploy` in einer Shell ausgeführt
  (developers.cloudflare.com/workers/wrangler/custom-builds/: "This command will be run as part
  of `wrangler dev` and `npx wrangler deploy`").
- Eine `.env` im Projektverzeichnis setzt Systemvariablen wie `CLOUDFLARE_API_BASE_URL` oder
  `CLOUDFLARE_API_HEADERS` (developers.cloudflare.com/workers/wrangler/system-environment-variables/).
- `.wrangler/deploy/config.json` lenkt `wrangler deploy` auf eine andere Konfiguration um
  (developers.cloudflare.com/workers/wrangler/configuration/#generated-wrangler-configuration).

Deshalb: nur bekannte Schlüssel übernehmen (alle anderen verwerfen und melden), Name, D1-Binding
und keep_vars fest vorgeben, Pfade müssen innerhalb von `.output/` liegen, und das Ausgabe-
verzeichnis darf keine `.env*`, `.dev.vars*`, `.wrangler` oder weitere Wrangler-Konfigurationen
enthalten. Die neue Konfiguration wird in ein frisches Verzeichnis außerhalb des Artefakts
geschrieben; `main` und `assets.directory` zeigen dort als absolute Pfade auf das Artefakt.

Nutzung: wrangler-config.py <.output-Verzeichnis> <Zieldatei>
"""

import json
import os
import re
import sys

WORKER_NAME = "nexfiy-ai-studio"
D1 = [{
    "binding": "DB",
    "database_name": "nexify-main",
    "database_id": "2dbf4047-20ee-4a68-a258-26ee9eb100e4",
}]
TOP_ERLAUBT = {"name", "main", "compatibility_date", "compatibility_flags", "no_bundle", "rules", "assets"}
ASSETS_ERLAUBT = {"binding", "directory"}
RULE_ERLAUBT = {"type", "globs", "fallthrough"}
RULE_TYPEN = {"ESModule", "CommonJS", "CompiledWasm", "Text", "Data"}
VERBOTEN_DATEI = re.compile(r"^(\.env.*|\.dev\.vars.*|wrangler\.toml|wrangler\.jsonc)$")


class Abbruch(Exception):
    pass


def innerhalb(basis_real, config_dir, rel, art):
    if not isinstance(rel, str) or not rel:
        raise Abbruch(f"{art} fehlt oder ist kein Text")
    if os.path.isabs(rel):
        raise Abbruch(f"{art} ist ein absoluter Pfad: {rel}")
    ziel = os.path.realpath(os.path.join(config_dir, rel))
    if ziel != basis_real and not ziel.startswith(basis_real + os.sep):
        raise Abbruch(f"{art} zeigt aus dem Artefakt heraus: {rel}")
    return ziel


def pruefe_verzeichnis(basis):
    for wurzel, ordner, dateien in os.walk(basis):
        for name in ordner:
            pfad = os.path.join(wurzel, name)
            if name == ".wrangler":
                raise Abbruch(f"verbotenes Verzeichnis im Artefakt: {pfad}")
            if os.path.islink(pfad) and not os.path.realpath(pfad).startswith(basis + os.sep):
                raise Abbruch(f"symbolischer Link aus dem Artefakt heraus: {pfad}")
        for name in dateien:
            pfad = os.path.join(wurzel, name)
            if VERBOTEN_DATEI.match(name):
                raise Abbruch(f"verbotene Datei im Artefakt: {pfad}")
            if os.path.islink(pfad) and not os.path.realpath(pfad).startswith(basis + os.sep):
                raise Abbruch(f"symbolischer Link aus dem Artefakt heraus: {pfad}")


def neu_schreiben(output_dir, ziel):
    basis = os.path.realpath(output_dir)
    config_dir = os.path.join(basis, "server")
    with open(os.path.join(config_dir, "wrangler.json"), encoding="utf-8") as fh:
        ein = json.load(fh)
    if not isinstance(ein, dict):
        raise Abbruch("wrangler.json ist kein Objekt")
    pruefe_verzeichnis(basis)

    verworfen = sorted(k for k in ein if k not in TOP_ERLAUBT)
    for k in verworfen:
        print(f"WRANGLER-KONFIG: Schlüssel verworfen (nicht erlaubt): {k}", file=sys.stderr)

    aus = {"name": WORKER_NAME}
    if ein.get("name") not in (None, WORKER_NAME):
        print(f"WRANGLER-KONFIG: name {ein.get('name')!r} ersetzt durch {WORKER_NAME!r}", file=sys.stderr)

    main = innerhalb(basis, config_dir, ein.get("main"), "main")
    if not os.path.isfile(main):
        raise Abbruch(f"main existiert nicht: {ein.get('main')}")
    aus["main"] = main

    datum = ein.get("compatibility_date")
    if not isinstance(datum, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", datum):
        raise Abbruch("compatibility_date fehlt oder hat kein Datumsformat")
    aus["compatibility_date"] = datum

    flags = ein.get("compatibility_flags", [])
    if not isinstance(flags, list) or not all(isinstance(f, str) and re.fullmatch(r"[a-z0-9_]+", f) for f in flags):
        raise Abbruch("compatibility_flags ungültig")
    aus["compatibility_flags"] = flags

    # Ausgeliefert wird das fertige Bundle; Wrangler bündelt nicht neu.
    if ein.get("no_bundle") is not True:
        raise Abbruch("no_bundle muss true sein (vorgebautes Bundle)")
    aus["no_bundle"] = True

    regeln = []
    for r in ein.get("rules", []):
        if not isinstance(r, dict):
            raise Abbruch("rules enthält einen ungültigen Eintrag")
        for k in sorted(set(r) - RULE_ERLAUBT):
            print(f"WRANGLER-KONFIG: rules[].{k} verworfen (nicht erlaubt)", file=sys.stderr)
        if r.get("type") not in RULE_TYPEN:
            raise Abbruch(f"rules[].type ungültig: {r.get('type')!r}")
        globs = r.get("globs", [])
        if not isinstance(globs, list) or not all(isinstance(g, str) and ".." not in g and not g.startswith("/") for g in globs):
            raise Abbruch("rules[].globs ungültig")
        neu = {"type": r["type"], "globs": globs}
        if isinstance(r.get("fallthrough"), bool):
            neu["fallthrough"] = r["fallthrough"]
        regeln.append(neu)
    aus["rules"] = regeln

    assets = ein.get("assets")
    if assets is not None:
        if not isinstance(assets, dict):
            raise Abbruch("assets ist kein Objekt")
        for k in sorted(set(assets) - ASSETS_ERLAUBT):
            print(f"WRANGLER-KONFIG: assets.{k} verworfen (nicht erlaubt)", file=sys.stderr)
        verzeichnis = innerhalb(basis, config_dir, assets.get("directory"), "assets.directory")
        if not os.path.isdir(verzeichnis):
            raise Abbruch(f"assets.directory existiert nicht: {assets.get('directory')}")
        neu = {"directory": verzeichnis}
        if assets.get("binding") is not None:
            if not isinstance(assets["binding"], str) or not re.fullmatch(r"[A-Z_][A-Z0-9_]*", assets["binding"]):
                raise Abbruch("assets.binding ungültig")
            neu["binding"] = assets["binding"]
        aus["assets"] = neu

    aus["d1_databases"] = D1
    # Ohne keep_vars ersetzt `wrangler deploy` die im Dashboard gesetzten Klartext-Variablen
    # (developers.cloudflare.com/workers/wrangler/configuration/, "Top-level only keys": keep_vars).
    aus["keep_vars"] = True

    with open(ziel, "w", encoding="utf-8") as fh:
        json.dump(aus, fh, indent=2)
    print(f"WRANGLER-KONFIG: {ziel} geschrieben ({len(verworfen)} Schlüssel verworfen)")


def main(argv):
    if len(argv) != 3:
        print(__doc__.strip().splitlines()[-1], file=sys.stderr)
        return 2
    try:
        neu_schreiben(argv[1], argv[2])
    except Abbruch as e:
        print(f"WRANGLER-KONFIG FAIL: {e}", file=sys.stderr)
        return 1
    except (OSError, ValueError) as e:
        print(f"WRANGLER-KONFIG FAIL: {e}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
