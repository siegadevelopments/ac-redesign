"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/content/nav";
import { CTA_HREFS, CTA_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function MobileNav({
  id,
  isOpen,
  onNavigate,
}: {
  id: string;
  isOpen: boolean;
  onNavigate: () => void;
}) {
  return (
    <div id={id} hidden={!isOpen} className="border-t border-line-inverse bg-surface-inverse [--focus-ring:var(--color-accent-inverse)] lg:hidden">
      <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="rounded-(--radius-btn) px-2 py-3 text-body font-medium text-ink-inverse hover:bg-surface-inverse-raised"
          >
            {link.label}
          </Link>
        ))}
        {/* Click bubbles from the link, so the menu closes (and the scroll lock lifts) before the hash jump. */}
        <div onClick={onNavigate} className="mt-3 flex flex-col">
          <Button href={CTA_HREFS.tellUsProblem} variant="primary">
            {CTA_LABELS.tellUsProblem}
          </Button>
        </div>
      </nav>
    </div>
  );
}
