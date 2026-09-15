# Apprising Creatives — Conversion Strategy

## CTA Hierarchy (sitewide, fixed — see `design-system.md` §37 "avoid repeatedly changing CTA
wording unnecessarily")

| Priority | Label | Destination | Used in |
|---|---|---|---|
| Primary | **Book a Free Automation Assessment** | `/discovery-call` | Navbar, Hero, Final CTA, mobile nav |
| Secondary | **See What We Can Automate** | `#solutions` (homepage) | Hero, Capabilities |
| Tertiary | **View Case Studies** | `/portfolio` | Final CTA, Capabilities area |
| Agency (separate ladder) | **Partner With Us** | `mailto:` (unchanged) | `/for-agencies` only |
| Fallback | **Email Us Directly** | `mailto:` (unchanged) | Footer, form error states |

A contextual variant of the primary CTA — **"Find Out What You Could Automate"** — is used once,
inline in the Problem section's recognition checklist, to make the entry point feel like a
direct response to the problem just described. It links to the same `/discovery-call` route; it
is not a separate offer or a new global constant.

## Funnel

```
Homepage (SME-first)
   ↓
Recognizes their own problem (Problem section checklist)
   ↓
Sees what's actually buildable (What We Can Build / Services)
   ↓
Books the Free Automation Assessment  →  /discovery-call
   ↓
20-minute call: Discover → Diagnose → is software/AI justified?
   ↓
   ├─ Not justified → honest "no" (see below) — still a trust win, not a dead end
   └─ Justified → Implementation proposal ($5k–$15k+, see docs/offers.md)
         ↓
      Business Systems Care Plan (~$1,000/mo, once live)
```

Agencies run a **parallel, separate funnel**: homepage → `/for-agencies` → Partner With Us
(`mailto:`). They never enter the Assessment funnel above — see the "Agency positioning" note in
`docs/project-context.md`.

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

## Post-Submission

Thank the visitor and set expectations for what happens next (a human reviews the answers and
reaches out to schedule the call — this is **not** an instant AI-generated report; see
`docs/trust-and-claims.md` for why we don't claim the assessment itself is AI-authoritative).

## Analytics Events

Provider-agnostic (pushed to `window.dataLayer` if present — see `src/lib/analytics.ts` and
`docs/project-context.md`'s "Analytics" section for why no vendor is wired in yet):

- `assessment_started` — first interaction with the `/discovery-call` form
- `assessment_completed` — successful submission
- `discovery_call_clicked` — any primary CTA click sitewide
- `contact_form_submitted` — newsletter or assessment form success (event name distinguishes
  which via a `form` property)
- `case_study_viewed` — `/portfolio` page view
- `proposal_request` — reserved for when a real proposal/quote flow exists; not fired anywhere
  yet, since none exists
- outbound CTA click — `partner_with_us_clicked` for the agency mailto CTA

No event fires with fabricated or placeholder data — an event only fires on the real user
action it names.
