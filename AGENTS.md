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
- Imported pages keep their content markup in their route and captured styles in `src/styles/captured.css` or `src/styles/pages/<page>.css`; shared NeXify navigation, footer and chat markup belongs in `src/components/site/NexifyShell.tsx` and its children so fixes propagate without duplicating the frame.
- Shared page behaviour (chat panel, header menus, scroll/footer shell attributes, film players) lives in `src/lib/imported-site.ts` so every imported route behaves the same; routes only wire its hooks into their JSX.
- The copy is independent of the live site: never write back to or link assets from the original domain; downloaded media lives in `public/site-assets/` and `public/glass/`.

- Brand films render only through `src/components/SiteFilm.tsx` with data from `src/lib/site-films.ts` and styles in `src/styles/site-film.css`, so every page shows identical players and a film is defined once.
- Playback rules live in `src/lib/media-policy.ts` and DOM wiring stays in `src/lib/imported-site.ts`; test the policy independently and keep media changes from rerendering page content.
- Shared visual refinements use semantic roles from `src/styles.css` and high-specificity rules in the relevant shared stylesheet; apply scroll glass to the existing header pseudo-element so captured layers do not double-paint it.
- ORACLE product advice uses a bounded public catalog in `oracle-products.ts`, a server-only AI Gateway call in `oracle.functions.ts`, and isolated state in `use-oracle-advice.ts`; never connect the public adviser to account data or MCP, and derive links from the catalog rather than model URLs.
