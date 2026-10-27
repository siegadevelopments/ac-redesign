"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-btn) px-4 py-3 text-small font-semibold transition-colors";

const PRIMARY_CLASSES =
  "bg-accent text-ink-on-accent border border-accent hover:bg-accent-strong hover:border-accent-strong";

const SECONDARY_CLASSES = {
  light: "bg-surface-raised text-ink border border-line-strong hover:border-ink",
  dark: "bg-transparent text-ink-inverse border border-ink-inverse-muted hover:border-ink-inverse",
};

/** Primary-button look for a native `<button type="submit">` in a form, which `Button` (a link) can't be. */
export const SUBMIT_BUTTON_CLASSES = `${BASE_CLASSES} ${PRIMARY_CLASSES} disabled:cursor-not-allowed disabled:opacity-70`;

export function Button({
  href,
  variant = "primary",
  onDark = false,
  analyticsEvent,
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  onDark?: boolean;
  /** Fires a docs/conversion-strategy.md analytics event on click — see src/lib/analytics.ts. */
  analyticsEvent?: AnalyticsEvent;
  children: ReactNode;
  className?: string;
}) {
  const variantClasses =
    variant === "primary"
      ? PRIMARY_CLASSES
      : SECONDARY_CLASSES[onDark ? "dark" : "light"];

  const classes = `${BASE_CLASSES} ${variantClasses} ${className}`;
  const isExternalOrAnchor = href.startsWith("#") || href.startsWith("mailto:");
  const handleClick = analyticsEvent ? () => trackEvent(analyticsEvent) : undefined;

  if (isExternalOrAnchor) {
    return (
      <a href={href} className={classes} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={handleClick}>
      {children}
    </Link>
  );
}
