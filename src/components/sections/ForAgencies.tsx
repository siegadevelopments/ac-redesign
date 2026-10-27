import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RevealOnScroll } from "@/components/visuals/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { AGENCY_YOU_HANDLE, AGENCY_WE_HANDLE } from "@/lib/content/agencyComparison";
import { CTA_HREFS, CTA_LABELS } from "@/lib/constants";

function ComparisonList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="reveal-item flex flex-col gap-4 rounded-(--radius-card) border border-line-inverse bg-surface-inverse p-6 md:p-8">
      <span className="text-label font-semibold uppercase tracking-[0.12em] text-ink-inverse-muted">
        {title}
      </span>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="text-body text-ink-inverse">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ForAgencies() {
  return (
    <Section id="for-agencies" tone="light" className="pt-0 md:pt-0 lg:pt-0">
      <Container>
        {/* Featured treatment — §24 requires this to read as more important
            than a standard section: one dark panel set into the paper page. */}
        <div className="overflow-hidden rounded-(--radius-lg) border border-line-inverse bg-surface-inverse-raised">
          <div className="h-1 w-full bg-accent-inverse" aria-hidden="true" />

          <div className="flex flex-col gap-12 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col gap-5">
              <span className="text-label font-semibold uppercase tracking-[0.12em] text-accent-inverse">
                For Agencies
              </span>
              <h2 className="max-w-3xl text-h2 font-bold text-ink-inverse text-balance">
                Sell the solution. We&apos;ll help build it.
              </h2>
              <p className="max-w-xl text-body-lg text-ink-inverse-muted text-pretty">
                Apprising Creatives partners with Australian agencies and consultancies that need
                reliable engineering capacity for custom software, AI integrations, and complex
                automation.
              </p>
            </div>

            <RevealOnScroll className="grid gap-6 md:grid-cols-2">
              <ComparisonList title="You Handle" items={AGENCY_YOU_HANDLE} />
              <ComparisonList title="We Handle" items={AGENCY_WE_HANDLE} />
            </RevealOnScroll>

            <div className="flex flex-col gap-6">
              <p className="text-body-lg text-ink-inverse">
                Work with us as an extension of your delivery team.
              </p>
              <div>
                <Button
                  href={CTA_HREFS.partnerWithUs}
                  variant="primary"
                  analyticsEvent="partner_with_us_clicked"
                >
                  {CTA_LABELS.partnerWithUs}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
