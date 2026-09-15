# Apprising Creatives — Offers

Source of truth for the productized sales ladder referenced by `docs/conversion-strategy.md`
and implemented on `/discovery-call` and the homepage. Update this file first if pricing or
scope changes — the site must never contradict it.

## 1. Free Business Automation Assessment

Entry point. Free, low-friction, no obligation.

- Format: a 20-minute call.
- Goal: identify where manual work, spreadsheets, or disconnected tools are costing the
  business time, and whether automation, custom software, or AI is actually justified.
- Explicitly does **not** promise: guaranteed savings, a fabricated ROI figure, or a fixed
  quote on the call itself.
- Captured via the intake form on `/discovery-call` (see `docs/conversion-strategy.md` §Funnel
  and `docs/project-context.md`'s "Assessment Funnel" section for the technical implementation).
- CTA label: **Book a Free Automation Assessment** (primary, sitewide). Contextual variant used
  once on the homepage: **Find Out What You Could Automate**.

## 2. Automation Implementation

Typical project range: **AUD $5,000–$15,000+**.

Display this range only on `/discovery-call`, where a visitor has already expressed intent —
not on the homepage or service cards (avoid pricing everywhere).

Representative scope (from `src/lib/content/solutions.ts`, labeled "Concept" — not delivered
work unless it becomes a named case study):

- Automated quotation system
- Booking & scheduling system
- Internal business dashboard
- Workflow automation between existing tools
- AI-powered business process (document handling, enquiry triage, etc.)
- Custom internal business system / platform

Scope boundary: a single implementation project is scoped to one workflow or system, not a
full digital transformation program. Larger scopes are quoted individually after the
assessment call — never estimated sight-unseen on the website.

## 3. Business Systems Care Plan

Recurring service. Target: **AUD $1,000/month**, scoped per client after implementation.

Potential inclusions (offer only what is actually delivered for a given client — do not imply
every inclusion applies to every plan):

- Hosting / infrastructure monitoring
- System monitoring
- Bug fixes
- Security updates
- AI/API monitoring (where the delivered system uses AI or third-party APIs)
- Small improvements
- Technical support
- Optimization
- Priority support

**Do not claim a specific SLA** (response time, uptime percentage) unless one is actually
contracted for that client. The current care-plan relationship (Lifestyle Medicine Gateway,
AUD 500/month for website development, maintenance, and platform improvements — see
`docs/case-studies.md`) has no formal SLA; the site must not imply otherwise.

## 4. Agency Partnership (separate ladder)

Not part of the SME ladder above — a distinct commercial relationship documented in
`docs/brand.md`'s "Agency Partnership Position" and implemented on `/for-agencies`.
Agencies are billed per engagement/retainer negotiated directly, not through this productized
ladder. CTA: **Partner With Us**.

## Upsell Path

```
Free Assessment
      ↓ (if automation/software is justified)
Automation Implementation (one project, $5k–$15k+)
      ↓ (once the system is live)
Business Systems Care Plan (~$1,000/mo, scoped to what was built)
```

A visitor is never asked to commit past the Assessment on first contact — the implementation
scope and Care Plan terms are only discussed after the call, once the actual problem is
understood. This mirrors the Process philosophy already documented in `docs/landing-page.md`:
"We recommend the simplest solution that solves the problem."

## Pricing Display Rules

- The **only** place indicative pricing appears is `/discovery-call` (implementation range) and
  this document (Care Plan target).
- Always label ranges as "typical" or "indicative" — never a quote.
- Never state a price for a specific named client (e.g., the AUD 500/month Lifestyle Medicine
  Gateway figure is internal business context, not public site copy).
