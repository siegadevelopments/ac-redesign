// Absolute paths (not bare "#hash") so these work correctly from any route,
// not just "/" — Navbar and Footer render on every page.
export const NAV_LINKS = [
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Solutions", href: "/#solutions" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "For Agencies", href: "/#for-agencies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#about" },
] as const;

export const FOOTER_NAV_LINKS = [
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "For Agencies", href: "/#for-agencies" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#final-cta" },
] as const;

export const FOOTER_CAPABILITY_LINKS = [
  { label: "Custom Software", href: "/#what-we-do" },
  { label: "AI Integration", href: "/#what-we-do" },
  { label: "Business Automation", href: "/#what-we-do" },
  { label: "Managed Support", href: "/#what-we-do" },
] as const;
