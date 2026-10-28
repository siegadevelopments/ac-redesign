import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Target, Layers, TrendingUp, Handshake, ShieldCheck, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/visuals/RevealOnScroll";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "A small, founder-led team building business automation, custom systems, and AI implementation for Australian businesses — built internationally, serving Australia.",
  alternates: { canonical: "/about" },
};

const REASONS = [
  {
    icon: Target,
    title: "We start with your problem",
    description: "Before any technology, we work out what is actually slowing your team down.",
  },
  {
    icon: Layers,
    title: "One team, start to finish",
    description: "The same small team from the first conversation through to launch and support.",
  },
  {
    icon: TrendingUp,
    title: "Built to grow with you",
    description: "Systems that change as your team and your clients grow.",
  },
  {
    icon: Handshake,
    title: "Someone on your side",
    description: "We work with your team, not just through a ticket queue.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small, founder-led team that builds simple systems for busy teams."
        lead="Apprising Creatives is deliberately small: a founder handling business development, a technical co-founder, a graphics designer, and a junior developer. We're honest about that — we're not pitching ourselves as a large agency, and we don't need to be to build the kind of systems described on this site."
      />

      <Section tone="light" className="pt-0 md:pt-0 lg:pt-0">
        <Container className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="How We Work"
              title="You talk to the people who build it."
            />
          </div>
          <p className="text-body-lg text-ink-muted text-pretty md:col-span-6 md:col-start-7">
            Every engagement starts with a conversation with the founder or the technical
            co-founder, not a sales layer. See the Free Automation Assessment. From there the same
            small team handles everything: discovery, design, build, and ongoing support through
            the Business Systems Care Plan once a system is live.
          </p>
        </Container>
      </Section>

      <Section tone="raised">
        <Container className="flex flex-col gap-12 md:gap-16">
          <SectionHeading eyebrow="Why Apprising" title="What you get from working with us." />
          <RevealOnScroll className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {REASONS.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="reveal-item flex gap-4 border-t border-line pt-6"
                  style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                >
                  <Icon
                    className="mt-1 shrink-0 text-accent"
                    size={22}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-h4 font-bold text-ink">{reason.title}</h3>
                    <p className="text-body text-ink-muted">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </RevealOnScroll>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-3">
            <Globe className="text-accent" size={24} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-h4 font-bold text-ink">Built internationally, serving Australia</h3>
            <p className="text-body text-ink-muted text-pretty">
              Apprising Creatives is built in the Philippines and serves businesses
              internationally, including Australia. We&apos;re not an Australian-incorporated
              company — we&apos;re transparent about that, and it&apos;s part of how we can offer
              engineering capacity without the overhead of a large local team.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <ShieldCheck className="text-accent" size={24} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="text-h4 font-bold text-ink">Security-conscious by default</h3>
            <p className="text-body text-ink-muted text-pretty">
              Automation without security is just another risk. Every system we build uses secure
              authentication, access control, secure API design, and logging as standard
              practice. We don&apos;t hold formal compliance certifications (SOC 2, HIPAA, or
              similar), and we won&apos;t imply otherwise — we&apos;ll tell you plainly what our
              security posture is and isn&apos;t.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
