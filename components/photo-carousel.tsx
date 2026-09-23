"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Reveal } from "@/components/reveal";
import { galleryPhotos } from "@/lib/media";

const INTERVAL_MS = 6500;

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PhotoCarousel() {
  const [frame, setFrame] = useState({ index: 0, previous: 0 });
  const [inView, setInView] = useState(false);
  const [userTick, setUserTick] = useState(0);
  const [step, setStep] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const count = galleryPhotos.length;
  const index = frame.index;
  const reduceMotion = useSyncExternalStore(subscribeToMotion, motionSnapshot, () => false);
  const paused = reduceMotion || !inView;
  const distance = Math.abs(index - frame.previous);
  const wrapped = distance === count - 1;
  const glideSeconds = wrapped ? 0 : Math.min(0.42 * Math.max(distance, 1), 2.4);

  const markInteraction = useCallback(() => {
    setUserTick((tick) => tick + 1);
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      markInteraction();
      setFrame((current) => {
        const next = (nextIndex + count) % count;
        if (next === current.index) return current;
        return { index: next, previous: current.index };
      });
    },
    [count, markInteraction],
  );

  const showPrevious = useCallback(() => {
    markInteraction();
    setFrame((current) => ({
      index: (current.index - 1 + count) % count,
      previous: current.index,
    }));
  }, [count, markInteraction]);

  const showNext = useCallback(() => {
    markInteraction();
    setFrame((current) => ({
      index: (current.index + 1) % count,
      previous: current.index,
    }));
  }, [count, markInteraction]);

  useEffect(() => {
    const slide = slideRef.current;
    const track = trackRef.current;
    if (!slide || !track) return;
    const measure = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      setStep(slide.getBoundingClientRect().width + gap);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(slide);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

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
      setFrame((current) => ({
        index: (current.index + 1) % count,
        previous: current.index,
      }));
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count, userTick]);

  function onKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
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
      className="overflow-hidden bg-[linear-gradient(180deg,#f6efe3_0%,#f3e7d4_100%)] text-ink"
    >
      <div className="mx-auto max-w-3xl px-5 pt-16 text-center sm:px-8 sm:pt-20 lg:pt-24">
        <Reveal>
          <p className="kicker text-terracotta-dark">Gallery</p>
          <h2
            id="gallery-heading"
            className="mt-3 font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl"
          >
            Life in the pens
          </h2>
        </Reveal>
      </div>

      <div
        ref={rootRef}
        className="mx-auto mt-10 w-full max-w-[90rem] px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24"
        aria-roledescription="carousel"
        aria-label="Farm photographs"
        onKeyDown={onKeyDown}
      >
        <div
          className="overflow-hidden"
          onPointerDown={(event) => {
            if ((event.target as HTMLElement).closest("[data-carousel-control]")) return;
            if (event.button !== 0) return;
            swipe.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => {
            if (!swipe.current) return;
            const dx = event.clientX - swipe.current.x;
            const dy = event.clientY - swipe.current.y;
            swipe.current = null;
            if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
            if (dx < 0) showNext();
            else showPrevious();
          }}
          onPointerCancel={() => {
            swipe.current = null;
          }}
        >
          <div
            ref={trackRef}
            className="flex gap-5"
            style={{
              transform: step ? `translate3d(${-index * step}px, 0, 0)` : undefined,
              transition: glideSeconds ? `transform ${glideSeconds}s ease` : "none",
            }}
          >
            {galleryPhotos.map((item, photoIndex) => (
              <div
                key={item.src}
                ref={photoIndex === 0 ? slideRef : undefined}
                className="group relative aspect-[1.863] w-[calc((100%-6.5rem)*0.696)] shrink-0 cursor-pointer overflow-hidden rounded-xl bg-cream-deep"
                aria-current={photoIndex === index ? "true" : undefined}
                onClick={showNext}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 48rem, 70vw"
                  className="pen-card-img object-cover object-center"
                  preload={photoIndex < 2}
                />
                <span className="pen-card-shade pointer-events-none absolute inset-0" />
                {photoIndex === index ? (
                  <button
                    type="button"
                    data-carousel-control=""
                    className="absolute top-1/2 left-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 -rotate-45 cursor-pointer place-items-center rounded-full text-paper opacity-0 transition duration-300 group-hover:rotate-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100"
                    aria-label="Next photograph"
                    onClick={(event) => {
                      event.stopPropagation();
                      showNext();
                    }}
                  >
                    <Arrow />
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Photo {index + 1} of {count}
        </p>

        <div
          className="relative mx-auto mt-8 h-11"
          style={{ width: count * 22 }}
          role="group"
          aria-label="Choose a photograph"
        >
          <span
            className="pointer-events-none absolute top-1/2 left-0 h-2 w-14 rounded-full bg-olive"
            style={{
              transform: `translate3d(${index * 22 + 11 - 28}px, -50%, 0)`,
              transition: glideSeconds ? `transform ${glideSeconds}s ease` : "none",
            }}
          />
          {galleryPhotos.map((item, photoIndex) => (
            <button
              key={item.src}
              type="button"
              data-carousel-control=""
              className="absolute top-0 inline-flex h-11 w-[22px] cursor-pointer items-center justify-center"
              style={{ left: photoIndex * 22 }}
              aria-label={`Show photograph ${photoIndex + 1}`}
              aria-current={photoIndex === index ? "true" : undefined}
              onClick={() => goTo(photoIndex)}
            >
              <span className="block h-2 w-2.5 rounded-full bg-olive/35" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-20">
      <path
        d="M5 12h12M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
