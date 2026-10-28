import Script from "next/script";

// Loads Google Analytics 4 only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set, so
// with no ID the site loads no third-party script at all (and next.config.ts
// leaves the CSP untouched). Page views are automatic; our own events go
// through trackEvent() in src/lib/analytics.ts. Ad features are switched off.
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)}, { allow_google_signals: false, allow_ad_personalization_signals: false });`}
      </Script>
    </>
  );
}
