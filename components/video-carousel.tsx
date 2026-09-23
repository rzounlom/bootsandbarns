"use client";

import { useCallback, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { farmVideos } from "@/lib/media";
import { Reveal } from "@/components/reveal";
import { SlideControls } from "@/components/slide-controls";

export function VideoCarousel() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const count = farmVideos.length;
  const video = farmVideos[index];

  const settleCurrent = useCallback(() => {
    const player = videoRef.current;
    if (!player) return;
    player.pause();
    if (player.readyState > 0) player.currentTime = 0;
  }, []);

  const go = useCallback(
    (nextIndex: number) => {
      settleCurrent();
      setIndex((nextIndex + count) % count);
    },
    [count, settleCurrent],
  );

  const showPrevious = useCallback(() => go(index - 1), [go, index]);
  const showNext = useCallback(() => go(index + 1), [go, index]);

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
      aria-roledescription="carousel"
      aria-label="Farm videos"
      aria-labelledby="videos-heading"
      className="scroll-mt-24 overflow-x-clip bg-olive text-paper"
      onKeyDown={onKeyDown}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <Reveal>
          <h2
            id="videos-heading"
            className="font-sans text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Videos
          </h2>
          <p className="mt-3 max-w-2xl text-[1.075rem] leading-relaxed text-cream sm:text-lg">
            Five clips from the farm. Nothing plays until you start it.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8">
        <div
          onPointerDown={(event) => {
            const target = event.target as HTMLElement;
            if (target instanceof HTMLVideoElement || target.closest("[data-carousel-control]")) return;
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
          <figure className="mx-auto w-[min(20rem,100%,calc(70svh*0.5625))]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.15rem] bg-olive-mid shadow-[0_16px_30px_-24px_rgb(0_0_0/0.8)]">
              <video
                key={video.src}
                ref={videoRef}
                className="carousel-in absolute inset-0 h-full w-full object-contain"
                controls
                playsInline
                preload="none"
                poster={video.poster}
                aria-label={video.description}
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
            <figcaption className="px-1 pt-4 text-center">
              <p className="text-lg font-semibold text-paper">{video.title}</p>
              <p className="mt-1 text-base leading-relaxed text-cream/85">{video.description}</p>
            </figcaption>
          </figure>

          <SlideControls
            index={index}
            length={count}
            label="video"
            tone="dark"
            onPrevious={showPrevious}
            onNext={showNext}
            onSelect={go}
          />
        </div>
        </Reveal>
      </div>
    </section>
  );
}
