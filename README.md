# Apprising Creatives website

Marketing site for Apprising Creatives: a scroll-driven homepage story that ends in a short
"tell us your problem" form, plus inner pages (What We Can Build, Case Studies, For Agencies,
About, Free Assessment, Privacy).

Next.js (App Router) · React · Tailwind CSS 4 · GSAP · TypeScript.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

CI (`.github/workflows/ci.yml`) runs lint, build, typecheck and a dependency audit on every pull
request. There is no test runner by design; route behaviour was checked with throwaway scripts.

## Environment variables

All are documented in `.env.example`. The form routes need Resend (`RESEND_API_KEY`,
`PROBLEM_NOTIFY_TO`, `PROBLEM_NOTIFY_FROM`) and Kit (`KIT_API_KEY` plus the three form IDs).
`NEXT_PUBLIC_GA_MEASUREMENT_ID` turns on Google Analytics. Never commit `.env.local`.

## Where things are

```
src/app/            routes, layout, API routes (problem, assessment, subscribe), OG image, sitemap
src/components/     story/ (homepage chapters), sections/, ui/, layout/, analytics/
src/lib/content/    all copy and content data (change wording here)
src/lib/            analytics, rate limiting, motion helpers, constants, SEO
docs/               strategy, brand, design system, trust register, plans (start with project-context.md)
public/             logo files and .well-known/security.txt
```

## Working agreements

- `CLAUDE.md` and `docs/` are the source of truth for positioning, copy rules and what may be
  claimed. `docs/trust-and-claims.md` must have a row for every factual trust claim.
- The server markup is the finished page; motion only runs when the visitor allows it
  (`docs/design-system.md`).
- Change the privacy policy (`src/app/privacy/page.tsx`) in the same pull request as any new data
  collection or third-party service.
