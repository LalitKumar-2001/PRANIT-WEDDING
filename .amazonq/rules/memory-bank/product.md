# Product Overview

## Purpose
A customisable Indian wedding invitation website built on top of a Framer SSR export. It layers hand-authored JavaScript/CSS enhancements over the static Framer output to add interactivity, personalisation, and event management features.

## Couple
- Groom: **Ankit** (son of Mrs. Mamata Sasmal & Mr. Ashok Sasmal)
- Bride: **Priti** (daughter of Mrs. Pritilaxmi Gupta & Mr. Om Prakash Gupta)

## Key Features
- **Live countdown timer** – ticks down to the wedding date (6th Dec 2026)
- **Background music player** – floating play/pause button with autoplay-policy handling
- **3-D flip event cards** – six ceremony cards that flip to reveal details + one-click `.ics` calendar download
- **Smooth scroll & scroll-triggered animations** – section-aware navigation highlight and entrance animations
- **Framer watermark suppression** – hides the "Buy Now" badge injected by Framer
- **Single config file** – all names, dates, venues, links, and card content live in `config/wedding.config.js`; run `node apply-config.js` to apply changes to `index.html`
- **Things to Know section** – replaced with a full-bleed floral background image; Framer-rendered inner content hidden via CSS; "Countdown Begins..." heading injected via JS
- **Presence text** – glowing golden "Awaiting your presence - Sasmal Family" text injected into the footer lanterns section
- **Runtime name correction** – all Framer-hardcoded swapped names corrected via `MutationObserver` at runtime

## Events (in display order)

| # | Event | Date | Venue | Time |
|---|-------|------|-------|------|
| 1 | Mehendi | Friday, 4th Dec 2026 | Sasmal Residence, Brahmana Sahi, Kataka | 3pm Onwards |
| 2 | Sangeet | Friday, 4th Dec 2026 | PritiPrakash Niwas, Khannagar, Kataka | 5pm Onwards |
| 3 | Haldi | Saturday, 5th Dec 2026 | Sasmal Residence, Brahmana Sahi, Kataka | 11am Onwards |
| 4 | Mangana Handi | Sunday, 6th Dec 2026 | Sasmal Residence, Brahmana Sahi, Kataka | 3pm Onwards |
| 5 | Baarat | Sunday, 6th Dec 2026 | Creative Convention, Balikuda, Kataka | 7pm Onwards |
| 6 | Reception | Wednesday, 9th Dec 2026 | Gandarpur Ground, Baranga, Kataka | 7pm Onwards |

## Known Framer Hardcoding Issues (all fixed at runtime)

| Location | Hardcoded value | Correct value | Fix |
|---|---|---|---|
| Hero top name (`framer-ti6z94`) | PRITI | ANKIT | `initCoupleNameDisplay()` |
| Hero bottom name (`framer-8cgar`) | ANKIT | PRITI | `initCoupleNameDisplay()` |
| Invite groom name (`framer-11ag0sw`) | Priti | Ankit | `initCoupleNameDisplay()` |
| Invite bride name (`framer-13k4cyv`) | Ankit | Priti | `initCoupleNameDisplay()` |
| Card 1 name (`framer-1xxttys`) | Engagement | Mehendi | `initRepurposedCards()` |
| Card 4 name (`framer-y390rh`) | Mehendi | Mangana Handi | `initRepurposedCards()` |
| Card 2 name (`framer-v371mv`) | Reception | Sangeet | `initRepurposedCards()` |
| Card 6 name (`framer-8j9rab`) | Mangana Handi | Reception | `initRepurposedCards()` |
| Card dates/venues/times | Various stale values | From config | `initEventFieldOverrides()` |
| "bride and groom" heading (`framer-ewzo4f`) | " bride and groom" | "groom and bride" | `initGroomAndBrideHeading()` |

## Target Users
- Couples (or their families) who purchased the Framer wedding invitation template and want to personalise it without touching Framer directly
- Developers customising or extending the invitation on behalf of a client

## Use Cases
- Personalise couple names, event dates/venues, family details, and social links
- Add/replace background music
- Swap couple photos and decorative assets
- Extend event card back-face content per ceremony
- Deploy as a static site (no server required — `npx serve .`)
