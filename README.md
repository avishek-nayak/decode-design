# Decode.designers

Website for a digital design consultancy and design school. Two jobs, in
priority order: **win consulting clients**, and **sell courses to designers**.

Built with React + Vite (plain JavaScript, no TypeScript). Every route is
prerendered to static HTML at build time so the services and course pages are
crawlable — search is a lead source, and a client-rendered SPA would be
invisible to it.

All copy on the site right now is placeholder content. It lives in
`src/data/` — see [Editing content](#editing-content).

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build, then prerenders all 20 routes to static HTML |
| `npm run build:spa` | Client bundle only, no prerender (rarely what you want) |
| `npm run preview` | Serves `dist/` the way a static host does — use this, not `vite preview` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

> **Why a custom preview server.** `vite preview` falls back to
> `dist/index.html` for any unknown path, so `/services` would be served the
> home page's HTML and you'd never see the prerendered pages. `scripts/serve.mjs`
> resolves clean URLs to their directory index the way Netlify, Vercel,
> Cloudflare Pages and nginx do, so local preview matches production.

---

## Deploying

The build output is a plain static site in `dist/`. Nothing server-side is
required.

### Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new). It will
   auto-detect Vite.
2. Confirm the settings — these should already be filled in:
   - **Build command** `npm run build`
   - **Output directory** `dist`
   - **Install command** `npm install`
3. Deploy.

`vercel.json` is committed and sets `cleanUrls: true` plus immutable caching
for `/assets/*` and `/fonts/*`. No environment variables are needed for the
current build — payments run against the mock provider until a gateway is
chosen.

**One thing to change after the first deploy:** set `site.url` in
`src/data/siteConfig.js` to the real domain. It is currently
`https://decode.designers`, and it is what canonical URLs, Open Graph tags and
`sitemap.xml` are generated from. Getting this wrong is the single most common
way to launch a site with broken SEO.

### Netlify / Cloudflare Pages

Build command `npm run build`, publish directory `dist`. `public/_headers`
carries the cache rules and the prerender writes `dist/404.html` for the
not-found page. No redirects file is needed — every route is a real file.

---

## Editing content

**No page component contains copy.** Pages map over data, so replacing the
placeholder text means editing one file in `src/data/` — not hunting through
JSX.

| File | Contents |
|---|---|
| `siteConfig.js` | Site name, **domain**, email, socials, nav, stats, client list |
| `services.js` | The seven services, the engagement process, case-study placeholders |
| `courses.js` | The four courses, curricula, prices, teaching principles |
| `faqs.js` | FAQ groups: consulting, courses, payments |
| `testimonials.js` | Quotes (currently placeholder attributions) |
| `about.js` | Bio, timeline, working principles, toolkit |
| `plans.js` | Checkout plans — course prices are derived from `courses.js` |
| `privacy.js` | Privacy policy sections |

Anything marked `TODO` in `siteConfig.js` is a placeholder that must be
replaced before launch (domain, email, booking link, social URLs).

Adding a service or course automatically adds its detail page, its sitemap
entry and its prerendered HTML — `slug` becomes the URL. Nothing else to wire
up.

### Before launch

- [ ] Set the real domain in `siteConfig.js`
- [ ] Replace email, booking link and social URLs
- [ ] Replace all placeholder copy in `src/data/`
- [ ] Replace the four case-study placeholders with real work, or delete the
      Selected Work section from `src/pages/Home.jsx`
- [ ] Get real, attributable testimonials — the current ones say
      "Placeholder Name" on purpose so they can't ship by accident
- [ ] Have the privacy policy reviewed against the DPDP Act 2023 (and GDPR if
      you sell into the EU/UK). The committed text is scaffolding, not legal
      advice
- [ ] Swap `public/og-default.svg` for a real 1200×630 image
- [ ] Connect a payment gateway (below)

---

## Design system

Single charcoal tone, 12-column grid, two typefaces. The constraints are the
system — staying inside them is what keeps the site coherent.

- **Tokens** — `src/styles/tokens.css`. Colour ramp, type scale, spacing,
  easing. Nothing elsewhere should hardcode a value.
- **Colour** — one tone, `--ink-000` to `--ink-900`. No accent hue anywhere.
  Emphasis comes from value contrast, weight and space. Adding a second hue
  would undo the whole look.
- **Type** — Familjen Grotesk (variable, 400–700) for everything; Space Mono
  400 for labels, indices, metadata, prices and tags. Both self-hosted from
  `public/fonts/` — no Google Fonts request, no third-party connection.
- **Weight** — 400 by default, including headings. 700 is an event: a
  singled-out word, or a primary button label. Hierarchy comes from size,
  measure and whitespace.
- **Grid** — 12 tracks at every breakpoint; components narrow their span
  (12 / 6 / 4 / 3). Use `<Grid>` and `<Col>` for page layout rather than
  ad-hoc flex. Press **Ctrl+G** on any page to toggle the grid overlay.
- **Inversion** — `.inverse` flips the token roles for a whole subtree. Use it
  at most once per page; it's the emphasis device, and overusing it kills it.
- **Motion** — 12px rise + fade on scroll, 60ms stagger, 180ms hover
  transitions. Every animation is disabled under `prefers-reduced-motion`.

### Components

```
components/layout/   RootLayout, Header, Footer, Grid, Col, Container, Section
components/ui/       Button, Field, Accordion, Eyebrow, Reveal, Placeholder, Seo
components/blocks/   PageHeader, CTABand
```

---

## Payments

The checkout page is fully built but **no gateway is connected**. It runs
against a mock provider that simulates the round-trip and charges nothing; the
page says so on screen, so it can be shown to people without misleading them.

`src/lib/payments/index.js` exposes exactly two functions:

```js
createCheckout({ planId, amount, currency, customer })
  → { checkoutId, status, redirectUrl }

getCheckoutStatus(checkoutId)
  → { status }
```

To go live with Razorpay or Stripe:

1. Write `src/lib/payments/providers/razorpay.js` exporting those same two
   functions.
2. Register it in the `providers` map in `src/lib/payments/index.js`.
3. Set `VITE_PAYMENT_PROVIDER=razorpay` in your environment.

`Checkout.jsx` does not change. Amounts are always in **minor units** (paise,
cents), which is what every gateway expects, so nothing is converted at the
boundary.

⚠️ Keep secret keys server-side. Anything prefixed `VITE_` is embedded in the
client bundle and is public. See `.env.example`.

The contact form is stubbed the same way — `submitEnquiry()` in
`src/lib/enquiry.js` validates properly but doesn't deliver mail yet. Point it
at a serverless function when you're ready.

---

## Accessibility

The site sells accessibility consulting, so failing an audit on it would be
disqualifying. Current state: **zero axe-core violations** across all routes at
1440px and 375px, tested against WCAG 2.0/2.1/2.2 A and AA plus best-practice
rules.

Also verified by hand: skip link first in tab order, mobile nav is a real modal
dialog (focus trapped, Escape closes, focus returns, scroll locked), form
errors are `role="alert"` and linked with `aria-describedby`, accordions are
native disclosure buttons, and nothing is left invisible under reduced motion.

If you change the palette, re-check contrast. Body text is currently at AAA.

---

## How prerendering works

`scripts/prerender.mjs` runs after `vite build`:

1. Builds an SSR bundle of the same app.
2. Renders each route in `getStaticPaths()` to HTML.
3. Injects the route's `<head>` tags and writes `dist/<route>/index.html`.
4. Generates `sitemap.xml` and `robots.txt` from the same route list.

Metadata is deliberately **not** rendered into the React tree. React 19 can
hoist `<title>`/`<meta>` from anywhere, but those hoisted tags then have to
stay exactly where the server put them or hydration fails — so `<Seo>` renders
`null`, hands its descriptor to a collector during the prerender, and applies
it imperatively to `document.head` on client navigation. Both paths read the
same descriptor from `src/lib/meta.js`, so they can't drift.

Structured data ships per page type: `ProfessionalService` on the home page,
`Service` on service pages, `Course` on course pages, `FAQPage` on the FAQ.

---

## Notes and known trade-offs

- **Bundle size.** ~173 kB gzipped JS. Content is in the prerendered HTML so it
  paints before the bundle arrives, but if you want this smaller, the biggest
  wins are dropping `lenis` (smooth scroll) and replacing `zod` on the two
  forms.
- **`react-router-dom` is pinned to v7.** v6 carries unpatched advisories.
- **Placeholder imagery** uses the `<Placeholder>` component — a charcoal
  duotone stand-in. Delete the component once real assets land.
- **No CMS.** Content is JS modules. If the courses grow into long-form
  lessons, MDX is the natural next step.
