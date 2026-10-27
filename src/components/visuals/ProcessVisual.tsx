"use client";

import { useState } from "react";
import { PROCESS_STEPS } from "@/lib/content/process";

export function ProcessVisual() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ol className="flex flex-col">
      {PROCESS_STEPS.map((step, i) => {
        const isOpen = activeIndex === i;
        const isLast = i === PROCESS_STEPS.length - 1;
        const panelId = `process-panel-${step.number}`;
        const buttonId = `process-button-${step.number}`;

        return (
          <li key={step.number} className="flex gap-4 md:gap-5">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-label font-semibold transition-colors ${
                  isOpen
                    ? "border-accent bg-accent text-ink-on-accent"
                    : "border-line bg-surface-raised text-ink-muted"
                }`}
                aria-hidden="true"
              >
                {step.number}
              </span>
              {!isLast ? (
                <span className="w-px flex-1 bg-line" aria-hidden="true" />
              ) : null}
            </div>

            <div className="flex-1 pb-8">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setActiveIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-2 text-left text-h4 font-bold text-ink"
                >
                  {step.title}
                  <span
                    className={`shrink-0 text-ink-muted transition-transform motion-safe:duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="accordion-panel"
                data-open={isOpen}
              >
                <div>
                  <p className="max-w-lg pb-2 text-body text-ink-muted">{step.description}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
