import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Apprising Creatives collects when you use this site, why, who handles it, and how to ask us to see or delete it.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "29 October 2026";

// Describes what the site actually does (forms, Resend, Kit, Vercel, Google
// Analytics). It deliberately claims no legal compliance standard — see
// docs/australian-market.md and docs/trust-and-claims.md. Update this page in
// the same change as any new data collection or third-party service.
const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What we collect",
    body: [
      "Tell us your problem: your name, email address and the problem you describe. If you pick one of the headaches first, we also record which one.",
      "Free assessment request: your name, business name, email, and any of these you choose to give us: website, industry, team size, your biggest challenge, the tools you use now, and what you would like to automate.",
      "Checklist signup: your email address.",
      "Email to us: whatever you send, and your email address.",
      "Site visits: through Google Analytics we see which pages are viewed, roughly where visitors are, what device and browser they use, and which buttons are used. We do not send your name, email or the text of your problem to analytics.",
    ],
  },
  {
    title: "Please keep sensitive details out",
    body: [
      "You only need to describe the problem. Please do not put patient, client or health information, passwords or payment details in any form or email to us. If we need more detail we will ask how to handle it safely.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "To read your message and reply, to send a short confirmation email to the address you gave us when you use the problem box, to prepare for an assessment call, to send the checklist or the occasional email you signed up for, and to understand which parts of the site help visitors. We do not sell your details.",
    ],
  },
  {
    title: "Who handles it for us",
    body: [
      "We use a few services to run the site and to look after your message. They handle your information only to provide their service to us.",
      "Vercel hosts the website. Resend delivers the email that tells us about your message and the confirmation email we send back to you. Kit stores contacts and sends our emails, including the checklist. Google Analytics measures site use.",
      "Some of these providers are based outside Australia, so your information may be processed or stored in other countries, including the United States.",
    ],
  },
  {
    title: "Cookies and analytics",
    body: [
      "Google Analytics uses cookies or similar technology to tell visits apart. We have turned off Google's advertising and ad-personalisation features. You can block analytics cookies in your browser settings, and the site works the same without them.",
      "While you move between the problem box and the assessment form, your browser holds what you typed in temporary session storage so you do not have to retype it. It is cleared when you close the tab and is never sent anywhere by itself.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "We keep messages and contact records for as long as we need them to reply and to keep a record of the conversation, or until you ask us to delete them.",
    ],
  },
  {
    title: "Seeing, fixing or deleting your information",
    body: [
      `Email ${CONTACT_EMAIL} and tell us what you would like: a copy of what we hold, a correction, or deletion. We will reply by email. You can also unsubscribe from any email we send using the link at the bottom of it.`,
    ],
  },
  {
    title: "Who we are",
    body: [
      "Apprising Creatives is a small team based in the Philippines that serves businesses internationally, including in Australia. We are not an Australian-incorporated company, and this policy does not claim compliance with any particular privacy law or certification.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "If we change what we collect or who handles it, we will update this page and the date below.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="What we collect, and what we do with it."
        lead="Plain version: we collect what you give us in our forms and some basic site-visit data, we use it to reply to you, and you can ask us to show or delete it at any time."
      />

      <Section tone="light" className="pt-0 md:pt-0 lg:pt-0">
        <Container>
          <div className="flex max-w-3xl flex-col gap-10">
            {SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h2 className="text-h4 font-bold text-ink">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-body text-ink-muted text-pretty"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
            <p className="border-t border-line pt-6 text-small text-ink-muted">
              Last updated {LAST_UPDATED}.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
