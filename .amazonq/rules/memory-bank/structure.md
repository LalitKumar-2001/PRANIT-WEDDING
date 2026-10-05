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
│   │   │   ├── Countdown.js    # Live countdown timer
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
│   │   └── dom.js              # DOM query helpers
│   └── styles/
│       └── main.css            # All custom CSS (card flip, gallery, animations)
├── assets/
│   ├── fonts/                  # Local woff2 font files (referenced by index.html)
│   ├── images/
│   │   ├── background/         # Full-page background PNGs
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
  ├── getConfig()           ← config-loader.js reads window.WEDDING_CONFIG
  ├── initWatermark()       ← layout/Watermark.js
  ├── initSmoothScroll()    ← utils/scroll.js
  ├── initScrollAnimations()← utils/animation.js
  ├── initNavigation()      ← layout/Navigation.js
  ├── initCountdown()       ← ui/Countdown.js  (guarded by config.countdownDate)
  ├── initMusicPlayer()     ← ui/MusicPlayer.js (guarded by config.musicUrl)
  └── initEventCards()      ← sections/Events.js (guarded by config.eventCardBack)
```

## Architectural Patterns

- **Framer + custom layer**: `index.html` and `assets/js/*.mjs` are Framer artefacts; all custom logic lives exclusively in `src/`.
- **Config-driven rendering**: `window.WEDDING_CONFIG` is injected into `index.html` by `apply-config.js`; `config-loader.js` reads it at runtime with a safe `?? {}` fallback.
- **Init-function module pattern**: every module exports a single `initXxx()` function; `main.js` calls them in order after `DOMContentLoaded`.
- **IntersectionObserver for scroll effects**: both `Navigation.js` and `animation.js` use `IntersectionObserver` — no scroll-event listeners.
- **CSS-class toggling**: interactivity (active nav, visible animations, card flip) is driven by adding/removing CSS classes (`.is-active`, `.is-visible`, `.is-flipped`).
- **No build step for custom code**: `src/main.js` is loaded as `type="module"` directly from `index.html`; no bundler is needed.
