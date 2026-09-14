export type SolutionExample = {
  title: string;
  description: string;
  features: string[];
};

export const SOLUTION_EXAMPLES: SolutionExample[] = [
  {
    title: "AI-Enabled Clinic Platform",
    description:
      "A concept for how healthcare providers could manage appointments and patient workflows with AI-assisted intake.",
    features: [
      "Appointment management",
      "Patient workflows",
      "AI-assisted intake",
      "Operational dashboards",
    ],
  },
  {
    title: "Intelligent Booking System",
    description:
      "A concept for a booking platform that handles availability, payments, and notifications without manual coordination.",
    features: [
      "Online bookings",
      "Payments",
      "Availability management",
      "Integrations",
      "Automated notifications",
    ],
  },
  {
    title: "Business Operations Platform",
    description:
      "A concept for a central system that replaces scattered spreadsheets with one operational view.",
    features: [
      "Centralized workflows",
      "Dashboards",
      "Role-based access",
      "Reporting",
      "System integrations",
    ],
  },
  {
    title: "AI Document Workflow",
    description:
      "A concept for turning incoming documents into structured, validated data with a human in the loop.",
    features: [
      "Document ingestion",
      "Data extraction",
      "Validation",
      "Human review",
      "Automated routing",
    ],
  },
];
