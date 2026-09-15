import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProblemConnectVisual } from "@/components/visuals/ProblemConnectVisual";
import { CTA_HREFS } from "@/lib/constants";

const RECOGNITION_ITEMS = [
  "Your team copies information between systems.",
  "Quotes take hours or days to prepare.",
  "Bookings are spread across email, phone, spreadsheets and forms.",
  "Managers wait for reports instead of seeing information in real time.",
  "Employees spend valuable time doing work software should handle.",
];

export function Problem() {
  return (
    <Section tone="light">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex flex-col items-center gap-4 lg:order-1">
          <ProblemConnectVisual />
          <p className="max-w-xs text-center text-small font-medium text-charcoal-muted">
            Manual, disconnected tools → one connected system that does the repetitive work for
            you.
          </p>
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
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

          <div className="flex flex-col gap-3 pt-2">
            <h3 className="text-h4 font-bold text-charcoal">Does this sound familiar?</h3>
            <ul className="flex flex-col gap-2.5">
              {RECOGNITION_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-teal"
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="text-body text-charcoal-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={CTA_HREFS.bookDiscoveryCall}
            className="inline-flex items-center gap-1.5 pt-1 text-body font-semibold text-teal hover:text-teal-light"
          >
            Find Out What You Could Automate
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </Section>
  );
}
