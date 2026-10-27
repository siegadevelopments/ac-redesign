import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/content/industries";

export function Industries() {
  return (
    <Section tone="dark">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Industries"
          title="Industries we're working with."
          subhead="We're testing where our approach helps most — not claiming deep specialization in all five yet."
          onDark
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <div key={industry.title} className="flex flex-col gap-3">
                <Icon className="text-accent-inverse" size={24} strokeWidth={1.5} aria-hidden="true" />
                <h3 className="text-h4 font-bold text-ink-inverse">{industry.title}</h3>
                <p className="text-small text-ink-inverse-muted">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
