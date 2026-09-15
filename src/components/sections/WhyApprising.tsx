import { Target, Layers, TrendingUp, Handshake, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

const REASONS = [
  {
    icon: Target,
    title: "Business-focused engineering",
    description: "We care about the problem before the technology.",
  },
  {
    icon: Layers,
    title: "End-to-end delivery",
    description: "From discovery and architecture to deployment and support.",
  },
  {
    icon: TrendingUp,
    title: "Built to evolve",
    description: "We design systems that can grow with your business.",
  },
  {
    icon: Handshake,
    title: "Technical partnership",
    description: "We work with your team, not just for your ticket queue.",
  },
];

export function WhyApprising() {
  return (
    <Section id="about" tone="raised">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Why Apprising"
          title="Technical capability without the complexity of building an internal team."
        />

        <div className="grid gap-8 sm:grid-cols-2">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="flex gap-4">
                <Icon
                  className="mt-1 shrink-0 text-teal"
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-h4 font-bold text-charcoal">{reason.title}</h3>
                  <p className="text-body text-charcoal-muted">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/about"
          className="inline-flex w-fit items-center gap-1.5 text-small font-semibold text-teal hover:text-teal-light"
        >
          Learn more about us
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Container>
    </Section>
  );
}
