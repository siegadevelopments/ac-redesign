import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SOLUTION_EXAMPLES } from "@/lib/content/solutions";

export function SolutionExamples() {
  return (
    <Section id="solutions" tone="dark">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="What We Can Build" title="What we can build." onDark />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTION_EXAMPLES.map((solution) => (
            <Card key={solution.title} onDark className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-h4 font-bold text-ink-inverse">{solution.title}</h3>
                <Badge>Concept</Badge>
              </div>
              <p className="text-body text-ink-inverse-muted">{solution.description}</p>
              <ul className="flex flex-col gap-2 pt-2">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-small text-ink-inverse">
                    <Check
                      className="mt-0.5 shrink-0 text-accent-inverse"
                      size={16}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <p className="max-w-2xl text-small text-ink-inverse-muted">
          These are solution concepts illustrating the type of systems we build — not client case
          studies. We&apos;ll clearly label any client work, internal products, or demos as such.
        </p>
      </Container>
    </Section>
  );
}
