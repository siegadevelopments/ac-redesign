"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Sets data-visible="true" on first intersection so children can hang
 * motion-safe:data-[visible=true]:... styling off it. Base styles (no JS,
 * reduced motion) must always render the complete/correct end state —
 * motion only adds a starting transform under motion-safe.
 */
export function RevealOnScroll({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as "div";

  return (
    <Component ref={ref} data-visible={visible} className={`reveal-group ${className}`}>
      {children}
    </Component>
  );
}
