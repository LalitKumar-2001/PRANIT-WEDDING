# Framer Class → Text → Config Variable Mapping

## Section: Hero (Name reveal animation) — `framer-1if6ejn-container`

| Framer Class    | Rendered Text | Config Variable | Notes |
|-----------------|---------------|-----------------|-------|
| `framer-ti6z94` | `ANKIT`       | `name1`         | Hero top name (UPPERCASE) — Framer JS passes props swapped at call site; corrected at runtime by `initCoupleNameDisplay()` targeting `h3` inside wrapper |
| `framer-pw26en` | `WEDS`        | —               | Static label, not configurable |
| `framer-8cgar`  | `PRITI`       | `name2`         | Hero bottom name (UPPERCASE) — corrected at runtime by `initCoupleNameDisplay()` targeting `h3` inside wrapper |

> **Root cause documented:** `.mjs` call site passes `BGQVPX9uc: "ANKIT"` (bride slot) and `q_Mw9gntU: "PRITI"` (groom slot) — swapped. `initCoupleNameDisplay()` corrects this at runtime.

---

## Section: Invite Header (above event cards)

| Framer Class     | Rendered Text                                  | Config Variable    | Notes |
|------------------|------------------------------------------------|--------------------|-------|
| `framer-q8es40`  | `ॐ श्री गणेशाय नम`                            | `mantra`           | Mantra above couple names |
| `framer-3xglzy`  | `With the blessings of`                        | `groomBlessingOf`  | Blessing intro line |
| `framer-19djrwi` | `Chain Sasmal & Late Babaji Sasmal`            | `groomGrandparents`| Grandparents names |
| `framer-1k1fru6` | `——`                                           | —                  | Static divider |
| `framer-ximwwv`  | `Mrs. Pritilaxmi Gupta & Mr. Om Prakash Gupta` | `brideParents`     | Bride's parents (above divider) |
| `framer-vhbesf`  | `INVITE`                                       | —                  | Static label |
| `framer-1sgfkcc` | `You to join us in the wedding celebrations of`| `joinUsText`       | Invite sub-heading |
| `framer-13k4cyv` | `Priti` (bride)                                | `name2Display`     | Large script — bride name — corrected by `initCoupleNameDisplay()` |
| `framer-rtadh1`  | `&`                                            | —                  | Static ampersand |
| `framer-11ag0sw` | `Ankit` (groom)                                | `name1Display`     | Large script — groom name — corrected by `initCoupleNameDisplay()` |
| `framer-fsyar`   | `Daughter of`                                  | `brideRelation`    | Bride's relation label |
| `framer-10pnu1m` | `Mrs. Mamata Sasmal & Mr. Ashok Sasmal`        | `groomParents`     | Groom's parents (below divider) |
| `framer-12rhqe6` | `On the following events`                      | —                  | Static label |

> **Note:** `framer-igjlsv-container` wraps `framer-11ag0sw` (groom) and `framer-13k4cyv` (bride). Framer JS passes props swapped — corrected at runtime by `initCoupleNameDisplay()`.

---

## Section: "Meet the" heading

| Framer Class    | Rendered Text      | Config Variable | Notes |
|-----------------|--------------------|-----------------|-------|
| `framer-4wulps` | `meet the`         | —               | Static — desktop/tablet variant |
| `framer-ewzo4f` | `groom and bride`  | —               | Hardcoded as ` bride and groom` in .mjs; corrected at runtime by `initGroomAndBrideHeading()` |

---

## Section: Event Cards — Container → Event Name

| Container Class              | Displayed Name  | Framer Hardcoded (`b0Odmcs_Z`) | Order | How corrected |
|------------------------------|-----------------|-------------------------------|-------|---------------|
| `framer-1xxttys-container`   | Mehendi         | `"Engagement"`                | 1     | `initRepurposedCards()` |
| `framer-v371mv-container`    | Sangeet         | `"Reception"`                 | 2     | `initRepurposedCards()` |
| `framer-1mhegaa-container`   | Haldi           | `"Haldi"` ✅                  | 3     | No override needed |
| `framer-y390rh-container`    | Mangana Handi   | `"Mehendi"`                   | 4     | `initRepurposedCards()` |
| `framer-15hmep-container`    | Baarat          | `"Baarat"` ✅                 | 5     | No override needed |
| `framer-8j9rab-container`    | Reception       | `"Mangana Handi"`             | 6     | `initRepurposedCards()` |

### Event Card Fields (per card, driven by `initEventFieldOverrides()`)

| Framer Class     | Field   | Config Variable    | Notes |
|------------------|---------|--------------------|-------|
| `framer-d9o4fp`  | Name    | `events[n].event`  | Patched by `initRepurposedCards()` for 4 cards |
| `framer-inj5oz`  | Date    | `events[n].date`   | Patched by `initEventFieldOverrides()` |
| `framer-1lwecf7` | Venue   | `events[n].venue`  | Patched by `initEventFieldOverrides()` |
| `framer-g4ggot`  | Time    | `events[n].time`   | Patched by `initEventFieldOverrides()` |
| `framer-1hdt68x` | Map link| `events[n].mapsLink`| href on "See the route" anchor |
| *(back face)*    | Title + lines | `eventCardBack[event]` | Injected by `Events.js` on flip |

---

## Section: Couple's Message

| Framer Class    | Rendered Text           | Config Variable  | Notes |
|-----------------|-------------------------|------------------|-------|
| `framer-4wulps` | Couple's message        | `couplesMessage` | Desktop/tablet variant |
| `framer-ijl5j3` | Couple's message        | `couplesMessage` | Phone variant |

---

## Section: Maps / RSVP / Instagram CTAs

| Framer Class     | Rendered Text            | Config Variable    | Notes |
|------------------|--------------------------|--------------------|-------|
| `framer-78j2p3`  | `See the route`          | —                  | Static |
| `framer-gkvj1z`  | `Please rsvp`            | —                  | Static |
| `framer-1lynk1q` | `Follow the action`      | —                  | Static |
| `framer-cdl7V`   | *(button — no text)*     | `mapsCtaLink` / `whatsappRsvpLink` / `instagramCtaLink` | href on CTA anchors |
| `framer-gug0pj-container` | Maps CTA button | `mapsCtaLink`     | href patched by `initMapsCtaLink()` at runtime |

---

## Section: Music Player

| Framer Class              | Config Variable | Notes |
|---------------------------|-----------------|-------|
| `framer-2fmrhl-container` | `musicUrl`      | `<audio src>` driven by `initMusicPlayer()` |

---

## Summary: Config Variables → Framer Classes

| Config Variable    | Framer Class(es)                        | How Applied |
|--------------------|-----------------------------------------|-------------|
| `name1`            | `framer-ti6z94`                         | `initCoupleNameDisplay()` at runtime (targets `h3`) |
| `name2`            | `framer-8cgar`                          | `initCoupleNameDisplay()` at runtime (targets `h3`) |
| `name1Display`     | `framer-11ag0sw`                        | `initCoupleNameDisplay()` at runtime (targets `h3`) |
| `name2Display`     | `framer-13k4cyv`                        | `initCoupleNameDisplay()` at runtime (targets `h3`) |
| `mantra`           | `framer-q8es40`                         | `apply-config.js` (replaceAll) |
| `joinUsText`       | `framer-1sgfkcc`                        | `apply-config.js` (replaceAll) |
| `groomBlessingOf`  | `framer-3xglzy`                         | `apply-config.js` (replaceAll) |
| `groomGrandparents`| `framer-19djrwi`                        | `apply-config.js` (replaceAll) |
| `groomParents`     | `framer-10pnu1m`                        | `apply-config.js` (regex) |
| `brideParents`     | `framer-ximwwv`                         | `apply-config.js` (regex) |
| `brideRelation`    | `framer-fsyar`                          | `apply-config.js` (replaceAll) |
| `groomRelation`    | —                                       | ⚠️ no class in template |
| `couplesMessage`   | `framer-4wulps`, `framer-ijl5j3`        | `apply-config.js` (regex) |
| `mapsCtaLink`      | `framer-gug0pj-container` anchor        | `initMapsCtaLink()` at runtime |
| `whatsappRsvpLink` | RSVP button href                        | `apply-config.js` (replaceAll) |
| `instagramCtaLink` | Instagram button href                   | `apply-config.js` (replaceAll) |
| `musicUrl`         | `framer-2fmrhl-container` `<audio src>` | `initMusicPlayer()` at runtime |
| `countdownDate`    | countdown timer                         | `initDateReveal()` at runtime |
| `events[n].*`      | `framer-d9o4fp`, `framer-inj5oz`, etc.  | `initRepurposedCards()` + `initEventFieldOverrides()` at runtime |
| `eventCardBack`    | *(back face, injected)*                 | `initEventCards()` at runtime |
