# Arpit Pandey — Portfolio

A Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion build.
The site is modeled as a live backend system: boot-sequence hero, a
process-inspector about section, a hand-built SVG dependency graph for the
stack, service-style project cards, a git-commit-log timeline, and an
API-console contact form.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint (next/core-web-vitals + next/typescript)
```

## Project structure

```
app/
  layout.tsx          fonts + full metadata (OG/Twitter/robots/JSON-LD) + viewport
  page.tsx             composes all sections
  globals.css          design tokens (CSS vars), graph + custom cursor styles
  robots.ts             generates /robots.txt
  sitemap.ts            generates /sitemap.xml
  manifest.ts            generates /manifest.webmanifest
  icon.tsx / apple-icon.tsx    generated favicon + apple touch icon (AP mark)
  opengraph-image.tsx    generated OG/Twitter share image
components/
  Nav.tsx, Hero.tsx, Inspector.tsx, StackGraph.tsx, Services.tsx,
  CommitLog.tsx, Contact.tsx, Footer.tsx, AmbientField.tsx, CustomCursor.tsx
  graph/                hand-built SVG dependency graph (no libraries)
    GraphCanvas.tsx        orchestrator — owns the one hover state, renders edges + nodes + legend
    GraphNode.tsx           single node component (core / category / tech, absolutely positioned)
    GraphEdge.tsx           single edge component (SVG base/glow/pulse line layers)
    graphLayout.ts          pure layout math — turns `categories` into positioned nodes/edges
    graphUtils.ts           derives hover/active/dim state for nodes + edges from one hoveredId
    graphConfig.ts          every layout constant (spacing, radii, thresholds) — the only place to tune numbers
    graphTypes.ts           shared types for the graph module
  ui/button.tsx          shadcn-style button (cva + tailwind-merge)
constants/
  motion.ts             shared easing/duration/stagger values used by every animated component
hooks/
  useMediaQuery.ts       SSR-safe media query hook (used for the mobile graph layout switch)
lib/
  data.ts               ALL content lives here — name, stack, projects, timeline, contact
  graphData.ts           computes the graph layout once from `categories` at module load
  site.ts                 site-wide identity (URL, title, description) shared by every metadata file
  utils.ts                 cn() helper
```

## Editing content

Everything text-based — projects, tech stack, timeline, focus areas, contact
links — lives in `lib/data.ts`. Change it there and every section updates
automatically.

### Change colors

Design tokens are CSS custom properties in `app/globals.css` (`:root`),
e.g. `--accent`, `--bg`, `--surface`, `--text`. They're HSL triplets
(`H S% L%`) consumed by Tailwind via `tailwind.config.ts`'s `colors` map, so
editing a value there updates every `bg-accent` / `text-accent` / etc. usage
site-wide. The graph and cursor also read these vars directly for glow/box
shadows, so no separate palette to keep in sync.

### Add a technology to the stack graph

Edit the `categories` array in `lib/data.ts` — add a new category object or
push an item into an existing category's `items` array, each with an icon
from [Simple Icons](https://simpleicons.org) via the `icon()` helper. Nothing
else needs to change: `lib/graphData.ts` recomputes both the desktop radial
layout and the mobile stacked layout from that array at build time, and the
layout math in `components/graph/graphLayout.ts` automatically re-solves
ring radii and angular spacing so nodes/labels never overlap or clip,
regardless of how many categories or items you add. If you want to retune
spacing (gaps, radii, padding), every constant lives in
`components/graph/graphConfig.ts` — nothing in the layout math file itself
should ever contain a bare number.

### Add a project

Push an entry onto the `projects` array in `lib/data.ts` (`id`, `name`,
`route`, `status`, `desc`, `stack`, `meta`). It renders automatically as a
new expandable card in the Services section.

### Edit sections

Each section is its own file under `components/` (`Hero.tsx`,
`Inspector.tsx`, `StackGraph.tsx`, `Services.tsx`, `CommitLog.tsx`,
`Contact.tsx`), composed in order inside `app/page.tsx`. Reordering the page
is reordering that list; removing a section is deleting its line there (and
its matching Nav link in `components/Nav.tsx` if you don't want it in the
nav).

## SEO

`app/layout.tsx` sets full metadata (title template, description, keywords,
canonical URL, `robots`, OpenGraph, Twitter Card) sourced from
`lib/site.ts` — edit that one file to change the domain, name, or tagline
everywhere at once. `app/robots.ts`, `app/sitemap.ts`, and `app/manifest.ts`
use Next.js's metadata-route conventions to generate `/robots.txt`,
`/sitemap.xml`, and the web manifest at build time; `app/icon.tsx`,
`app/apple-icon.tsx`, and `app/opengraph-image.tsx` generate the favicon,
apple-touch-icon, and OG/Twitter share image on the fly (no static image
assets to keep in sync). A `Person` + `WebSite` JSON-LD block is inlined in
the `<head>` for rich search results.

## Accessibility

- `MotionProvider` sets Framer Motion's `reducedMotion="user"`, and
  `globals.css` has a matching `prefers-reduced-motion` block, so every
  animation (reveals, graph pulses, cursor, core breathing) is disabled
  site-wide when the OS setting is on.
- The contact form is a real `<form>` (Enter submits it), every input has a
  `label htmlFor` pair, and the response status is an `aria-live="polite"`
  region so screen readers announce success/error without a focus jump.
- Graph nodes are real `<button>`s with `aria-label`/`aria-expanded` and
  visible `:focus-visible` rings, so the whole dependency graph is keyboard-
  and screen-reader-navigable, not just mouse-hoverable.
- All interactive touch targets (nav hamburger, graph nodes, buttons) meet
  the 44×44px minimum recommended touch target size on mobile.

## Performance notes

- The graph's layout (`computeLayout`/`computeStackedLayout`) runs once at
  module load in `lib/graphData.ts`, not on every render — it depends only
  on the static `categories` array.
- `GraphNode` and `GraphEdge` are wrapped in `React.memo`; the single
  `hoveredNodeId` state lives in `GraphCanvas` and all derived active/dim
  sets are `useMemo`'d off it, so a hover only re-renders the handful of
  nodes/edges whose visual state actually changed.
- Node motion (scale on hover, breathing core) is done with CSS
  `transform`/`opacity` transitions, not JS-driven layout properties, so it
  stays on the compositor thread.
- Fonts are loaded via `next/font/google` (self-hosted, no render-blocking
  external request) with `display: 'swap'`.
- The footer clock re-renders once a minute (not every second) and pauses
  entirely via the Page Visibility API while the tab is hidden.
- Tech icons load through `next/image` with `unoptimized` (they're already
  minimal external SVGs from the Simple Icons CDN, so there's nothing for
  Next's image pipeline to do) — see `next.config.mjs` for the allow-listed
  remote host.

## Deploying (Vercel)

Zero-config: `vercel deploy` (or connect the repo in the Vercel dashboard)
works out of the box. Before deploying:

1. `npm install`
2. `npm run lint` — fix anything it flags
3. `npm run build` — must complete with no TypeScript or build errors
4. Update `lib/site.ts`'s `url` if the production domain differs from
   `https://arpitpandey.dev`
5. Push to the branch Vercel is tracking

`next.config.mjs` sets baseline security response headers
(`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`), disables the `X-Powered-By` header, and enables gzip
compression — no extra Vercel configuration needed for those.

## Tech icons

Tech and stack icons load live from the [Simple Icons](https://simpleicons.org)
CDN (`https://cdn.simpleicons.org/<slug>`). If you deploy behind a strict CSP
or want icons bundled locally, download the SVGs into `public/icons/` and
swap the `icon()` helper in `lib/data.ts`.

## Adding more shadcn/ui components

This repo ships one hand-written shadcn-style `Button`. To pull in the full
shadcn/ui component set:

```bash
npx shadcn@latest init
npx shadcn@latest add dialog tooltip accordion
```
