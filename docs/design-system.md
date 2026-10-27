# Apprising Creatives — Design System

## 1. Purpose

This document is the **visual source of truth**. When implementing or modifying UI: follow it
first, the repo's technical conventions second, and do not add new visual patterns without a
clear reason.

> **2026-10 redesign.** The visual identity (everything except the logo) was replaced: the dark
> navy and teal palette, Manrope and Inter, and the diagram-led dark/light section rhythm are
> gone. The current system is a warm paper surface with ink text, a logo-derived teal accent,
> Bricolage Grotesque and Instrument Sans, and a scroll story on the homepage. The values below
> are read from `src/app/globals.css`; if the two disagree, the CSS wins and this file is stale.

The site should feel premium, technical, intelligent, calm and human, like an engineered tool
made by a person. It must not look like a generic AI agency.

## 2. Colour tokens (role-named)

Tokens are defined in the `@theme` block of `src/app/globals.css` and named by role, not by
colour. Tailwind utilities follow (`bg-surface`, `text-ink-muted`, `border-line`, `bg-accent`).

| Role | Token | Value | Use |
|---|---|---|---|
| Surface | `--color-surface` | `#f4f0e8` | Default page background (warm paper) |
| Surface, alternate | `--color-surface-alt` | `#ebe5d9` | Alternating bands |
| Surface, raised | `--color-surface-raised` | `#fffdf9` | Cards, inputs, raised sections |
| Ink | `--color-ink` | `#15212f` | Body and heading text on light |
| Ink, muted | `--color-ink-muted` | `#4a5463` | Secondary text on light |
| Line | `--color-line` | `#d9d1c1` | Decorative dividers and card edges only |
| Line, strong | `--color-line-strong` | `#7d7463` | Form-field borders (must reach 3:1) |
| Accent | `--color-accent` | `#0a7168` | Links, buttons, focus ring on light (the logo's blue-green, deepened) |
| Accent, strong | `--color-accent-strong` | `#085e57` | Hover and pressed |
| Ink on accent | `--color-ink-on-accent` | `#fffdf9` | Text on an accent fill |
| Inverse surface | `--color-surface-inverse` | `#15212f` | Dark bands, footer |
| Inverse, raised | `--color-surface-inverse-raised` | `#1d2b3c` | Cards on dark |
| Ink, inverse | `--color-ink-inverse` | `#f4f0e8` | Text on dark |
| Ink, inverse muted | `--color-ink-inverse-muted` | `#b5b0a6` | Secondary text on dark |
| Line, inverse | `--color-line-inverse` | `#2f3d4f` | Decorative dividers on dark |
| Accent, inverse | `--color-accent-inverse` | `#14b8a6` | Accent text, icons, focus ring on dark |
| Deep band | `--color-surface-deep` | `#0a2a43` | Occasional deep blue band |
| Signal | `--color-signal` | `#9c5417` | Warm highlight, used sparingly |

Rules: never use `--color-line` for something that must be perceivable (a form border, a focus
indicator); use `line-strong`. Primitives that render on both tones (`Button`, `Card`,
`SectionHeading`) take an `onDark` prop that maps to the inverse tokens. Do not add hex values
in components; the exceptions are the illustration colours inside the opening chapter's mess
objects and `src/app/opengraph-image.tsx` / `src/app/icon.tsx`, which hard-code values.

### Contrast results (WCAG AA)

Ratios are recorded beside each token in `globals.css`. Summary:

- Ink on surface, alt and raised: 14.3, 13.0 and 16.0 to 1.
- Muted ink on surface, alt and raised: 6.7, 6.1 and 7.6 to 1.
- Accent text on surface, alt and raised: 5.2, 4.7 and 5.8 to 1.
- Ink on accent fill: 5.8 to 1 (7.5 on accent-strong).
- Inverse ink on inverse and inverse-raised: 14.3 and 12.6 to 1; muted inverse ink: 7.5 and 6.7.
- Accent on inverse and inverse-raised: 6.5 and 5.8 to 1.
- Signal text on surface and alt: 5.0 and 4.5 to 1. Ink inverse on deep band: 13.0 to 1.
- Strong line on raised and alt: 4.5 and 3.7 to 1 (clears the 3:1 non-text threshold).

## 3. Typography

`next/font/google` (self-hosted at build time, so the CSP's `font-src 'self'` holds), wired in
`src/app/layout.tsx`:

- **Bricolage Grotesque** — display and headings (`font-display`; `h1`–`h3` default to it).
- **Instrument Sans** — body and UI (`font-sans`).

Fluid scale (`@theme`): display `clamp(2.625rem, 1.9rem + 3.1vw, 4.5rem)`, h2 up to 3.5rem, h3,
h4, body-lg, body (1rem to 1.125rem), small 0.875rem, label 0.8125rem. Eyebrows and labels use
the body font in uppercase semibold with letter-spacing; there is no mono font. Keep line
length readable (`text-pretty` on paragraphs, `text-balance` on headings).

## 4. Layout, spacing and shape

- Container: `--container-page` 80rem with responsive horizontal padding (20 to 40px).
- Section rhythm and tone are applied by `components/ui/Section.tsx` (`light`, `raised` and `dark`
  tones; `dark` maps to the inverse tokens), so sections don't repeat background and padding classes.
- Radii: `--radius-btn` 0.5rem, `--radius-card` 0.875rem, `--radius-lg` 1.25rem. Pills only for
  tags, status and small metadata.
- Buttons: primary is an accent fill with ink-on-accent text; light and dark variants are
  outlined. Cards, inputs and badges use the raised surface with `line` or `line-strong`.
- Forms stay simple. Form fields (problem box, assessment, newsletter) share one input pattern:
  raised fill, `line-strong` border, visible label, ink text; `select` and `textarea` reuse the
  same classes.

## 5. Imagery and trust

- No people imagery. No stock photography, robots, brains, neon gradients, circuit boards or
  glowing "AI" visuals; the product or system is the hero, not the word "AI".
- Preferred visuals: hand-built SVG/CSS, workflow and interface illustrations, the paper-and-app
  scene on the homepage. The paper texture uses CSS gradients only (the CSP's `img-src` blocks
  `data:` URIs) and an optional WebGL grain.
- Any app screen or example is labelled **Concept** and carries no client names, figures,
  testimonials or ratings (`docs/trust-and-claims.md`).
- The logo (`public/logo.png`, `logo-mark.png`) is unchanged and used through `Logo.tsx`.

## 6. Motion

Motion communicates flow, connection and transformation; it must never be needed to understand
the page, and it never delays or hides the problem box or the send action.

**End-state-first rule.** The server renders every chapter in its finished state. Motion only
adds a start state. Hidden start states never appear in base CSS; they live under `html.motion`
in `globals.css`. A tiny inline script in `src/app/layout.tsx` adds the `motion` class to `<html>`
before first paint, and only when reduced motion is not requested, so no-JS and reduced-motion
visitors never get it. The media gates in that CSS must match `MOTION_CONDITIONS` in
`src/components/story/StoryMotion.tsx`.

**Libraries.** GSAP (`gsap` and `@gsap/react`, from npm, imported only in client components) with
`gsap.matchMedia`, plus `ScrollTrigger` scrubbing a CSS `position: sticky` stage. No `pin`, so
there is no page-height change after hydration. `html { scroll-behavior: smooth }` is not used,
since it fights ScrollTrigger. Smaller reveals use the existing `RevealOnScroll` primitive
(IntersectionObserver plus CSS).

| Condition | Opening chapter | Grain shader | Pick / box |
|---|---|---|---|
| No JS | Finished state, normal height | CSS texture | Pick list readable, email link instead of the form |
| Reduced motion | Finished state, normal height | One still frame | Works, no transitions |
| Motion, width 768px and up | Sticky stage, full scrubbed gather | Animated, DPR capped at 1.5 | Short non-scrubbed transitions |
| Motion, width under 768px | Sticky stage, shorter track, fewer objects | Half resolution, dropped first if frames lag | Same as above |

The grain (`GrainCanvas.tsx`) is raw WebGL, loaded after first paint through `next/dynamic` with
`ssr: false`; it pauses offscreen and when the tab is hidden, handles context loss, and falls
back to the CSS texture. Typical durations: micro interactions 150–250ms, component transitions
250–400ms, entrances 400–700ms. Avoid parallax, floating objects, spinning elements and
scroll-jacking. Under `prefers-reduced-motion: reduce`, global CSS also collapses transition and
animation durations.

## 7. Accessibility

Semantic HTML and heading order (the opening chapter holds the page's single `h1`), keyboard
operation for every chapter, visible focus states (accent on light, accent-inverse on dark), form
labels, a skip link to `#problem`, a live region announcing concept-app changes, and no meaning
carried by colour alone. Contrast must pass AA for every text and background pairing (section 2).
Touch scrolling must work on phones; use `svh` units and
`ScrollTrigger.config({ ignoreMobileResize: true })` for the mobile address bar.

## 8. Responsive behaviour

Mobile first. Check 360, 767, 768 and 1440px. Below 768px the opening chapter uses a shorter
track and fewer objects (section 6). Navigation collapses to `MobileNav`, keeping the "Tell us
your problem" button visible in the header on one line.
