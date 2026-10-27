# Landing Page Specification

> **2026-10 redesign.** The homepage is now a short scroll story in AIDA chapters, not a stack
> of standard sections. It replaces the 2026-09 eleven-section layout (Hero, Problem,
> Capabilities, What We Can Build, Process, Industries, Engineering Capability, Why Apprising,
> Newsletter, FAQ, Final CTA). The content cut from the homepage was relocated, not lost: see
> `/what-we-can-build` below. Earlier context: `docs/brand.md` and `docs/target-audience.md` for
> why the homepage leads with SMEs; agencies live on `/for-agencies`.

## Primary Objective

A growing Australian SME owner lands, thinks "this is something I can use to make my life
easier", and tells Apprising their problem.

Within the first few seconds the visitor should understand what Apprising Creatives does, who it
helps, what problem it solves, and what to do next.

## CTA Hierarchy

See `docs/conversion-strategy.md` for the full table. Summary:

- Primary: **Tell us your problem** → the problem box at `/#problem`
- Secondary: **Book a Free Automation Assessment** → `/discovery-call` (offered after a send)
- Exploration: **See What We Can Automate** → `/what-we-can-build`
- Tertiary: **View Case Studies** → `/portfolio`

## Page Composition (`src/app/page.tsx`)

Server components render all copy; the client pieces only add motion and interactivity. Every
chapter is complete without JavaScript or with reduced motion (see the end-state-first rule in
`docs/design-system.md`). A skip link before the story jumps to `#problem`.

Order: Opening chapter → Pick your mess → How we work → Problem box (with the checklist
fallback) → short FAQ → Footer. The navbar sits above, with "Tell us your problem" as its
button on every page.

### 1. Opening chapter: the mess becomes one system (Attention)

`OpeningChapter` + `StoryMotion` + `GrainCanvas`; copy in `src/lib/content/opening.ts`.

Job: show recognisable SME mess (spreadsheets, sticky notes, receipts, texts, emails, calendar
clashes) gathering into one concept app on a phone as the visitor scrolls, while the headline
moves from the problem ("Your business is spread across a hundred places.") to the promise
(the page's single `h1`: "Everything important, where you can actually find it."). Finished
state: the problem line as supporting copy, the headline, the lede, the phone showing the
"Today" overview, and the mess shown as "What it replaces". The phone is labelled **Concept**.

### 2. Pick your mess (Interest and Desire)

`ProblemStory` (client island); copy and concept screens in `src/lib/content/story.ts`, headache
keys in `src/lib/content/headaches.ts`.

Job: let the visitor pick the one headache closest to theirs (Jobs, Quotes, Invoices, Messages,
Timesheets, Stock, or Something else). The concept app beside the list shows how that part of
the business could work in one simple system. The pick carries into the problem box as a starter
sentence (not shown anywhere as a client example). All app contents are labelled **Concept**
with the note "An illustration of the idea, not a live product or real client data."

### 3. How we work (`#how-we-work`)

`HowWeWork`, rendered inside the island between the pick and the box.

Job: state the honest approach. Headline "We don't start with technology.", the unchanged trust
notes ("Not every problem needs AI.", "Not every workflow needs custom software.", "We
recommend the simplest solution that solves the problem."), "you don't need new software at
all" as an honest possible answer, the five steps (Discover, Diagnose, Design, Build,
Optimise), and a link to the real case study on `/portfolio`. Any timeline shown elsewhere
(e.g. on `/discovery-call`) must stay labelled indicative.

### 4. Problem box (`#problem`) (Action)

Job: take name, email and the problem, all required, nothing else. Pre-filled from the pick
unless the visitor has typed their own text. One plain security line sits near the box, with no
certification implied. Beside it, a quiet fallback: "Not ready to talk yet?" with the Business
Systems Audit Checklist signup. After a successful send: confirmation that a real person will
read and reply, plus the offer to book the free automation assessment with details carried over.
On failure the text stays and the contact email is shown. Without JavaScript: an email link
instead of a form. The flow and intake fields are in `docs/conversion-strategy.md`; the route
is in `docs/project-context.md`.

### 5. FAQ

A four-question subset of `src/lib/content/faq.ts`: "Do I need custom software?", "What business
processes can be automated?", "How much does business automation cost in Australia?" and "How
do you handle security?". The same list feeds the `FAQPage` structured data (`docs/seo.md`).
Answers stay visible (not collapsed).

## Relocated content: `/what-we-can-build`

Capabilities (three pillars: Business Automation, Custom Business Systems, AI Implementation),
the six "What we can build" concept examples (still labelled Concept and not client case
studies), Industries (five verticals being tested) and the closing band. Hash links
`/#solutions` and `/#what-we-do` were repointed here; `LegacyHashRedirect` forwards old bookmarks
to `/what-we-can-build`. The Engineering Capability grid is on `/for-agencies`; the former "Why
Apprising" homepage section is gone, and the founder-led and security story lives on `/about`.

## Navigation

Logo, What We Can Build, How We Work (`/#how-we-work`), Case Studies, For Agencies, About, and
the button "Tell us your problem". Footer "Contact" links to `/#problem`.

## SEO Intent

See `docs/seo.md` §8 (existing clusters) and §46 (new SME-intent themes). Do not keyword stuff;
write naturally for humans first.
