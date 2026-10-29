export const NEWSLETTER_COPY = {
  eyebrow: "Free Resource",
  supporting:
    "You'll also get occasional notes on business systems and automation — no spam, unsubscribe anytime.",
  formLabel: "Email address",
  placeholder: "you@company.com",
  submitLabel: "Send Me the Checklist",
  successMessage: "Check your inbox — the checklist is on its way.",
  // Shown instead of successMessage when the subscriber was captured but
  // the form-link step (which triggers the checklist email) failed. Stays
  // honest rather than claiming something was sent when it wasn't.
  delayedMessage: "We've got your email — the checklist is on its way shortly.",
  errorMessage: "Something went wrong. Please try again or email us directly.",
} as const;
