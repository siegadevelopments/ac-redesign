export type SolutionExample = {
  title: string;
  description: string;
  features: string[];
};

// Industry-neutral use-case concepts — supports testing multiple verticals
// rather than committing to one (see docs/target-audience.md). Still
// explicitly "Concept," not client work — see SolutionExamples.tsx's
// disclaimer and docs/case-studies.md for where real client work lives.
export const SOLUTION_EXAMPLES: SolutionExample[] = [
  {
    title: "Automated Quotation System",
    description:
      "A concept for turning a manual, back-and-forth quoting process into a fast digital workflow.",
    features: [
      "Guided quote builder",
      "Automatic pricing rules",
      "Instant PDF generation",
      "Follow-up notifications",
    ],
  },
  {
    title: "Booking & Scheduling System",
    description:
      "A concept for centralizing bookings, availability, customer information, and notifications in one place.",
    features: [
      "Online bookings",
      "Real-time availability",
      "Automated notifications",
      "Payment integration",
    ],
  },
  {
    title: "Internal Business Dashboard",
    description:
      "A concept for giving owners and managers a single, real-time view of how the business is actually operating.",
    features: [
      "Centralized reporting",
      "Role-based access",
      "Live data instead of static spreadsheets",
      "Custom views per team",
    ],
  },
  {
    title: "Workflow Automation",
    description:
      "A concept for connecting the tools a business already uses so information moves between them without manual re-entry.",
    features: [
      "System-to-system data sync",
      "Automated notifications",
      "Conditional workflows",
      "Reduced manual handling",
    ],
  },
  {
    title: "AI Business Assistant",
    description:
      "A concept for an AI assistant that helps a team retrieve information, process documents, or triage incoming enquiries.",
    features: [
      "Document intelligence",
      "Enquiry triage",
      "Knowledge retrieval",
      "Human review built in",
    ],
  },
  {
    title: "Custom Business Platform",
    description:
      "A concept for the system a business needs when off-the-shelf software doesn't fit how it actually operates.",
    features: [
      "Built around your workflow",
      "Custom access levels",
      "API integrations",
      "Room to grow with the business",
    ],
  },
];
