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

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-line-dark bg-deep-navy/95 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-(--container-page) items-center justify-between px-6 py-4 md:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-small font-medium text-cool-gray transition-colors hover:text-soft-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={CTA_HREFS.bookDiscoveryCall} variant="primary">
            {CTA_LABELS.bookDiscoveryCall}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-(--radius-btn) border border-line-dark p-2 text-soft-white lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <MobileNav id="mobile-nav" isOpen={isOpen} onNavigate={() => setIsOpen(false)} />
    </header>
  );
}
