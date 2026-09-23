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
import { farmVideos } from "@/lib/media";

const INTERVAL_MS = 6500;
const PILL = 22;

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function VideoCarousel() {
  const [frame, setFrame] = useState({ index: 0, previous: 0 });
  const [playing, setPlaying] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [userTick, setUserTick] = useState(0);
  const [step, setStep] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const count = farmVideos.length;
  const index = frame.index;
  const reduceMotion = useSyncExternalStore(subscribeToMotion, motionSnapshot, () => false);
  const paused = reduceMotion || !inView || playing !== null;
  const distance = Math.abs(index - frame.previous);
  const wrapped = distance === count - 1;
  const glideSeconds = wrapped ? 0 : Math.min(0.42 * Math.max(distance, 1), 2.4);

  const markInteraction = useCallback(() => {
    setUserTick((tick) => tick + 1);
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      markInteraction();
      setPlaying(null);
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
    setPlaying(null);
    setFrame((current) => ({
      index: (current.index - 1 + count) % count,
      previous: current.index,
    }));
  }, [count, markInteraction]);

  const showNext = useCallback(() => {
    markInteraction();
    setPlaying(null);
    setFrame((current) => ({
      index: (current.index + 1) % count,
      previous: current.index,
    }));
  }, [count, markInteraction]);

  const playClip = useCallback(
    (clipIndex: number) => {
      markInteraction();
      setFrame((current) =>
        current.index === clipIndex
          ? current
          : { index: clipIndex, previous: current.index },
      );
      setPlaying(clipIndex);
    },
    [markInteraction],
  );

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

  useEffect(() => {
    if (playing === null) return;
    videoRef.current?.play().catch(() => undefined);
  }, [playing]);

  function onKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.target instanceof HTMLVideoElement) return;
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
      id="videos"
      aria-labelledby="videos-heading"
      className="overflow-hidden bg-[linear-gradient(165deg,#1a6b3a_0%,#0f4d2c_48%,#102818_100%)] text-paper"
    >
      <div className="mx-auto max-w-3xl px-5 pt-16 text-center sm:px-8 sm:pt-20 lg:pt-24">
        <Reveal>
          <p className="kicker text-marigold">Videos</p>
          <h2
            id="videos-heading"
            className="mt-3 font-sans text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
          >
            Clips from the farm
          </h2>
        </Reveal>
      </div>

      <div
        ref={rootRef}
        className="mx-auto mt-10 w-full max-w-[90rem] px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24"
        aria-roledescription="carousel"
        aria-label="Farm clips"
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
            className="flex items-start gap-5"
            style={{
              transform: step ? `translate3d(${-index * step}px, 0, 0)` : undefined,
              transition: glideSeconds ? `transform ${glideSeconds}s ease` : "none",
            }}
          >
            {farmVideos.map((video, clipIndex) => (
              <div
                key={video.src}
                ref={clipIndex === 0 ? slideRef : undefined}
                className="w-[min(22.625rem,calc(100%-4.5rem))] shrink-0 cursor-pointer sm:w-[min(22.625rem,calc((100%-1.25rem)/2))] lg:w-[22.625rem]"
                aria-current={clipIndex === index ? "true" : undefined}
                onClick={() => {
                  if (playing !== clipIndex) playClip(clipIndex);
                }}
              >
                <div
                  className="group relative overflow-hidden rounded-xl bg-wood"
                  style={{ aspectRatio: `${video.width} / ${video.height}` }}
                >
                  {playing === clipIndex ? (
                    <video
                      ref={videoRef}
                      key={video.src}
                      className="h-full w-full bg-black object-contain"
                      controls
                      playsInline
                      poster={video.poster}
                      aria-label={video.title}
                      onEnded={() => setPlaying(null)}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <Image
                        src={video.poster}
                        alt=""
                        fill
                        sizes="362px"
                        className="object-contain transition duration-500 ease-linear group-hover:scale-105"
                      />
                      <button
                        type="button"
                        data-carousel-control=""
                        className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-paper text-ink shadow-[0_10px_24px_-12px_rgb(0_0_0/0.8)]"
                        aria-label={`Play ${video.title}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          playClip(clipIndex);
                        }}
                      >
                        <PlayIcon />
                      </button>
                    </>
                  )}
                  {clipIndex === index && playing !== clipIndex ? (
                    <button
                      type="button"
                      data-carousel-control=""
                      className="absolute right-3 bottom-3 grid size-14 cursor-pointer place-items-center rounded-full text-paper opacity-0 transition duration-300 group-hover:opacity-100 focus-visible:opacity-100"
                      aria-label="Next clip"
                      onClick={(event) => {
                        event.stopPropagation();
                        showNext();
                      }}
                    >
                      <Arrow />
                    </button>
                  ) : null}
                </div>
                <p className="mt-3 text-center font-sans text-lg font-semibold">{video.title}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Clip {index + 1} of {count}
        </p>

        <div
          className="relative mx-auto mt-8 h-11"
          style={{ width: count * PILL }}
          role="group"
          aria-label="Choose a clip"
        >
          <span
            className="pointer-events-none absolute top-1/2 left-0 h-2 w-14 rounded-full bg-marigold"
            style={{
              transform: `translate3d(${index * PILL + 11 - 28}px, -50%, 0)`,
              transition: glideSeconds ? `transform ${glideSeconds}s ease` : "none",
            }}
          />
          {farmVideos.map((video, clipIndex) => (
            <button
              key={video.src}
              type="button"
              data-carousel-control=""
              className="absolute top-0 inline-flex h-11 w-[22px] cursor-pointer items-center justify-center"
              style={{ left: clipIndex * PILL }}
              aria-label={`Show ${video.title}`}
              aria-current={clipIndex === index ? "true" : undefined}
              onClick={() => goTo(clipIndex)}
            >
              <span className="block h-2 w-2.5 rounded-full bg-paper/40" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 size-8">
      <path d="M8 6.2v11.6l9.2-5.8L8 6.2z" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-10">
      <path
        d="M5 12h12M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
