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
- Imported pages keep content in their route and captured styles in `src/styles/captured.css` or `src/styles/pages/<page>.css`; NeXify and TEILEKLAR use the brand-aware `NexifyShell` and its children so frame, focus and resizing fixes propagate without duplication.
- Shared page behaviour (chat panel, header menus, scroll/footer shell attributes, film players) lives in `src/lib/imported-site.ts` so every imported route behaves the same; routes only wire its hooks into their JSX.
- The copy is independent of the live site: never write back to or link assets from the original domain; downloaded media lives in `public/site-assets/` and `public/glass/`.

- Brand films render only through `src/components/SiteFilm.tsx` with data from `src/lib/site-films.ts` and styles in `src/styles/site-film.css`, so every page shows identical players and a film is defined once.
- Playback rules live in `src/lib/media-policy.ts` and DOM wiring stays in `src/lib/imported-site.ts`; test the policy independently and keep media changes from rerendering page content.
- Shared visual refinements use semantic roles from `src/styles.css` and high-specificity rules in the relevant shared stylesheet; apply scroll glass to the existing header pseudo-element so captured layers do not double-paint it.
- ORACLE product advice uses a bounded public catalog in `oracle-products.ts`, a server-only AI Gateway call in `oracle.functions.ts`, and isolated state in `use-oracle-advice.ts`; never connect the public adviser to account data or MCP, and derive links from the catalog rather than model URLs.
- NeXify page/chat resizing uses `PageSplit` and the existing resizable-panel primitives, with viewport bounds in `page-split.ts`; library-managed sizing avoids rerendering page content while dragging.
- ORACLE retains the existing single transient page conversation and uses AI Elements for messages, scrolling and composing; short validated advice is delivered atomically via RPC rather than partially exposing unvalidated product selections.
- ORACLE formats replies through a static, restricted MessageResponse with semantic typography; model HTML, images and inline destinations are disabled so product links remain catalog-owned.
- TEILEKLAR help is public topic navigation plus an explicit contact-draft handoff, never an invented parts-matching AI or commerce backend.
- Shared imported CTAs and guides resolve fixed destinations centrally; unavailable commerce never displays fabricated loading/results or grants fitment.
- Tyre comparisons use pure nominal geometry tested against existing page examples; the view never grants legal approval or fitment.
- Captured and semantic light/dark surfaces use one document theme attribute, read after hydration to keep SSR stable.
- Load shell, adviser and film geometry through the root stylesheet; reserve CSS-based panel widths before hydration so the initial page never depends on delayed route JavaScript.
- Editorial hierarchy lives in root-loaded `site-typography.css` using global type, measure and spacing tokens across pages, tools, chat and StatusPage; informative expansions stay in each route and add no commercial or legal promises.
- Compact header geometry follows the website container, not viewport width; group fixed controls beside a shrinkable brand and retain equal glass-to-control insets while scrolling so chat resizing cannot overflow navigation.
- ProductOverview renders comparable product briefs from route-owned facts; keep current website capabilities, separately activated products and unapproved legal archives visibly distinct so presentation never implies access or contractual approval.
