"use client";

import { useId, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SUBMIT_BUTTON_CLASSES } from "@/components/ui/Button";
import { LEAD_MAGNET, NEWSLETTER_COPY } from "@/lib/content/leadMagnet";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [formLinked, setFormLinked] = useState(true);
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
      const data = await response.json();
      setFormLinked(data.formLinked !== false);
      setStatus("success");
      trackEvent("contact_form_submitted", { form: "newsletter" });
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
                  className="mt-0.5 shrink-0 text-accent-inverse"
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="text-body text-ink-inverse-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Card onDark className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Mail className="text-accent-inverse" size={22} strokeWidth={1.5} aria-hidden="true" />
            <span className="text-label font-semibold uppercase tracking-[0.12em] text-ink-inverse-muted">
              Get the checklist
            </span>
          </div>

          {status === "success" ? (
            <p className="text-body text-ink-inverse" role="status">
              {formLinked ? NEWSLETTER_COPY.successMessage : NEWSLETTER_COPY.delayedMessage}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor={emailId} className="text-small font-medium text-ink-inverse">
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
                  className="rounded-(--radius-btn) border border-ink-inverse-muted bg-surface-inverse px-4 py-3 text-body text-ink-inverse placeholder:text-ink-inverse-muted"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={SUBMIT_BUTTON_CLASSES}
              >
                {status === "loading" ? "Sending…" : NEWSLETTER_COPY.submitLabel}
              </button>

              {status === "error" ? (
                <p className="text-small text-ink-inverse-muted" role="alert">
                  {NEWSLETTER_COPY.errorMessage}
                </p>
              ) : (
                <p className="text-small text-ink-inverse-muted">{NEWSLETTER_COPY.supporting}</p>
              )}
            </form>
          )}
        </Card>
      </Container>
    </Section>
  );
}
