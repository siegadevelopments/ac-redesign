export const LEAD_MAGNET = {
  title: "The Business Systems Audit Checklist",
  description:
    "A short, practical checklist for spotting where manual work, spreadsheets, and disconnected tools are quietly costing your team time — and where automation or integration would help most.",
  checklistItems: [
    "Where data gets copied by hand between tools",
    "Which reports take longer to build than they should",
    "Where customers wait on a manual step that could be instant",
    "Which processes depend on one person remembering to do them",
  ],
} as const;

export const NEWSLETTER_COPY = {
  eyebrow: "Free Resource",
  supporting:
    "You'll also get occasional notes on business systems and automation — no spam, unsubscribe anytime.",
  formLabel: "Email address",
  placeholder: "you@company.com",
  submitLabel: "Send Me the Checklist",
  successMessage: "Check your inbox — the checklist is on its way.",
  // Shown instead of successMessage when the subscriber was captured but
  // the automated delivery step didn't fire — see src/app/api/subscribe's
  // 2026-09 note on the Kit form-link bug. Stays honest rather than
  // claiming something was sent when it wasn't.
  delayedMessage: "We've got your email — the checklist is on its way shortly.",
  errorMessage: "Something went wrong. Please try again or email us directly.",
} as const;
