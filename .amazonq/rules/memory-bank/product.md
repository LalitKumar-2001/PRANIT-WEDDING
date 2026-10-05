# Product Overview

## Purpose
A customisable Indian wedding invitation website built on top of a Framer SSR export. It layers hand-authored JavaScript/CSS enhancements over the static Framer output to add interactivity, personalisation, and event management features.

## Key Features
- **Live countdown timer** – ticks down to the wedding date in real time
- **Background music player** – floating play/pause button with autoplay-policy handling
- **3-D flip event cards** – six ceremony cards that flip to reveal details + one-click `.ics` calendar download
- **Smooth scroll & scroll-triggered animations** – section-aware navigation highlight and entrance animations
- **Framer watermark suppression** – hides the "Buy Now" badge injected by Framer
- **Single config file** – all names, dates, venues, links, and card content live in `config/wedding.config.js`; run `node apply-config.js` to apply changes to `index.html`

## Target Users
- Couples (or their families) who purchased the Framer wedding invitation template and want to personalise it without touching Framer directly
- Developers customising or extending the invitation on behalf of a client

## Use Cases
- Personalise couple names, event dates/venues, family details, and social links
- Add/replace background music
- Swap couple photos and decorative assets
- Extend event card back-face content per ceremony
- Deploy as a static site (no server required — `npx serve .`)
