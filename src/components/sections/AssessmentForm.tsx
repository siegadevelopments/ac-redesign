"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SUBMIT_BUTTON_CLASSES } from "@/components/ui/Button";
import { ASSESSMENT_FORM_COPY } from "@/lib/content/assessment";
import { trackEvent } from "@/lib/analytics";
import { PROBLEM_HANDOFF_KEY } from "@/lib/content/story";

type Status = "idle" | "loading" | "success" | "error";

const FIELD_CLASSES =
  "rounded-(--radius-btn) border border-line-strong bg-surface-raised px-4 py-3 text-body text-ink placeholder:text-ink-muted/80";

export function AssessmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const hasStarted = useRef(false);
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-fill from a problem sent on the homepage (uncontrolled inputs, no state).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(PROBLEM_HANDOFF_KEY);
      if (!raw) return;
      const data: unknown = JSON.parse(raw);
      const form = formRef.current;
      if (form && data && typeof data === "object") {
        const { name, email, problem } = data as Record<string, unknown>;
        if (typeof name === "string" && typeof email === "string" && typeof problem === "string") {
          const values = { name, email, challenge: problem };
          for (const [field, value] of Object.entries(values)) {
            const el = form.elements.namedItem(field);
            if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.value = value;
          }
        }
      }
      sessionStorage.removeItem(PROBLEM_HANDOFF_KEY);
    } catch {
      // Storage blocked or malformed value: leave the form blank.
    }
  }, []);

  function handleFirstInteraction() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackEvent("assessment_started");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      business: form.get("business"),
      email: form.get("email"),
      website: form.get("website"),
      industry: form.get("industry"),
      teamSize: form.get("teamSize"),
      challenge: form.get("challenge"),
      currentTools: form.get("currentTools"),
      automateWish: form.get("automateWish"),
    };

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("assessment submit failed");
      setStatus("success");
      trackEvent("assessment_completed");
      trackEvent("contact_form_submitted", { form: "assessment" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="flex flex-col gap-3">
        <p className="text-body-lg font-semibold text-ink" role="status">
          {ASSESSMENT_FORM_COPY.successMessage}
        </p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-5">
      <h2 className="text-h4 font-bold text-ink">{ASSESSMENT_FORM_COPY.formTitle}</h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onFocus={handleFirstInteraction}
        className="flex flex-col gap-4"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-name`} className="text-small font-medium text-ink">
              Name
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              className={FIELD_CLASSES}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-business`} className="text-small font-medium text-ink">
              Business
            </label>
            <input
              id={`${formId}-business`}
              name="business"
              type="text"
              required
              autoComplete="organization"
              className={FIELD_CLASSES}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-email`} className="text-small font-medium text-ink">
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD_CLASSES}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-website`} className="text-small font-medium text-ink">
              Website (optional)
            </label>
            <input id={`${formId}-website`} name="website" type="text" className={FIELD_CLASSES} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-industry`} className="text-small font-medium text-ink">
              Industry (optional)
            </label>
            <input id={`${formId}-industry`} name="industry" type="text" className={FIELD_CLASSES} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-teamSize`} className="text-small font-medium text-ink">
            Approximate team size (optional)
          </label>
          <input id={`${formId}-teamSize`} name="teamSize" type="text" className={FIELD_CLASSES} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-challenge`} className="text-small font-medium text-ink">
            Biggest operational challenge
          </label>
          <textarea
            id={`${formId}-challenge`}
            name="challenge"
            required
            rows={3}
            className={FIELD_CLASSES}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-currentTools`} className="text-small font-medium text-ink">
            Current systems/tools (optional)
          </label>
          <input id={`${formId}-currentTools`} name="currentTools" type="text" className={FIELD_CLASSES} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-automateWish`} className="text-small font-medium text-ink">
            What do you wish you could automate? (optional)
          </label>
          <textarea
            id={`${formId}-automateWish`}
            name="automateWish"
            rows={2}
            className={FIELD_CLASSES}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={SUBMIT_BUTTON_CLASSES}
        >
          {status === "loading" ? "Sending…" : ASSESSMENT_FORM_COPY.submitLabel}
        </button>

        {status === "error" ? (
          <p className="text-small text-ink-muted" role="alert">
            {ASSESSMENT_FORM_COPY.errorMessage}
          </p>
        ) : (
          <p className="text-small text-ink-muted">{ASSESSMENT_FORM_COPY.privacyNote}</p>
        )}
      </form>
    </Card>
  );
}
