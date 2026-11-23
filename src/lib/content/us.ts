import { FAQ_ITEMS, type FaqItem } from "@/lib/content/faq";
import { HEADACHES } from "@/lib/content/headaches";
import {
  OPENING_APP_ROWS,
  OPENING_COPY,
  OPENING_MESS,
  type MessItem,
  type OpeningCopy,
} from "@/lib/content/opening";
import { CONCEPT_OVERVIEW, PILES, type ConceptView, type Piles } from "@/lib/content/story";
import type { PickContent } from "@/components/story/ProblemStory";

/**
 * Copy for the /us landing page (docs/australian-market.md, US section).
 * US spelling throughout. Nothing here is a client result, metric or
 * certification: the outcomes are typical starting points, not claims.
 */

// The opening scene is the homepage's, with US wording: "calendar" for "diary",
// "schedule" for "roster", and "tax" for "GST" on the paper invoice. Positions
// and behaviour are shared (src/components/story/OpeningChapter.tsx).
export const US_OPENING_COPY: OpeningCopy = {
  ...OPENING_COPY,
  kicker: "For US service businesses",
  problemLede:
    "Calendars, spreadsheets, inboxes, forms that arrive as PDFs, three apps that don't talk to each other. Every hour spent copying between them is an hour not spent with your clients.",
};

export const US_OPENING_ROWS: typeof OPENING_APP_ROWS = OPENING_APP_ROWS.map((row) => {
  if (row.key === "bookings") return { ...row, detail: "Calendar, reminders and reschedules in one view" };
  if (row.key === "rosters") return { ...row, title: "Schedules & time" };
  return row;
});

const US_MESS_OVERRIDES: Record<string, MessItem> = Object.fromEntries(
  OPENING_MESS.flatMap((item): [string, MessItem][] => {
    if (item.id === "diary-sheet" && item.visual.kind === "sheet") {
      return [[item.id, {
        ...item,
        label: "A spreadsheet called Calendar_2026 (copy), with two people at 9:00 and a question-marked cell",
        visual: { ...item.visual, title: "Calendar_2026 (copy).xlsx" },
      }]];
    }
    if (item.id === "receipt" && item.visual.kind === "receipt") {
      return [[item.id, {
        ...item,
        visual: {
          kind: "receipt",
          lines: item.visual.lines.map((line) => (line.startsWith("GST") ? "Tax ............ 18.00" : line)),
        },
      }]];
    }
    if (item.id === "roster-note") {
      return [[item.id, {
        ...item,
        label: "Sticky note: “Who's covering Sat? Schedule not sent”",
        visual: { kind: "sticky", tone: "yellow", text: "Who's covering Sat? Schedule not sent" },
      }]];
    }
    return [];
  }),
);

export const US_OPENING_MESS: readonly MessItem[] = OPENING_MESS.map(
  (item) => US_MESS_OVERRIDES[item.id] ?? item,
);

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

// The "pick your mess" chapter is the homepage's, with US wording applied to
// its text so the two can't drift. Order matters: longer words first.
const US_WORDS: readonly (readonly [RegExp, string])[] = [
  [/\borganised\b/g, "organized"],
  [/\borganise\b/g, "organize"],
  [/\benquiries\b/g, "inquiries"],
  [/\bEnquiries\b/g, "Inquiries"],
  [/\benquiry\b/g, "inquiry"],
  [/\bEnquiry\b/g, "Inquiry"],
  [/\bpaper diary\b/g, "paper planner"],
  [/\bdiary\b/g, "calendar"],
  [/\bDiary\b/g, "Calendar"],
  [/\bRosters\b/g, "Schedules"],
  [/\bRoster\b/g, "Schedule"],
  [/\brosters\b/g, "schedules"],
  [/\broster\b/g, "schedule"],
  [/\bleave\b/g, "time off"],
];

function usify(text: string): string {
  return US_WORDS.reduce((out, [pattern, replacement]) => out.replace(pattern, replacement), text);
}

function usifyView(view: ConceptView): ConceptView {
  return {
    title: usify(view.title),
    subtitle: usify(view.subtitle),
    rows: view.rows.map((row) => ({ ...row, title: usify(row.title), detail: usify(row.detail) })),
  };
}

const US_PILES = Object.fromEntries(
  Object.entries(PILES).map(([key, pile]) => [
    key,
    { mess: usify(pile.mess), starter: usify(pile.starter), view: usifyView(pile.view) },
  ]),
) as Piles;

export const US_PICK_CONTENT: PickContent = {
  piles: US_PILES,
  overview: usifyView(CONCEPT_OVERVIEW),
  headaches: HEADACHES.map((headache) => ({ key: headache.key, label: usify(headache.label) })),
};
