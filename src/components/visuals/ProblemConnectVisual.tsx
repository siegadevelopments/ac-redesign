import { Table2, Mail, MessageSquare, Users, Calendar, Receipt, Network } from "lucide-react";
import { RevealOnScroll } from "@/components/visuals/RevealOnScroll";

const CENTER = { x: 150, y: 150 };

const TOOLS = [
  { label: "Spreadsheets", icon: Table2, x: 150, y: 42, scatterX: 0, scatterY: -22, rot: -8 },
  { label: "Email", icon: Mail, x: 243.5, y: 96, scatterX: 19, scatterY: -11, rot: 9 },
  { label: "CRM", icon: Users, x: 243.5, y: 204, scatterX: 19, scatterY: 11, rot: -7 },
  { label: "Booking", icon: Calendar, x: 150, y: 258, scatterX: 0, scatterY: 22, rot: 8 },
  { label: "Accounting", icon: Receipt, x: 56.5, y: 204, scatterX: -19, scatterY: 11, rot: -9 },
  { label: "Messaging", icon: MessageSquare, x: 56.5, y: 96, scatterX: -19, scatterY: -11, rot: 7 },
];

function lineLength(x: number, y: number) {
  return Math.hypot(x - CENTER.x, y - CENTER.y);
}

export function ProblemConnectVisual() {
  return (
    <RevealOnScroll className="w-full flex justify-center">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-auto max-w-md"
        role="img"
        aria-label="Diagram: spreadsheets, email, messaging, CRM, booking, and accounting tools connecting into one central system."
      >
        {TOOLS.map((tool) => (
          <line
            key={`line-${tool.label}`}
            className="draw-line"
            style={{ ["--dash-length" as string]: lineLength(tool.x, tool.y) }}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={tool.x}
            y2={tool.y}
            stroke="var(--color-line-light)"
            strokeWidth={2}
          />
        ))}

        {TOOLS.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <g
              key={tool.label}
              className="reveal-item-scatter"
              style={{
                ["--scatter-x" as string]: `${tool.scatterX}px`,
                ["--scatter-y" as string]: `${tool.scatterY}px`,
                ["--scatter-rot" as string]: `${tool.rot}deg`,
                ["--reveal-delay" as string]: `${i * 70}ms`,
              }}
            >
              <circle
                cx={tool.x}
                cy={tool.y}
                r={22}
                fill="#ffffff"
                stroke="var(--color-line-light)"
                strokeWidth={1.5}
              />
              <g transform={`translate(${tool.x - 10} ${tool.y - 10})`}>
                <Icon size={20} color="var(--color-charcoal)" strokeWidth={1.75} />
              </g>
              <text
                x={tool.x}
                y={tool.y + 36}
                textAnchor="middle"
                fontSize={11}
                fontFamily="var(--font-sans)"
                fill="var(--color-charcoal-muted)"
              >
                {tool.label}
              </text>
            </g>
          );
        })}

        <g className="reveal-item" style={{ ["--reveal-delay" as string]: "480ms" }}>
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={30}
            fill="var(--color-teal)"
            stroke="var(--color-warm-white)"
            strokeWidth={4}
          />
          <g transform={`translate(${CENTER.x - 11} ${CENTER.y - 11})`}>
            <Network size={22} color="var(--color-soft-white)" strokeWidth={1.75} />
          </g>
        </g>
      </svg>
    </RevealOnScroll>
  );
}
