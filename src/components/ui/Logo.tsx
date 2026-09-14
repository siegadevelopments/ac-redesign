import Image from "next/image";
import Link from "next/link";

// Icon cropped from the provided logo.png (public/logo-mark.png), paired
// with the existing text wordmark rather than the full stacked lockup.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Apprising Creatives — home"
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={214}
        height={197}
        priority
        className="h-8 w-auto"
      />
      <span className="font-display text-body font-bold tracking-tight text-soft-white">
        Apprising <span className="text-teal">Creatives</span>
      </span>
    </Link>
  );
}
