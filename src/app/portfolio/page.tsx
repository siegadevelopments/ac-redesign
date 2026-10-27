import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { PORTFOLIO_ITEMS } from "@/lib/content/portfolio";

// Nav-labeled "Case Studies" as of 2026-09 — URL stays /portfolio since it's
// already live/indexed and only one real case study exists. See
// docs/case-studies.md.
export const metadata: Metadata = {
  title: "Case Studies & Portfolio",
  description:
    "A look at what Apprising Creatives has built — real client work and internal products, clearly labeled and never fabricated.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageViewTracker event="case_study_viewed" />

      <Section tone="dark">
        <Container className="flex flex-col gap-6">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-accent-inverse">
            Case Studies
          </span>
          <h1 className="max-w-3xl text-display font-extrabold text-ink-inverse text-balance">
            What we&apos;ve built.
          </h1>
          <p className="max-w-2xl text-body-lg text-ink-inverse-muted text-pretty">
            A mix of real client engagements and internal products. Each is labeled clearly below
            — we never present a demo or internal build as client work.
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading title="Selected work" />

          <div className="grid gap-8 md:grid-cols-2">
            {PORTFOLIO_ITEMS.map((item) => (
              <Card key={item.title} className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-h4 font-bold text-ink">{item.title}</h2>
                  <Badge onDark={false}>{item.badgeLabel}</Badge>
                </div>
                <p className="text-body text-ink-muted">{item.summary}</p>
                <ul className="flex flex-col gap-2 pt-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="text-small text-ink-muted">
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-small font-semibold text-ink hover:text-accent"
                >
                  Visit {item.title}
                  <ExternalLink className="text-accent" size={15} aria-hidden="true" />
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
