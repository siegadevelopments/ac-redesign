import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TECH_CATEGORIES } from "@/lib/content/techStack";

export function TechCapabilities() {
  return (
    <Section tone="light">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Capabilities" title="Built with the right tools for the job." />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {TECH_CATEGORIES.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.category} className="flex flex-col gap-4">
                <Icon
                  className="text-teal"
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-label font-semibold uppercase tracking-[0.12em] text-charcoal">
                  {tech.category}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {tech.items.map((item) => (
                    <li key={item} className="text-small text-charcoal-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
