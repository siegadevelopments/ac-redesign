"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import type { Region } from "@/lib/constants";
import {
  REGION_BANNER,
  REGION_BANNER_DISMISS_LABEL,
  REGION_BANNER_LABEL,
  REGION_BANNER_STORAGE_KEY,
} from "@/lib/content/region";

/** Which page offers which market: the homepage offers /us, and /us offers the homepage. */
function offerFor(pathname: string, visitor: Region): Region | null {
  if (pathname === "/" && visitor === "us") return "us";
  if (pathname === "/us" && visitor === "au") return "au";
  return null;
}

function remember() {
  try {
    localStorage.setItem(REGION_BANNER_STORAGE_KEY, "1");
  } catch {
    // Storage blocked: the banner may show again next visit, which is harmless.
  }
}

function alreadyAnswered(): boolean {
  try {
    return localStorage.getItem(REGION_BANNER_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * A dismissible, non-modal offer to switch to the other market's page. It
 * only offers: it never redirects, so crawlers, shared links and travellers
 * all keep the page they asked for. It is client-side and appears after the
 * page has loaded, so the marketing pages stay static.
 */
export function RegionBanner() {
  const pathname = usePathname();
  // The offer is tied to the path it was fetched for, so it can't outlive navigation.
  const [answer, setAnswer] = useState<{ pathname: string; offer: Region } | null>(null);
  const offer = answer?.pathname === pathname ? answer.offer : null;

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/us") return;
    if (alreadyAnswered()) return;

    let cancelled = false;
    // The dev-only ?country= stand-in is passed through; production ignores it.
    const country = new URLSearchParams(window.location.search).get("country");
    const url = country ? `/api/region?country=${encodeURIComponent(country)}` : "/api/region";
    fetch(url)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { region?: Region | null } | null) => {
        if (cancelled || !data?.region) return;
        const next = offerFor(pathname, data.region);
        if (next) setAnswer({ pathname, offer: next });
      })
      .catch(() => {
        // No answer means no banner.
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (!offer) return null;
  const { href, message, action } = REGION_BANNER[offer];
  const analytics = { from: pathname, to: href };

  function dismiss() {
    remember();
    trackEvent("region_banner_dismissed", analytics);
    setAnswer(null);
  }

  return (
    <aside
      aria-label={REGION_BANNER_LABEL}
      data-nosnippet
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line-inverse bg-surface-inverse text-ink-inverse [--focus-ring:var(--color-accent-inverse)]"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-3">
        <p className="text-small text-pretty">{message}</p>
        <div className="flex items-center gap-3" onClick={remember}>
          <Button
            href={href}
            variant="secondary"
            onDark
            analyticsEvent="region_banner_accepted"
            analyticsData={analytics}
            className="px-3! py-2!"
          >
            {action}
          </Button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              dismiss();
            }}
            aria-label={REGION_BANNER_DISMISS_LABEL}
            className="inline-flex items-center justify-center rounded-(--radius-btn) border border-line-inverse p-2 text-ink-inverse hover:border-ink-inverse"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}
