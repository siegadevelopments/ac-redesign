"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { NAV_LINKS } from "@/lib/content/nav";
import { CTA_HREFS, CTA_LABELS } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Release the body scroll lock synchronously: the effect below runs after
  // render, too late for a hash navigation that starts on this same click.
  function closeMenu() {
    document.body.style.overflow = "";
    setIsOpen(false);
  }

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-line-inverse bg-surface-inverse/95 backdrop-blur [--focus-ring:var(--color-accent-inverse)]"
    >
      <div className="mx-auto flex w-full max-w-(--container-page) items-center justify-between px-6 py-4 md:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-small font-medium text-ink-inverse-muted transition-colors hover:text-ink-inverse"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={CTA_HREFS.tellUsProblem} variant="primary">
            {CTA_LABELS.tellUsProblem}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {/* Compact action stays visible outside the menu on phones (R28). */}
          <div onClick={closeMenu}>
            <Button href={CTA_HREFS.tellUsProblem} variant="primary" className="px-3! py-2! whitespace-nowrap">
              <span className="sm:hidden" aria-hidden="true">Tell us</span>
              <span className="sr-only sm:not-sr-only">{CTA_LABELS.tellUsProblem}</span>
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-(--radius-btn) border border-line-inverse p-2 text-ink-inverse"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <MobileNav id="mobile-nav" isOpen={isOpen} onNavigate={closeMenu} />
    </header>
  );
}
