import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { StoryMotion } from "@/components/story/StoryMotion";
import {
  OPENING_APP,
  OPENING_APP_ROWS,
  OPENING_COPY,
  OPENING_MESS,
  type MessItem,
} from "@/lib/content/opening";

// Opening chapter, "paper chaos to app" (plan U5, R2).
// The server renders the FINISHED state (plan KTD1): promise headline, every
// app row, and the mess as a tidy labelled strip. The scattered start state
// exists only under the pre-paint `html.motion` class (src/app/layout.tsx +
// the "Opening chapter" block in globals.css); StoryMotion scrubs from it.
// Class names prefixed `opening-` are the hooks for both.

const DOT_TONES = {
  accent: "bg-accent",
  deep: "bg-surface-deep",
  signal: "bg-signal",
} as const;

// Paper-object colours are literal: they imitate real stationery and app
// chrome, not the site palette. Every text/fill pair here is above 4.5:1.
function MessVisual({ item }: { item: MessItem }) {
  const { visual } = item;
  const shared = "shadow-[0_10px_24px_-12px_rgba(21,33,47,0.35)]";

  switch (visual.kind) {
    case "sheet":
      return (
        <div className={`${shared} overflow-hidden rounded-[3px] border border-[#c9d3c4] bg-white text-[11px] text-ink`}>
          <div className="bg-[#1f7a45] px-2 py-1 font-semibold text-white">{visual.title}</div>
          <table className="w-full border-collapse">
            <tbody>
              {visual.cells.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`whitespace-nowrap border border-[#e2e7df] px-1.5 py-0.5 ${cell.flagged ? "bg-[#fde3dc]" : ""}`}
                    >
                      {cell.text}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "card":
      return (
        <div className={`${shared} rounded-md border border-line bg-surface-raised px-3 py-2.5 text-[12.5px] leading-snug`}>
          <span className="mb-0.5 block font-bold text-ink">{visual.title}</span>
          <span className="text-ink-muted">{visual.meta}</span>
        </div>
      );
    case "receipt":
      return (
        <div className={`${shared} rounded-[2px] bg-white px-3 py-2.5 font-mono text-[11px] leading-[1.45] text-[#333]`}>
          {visual.lines.map((line) => (
            <span key={line} className="block whitespace-pre">
              {line}
            </span>
          ))}
        </div>
      );
    case "bubble":
      return (
        <div className={`${shared} rounded-[16px_16px_16px_4px] bg-[#e6ecf5] px-3 py-2 text-[12.5px] leading-snug text-ink`}>
          {visual.text}
        </div>
      );
    case "sticky":
      return (
        <div
          className={`${shared} rounded-[2px] p-3 text-[13px] font-semibold leading-tight ${
            visual.tone === "pink" ? "bg-[#f2b6a0] text-[#44190c]" : "bg-[#f6d77a] text-[#3d2f0a]"
          }`}
        >
          {visual.text}
        </div>
      );
    case "chip":
      return (
        <div className={`${shared} rounded-[10px] bg-ink px-3 py-2 text-[12px] font-semibold leading-tight text-ink-inverse`}>
          {visual.text}
        </div>
      );
  }
}

function messItemStyle(item: MessItem, index: number): CSSProperties {
  // Start-state scatter, read only by the html.motion rules in globals.css.
  const rotation = (index % 2 ? 1 : -1) * (4 + ((index * 7) % 11));
  const [narrowX, narrowY] = item.narrow ?? [0, 0];
  return {
    "--dx": `${item.desktop[0]}%`,
    "--dy": `${item.desktop[1]}%`,
    "--mx": `${narrowX}%`,
    "--my": `${narrowY}%`,
    "--rot": `${rotation}deg`,
  } as CSSProperties;
}

export function OpeningChapter() {
  return (
    <section
      aria-labelledby="opening-heading"
      className="opening-track relative bg-surface text-ink [--focus-ring:var(--color-accent)]"
    >
      <StoryMotion className="opening-stage opening-paper relative isolate overflow-hidden">
        <Container className="opening-grid relative grid gap-12 pt-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:pt-24 lg:gap-16">
          <div className="opening-copy relative z-30 grid">
            {/* Start-state copy: a visual duplicate shown only under html.motion,
                so it is hidden from assistive tech (the real copy below is
                always in the accessibility tree). */}
            <div aria-hidden="true" className="opening-before hidden [grid-area:1/1]">
              <p className="mb-4 text-label font-semibold uppercase tracking-[0.12em] text-accent">
                {OPENING_COPY.kicker}
              </p>
              <p className="opening-display mb-5 font-display text-display font-extrabold tracking-[-0.03em] text-balance">
                {OPENING_COPY.problem}
              </p>
              <p className="opening-lede max-w-lg text-body-lg text-ink-muted text-pretty">
                {OPENING_COPY.problemLede}
              </p>
              <p className="opening-hint mt-7 text-small font-semibold text-ink-muted">
                {OPENING_COPY.scrollHint} <span aria-hidden="true">↓</span>
              </p>
            </div>

            <div className="opening-after [grid-area:1/1]">
              <p className="mb-4 text-label font-semibold uppercase tracking-[0.12em] text-accent">
                {OPENING_COPY.kicker}
              </p>
              <p className="opening-problem mb-3 text-body-lg font-semibold text-ink-muted text-pretty">
                {OPENING_COPY.problem}
              </p>
              <h1
                id="opening-heading"
                className="opening-display mb-5 text-display font-extrabold tracking-[-0.03em] text-balance"
              >
                {OPENING_COPY.headline}
              </h1>
              <p className="opening-lede max-w-lg text-body-lg text-ink-muted text-pretty">
                {OPENING_COPY.lede}
              </p>
            </div>
          </div>

          <figure
            aria-label="Concept app"
            className="opening-phone relative z-10 mx-auto w-full max-w-[18rem] rounded-[38px] bg-ink p-2.5 shadow-[0_30px_60px_-20px_rgba(21,33,47,0.45)] md:aspect-[9/18.5] md:w-[280px] md:max-w-none"
          >
            <div className="opening-screen relative flex h-full flex-col overflow-hidden rounded-[30px] bg-surface-raised px-3.5 pt-4.5 pb-3.5">
              <p
                aria-hidden="true"
                className="opening-empty pointer-events-none absolute inset-0 z-10 hidden place-items-center px-10 text-center text-[13px] font-semibold text-ink-muted"
              >
                {OPENING_APP.emptyLabel}
              </p>
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="font-display text-[19px] font-bold leading-tight">{OPENING_APP.title}</p>
                <Badge onDark={false}>Concept</Badge>
              </div>
              <p className="mb-3 text-[12px] text-ink-muted">{OPENING_APP.subtitle}</p>
              <ul className="flex flex-col gap-[7px]">
                {OPENING_APP_ROWS.map((row) => (
                  <li
                    key={row.key}
                    data-row={row.key}
                    className="opening-row flex items-center gap-2.5 rounded-xl bg-surface p-2.5 text-[13px] leading-tight"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid size-[26px] flex-none place-items-center rounded-lg text-[12px] font-bold text-white ${DOT_TONES[row.tone]}`}
                    >
                      {row.letter}
                    </span>
                    <span className="min-w-0">
                      <b className="block font-semibold">{row.title}</b>
                      <small className="opening-row-detail block text-[11.5px] text-ink-muted">
                        {row.detail}
                      </small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </figure>
        </Container>

        <Container className="opening-mess-wrap relative z-20 pt-12 pb-16 md:pb-24">
          <p
            id="opening-mess-caption"
            className="opening-caption mb-4 text-label font-semibold uppercase tracking-[0.12em] text-ink-muted"
          >
            {OPENING_COPY.messCaption}
          </p>
          <ul aria-labelledby="opening-mess-caption" className="opening-mess flex flex-wrap items-start gap-3">
            {OPENING_MESS.map((item, index) => (
              <li
                key={item.id}
                data-to={item.to}
                data-narrow={item.narrow ? "true" : "false"}
                className="opening-item"
                style={messItemStyle(item, index)}
              >
                <div aria-hidden="true" className="opening-visual" style={{ width: item.width }}>
                  <MessVisual item={item} />
                </div>
                <span className="sr-only">{item.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </StoryMotion>
    </section>
  );
}
