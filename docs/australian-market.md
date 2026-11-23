# Apprising Creatives — Australian Market Positioning

## Geographic Transparency

Apprising Creatives serves the Australian market but is **not** an Australian-incorporated
company. `docs/seo.md` §3/§17 already establishes this internally: Apprising targets Australia
while operating from the Philippines. This must be stated plainly in visible copy, not just
avoided-by-omission — implying local incorporation through silence is still misleading.

Approved framing (footer + About page):

> Built in the Philippines. Serving businesses in Australia and the US.

Do not:

- Claim or imply Australian incorporation, a local office, or a local address.
- Use `.com.au` styling, Australian business-registration language (ABN, ACN), or Australian
  flag imagery in a way that implies local incorporation.
- Bury the disclosure so deep (e.g. only in a legal footer nobody reads) that it functions as
  concealment rather than transparency. It belongs in the footer and the About page, in normal
  body copy.

## Target Market

Primary: Australian small and medium-sized businesses, 10–100 employees, founder/owner/MD/CEO/
operations-leader as the buyer. See `docs/target-audience.md` for the full ICP.

Secondary (unchanged, moved off the homepage to `/for-agencies`): Australian digital, AI,
automation, and software agencies needing engineering capacity.

## US Market (added 2026-11)

The US is a second market, served by one landing page, `/us` (`src/app/us/page.tsx`,
copy in `src/lib/content/us.ts`). The homepage stays Australia-led; do not dilute its hero.

- **Spelling:** US spelling on `/us` (wrapped in `lang="en-US"`); Australian spelling everywhere else.
- **Pricing:** indicative USD ranges, rounded from the AUD ladder in `docs/offers.md`, shown only
  on `/us` and always labelled indicative. The founder approves the figures before launch.
- **Time zones:** the Philippines overlaps US business hours far less than Australian ones. `/us`
  says so plainly and promises no named hours or live support (`docs/trust-and-claims.md`).
- **Claims:** no US office, address or incorporation statement; no SOC 2, HIPAA or other
  certification. Security is described only through the existing engineering-practice line.
- **Attribution:** problem sends carry a `region` (`au` or `us`), shown in the founder email and
  the problem analytics events.
- **Region banner:** a visitor whose country (from Vercel's `x-vercel-ip-country` header, read by
  `/api/region`) is the other market is offered a dismissible link to that page: a US visitor on
  `/` is offered `/us`, and an Australian visitor on `/us` is offered `/`. It never redirects
  (that would risk search ranking, shared links and travellers), appears after the page loads so
  the pages stay static, and is remembered once accepted or dismissed.
- **Assessment pricing:** links from `/us` (and the US auto-reply email) go to
  `/discovery-call?region=us`, where the pricing sentence shows the USD range instead of AUD. Anyone
  else, including a US visitor who arrives without the link, sees the AUD range, which is labelled AUD.
- **Not built yet:** US industry pages, a US mirror of the site, and a Kit `region` field.

## Industries Being Tested

The site tests five verticals rather than committing to one, per the original brief — see
`src/lib/content/industries.ts`:

1. Healthcare & Wellness
2. Logistics
3. Tourism & Hospitality
4. Education
5. Professional Services

None of these should read as deep, credentialed vertical expertise unless it's real. Copy
should stay at the level of "we understand this kind of operational problem," not "we're
healthcare software specialists."

## Healthcare & Privacy — Special Care

Healthcare is one of the five test verticals, and it's the one with the highest regulatory
stakes. Rules specific to it:

- **Never** claim or imply compliance with Australian healthcare privacy regulation (e.g. the
  Privacy Act 1988, the My Health Records Act, or state-level health records legislation) unless
  a specific delivered system has actually been assessed and built to meet it.
- Do not reference HIPAA as a relevant standard for an Australian audience — it's a US law.
  If US-influenced security practices are mentioned (see below), frame them as general secure
  engineering practice, not as "HIPAA compliance."
- MediFlow (clinic management concept) and the "AI-Enabled Clinic Platform" solution concept are
  both explicitly conceptual/internal — see `docs/case-studies.md` — and must not carry implied
  regulatory compliance claims.

## Security Messaging (supporting, not primary — see `docs/brand.md`)

> Automation without security is just another risk.

Describe security as engineering practice, not certification:

- Secure authentication
- Access control / least privilege
- Secure API design
- Data protection in transit and at rest
- Logging and monitoring
- Secure development practices

Never claim a formal compliance certification (SOC 2, ISO 27001, HIPAA) unless one is actually
held — see `docs/trust-and-claims.md`.

## Spelling & Terminology

Use Australian/British spelling in copy aimed at the Australian market (the assessment funnel,
industry pages, homepage) without overdoing it into parody:

- optimise, not optimize
- organisation, not organization
- personalised, not personalized
- colour, behaviour, centre — apply the same pattern where the word occurs naturally

Code identifiers, file names, and CSS/Tailwind tokens keep their existing US spelling (e.g.
`optimize` isn't renamed inside class names or variable names) — this rule governs visible copy
only, not code.

## Things Apprising Must NOT Claim (cross-reference `docs/trust-and-claims.md`)

- Australian incorporation or a local office/address (and no US office, address or incorporation either)
- Any compliance certification not actually held
- An uptime/SLA figure not actually contracted
- Client counts, ratings, or awards that don't exist
- Deep specialist expertise in any one vertical, until that's actually true
