import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { AGENCY_YOU_HANDLE, AGENCY_WE_HANDLE } from "@/lib/content/agencyComparison";
import { CTA_HREFS, CTA_LABELS } from "@/lib/constants";

function ComparisonList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-4 rounded-(--radius-card) border border-line-dark bg-deep-navy p-6 md:p-8">
      <span className="text-label font-semibold uppercase tracking-[0.12em] text-cool-gray">
        {title}
      </span>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="text-body text-soft-white">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ForAgencies() {
  return (
    <Section id="for-agencies" tone="dark">
      <Container>
        {/* Featured treatment — §24 requires this to read as more important
            than a standard section on the same dark background. */}
        <div className="overflow-hidden rounded-(--radius-lg) border border-line-dark bg-navy-slate">
          <div className="h-1 w-full bg-teal" aria-hidden="true" />

          <div className="flex flex-col gap-12 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col gap-5">
              <span className="text-label font-semibold uppercase tracking-[0.12em] text-teal-light">
                For Agencies
              </span>
              <h2 className="max-w-3xl text-h2 font-bold text-soft-white text-balance">
                Sell the solution. We&apos;ll help build it.
              </h2>
              <p className="max-w-xl text-body-lg text-cool-gray text-pretty">
                Apprising Creatives partners with Australian agencies and consultancies that need
                reliable engineering capacity for custom software, AI integrations, and complex
                automation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ComparisonList title="You Handle" items={AGENCY_YOU_HANDLE} />
              <ComparisonList title="We Handle" items={AGENCY_WE_HANDLE} />
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-body-lg text-soft-white">
                Work with us as an extension of your delivery team.
              </p>
              <div>
                <Button href={CTA_HREFS.partnerWithUs} variant="primary">
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
