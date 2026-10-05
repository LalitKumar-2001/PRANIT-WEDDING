# Technology Stack

## Languages
- **JavaScript (ES2020+)** — all custom source in `src/`; uses ES modules (`import`/`export`), optional chaining (`?.`), nullish coalescing (`??`), `async/await`
- **CSS3** — `src/styles/main.css`; uses custom properties, `@keyframes`, 3-D transforms (`perspective`, `rotateY`), `IntersectionObserver`-triggered transitions
- **HTML5** — `index.html` is Framer SSR output; `src/main.js` loaded via `<script type="module">`

## Runtime Environment
- Browser-only static site — no Node.js runtime at serve time
- `window.WEDDING_CONFIG` global injected into `index.html` by `apply-config.js` at build/config time

## Build & Tooling
| Tool | Purpose |
|---|---|
| `npx serve .` | Local static file server on port 3000 |
| `node apply-config.js` | Patches `index.html` with values from `config/wedding.config.js` |
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
node apply-config.js # apply wedding.config.js → index.html
```

## Browser APIs Used
- `IntersectionObserver` — scroll animations and active nav detection
- `Web Audio / HTMLAudioElement` — background music player
- `Blob` + `URL.createObjectURL` — `.ics` calendar file download
- `document.createElement('style')` — dynamic CSS injection (Watermark)
- ES Module `import` — native browser module loading (no bundler)
