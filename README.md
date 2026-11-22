# NeXify AI – Agenturseite

Quelltext der öffentlichen NeXify-Agenturseite www.nexifyai.de: TanStack Start (React, TypeScript),
ausgeliefert als Cloudflare Worker.

## Entwicklung

Voraussetzung: Node.js 22 und [bun](https://bun.sh) für die Installation (`bun.lock` ist das
Lockfile des Projekts).

```sh
bun install --frozen-lockfile
npm run dev      # Dev-Server auf Port 5173
npm run lint
npm test
npm run build    # erzeugt .output/ (Worker und statische Dateien)
```

## Auslieferung

`tools/deploy-live.sh` baut den Stand, ergänzt Worker-Name und Datenbank-Bindung, schreibt den
Build-Stempel und liefert auf den bestehenden Worker aus. `tools/deploy-live.sh --dry-run` prüft
ohne Auslieferung, `--verify-only` vergleicht den Live-Stempel mit dem aktuellen Commit.
Dieselbe Auslieferung läuft auch als GitHub-Actions-Workflow „Deploy live“ (nur von Hand, mit
Freigabe); Einrichtung, Ablauf und Rückweg stehen in [docs/auslieferung.md](docs/auslieferung.md).

`node tools/live-check.mjs` prüft die ausgelieferten Seiten (Status, canonical, H1,
Struktur-Anker, Kurzadressen); mit `--base=<Adresse>` auch gegen einen lokalen Stand.

Regeln für die Arbeit am Code stehen in [AGENTS.md](AGENTS.md).
