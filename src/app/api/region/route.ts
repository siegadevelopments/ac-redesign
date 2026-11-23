// Tells the region banner (src/components/layout/RegionBanner.tsx) which of
// the two markets the visitor appears to be in, so the marketing pages stay
// statically generated: nothing here is read while a page renders.
//
// Vercel adds `x-vercel-ip-country` (an ISO 3166-1 alpha-2 code) at its edge;
// it is not set locally. Only "us" and "au" are ever returned, nothing is
// stored or logged, and the answer is private to the visitor (never cached
// for the next one). In development only, `?country=US` stands in for the
// header so the banner can be tried by hand; production ignores it.
export const dynamic = "force-dynamic";

type RegionAnswer = "us" | "au" | null;

function toRegion(code: string | null): RegionAnswer {
  switch (code?.trim().toUpperCase()) {
    case "US":
      return "us";
    case "AU":
      return "au";
    default:
      return null;
  }
}

export function GET(request: Request) {
  const override =
    process.env.NODE_ENV === "production" ? null : new URL(request.url).searchParams.get("country");
  const region = toRegion(override ?? request.headers.get("x-vercel-ip-country"));
  return Response.json({ region }, { headers: { "Cache-Control": "private, no-store" } });
}
