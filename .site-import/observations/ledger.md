# Observation ledger — https://nexifyai.cloud/ → / (copy, original untouched)

Viewports: desktop 1280x900, phone 390x844. Scroll container: window (document height 8072 desktop / ~13100 phone, equal in source and copy).

| Control | Layout | Source behaviour | Copy result | Status |
|---|---|---|---|---|
| Chat panel default | desktop | open (sticky aside), shell `is-open` | same | pass |
| Chat panel default | phone | closed (`hidden`), floating mascot button bottom-right after hero CTA leaves view | same (318,772 56x56) | pass |
| Panel minimize | both | closes panel, shows "Ihr Projekt mit NeXify" launcher | same; launcher fixed at 1042,835 221x48 on desktop | pass |
| Launcher | both | opens panel, focuses message box | same | pass |
| Escape on open panel | both | closes panel | same | pass |
| Hero CTA "Vorhaben schildern" | both | opens panel, focuses message box, URL unchanged | same | pass |
| Final CTA "Vorhaben schildern" | both | same as hero CTA | wired identically | pass (not separately screenshotted) |
| Hamburger menu | both | opens navigation panel; Escape + "Menü schließen" close it | same | pass |
| Language picker | both | native select DE/NL/FR/EN | native select (capture had an always-open list) | pass |
| Scrolled header | both | `data-scrolled=true` after ~40px → glass bar | same | pass |
| Hero video | both | autoplays muted, "Pausieren" label, pauses off-screen | same; currentTime 2.06 → 3.07 | pass |
| Gallery video play/pause | both | "Abspielen" ↔ "Pausieren", one video at a time | same; currentTime 1.47 → 2.48, pause holds | pass |
| "Ton an" | desktop | restarts with sound, label "Ton aus" | implemented, not re-verified with audio | unverified |
| Products megamenu | wide desktop only | hidden at 1280 with chat open | wired (state + Escape), not observed at source width | unverified |
| Chat panel scroll offset | desktop | inner list starts scrolled by 52px | starts at top | minor gap |

Assets: /glass/linse*.svg downloaded from source into public/glass/. Chat launcher uses the same mascot image (md5 match with /brand/nexify-figur.png).
Screenshots: pair2_d_0.png, pair2_m_0.png, pair_m_menu_open.png (left = source, right = copy).
