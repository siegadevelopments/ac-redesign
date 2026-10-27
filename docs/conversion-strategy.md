# Apprising Creatives — Conversion Strategy

## CTA Hierarchy (sitewide, fixed — avoid changing CTA wording unnecessarily)

Labels and destinations live in `src/lib/constants.ts` (`CTA_LABELS`, `CTA_HREFS`).

| Priority | Label | Destination | Used in |
|---|---|---|---|
| Primary | **Tell us your problem** | `/#problem` (the homepage problem box) | Navbar and mobile nav on every page; the homepage story ends at the box |
| Secondary | **Book a Free Automation Assessment** | `/discovery-call` | The success view after a problem send; `/discovery-call` itself; the closing band (`FinalCta`) on inner pages |
| Exploration | **See What We Can Automate** | `/what-we-can-build` | Anywhere a visitor wants to see what is buildable before describing a problem |
| Tertiary | **View Case Studies** | `/portfolio` | Closing band, How We Work chapter ("See a real project we built") |
| Agency (separate ladder) | **Partner With Us** | `mailto:` (unchanged) | `/for-agencies` only |
| Fallback | **Email Us Directly** | `mailto:` (unchanged) | Footer, form error states, the no-JS problem box |
| Low-key fallback | **Business Systems Audit Checklist** signup | Kit newsletter form | A quiet "Not ready to talk yet?" line beside the problem box |

Why the problem box leads: a cautious SME owner has little reason to commit to a call before
picturing their own business running better. Describing a problem is lower friction; the
assessment is the deeper commitment offered once they have sent one.

The former contextual variant "Find Out What You Could Automate" no longer exists; the homepage
no longer has the Problem-section checklist it lived in.

## Funnel

```
Homepage story: the mess becomes one system → pick your mess → how we work
   ↓
Problem box (#problem): name, email, problem   ← primary action
   ├─ Not ready → Business Systems Audit Checklist signup (newsletter)
   ↓
Send succeeds → "A real person will read this and reply" + Book a Free Automation Assessment
   ↓
/discovery-call (details pre-filled from the send) → human reviews the answers
   ↓
20-minute call: Discover → Diagnose → is software/AI justified?
   ↓
   ├─ Not justified → honest "no" (see below) — still a trust win, not a dead end
   └─ Justified → Implementation proposal ($5k–$15k+, see docs/offers.md)
         ↓
      Business Systems Care Plan (~$1,000/mo, once live)
```

Visitors can also reach `/discovery-call` directly (from an inner page's closing band, or a
link) and fill the full assessment without sending a problem first.

Agencies run a **parallel, separate funnel**: homepage → `/for-agencies` → Partner With Us
(`mailto:`). They never enter the funnel above — see the "Agency positioning" note in
`docs/project-context.md`.

## Problem Box Intake

Fields (`src/components/story/ProblemStory.tsx`, copy in `src/lib/content/story.ts`), all
required, nothing else:

- Name (up to 100 characters)
- Email
- Your problem (10 to 2,000 characters)

Plus, not shown to visitors: the picked headache key (`jobs`, `quotes`, `invoices`, `messages`,
`timesheets`, `stock`, `something-else`; `src/lib/content/headaches.ts`) and a hidden honeypot
field. Picking a headache in "pick your mess" writes a starter sentence into the problem field
until the visitor edits it (any edit, including clearing, stops later picks from touching the
text); "Something else" leaves the field empty. The technical flow is in
`docs/project-context.md`'s "Problem Route" section.

## Post-Submission

**Problem box.** A send only counts as successful when the founder has been emailed (see the
route's order of operations in `docs/project-context.md`). On success the visitor sees "Got it. A
real person will read this and reply", and a **Book a Free Automation Assessment** button. On
failure their text stays in the form and they are told to try again or email
`info@apprisingcreatives.com`. Without JavaScript the box shows an email link instead of a form.

**Assessment pre-fill handoff.** After a successful send the box stores name, email and problem
in `sessionStorage` (key `ac:problem-handoff`). `AssessmentForm.tsx` reads it once on mount,
fills name, email and the biggest-challenge field with the problem, then deletes the key. Nothing
goes in the URL. If storage is blocked or empty the form is simply blank, as before.

**Assessment.** Thank the visitor and set expectations for what happens next (a human reviews
the answers and reaches out to schedule the call — this is **not** an instant AI-generated
report; see `docs/trust-and-claims.md` for why we don't claim the assessment itself is
AI-authoritative).

## Why "the assessment might say no" is part of the pitch

`docs/landing-page.md`'s Process section already documents "not every problem needs AI, not
every workflow needs custom software" as a trust-building device. The Assessment funnel makes
the same promise concrete: the call can conclude that no build is justified. This is stated
explicitly on `/discovery-call` — removing it would make the Assessment read as a disguised
sales pitch, which undermines the credibility this whole strategy depends on.

## Assessment Intake Form

Fields (see `src/lib/content/assessment.ts` for exact copy):

- Name (required)
- Business (required)
- Email (required)
- Biggest operational challenge (required — the core qualifying field)
- Website (optional)
- Industry (optional, free text — verticals are still being tested, not a fixed dropdown)
- Approximate team size (optional)
- Current systems/tools (optional)
- What they wish they could automate (optional)

Kept to one screen, no multi-step wizard — "keep friction low" per the original brief. Technical
delivery mechanism (Kit custom fields + tag) is documented in `docs/project-context.md`'s
"Assessment Funnel" section, not here — this file is strategy, not implementation.

## Analytics Events

Provider-agnostic (pushed to `window.dataLayer` if present — see `src/lib/analytics.ts` and
`docs/project-context.md`'s "Analytics" section). **No analytics tool is connected yet**, so
`trackEvent` records nothing in production. Until one is, the interim measure of success is Kit
subscriber counts: problem sends (the problem form) compared with assessment requests (the
assessment form).

- `headache_picked` — a pick-your-mess choice. Payload: `{ headache }` (the key)
- `problem_submitted` — a send that succeeded. Payload: `{ headache, edited }` (`headache` is
  `"none"` if no pick; `edited` says whether the visitor changed the pre-filled text)
- `problem_failed` — a send that failed (validation, server or network). Same payload
- `discovery_call_clicked` — any assessment CTA click. Payload: `{ source }` where set; the
  post-send offer uses `source: "problem_success"`, which measures post-send assessment bookings
- `assessment_started` — first interaction with the `/discovery-call` form
- `assessment_completed` — successful submission
- `contact_form_submitted` — newsletter or assessment form success (a `form` property
  distinguishes which)
- `case_study_viewed` — `/portfolio` page view
- `proposal_request` — reserved for when a real proposal/quote flow exists; not fired anywhere
  yet, since none exists
- `partner_with_us_clicked` — the agency mailto CTA

No payload carries name, email or problem text. No event fires with fabricated or placeholder
data — an event only fires on the real user action it names.
