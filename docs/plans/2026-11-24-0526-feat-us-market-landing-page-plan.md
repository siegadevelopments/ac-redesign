---
title: US Market Landing Page - Plan
type: feat
date: 2026-11-24
topic: us-market-landing-page
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-plan-bootstrap
execution: code
---

# US Market Landing Page - Plan

## Goal Capsule

- **Objective:** A US business owner who finds Apprising Creatives sees a page that is clearly for them, can tell us their problem as easily as an Australian visitor can, and the founder can see which leads came from the US, while the Australian homepage stays as sharp as it is today.
- **Means:** A single `/us` landing page that reuses the existing problem-box send path and page primitives (KTD1, KTD2), with a region tag on each send (KTD3).
- **Product authority:** This Product Contract. `docs/trust-and-claims.md` is the authority on every factual claim; `docs/offers.md` is the authority on pricing.
- **Stop conditions:** Stop and ask if a change would alter the Australian homepage's pitch, add a factual trust claim without a row in `docs/trust-and-claims.md`, or add a dependency.
- **Who finishes:** `ce-work` implements and verifies the units. The founder confirms the USD figures and the time-zone wording (Dependencies) before the page goes live.

---

## Product Contract

### Summary

Add one `/us` landing page with US spelling, a short set of outcomes, indicative USD pricing, an honest Philippines and time-zone note, a US FAQ, and the same three-field problem box as the homepage. Tag problem sends with a region. Widen the footer and About disclosure to "Australia and the US". Update the sitemap, metadata, structured data and the docs that currently treat Australia as the only market.

### Problem Frame

The site is built for Australian SMEs, down to the homepage kicker, spelling and the AUD price on `/discovery-call`. A US owner who lands on it will assume it isn't for them. Rewriting the homepage for both markets would blunt the Australian pitch that the 2026-09 repositioning depends on, and the two audiences want different things: US spelling, USD pricing, and a straight answer about working across time zones from the Philippines.

There is also no way today to tell where a lead came from by country. Without that, the founder cannot judge whether the US page works.

### Key Decisions

- **Homepage stays Australia-led; the US gets its own page.** Governs R1, R3. (session-settled: user-directed — chosen over a dual-market hero and a region-neutral hero: a specific pitch converts better than a generic one for both markets)
- **First version is one landing page.** Governs R1, Scope Boundaries. (session-settled: user-directed — chosen over a landing page plus US industry pages and a full US mirror: smallest test of whether the US converts)
- **`/us` carries an indicative USD price range.** Governs R2. (session-settled: user-approved — the scoping synthesis proposed USD figures derived from the AUD ladder in `docs/offers.md`; the user confirmed. This relaxes the "price only on `/discovery-call`" rule in `docs/offers.md` for `/us`, recorded in the docs unit)

### Requirements

**The page**

- R1. `/us` exists with a US-spelled hero, a short outcomes section, an honest "Built in the Philippines" and time-zone note, a US FAQ, the problem box, and a closing band that offers the free assessment.
- R2. `/us` shows an indicative USD range for an implementation project and for a care plan, labelled indicative and "confirmed after the assessment", with figures the founder has approved.
- R3. The Australian homepage's pitch, hero and sections are unchanged by this work, and `/us` is not added to the primary nav.

**Sending a problem from `/us`**

- R4. The problem box on `/us` has the same three fields, honeypot, rate limit and success behaviour as the homepage, including the follow-up offer of the free assessment.
- R5. On `/us`, the header and mobile "Tell us your problem" buttons and the footer "Contact" link go to `/us#problem`, not the Australian homepage.

**Attribution**

- R6. Every problem send carries a region (`au` or `us`). It appears in the founder notification email and in the `problem_submitted` and `problem_failed` analytics events. A missing or unknown region is treated as no region, never as a failure.

**Disclosure and claims**

- R7. The footer and About page say "Built in the Philippines. Serving businesses in Australia and the US." in place of the current "internationally, including Australia" wording.
- R8. No new factual trust claim ships without a verified row in `docs/trust-and-claims.md`. The page makes no SOC 2, HIPAA or other certification claim, and describes security only through the existing engineering-practice line.

**Discoverability and docs**

- R9. `/us` has its own title, description, canonical URL, sitemap entry, `en-US` hreflang pairing with the homepage's `en-AU`, and a FAQPage schema that mirrors its visible FAQ. The Organization schema's `areaServed` lists both countries.
- R10. `docs/australian-market.md`, `docs/brand.md`, `docs/seo.md`, `docs/offers.md`, `docs/trust-and-claims.md`, `docs/conversion-strategy.md`, `docs/project-context.md` and `docs/target-audience.md` are updated where they treat Australia as the only market.

### Acceptance Examples

- AE1. **Covers R4, R6.** Given a visitor on `/us`, when they send a problem, the founder's email includes `Region: United States`, and a send from the homepage includes `Region: Australia`.
- AE2. **Covers R3, R5.** Given a visitor on the homepage, the header button still goes to `/#problem`. Given a visitor on `/us`, it goes to `/us#problem`, and so do the hero and closing-band buttons.
- AE3. **Covers R2, R8.** Given `/us` is viewed, every dollar figure reads as USD and indicative, and no sentence implies a compliance certification or live US business-hours support.

### Success Criteria

- The founder can filter leads by region from the notification email alone, with no dashboard change.
- A reviewer reading the Australian homepage and `/us` side by side finds no US wording in the homepage's pitch, hero or body sections (the shared footer disclosure and the footer link to `/us` are the only intended differences), and no Australian-only framing on `/us`.

### Scope Boundaries

- Outside this plan: US industry pages, a full US mirror of the site, region auto-detection or redirects, UK content.
- Inferred scope bets (cheap to reverse): `/us` skips the pick-your-mess chapter in v1; `/us` is reachable from the footer and from search, not the primary nav.

#### Deferred to Follow-Up Work

- A `region` custom field in Kit. It needs the field created in the Kit dashboard first, and an unknown field could fail the subscriber call.
- Region on the assessment form and region-aware pricing on `/discovery-call`. Until then a US visitor who books the assessment sees the AUD range there, labelled AUD.

---

## Planning Contract

### Key Technical Decisions

- KTD1. **`/us` is its own composition built from existing primitives, not a re-skin of the homepage components.** It uses `PageHero`, `Section`, `Container`, `SectionHeading`, `Card`, `Faq` and `FinalCta`, with all US copy in one new content file. The homepage story sections hardcode Australian wording (`src/lib/content/opening.ts`, `PILES` in `src/lib/content/story.ts`), so reusing them would mean threading a copy switch through every one. (session-settled: user-approved — the call-out proposed reusing existing sections with a US copy layer; planning narrowed this to reusing primitives and the problem box, not the story chapters)
- KTD2. **`ProblemStory` gains two optional props, `region` (default `au`) and `showPick` (default `true`), rather than being split into two components.** Its pick chapter and problem box share one state object (`prefill`), so splitting touches the homepage's working send path for no gain. With `showPick={false}`, the whole pick-your-mess section is skipped (radios, `ConceptApp` and its `/#problem` button), the headache stays unset, and the problem-box section keeps its `id="problem"` and behaves as a plain three-field form. The existing copy has nothing Australia-specific in the box itself, so no copy override is needed.
- KTD3. **Region is a two-value allowlist sent in the existing `/api/problem` JSON, written into the notification email and analytics only.** Kit is untouched (see Deferred). The route ignores any other value. This keeps the send path's success condition (founder email) unchanged.
- KTD4. **The header CTA becomes pathname-aware.** `Navbar` and `MobileNav` are already client components, so they read `usePathname()` and swap `CTA_HREFS.tellUsProblem` for `/us#problem` when on `/us`. A shared helper in `src/lib/constants.ts` owns the mapping. `Footer` stays a server component; only its Contact link moves into a small client component that calls the same helper. Chosen over a nav prop because the layout renders these once for every route.
- KTD5. **US figures and time-zone wording live as named constants in `src/lib/content/us.ts`.** The founder has to approve them, and a single place makes that a one-line edit. Figures are rounded, indicative conversions of `docs/offers.md`, never presented as a separate price list.
- KTD6. **The US block is wrapped in `lang="en-US"`.** The root layout sets `lang="en-AU"`, and per-page `<html lang>` isn't available, so the wrapper keeps spelling and screen-reader pronunciation consistent.

### Assumptions

- The repo has no test runner; verification is `npm run lint`, `npm run typecheck`, `npm run build` and browser checks.
- Time-zone wording is a commitment about how the team works, in the same class as the agency-overlap row already in `docs/trust-and-claims.md`, so it needs a new row and founder confirmation.
- The root `AGENTS.md` warns that this Next.js version differs from training data; the implementer reads the relevant guide under `node_modules/next/dist/docs/` before touching metadata (`alternates.languages`) or `usePathname`.

### Sources and Research

- Problem-send path: `src/app/api/problem/route.ts`, `src/components/story/ProblemStory.tsx`, `src/lib/content/story.ts` (`PROBLEM_BOX_COPY`).
- Page pattern to follow: `src/app/for-agencies/page.tsx` (`PageHero`, `Faq` with custom props, `FinalCta`).
- Disclosure sites: `src/components/layout/Footer.tsx`, `src/app/about/page.tsx`.
- SEO surface: `src/lib/seo.ts` (`areaServed: Australia`), `src/app/sitemap.ts`, `src/app/layout.tsx` (`lang="en-AU"`, Australia keywords).
- Doc conflicts found: `docs/seo.md` §3 names the UK, not the US, as the secondary market; `docs/offers.md` limits price display to `/discovery-call`.

---

## Implementation Units

### U1. Region on problem sends

- **Goal:** Tag every problem send with a region and surface it in the email and analytics.
- **Requirements:** R6, R4.
- **Dependencies:** none.
- **Files:** `src/lib/constants.ts` (add `Region` type and the region-aware CTA href helper), `src/components/story/ProblemStory.tsx` (`region`, `showPick` props; region in payload and analytics), `src/app/api/problem/route.ts` (validate and write `Region:` line), `src/lib/analytics.ts` (no new event; payload only).
- **Approach:** Follow KTD2 and KTD3. The default `au` keeps every existing homepage call unchanged. Leave Kit calls as they are.
- **Test scenarios:** (manual and request-level; no runner)
  - POST with `region: "us"` returns the same status as before and the Resend body contains `Region: United States`.
  - POST with `region: "au"` or no region: homepage sends still succeed; email shows `Region: Australia` or omits the line for a missing value.
  - POST with `region: "uk"` or a non-string: ignored, send succeeds.
  - Homepage send, pick-your-mess prefill and the assessment handoff behave exactly as before.
- **Verification:** lint, typecheck; inspect the outgoing email body in dev with a stubbed or test Resend key.

### U2. `/us` page and US content

- **Goal:** Ship the landing page.
- **Requirements:** R1, R2, R4, R8, R9 (page metadata and FAQ schema).
- **Dependencies:** U1.
- **Files:** `src/app/us/page.tsx`, `src/lib/content/us.ts` (hero, outcomes, pricing constants, Philippines and time-zone note, `US_FAQ_ITEMS`).
- **Approach:** Follow KTD1, KTD5 and KTD6, modelled on `src/app/for-agencies/page.tsx`. Sections in order: `PageHero`, outcomes (three to four, written as business results, not tech), pricing note, Philippines and time-zone note, `ProblemStory region="us" showPick={false}`, `Faq` with the US items and its schema, `FinalCta` offering the free assessment. Each outcome is a specific before-and-after for a US owner (for example, a form re-typed into three systems becoming one entry), not a uniform feature card. Every button on the page is wired explicitly: the hero and closing-band primary buttons use the KTD4 helper and go to `/us#problem`, and the `FinalCta` secondary is set explicitly instead of left at its Australian-default value. Use the existing security line, not a new one. US spelling throughout. No invented clients, metrics or testimonials.
- **Test scenarios:**
  - Page renders with JavaScript disabled, including the `noscript` email fallback in the box.
  - Reduced-motion: no required content depends on animation.
  - Mobile at 375px: no horizontal scroll, hero and box readable.
  - Every dollar figure is labelled USD and indicative; no "guaranteed", certification or business-hours promise appears.
  - The FAQPage JSON-LD questions match the visible FAQ exactly.
- **Verification:** lint, typecheck, build; browser pass at 375px and desktop.

### U3. Region-aware navigation and disclosure

- **Goal:** Keep US visitors on `/us` and widen the disclosure.
- **Requirements:** R3, R5, R7.
- **Dependencies:** U2.
- **Files:** `src/components/layout/Navbar.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/layout/Footer.tsx`, a new small client component for the footer Contact link in `src/components/layout/`, `src/lib/content/nav.ts` (footer link to `/us`), `src/app/about/page.tsx`.
- **Approach:** KTD4. Keep `Footer` a server component and render the Contact link through the new client component. Add a footer link to `/us`; do not add it to `NAV_LINKS`. Footer and About use the exact approved sentence.
- **Test scenarios:**
  - On `/`, the header and mobile CTAs go to `/#problem`; on `/us`, to `/us#problem`.
  - Footer "Contact" follows the same rule; the footer disclosure reads "Australia and the US" on every route.
  - The About heading and body no longer say only "serving Australia", and still state the company isn't Australian-incorporated.
  - Skip-link and keyboard focus on the header still work.
- **Verification:** lint, typecheck; click-through in the browser on both routes.

### U4. Discoverability and structured data

- **Goal:** Make `/us` findable and correctly paired with the homepage.
- **Requirements:** R9.
- **Dependencies:** U2.
- **Files:** `src/app/sitemap.ts`, `src/lib/seo.ts` (`areaServed` for both countries), `src/app/us/page.tsx` (canonical, `alternates.languages`), `src/app/layout.tsx` (homepage `en-AU` alternate if the metadata API needs it).
- **Approach:** Read the installed Next.js metadata docs first. `alternates` is shallow-merged per page and `layout.tsx` already sets `canonical: "/"`, so `/us` declares its own `canonical` and `languages`, and the homepage's `en-AU` entry must not leak to other routes through the layout. Keep `seo.ts`'s rule of declaring only supportable facts: no US address or office.
- **Test scenarios:**
  - `/sitemap.xml` lists `/us`.
  - Page source shows `hreflang` `en-AU` and `en-US` pointing at each other, and a self-canonical on `/us`.
  - Organization JSON-LD validates with two `areaServed` countries and no address.
- **Verification:** build, then inspect rendered head and JSON-LD.

### U5. Documentation and claims register

- **Goal:** Bring the docs in line, and add the register rows before the page ships.
- **Requirements:** R8, R10, R2.
- **Dependencies:** drafted alongside U2; finalised last.
- **Files:** `docs/trust-and-claims.md`, `docs/australian-market.md`, `docs/brand.md`, `docs/seo.md`, `docs/offers.md`, `docs/conversion-strategy.md`, `docs/project-context.md`, `docs/target-audience.md`.
- **Approach:** Add register rows for the widened disclosure (VERIFIED, founder-confirmed 2026-11-24 via the brainstorm), the time-zone commitment and the USD figures (both UNVERIFIED until the founder confirms). Update `docs/seo.md` §3 so the US is a secondary market. Add a short US section to `docs/australian-market.md` (spelling, USD, no HIPAA framing). Relax `docs/offers.md`'s price-display rule to include `/us`. Add the `region` payload to the analytics section of `docs/conversion-strategy.md`. Do not silently contradict `CLAUDE.md`, which still says "Australian businesses"; flag it for the founder rather than editing it.
- **Test scenarios:** Test expectation: none — documentation. Review check: every factual claim on `/us` maps to a register row.
- **Verification:** read each edited doc against the shipped copy.

---

## Verification Contract

| Gate | Command or check | Applies to |
|---|---|---|
| Lint | `npm run lint` | all units |
| Types | `npm run typecheck` | all units |
| Build | `npm run build` | U2, U3, U4 |
| Browser | `/us` and `/` at 375px and desktop, JS off, reduced motion | U2, U3 |
| Send path | A test send from `/us` and from `/` with the notification email inspected | U1 |
| Claims | Every sentence on `/us` traced to a register row | U2, U5 |

## Definition of Done

- All five units' scenarios pass, and AE1 to AE3 hold.
- The homepage's pitch, hero and body sections are visually and behaviourally unchanged for an Australian visitor; only the shared footer disclosure and footer link differ.
- `docs/trust-and-claims.md` has a row for each new claim, and every one is VERIFIED before `/us` goes live. The USD figures and time-zone note are launch requirements, so the page does not ship with them held back.
- No dead-end code or abandoned experiments remain in the diff.

## Risks and Dependencies

- **Founder approval needed before launch:** the USD figures and the time-zone wording (KTD5). Until then they stay UNVERIFIED and the page does not ship.
- **Resend and Kit configuration:** unchanged. A broken Resend setup still fails the send visibly, as today.
- **Mixed currency:** a US visitor who books the assessment sees the AUD range on `/discovery-call` (deferred above); it is labelled AUD, so it is confusing but not misleading.
- **Doc drift:** `CLAUDE.md` and several docs name Australia as the only market; U5 covers the docs, `CLAUDE.md` needs the founder's decision.
