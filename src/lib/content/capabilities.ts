import { Blocks, BrainCircuit, Workflow, LifeBuoy, type LucideIcon } from "lucide-react";

export type Capability = {
  icon: LucideIcon;
  title: string;
  pitch: string;
  examples: string[];
  anchor: string;
  linkLabel: string;
};

export const CAPABILITIES: Capability[] = [
  {
    icon: Blocks,
    title: "Custom Software",
    pitch: "Build the software your business actually needs.",
    examples: [
      "Internal platforms",
      "Client portals",
      "Booking systems",
      "Dashboards",
      "Operational systems",
      "SaaS products",
    ],
    anchor: "#solutions",
    linkLabel: "Explore custom software",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    pitch: "Put AI inside real business workflows.",
    examples: [
      "AI assistants",
      "Document processing",
      "Knowledge systems",
      "AI-powered workflows",
      "Intelligent search",
      "AI agents",
    ],
    anchor: "#solutions",
    linkLabel: "Explore AI integration",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    pitch: "Eliminate repetitive work between your systems.",
    examples: [
      "Workflow automation",
      "CRM integrations",
      "API connections",
      "Data synchronization",
      "Automated reporting",
      "Notifications",
    ],
    anchor: "#solutions",
    linkLabel: "Explore business automation",
  },
  {
    icon: LifeBuoy,
    title: "Managed Application Support",
    pitch: "Keep your systems reliable as your business grows.",
    examples: [
      "Maintenance",
      "Monitoring",
      "Bug fixes",
      "Performance improvements",
      "New features",
      "Technical support",
    ],
    anchor: "#how-we-work",
    linkLabel: "Explore managed support",
  },
];
