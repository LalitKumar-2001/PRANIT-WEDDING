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
Every `initXxx()` function queries its required DOM element first and returns early if absent.

```js
export function initMusicPlayer(src) {
  const button = document.querySelector('.framer-2fmrhl-container');
  if (!button) return;
  // ...
}
```

### MutationObserver Injection Pattern
For **all** content that Framer JS re-renders at runtime, use `MutationObserver` with a value guard. This is the **mandatory** pattern — never assume SSR patches survive Framer's runtime re-render.

```js
function initPresenceText() {
  const inject = () => {
    const section = document.querySelector('.framer-1rq20ml');
    if (!section || section.querySelector('.ttk-presence-text')) return;
    const el = document.createElement('p');
    el.className = 'ttk-presence-text';
    el.textContent = 'Awaiting your presence - Sasmal Family';
    section.appendChild(el);
  };
  inject();
  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
}
```

### Target the Deepest Styled Element
When overriding Framer-rendered text, **always target the leaf element** (`h3`, `h2`, or `p`) that carries Framer's inline CSS styles — never the outer wrapper `div`. Setting `textContent` on a parent strips all child elements including the styled leaf.

```js
// ✅ Correct — preserves inline font styles on h3
const target = wrapper.querySelector('h3, h2') ?? wrapper.querySelector('p') ?? wrapper;
if (target.textContent.trim() !== val) target.textContent = val;

// ❌ Wrong — destroys the h3 and all its inline styles
const p = wrapper.querySelector('p') ?? wrapper;
p.textContent = val;
```

### Named Constants for Magic Numbers

```js
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;
const MS_PER_HOUR   = 3600000;
const MS_PER_DAY    = 86400000;
```

### JSDoc on Every Exported Function

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
| Functions | camelCase verb-noun | `initEventCards`, `initRepurposedCards`, `initCoupleNameDisplay` |
| CSS state classes | kebab-case with `is-` prefix | `.is-flipped`, `.is-active`, `.is-visible` |
| CSS component classes | `ecf-` prefix for event card elements | `.ecf-btn`, `.ecf-hint`, `.ecf-actions` |
| CSS injected element classes | `ttk-` prefix for hand-injected overlays | `.ttk-countdown-heading`, `.ttk-presence-text` |
| Config keys | camelCase | `countdownDate`, `eventCardBack`, `musicUrl` |
| Constants | SCREAMING_SNAKE_CASE | `MS_PER_DAY`, `MONTHS` |

---

## Architectural Patterns

### Config-Driven Initialisation
`main.js` guards every feature call with a config check:

```js
if (config.countdownDate) initDateReveal(config.countdownDate, ...);
if (config.musicUrl)      initMusicPlayer(config.musicUrl);
if (config.eventCardBack) initEventCards(config.eventCardBack, ...);
if (config.events)        initEventFieldOverrides(config.events);
```

### Framer Prop Swap Pattern
Several Framer components have props hardcoded **swapped** at their call sites in the `.mjs` bundle. The fix is always a `MutationObserver` in `main.js` that targets the leaf element:

| Component | Swap | Fix function |
|---|---|---|
| Hero names (`framer-1if6ejn-container`) | `q_Mw9gntU`=PRITI, `BGQVPX9uc`=ANKIT | `initCoupleNameDisplay()` |
| Invite names (`framer-igjlsv-container`) | `tml4boL7l`=Priti, `dJVbfF52C`=Ankit | `initCoupleNameDisplay()` |
| Event card names (`b0Odmcs_Z`) | 4 of 6 cards wrong | `initRepurposedCards()` |
| "bride and groom" heading (`framer-ewzo4f`) | hardcoded string | `initGroomAndBrideHeading()` |

### CSS Suppression of Framer-Rendered Content

```css
.framer-jcebrp .framer-1ytz0ta {
  display: none !important;
}
.framer-jcebrp::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('assets/images/background/2dFaPNHiZWIx3VvP26NqORM2vMY.png');
  background-size: cover;
  z-index: 1;
}
```

### CSS-Class State Machine

```js
card.classList.toggle('is-flipped');
link.classList.toggle('is-active', isActive);
e.target.classList.add('is-visible');
```

### IntersectionObserver Over Scroll Events

```js
const observer = new IntersectionObserver(callback, { threshold: 0.15 });
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### One-Time Event Listeners

```js
document.addEventListener('click', play, { once: true });
document.addEventListener('touchstart', play, { once: true });
```

### Blob Download Pattern

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
- Framer class overrides use `!important` only when necessary

### ttk- Prefix for Injected Elements

```css
.ttk-countdown-heading { ... }
.ttk-presence-text { ... }
```

### CSS Custom Properties for Card Geometry

```css
.ecf-front, .event-card-back {
  --w: 295px; --h: 377px; --r: 180px;
  width: var(--w); height: var(--h);
}
@media (max-width: 809.98px) {
  .ecf-front, .event-card-back { --w: 328px; --h: 431px; --r: 158px; }
}
```

### Event Card CSS Order (all 6 visible)

```css
.framer-1xxttys-container { order: 1; } /* Mehendi      */
.framer-v371mv-container  { order: 2; } /* Sangeet      */
.framer-1mhegaa-container { order: 3; } /* Haldi        */
.framer-y390rh-container  { order: 4; } /* Mangana Handi */
.framer-15hmep-container  { order: 5; } /* Baarat       */
.framer-8j9rab-container  { order: 6; } /* Reception    */
```

### Responsive Breakpoints

| Breakpoint | Range |
|---|---|
| Phone | `max-width: 809.98px` |
| Tablet | `min-width: 810px` and `max-width: 1199.98px` |
| Desktop | `min-width: 1200px` (implicit) |

### Accessibility in CSS

```css
@media (prefers-reduced-motion: reduce) {
  .framer-eqI5A { transition-duration: 0.01s !important; }
  .ecf-hint b   { animation: none; }
  .ttk-presence-text { animation: none; }
}
```

---

## Security Practices

- All user-facing strings inserted via `innerHTML` are passed through `escapeHtml()` from `src/utils/dom.js`
- Text injected via `textContent` is safe by default
- External links always include `rel="noopener"` and `target="_blank"`
- ICS content escapes `,`, `;`, `\` per RFC 5545

---

## What NOT to Do

- Do not edit `index.html` manually — use `apply-config.js`
- Do not edit `assets/js/*.mjs` — these are Framer build artefacts
- Do not add `scroll` event listeners — use `IntersectionObserver`
- Do not use default exports in `src/`
- Do not mutate inline styles for component state — toggle CSS classes instead
- Do not add runtime npm dependencies
- Do not set `textContent` on a Framer wrapper `div` — target the leaf `h3`/`h2`/`p` element
- Do not attempt to remove Framer-rendered content by editing static HTML — use CSS `display: none !important`
