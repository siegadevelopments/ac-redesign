# Project Context

## Overview

This repo is the marketing website for Apprising Creatives — a Next.js site originally built as a
single page (`/`) following the brief in `master-prompt.md`, expanded in 2026-09 into a small
multi-page site (`/`, `/portfolio`, `/for-agencies`, `/discovery-call`, `/about`) as part of an
SME-first repositioning — see `docs/brand.md`'s repositioning note for why. There is still no
CMS or database; copy lives in typed content files under `src/lib/content/`, and the one dynamic
piece of state (form submissions) goes straight to Kit rather than a local database — see
"Newsletter / Lead Magnet" and "Assessment Funnel" below.

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
    content/      # typed content arrays (nav, capabilities, process, solutions, techStack,
                  # agencyComparison, faq, agencyFaq, leadMagnet, industries, assessment)
```

## Content Model

Section copy that's list-like (capability cards, process steps, solution examples, tech
categories, agency comparison lists) lives in `src/lib/content/*.ts` as typed arrays. Section
components under `src/components/sections/` are thin `.map()` renderers over that data. **To edit
copy, edit the content file — not the component JSX**, unless the change is structural.

## Visual System

The palette, type scale, section rhythm and component rules come from `docs/design-system.md`,
which is the visual source of truth. Implementation notes:

- Dark-first: Deep Navy (`#0B1220`) hero, nav, capabilities, "what we can build," newsletter,
  final CTA and footer (plus the featured agency card on `/for-agencies`); light sections (Warm
  White `#F7F8FA` / white) alternate between them per `docs/landing-page.md`'s Section Order.
- Primary accent is Electric Blue `#3B82F6` (hover Bright Blue `#60A5FA`). An earlier teal accent
  was replaced when the design system was adopted.
- `components/ui/Section.tsx` applies the `dark` / `light` / `raised` tone plus the section
  spacing rhythm, so sections don't repeat background/padding classes.
- Components that render on both tones (`Button`, `Card`, `SectionHeading`) take an `onDark` prop
  rather than duplicating per-tone variants.

## Routing

Five routes: `/` (the landing page), `/portfolio`, `/for-agencies`, `/discovery-call`, `/about`.
Nav items (`src/lib/content/nav.ts`) mix in-page anchors on the homepage (written as absolute
paths, `/#what-we-do` not `#what-we-do`, so they resolve correctly from other routes too) with
real routes — Navbar/MobileNav/Footer render on every route and use `next/link` throughout, so
`Button.tsx`'s anchor-vs-route branching (`href.startsWith("#")`/`"mailto:"`) already handles
both without changes. Homepage section anchors: `/#what-we-do`, `/#solutions`, `/#how-we-work`,
`/#faq`, and `/#final-cta` (used by the footer's "Contact" link). `/#about` and `/#for-agencies`
no longer exist — both are now real pages (see Open Questions' former "About section" entry,
now resolved).

Section order on `/` matches `docs/landing-page.md`'s "Section Order" (revised 2026-09): Hero →
Problem (expanded) → Capabilities (3 pillars) → What We Can Build → Process → Industries →
Engineering Capabilities → Why Apprising → Newsletter → FAQ → Final CTA.

### `/portfolio`

Lists real, shipped work — distinct from the homepage's "What We Can Build" section, which shows
fictional concepts. Nav-labeled **"Case Studies"** as of 2026-09 (`docs/case-studies.md`) — the
URL stays `/portfolio` since it's already live/indexed and only one real case study exists, so a
separate `/case-studies` index would just duplicate this page. Content lives in
`src/lib/content/portfolio.ts`, each entry labeled `client` or `internal` (rendered via `Badge`)
per CLAUDE.md's "Do not invent... clearly labeled" rule:

- **Lifestyle Medicine Gateway** (client project, full platform build) — an independent domain,
  described using only what's published on the live site.
- **MediFlow** (internal product) — hosted on Apprising's own subdomain. Its own marketing page
  claims client counts, certifications, and testimonials that read as demo placeholder content;
  none of that is repeated here, only the actual product features.

Reuses `FinalCta` rather than duplicating it.

### `/for-agencies`

The former homepage "For Agencies" section, moved to its own page in the 2026-09 repositioning
(`docs/brand.md`, `docs/conversion-strategy.md`) rather than removed — the relationship is real
and ongoing, it just no longer leads the homepage. Reuses `ForAgencies.tsx` (the featured
comparison card) and `TechCapabilities.tsx` (still relevant proof of technical capability for an
agency evaluator), adds an agency-specific FAQ (`src/lib/content/agencyFaq.ts`) and a `FinalCta`
variant with "Partner With Us" as the primary CTA instead of the Assessment.

### `/discovery-call`

Consolidates what the original brief described as two separate things — a "Free Business
Automation Assessment" funnel and a "Discovery Call" explainer page — into one page. Two
near-identical pages (one explaining the call, one collecting the same lead) would fragment a
single small-business funnel for no benefit; see `docs/conversion-strategy.md`'s Funnel section.
Contains the 5-step explanation of what the call covers, an explicit statement that the call can
conclude no build is justified, and the assessment intake form. See "Assessment Funnel" below
for the form's technical implementation.

### `/about`

New page: founder-led narrative, honest small-team description (founder/BD, technical
co-founder, graphics designer, junior developer — see `docs/trust-and-claims.md`), the
Philippines/international delivery disclosure (`docs/australian-market.md`), and the security
engineering-practice paragraph (not a compliance claim). The homepage's "Why Apprising" section
stays as a compact trust beat and links out here rather than duplicating this content.

## SEO

Implemented from `docs/seo.md`:

- Title `Business Automation & Custom Software | Apprising Creatives` and the meta description
  from `src/lib/constants.ts` (`SITE_DESCRIPTION`, revised 2026-09 to match the positioning
  statement in `docs/brand.md`), both centralised in `constants.ts` / `src/app/layout.tsx`.
- Canonical URL via `alternates.canonical` on every route; `lang="en-AU"`.
- Structured data: `Organization` (with `legalName: Apprising Corporation` and
  `areaServed: Australia`), `WebSite`, and `FAQPage` mirroring the homepage's visible FAQ section
  (agency FAQ items are not in the sitewide `FAQPage` schema, since they're scoped to
  `/for-agencies` — see `docs/seo.md` §48). No reviews, ratings, awards, locations, employee
  counts or certifications are declared (§19), and no Australian address/office is claimed (§17)
  — see `docs/trust-and-claims.md` for the live register.
- Geographic transparency: the Philippines/international-delivery line now appears in the footer
  and `/about` (previously only documented internally in `docs/seo.md` §17, never shown on the
  site) — see `docs/australian-market.md`.
- `sitemap.ts` lists all five routes (`/`, `/portfolio`, `/for-agencies`, `/discovery-call`,
  `/about`) — previously only listed `/`, missing even the pre-existing `/portfolio`; fixed as
  part of this pass (`docs/seo.md` §47).
- Descriptive internal anchor text on capability cards, e.g. "Explore AI integration" rather than
  "Learn more".

## CTA / Contact Handling

`src/lib/constants.ts`'s `CTA_HREFS`/`CTA_LABELS` centralize every CTA — see
`docs/conversion-strategy.md` for the full hierarchy table. As of 2026-09:

- **Book a Free Automation Assessment** (primary) now routes to the real `/discovery-call` page
  instead of a `mailto:` link — the first CTA in the site that isn't just an email draft.
- **Partner With Us** (agency) and the **Email Us Directly** fallback remain `mailto:` links to
  `info@apprisingcreatives.com` (`CONTACT_EMAIL`) — no scheduling tool exists yet for either.
- **See What We Can Automate** (secondary) and **View Case Studies** (tertiary) are unchanged in
  mechanism — an in-page anchor and a route link respectively.

Swapping the mailto CTAs for a real scheduling tool (Calendly/Cal.com) or a `/contact` route
remains a one-file change in `constants.ts`, same as before this revision.

## Assessment Funnel

`/discovery-call` (`src/app/discovery-call/page.tsx`) hosts the intake form
(`src/components/sections/AssessmentForm.tsx`, a client component) described in
`docs/conversion-strategy.md`. It posts to `src/app/api/assessment/route.ts`, which makes **two**
calls to Kit's v4 API — verified against `developers.kit.com`'s own docs 2026-09, since
`POST /v4/forms/{id}/subscribers` only accepts `email_address`/`referrer` and silently ignores
anything else (an earlier version of this route sent `first_name`/`fields` to that call directly,
which Kit's API doesn't support):

1. `POST https://api.kit.com/v4/subscribers` — upserts the subscriber and sets `first_name` +
   custom `fields`: `{ email_address, first_name, fields: { business, website, industry,
   team_size, biggest_challenge, current_tools, automate_wish } }`.
2. `POST https://api.kit.com/v4/forms/{KIT_ASSESSMENT_FORM_ID}/subscribers` — links that
   subscriber to the assessment form (`{ email_address }` only) so Kit's form automation fires.
   A **separate** form from the newsletter's, so Kit can notify differently for an assessment
   lead vs. a newsletter subscriber.

Requires, in addition to the existing `KIT_API_KEY`:

- `KIT_ASSESSMENT_FORM_ID` — a Kit form distinct from `KIT_FORM_ID`.
- Six custom fields must be created in the Kit dashboard first, with exactly these keys:
  `business`, `website`, `industry`, `team_size`, `biggest_challenge`, `current_tools`,
  `automate_wish`.

Same failure behavior as the newsletter route: a 503 with a generic error message if the env
vars are unset, rather than a silent failure.

**TEMPORARY as of 2026-09**: same Kit-side bug as the newsletter route (see "Newsletter / Lead
Magnet" above) — call 2 (linking to the form) 404s for this account. Unlike the newsletter, this
funnel was always built around a human reviewing submissions rather than an automated email, so
call 2's failure is treated as non-fatal here: if call 1 (creating the subscriber with all their
answers) succeeds, the visitor sees the normal success message and `formLinked: false` is only
logged server-side, not surfaced in the UI. The practical effect until Kit's fix lands: new
assessment leads land in Kit as subscribers with all their fields, but aren't tagged/linked to
the assessment form — check Kit's subscriber list directly rather than relying on a form-based
view or any form-triggered notification in the meantime.

## Analytics

No analytics vendor is wired in — see `docs/conversion-strategy.md`'s Analytics Events section
for the full event list and why. `src/lib/analytics.ts` exports one small helper,
`trackEvent(name, data?)`, that pushes `{ event: name, ...data }` to `window.dataLayer` if it
exists and no-ops otherwise (SSR-safe, zero dependency, GTM/GA4-compatible without committing to
either specifically). Call sites: the assessment form (`assessment_started` on first field
interaction, `assessment_completed` on success), the newsletter form (`contact_form_submitted`
with `form: "newsletter"`), every primary CTA (`discovery_call_clicked`), `/portfolio`'s page
view (`case_study_viewed`), and the agency mailto CTA (`partner_with_us_clicked`). Wiring an
actual GTM container ID or GA4 property is a follow-up — see Open Questions.

## Newsletter / Lead Magnet

`src/components/sections/Newsletter.tsx` (rendered between Why Apprising and FAQ, per
`docs/landing-page.md` §10) offers "The Business Systems Audit Checklist" as a lower-commitment
alternative to booking a call, and frames the same signup as an ongoing newsletter. Copy lives in
`src/lib/content/leadMagnet.ts`.

The form posts to `src/app/api/subscribe/route.ts`, a server-side Route Handler that makes two
calls to Kit (formerly ConvertKit)'s v4 API (same two-step shape as the Assessment Funnel below):
`POST /v4/subscribers` (captures the email), then `POST /v4/forms/{KIT_FORM_ID}/subscribers`
(links them to the form, which is what triggers Kit's incentive-email automation that actually
sends the checklist). Both use an `X-Kit-Api-Key` header, keeping the key server-side only and
needing no client-side script — doesn't touch the CSP's `connect-src` (see Security Headers
below).

Requires two env vars (see `.env.example`), unset in this repo:

- `KIT_API_KEY`
- `KIT_FORM_ID` — must point to a Kit form with the checklist configured as its **incentive
  email** in the Kit dashboard. This repo does not send or host the checklist PDF itself — Kit's
  automation delivers it once someone is linked to that form.

Until both are set, the route returns a 503 and the form shows its generic error message rather
than failing silently.

**TEMPORARY as of 2026-09**: Kit confirmed `POST /v4/forms/{id}/subscribers` 404s for this
account — a bug on their end, escalated to a product specialist, not something fixable in this
codebase. Until it's resolved, the route still succeeds if the first call (capturing the
subscriber) works, and returns `{ ok: true, formLinked: false }` — `Newsletter.tsx` then shows
`NEWSLETTER_COPY.delayedMessage` ("we've got your email — the checklist is on its way shortly")
instead of claiming it's already sent, since the incentive email genuinely won't fire until Kit's
fix lands. Once `formLinked` is reliably `true` again, no code change is needed — the honest-delay
message simply stops appearing on its own.

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
a cost this site still avoids for its marketing pages even though it now has two forms
(newsletter, assessment): both post via client-side `fetch` to same-origin API routes rather than
a native form submission or third-party script, so `connect-src 'self'` already covers them
without a nonce. `script-src`/`style-src` therefore use `'unsafe-inline'`, which only covers
Next's own inline hydration/flight-data scripts and the scroll-reveal diagrams' inline CSS custom
properties — there is no user input for that to expose. If a booking tool or third-party script is
ever added (see Open Questions below), extend the CSP's allowlisted origins rather than loosening
it further.

`public/logo.png` and `public/logo-mark.png` get an explicit `Cache-Control` (1 week,
`stale-while-revalidate`) since they're stable brand assets served at a fixed, unhashed path.

## Open Questions / Assumptions

- **Booking tool** — the Assessment funnel is a form + human follow-up, not real-time scheduling;
  no Calendly/Cal.com-style booking tool is wired up. CTAs that used to be `mailto:` fallbacks
  still are (Partner With Us, Email Us Directly).
- **Kit forms/checklist not fully configured yet** — `KIT_API_KEY`, `KIT_FORM_ID`, and
  `KIT_ASSESSMENT_FORM_ID` are all unset in this repo (see "Newsletter / Lead Magnet" and
  "Assessment Funnel" above). The checklist PDF content, the six assessment custom fields, and
  both forms' Kit-side automations still need to be created in the Kit dashboard.
- **Analytics vendor** — `src/lib/analytics.ts` pushes to `window.dataLayer` but no GTM
  container / GA4 property is actually installed on the page yet, so events currently no-op in
  production. Wire an actual container once one is chosen.
- **Lifestyle Medicine Gateway case-study approval** — the case study on `/portfolio` currently
  uses only facts already published on the client's own site (no new claims added in this pass).
  Expanding it to the full Challenge/What We Built/Outcome/Testimonial structure in
  `docs/case-studies.md` still needs the client's explicit written approval first.
- **Design/visual QA on the new pages** — `/for-agencies`, `/discovery-call`, and `/about` reuse
  existing components and tokens throughout, but haven't had a human design pass the way the
  original homepage did; treat them as a first implementation pass, not a final polish.

## Build & Run

```
npm install
npm run dev     # local dev server (Turbopack)
npm run lint    # ESLint
npm run build   # production build (includes TypeScript check)
npm start       # serve the production build
```

`KIT_API_KEY`, `KIT_FORM_ID`, and `KIT_ASSESSMENT_FORM_ID` (see `.env.example`) are required only
for the newsletter and assessment forms' Kit integration to work; the rest of the site needs no
environment variables. `SITE_URL` in `constants.ts` is the real, live domain
(`https://www.apprisingcreatives.com`) — it previously carried a stale "placeholder" comment from
before the domain went live; that comment is fixed as part of this pass.
