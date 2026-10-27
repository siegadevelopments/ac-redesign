import { Badge } from "@/components/ui/Badge";
import { PICK_CHAPTER_COPY, type ConceptView } from "@/lib/content/story";

/**
 * A phone-shaped concept app screen. Always carries the "Concept" badge and
 * note, whichever view it shows (R13).
 */
export function ConceptApp({ view }: { view: ConceptView }) {
  return (
    <figure className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <div className="rounded-[2rem] border border-line-inverse bg-surface-inverse p-3 shadow-[0_24px_48px_-24px_rgb(21_33_47/0.45)]">
        <div className="flex flex-col gap-4 rounded-[1.5rem] bg-surface-inverse-raised p-5 [--focus-ring:var(--color-accent-inverse)]">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-h4 font-bold text-ink-inverse">{view.title}</p>
            <Badge>{PICK_CHAPTER_COPY.conceptLabel}</Badge>
          </div>
          <p className="text-small text-ink-inverse-muted">{view.subtitle}</p>
          <ul className="flex flex-col gap-2">
            {view.rows.map((row) => (
              <li
                key={row.title}
                className="flex items-start gap-3 rounded-(--radius-btn) border border-line-inverse bg-surface-inverse px-3 py-3"
              >
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-inverse/15 text-small font-bold text-accent-inverse"
                  aria-hidden="true"
                >
                  {row.mark}
                </span>
                <span className="flex flex-col">
                  <span className="text-small font-semibold text-ink-inverse">{row.title}</span>
                  <span className="text-small text-ink-inverse-muted">{row.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="text-center text-small text-ink-muted">
        {PICK_CHAPTER_COPY.conceptNote}
      </figcaption>
    </figure>
  );
}
