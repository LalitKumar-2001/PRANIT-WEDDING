# Project Structure

## Directory Layout

```
MissingPieceFramerInvitation/
├── config/
│   └── wedding.config.js       # Single source of truth for all personalisation
├── src/
│   ├── main.js                 # Entry point — wires all modules together
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Countdown.js    # Live countdown timer (exports initDateReveal)
│   │   │   └── MusicPlayer.js  # Floating background music player
│   │   ├── sections/
│   │   │   └── Events.js       # 3-D flip event cards + .ics download
│   │   └── layout/
│   │       ├── Navigation.js   # Active-section highlight via IntersectionObserver
│   │       └── Watermark.js    # Injects CSS to hide Framer "Buy Now" badge
│   ├── utils/
│   │   ├── animation.js        # Scroll-triggered [data-animate] → .is-visible
│   │   ├── scroll.js           # Smooth-scroll helpers
│   │   ├── config-loader.js    # Reads window.WEDDING_CONFIG (set by index.html)
│   │   ├── date.js             # Date formatting utilities
│   │   └── dom.js              # DOM query helpers + escapeHtml
│   └── styles/
│       └── main.css            # All custom CSS (card flip, gallery, animations,
│                               #   Things to Know override, date-reveal blend,
│                               #   countdown heading, presence text glow)
├── assets/
│   ├── fonts/                  # Local woff2 font files (referenced by index.html)
│   ├── images/
│   │   ├── background/         # Full-page background PNGs
│   │   │   └── 2dFaPNHiZWIx3VvP26NqORM2vMY.png  # Floral bg for Section 3
│   │   ├── couple/             # Couple photo gallery (Image-1..7.jpeg)
│   │   ├── elements/           # Decorative icons and logos
│   │   └── frame/              # Ornamental frame overlays
│   ├── js/                     # Framer compiled .mjs bundles — DO NOT EDIT
│   └── media/
│       └── background_music.mp3
├── index.html                  # Framer SSR output — DO NOT EDIT MANUALLY
├── package.json
└── README.md
```

## Core Components and Relationships

```
main.js
  ├── getConfig()            ← config-loader.js reads window.WEDDING_CONFIG
  ├── initOptimizedImages()  ← inline MutationObserver for image src swaps
  ├── initWatermark()        ← layout/Watermark.js
  ├── initSmoothScroll()     ← utils/scroll.js
  ├── initScrollAnimations() ← utils/animation.js
  ├── initNavigation()       ← layout/Navigation.js
  ├── initCountdownHeading() ← inline — injects "Countdown Begins..." into .framer-jcebrp
  ├── initPresenceText()     ← inline — injects glowing text into .framer-1rq20ml
  ├── initDateReveal()       ← ui/Countdown.js
  ├── initMusicPlayer()      ← ui/MusicPlayer.js (guarded by config.musicUrl)
  └── initEventCards()       ← sections/Events.js (guarded by config.eventCardBack)
```

## Key Section Identifiers (Framer class names)

| Class | Section |
|---|---|
| `.framer-jcebrp` | Things to Know — now shows floral bg image only |
| `.framer-1ytz0ta` | Inner content of Things to Know — hidden via CSS |
| `.framer-1vpz21r` | Section 3 wrapper — carries floral bg image (set by Framer JS) |
| `.framer-1rq20ml` | Footer lanterns / Names section — presence text injected here |
| `.framer-bju1kx` | Footer |
| `.framer-qkait7` | Countdown timer area in footer |

## Architectural Patterns

- **Framer + custom layer**: `index.html` and `assets/js/*.mjs` are Framer artefacts; all custom logic lives exclusively in `src/`.
- **Config-driven rendering**: `window.WEDDING_CONFIG` is injected into `index.html` by `apply-config.js`; `config-loader.js` reads it at runtime with a safe `?? {}` fallback.
- **Init-function module pattern**: every module exports a single `initXxx()` function; `main.js` calls them in order after `DOMContentLoaded`.
- **MutationObserver injection pattern**: for elements Framer re-renders at runtime (`.framer-jcebrp`, `.framer-1rq20ml`), content is injected via `MutationObserver` with a duplicate guard (`querySelector` check before appending).
- **CSS suppression of Framer content**: Framer JS re-renders cannot be stopped, so unwanted content is hidden with `display: none !important` and replaced visually using CSS `::before` pseudo-elements or injected DOM nodes.
- **IntersectionObserver for scroll effects**: both `Navigation.js` and `animation.js` use `IntersectionObserver` — no scroll-event listeners.
- **CSS-class toggling**: interactivity (active nav, visible animations, card flip) is driven by adding/removing CSS classes (`.is-active`, `.is-visible`, `.is-flipped`).
- **No build step for custom code**: `src/main.js` is loaded as `type="module"` directly from `index.html`; no bundler is needed.
