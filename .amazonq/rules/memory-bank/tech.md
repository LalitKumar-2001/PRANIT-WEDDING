# Technology Stack

## Languages
- **JavaScript (ES2020+)** — all custom source in `src/`; uses ES modules (`import`/`export`), optional chaining (`?.`), nullish coalescing (`??`), `async/await`
- **CSS3** — `src/styles/main.css`; uses custom properties, `@keyframes`, 3-D transforms (`perspective`, `rotateY`), `IntersectionObserver`-triggered transitions, `backdrop-filter`
- **HTML5** — `index.html` is Framer SSR output; `src/main.js` loaded via `<script type="module">`

## Runtime Environment
- Browser-only static site — no Node.js runtime at serve time
- `window.WEDDING_CONFIG` global injected into `index.html` by `apply-config.js` at build/config time

## Build & Tooling

| Tool | Purpose |
|---|---|
| `npx serve .` | Local static file server on port 3000 |
| `node apply-config.js` | Patches `index.html` + `.mjs` bundles with values from `config/wedding.config.js` |
| Framer (external) | Generated `index.html` + `assets/js/*.mjs` bundles |

## Dependencies
```json
{
  "devDependencies": {
    "serve": "^14.2.3"
  }
}
```
No runtime npm dependencies — the browser loads Framer's pre-built `.mjs` bundles directly.

## Development Commands
```bash
npm install          # install serve (dev only)
npm run dev          # serve at http://localhost:3000
node apply-config.js # apply wedding.config.js → index.html + .mjs bundles
```

## apply-config.js Patches

`apply-config.js` performs two categories of patches:

### 1. `index.html` patches (SSR text nodes + hrefs)
- Injects `window.WEDDING_CONFIG` script tag before `src/main.js`
- Replaces hardcoded SSR text for: hero names, mantra, blessing text, grandparents, parents, bride/groom relation, joinUsText, couple names (display), couples message
- Replaces hrefs for: maps CTA, WhatsApp RSVP, Instagram CTA

### 2. `.mjs` bundle patches (React props)
- `SwyWMQuoO` prop → `groomParents` (framer-FqwEu component)
- `PF8ftF8Ur` + `sKFuJb5xa` props → `brideParents` + `brideRelation` (framer-nva0a component)

> **Note:** Many props in the `.mjs` bundles are hardcoded and swapped — these cannot be patched by `apply-config.js` and are instead corrected at runtime by `MutationObserver` functions in `main.js`.

## Browser APIs Used
- `IntersectionObserver` — scroll animations and active nav detection
- `MutationObserver` — image src swaps, runtime DOM injection and text correction for all Framer-hardcoded content
- `Web Audio / HTMLAudioElement` — background music player
- `Blob` + `URL.createObjectURL` — `.ics` calendar file download
- `document.createElement('style')` — dynamic CSS injection (Watermark)
- ES Module `import` — native browser module loading (no bundler)

## Key Runtime Init Order (main.js)

```
DOMContentLoaded
  1. initOptimizedImages()        — MutationObserver on images
  2. initSmoothScroll()
  3. initScrollAnimations()
  4. initNavigation()
  5. initCountdownHeading()       — MutationObserver inject into .framer-jcebrp
  6. initPresenceText()           — MutationObserver inject into .framer-1rq20ml
  7. initGroomAndBrideHeading()   — MutationObserver override .framer-ewzo4f
  8. initCoupleNameDisplay()      — MutationObserver fix hero + invite name swaps
  9. initRepurposedCards()        — MutationObserver fix 4 event card name swaps
 10. initMapsCtaLink()            — MutationObserver patch maps CTA href
 11. initEventFieldOverrides()    — MutationObserver patch date/venue/time on all cards
 12. initDateReveal()             — countdown timer
 13. initMusicPlayer()            — music player (guarded)
 14. initEventCards()             — flip cards + back face (guarded)
```
