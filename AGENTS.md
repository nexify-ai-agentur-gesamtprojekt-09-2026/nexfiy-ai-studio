<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.

<!-- LOVABLE:END -->

## Project rules

- Pages are imported copies of nexifyai.cloud: each page keeps its markup in its own route file and its original styles in `src/styles/captured.css` (home) or `src/styles/pages/<page>.css` (full captures under `.site-import/`), because edits elsewhere break the clone's cascade.
- Shared page behaviour (header menus, scroll/footer shell attributes, film players) lives in `src/lib/imported-site.ts` so every imported route behaves the same; routes only wire its hooks into their JSX.
- The public KI chat is one feature in its own files: UI `src/components/chat/` with styles `src/styles/site-chat.css` (own `nxc-` classes, never the imported `aifly-panel` rules), browser logic `src/lib/chat-client.ts` and `src/lib/chat-dock.ts`, server `src/lib/chat-api.ts` with guardrails `src/lib/chat-leitplanken.ts`. What the assistant may say is defined once in `src/lib/chat-wissen.server.ts` and must follow the page contents; that file is server-only (prompt and canary must never reach the browser bundle, checked by `src/lib/chat-bundle.test.ts`) — the browser gets page list and contact address from `src/lib/chat-seiten.ts`.
- The chat is OFF by default: `/api/chat` answers only when the Worker variable `CHAT_AKTIV` is exactly `an`, `1`, `true` or `on`, and the UI then shows "Der Assistent ist derzeit nicht verfügbar" with the way to `/kontakt`. Switch it on only after the owner has approved the legal texts (`/datenschutz`, `/ki-hinweise`) that describe the chat. It also needs the D1 binding `DB` with `migrations/0002-chat.sql` and `0003-chat-aufbewahrung.sql` applied, the secrets `NINEROUTER_API_KEY` and `CHAT_IP_SCHLUESSEL` (HMAC key for the IP short value, at least 16 characters, never rotate casually: limits and stored history are bound to it); without any of them it stays closed (503). No cron is configured: old chat rows are deleted while questions are being asked (default 30 days, `CHAT_AUFBEWAHRUNG_TAGE`, an owner decision), otherwise by hand as written in migration 0003.
- The copy is independent of the live site: never write back to or link assets from the original domain; downloaded media lives in `public/site-assets/` and `public/glass/`.

- Brand films render only through `src/components/SiteFilm.tsx` with data from `src/lib/site-films.ts` and styles in `src/styles/site-film.css`, so every page shows identical players and a film is defined once.
