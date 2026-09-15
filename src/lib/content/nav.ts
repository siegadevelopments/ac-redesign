// Absolute paths (not bare "#hash") so these work correctly from any route,
// not just "/" — Navbar and Footer render on every route.
export const NAV_LINKS = [
  { label: "What We Do", href: "/#what-we-do" },
  { label: "What We Can Build", href: "/#solutions" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Case Studies", href: "/portfolio" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_NAV_LINKS = [
  { label: "What We Do", href: "/#what-we-do" },
  { label: "What We Can Build", href: "/#solutions" },
  { label: "Case Studies", href: "/portfolio" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#final-cta" },
] as const;

export const FOOTER_CAPABILITY_LINKS = [
  { label: "Business Automation", href: "/#what-we-do" },
  { label: "Custom Business Systems", href: "/#what-we-do" },
  { label: "AI Implementation", href: "/#what-we-do" },
] as const;
