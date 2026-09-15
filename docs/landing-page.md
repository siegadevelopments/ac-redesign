# Landing Page Specification

> **2026-09 repositioning note.** This is a substantial revision, not a from-scratch rewrite —
> most sections below are the same components with updated copy/content, not new components. See
> `docs/brand.md` and `docs/target-audience.md` for why the homepage now leads with SMEs instead
> of agencies. The "For Agencies" section (formerly §7) moved to its own page, `/for-agencies` —
> see `docs/conversion-strategy.md`.

## Primary Objective

Generate qualified Business Automation Assessment bookings from Australian SME visitors.

The visitor should understand within the first few seconds:

1. What Apprising Creatives does
2. Who it helps
3. What problem it solves
4. What to do next

## CTA Hierarchy

See `docs/conversion-strategy.md` for the full table. Summary:

- Primary: **Book a Free Automation Assessment** → `/discovery-call`
- Secondary: **See What We Can Automate** → `#solutions`
- Tertiary: **View Case Studies** → `/portfolio`

## Landing Page Sections

### 1. Navigation

* Logo
* What We Do
* What We Can Build
* How We Work
* Case Studies
* For Agencies
* About
* Book a Free Automation Assessment

### 2. Hero

Headline:

> Your business runs on systems. We make them work smarter.

Supporting copy:

> We help Australian businesses eliminate repetitive work, replace manual processes, and build
> custom systems using automation, AI, and modern software.

CTA:

Book a Free Automation Assessment

Secondary CTA:

See What We Can Automate

Visual direction: unchanged — `HeroSystemVisual`, a system/workflow visualization, no robots or
generic AI imagery (`docs/design-system.md` §18/§34).

### 3. Problem (expanded — absorbs what would otherwise be a separate "Transformation" section)

Headline (unchanged, still strong):

> Your business has grown. Your systems haven't.

Keeps the existing two paragraphs, then adds a **"Does this sound familiar?"** recognition
checklist:

* Your team copies information between systems.
* Quotes take hours or days to prepare.
* Bookings are spread across email, phone, spreadsheets and forms.
* Managers wait for reports instead of seeing information in real time.
* Employees spend valuable time doing work software should handle.

Closes with an explicit before/after line next to the existing `ProblemConnectVisual` (which
already visualizes scattered tools converging into one connected system — no new visual needed):

> Manual, disconnected tools → one connected system that does the repetitive work for you.

Contains the one contextual use of **"Find Out What You Could Automate"** as inline link text
into `/discovery-call` — see `docs/conversion-strategy.md`.

### 4. Capabilities — reframed to three pillars

Headline (unchanged):

> From business problems to working systems.

Three services, not four (the former fourth card, "Managed Application Support," is now the
**Business Systems Care Plan** — a recurring offer documented in `docs/offers.md`, not a
homepage capability card):

* Business Automation
* Custom Business Systems
* AI Implementation

### 5. What We Can Build (formerly "Solutions" — same component/section, renamed and re-scoped)

Headline:

> What we can build.

Six use-case concepts, industry-neutral (supports multi-vertical testing per
`docs/target-audience.md`):

* Automated Quotation System
* Booking & Scheduling System
* Internal Business Dashboard
* Workflow Automation
* AI Business Assistant
* Custom Business Platform

Still explicitly labeled "Concept," still carries the existing disclaimer that these are not
client case studies (`docs/case-studies.md` covers where the real one lives).

### 6. Process — steps renamed, philosophy unchanged

Headline (unchanged):

> We don't start with technology.

Steps (renamed to match the original brief; same five-step shape and philosophy as before):

1. Discover
2. Diagnose
3. Design
4. Build
5. Optimise

Unchanged trust notes:

> Not every problem needs AI.
>
> Not every workflow needs custom software.
>
> We recommend the simplest solution that solves the problem.

Any timeline shown elsewhere (e.g. on `/discovery-call`) must be labeled indicative — no fixed
delivery promises.

### 7. Industries (new)

Headline:

> Industries we're working with.

Five verticals being tested (`docs/target-audience.md`, `docs/australian-market.md`):
Healthcare & Wellness, Logistics, Tourism & Hospitality, Education, Professional Services. Kept
deliberately light — one sentence each, no claimed deep specialization. Healthcare copy avoids
any compliance/privacy claim not actually true (`docs/australian-market.md`).

### 8. Engineering Capability (unchanged)

Organized by Backend / Frontend / AI / Integration / Infrastructure, per
`docs/design-system.md` §25. Still industry-neutral proof of technical capability, still avoids
a meaningless logo wall.

### 9. Why Apprising (trimmed, links out to `/about`)

Headline (unchanged):

> Technical capability without the complexity of building an internal team.

Keeps the existing four-reason grid as a compact mid-page trust beat, but no longer duplicates
the fuller founder-led/security/international story — that now lives on the dedicated `/about`
page, linked from here ("Learn more about us").

### 10. Newsletter / Lead Magnet (unchanged from the prior addition)

"The Business Systems Audit Checklist" — a lower-commitment alternative to the Assessment, for
visitors not ready to book a call. See `docs/project-context.md`'s "Newsletter / Lead Magnet"
section.

### 11. FAQ

Headline (unchanged):

> Common questions.

Content updated per `docs/seo.md` §48 — SME/automation questions only; the two purely
agency-specific questions moved to a `/for-agencies`-scoped FAQ list. Answers stay visible (not
collapsed) to support `FAQPage` structured data.

### 12. Final CTA

Headline:

> Let's find the work your business shouldn't be doing manually.

CTA:

Book a Free Automation Assessment

Secondary: View Case Studies.

## Section Order

Hero (dark) → Problem (light, expanded) → Capabilities (dark, 3 pillars) → What We Can Build
(dark) → Process (light) → Industries (dark) → Engineering Capability (light) → Why Apprising
(white) → Newsletter (dark) → FAQ (light) → Final CTA (dark) → Footer (dark).

"For Agencies" is no longer in the homepage rhythm — it's the entire content of `/for-agencies`.

## SEO Intent

See `docs/seo.md` §8 (existing clusters) and §46 (new SME-intent themes). Do not keyword stuff;
write naturally for humans first.
