import { FAQ_ITEMS, type FaqItem } from "@/lib/content/faq";

/**
 * Copy for the /us landing page (docs/australian-market.md, US section).
 * US spelling throughout. Nothing here is a client result, metric or
 * certification: the outcomes are typical starting points, not claims.
 */

export const US_HERO = {
  eyebrow: "For US businesses",
  title: "Stop retyping the same work. Get your team's hours back.",
  lead: "We build simple systems that connect your bookings, forms, follow-ups and invoices, so nobody types the same thing twice. Tell us what's eating your team's time and we'll say honestly whether we can help.",
} as const;

export const US_OUTCOMES = {
  eyebrow: "Typical starting points",
  title: "Where small teams usually get their time back.",
  items: [
    {
      title: "Enter it once",
      before: "A new customer's details get typed into your booking tool, your invoicing tool and a spreadsheet.",
      after: "One entry, and everything else fills itself in.",
    },
    {
      title: "Stop chasing",
      before: "Someone checks every morning who hasn't paid, replied or confirmed.",
      after: "Reminders and follow-ups go out on their own, and you only see what needs a person.",
    },
    {
      title: "Know where things stand",
      before: "Friday afternoon goes on building a report from three exports.",
      after: "A dashboard that's already up to date when you open it.",
    },
    {
      title: "Retire the fragile spreadsheet",
      before: "The one spreadsheet nobody dares to touch runs half the business.",
      after: "A small system built around how your team really works.",
    },
  ],
} as const;

// Indicative USD conversions of the AUD ladder in docs/offers.md (AUD $5,000-$15,000+
// per project, about AUD $1,000/month for a care plan). The founder approves
// these before /us goes live; see the claims register. Edit here only.
export const US_PRICING = {
  eyebrow: "Indicative pricing",
  title: "What it usually costs.",
  projectLabel: "One automation or system project",
  projectRange: "USD $3,500–$10,000+",
  projectNote: "Scoped to one workflow or system.",
  careLabel: "Ongoing care once it's live",
  careRange: "from about USD $650 a month",
  careNote: "Scoped to what we built for you.",
  disclaimer:
    "These are indicative ranges, not quotes. We confirm a figure only after the free assessment, never sight unseen.",
} as const;

// A commitment about how the team works, in the same class as the agency
// overlap row in docs/trust-and-claims.md. No named hours, no overlap promise.
export const US_LOCATION = {
  title: "Built in the Philippines, working with US teams.",
  body: [
    "We're a small team based in the Philippines, with no US office. Most of our working day falls outside US business hours.",
    "So we work through written updates and short recorded walkthroughs, and we agree call times with you up front rather than promising live support.",
  ],
} as const;

export const US_FINAL_CTA = {
  heading: "Tell us what keeps eating your team's time.",
  body: "Three fields, no sales call. If it looks worth going further, we'll offer the free automation assessment.",
} as const;

export const US_FAQ = {
  id: "us-faq",
  eyebrow: "Questions",
  title: "Common questions from US businesses.",
} as const;

// Reuse the shared answers that carry no Australia-specific wording, so the
// text can't drift from the homepage. The two US-specific answers follow.
function sharedAnswer(question: string): FaqItem {
  const item = FAQ_ITEMS.find((candidate) => candidate.question === question);
  if (!item) throw new Error(`Shared FAQ item missing: ${question}`);
  return { question: item.question, answer: item.answer };
}

export const US_FAQ_ITEMS: FaqItem[] = [
  sharedAnswer("Do I need custom software?"),
  sharedAnswer("What business processes can be automated?"),
  {
    question: "How much does business automation cost?",
    answer: `It depends on scope. Projects usually run ${US_PRICING.projectRange}, and ongoing care is ${US_PRICING.careRange}. These are indicative. We only give a specific figure after understanding the actual workflow.`,
  },
  {
    question: "Where are you based, and how do we work across time zones?",
    answer:
      "We're a small team in the Philippines. Most of our working day falls outside US business hours, so we work through written updates and short recorded walkthroughs, and agree call times up front.",
  },
  sharedAnswer("How do you handle security?"),
];
