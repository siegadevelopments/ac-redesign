// The "pick your mess" headache keys, shared by the problem box (client) and
// /api/problem (server), which rejects any key not in this list. Keys are
// stored in Kit's `problem_headache` field, so renaming one changes stored
// data — add new keys rather than renaming existing ones.
export const HEADACHES = [
  { key: "bookings", label: "Bookings" },
  { key: "intake", label: "Forms & intake" },
  { key: "followups", label: "Follow-ups" },
  { key: "invoices", label: "Invoices" },
  { key: "messages", label: "Messages" },
  { key: "rosters", label: "Rosters & time" },
  { key: "something-else", label: "Something else" },
] as const;

export type HeadacheKey = (typeof HEADACHES)[number]["key"];

export function findHeadache(key: string) {
  return HEADACHES.find((headache) => headache.key === key);
}
