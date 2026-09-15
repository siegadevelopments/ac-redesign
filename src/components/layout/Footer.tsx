import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { FOOTER_NAV_LINKS, FOOTER_CAPABILITY_LINKS } from "@/lib/content/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-dark bg-deep-navy text-soft-white">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-small text-cool-gray">
            Your business runs on systems. We make them work smarter.
          </p>
          <p className="max-w-xs text-small text-cool-gray/80">
            Built in the Philippines. Serving businesses internationally, including Australia.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-cool-gray">
            Navigate
          </span>
          {FOOTER_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-small text-soft-white/80 hover:text-soft-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <span className="text-label font-semibold uppercase tracking-[0.12em] text-cool-gray">
            Capabilities
          </span>
          {FOOTER_CAPABILITY_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-small text-soft-white/80 hover:text-soft-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>

      <Container className="border-t border-line-dark py-6">
        <p className="text-small text-cool-gray">© {year} Apprising Creatives</p>
      </Container>
    </footer>
  );
}
