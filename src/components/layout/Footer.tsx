import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { FOOTER_NAV_LINKS, FOOTER_CAPABILITY_LINKS } from "@/lib/content/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-inverse bg-surface-inverse text-ink-inverse [--focus-ring:var(--color-accent-inverse)]">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-small text-ink-inverse-muted">
            Your business runs on systems. We make them work smarter.
          </p>
          <p className="max-w-xs text-small text-ink-inverse-muted">
            Built in the Philippines. Serving businesses internationally, including Australia.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-ink-inverse-muted">
            Navigate
          </span>
          {FOOTER_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-small text-ink-inverse-muted hover:text-ink-inverse"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-ink-inverse-muted">
            Capabilities
          </span>
          {FOOTER_CAPABILITY_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-small text-ink-inverse-muted hover:text-ink-inverse"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>

      <Container className="border-t border-line-inverse py-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="text-small text-ink-inverse-muted">© {year} Apprising Creatives</p>
          <Link href="/privacy" className="text-small text-ink-inverse-muted hover:text-ink-inverse">
            Privacy policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
