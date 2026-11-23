"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tellUsProblemHref } from "@/lib/constants";

/**
 * The footer's Contact link is the only footer item that depends on the
 * route: on /us it goes to /us#problem. Kept as a small client island so the
 * rest of the footer stays server-rendered.
 */
export function FooterContactLink({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <Link href={tellUsProblemHref(pathname)} className={className}>
      Contact
    </Link>
  );
}
