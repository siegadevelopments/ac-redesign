import type { ReactNode } from "react";

export function Card({
  onDark = false,
  children,
  className = "",
}: {
  onDark?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const toneClasses = onDark
    ? "bg-surface-inverse-raised border-line-inverse [--focus-ring:var(--color-accent-inverse)]"
    : "bg-surface-raised border-line [--focus-ring:var(--color-accent)]";

  return (
    <div className={`rounded-(--radius-card) border p-6 md:p-8 ${toneClasses} ${className}`}>
      {children}
    </div>
  );
}
