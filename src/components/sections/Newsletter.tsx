"use client";

import { useId, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LEAD_MAGNET, NEWSLETTER_COPY } from "@/lib/content/leadMagnet";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const emailId = useId();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("subscribe failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="newsletter" tone="dark">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow={NEWSLETTER_COPY.eyebrow}
            title={LEAD_MAGNET.title}
            subhead={LEAD_MAGNET.description}
            onDark
          />

          <ul className="flex flex-col gap-3">
            {LEAD_MAGNET.checklistItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-teal-light"
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="text-body text-cool-gray">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card onDark className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Mail className="text-teal-light" size={22} strokeWidth={1.5} aria-hidden="true" />
            <span className="text-label font-semibold uppercase tracking-[0.12em] text-cool-gray">
              Get the checklist
            </span>
          </div>

          {status === "success" ? (
            <p className="text-body text-soft-white" role="status">
              {NEWSLETTER_COPY.successMessage}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor={emailId} className="text-small font-medium text-soft-white">
                  {NEWSLETTER_COPY.formLabel}
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={NEWSLETTER_COPY.placeholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-(--radius-btn) border border-line-dark bg-deep-navy px-4 py-3 text-body text-soft-white placeholder:text-cool-gray/70"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-(--radius-btn) border border-teal bg-teal px-4 py-3 text-small font-semibold text-white transition-colors hover:bg-teal-light hover:border-teal-light disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending…" : NEWSLETTER_COPY.submitLabel}
              </button>

              {status === "error" ? (
                <p className="text-small text-cool-gray" role="alert">
                  {NEWSLETTER_COPY.errorMessage}
                </p>
              ) : (
                <p className="text-small text-cool-gray">{NEWSLETTER_COPY.supporting}</p>
              )}
            </form>
          )}
        </Card>
      </Container>
    </Section>
  );
}
