// The "pick your mess" headache keys, shared by the problem box (client) and
// /api/problem (server), which rejects any key not in this list. Keys are
// stored in Kit's `problem_headache` field, so renaming one changes stored
// data — add new keys rather than renaming existing ones.
export const HEADACHES = [
  { key: "jobs", label: "Jobs" },
  { key: "quotes", label: "Quotes" },
  { key: "invoices", label: "Invoices" },
  { key: "messages", label: "Messages" },
  { key: "timesheets", label: "Timesheets" },
  { key: "stock", label: "Stock" },
  { key: "something-else", label: "Something else" },
] as const;

export type HeadacheKey = (typeof HEADACHES)[number]["key"];

export function findHeadache(key: string) {
  return HEADACHES.find((headache) => headache.key === key);
}
