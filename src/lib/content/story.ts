// Homepage story content for the "pick your mess" chapter and the problem
// box (src/components/story/ProblemStory.tsx). Everything shown on the
// concept app is an illustration, labelled "Concept" — no real clients,
// metrics or testimonials (docs/trust-and-claims.md, R13).
import { CONTACT_EMAIL } from "@/lib/constants";
import type { HeadacheKey } from "@/lib/content/headaches";

type ConceptRow = {
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
const CONCEPT_OVERVIEW: ConceptView = {
  title: "Today",
  subtitle: "Everything in one place",
  rows: [
    { mark: "A", title: "Appointments today", detail: "Reminders sent, no double-bookings" },
    { mark: "F", title: "Forms waiting", detail: "New client details, already filled in" },
    { mark: "!", title: "Follow-ups due", detail: "Recalls and reminders go out for you" },
    { mark: "$", title: "Invoices ready", detail: "Send all with one tap" },
    { mark: "M", title: "Messages", detail: "Every enquiry, in one thread" },
    { mark: "R", title: "Rosters & time", detail: "Approved for this week" },
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
  bookings: {
    mess: "A paper diary, a shared calendar and reschedule texts that never match.",
    starter: "Our bookings and reschedules take up too much of the day. ",
    view: {
      title: "Bookings",
      subtitle: "Booked, confirmed and reminded",
      rows: [
        { mark: "B", title: "New booking", detail: "Lands straight in the diary" },
        { mark: "R", title: "Reminder sent", detail: "Clients confirm with one tap" },
        { mark: "↻", title: "Reschedule", detail: "They pick a new time, no phone call" },
        { mark: "✓", title: "Confirmed", detail: "Nothing double-booked" },
      ],
    },
  },
  intake: {
    mess: "New client forms emailed as PDFs and retyped by hand.",
    starter: "Getting new clients' details in and organised takes far too long. ",
    view: {
      title: "Forms & intake",
      subtitle: "Filled in before they arrive",
      rows: [
        { mark: "F", title: "Form sent", detail: "Clients fill it in on their phone" },
        { mark: "✓", title: "Details saved", detail: "Straight into the right record" },
        { mark: "D", title: "Documents attached", detail: "Referrals and paperwork in one place" },
        { mark: "R", title: "Ready", detail: "You open one page, not five" },
      ],
    },
  },
  followups: {
    mess: "Recalls and chasing documents live on a sticky note and someone's memory.",
    starter: "Follow-ups and recalls slip through because nobody owns them. ",
    view: {
      title: "Follow-ups",
      subtitle: "Nothing left to remember",
      rows: [
        { mark: "!", title: "Due today", detail: "A short list, not a hunt" },
        { mark: "S", title: "Reminder sent", detail: "Goes out for you, politely" },
        { mark: "D", title: "Documents chased", detail: "Asked for again until they arrive" },
        { mark: "✓", title: "Done", detail: "Logged against the client" },
      ],
    },
  },
  invoices: {
    mess: "Invoices typed up at night from notes and a spreadsheet.",
    starter: "Getting invoices out and chasing payment takes too much time. ",
    view: {
      title: "Invoices",
      subtitle: "Out the door when the work is done",
      rows: [
        { mark: "$", title: "Invoice drafted", detail: "Built from the finished appointment or job" },
        { mark: "S", title: "Sent", detail: "Straight to the client by email" },
        { mark: "R", title: "Overdue reminder", detail: "Sent for you, politely" },
        { mark: "A", title: "Accounts in sync", detail: "Lines up with your accounting software" },
      ],
    },
  },
  messages: {
    mess: "Enquiries spread across phone, email, social and the front desk.",
    starter: "Enquiries come in everywhere and things slip through. ",
    view: {
      title: "Messages",
      subtitle: "Every client, one thread",
      rows: [
        { mark: "M", title: "One inbox", detail: "Emails, web enquiries and call notes together" },
        { mark: "C", title: "Linked to the client", detail: "Know who's asking about what" },
        { mark: "@", title: "Assigned", detail: "Someone owns each reply" },
        { mark: "✓", title: "Answered", detail: "Nothing left sitting unread" },
      ],
    },
  },
  rosters: {
    mess: "Rosters, leave and timesheets passed around by text and spreadsheet.",
    starter: "Rosters and timesheets take too long to organise and approve. ",
    view: {
      title: "Rosters & time",
      subtitle: "Planned, logged and approved in one place",
      rows: [
        { mark: "R", title: "Roster set", detail: "Everyone sees their week on their phone" },
        { mark: "S", title: "Swap or leave", detail: "Requested and approved in one tap" },
        { mark: "T", title: "Hours logged", detail: "From a phone, no paper" },
        { mark: "P", title: "Payroll ready", detail: "Exported without retyping" },
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
  cta: "Tell us about it",
  ctaNote: "Your pick fills in the box for you. Change it however you like.",
  conceptLabel: "Concept",
  conceptNote: "An illustration of the idea, not a live product or real client data.",
  /** Read out by the live region when the concept app changes. */
  announceView: (title: string) => `Concept app now showing: ${title}.`,
} as const;

export const PROBLEM_BOX_COPY = {
  eyebrow: "Tell us your problem",
  title: "Tell us what keeps eating your team's time.",
  intro:
    "Three fields, no sales call. A real person reads every message and replies by email, and tells you honestly whether we can help.",
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
