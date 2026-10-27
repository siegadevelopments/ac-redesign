import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Capabilities } from "@/components/sections/Capabilities";
import { SolutionExamples } from "@/components/sections/SolutionExamples";
import { Industries } from "@/components/sections/Industries";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "What We Can Build",
  description:
    "Business automation, custom systems, AI implementation, and integrations for Australian businesses — with concept examples of what we can build and the industries we're testing.",
  alternates: { canonical: "/what-we-can-build" },
};

export default function WhatWeCanBuildPage() {
  return (
    <>
      <Section tone="light">
        <Container className="flex flex-col gap-6">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-accent">
            What We Can Build
          </span>
          <h1 className="max-w-3xl text-display font-extrabold text-ink text-balance">
            Systems that take the repetitive work off your team.
          </h1>
          <p className="max-w-2xl text-body-lg text-ink-muted text-pretty">
            What we do, concept examples of what we can build, and the industries we&apos;re
            testing our approach in.
          </p>
        </Container>
      </Section>
      <Capabilities />
      <SolutionExamples />
      <Industries />
      <FinalCta />
    </>
  );
}
