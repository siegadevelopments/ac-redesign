# Apprising Creatives — Case Studies

## Where case studies live

There is no separate `/case-studies` route. The existing `/portfolio` page **is** the case
studies page — its nav label is "Case Studies" (see `docs/project-context.md`), but the URL
stays `/portfolio` since it's already live and indexed; renaming it would break an existing
inbound link path for no SEO benefit. If a second real client case study is added later, revisit
whether a dedicated `/case-studies` index page is warranted — one item doesn't need one.

Content lives in `src/lib/content/portfolio.ts`. Each entry is labeled `client` or `internal`
(rendered via `Badge`) — never blur the two.

## Lifestyle Medicine Gateway

- **Kind**: real client engagement (`client`).
- **Industry**: Wellness / Health.
- **Commercial relationship**: ongoing, AUD 500/month (website development, maintenance, and
  digital platform improvements). This figure is internal business context for our own
  planning — **do not publish it** on the site; a client's fee arrangement is not ours to
  disclose without separate agreement.
- **Public status**: can be publicly referenced **subject to the client's actual approval**.
  Until that approval is confirmed in writing, keep the page to only what's already published
  on the client's own live site (the current approach — see `src/lib/content/portfolio.ts`'s
  comment).

### Case study structure (apply once expanded, only with real/approved content)

- **Challenge** — what problem the client had. Only state what the client has confirmed or
  what's independently verifiable from their public site.
- **What We Built** — what Apprising actually delivered. Match `portfolio.ts`'s `features`
  list; do not add capabilities that weren't actually shipped.
- **Outcome** — only include if a real, verifiable, client-approved metric exists (e.g. "launched
  in production," not "increased conversions 40%" unless that number is real and approved).
  If no verified outcome exists, omit the field — do not fill it with a vague placeholder.
- **Client Testimonial** — only ever a real quote with the client's explicit approval to publish
  it under their name. No testimonial exists today; none should be added until one is obtained.

## MediFlow

- **Kind**: internal product (`internal`), not a case study.
- **Status**: no paying users. Never imply otherwise — no "customers," "clients," or usage
  metrics for MediFlow anywhere on the site.
- Stays framed as a demonstration of engineering/AI capability (clinic scheduling, intake,
  AI-assisted documentation), not as proof of market traction.

## Proof Requirements (before adding any new case study)

A new entry may only be added to `portfolio.ts` / the case studies page when **all** of the
following are true:

1. The work is real and delivered (not a concept — concepts belong in
   `src/lib/content/solutions.ts`, clearly badged "Concept").
2. The client has approved being named publicly, in writing.
3. Every fact stated (features, scope, outcome) is verifiable — either published on the
   client's own site, or confirmed directly by the client for this use.
4. Any testimonial is a real quote, approved by the client for this specific use.

## Absolute Rules (see also CLAUDE.md "Do not invent")

Never fabricate, for any case study:

- Testimonials
- Metrics (hours saved, revenue increase, conversion lift, etc.)
- Client counts or "customers served"
- Ratings or awards
- Security incidents avoided
- Compliance/certification claims

If a claim cannot be verified, it does not appear — see `docs/trust-and-claims.md` for the
verification register covering the whole site, not just case studies.
