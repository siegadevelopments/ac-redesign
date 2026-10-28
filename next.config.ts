import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// No nonce here: the newsletter form (src/components/sections/Newsletter.tsx)
// posts via client-side fetch to our own same-origin /api/subscribe route
// handler rather than a native form submission or third-party script, so it
// doesn't need one — a nonce-based CSP (which requires Proxy + forces every
// page to render dynamically, per Next's CSP guide) would trade away static
// generation for the marketing pages for a marginal security gain.
// 'unsafe-inline' below only covers Next's own inline hydration/flight-data
// scripts and Tailwind's runtime style attributes (e.g. the scroll-reveal
// diagrams' inline CSS custom properties) — there is no user input for an
// attacker to inject through it.
// Google Analytics is only allowed when its measurement ID is configured, so
// without one the CSP stays as strict as before (src/components/analytics).
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const gaScript = gaEnabled ? " https://www.googletagmanager.com" : "";
const gaImg = gaEnabled ? " https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com" : "";
const gaConnect = gaEnabled
  ? " https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com"
  : "";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${gaScript}${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self'${gaImg};
  font-src 'self';
  connect-src 'self'${gaConnect};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader.replace(/\s{2,}/g, " ").trim() },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Brand assets change rarely; a short-lived cache still lets a
        // logo update propagate within a day instead of a full year.
        source: "/:path(logo.png|logo-mark.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
