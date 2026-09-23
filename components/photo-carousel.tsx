"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Reveal } from "@/components/reveal";
import { galleryPhotos } from "@/lib/media";

const INTERVAL_MS = 6500;
const HOLD_MS = 8000;

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [lightbox, setLightbox] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [holding, setHolding] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const holdTimer = useRef<number | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const titleId = useId();
  const count = galleryPhotos.length;
  const photo = galleryPhotos[index];
  const nextPhoto = galleryPhotos[(index + 1) % count];
  const reduceMotion = useSyncExternalStore(subscribeToMotion, motionSnapshot, () => false);
  const paused = reduceMotion || userPaused || hovered || focused || holding || !inView || lightbox;

  const holdAuto = useCallback(() => {
    setHolding(true);
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => setHolding(false), HOLD_MS);
  }, []);

  const go = useCallback(
    (nextIndex: number, nextDirection: "next" | "prev") => {
      setDirection(nextDirection);
      setIndex((nextIndex + count) % count);
    },
    [count],
  );

  const showPrevious = useCallback(() => {
    holdAuto();
    go(index - 1, "prev");
  }, [go, holdAuto, index]);

  const showNext = useCallback(() => {
    holdAuto();
    go(index + 1, "next");
  }, [go, holdAuto, index]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.4));
      },
      { threshold: [0, 0.4, 0.8] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setDirection("next");
      setIndex((current) => (current + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  useEffect(() => {
    return () => {
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightbox && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!lightbox && dialog.open) {
      dialog.close();
    }
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, showNext, showPrevious]);

  function onKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("dialog")) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-[linear-gradient(180deg,#f6efe3_0%,#f3e7d4_100%)] text-ink"
    >
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <Reveal>
        <p className="kicker text-terracotta-dark">Gallery</p>
        <h2
          id="gallery-heading"
          className="mt-3 font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl"
        >
          Life in the pens
        </h2>
        <p className="mt-4 max-w-xl text-[1.075rem] leading-relaxed text-ink-soft sm:text-lg">
          Fourteen photographs. The reel advances on its own, and you can move through it
          whenever you like.
        </p>
      </Reveal>
    <div
      ref={rootRef}
      className="mt-8"
      aria-roledescription="carousel"
      aria-label="Farm photographs"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
    >
      <div
        className="overflow-hidden rounded-[1.25rem] bg-cream-deep shadow-[0_24px_40px_-28px_rgb(44_22_12/0.45)] ring-1 ring-line"
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("[data-carousel-control]")) return;
          if (event.button !== 0) return;
          swipe.current = { x: event.clientX, y: event.clientY };
          dragged.current = false;
        }}
        onPointerUp={(event) => {
          if (!swipe.current) return;
          const dx = event.clientX - swipe.current.x;
          const dy = event.clientY - swipe.current.y;
          swipe.current = null;
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
          dragged.current = true;
          if (dx < 0) showNext();
          else showPrevious();
        }}
        onPointerCancel={() => {
          swipe.current = null;
        }}
      >
        <button
          type="button"
          className="relative block aspect-[20/9] w-full text-left"
          aria-label={photo.alt}
          onClick={() => {
            if (dragged.current) {
              dragged.current = false;
              return;
            }
            setLightbox(true);
          }}
        >
          <Image
            key={photo.src}
            src={photo.src}
            alt=""
            fill
            sizes="(min-width: 1152px) 72rem, 100vw"
            className={`object-contain ${direction === "next" ? "reel-next" : "reel-prev"}`}
            preload={index === 0}
          />
          <Image
            src={nextPhoto.src}
            alt=""
            fill
            sizes="(min-width: 1152px) 72rem, 100vw"
            className="pointer-events-none object-contain opacity-0"
            aria-hidden
          />
        </button>
      </div>

      {reduceMotion ? null : (
        <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
          <div
            key={index}
            className="reel-progress h-full w-full origin-left bg-marigold"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-wood px-3 text-sm font-semibold text-cream transition duration-200 hover:bg-ink"
          data-carousel-control=""
          onClick={showPrevious}
        >
          <Chevron direction="left" />
          <span className="hidden min-[400px]:inline">Previous</span>
          <span className="sr-only min-[400px]:hidden">Previous</span>
        </button>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-ink tabular-nums" aria-live="polite">
            {index + 1} / {count}
          </p>
          {reduceMotion ? null : (
            <button
              type="button"
              className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-3 text-sm font-semibold text-ink"
              data-carousel-control=""
              aria-pressed={userPaused}
              onClick={() => setUserPaused((value) => !value)}
            >
              {userPaused ? "Play" : "Pause"}
            </button>
          )}
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-wood px-3 text-sm font-semibold text-cream transition duration-200 hover:bg-ink"
          data-carousel-control=""
          onClick={showNext}
        >
          <span className="hidden min-[400px]:inline">Next</span>
          <span className="sr-only min-[400px]:hidden">Next</span>
          <Chevron direction="right" />
        </button>
      </div>

      <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft">{photo.alt}</p>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="gallery-dialog"
        onClose={() => setLightbox(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setLightbox(false);
        }}
      >
        <div className="flex max-h-[100dvh] flex-col overflow-y-auto">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <p id={titleId} className="text-sm text-cream">
              Photo {index + 1} of {count}
            </p>
            <button
              ref={closeRef}
              type="button"
              className="btn min-h-11 px-4 text-sm"
              onClick={() => setLightbox(false)}
            >
              Close
            </button>
          </div>
          <div className="relative aspect-[20/9] w-full bg-wood">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-contain"
            />
          </div>
          <div className="px-4 pt-3 sm:px-5">
            <p className="text-sm leading-relaxed text-cream sm:text-base">{photo.alt}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4 py-4 sm:px-5">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-cream/30 text-base font-semibold text-paper"
              onClick={showPrevious}
            >
              Previous
            </button>
            <button type="button" className="btn" onClick={showNext}>
              Next
            </button>
          </div>
        </div>
      </dialog>
    </div>
    </div>
    </section>
  );
}

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
