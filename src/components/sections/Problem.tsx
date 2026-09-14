import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProblemConnectVisual } from "@/components/visuals/ProblemConnectVisual";

export function Problem() {
  return (
    <Section tone="light">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <ProblemConnectVisual />
        </div>

        <div className="order-1 flex flex-col gap-5 lg:order-2">
          <SectionHeading
            eyebrow="The Problem"
            title="Your business has grown. Your systems haven't."
          />
          <p className="max-w-lg text-body text-charcoal-muted text-pretty">
            Most businesses start with tools that work independently — spreadsheets, email,
            messaging, CRMs, booking platforms, accounting software.
          </p>
          <p className="max-w-lg text-body text-charcoal-muted text-pretty">
            Eventually, people become the integration layer. They copy information between
            systems, repeat the same work, and build reports by hand — spending time on processes
            software should handle.
          </p>
        </div>
      </Container>
    </Section>
  );
}
