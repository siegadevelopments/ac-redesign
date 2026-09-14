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
    ? "bg-navy-slate border-line-dark"
    : "bg-white border-line-light";

  return (
    <div className={`rounded-(--radius-card) border p-6 md:p-8 ${toneClasses} ${className}`}>
      {children}
    </div>
  );
}
