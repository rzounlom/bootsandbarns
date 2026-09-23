type SlideControlsProps = {
  index: number;
  length: number;
  label: string;
  tone?: "light" | "dark";
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0">
      <path
        d={direction === "left" ? "M14.5 6.5L9 12l5.5 5.5" : "M9.5 6.5L15 12l-5.5 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SlideControls({
  index,
  length,
  label,
  tone = "light",
  onPrevious,
  onNext,
  onSelect,
}: SlideControlsProps) {
  const onDark = tone === "dark";
  const buttonClass = onDark
    ? "bg-paper text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-cream"
    : "bg-wood text-cream transition duration-200 hover:-translate-y-0.5 hover:bg-ink";
  const counterClass = onDark ? "text-paper" : "text-ink";
  const dotOn = onDark ? "bg-marigold" : "bg-terracotta-dark";
  const dotOff = onDark ? "bg-cream/40 hover:bg-cream/70" : "bg-line hover:bg-ink-soft";

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          className={`inline-flex min-h-11 items-center justify-center gap-1 rounded-full px-3 text-sm font-semibold ${buttonClass}`}
          data-carousel-control=""
          onClick={onPrevious}
        >
          <Chevron direction="left" />
          <span className="hidden min-[400px]:inline">Previous</span>
          <span className="sr-only min-[400px]:hidden">Previous</span>
        </button>
        <p className={`text-base font-semibold tabular-nums ${counterClass}`} aria-live="polite">
          {index + 1} / {length}
        </p>
        <button
          type="button"
          className={`inline-flex min-h-11 items-center justify-center gap-1 rounded-full px-3 text-sm font-semibold ${buttonClass}`}
          data-carousel-control=""
          onClick={onNext}
        >
          <span className="hidden min-[400px]:inline">Next</span>
          <span className="sr-only min-[400px]:hidden">Next</span>
          <Chevron direction="right" />
        </button>
      </div>
      <ul className="mt-2 flex flex-wrap justify-center" aria-label={`${label} slides`}>
        {Array.from({ length }, (_, itemIndex) => (
          <li key={itemIndex}>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-full"
              data-carousel-control=""
              aria-label={`Show ${label} ${itemIndex + 1}`}
              aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => onSelect(itemIndex)}
            >
              <span className={`size-2.5 rounded-full transition-colors duration-200 ${itemIndex === index ? dotOn : dotOff}`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
