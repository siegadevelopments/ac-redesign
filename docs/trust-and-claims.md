# Apprising Creatives — Trust & Claims Register

Every factual trust claim on the live site must be tracked here as **VERIFIED**, **UNVERIFIED**,
or **REMOVE**. Nothing ships in the "REMOVE" state. This register was created during the
2026-09 SME-acquisition rebuild after an explicit audit of the codebase found **no fabricated
claims already present** — see the audit note at the bottom. Its job now is to stop new
fabricated claims from creeping in later.

## Register

| Claim | Where | Evidence | Status | Action |
|---|---|---|---|---|
| "We build the systems behind better businesses" / positioning statements | Sitewide | Founder-authored positioning, not a factual/verifiable claim | N/A | Keep — opinion/positioning, not a fact requiring evidence |
| Lifestyle Medicine Gateway is a real client | `/portfolio`, case study copy | Live client site, active engagement | VERIFIED | Keep. Do not add outcome metrics or a testimonial until the client explicitly approves specific wording — see `docs/case-studies.md` |
| MediFlow has no paying users / is internal-only | `/portfolio` | Direct founder knowledge | VERIFIED | Keep the "Internal Product" badge; re-audit this row the moment MediFlow gets a first paying user |
| Apprising serves Australian businesses, operates internationally (Philippines) | Footer, About, Hero eyebrow | `docs/seo.md` §3/§17 already documents this; founder-confirmed | VERIFIED | Surface it explicitly in visible copy (previously only in an internal SEO note) — done as part of this rebuild |
| Apprising is Australian-incorporated | — | No such claim made anywhere | N/A | Must **never** be added — see `docs/australian-market.md` |
| Any uptime %, SLA figure | — | No formal SLA exists for any client today | N/A | Must **never** be added unless a real SLA is contracted; if added later, this row must specify which client/plan it applies to |
| SOC 2 / HIPAA / ISO or any compliance certification | — | None held | N/A | Must **never** be claimed. Security practices may be described (see `docs/australian-market.md` Security section) but never framed as a certification |
| Client ratings (e.g. "4.9/5"), client counts (e.g. "50+ businesses"), awards | — | None exist | N/A | Must **never** be added |
| Team size / composition | About page | Founder-confirmed: founder/BD, technical co-founder, graphics designer, junior developer | VERIFIED | Describe honestly as a small, founder-led team — never imply a larger org |
| "A real person reads every message and replies by email" | Homepage problem box intro and send confirmation (`src/lib/content/story.ts`) | A commitment, not a past fact: it holds only while the founder reads each notification email and replies. Every send emails the founder first and fails visibly if that email cannot be sent, so the site never reports a send nobody was notified of | VERIFIED 2026-10-29: a test send from the production site reached the founder's inbox via Resend (an earlier local send on 2026-10-27 also passed). It now stays a commitment (owner: founder) | Live test passed. Keep it true: monitor the `PROBLEM_NOTIFY_TO` inbox and reply. If that stops being possible, soften the copy before leaving the claim live. Do not add reply-time promises ("within 24 hours") without a row here |
| Homepage security line: "Every system we build uses secure authentication, access control and secure API design as standard practice. We don't hold formal compliance certifications, and we say so." | Homepage, beside the problem box (`PROBLEM_BOX_COPY.securityLine`); same wording as the security FAQ answer | Engineering practice approved in `docs/australian-market.md` (Security Messaging), founder-authored; explicitly disclaims certifications | VERIFIED as practice, not certification | Keep. Never extend to a compliance, audit, data-residency or "bank-grade" claim |
| Concept app on the homepage (phone screen, pick-your-mess views) | Homepage opening chapter and "pick your mess" | Illustrative screens written for the site; no client, figure, testimonial or rating appears. Each is labelled **Concept** with "An illustration of the idea, not a live product or real client data." | N/A (labelled illustration) | Keep the Concept label on every screen. Never add real-looking client names, counts or numbers |
| Privacy policy statements: we do not sell details; analytics never receives name, email or problem text; Google advertising features are off; providers (Vercel, Resend, Kit, Google Analytics) may process data outside Australia | `/privacy` (`src/app/privacy/page.tsx`) | Code: `trackEvent` payloads carry only keys and flags (`src/lib/analytics.ts`, `ProblemStory.tsx`); `allow_google_signals` and ad personalisation are off in `GoogleAnalytics.tsx`; the providers listed are the only services the routes call | UNVERIFIED legal review: a founder-written summary of real behaviour, not legal advice, and it claims no privacy-law compliance | Have the founder read it, and consider a lawyer's review before relying on it with healthcare clients. Update it in the same change as any new data collection or provider. Retention wording is deliberately vague; set a real retention period when one exists |

## Audit Note (2026-09)

Before this rebuild, a full-codebase grep for common fabricated-trust patterns (`SOC2`, `HIPAA`,
`uptime`, `SLA`, `rating`, client-count phrasing, `award`, `certified`) returned **zero matches**
in any component, content file, or previously shipped doc. `docs/seo.md` §19 already explicitly
forbade declaring reviews, ratings, awards, locations, employee counts, or certifications in
structured data, and `src/lib/seo.ts`'s JSON-LD builders were already written to that rule. The
"remove fabricated claims" instruction in the original brief was therefore already satisfied —
this register exists to keep it that way going forward, not to clean up an existing violation.

## Process for Adding Any New Claim

1. Add a row to the table above **before** the claim ships, not after.
2. State the evidence in the "Evidence required" sense — what would make this true, and where
   that evidence lives (a client email, a signed testimonial release, a contracted SLA document).
3. Status starts as **UNVERIFIED** until that evidence actually exists, then flips to
   **VERIFIED**. A claim ships only once its row says VERIFIED.
4. If evidence can't reasonably be obtained, the status is **REMOVE** and the claim does not
   ship, full stop — replace it with a true, more modest statement instead (see
   `docs/brand.md`'s "words to use / avoid").
