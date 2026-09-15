"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-btn) px-4 py-3 text-small font-semibold transition-colors";

const PRIMARY_CLASSES =
  "bg-teal text-white border border-teal hover:bg-teal-light hover:border-teal-light";

const SECONDARY_CLASSES = {
  light: "bg-white text-charcoal border border-line-light hover:border-charcoal",
  dark: "bg-transparent text-soft-white border border-line-dark hover:border-cool-gray",
};

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
