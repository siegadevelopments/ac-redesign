// Content for the homepage opening chapter ("paper chaos to app", plan U5).
// Object set, wording and scatter positions are ported from the chosen
// prototype (.context/.../01-transformation/screens/001-a-paper-to-app.html).
// The founder signs off the final headline copy (plan Assumptions).
//
// Everything on the app screen is a concept (plan R13): no client names, no
// real figures. The screen carries the "Concept" badge where it renders.

import type { HeadacheKey } from "@/lib/content/headaches";

export type AppRowKey = Exclude<HeadacheKey, "something-else">;

export const OPENING_COPY = {
  kicker: "For Australian practices and service businesses",
  /** The problem line. Display-size at the start of the scroll; supporting copy in the finished state. */
  problem: "Your team keeps retyping the same things.",
  problemLede:
    "Diaries, spreadsheets, inboxes, forms that arrive as PDFs, three apps that don't talk to each other. Every hour spent copying between them is an hour not spent with your clients.",
  scrollHint: "Scroll to tidy it up",
  /** The promise — the page's single h1. */
  headline: "Give your team their hours back.",
  lede: "We build simple systems that connect your bookings, forms, follow-ups and invoices, so nobody types the same thing twice.",
  messCaption: "What it replaces",
} as const;

export const OPENING_APP = {
  title: "Today",
  subtitle: "Tuesday · everything in one place",
  emptyLabel: "One place for all of it",
} as const;

type DotTone = "accent" | "deep" | "signal";

export const OPENING_APP_ROWS: readonly {
  key: AppRowKey;
  letter: string;
  tone: DotTone;
  title: string;
  detail: string;
}[] = [
  { key: "bookings", letter: "A", tone: "accent", title: "Appointments", detail: "Diary, reminders and reschedules in one view" },
  { key: "intake", letter: "F", tone: "deep", title: "Forms waiting", detail: "New client details, already filled in" },
  { key: "followups", letter: "!", tone: "signal", title: "Follow-ups due", detail: "Recalls and reminders go out for you" },
  { key: "invoices", letter: "$", tone: "accent", title: "Invoices ready", detail: "Send them all with one tap" },
  { key: "messages", letter: "M", tone: "deep", title: "Messages", detail: "Every enquiry, in one thread" },
  { key: "rosters", letter: "R", tone: "signal", title: "Rosters & time", detail: "Approved for this week" },
];

/** Scatter position as [left %, top %] of the sticky stage. */
type Position = readonly [number, number];

type MessVisual =
  | { kind: "sheet"; title: string; cells: readonly (readonly { text: string; flagged?: boolean }[])[] }
  | { kind: "card"; title: string; meta: string }
  | { kind: "receipt"; lines: readonly string[] }
  | { kind: "bubble"; text: string }
  | { kind: "sticky"; tone: "yellow" | "pink"; text: string }
  | { kind: "chip"; text: string };

export type MessItem = {
  id: string;
  /** The app row this object gathers into. */
  to: AppRowKey;
  /** Width of the paper object in px. */
  width: number;
  /** What a screen reader hears for this object. */
  label: string;
  desktop: Position;
  /** Phone-width scatter position; null drops the object under 768px (fewer objects, plan R18). */
  narrow: Position | null;
  visual: MessVisual;
};

export const OPENING_MESS: readonly MessItem[] = [
  {
    id: "diary-sheet",
    to: "bookings",
    width: 190,
    label: "A spreadsheet called Diary_2026 (copy), with two people at 9:00 and a question-marked cell",
    desktop: [6, 8],
    narrow: [4, 46],
    visual: {
      kind: "sheet",
      title: "Diary_2026 (copy).xlsx",
      cells: [
        [{ text: "Time" }, { text: "Who?" }, { text: "Done" }],
        [{ text: "9:00" }, { text: "??", flagged: true }, { text: "y" }],
        [{ text: "9:00" }, { text: "Sam" }, { text: "", flagged: true }],
      ],
    },
  },
  {
    id: "intake-pdf",
    to: "intake",
    width: 180,
    label: "A new client form emailed as a three-page PDF, waiting to be retyped",
    desktop: [38, 10],
    narrow: [52, 44],
    visual: { kind: "card", title: "New client form.pdf", meta: "“3 pages. Can someone retype this?”" },
  },
  {
    id: "receipt",
    to: "invoices",
    width: 130,
    label: "A paper invoice for a consult, marked “Paid?”",
    desktop: [44, 64],
    narrow: [40, 50],
    visual: { kind: "receipt", lines: ["INVOICE", "Consult ....... 180.00", "GST ............ 18.00", "Paid? ________"] },
  },
  {
    id: "text-message",
    to: "messages",
    width: 170,
    label: "Text message: “Can I move my appointment to Thurs? No one called back”",
    desktop: [56, 70],
    narrow: [4, 56],
    visual: { kind: "bubble", text: "Can I move my appointment to Thurs? No one called back" },
  },
  {
    id: "roster-note",
    to: "rosters",
    width: 120,
    label: "Sticky note: “Who's covering Sat? Roster not sent”",
    desktop: [14, 80],
    narrow: [8, 74],
    visual: { kind: "sticky", tone: "yellow", text: "Who's covering Sat? Roster not sent" },
  },
  {
    id: "recall-note",
    to: "followups",
    width: 118,
    label: "Sticky note: “Recall list?? Chase before Fri”",
    desktop: [48, 17],
    narrow: [70, 50],
    visual: { kind: "sticky", tone: "pink", text: "Recall list?? Chase before Fri" },
  },
  {
    id: "proposal-file",
    to: "followups",
    width: 150,
    label: "File Proposal_FINAL_v3.pdf, two copies in Downloads",
    desktop: [27, 88],
    narrow: null,
    visual: { kind: "card", title: "Proposal_FINAL_v3.pdf", meta: "Downloads · 2 copies" },
  },
  {
    id: "calendar-clash",
    to: "bookings",
    width: 140,
    label: "Calendar clash: two bookings at 9:00",
    desktop: [57, 62],
    narrow: [38, 78],
    visual: { kind: "chip", text: "Calendar: 2 bookings at 9:00" },
  },
  {
    id: "voicemail",
    to: "messages",
    width: 160,
    label: "Two voicemails from an unknown number, 7:42am",
    desktop: [22, 8],
    narrow: null,
    visual: { kind: "card", title: "Voicemail (2)", meta: "Unknown number, 7:42am" },
  },
  {
    id: "browser-tabs",
    to: "invoices",
    width: 130,
    label: "11 browser tabs open",
    desktop: [58, 84],
    narrow: null,
    visual: { kind: "chip", text: "11 browser tabs open" },
  },
  {
    id: "timesheet-email",
    to: "rosters",
    width: 150,
    label: "Unread email: “Where's the timesheet?”",
    desktop: [2, 88],
    narrow: null,
    visual: { kind: "card", title: "Where's the timesheet?", meta: "Inbox · unread" },
  },
  {
    id: "new-clients-sheet",
    to: "intake",
    width: 140,
    label: "An old new-clients spreadsheet with an unknown form status",
    desktop: [60, 27],
    narrow: [60, 66],
    visual: {
      kind: "sheet",
      title: "New clients OLD",
      cells: [
        [{ text: "Client" }, { text: "Form" }],
        [{ text: "Mon 10:30" }, { text: "?", flagged: true }],
      ],
    },
  },
];
