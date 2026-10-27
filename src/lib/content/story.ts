// Homepage story content for the "pick your mess" chapter and the problem
// box (src/components/story/ProblemStory.tsx). Everything shown on the
// concept app is an illustration, labelled "Concept" — no real clients,
// metrics or testimonials (docs/trust-and-claims.md, R13).
import { CONTACT_EMAIL } from "@/lib/constants";
import type { HeadacheKey } from "@/lib/content/headaches";

export type ConceptRow = {
  /** One or two characters shown in the row's marker. */
  mark: string;
  title: string;
  detail: string;
};

export type ConceptView = {
  title: string;
  subtitle: string;
  rows: readonly ConceptRow[];
};

/** The all-in-one "Today" screen, shown before any pick and for "Something else". */
export const CONCEPT_OVERVIEW: ConceptView = {
  title: "Today",
  subtitle: "Everything in one place",
  rows: [
    { mark: "J", title: "Jobs for today", detail: "Crew assigned, addresses on the map" },
    { mark: "Q", title: "Quotes waiting", detail: "Follow-up reminder set" },
    { mark: "$", title: "Invoices ready", detail: "Send all with one tap" },
    { mark: "M", title: "Messages", detail: "Customer replies, in one thread" },
    { mark: "T", title: "Timesheets", detail: "Approved for this week" },
    { mark: "S", title: "Stock", detail: "Low items flagged" },
  ],
};

export type Pile = {
  /** A one-line description of the mess, shown under the pick label. */
  mess: string;
  /** The sentence written into the problem box when this pile is picked. */
  starter: string;
  view: ConceptView;
};

// One entry per headache key except "something-else", which has no pile:
// it leaves the box empty and shows the overview (R25).
export const PILES: Record<Exclude<HeadacheKey, "something-else">, Pile> = {
  jobs: {
    mess: "Whiteboards, group texts and who's-going-where phone calls.",
    starter: "Keeping track of jobs is a mess for us. ",
    view: {
      title: "Jobs",
      subtitle: "Booked, assigned and on the map",
      rows: [
        { mark: "J", title: "New booking", detail: "Lands straight on the schedule" },
        { mark: "C", title: "Crew assigned", detail: "Everyone sees their day on their phone" },
        { mark: "A", title: "Address and notes", detail: "Attached to the job, not a text thread" },
        { mark: "✓", title: "Job done", detail: "Photos and sign-off saved to the job" },
      ],
    },
  },
  quotes: {
    mess: "Quotes in a notebook, a spreadsheet and someone's inbox.",
    starter: "Our quotes take too long and get lost between people. ",
    view: {
      title: "Quotes",
      subtitle: "From enquiry to accepted",
      rows: [
        { mark: "E", title: "New enquiry", detail: "A draft quote starts from the website form" },
        { mark: "Q", title: "Quote sent", detail: "The customer can accept online" },
        { mark: "R", title: "Follow-up", detail: "A reminder goes out if there's no reply" },
        { mark: "✓", title: "Accepted", detail: "Turns into a job without retyping" },
      ],
    },
  },
  invoices: {
    mess: "Invoices typed up at night from paper job sheets.",
    starter: "Getting invoices out on time is a constant headache. ",
    view: {
      title: "Invoices",
      subtitle: "Out the door when the job is done",
      rows: [
        { mark: "$", title: "Invoice drafted", detail: "Built from the finished job" },
        { mark: "S", title: "Sent", detail: "Straight to the customer by email" },
        { mark: "R", title: "Overdue reminder", detail: "Sent for you, politely" },
        { mark: "A", title: "Accounts in sync", detail: "Lines up with your accounting software" },
      ],
    },
  },
  messages: {
    mess: "Customer questions spread across texts, calls and three inboxes.",
    starter: "Customer messages come in everywhere and things slip through. ",
    view: {
      title: "Messages",
      subtitle: "Every customer, one thread",
      rows: [
        { mark: "M", title: "One inbox", detail: "Texts, emails and web enquiries together" },
        { mark: "J", title: "Linked to the job", detail: "Know who's asking about what" },
        { mark: "@", title: "Assigned", detail: "Someone owns each reply" },
        { mark: "✓", title: "Answered", detail: "Nothing left sitting unread" },
      ],
    },
  },
  timesheets: {
    mess: "Paper timesheets chased every Friday and keyed in by hand.",
    starter: "Collecting timesheets and getting them into payroll takes too long. ",
    view: {
      title: "Timesheets",
      subtitle: "Logged on site, approved in one place",
      rows: [
        { mark: "T", title: "Clock on and off", detail: "From a phone, against the job" },
        { mark: "R", title: "Review", detail: "Hours for the week in one list" },
        { mark: "✓", title: "Approve", detail: "One tap per person" },
        { mark: "P", title: "Payroll ready", detail: "Exported without retyping" },
      ],
    },
  },
  stock: {
    mess: "Running out of parts because the count lives in someone's head.",
    starter: "We never really know what stock we have until we run out. ",
    view: {
      title: "Stock",
      subtitle: "Counts that keep themselves up to date",
      rows: [
        { mark: "S", title: "Used on a job", detail: "Taken off the count automatically" },
        { mark: "!", title: "Running low", detail: "Flagged before it runs out" },
        { mark: "O", title: "Reorder", detail: "Order drafted for your supplier" },
        { mark: "✓", title: "Delivered", detail: "Counts updated when it arrives" },
      ],
    },
  },
};

export function conceptViewFor(headache: HeadacheKey | null): ConceptView {
  if (!headache || headache === "something-else") return CONCEPT_OVERVIEW;
  return PILES[headache].view;
}

export const PICK_CHAPTER_COPY = {
  eyebrow: "Pick your mess",
  title: "Which part of the week wears you down?",
  intro:
    "Pick one. The concept app shows how that part of the business could work when it all lives in one simple system.",
  legend: "Pick the headache closest to yours",
  somethingElseDescription: "Not on the list? Tell us in your own words.",
  conceptLabel: "Concept",
  conceptNote: "An illustration of the idea, not a live product or real client data.",
  /** Read out by the live region when the concept app changes. */
  announceView: (title: string) => `Concept app now showing: ${title}.`,
} as const;

export const PROBLEM_BOX_COPY = {
  eyebrow: "Tell us your problem",
  title: "Describe the mess. We'll tell you what we'd do.",
  intro:
    "No forms to fill in beyond these three. A real person reads every message and replies by email.",
  nameLabel: "Name",
  emailLabel: "Email",
  problemLabel: "Your problem",
  problemHint: "What happens today, and what you wish happened instead.",
  submitLabel: "Send my problem",
  sendingLabel: "Sending…",
  // Wording from the security answer in src/lib/content/faq.ts (R11).
  securityLine:
    "Every system we build uses secure authentication, access control and secure API design as standard practice. We don't hold formal compliance certifications, and we say so.",
  failureMessage: `Your message didn't send. Your text is still here, so try again, or email us at ${CONTACT_EMAIL}.`,
  noscriptMessage: "Tell us your problem by email and a real person will reply:",
  successTitle: "Got it. A real person will read this and reply.",
  successBody:
    "We'll reply by email to the address you gave. If you'd like to go further now, book the free automation assessment. Your details carry over, so there's nothing to retype.",
} as const;

export const NEWSLETTER_INLINE_COPY = {
  lead: "Not ready to talk yet?",
  description:
    "Get the Business Systems Audit Checklist instead: a short list for spotting manual work worth fixing.",
} as const;

/**
 * sessionStorage key for the problem-box → assessment handoff (KTD9). The
 * problem box writes a ProblemHandoff here after a successful send; the
 * assessment form reads it once, fills its fields and removes it.
 */
export const PROBLEM_HANDOFF_KEY = "ac:problem-handoff";

export type ProblemHandoff = {
  name: string;
  email: string;
  problem: string;
};

/**
 * Problem-box pre-fill state (plan: "Problem-box pre-fill state"; R6, R7,
 * R25). A pick writes its starter sentence until the visitor edits the
 * box; any edit, including clearing it, stops picks from touching the text.
 * "Something else" writes nothing: it clears a starter but never text the
 * visitor typed.
 */
export type PrefillState = {
  text: string;
  /** True once the visitor has typed in or cleared the box. */
  edited: boolean;
  headache: HeadacheKey | null;
};

export const INITIAL_PREFILL: PrefillState = { text: "", edited: false, headache: null };

export function pickHeadache(state: PrefillState, headache: HeadacheKey): PrefillState {
  if (state.edited) return { ...state, headache };
  const text = headache === "something-else" ? "" : PILES[headache].starter;
  return { text, edited: false, headache };
}

export function editProblem(state: PrefillState, text: string): PrefillState {
  return { ...state, text, edited: true };
}
