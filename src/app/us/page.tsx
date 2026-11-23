import type { Metadata } from "next";
import { Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OpeningChapter } from "@/components/story/OpeningChapter";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProblemStory } from "@/components/story/ProblemStory";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildFaqJsonLd } from "@/lib/seo";
import { CTA_HREFS, CTA_LABELS, US_PROBLEM_HREF } from "@/lib/constants";
import {
  US_FAQ,
  US_FAQ_ITEMS,
  US_FINAL_CTA,
  US_OPENING_COPY,
  US_OPENING_MESS,
  US_OPENING_ROWS,
  US_LOCATION,
  US_OUTCOMES,
  US_PICK_CONTENT,
  US_PRICING,
} from "@/lib/content/us";

export const metadata: Metadata = {
  title: "Business Automation for US Businesses",
  description:
    "Apprising Creatives builds simple systems that connect your bookings, forms, follow-ups and invoices, so nobody types the same thing twice. Built in the Philippines, serving US businesses.",
  alternates: {
    canonical: "/us",
    languages: { "en-US": "/us", "en-AU": "/" },
  },
};

// US spelling lives inside this wrapper: the root layout declares en-AU.
export default function UsPage() {
  return (
    <div lang="en-US">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(US_FAQ_ITEMS)) }}
      />
      <OpeningChapter copy={US_OPENING_COPY} appRows={US_OPENING_ROWS} mess={US_OPENING_MESS} />

      <Section tone="light" className="py-10 md:py-12 lg:py-12">
        <Container className="flex flex-wrap items-center gap-4">
          <Button href={US_PROBLEM_HREF} variant="primary">
            {CTA_LABELS.tellUsProblem}
          </Button>
          <Button
            href={CTA_HREFS.bookDiscoveryCall}
            variant="secondary"
            analyticsEvent="discovery_call_clicked"
            analyticsData={{ source: "us_hero" }}
          >
            {CTA_LABELS.bookDiscoveryCall}
          </Button>
        </Container>
      </Section>

      <Section tone="light" className="pt-0 md:pt-0 lg:pt-0">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow={US_OUTCOMES.eyebrow} title={US_OUTCOMES.title} />
          <ul className="grid gap-6 md:grid-cols-2">
            {US_OUTCOMES.items.map((item) => (
              <li key={item.title}>
                <Card className="flex h-full flex-col gap-3">
                  <h3 className="text-h4 font-bold text-ink">{item.title}</h3>
                  <p className="text-body text-ink-muted text-pretty">
                    <span className="font-semibold text-ink">Today: </span>
                    {item.before}
                  </p>
                  <p className="text-body text-ink-muted text-pretty">
                    <span className="font-semibold text-ink">Instead: </span>
                    {item.after}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="raised">
        <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow={US_PRICING.eyebrow} title={US_PRICING.title} />
            <p className="text-body text-ink-muted text-pretty">{US_PRICING.disclaimer}</p>
          </div>
          <dl className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 border-b border-line pb-6">
              <dt className="text-small font-semibold uppercase tracking-[0.12em] text-ink-muted">
                {US_PRICING.projectLabel}
              </dt>
              <dd className="text-h3 font-bold text-ink">{US_PRICING.projectRange}</dd>
              <dd className="text-body text-ink-muted">{US_PRICING.projectNote}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-small font-semibold uppercase tracking-[0.12em] text-ink-muted">
                {US_PRICING.careLabel}
              </dt>
              <dd className="text-h3 font-bold text-ink">{US_PRICING.careRange}</dd>
              <dd className="text-body text-ink-muted">{US_PRICING.careNote}</dd>
            </div>
          </dl>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex max-w-3xl flex-col gap-3">
          <Globe className="text-accent" size={24} strokeWidth={1.5} aria-hidden="true" />
          <h2 className="text-h3 font-bold text-ink text-balance">{US_LOCATION.title}</h2>
          {US_LOCATION.body.map((paragraph) => (
            <p key={paragraph} className="text-body text-ink-muted text-pretty">
              {paragraph}
            </p>
          ))}
        </Container>
      </Section>

      <ProblemStory region="us" pick={US_PICK_CONTENT} />

      <Faq id={US_FAQ.id} eyebrow={US_FAQ.eyebrow} title={US_FAQ.title} items={US_FAQ_ITEMS} />

      <FinalCta
        heading={US_FINAL_CTA.heading}
        body={US_FINAL_CTA.body}
        primaryHref={US_PROBLEM_HREF}
        primaryLabel={CTA_LABELS.tellUsProblem}
        primaryAnalyticsEvent={null}
        secondaryHref={CTA_HREFS.bookDiscoveryCall}
        secondaryLabel={CTA_LABELS.bookDiscoveryCall}
      />
    </div>
  );
}
