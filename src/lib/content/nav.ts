// Absolute paths (not bare "#hash") so these work correctly from any route,
// not just "/" — Navbar and Footer render on every route.
export const NAV_LINKS = [
  { label: "What We Can Build", href: "/what-we-can-build" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Case Studies", href: "/portfolio" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_NAV_LINKS = [
  { label: "What We Can Build", href: "/what-we-can-build" },
  { label: "Case Studies", href: "/portfolio" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#problem" },
] as const;

export const FOOTER_CAPABILITY_LINKS = [
  { label: "Business Automation", href: "/what-we-can-build" },
  { label: "Custom Business Systems", href: "/what-we-can-build" },
  { label: "AI Implementation", href: "/what-we-can-build" },
] as const;
