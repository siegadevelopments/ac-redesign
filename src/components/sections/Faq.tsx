import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS, type FaqItem } from "@/lib/content/faq";

export function Faq({
  id = "faq",
  eyebrow = "Questions",
  title = "Common questions.",
  items = FAQ_ITEMS,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  items?: FaqItem[];
}) {
  return (
    <Section id={id} tone="light">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={eyebrow} title={title} />

        {/* Answers stay visible (not collapsed) — direct answers are the
            point of the AEO guidance in docs/seo.md §21. */}
        <dl className="grid max-w-4xl gap-8 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.question} className="flex flex-col gap-2">
              <dt className="text-h4 font-bold text-ink">{item.question}</dt>
              <dd className="text-body text-ink-muted text-pretty">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
