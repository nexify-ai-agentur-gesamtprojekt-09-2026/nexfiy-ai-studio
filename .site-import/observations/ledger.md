# Observation ledger — https://nexifyai.cloud/ → / (copy, original untouched)

Viewports: desktop 1280x900, phone 390x844. Scroll container: window (document height 8072 desktop / ~13100 phone, equal in source and copy).

| Control                        | Layout            | Source behaviour                                                                  | Copy result                                          | Status                              |
| ------------------------------ | ----------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------- |
| Chat panel default             | desktop           | open (sticky aside), shell `is-open`                                              | same                                                 | pass                                |
| Chat panel default             | phone             | closed (`hidden`), floating mascot button bottom-right after hero CTA leaves view | same (318,772 56x56)                                 | pass                                |
| Panel minimize                 | both              | closes panel, shows "Ihr Projekt mit NeXify" launcher                             | same; launcher fixed at 1042,835 221x48 on desktop   | pass                                |
| Launcher                       | both              | opens panel, focuses message box                                                  | same                                                 | pass                                |
| Escape on open panel           | both              | closes panel                                                                      | same                                                 | pass                                |
| Hero CTA "Vorhaben schildern"  | both              | opens panel, focuses message box, URL unchanged                                   | same                                                 | pass                                |
| Final CTA "Vorhaben schildern" | both              | same as hero CTA                                                                  | wired identically                                    | pass (not separately screenshotted) |
| Hamburger menu                 | both              | opens navigation panel; Escape + "Menü schließen" close it                        | same                                                 | pass                                |
| Language picker                | both              | native select DE/NL/FR/EN                                                         | native select (capture had an always-open list)      | pass                                |
| Scrolled header                | both              | `data-scrolled=true` after ~40px → glass bar                                      | same                                                 | pass                                |
| Hero video                     | both              | autoplays muted, "Pausieren" label, pauses off-screen                             | same; currentTime 2.06 → 3.07                        | pass                                |
| Gallery video play/pause       | both              | "Abspielen" ↔ "Pausieren", one video at a time                                    | same; currentTime 1.47 → 2.48, pause holds           | pass                                |
| "Ton an"                       | desktop           | restarts with sound, label "Ton aus"                                              | implemented, not re-verified with audio              | unverified                          |
| Products megamenu              | wide desktop only | hidden at 1280 with chat open                                                     | wired (state + Escape), not observed at source width | unverified                          |
| Chat panel scroll offset       | desktop           | inner list starts scrolled by 52px                                                | starts at top                                        | minor gap                           |

Assets: /glass/linse*.svg downloaded from source into public/glass/. Chat launcher uses the same mascot image (md5 match with /brand/nexify-figur.png).
Screenshots: pair2_d_0.png, pair2_m_0.png, pair_m_menu_open.png (left = source, right = copy).

# Batch 2 — /leistungen, /kontakt, /teileklar, /teileklar/werkstatt, /teileklar/partner-werden

Same viewports. Page heights match the source on every page and layout (werkstatt was 137px too tall before the "Umkreis" dropdown fix).

| Control                                  | Pages                               | Source                                                                              | Copy                                                 | Status            |
| ---------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------- |
| Chat default state                       | NeXify pages                        | desktop open / phone closed                                                         | same                                                 | pass              |
| Chat default state                       | TEILEKLAR pages                     | closed on both, "TEILEKLAR Hilfe" launcher                                          | same (1075,836 desktop; 318,772 phone)               | pass              |
| Launcher / minimize / Escape             | all                                 | open + focus composer / close                                                       | same                                                 | pass              |
| Panel starting scroll                    | all                                 | NeXify pages open on load scrolled to latest entry; TEILEKLAR not                   | same                                                 | pass              |
| Hamburger menu + Escape                  | NeXify pages                        | open/close                                                                          | same                                                 | pass              |
| Phone menu links → new pages             | from /                              | Leistungen, Kontakt, TEILEKLAR entdecken, Werkstattprofile, Werkstattpartner werden | each opens the copied page with the correct headline | pass              |
| Self-links (logo, current nav item)      | all new pages                       | point to own path                                                                   | restored (importer had turned them into "#")         | pass              |
| Dropdowns (locale, "Bereich", "Umkreis") | all                                 | native selects                                                                      | native selects                                       | pass              |
| Contact / partner forms, workshop search | kontakt, partner-werden, werkstatt  | send to the original's backend                                                      | submit is stopped (no backend copied)                | blocked by design |
| "Begleitung starten" guide               | leistungen, kontakt, partner-werden | not observed                                                                        | unchanged copy                                       | unverified        |
| Header shop search (GET)                 | TEILEKLAR pages                     | not submitted on source                                                             | reloads same page with ?q=                           | unverified        |

Screenshots: v2_*.png (left = source, right = copy).
