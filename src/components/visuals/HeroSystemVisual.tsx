import { RevealOnScroll } from "@/components/visuals/RevealOnScroll";

const NODES = [
  "Business problem",
  "Workflow",
  "Automation",
  "AI",
  "Connected systems",
  "Better operations",
];

const START_Y = 32;
const STEP_Y = 76;
const LINE_X = 20;
const LAST_Y = START_Y + STEP_Y * (NODES.length - 1);
const LINE_LENGTH = LAST_Y - START_Y;
const HEIGHT = LAST_Y + 40;

export function HeroSystemVisual() {
  return (
    <RevealOnScroll className="w-full" as="div">
      <svg
        viewBox={`0 0 320 ${HEIGHT}`}
        className="h-auto w-full max-w-sm"
        role="img"
        aria-label="Diagram: a business problem moves through a workflow, automation, and AI, becoming connected systems that lead to better operations."
      >
        <line
          x1={LINE_X}
          y1={START_Y}
          x2={LINE_X}
          y2={LAST_Y}
          stroke="var(--color-line-inverse)"
          strokeWidth={2}
        />
        <line
          className="draw-line"
          style={{ ["--dash-length" as string]: LINE_LENGTH }}
          x1={LINE_X}
          y1={START_Y}
          x2={LINE_X}
          y2={LAST_Y}
          stroke="var(--color-accent)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <circle
          className="flow-dot"
          r={4}
          fill="var(--color-accent-inverse)"
          style={{ offsetPath: `path("M${LINE_X} ${START_Y} L${LINE_X} ${LAST_Y}")` }}
        />
        {NODES.map((label, i) => {
          const y = START_Y + i * STEP_Y;
          const isLast = i === NODES.length - 1;
          return (
            <g
              key={label}
              className="reveal-item"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <circle
                cx={LINE_X}
                cy={y}
                r={isLast ? 7 : 6}
                fill={isLast ? "var(--color-accent-inverse)" : "var(--color-ink-inverse)"}
                stroke="var(--color-surface-inverse)"
                strokeWidth={3}
              />
              <text
                x={LINE_X + 22}
                y={y}
                dominantBaseline="middle"
                fontSize={14}
                fontFamily="var(--font-sans)"
                fontWeight={isLast ? 600 : 500}
                fill={isLast ? "var(--color-accent-inverse)" : "var(--color-ink-inverse-muted)"}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </RevealOnScroll>
  );
}
