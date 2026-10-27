"use client";

import { useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MOTION_QUERY, NARROW_QUERY } from "@/lib/motion";

// The motion module for the homepage story (plan KTD1-KTD4, KTD10). GSAP is
// only ever imported from client components (KTD3).
gsap.registerPlugin(useGSAP, ScrollTrigger);
if (typeof window !== "undefined") {
  // The mobile address bar showing/hiding must not re-measure the story (R18).
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Loaded after first paint and never on the server, so the shader can't
// block the hero or the problem box (KTD4, R17).
const GrainCanvas = dynamic(
  () => import("@/components/story/GrainCanvas").then((mod) => mod.GrainCanvas),
  { ssr: false }
);

const MOTION_CONDITIONS = {
  wide: `${MOTION_QUERY} and (min-width: 768px)`,
  narrow: `${MOTION_QUERY} and ${NARROW_QUERY}`,
};

/** Offset of `el` inside `stage`, from layout offsets so GSAP's own transforms never skew it. */
function offsetIn(el: HTMLElement, stage: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== stage) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/**
 * Once layout is final (fonts loaded, triggers measured), put a cold-load
 * hash target such as `/#problem` back in view, in case font swap moved it
 * after the browser's own anchor scroll (KTD10).
 */
function rescrollToHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}

function buildStory(stage: HTMLElement, track: HTMLElement, grainMess: { current: number }, wide: boolean) {
  const rows = new Map<string, HTMLElement>();
  stage.querySelectorAll<HTMLElement>(".opening-row").forEach((row) => {
    if (row.dataset.row) rows.set(row.dataset.row, row);
  });
  // Under 768px the CSS hides the objects marked data-narrow="false".
  const items = Array.from(stage.querySelectorAll<HTMLElement>(".opening-item")).filter(
    (item) => wide || item.dataset.narrow === "true"
  );

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  // Grain calms from busy paper to clean as the mess is put away.
  tl.fromTo(grainMess, { current: 1 }, { current: 0, duration: 1, ease: "none" }, 0);
  // Headline emphasis moves from the problem to the promise.
  tl.to(".opening-before", { opacity: 0, y: -20, duration: 0.18 }, 0.12);
  tl.to(".opening-empty", { opacity: 0, duration: 0.1 }, 0.2);
  tl.to(".opening-after", { opacity: 1, duration: 0.2 }, 0.62);

  const step = items.length > 1 ? 0.5 / (items.length - 1) : 0;
  const revealed = new Set<string>();

  items.forEach((item, i) => {
    const row = item.dataset.to ? rows.get(item.dataset.to) : undefined;
    if (!row) return;
    const at = 0.14 + i * step;

    tl.to(
      item,
      {
        x: () => {
          const a = offsetIn(item, stage);
          const b = offsetIn(row, stage);
          return b.x + row.offsetWidth / 2 - (a.x + item.offsetWidth / 2);
        },
        y: () => {
          const a = offsetIn(item, stage);
          const b = offsetIn(row, stage);
          return b.y + row.offsetHeight / 2 - (a.y + item.offsetHeight / 2);
        },
        scale: () => Math.min(row.offsetWidth / item.offsetWidth, row.offsetHeight / item.offsetHeight) * 1.2,
        rotation: 0,
        duration: 0.32,
      },
      at
    );
    tl.to(item, { opacity: 0, duration: 0.06 }, at + 0.28);

    // The first object to land fills its row.
    if (!revealed.has(row.dataset.row ?? "")) {
      revealed.add(row.dataset.row ?? "");
      tl.to(row, { opacity: 1, duration: 0.08, ease: "power1.out" }, at + 0.27);
    }
  });
}

/**
 * The opening chapter's sticky stage. Renders the server-rendered chapter as
 * children and, where motion is allowed, scrubs it from the html.motion start
 * state to the finished state. Also owns the grain canvas and the post-refresh
 * hash re-scroll, so the page needs nothing extra for KTD10.
 */
export function StoryMotion({ className = "", children }: { className?: string; children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  // 1 = messy paper, 0 = clean. The timeline drives it; GrainCanvas reads it each frame.
  const grainMess = useRef(0);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const track = stage?.parentElement;
      if (!stage || !track) return;

      const mm = gsap.matchMedia();
      // The pre-paint script only adds `motion` when motion is allowed; without
      // it the CSS start state was never painted, so there is nothing to scrub.
      if (document.documentElement.classList.contains("motion")) {
        mm.add(MOTION_CONDITIONS, (context) => {
          const { wide, narrow } = context.conditions ?? {};
          if (wide || narrow) buildStory(stage, track, grainMess, Boolean(wide));
        }, stage);
      }

      let cancelled = false;
      document.fonts.ready.then(() => {
        if (cancelled) return;
        ScrollTrigger.refresh();
        rescrollToHash();
      });

      return () => {
        cancelled = true;
        mm.revert();
      };
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className={className}>
      <GrainCanvas messRef={grainMess} />
      {children}
    </div>
  );
}
