"use client";

import { useId, useState } from "react";
import { useHydrated } from "@/lib/useHydrated";
import { SECONDARY_SUBMIT_BUTTON_CLASSES } from "@/components/ui/Button";
import { NEWSLETTER_COPY } from "@/lib/content/leadMagnet";
import { NEWSLETTER_INLINE_COPY } from "@/lib/content/story";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";



/**
 * The checklist signup as a quiet fallback beside the problem box (R10, F2).
 * Posts to /api/subscribe like the original newsletter section did, but
 * compact and visually secondary. It shares no fields with the problem box
 * and never sends a problem. The `story-js-only` class is hidden by the
 * <noscript> style in ProblemStory, since this form cannot send without JS.
 */
export function NewsletterInline({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [formLinked, setFormLinked] = useState(true);
  // False during SSR and before hydration, so an early Enter can't submit.
  const hydrated = useHydrated();
  const emailId = useId();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;
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
    <div className={`story-js-only flex flex-col gap-3 border-t border-line pt-6 ${className}`}>
      <p className="text-small text-ink-muted">
        <span className="font-semibold text-ink">{NEWSLETTER_INLINE_COPY.lead}</span>{" "}
        {NEWSLETTER_INLINE_COPY.description}
      </p>

      {status === "success" ? (
        <p className="text-small text-ink" role="status">
          {formLinked ? NEWSLETTER_COPY.successMessage : NEWSLETTER_COPY.delayedMessage}
        </p>
      ) : (
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
          noValidate
        >
          <label htmlFor={emailId} className="sr-only">
            {NEWSLETTER_COPY.formLabel}
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={NEWSLETTER_COPY.placeholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-w-0 flex-1 rounded-(--radius-btn) border border-line-strong bg-surface-raised px-3 py-2 text-small text-ink placeholder:text-ink-muted/80"
            />
            <button
              type="submit"
              disabled={!hydrated || status === "loading"}
              className={`${SECONDARY_SUBMIT_BUTTON_CLASSES} py-2!`}
            >
              {status === "loading" ? "Sending…" : NEWSLETTER_COPY.submitLabel}
            </button>
          </div>
          {status === "error" ? (
            <p className="text-small text-ink-muted" role="alert">
              {NEWSLETTER_COPY.errorMessage}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
