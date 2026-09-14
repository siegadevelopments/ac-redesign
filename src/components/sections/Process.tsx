import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessVisual } from "@/components/visuals/ProcessVisual";
import { PROCESS_TRUST_NOTES } from "@/lib/content/process";

export function Process() {
  return (
    <Section id="how-we-work" tone="light">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="How We Think" title="We don't start with technology." />
          <ul className="flex flex-col gap-3">
            {PROCESS_TRUST_NOTES.map((note) => (
              <li key={note} className="flex gap-3 text-body-lg text-charcoal">
                <span className="text-teal" aria-hidden="true">
                  —
                </span>
                {note}
              </li>
            ))}
          </ul>
        </div>

        <ProcessVisual />
      </Container>
    </Section>
  );
}
