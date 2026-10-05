# Development Guidelines

## Code Quality Standards

### Module Structure
Every source file follows the same shape:
1. A JSDoc file-level comment describing the module's responsibility
2. Named exports only — no default exports anywhere in `src/`
3. One public `initXxx()` function per component/section file; utilities export multiple named helpers

```js
/**
 * Module description.
 */
export function initXxx(param) { ... }
```

### Guard-and-return Pattern
Every `initXxx()` function queries its required DOM element first and returns early if absent. This prevents errors when Framer's HTML changes.

```js
export function initMusicPlayer(src) {
  const button = document.querySelector('.framer-2fmrhl-container');
  if (!button) return;
  // ...
}
```

### Named Constants for Magic Numbers
Time/math constants are extracted to named `const` at module scope:

```js
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;
const MS_PER_HOUR   = 3600000;
const MS_PER_DAY    = 86400000;
```

### JSDoc on Every Exported Function
All exported functions carry `@param` and `@returns` JSDoc:

```js
/**
 * Parse date strings like "9th Sep 2026".
 * @param {string} str - Date string
 * @returns {{day: number, month: number, year: number}|null}
 */
export function parseDate(str) { ... }
```

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Functions | camelCase verb-noun | `initEventCards`, `downloadCalendarFile`, `createBackFace` |
| CSS state classes | kebab-case with `is-` prefix | `.is-flipped`, `.is-active`, `.is-visible` |
| CSS component classes | `ecf-` prefix for hand-authored card elements | `.ecf-btn`, `.ecf-hint`, `.ecf-actions` |
| Config keys | camelCase | `countdownDate`, `eventCardBack`, `musicUrl` |
| Constants | SCREAMING_SNAKE_CASE | `MS_PER_DAY`, `MONTHS` |

---

## Architectural Patterns

### Config-Driven Initialisation
`main.js` guards every feature call with a config check:

```js
if (config.countdownDate) initCountdown(config.countdownDate);
if (config.musicUrl)      initMusicPlayer(config.musicUrl);
if (config.eventCardBack) initEventCards(config.eventCardBack, ...);
```
Never assume a config key exists — always guard or use `?? default`.

### CSS-Class State Machine
Interactivity is expressed entirely through CSS class toggles; no inline style mutations for state:

```js
card.classList.toggle('is-flipped');   // flip
link.classList.toggle('is-active', isActive); // nav highlight
e.target.classList.add('is-visible');  // scroll animation
```

### IntersectionObserver Over Scroll Events
Both scroll animations and active-nav detection use `IntersectionObserver`. Never add `scroll` event listeners for these purposes.

```js
const observer = new IntersectionObserver(callback, { threshold: 0.15 });
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### One-Time Event Listeners
Autoplay and similar one-shot interactions use `{ once: true }`:

```js
document.addEventListener('click', play, { once: true });
document.addEventListener('touchstart', play, { once: true });
```

### DOM Element Creation Pattern
New elements are built with `document.createElement` + `.innerHTML` for multi-child structures, then event listeners are attached via `querySelector` on the new element:

```js
const back = document.createElement('div');
back.className = 'event-card-back';
back.innerHTML = `<h3>${escapeHtml(info.title)}</h3>...`;
back.querySelector('.ecf-ics')?.addEventListener('click', handler);
```

### Blob Download Pattern
`.ics` file downloads use `Blob` + `URL.createObjectURL` with immediate revocation:

```js
const blob = new Blob([icsContent], { type: 'text/calendar' });
const link = Object.assign(document.createElement('a'), {
  href: URL.createObjectURL(blob),
  download: `${eventName}.ics`
});
link.click();
URL.revokeObjectURL(link.href);
```

---

## CSS Conventions

### Layer Separation
- Framer's CSS stays inline in `index.html` — never touch it
- All custom CSS lives in `src/styles/main.css`
- Framer class overrides use `!important` only when necessary to beat Framer's specificity

### CSS Custom Properties for Card Geometry
Card dimensions are centralised as custom properties and overridden per breakpoint:

```css
.ecf-front, .event-card-back {
  --w: 295px; --h: 377px; --r: 180px;
  width: var(--w); height: var(--h);
}
@media (max-width: 809.98px) {
  .ecf-front, .event-card-back { --w: 328px; --h: 431px; --r: 158px; }
}
```

### Responsive Breakpoints
| Breakpoint | Range |
|---|---|
| Phone | `max-width: 809.98px` |
| Tablet | `min-width: 810px` and `max-width: 1199.98px` |
| Desktop | `min-width: 1200px` (implicit) |

### Accessibility in CSS
Always include `:focus-visible` styles and `@media (prefers-reduced-motion: reduce)` overrides:

```css
.framer-eqI5A:focus-visible { outline: 2px solid rgba(255,255,255,0.9); }
@media (prefers-reduced-motion: reduce) {
  .framer-eqI5A { transition-duration: 0.01s !important; }
}
```

---

## Security Practices

- All user-facing strings inserted via `innerHTML` are passed through `escapeHtml()` from `src/utils/dom.js`
- External links always include `rel="noopener"` and `target="_blank"`
- ICS content escapes `,`, `;`, `\` per RFC 5545 before embedding

---

## What NOT to Do

- Do not edit `index.html` manually — use `apply-config.js`
- Do not edit `assets/js/*.mjs` — these are Framer build artefacts
- Do not add `scroll` event listeners for scroll-position detection — use `IntersectionObserver`
- Do not use default exports in `src/`
- Do not mutate inline styles for component state — toggle CSS classes instead
- Do not add runtime npm dependencies — the project is intentionally zero-dependency at runtime
