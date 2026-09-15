import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CAPABILITIES } from "@/lib/content/capabilities";

export function Capabilities() {
  return (
    <Section id="what-we-do" tone="dark">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="What We Do"
          title="From business problems to working systems."
          onDark
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => {
            const Icon = capability.icon;
            return (
              <Card key={capability.title} onDark className="flex flex-col gap-4">
                <Icon
                  className="text-teal"
                  size={26}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-h4 font-bold text-soft-white">{capability.title}</h3>
                <p className="text-body text-cool-gray">{capability.pitch}</p>
                <ul className="flex flex-wrap gap-2 pt-2">
                  {capability.examples.map((example) => (
                    <li
                      key={example}
                      className="rounded-full border border-line-dark px-3 py-1 text-small text-cool-gray"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
                <a
                  href={capability.anchor}
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-small font-semibold text-teal-light hover:text-soft-white"
                >
                  {capability.linkLabel}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
