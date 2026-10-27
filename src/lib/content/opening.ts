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
  kicker: "For growing Australian businesses",
  /** The problem line. Display-size at the start of the scroll; supporting copy in the finished state. */
  problem: "Your business is spread across a hundred places.",
  problemLede:
    "Spreadsheets, inboxes, sticky notes, three apps that don't talk to each other. Somewhere in there is the thing you need right now.",
  scrollHint: "Scroll to tidy it up",
  /** The promise — the page's single h1. */
  headline: "Everything important, where you can actually find it.",
  lede: "We build simple systems that pull your jobs, quotes, invoices and messages into one tool your team will use.",
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
  { key: "jobs", letter: "J", tone: "accent", title: "Jobs today", detail: "Crew assigned, addresses on the map" },
  { key: "quotes", letter: "Q", tone: "deep", title: "Quotes waiting", detail: "Follow-up reminder set" },
  { key: "invoices", letter: "$", tone: "signal", title: "Invoices ready", detail: "Send them all with one tap" },
  { key: "messages", letter: "M", tone: "accent", title: "Messages", detail: "Customer replies, in one thread" },
  { key: "timesheets", letter: "T", tone: "deep", title: "Timesheets", detail: "Approved for this week" },
  { key: "stock", letter: "S", tone: "signal", title: "Stock", detail: "Low on two items" },
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
    id: "jobs-sheet",
    to: "jobs",
    width: 190,
    label: "A spreadsheet called Jobs_2026 (copy), with blank and question-marked cells",
    desktop: [6, 8],
    narrow: [4, 46],
    visual: {
      kind: "sheet",
      title: "Jobs_2026 (copy).xlsx",
      cells: [
        [{ text: "Job" }, { text: "Who?" }, { text: "Done" }],
        [{ text: "#118" }, { text: "??", flagged: true }, { text: "y" }],
        [{ text: "#119" }, { text: "Sam" }, { text: "", flagged: true }],
      ],
    },
  },
  {
    id: "quote-email",
    to: "quotes",
    width: 180,
    label: "Email, Re: Re: Fwd: quote. “Did this ever go out? Can't find the final one”",
    desktop: [38, 10],
    narrow: [52, 44],
    visual: { kind: "card", title: "Re: Re: Fwd: quote", meta: "“Did this ever go out? Can't find the final one”" },
  },
  {
    id: "receipt",
    to: "invoices",
    width: 130,
    label: "A paper tax invoice for supplies, marked “Paid?”",
    desktop: [44, 64],
    narrow: [40, 50],
    visual: { kind: "receipt", lines: ["TAX INVOICE", "Supplies ....... 412.50", "GST ............ 41.25", "Paid? ________"] },
  },
  {
    id: "text-message",
    to: "messages",
    width: 170,
    label: "Text message: “Is the job still on for tmrw? No one called back”",
    desktop: [56, 70],
    narrow: [4, 56],
    visual: { kind: "bubble", text: "Is the job still on for tmrw? No one called back" },
  },
  {
    id: "timesheet-note",
    to: "timesheets",
    width: 120,
    label: "Sticky note: “Timesheets due FRI. Who has the paper ones?”",
    desktop: [14, 80],
    narrow: [8, 74],
    visual: { kind: "sticky", tone: "yellow", text: "Timesheets due FRI. Who has the paper ones?" },
  },
  {
    id: "stock-note",
    to: "stock",
    width: 118,
    label: "Sticky note: “Stocktake?? Order more before Thurs”",
    desktop: [48, 17],
    narrow: [70, 50],
    visual: { kind: "sticky", tone: "pink", text: "Stocktake?? Order more before Thurs" },
  },
  {
    id: "quote-file",
    to: "quotes",
    width: 150,
    label: "File Quote_FINAL_v3.pdf, two copies in Downloads",
    desktop: [27, 88],
    narrow: null,
    visual: { kind: "card", title: "Quote_FINAL_v3.pdf", meta: "Downloads · 2 copies" },
  },
  {
    id: "calendar-clash",
    to: "jobs",
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
    to: "timesheets",
    width: 150,
    label: "Unread email: “Where's the timesheet?”",
    desktop: [2, 88],
    narrow: null,
    visual: { kind: "card", title: "Where's the timesheet?", meta: "Inbox · unread" },
  },
  {
    id: "stock-sheet",
    to: "stock",
    width: 140,
    label: "An old stock list spreadsheet with an unknown quantity for fittings",
    desktop: [60, 27],
    narrow: [60, 66],
    visual: {
      kind: "sheet",
      title: "Stock list OLD",
      cells: [
        [{ text: "Item" }, { text: "Qty" }],
        [{ text: "Fittings" }, { text: "?", flagged: true }],
      ],
    },
  },
];
