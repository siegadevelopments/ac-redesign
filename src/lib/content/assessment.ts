export const DISCOVERY_CALL_COPY = {
  eyebrow: "Free Business Automation Assessment",
  title: "Let's find the work your team shouldn't be doing by hand.",
  subhead:
    "A free 20-minute call to understand how your business really runs, and whether automation, custom software or AI is genuinely worth it. Not a sales pitch dressed up as a consultation.",
} as const;

export type AssessmentStep = {
  number: string;
  title: string;
  description: string;
};

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    number: "01",
    title: "We learn how the work happens",
    description: "How things actually get done today, not how the org chart says they should.",
  },
  {
    number: "02",
    title: "We find where the time goes",
    description: "Where hours, accuracy or visibility are being lost.",
  },
  {
    number: "03",
    title: "We spot what could be automated",
    description: "What could realistically be automated, connected or rebuilt.",
  },
  {
    number: "04",
    title: "We check whether software or AI is worth it",
    description: "Sometimes the honest answer is no. See below.",
  },
  {
    number: "05",
    title: "We recommend the smallest practical solution",
    description: "The simplest thing that solves the problem, not the biggest thing we could sell.",
  },
];

export const ASSESSMENT_HONESTY_NOTE =
  "Apprising doesn't automatically recommend software for every problem. If the call concludes that your existing tools already do the job, we'll say so — that's still a useful 20 minutes, not a failed sales call.";

export const ASSESSMENT_FORM_COPY = {
  formTitle: "Book your free assessment",
  submitLabel: "Book My Free Assessment",
  successMessage:
    "Thanks — we've received your answers. A real person will review them and reach out to schedule your call.",
  errorMessage: "Something went wrong submitting the form. Please try again or email us directly.",
  privacyNote: "No obligation, no generic pitch. Used only to prepare for your call.",
} as const;
