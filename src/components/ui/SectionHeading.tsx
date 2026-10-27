export function SectionHeading({
  eyebrow,
  title,
  subhead,
  onDark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  onDark?: boolean;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <span
          className={`text-label font-semibold uppercase tracking-[0.12em] ${
            onDark ? "text-accent-inverse" : "text-accent"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`text-h2 font-bold text-balance max-w-3xl ${
          onDark ? "text-ink-inverse" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subhead ? (
        <p
          className={`text-body-lg max-w-xl text-pretty ${
            onDark ? "text-ink-inverse-muted" : "text-ink-muted"
          }`}
        >
          {subhead}
        </p>
      ) : null}
    </div>
  );
}
