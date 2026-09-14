# Project Context

## Overview

This repo is the marketing website for Apprising Creatives — currently a single-page (`/`) Next.js
site. It was built from scratch (no prior app code existed) following the brief in
`master-prompt.md` and the brand/landing-page specs in this `docs/` folder. There is no backend,
CMS, or database — all copy lives in typed content files under `src/lib/content/`.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript.
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css` — there is no
  `tailwind.config.ts`; design tokens are added directly as CSS custom properties in the `@theme`
  block).
- **Fonts**: `next/font/google` — Manrope (700/800, headings via `font-display`) and Inter
  (400/500/600, body/UI via `font-sans`), per `docs/design-system.md` §7–8. Self-hosted at build
  time, no external font requests at runtime.
- **Icons**: `lucide-react` — the one dependency added beyond the default `create-next-app`
  scaffold. Rationale: ~15+ small icons are used across capability cards, tech categories, the
  agency comparison, and "Why Apprising" — a tree-shakeable, consistent icon set was judged better
  than hand-authoring and maintaining that many SVGs for equivalent bundle cost (only icons
  actually imported ship).
- **Motion**: no animation library. All motion is native `IntersectionObserver`
  (`RevealOnScroll.tsx`) + CSS transitions/keyframes, gated by Tailwind's `prefers-reduced-motion`
  handling — see `docs/design-system.md` → Motion Guidelines.

## Folder Structure

```
src/
  app/            # routes, layout, metadata, generated icon/OG image, sitemap/robots
  components/
    layout/       # Navbar, MobileNav, Footer
    sections/     # one component per landing-page section
    visuals/      # the hand-built SVG/CSS diagrams + the RevealOnScroll primitive
    ui/           # Button, Card, Badge, Container, Section, SectionHeading, Logo
  lib/
    constants.ts  # site name/url, CTA hrefs + labels
    seo.ts        # Organization / WebSite / FAQPage JSON-LD builders
    content/      # typed content arrays (nav, capabilities, process, solutions, techStack, agencyComparison, faq)
```

## Content Model

Section copy that's list-like (capability cards, process steps, solution examples, tech
categories, agency comparison lists) lives in `src/lib/content/*.ts` as typed arrays. Section
components under `src/components/sections/` are thin `.map()` renderers over that data. **To edit
copy, edit the content file — not the component JSX**, unless the change is structural.

## Visual System

The palette, type scale, section rhythm and component rules come from `docs/design-system.md`,
which is the visual source of truth. Implementation notes:

- Dark-first: Deep Navy (`#0B1220`) hero, nav, capabilities, solutions, agency, final CTA and
  footer; light sections (Warm White `#F7F8FA` / white) alternate between them per §20.
- Primary accent is Electric Blue `#3B82F6` (hover Bright Blue `#60A5FA`). An earlier teal accent
  was replaced when the design system was adopted.
- `components/ui/Section.tsx` applies the `dark` / `light` / `raised` tone plus the section
  spacing rhythm, so sections don't repeat background/padding classes.
- Components that render on both tones (`Button`, `Card`, `SectionHeading`) take an `onDark` prop
  rather than duplicating per-tone variants.

## Routing

Two routes: `/` (the landing page) and `/portfolio`. Most nav items (`src/lib/content/nav.ts`)
are in-page anchors on the homepage, written as absolute paths (`/#what-we-do`, not `#what-we-do`)
so they resolve correctly from `/portfolio` too — Navbar/MobileNav/Footer render on every route
and use `next/link`. Section anchors: `/#what-we-do`, `/#solutions`, `/#how-we-work`,
`/#for-agencies`, `/#about` (the "Why Apprising" section — there is no separate About section;
see Open Questions), `/#faq`, and `/#final-cta` (used by the footer's "Contact" link).

Section order on `/` matches `docs/design-system.md` §20: Hero → Problem → Capabilities →
Process → Solutions → For Agencies → Engineering Capabilities → Why Apprising → FAQ → Final CTA.

### `/portfolio`

Lists real, shipped work — distinct from the homepage's "Solutions" section, which shows
fictional concepts. Content lives in `src/lib/content/portfolio.ts`, each entry labeled `client`
or `internal` (rendered via `Badge`) per CLAUDE.md's "Do not invent... clearly labeled" rule:

- **Lifestyle Medicine Gateway** (client project, full platform build) — an independent domain,
  described using only what's published on the live site.
- **MediFlow** (internal product) — hosted on Apprising's own subdomain. Its own marketing page
  claims client counts, certifications, and testimonials that read as demo placeholder content;
  none of that is repeated here, only the actual product features.

Reuses `FinalCta` rather than duplicating it.

## SEO

Implemented from `docs/seo.md`:

- Title `AI Software & Business Automation | Apprising Creatives` (§10) and the meta description
  from §11, both centralised in `src/lib/constants.ts` / `src/app/layout.tsx`.
- Canonical URL via `alternates.canonical`; `lang="en-AU"`.
- Structured data (§18–20): `Organization` (with `legalName: Apprising Corporation` per §23 and
  `areaServed: Australia`), `WebSite`, and `FAQPage` mirroring the visible FAQ section. No
  reviews, ratings, awards, locations, employee counts or certifications are declared (§19), and
  no Australian address/office is claimed (§17).
- Australian market focus appears in the hero eyebrow and agency section copy only — market
  focus, not a location claim.
- Descriptive internal anchor text on capability cards (§28), e.g. "Explore AI integration"
  rather than "Learn more".

## CTA / Contact Handling

No booking tool exists yet. `src/lib/constants.ts` centralizes CTA destinations as `mailto:`
links to `info@apprisingcreatives.com` (`CONTACT_EMAIL`). Every email CTA — Book a Discovery
Call, Partner With Us, Start a Conversation — derives from that one constant, so swapping in a
real scheduling tool (Calendly/Cal.com) or a `/contact` route is a one-file change (`CTA_HREFS`
in `constants.ts`).

Two copy conflicts between `master-prompt.md` and this repo's maintained docs
(`CLAUDE.md`/`docs/landing-page.md`) were resolved in favor of the latter:

- Agency CTA label: **"Partner With Us"** (not "Explore a Partnership").
- Hero secondary CTA: **"Explore What We Build"** (not "See What We Build").

## Assets

No photography exists; diagrams are inline SVG/CSS (`src/components/visuals/`).

The real logo was provided as `public/logo.png` (450×390, the full stacked lockup — icon,
"Apprising", "CREATIVES"). `public/logo-mark.png` is a cropped, transparent-background PNG of
just the icon (214×197), generated from it — the icon is paired with the existing text wordmark
in `Logo.tsx` rather than using the full stacked image, so the compact horizontal navbar/footer
lockup stays "Apprising Creatives" rather than dropping to "CREATIVES" alone. If a vector (SVG)
version of the icon becomes available, swap `logo-mark.png` for it in `Logo.tsx`, `icon.tsx`, and
`opengraph-image.tsx` — the PNG crop is a reasonable stand-in but a raster.

The favicon (`src/app/icon.tsx`) and Open Graph image (`src/app/opengraph-image.tsx`) both embed
`logo-mark.png` (read from disk, inlined as a base64 data URI) via Next's `next/og`
`ImageResponse` — no new dependency.

## Security Headers

`next.config.ts` sets a site-wide `Content-Security-Policy` plus the standard hardening headers
(`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
`Permissions-Policy`, `Strict-Transport-Security`, `Cross-Origin-Opener-Policy`,
`Cross-Origin-Resource-Policy`) via `headers()`, and disables `X-Powered-By`.

The CSP is static (no per-request nonce). Next's nonce-based CSP pattern requires generating the
nonce in Proxy/middleware on every request, which forces **dynamic rendering on every page** —
incompatible with this site being fully static (no forms, no user-generated content, no
third-party scripts). `script-src`/`style-src` therefore use `'unsafe-inline'`, which only covers
Next's own inline hydration/flight-data scripts and the scroll-reveal diagrams' inline CSS custom
properties — there is no user input for that to expose. If a booking tool or third-party script is
ever added (see Open Questions below), extend the CSP's allowlisted origins rather than loosening
it further.

`public/logo.png` and `public/logo-mark.png` get an explicit `Cache-Control` (1 week,
`stale-while-revalidate`) since they're stable brand assets served at a fixed, unhashed path.

## Open Questions / Assumptions

- **Real domain** — `SITE_URL` in `constants.ts` is a placeholder
  (`https://www.apprisingcreatives.com`). Update before launch; it feeds `metadataBase`, OG/
  canonical URLs, `sitemap.ts`, and the JSON-LD `url`.
- **Booking tool** — no scheduling tool is wired up; CTAs use `mailto:`.
- **About section** — the nav's "About" item anchors into "Why Apprising" (`#about`) rather than
  a dedicated section, to stay within the master prompt's specified 11 sections.

## Build & Run

```
npm install
npm run dev     # local dev server (Turbopack)
npm run lint    # ESLint
npm run build   # production build (includes TypeScript check)
npm start       # serve the production build
```

No environment variables are required for the current v1 (no backend/API keys).
