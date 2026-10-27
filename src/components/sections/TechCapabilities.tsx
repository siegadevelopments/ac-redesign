import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/visuals/RevealOnScroll";
import { TECH_CATEGORIES } from "@/lib/content/techStack";

export function TechCapabilities() {
  return (
    <Section tone="raised">
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionHeading eyebrow="Capabilities" title="Built with the right tools for the job." />

        <RevealOnScroll className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {TECH_CATEGORIES.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.category} className="reveal-item flex flex-col gap-4 border-t border-line pt-6">
                <Icon
                  className="text-accent"
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-label font-semibold uppercase tracking-[0.12em] text-ink">
                  {tech.category}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {tech.items.map((item) => (
                    <li key={item} className="text-small text-ink-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
