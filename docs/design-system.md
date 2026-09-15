# Apprising Creatives — Design System

## 1. Purpose

This document defines the visual language, typography, color system, spacing, components, interaction patterns, animation principles, and responsive behavior for the Apprising Creatives website.

This document is the **visual source of truth** for the project.

When implementing or modifying UI:

1. Follow this document first.
2. Follow the existing project's technical conventions second.
3. Do not introduce new visual patterns without a clear reason.
4. Keep the interface visually consistent across all sections.

The design should communicate:

> Technical precision with human warmth.

The website should feel like a serious technology partner, not a generic AI agency.

---

# 2. Brand Personality

The visual identity should communicate:

* Premium
* Technical
* Intelligent
* Trustworthy
* Modern
* Precise
* Calm
* Human
* International
* Engineering-focused

The design should make a potential client think:

> "These people understand technology and can actually deliver."

---

# 3. Target Audience

> **2026-09 repositioning override.** The original brief made agencies primary. The homepage was
> restructured to lead with SMEs instead — see `docs/target-audience.md` for the full,
> current ICP and the reasoning. Agencies remain a real secondary profile, served by their own
> page (`/for-agencies`) rather than the homepage. The lists below are kept for reference but
> read "primary"/"secondary" as reversed from how they're written.

Primary audience (homepage):

### Growing Australian SMEs

Typical decision makers:

* Founder
* Owner
* CEO
* Managing Director
* Operations leader

They need:

* Automation
* Internal systems
* Custom software
* AI integration
* Workflow improvements
* System integration

Secondary audience (`/for-agencies`):

### Australian digital, AI, automation, and software agencies

Typical decision makers:

* Founder
* CEO
* Managing Director
* Technical Director
* CTO
* Head of Delivery

They need:

* Reliable engineering capacity
* Custom software development
* AI implementation
* API integrations
* Automation engineering
* Backend/frontend development
* Technical delivery support

The design must therefore prioritize **B2B credibility over visual novelty**.

---

# 4. Core Design Concept

## Technical Precision + Human Warmth

The interface combines:

* Deep dark surfaces
* Clean typography
* Restrained electric blue accents
* Generous whitespace
* Precise grids
* Subtle borders
* Product/system visualizations
* Purposeful motion

The website should look engineered rather than decorated.

---

# 5. Color System

> **Override — accent color.** Sections 5, 6, 15, and 19 below specify "Electric Blue" (`#3B82F6`)
> / "Bright Blue" (`#60A5FA`) as the accent. The implementation uses **Teal** instead —
> `#0C9488` (base) / `#14B8A6` (light/hover) — to match the actual logo (`public/logo.png`), which
> is teal-to-blue, not solid blue. `#14B8A6` is essentially the exact logo pixel color (sampled at
> `#12BAB9`); `#0C9488` is a darker shade in the same hue, chosen for usable text/button contrast.
> Everywhere below that says "Electric Blue" or "Bright Blue," read "Teal" and "Teal Light."
> Token names in code are `--color-teal` / `--color-teal-light` (`src/app/globals.css`). See §41
> for the full rationale.

## Primary Colors

### Deep Navy

```text
#0B1220
```

Primary dark background.

Use for:

* Hero
* Major dark sections
* Navigation
* Agency partnership section
* Footer
* High-impact CTA areas

---

### Navy Slate

```text
#111B2E
```

Secondary dark surface.

Use for:

* Cards
* Panels
* Interactive surfaces
* Code/system visualizations
* Dark section containers

---

### Soft White

```text
#F8FAFC
```

Primary light text.

Use for:

* Dark-background headings
* Important statements
* Navigation on dark backgrounds
* Primary content

---

### Cool Gray

```text
#A8B3C7
```

Secondary text on dark backgrounds.

Use for:

* Supporting copy
* Descriptions
* Metadata
* Secondary navigation

Do not use for important headings.

---

## Accent Colors

### Electric Blue

```text
#3B82F6
```

Primary brand accent.

Use for:

* Primary CTA buttons
* Important links
* Interactive states
* Selected states
* Key visual connections
* Small visual emphasis

---

### Bright Blue

```text
#60A5FA
```

Accent highlight.

Use for:

* Hover states
* Gradient-free highlights
* Small visual emphasis
* Important words in dark hero sections
* Active states

Do not use excessively.

---

## Light Surface

### Warm White

```text
#F7F8FA
```

Primary light section background.

Use for:

* Problem section
* Process section
* Light content sections
* Alternating page sections

---

## Dark Text

### Charcoal Navy

```text
#172033
```

Use for:

* Headings on light backgrounds
* Body text on light backgrounds
* Navigation on light surfaces

---

## Borders

### Slate

```text
#26344D
```

Use for:

* Dark cards
* Dividers
* Input borders
* Navigation boundaries
* System diagrams

Borders should remain subtle.

---

## Optional Status Color

### Success Green

```text
#34D399
```

Use sparingly for:

* Connected
* Active
* Deployed
* Operational
* Success states

Do not use green as a major brand color.

---

# 6. Color Usage Rules

The website should predominantly use:

```text
Deep Navy
Soft White
Warm White
Charcoal Navy
```

with Electric Blue used as an accent.

Accent usage should generally remain restrained.

### Do

* Use blue for important actions.
* Use blue to guide attention.
* Use blue to show system connections.
* Use blue for interactive states.

### Don't

* Make every heading blue.
* Make every card glow blue.
* Use blue gradients everywhere.
* Use purple/pink/cyan AI gradients.
* Turn the website into a "neon AI" aesthetic.

The accent should feel valuable because it is used selectively.

---

# 7. Typography

## Primary Display Font

### Manrope

Use for:

* H1
* H2
* H3
* Major statements
* Large numerical displays
* Hero messaging

Weights:

```text
700
800
```

Manrope provides the geometric, modern, technical personality of the brand.

---

# 8. Body Font

### Inter

Use for:

* Body copy
* Navigation
* Buttons
* Forms
* Labels
* Metadata
* Technical information
* Cards

Weights:

```text
400
500
600
```

Inter should be the primary UI and reading font.

---

# 9. Typography Scale

Desktop:

```text
Display / Hero:
64–80px
Weight: 700–800
Line height: 0.95–1.05

H1:
56–72px
Weight: 700–800

H2:
44–56px
Weight: 700

H3:
28–32px
Weight: 700

H4:
20–24px
Weight: 600–700

Body Large:
18–20px
Weight: 400
Line height: 1.6

Body:
16–18px
Weight: 400
Line height: 1.6

Small:
14px
Weight: 400–500

Label:
12–14px
Weight: 600
```

Mobile:

```text
Hero:
42–52px

H2:
34–40px

H3:
22–26px

Body:
16–18px
```

Typography should be fluid where appropriate.

Do not create excessive heading sizes simply for visual impact.

---

# 10. Typography Principles

Headlines should be:

* Short
* Direct
* Confident
* Outcome-oriented

Example:

> Build the systems behind a better business.

Avoid:

> Unlock the transformative power of cutting-edge AI technology to revolutionize your business.

The first is preferred.

---

# 11. Layout System

Use a consistent max-width container.

Recommended:

```text
max-width: 1200–1280px
```

with responsive horizontal padding.

Desktop:

```text
24–40px
```

Tablet:

```text
24–32px
```

Mobile:

```text
20–24px
```

Do not allow content to become excessively wide.

---

# 12. Grid

Use a structured grid.

Preferred:

```text
12-column desktop grid
8-column tablet grid
4-column mobile grid
```

Not every section must visibly use all columns.

The grid should create alignment between:

* Headlines
* Copy
* Cards
* CTAs
* Visualizations

---

# 13. Spacing System

Use a consistent spacing scale.

Preferred base unit:

```text
4px
```

Common spacing:

```text
4
8
12
16
20
24
32
40
48
64
80
96
120
160
```

Major sections should generally have:

```text
Desktop:
96–160px vertical spacing

Tablet:
80–120px

Mobile:
64–96px
```

Avoid excessive whitespace that separates related content unnecessarily.

---

# 14. Border Radius

Use restrained rounding.

Preferred values:

```text
Small:
8px

Cards:
12–16px

Large containers:
16–24px

Buttons:
8–10px
```

Avoid extremely rounded "pill everything" interfaces.

Pills may be used for:

* Tags
* Status
* Small metadata
* Category labels

---

# 15. Buttons

## Primary Button

Background:

```text
#3B82F6
```

Text:

```text
#FFFFFF
```

Example:

> Book a Discovery Call

Characteristics:

* Strong but not oversized
* 8–10px radius
* 14–16px horizontal padding
* 12–16px vertical padding
* Font weight 600

Hover:

Use:

```text
#60A5FA
```

or an equivalent subtle visual change.

Avoid:

* Excessive glow
* Large shadows
* Animated gradients

---

## Secondary Button

Dark section:

Transparent or subtle dark surface with a light border.

Light section:

White or transparent with a subtle dark border.

Example:

> Explore What We Build

Secondary buttons should visually remain secondary.

---

# 16. Cards

Cards should feel like product/system interfaces rather than generic marketing boxes.

Preferred:

```text
Background:
#111B2E on dark sections

Border:
#26344D

Radius:
12–16px
```

Cards should use:

* Clear title
* Short explanation
* Supporting metadata
* Optional icon or visual
* Optional interaction

Avoid:

* Huge icons
* Excessive shadows
* Random gradients
* Decorative blobs

---

# 17. Icons

Use icons only when they improve comprehension.

Icons should be:

* Simple
* Consistent
* Minimal
* Technical

Avoid mixing multiple icon styles.

Do not use icons merely to fill empty space.

---

# 18. Hero Design

The hero is the most important section.

Recommended structure:

Left:

```text
Eyebrow
Headline
Supporting copy
Primary CTA
Secondary CTA
Trust/capability microcopy
```

Right:

A system visualization.

The visual should communicate:

```text
Business
    ↓
Processes
    ↓
Automation
    ↓
AI
    ↓
Connected Systems
    ↓
Better Operations
```

Potential visual elements:

* Workflow nodes
* API connections
* Data flow
* System modules
* Dashboard fragments
* Automation steps

Avoid generic AI robots.

---

# 19. System Visualization Principles

Visualizations should communicate actual concepts.

For example:

```text
CRM
  │
  ├──── API ────┐
  │             │
Email          AI
  │             │
  └──────┬──────┘
         │
      Workflow
         │
      Dashboard
```

Visual connections may use Electric Blue.

Animation should be subtle.

Possible animations:

* Connection line drawing
* Node appearing
* Data moving between systems
* Small status indicators
* Gentle hover states

Avoid constant movement.

---

# 20. Section Rhythm

The landing page should alternate between visual densities.

Example:

```text
DARK
Hero

LIGHT
Problem

DARK
Capabilities

LIGHT
Process

DARK
Solutions

DARK / FEATURED
Agency Partnership

LIGHT
Engineering Capabilities

DARK
Final CTA

DARK
Footer
```

The transitions should feel intentional.

Avoid making every section visually identical.

---

# 21. Problem Section

Core message:

> Your business has grown. Your systems haven't.

Use visual storytelling.

Show:

```text
Spreadsheet
Email
CRM
Booking System
Accounting
Messaging
      ↓
Manual Work
      ↓
People become the integration layer
```

Then transition toward:

```text
Connected Systems
       ↓
Automation
       ↓
Better Visibility
       ↓
Scalable Operations
```

The section should make the visitor recognize their current situation.

---

# 22. Services Section

Primary service pillars:

### Custom Software

Build the software your business actually needs.

### AI Integration

Put AI inside real business workflows.

### Business Automation

Eliminate repetitive work between your systems.

### Managed Application Support

Keep your systems reliable as your business grows.

Each service should explain:

1. What it is
2. What problem it solves
3. Example applications

Do not turn the section into a technical feature list.

---

# 23. Process Section

Headline:

> We don't start with technology.

Process:

```text
01 Understand
02 Identify
03 Design
04 Build
05 Improve
```

Use visual continuity between steps.

Core philosophy:

> Not every problem needs AI.

> Not every workflow needs custom software.

> We recommend the simplest solution that solves the problem.

This is an important trust-building component.

---

# 24. Agency Partnership Section

This is a high-priority conversion section.

Headline:

> Sell the solution. We'll help build it.

Create a clear split:

### YOU HANDLE

* Client relationship
* Strategy
* Discovery
* Account management
* Commercial ownership

### WE HANDLE

* Technical architecture
* Software development
* Backend engineering
* APIs
* AI implementation
* Integrations
* Deployment
* Engineering support

Core message:

> Work with us as an extension of your delivery team.

CTA:

> Partner With Us

This section should visually feel more important than a normal service card.

---

# 25. Engineering Capability Section

Avoid a generic technology logo wall.

Group capabilities.

### Backend

Python
FastAPI
PostgreSQL
REST APIs

### Frontend

Next.js
React
TypeScript

### AI

LLM integrations
RAG
AI workflows
Document intelligence
AI agents

### Integrations

REST APIs
Webhooks
CRM integrations
Payment systems
Third-party platforms

### Infrastructure

Cloud deployment
Docker
CI/CD
Monitoring

Only display technologies that are actually supported by the team.

---

# 26. Motion Design

Motion should communicate:

* Flow
* Connection
* Progress
* Transformation
* System behavior

Motion should NOT communicate:

* "Look how many animations we can make."

Use animation sparingly.

Preferred:

* Fade
* Slide
* Scale
* Line drawing
* Node transitions
* Staggered entrances

Avoid:

* Excessive parallax
* Constant floating objects
* Large spinning elements
* Scroll-jacking
* Long entrance animations

---

# 27. Animation Timing

Typical:

```text
Micro interaction:
150–250ms

Component transition:
250–400ms

Section entrance:
400–700ms
```

Use natural easing.

Animations should never delay access to important information.

---

# 28. Reduced Motion

Always respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled:

* Disable decorative movement.
* Remove large transforms.
* Reduce transitions.
* Preserve content and functionality.

Motion must never be necessary to understand the website.

---

# 29. Responsive Design

The design must be created intentionally for:

### Mobile

Approximately:

```text
320–767px
```

### Tablet

Approximately:

```text
768–1023px
```

### Desktop

Approximately:

```text
1024px+
```

### Large desktop

Approximately:

```text
1440px+
```

Do not simply shrink desktop designs.

Mobile should have:

* Simplified navigation
* Stacked layouts
* Shorter copy where appropriate
* Touch-friendly controls
* Reduced visual complexity

---

# 30. Mobile Navigation

Use an accessible mobile menu.

Requirements:

* Keyboard accessible
* Screen-reader friendly
* Clear open/close state
* No horizontal overflow
* Large touch targets

Primary CTA should remain easy to access.

---

# 31. Accessibility

All components should follow accessibility best practices.

Requirements:

* Semantic HTML
* Proper heading hierarchy
* Accessible buttons
* Accessible links
* Keyboard navigation
* Visible focus states
* Appropriate color contrast
* Alt text for meaningful images
* Decorative images marked appropriately
* Form labels
* Reduced-motion support

Do not rely on color alone to communicate meaning.

---

# 32. Forms

Forms should remain simple.

Primary discovery form should not ask unnecessary questions.

Recommended fields:

* Name
* Email
* Company
* What are you looking to build or improve?
* Optional budget/timeline information

The form should feel approachable rather than like an enterprise procurement process.

---

# 33. Photography and Imagery

Do not rely heavily on stock photography.

Preferred visual language:

* Product interfaces
* System diagrams
* Workflow visualizations
* Abstract technical structures
* Real screenshots of actual products
* Genuine team photography when available

Never fabricate client screenshots or case studies.

---

# 34. AI Visual Language

Avoid the stereotypical AI visual language:

* Robot heads
* Human brains
* Neon purple gradients
* Circuit-board stock images
* Glowing holograms
* Generic "AI" imagery

AI should be represented through:

* Intelligent workflows
* Data processing
* Connected systems
* Contextual interfaces
* Automated decisions
* Document processing
* Information retrieval

The product/system should be the hero, not the word "AI."

---

# 35. Trust Signals

Use real trust signals only.

Possible signals:

* Technologies actually used
* Real projects
* Real case studies
* Real testimonials
* Real partnerships
* Founder/CTO information
* Security practices
* Years of experience if verifiable

Never invent:

* Client logos
* Testimonials
* Awards
* Certifications
* Revenue
* User counts
* Performance statistics

---

# 36. Content Hierarchy

Every section should answer one question.

Hero:

> What do you do?

Problem:

> Why should I care?

Capabilities:

> Can you solve my problem?

Process:

> How do you work?

Solutions:

> What can you actually build?

Agency section:

> Can you help my agency deliver?

Technology:

> Do you have the technical capability?

Why Apprising:

> Why should I trust you?

Final CTA:

> What should I do next?

---

# 37. Conversion Principles

The landing page should optimize for qualified conversations rather than maximum clicks.

Primary CTA:

> Book a Discovery Call

Secondary CTA:

> Explore What We Build

Agency CTA:

> Partner With Us

CTA language should remain consistent.

Avoid repeatedly changing CTA wording unnecessarily.

---

# 38. SEO-Friendly Design

The visual system must support semantic content.

Use:

* One primary H1
* Logical H2 sections
* Semantic section structure
* Descriptive link text
* Accessible navigation
* Proper metadata
* Structured data where appropriate

Do not sacrifice semantic HTML for visual effects.

---

# 39. Performance

Design decisions must consider performance.

Avoid:

* Heavy video backgrounds
* Huge unoptimized images
* Excessive JavaScript animation
* Large unnecessary dependencies
* Animation libraries when CSS is sufficient
* Unnecessary client-side rendering

Prefer:

* CSS transitions
* Optimized assets
* Lazy loading
* Responsive images
* Server-rendered content where appropriate
* Lightweight visual effects

---

# 40. Component Design Philosophy

Components should be reusable but not over-engineered.

Potential components:

```text
Navbar
Hero
Button
SectionHeader
CapabilityCard
WorkflowVisualization
ProcessStep
SolutionCard
AgencyPartnership
TechnologyGroup
TrustSignal
CTASection
Footer
```

Create components when they represent meaningful reusable UI concepts.

Do not create dozens of components for trivial markup.

---

# 41. Visual Consistency Rules

All sections should share:

* Typography
* Spacing scale
* Border treatment
* Button behavior
* Radius system
* Grid alignment
* Motion principles

Do not introduce a new visual language for individual sections without a strong reason.

---

# 42. What the Website Must NOT Look Like

Do not create:

* A generic SaaS template
* A generic AI agency template
* A Web3 website
* A cybersecurity-only website
* A startup landing page full of gradients
* A portfolio consisting only of screenshots
* A cheap outsourcing company
* A freelancer portfolio
* A "future of AI" marketing page

The final result should feel like a **premium engineering and business systems company**.

---

# 43. Design Success Criteria

The design succeeds if a visitor can understand within approximately 5–10 seconds:

1. Apprising builds software systems.
2. Apprising integrates AI and automation.
3. Apprising works with real businesses.
4. Apprising can work as an engineering partner for agencies.
5. There is a clear way to start a conversation.

The visual design should support these goals rather than compete with them.

---

# 44. Source of Truth

When visual decisions conflict:

1. Accessibility
2. Usability
3. Conversion clarity
4. This design system
5. Existing technical architecture
6. Decorative visual experimentation

Do not sacrifice usability or performance for visual effects.

When introducing a new recurring visual pattern, update this document so future implementation remains consistent.


---

# 41. Implementation Notes

Values the implementation had to derive because they aren't specified above. Update this section
if the design system later defines them explicitly.

* **Accent color override (Teal, not Electric Blue)** — see the callout at the top of §5. The
  real logo (`public/logo.png`) was provided after this doc specified Electric Blue; its icon is a
  teal-to-blue gradient with teal as the dominant/leading color (visible in the icon's top edge
  and the "CREATIVES" wordmark). Decoding the PNG's raw pixel data directly (no image library
  available) and sampling the purest opaque pixels in the icon's top band gave `#12BAB9` as the
  actual logo teal. `--color-teal-light: #14B8A6` is that color, effectively unchanged.
  `--color-teal: #0C9488` is a deliberately darker shade in the same hue — the raw `#12BAB9` is
  too light for white button text (contrast ≈2.5:1); `#0C9488` gets to ≈3.85:1, which clears
  WCAG for large text/UI components but not small normal text at AA. That's a known, accepted
  gap, not an oversight — flagging it here in case a stricter contrast bar is wanted later.
* **Muted body text on light surfaces** — `#55607A`. Cool Gray (`#A8B3C7`) is specified for dark
  backgrounds only and fails contrast on Warm White, so a darker muted tone was derived from
  Charcoal Navy.
* **Borders on light surfaces** — `#E3E7EE`. Slate (`#26344D`) is the dark-surface border; this is
  its light-surface equivalent.
* **Display size cap** — the scale in §9 allows 64–80px. The hero is capped at 72px because at
  80px the H1 wraps to five lines in the hero's text column.
* **Mono font** — none. §7–8 specify only Manrope and Inter, so numeric/label treatments (process
  step numbers, eyebrows, tags) use Inter 600 uppercase with letter-spacing rather than a
  monospace face.
* **Section tones** — implemented via `components/ui/Section.tsx` as `dark` (Deep Navy),
  `light` (Warm White) and `raised` (white). `raised` gives two consecutive light sections
  (Engineering Capabilities, Why Apprising) a subtle separation per §20's "avoid making every
  section visually identical".
* **Text input (Newsletter section)** — no form field pattern existed before
  `Newsletter.tsx` (§10 of `docs/landing-page.md`). On dark sections: `bg-deep-navy` fill,
  `border-line-dark`, `text-soft-white`, `placeholder:text-cool-gray/70`, `--radius-btn` corners
  — i.e. the dark secondary-button treatment inverted into a filled field. Reuse this for any
  future form field rather than inventing a new one.
* **Assessment form (`/discovery-call`)** — reuses the Newsletter section's input pattern above
  for every field, laid out as a single-column stack inside a light-tone `Card` (the page is a
  light section, unlike the dark Newsletter card, so inputs use the light equivalent: `bg-white`
  fill, `border-line-light`, `text-charcoal`, `placeholder:text-charcoal-muted/70`). `<select>`
  and `<textarea>` (industry, biggest challenge) share the same classes as `<input>` — no
  separate select/textarea style was introduced.
* **Industry cards (`Industries.tsx`)** — same `Card` + icon + title + short description shape as
  `WhyApprising.tsx`'s reason grid, not a new card variant. Kept deliberately plain (no imagery)
  per §33/§34 — an icon and one sentence, nothing implying deep vertical specialization that
  isn't real yet.
