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
