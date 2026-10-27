"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll reveal. The server renders no data-visible attribute, so no-JS and
 * pre-hydration visitors see the finished state (KTD1, R19). Once mounted,
 * content already in view is marked "true" without ever hiding it; content
 * below the fold is armed ("false", hidden start state) and flips to "true"
 * on first intersection. CSS only hides under prefers-reduced-motion:
 * no-preference, so reduced motion always shows the end state.
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
  const [state, setState] = useState<"idle" | "false" | "true">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Already on screen at mount: never hide it, just mark it revealed.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      setState("true");
      return;
    }
    setState("false");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("true");
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
    <Component ref={ref} data-visible={state === "idle" ? undefined : state} className={`reveal-group ${className}`}>
      {children}
    </Component>
  );
}
