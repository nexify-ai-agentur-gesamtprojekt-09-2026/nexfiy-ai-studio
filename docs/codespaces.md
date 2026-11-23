# GitHub Codespaces

Stand 23.11.2026. Konfiguration: `.devcontainer/devcontainer.json` (Node 22, Bun 1.4.4, Python 3.12 – dieselben Versionen wie die CI).

## Nutzung
Repo → **Code** → **Codespaces** → **Create codespace on main**. Danach im Terminal `npm run dev`; der Port wird automatisch weitergeleitet. Tests: `npm test`, Build: `npm run build`.

Aus dem Codespace wird **nicht** ausgeliefert. Live geht nur, was per PR nach `main` gemergt ist (`docs/auslieferung.md`).

## Prebuilds
`onCreateCommand` (Bun + `bun install`) und `updateContentCommand` (`bun install`) laufen im Prebuild; `postCreateCommand` wird bewusst nicht genutzt. Prebuild einrichten (einmalig, Inhaber, nur Repo-Einstellungen): Settings → Codespaces → **Set up prebuild** → Branch `main`, Konfiguration `.devcontainer/devcontainer.json`, Trigger „Bei Konfigurationsänderung“ (spart Actions-Minuten), Region Europa, 1 Prebuild-Version, Fehlerbenachrichtigung an den Inhaber.

## Kosten (Inhaberentscheidung)
Organisationen haben **kein** kostenloses Codespaces-Kontingent. Abgerechnet werden Rechenzeit (2 Kerne ≈ 0,18 USD/Std.) und Speicher (0,07 USD/GB-Monat); Prebuilds verbrauchen zusätzlich Actions-Minuten und Speicher. Vor dem Aktivieren für die Organisation: Billing → **Budgets and alerts** → Produktbudget „Codespaces“ mit **„Nutzung beenden, wenn Budgetgrenze erreicht ist“**, Leerlauf-Timeout 30 Min., Aufbewahrung beendeter Codespaces 7 Tage, nur Maschinentyp 2 Kerne erlauben.

Quellen: docs.github.com → Codespaces (Aktivieren für Organisationen, Kosten verwalten, Prebuilds, Dev-Container), abgerufen 23.11.2026.
