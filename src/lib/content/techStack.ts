import { Server, MonitorSmartphone, BrainCircuit, Plug, Cloud, type LucideIcon } from "lucide-react";

export type TechCategory = {
  icon: LucideIcon;
  category: string;
  items: string[];
};

export const TECH_CATEGORIES: TechCategory[] = [
  {
    icon: Server,
    category: "Backend",
    items: ["Python", "FastAPI", "PostgreSQL", "APIs"],
  },
  {
    icon: MonitorSmartphone,
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript"],
  },
  {
    icon: BrainCircuit,
    category: "AI",
    items: [
      "LLM integrations",
      "AI workflows",
      "RAG",
      "Document intelligence",
      "AI agents",
    ],
  },
  {
    icon: Plug,
    category: "Integration",
    items: [
      "REST APIs",
      "Webhooks",
      "Third-party platforms",
      "Payment systems",
      "CRM integrations",
    ],
  },
  {
    icon: Cloud,
    category: "Infrastructure",
    items: ["Cloud deployment", "Docker", "CI/CD", "Monitoring"],
  },
];
