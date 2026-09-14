import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { SolutionExamples } from "@/components/sections/SolutionExamples";
import { ForAgencies } from "@/components/sections/ForAgencies";
import { TechCapabilities } from "@/components/sections/TechCapabilities";
import { WhyApprising } from "@/components/sections/WhyApprising";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Capabilities />
      <Process />
      <SolutionExamples />
      <ForAgencies />
      <TechCapabilities />
      <WhyApprising />
      <Faq />
      <FinalCta />
    </>
  );
}
