import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Previously only listed the homepage — missing even the pre-existing
// /portfolio. All current routes are listed here now (docs/seo.md §47).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/discovery-call`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/for-agencies`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/what-we-can-build`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
