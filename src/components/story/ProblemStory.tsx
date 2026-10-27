"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useHydrated } from "@/lib/useHydrated";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button, SUBMIT_BUTTON_CLASSES } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { ConceptApp } from "@/components/story/ConceptApp";
import { NewsletterInline } from "@/components/story/NewsletterInline";
import { CONTACT_EMAIL, CTA_HREFS, CTA_LABELS } from "@/lib/constants";
import { HEADACHES, type HeadacheKey } from "@/lib/content/headaches";
import {
  INITIAL_PREFILL,
  PICK_CHAPTER_COPY,
  PILES,
  PROBLEM_BOX_COPY,
  PROBLEM_HANDOFF_KEY,
  conceptViewFor,
  editProblem,
  pickHeadache,
  type ProblemHandoff,
} from "@/lib/content/story";

type Status = "idle" | "loading" | "success" | "error";

const REQUEST_TIMEOUT_MS = 15_000;

const FIELD_CLASSES =
  "rounded-(--radius-btn) border border-line-strong bg-surface-raised px-4 py-3 text-body text-ink placeholder:text-ink-muted/80";

// Hides the JS-only forms when scripting is off; the email link shows instead (R30).
const NOSCRIPT_STYLE = ".story-js-only{display:none!important}";


/**
 * The "pick your mess" chapter and the problem box as one client island
 * (KTD8). `children` is the server-rendered how-we-work chapter, placed
 * between the pick and the box. The box section carries `id="problem"`.
 */
export function ProblemStory({ children }: { children?: ReactNode }) {
  const [prefill, setPrefill] = useState(INITIAL_PREFILL);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);
  // False during SSR and before hydration, so the send button stays
  // disabled and an early Enter can't submit the native form (R17 keeps
  // the fields themselves usable straight away).
  const hydrated = useHydrated();
  const id = useId();

  const view = conceptViewFor(prefill.headache);

  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
  }, [status]);

  function handlePick(headache: HeadacheKey) {
    setPrefill((current) => pickHeadache(current, headache));
    trackEvent("headache_picked", { headache });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("loading");
    setError("");

    const form = new FormData(event.currentTarget);
    // Analytics carries the headache key and an edited flag only, never
    // name, email or problem text (KTD12).
    const analytics = { headache: prefill.headache ?? "none", edited: prefill.edited };
    const payload = {
      name,
      email,
      problem: prefill.text,
      headache: prefill.headache ?? undefined,
      company_website: form.get("company_website") ?? "",
    };

    try {
      const response = await fetch("/api/problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (response.ok) {
        const handoff: ProblemHandoff = {
          name: name.trim(),
          email: email.trim(),
          problem: prefill.text.trim(),
        };
        try {
          sessionStorage.setItem(PROBLEM_HANDOFF_KEY, JSON.stringify(handoff));
        } catch {
          // Storage blocked (private mode, disabled site data): the
          // assessment form just starts blank, as it does today.
        }
        trackEvent("problem_submitted", analytics);
        setStatus("success");
        return;
      }

      let message: string = PROBLEM_BOX_COPY.failureMessage;
      if (response.status === 400) {
        const data = await response.json().catch(() => null);
        if (data && typeof data.error === "string") message = data.error;
      }
      trackEvent("problem_failed", analytics);
      setError(message);
      setStatus("error");
    } catch {
      // Network failure or timeout.
      trackEvent("problem_failed", analytics);
      setError(PROBLEM_BOX_COPY.failureMessage);
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <>
      <section
        id="pick-your-mess"
        aria-labelledby={`${id}-pick-title`}
        className="bg-surface py-16 text-ink md:py-24 lg:py-32"
      >
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-label font-semibold uppercase tracking-[0.12em] text-accent">
                {PICK_CHAPTER_COPY.eyebrow}
              </span>
              <h2
                id={`${id}-pick-title`}
                className="font-display text-h2 font-bold text-balance text-ink"
              >
                {PICK_CHAPTER_COPY.title}
              </h2>
              <p className="max-w-xl text-body-lg text-pretty text-ink-muted">
                {PICK_CHAPTER_COPY.intro}
              </p>
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-small font-medium text-ink">
                {PICK_CHAPTER_COPY.legend}
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {HEADACHES.map((headache) => {
                  const description =
                    headache.key === "something-else"
                      ? PICK_CHAPTER_COPY.somethingElseDescription
                      : PILES[headache.key].mess;
                  return (
                    <label
                      key={headache.key}
                      className="flex cursor-pointer flex-col gap-1 rounded-(--radius-card) border border-line bg-surface-raised p-4 transition-colors hover:border-line-strong has-checked:border-accent has-checked:bg-accent/10 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
                    >
                      <input
                        type="radio"
                        name="headache"
                        value={headache.key}
                        checked={prefill.headache === headache.key}
                        onChange={() => handlePick(headache.key)}
                        className="sr-only"
                      />
                      <span className="text-body font-semibold text-ink">{headache.label}</span>
                      <span className="text-small text-ink-muted">{description}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            <ConceptApp view={view} />
            <p className="sr-only" aria-live="polite">
              {prefill.headache ? PICK_CHAPTER_COPY.announceView(view.title) : ""}
            </p>
          </div>
        </Container>
      </section>

      {children}

      <section
        id="problem"
        aria-labelledby={`${id}-problem-title`}
        className="bg-surface-alt py-16 text-ink md:py-24 lg:py-32"
      >
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
          <div className="flex flex-col gap-4">
            <span className="text-label font-semibold uppercase tracking-[0.12em] text-accent">
              {PROBLEM_BOX_COPY.eyebrow}
            </span>
            <h2
              id={`${id}-problem-title`}
              className="font-display text-h2 font-bold text-balance text-ink"
            >
              {PROBLEM_BOX_COPY.title}
            </h2>
            <p className="max-w-xl text-body-lg text-pretty text-ink-muted">
              {PROBLEM_BOX_COPY.intro}
            </p>
            <p className="max-w-xl text-small text-ink-muted">{PROBLEM_BOX_COPY.securityLine}</p>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="flex flex-col gap-5">
              <noscript>
                <style>{NOSCRIPT_STYLE}</style>
                <p className="text-body text-ink">
                  {PROBLEM_BOX_COPY.noscriptMessage}{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("My problem")}`}
                    className="font-semibold text-accent underline underline-offset-4"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </noscript>

              {status === "success" ? (
                <div className="flex flex-col gap-4" role="status">
                  <h3
                    ref={successHeading}
                    tabIndex={-1}
                    className="font-display text-h3 font-bold text-ink"
                  >
                    {PROBLEM_BOX_COPY.successTitle}
                  </h3>
                  <p className="text-body text-ink-muted">{PROBLEM_BOX_COPY.successBody}</p>
                  <div>
                    <Button
                      href={CTA_HREFS.bookDiscoveryCall}
                      analyticsEvent="discovery_call_clicked"
                      analyticsData={{ source: "problem_success" }}
                    >
                      {CTA_LABELS.bookDiscoveryCall}
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  method="post"
                  onSubmit={handleSubmit}
                  className="story-js-only flex flex-col gap-4"
                  aria-describedby={error ? `${id}-error` : undefined}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor={`${id}-name`} className="text-small font-medium text-ink">
                        {PROBLEM_BOX_COPY.nameLabel}
                      </label>
                      <input
                        id={`${id}-name`}
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className={FIELD_CLASSES}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor={`${id}-email`} className="text-small font-medium text-ink">
                        {PROBLEM_BOX_COPY.emailLabel}
                      </label>
                      <input
                        id={`${id}-email`}
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={FIELD_CLASSES}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor={`${id}-problem`} className="text-small font-medium text-ink">
                      {PROBLEM_BOX_COPY.problemLabel}
                    </label>
                    <p id={`${id}-problem-hint`} className="text-small text-ink-muted">
                      {PROBLEM_BOX_COPY.problemHint}
                    </p>
                    <textarea
                      id={`${id}-problem`}
                      name="problem"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={5}
                      aria-describedby={`${id}-problem-hint`}
                      value={prefill.text}
                      onChange={(event) =>
                        setPrefill((current) => editProblem(current, event.target.value))
                      }
                      className={FIELD_CLASSES}
                    />
                  </div>

                  {/* Honeypot (KTD7): hidden from people and assistive tech. */}
                  <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor={`${id}-company-website`}>Company website</label>
                    <input
                      id={`${id}-company-website`}
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!hydrated || status === "loading"}
                    className={SUBMIT_BUTTON_CLASSES}
                  >
                    {status === "loading" ? PROBLEM_BOX_COPY.sendingLabel : PROBLEM_BOX_COPY.submitLabel}
                  </button>

                  {status === "error" ? (
                    <p id={`${id}-error`} className="text-small text-ink" role="alert">
                      {error}
                    </p>
                  ) : null}
                </form>
              )}
            </Card>

            <NewsletterInline />
          </div>
        </Container>
      </section>
    </>
  );
}
