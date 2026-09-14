import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS } from "@/lib/content/faq";

export function Faq() {
  return (
    <Section id="faq" tone="light">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Questions" title="Common questions." />

        {/* Answers stay visible rather than collapsed — direct answers are the
            point of the AEO guidance in docs/seo.md §21. */}
        <dl className="grid max-w-4xl gap-8 md:grid-cols-2">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className="flex flex-col gap-2">
              <dt className="text-h4 font-bold text-charcoal">{item.question}</dt>
              <dd className="text-body text-charcoal-muted text-pretty">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
