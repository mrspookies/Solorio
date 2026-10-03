# Solowood — Website

Marketing site for **Solowood**, a master carpenter / general contractor.

Rustic, rugged, high-end blue-collar aesthetic: weathered-steel surfaces, San Francisco
49ers gold accents, scarlet calls to action, Bebas Neue industrial display type.

---

## Status

**Framework is up and running. All imagery is placeholder.**

The site is fully functional and navigable, but **no photography exists yet** — real
project photos are pending from the owner. Every image slot renders a clearly-labeled
`PHOTO PENDING` block instead of a fabricated image. No logos are generated either; the
wordmark is typography only.

Before launch, replace the placeholder contact details in `src/data/site.ts`
(phone, email, license number, service-area town names) — all of them are stand-ins.

---

## Commands

```bash
npm install

npm run dev       # dev server → http://localhost:4321
npm run build     # static production build → dist/
npm run preview   # serve the built dist/
npm run check     # astro check (TypeScript + template diagnostics)
```

---

## Stack

| Concern | Choice |
|---|---|
| Framework | [Astro 5](https://astro.build) — static output, zero JS by default |
| Language | TypeScript, `strict` (+ `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, CSS-first `@theme` tokens |
| Fonts | Self-hosted via Fontsource — **no external requests, works offline** |

Images and logos are deliberately absent per project constraint.

---

## Where things live

```
src/
├── data/site.ts            ← ALL COPY + the photo manifest lives here
├── layouts/BaseLayout.astro  ← <head>, SEO, JSON-LD, skip link
├── styles/global.css       ← design tokens + component primitives
├── components/             ← one component per page section
└── pages/index.astro       ← section order
```

---

## Adding the real photos later

This is the one thing you'll definitely want to do, so it's designed to be a
drop-in operation.

1. Put image files in `public/photos/` (e.g. `public/photos/ridge-house.jpg`).
2. Open `src/data/site.ts` and set the matching `src` field.

```ts
// before
{ id: 'ridge-house', photo: null,           photoLabel: 'Whole-house frame' }

// after
{ id: 'ridge-house', photo: '/photos/ridge-house.jpg', photoLabel: 'Whole-house frame' }
```

`PhotoSlot.astro` renders a real `<img>` as soon as `src` is non-empty, and falls back
to the labeled placeholder otherwise. **No component code needs to change.**

Every slot that accepts a photo:

| Component | Field to set | Covers |
|---|---|---|
| `ServicesGrid` | `services[].photo` | 4 service cards |
| `AboutCraftsman` | `site.craftsmanPhoto` | craftsman portrait |
| `Portfolio` | `projects[].photo` | 6 project tiles |
| `Portfolio` | `projects[].beforeAfter.before.src` / `.after.src` | 3 before/after pairs |

For the craftsman portrait, set the single field in `src/data/site.ts`:

```ts
export const site = {
  // ...
  craftsmanPhoto: null as string | null, // → '/photos/craftsman.jpg'
} as const;
```

**Before/After sliders** are built and fully interactive even with placeholders;
supplying both `before.src` and `after.src` turns each one into a real drag-compare.

### Favicon

There is deliberately **no brand mark** — a generated logo is forbidden by the project
constraint. `BaseLayout.astro` ships an empty `data:` URL instead, purely so the
browser stops auto-requesting `/favicon.ico` and logging a 404:

```html
<link rel="icon" href="data:," />
```

When real brand assets arrive, drop the file in `public/` and swap the `href`:

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```

### Recommended image specs

- **Project tiles:** 1600px wide, 4:3 or 3:2, JPG ~85% quality.
- **Before/after pairs:** both frames shot from the *same camera position*, same
  crop and aspect. The slider is only convincing when the alignment holds.
- **Craftsman portrait:** 1200px, 4:5 vertical, subject off-center.
- Lazy-loaded by default (`loading="lazy"`), `eager` for anything above the fold.

---

## Design system

Tokens are defined once in `src/styles/global.css` under `@theme` and used everywhere.
Do not hardcode hex values in components.

| Group | Tokens | Role |
|---|---|---|
| Steel | `steel-950` … `steel-50` | Surfaces — asphalt, weathered steel, borders, text |
| Gold | `gold-950` … `gold-200` | Accents, emphasis, eyebrows, rules |
| Red | `red-700` … `red-100` | CTAs, required markers, hardware highlights |
| Type | `font-display` (Bebas Neue), `font-sans` (Inter Variable), `font-mono` | |

Accent colors follow the San Francisco 49ers palette: gold `#B3995D`, scarlet `#AA0000`.

**Contrast rules for the dark steel surfaces — follow these or text becomes unreadable:**

- `gold-400` and lighter are the safe range for gold *text* (≥ 7:1).
- Red *text* on the dark ground must use `red-300` or lighter. `red-500` on
  `steel-950` is only 2.5:1 and fails WCAG AA — reserve `red-500` for
  **fills**, where it is paired with `steel-50` ink (7.1:1).
- Hover states must move *up* the scale (`red-300` → `red-200`), never down.
- Never pair `red-500` with `text-steel-950`; that is dark-on-dark.

Component primitives (also in `global.css`): `container-page`, `section`,
`section-band`, `eyebrow`, `heading-xl|md|sm`, `btn`, `btn-cta`, `btn-ghost`,
`btn-link`, `card-plate`, `surface-brushed`, `surface-brutal`, `rule-accent`,
`rule-hairline`, `chip`, `photo-slot`, `field-label`, `field-input`, `field-error`,
`lede`, `mark-gold`, `hover-lift`, `hover-sweep`, `animate-rise`, `animate-marquee`,
`animate-pulse-dot`.

Fluid display sizes use `clamp()`, so headings scale from 360px to 1920px without
breakpoints.

---

## Accessibility & performance notes

- Skip-to-content link, one `<main>`, landmark `<header>`/`<footer>`, labelled `<section>`s.
- Gallery filter is a real button group with `aria-pressed` and an `aria-live` result count.
- Before/after sliders expose a native `<input type="range">`, so they are keyboard
  operable (arrow keys) and drag/click on touch.
- Quote form validates in JS (`novalidate` suppresses the native bubbles) and drives
  `aria-invalid` plus `aria-live` error text from a single validation pass.
  **It is a front-end stub — no backend is wired up.**
- Collapsed mobile nav is `inert` + `aria-hidden`, so its links stay out of the tab
  order and the accessibility tree until it is opened.
- `prefers-reduced-motion` disables animation and smooth scrolling.
- `<noscript>` block surfaces the phone number when JS is unavailable.
- Fonts are self-hosted. Production payload: ~85KB HTML, ~44KB CSS, and a small
  inline `<script>` per interactive component — no framework runtime.

---

## Deploy

Static output in `dist/` — drop it on any static host (Netlify, Vercel, Cloudflare
Pages, S3, or plain nginx). Set `site` in `astro.config.mjs` to the real domain so
canonical URLs and JSON-LD resolve correctly.