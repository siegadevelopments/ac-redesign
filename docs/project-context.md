# Project Context

## Overview

This repo is the marketing website for Apprising Creatives — a Next.js site originally built as a
single page (`/`) following the brief in `master-prompt.md`, expanded in 2026-09 into a small
multi-page site (`/`, `/portfolio`, `/for-agencies`, `/discovery-call`, `/about`) as part of an
SME-first repositioning — see `docs/brand.md`'s repositioning note for why. In 2026-10 the
homepage was rebuilt as a scroll story and gained `/what-we-can-build` (`docs/landing-page.md`). There is still no
CMS or database; copy lives in typed content files under `src/lib/content/`, and the one dynamic
piece of state (form submissions) goes straight to Kit (and, for problem sends, to the founder's
inbox through Resend) rather than a local database — see "Problem Route", "Newsletter / Lead
Magnet" and "Assessment Funnel" below.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript.
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css` — there is no
  `tailwind.config.ts`; design tokens are added directly as CSS custom properties in the `@theme`
  block).
- **Fonts**: `next/font/google` — Bricolage Grotesque (display and headings via `font-display`)
  and Instrument Sans (body/UI via `font-sans`), per `docs/design-system.md`. Self-hosted at
  build time, no external font requests at runtime.
- **Icons**: `lucide-react` — the one dependency added beyond the default `create-next-app`
  scaffold. Rationale: ~15+ small icons are used across capability cards, tech categories, the
  agency comparison, and "Why Apprising" — a tree-shakeable, consistent icon set was judged better
  than hand-authoring and maintaining that many SVGs for equivalent bundle cost (only icons
  actually imported ship).
- **Motion**: GSAP (`gsap` 3.15.x, `@gsap/react` 2.1.x, from npm, client components only) drives
  the homepage opening chapter through `gsap.matchMedia` and a scrubbed `ScrollTrigger` over a
  CSS sticky stage. The paper grain is raw WebGL (no library). Smaller reveals still use native
  `IntersectionObserver` (`RevealOnScroll.tsx`) + CSS transitions. Everything renders its
  finished state without JS or with reduced motion — see `docs/design-system.md` section 6.
  GSAP licence: the standard no-charge licence was checked and recorded 2026-10-27 for
  `gsap` 3.15.x (see the launch checklist below).

## Folder Structure

```
src/
  app/            # routes, layout, metadata, generated icon/OG image, sitemap/robots
    api/          # assessment, subscribe, problem route handlers
  components/
    layout/       # Navbar, MobileNav, Footer
    sections/     # reusable page sections (Capabilities, Faq, FinalCta, forms, ...)
    story/        # homepage story: OpeningChapter, StoryMotion (GSAP), GrainCanvas (WebGL),
                  # ProblemStory (pick-your-mess + problem box island), HowWeWork,
                  # NewsletterInline, ConceptApp, LegacyHashRedirect
    visuals/      # the hand-built SVG/CSS diagrams + the RevealOnScroll primitive
    ui/           # Button, Card, Badge, Container, Section, SectionHeading, Logo
  lib/
    constants.ts  # site name/url, CTA hrefs + labels
    analytics.ts  # trackEvent -> window.dataLayer (no vendor connected)
    seo.ts        # Organization / WebSite / FAQPage JSON-LD builders
    content/      # typed content arrays (nav, capabilities, process, solutions, techStack,
                  # agencyComparison, faq, agencyFaq, leadMagnet, industries, assessment,
                  # story, opening, headaches)
```

## Content Model

Section copy that's list-like (capability cards, process steps, solution examples, tech
categories, agency comparison lists) lives in `src/lib/content/*.ts` as typed arrays. Section
components under `src/components/sections/` are thin `.map()` renderers over that data. **To edit
copy, edit the content file — not the component JSX**, unless the change is structural.

## Visual System

The palette, type scale, motion rules and component rules come from `docs/design-system.md`,
which is the visual source of truth (redesigned 2026-10; the logo is unchanged). Implementation
notes:

- Warm paper surface (`--color-surface`), ink text, a logo-derived teal accent. Tokens are named
  by role in the `@theme` block of `src/app/globals.css` (surface, ink, line, accent, inverse
  variants), not by colour.
- `components/ui/Section.tsx` applies the `light` / `raised` / `dark` tone plus the section
  spacing rhythm, so sections don't repeat background/padding classes.
- Components that render on both tones (`Button`, `Card`, `SectionHeading`) take an `onDark` prop
  that maps to the inverse tokens.
- Motion is end-state-first: base CSS is the finished page; `html.motion` (added by an inline
  script in `src/app/layout.tsx` before first paint) holds every start state.

## Routing

Six routes: `/` (the story homepage), `/what-we-can-build`, `/portfolio`, `/for-agencies`,
`/discovery-call`, `/about`. Nav items (`src/lib/content/nav.ts`) mix the one remaining homepage
anchor (written as an absolute path, `/#how-we-work`, so it resolves from other routes too) with
real routes. Navbar/MobileNav/Footer render on every route and use `next/link` throughout.
Homepage anchors: `#problem` (the problem box, also the header button's target and the
footer's "Contact"), `#how-we-work`, and `#faq`. `/#solutions` and `/#what-we-do` no longer
exist on the homepage; `LegacyHashRedirect` forwards old bookmarks to `/what-we-can-build`.

Homepage order (`src/app/page.tsx`, `docs/landing-page.md`): Opening chapter → Pick your mess →
How we work → Problem box (with checklist fallback) → short FAQ.

### `/what-we-can-build`

Relocated homepage content: Capabilities (three pillars), the six concept examples (labelled
Concept), Industries, and the closing band. In `sitemap.ts`. It is the destination of the
"See What We Can Automate" CTA.

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
  `areaServed: Australia`), `WebSite`, and `FAQPage` mirroring the homepage's visible FAQ subset (four questions; the same list feeds
  both, see `docs/seo.md` §49)
  (agency FAQ items are not in the sitewide `FAQPage` schema, since they're scoped to
  `/for-agencies` — see `docs/seo.md` §48). No reviews, ratings, awards, locations, employee
  counts or certifications are declared (§19), and no Australian address/office is claimed (§17)
  — see `docs/trust-and-claims.md` for the live register.
- Geographic transparency: the Philippines/international-delivery line now appears in the footer
  and `/about` (previously only documented internally in `docs/seo.md` §17, never shown on the
  site) — see `docs/australian-market.md`.
- `sitemap.ts` lists all six routes (`/`, `/what-we-can-build`, `/portfolio`, `/for-agencies`,
  `/discovery-call`, `/about`) — previously only listed `/`, missing even the pre-existing `/portfolio`; fixed as
  part of this pass (`docs/seo.md` §47).
- Descriptive internal anchor text on capability cards, e.g. "Explore AI integration" rather than
  "Learn more".

## CTA / Contact Handling

`src/lib/constants.ts`'s `CTA_HREFS`/`CTA_LABELS` centralize every CTA — see
`docs/conversion-strategy.md` for the full hierarchy table. As of 2026-10:

- **Tell us your problem** (primary) → `/#problem`, the Navbar/MobileNav button on every page.
- **Book a Free Automation Assessment** (secondary) → `/discovery-call`; offered in the problem
  box's success view and on inner pages' closing band.
- **See What We Can Automate** → `/what-we-can-build`. **View Case Studies** → `/portfolio`.
- **Partner With Us** (agency) and the **Email Us Directly** fallback remain `mailto:` links to
  `info@apprisingcreatives.com` (`CONTACT_EMAIL`) — no scheduling tool exists yet for either.

Swapping the mailto CTAs for a real scheduling tool (Calendly/Cal.com) or a `/contact` route
remains a one-file change in `constants.ts`.

## Problem Route

The homepage problem box (`src/components/story/ProblemStory.tsx`) posts JSON to
`src/app/api/problem/route.ts`: `name`, `email`, `problem`, an optional `headache` key (must be
one in `src/lib/content/headaches.ts`) and a hidden honeypot `company_website`. The server
validates name (up to 100 characters), email, and problem (10 to 2,000 characters). A send is
only reported as successful when the founder has been notified, so the order is fixed:

1. **Email the founder** through Resend's REST API (plain `fetch`, no new package): name, email,
   headache, the full problem text, reply-to set to the visitor. If this fails the route returns
   502 and makes no Kit call; the visitor sees the failure message with their text kept.
2. **Record the contact in Kit**: upsert the subscriber with `first_name` and the custom fields
   `problem` and `problem_headache` (never `biggest_challenge`), then link it to
   `KIT_PROBLEM_FORM_ID`. Kit failures after a sent email are logged server-side, not shown to the
   visitor, because the founder already has the message. The email also keeps every repeat send,
   which a single Kit field cannot.

The route also limits each IP to 5 valid sends per 10 minutes (`src/lib/rateLimit.ts`, answered with
429 and `Retry-After`). That limiter is in-memory per server instance, so on Vercel it only slows a
scripted flood; the launch checklist below adds a firewall rule for a hard cap.

A filled honeypot gets a success-shaped response with no email or Kit call, and is logged so a
wrongly trapped real visitor shows up in the logs. If the Resend env vars are unset the route
returns 503. All calls are server-side, so the CSP is unaffected. CAPTCHA and per-IP rate limiting
were considered and not built; revisit if Kit fills with junk contacts or logs show repeated sends
from one source.

After a successful send the box stores `{ name, email, problem }` in `sessionStorage` under
`ac:problem-handoff`; `AssessmentForm.tsx` reads it once, fills its fields and deletes the key.
Nothing goes in the URL.

Env vars (see `.env.example`): `RESEND_API_KEY`, `PROBLEM_NOTIFY_TO`, `PROBLEM_NOTIFY_FROM`,
`KIT_PROBLEM_FORM_ID`, plus the shared `KIT_API_KEY`.

### Launch checklist (the founder does these before the redesign goes live)

- [ ] **Resend**: create an account, verify a sending domain (DNS records on that domain), create
  an API key with sending access.
- [ ] Set `RESEND_API_KEY`, `PROBLEM_NOTIFY_TO` (the inbox that receives sends) and
  `PROBLEM_NOTIFY_FROM` (a sender on the verified domain, e.g. `Apprising Creatives
  <hello@yourdomain>`) in the hosting environment.
- [ ] **Kit**: create a third, separate form for problem sends and set `KIT_PROBLEM_FORM_ID`.
- [ ] **Kit custom fields**: create `problem` and `problem_headache` with exactly those keys
  (Kit rejects unknown field keys).
- [ ] **One live test send** through the production site: confirm the email reaches the founder's
  inbox with a working reply-to, the contact appears in Kit with both fields, and the success view
  and assessment pre-fill behave. Until this passes, the "a real person reads every message"
  claim stays UNVERIFIED in `docs/trust-and-claims.md`.
- [ ] **Vercel firewall rate limit**: in the project's Firewall, add a rate-limit rule on
  `POST /api/problem` (for example 10 requests per minute per IP) so a flood is stopped before it
  reaches the route, Resend or Kit.
- [ ] **GSAP licence**: the no-charge standard licence was checked and recorded 2026-10-27 for
  `gsap` 3.15.x; recheck on a major version bump or if the site's use changes.
- [ ] **Analytics**: create a GA4 property, copy its Measurement ID (`G-…`) into
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel (Production), and redeploy. Until the ID is set nothing
  loads and events record nothing. In GA4, mark `problem_submitted` and `discovery_call_clicked`
  as key events. Add a privacy policy before or with this: the site has none yet, and GA sets
  cookies and collects visitor data.

## Assessment Funnel

`/discovery-call` (`src/app/discovery-call/page.tsx`) hosts the intake form
(`src/components/sections/AssessmentForm.tsx`, a client component) described in
`docs/conversion-strategy.md`. After a problem send, the form arrives pre-filled (name, email and
the problem in the biggest-challenge field) from `sessionStorage`; with nothing stored it is blank. It posts to `src/app/api/assessment/route.ts`, which makes **two**
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

Unlike the newsletter, this funnel is built around a human reviewing submissions rather than an
automated email, so if call 2 (linking to the form) fails, that's treated as non-fatal: as long as
call 1 (creating the subscriber with all their answers) succeeds, the visitor sees the normal
success message and `formLinked: false` is only logged server-side. In that case the lead is
still in Kit with all its fields, just not linked to the assessment form. Verified live
2026-09: both calls succeed.

## Analytics

Google Analytics 4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
(`src/components/analytics/GoogleAnalytics.tsx`, rendered in `src/app/layout.tsx`). With the ID set,
`next.config.ts` adds Google's script, image and connect origins to the CSP; without it the CSP is
unchanged and no third-party script loads. Google signals and ad personalisation are turned off.
`src/lib/analytics.ts` exports `trackEvent(name, data?)`, which sends through `gtag` when it exists,
falls back to `window.dataLayer` if a tag manager made one, and no-ops otherwise. See
`docs/conversion-strategy.md`'s Analytics Events section for the event list.

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

**Why two calls, in this order**: `POST /v4/forms/{id}/subscribers` returns 404 unless the
subscriber already exists (confirmed by Kit support 2026-09 — an early version of this route
called it first and looked like a Kit bug; it wasn't). If the form-link call fails anyway, the
route still succeeds and returns `{ ok: true, formLinked: false }`; `Newsletter.tsx` then shows
`NEWSLETTER_COPY.delayedMessage` ("we've got your email — the checklist is on its way shortly")
rather than claiming the checklist was sent, since the incentive email won't fire without the
link. Verified live 2026-09: both calls succeed and `formLinked` is `true`.

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
a cost this site still avoids for its marketing pages even though it now has three forms
(newsletter, assessment, problem): both post via client-side `fetch` to same-origin API routes rather than
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
- **Kit forms/checklist not fully configured yet** — `KIT_API_KEY`, `KIT_FORM_ID`,
  `KIT_ASSESSMENT_FORM_ID` and `KIT_PROBLEM_FORM_ID` are all unset in this repo (see "Problem
  Route", "Newsletter / Lead Magnet" and "Assessment Funnel"). The checklist PDF content, the
  custom fields and the forms' Kit-side automations still need to be created in the Kit dashboard,
  and the Resend values need setting (launch checklist under "Problem Route").
- **Analytics property** — the code is wired for GA4 but needs the founder's Measurement ID in
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`; until then events no-op. A privacy policy is also still needed.
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

`KIT_API_KEY`, `KIT_FORM_ID`, `KIT_ASSESSMENT_FORM_ID`, `KIT_PROBLEM_FORM_ID`, `RESEND_API_KEY`,
`PROBLEM_NOTIFY_TO` and `PROBLEM_NOTIFY_FROM` (see `.env.example`) are required only for the
newsletter, assessment and problem forms to work; the rest of the site needs no
environment variables. `SITE_URL` in `constants.ts` is the real, live domain
(`https://www.apprisingcreatives.com`) — it previously carried a stale "placeholder" comment from
before the domain went live; that comment is fixed as part of this pass.
