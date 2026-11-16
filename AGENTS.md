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
- App installation uses the existing manifest and one root-level PwaInstallProvider to retain the browser's single-use prompt across routes; shared footer bars offer device-specific fallbacks without adding offline caching or service workers.
- External design skills remain review aids with pinned source provenance and explicit web applicability; import documentation only and preserve the approved design system so native-platform guidance cannot silently replace application architecture or branding.
- Glass uses shared semantic material/filter roles for navigation, reading surfaces and menus; accessibility fallbacks override those roles without changing geometry, and header controls do not stack blur over the header's existing glass layer.
- Inquiry validation and mail profiles remain pure shared rules; long drafts require visible review and explicit copy/open actions, never an assumed clipboard or delivery success.
- Auth input validation is field-specific and browser-local; provider failures remain form-level and never change hosted authentication settings.
- TEILEKLAR search helpers preserve the current query and prepare explicit contact or external-map links; guidance selectors remain brand-scoped and cannot imply booking, partner access or fitment.
- Engineering skills preserve uploaded source provenance and project/platform boundaries; their checklists cannot activate infrastructure or imply verified production operations.
- Brand tokens live only in `src/design-system/graphite/` (tokens.css, theme.css), imported before page styles; client brands override the same roles in their own token file so the library stays reusable across projects.
- The TEILEKLAR catalogue is a stepwise, cron-authenticated daily copy of the shop feed in `teileklar_products`; rows are archived only after a ≥95 % complete run and never deleted, so a partial feed cannot empty the shop.
- Catalogue areas derive from article names in `teileklar-areas.ts` (tested) because the supplier categories are wrong; the supplier value stays in `source_category` for traceability.
- Catalogue photos are copied into a private bucket by a stepwise mirror job and served only via `/api/public/shop/image?artikel=` for active articles; the workspace blocks public buckets and the site must not depend on supplier or old-shop hosts at runtime.
- Public inquiries are stored server-side with service-role writes and announced in Slack without e-mail or message text; reading them requires the `admin` role via `has_role`.
- The site is German-only: no language selector is shown until real translated routes exist, because a non-functional control reads as a defect.
- Managed AI calls fail closed: they bound waiting with `PUBLIC_AI_TIMEOUT_MS`, never auto-replay, and accept a result only if `isRequestedModel` confirms the reported response model, so a provider cannot silently substitute another model.
- Brand-film captions are timed cues in `site-films.ts`; served WebVTT files must equal `toWebVtt` output (tested) and render in the shared overlay, so captions and transcript never diverge and look identical in every browser.
- Catalogue variants are grouped in database views by a shared base name and recognised size suffix (`teileklar_base_name`); a representative is chosen by photo, stock, then price, and sizes are never guessed, so one article appears once with its real variants.
- Photo cutouts are separate WebP files bound to the current original path, created by `scripts/teileklar_cutout.py` and uploaded only through the admin-checked cutout route; originals stay untouched and a stale cutout is ignored.
- Brand-coloured text and indicators use `--signal-text`/`--ring`, never `--primary`, because the light primary falls below 4.5:1 on light surfaces.
- Copy reviews by external checklists or the managed model are suggestions that must quote existing page text and add no facts; changes are applied by hand after checking, and film captions always follow the recorded audio.
- Server 1 jobs (`ops/server1/`) authenticate with a server-generated token whose SHA-256 is the project secret `SERVER_WORKER_TOKEN_SHA256`; the token grants only cutout listing/upload and Slack alerts via `/api/public/jobs/server-alert`, so no app credential lives on the server.
- Public playback uses reviewed local cuts; originals remain as labelled stills. Website status joins the existing daily report, avoiding duplicate schedules and unverified success.
