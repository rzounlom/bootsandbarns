"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { farmVideos } from "@/lib/media";
import { Reveal } from "@/components/reveal";

export function VideoCarousel() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const clip = active === null ? null : farmVideos[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (active === null) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
    const player = videoRef.current;
    player?.play().catch(() => undefined);
  }, [active]);

  function openClip(index: number, trigger: HTMLElement) {
    returnFocus.current = trigger;
    setActive(index);
  }

  function close() {
    const player = videoRef.current;
    if (player) {
      player.pause();
      player.currentTime = 0;
    }
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    else setActive(null);
  }

  function step(direction: number) {
    setActive((current) => {
      if (current === null) return current;
      return (current + direction + farmVideos.length) % farmVideos.length;
    });
  }

  function onDialogKey(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  return (
    <section
      id="videos"
      aria-labelledby="videos-heading"
      className="bg-[linear-gradient(180deg,#3a2418_0%,#2c160c_55%,#24160f_100%)] text-paper"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="kicker text-marigold">From the pens</p>
          <h2
            id="videos-heading"
            className="mt-3 font-sans text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
          >
            Videos
          </h2>
          {/* <p className="mt-4 max-w-xl text-[1.075rem] leading-relaxed text-cream sm:text-lg">
            Five clips from the farm. Nothing plays until you choose one.
          </p> */}
        </Reveal>

        <ul className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-5">
          {farmVideos.map((video, index) => (
            <li
              key={video.src}
              className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.9rem)] lg:w-[calc(20%-1rem)]"
            >
              <Reveal delay={index * 60} className="h-full">
                <button
                  type="button"
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[rgb(20_12_8/0.55)] text-left ring-1 ring-white/12 transition duration-300 hover:-translate-y-1 hover:ring-marigold/80"
                  aria-haspopup="dialog"
                  aria-label={`Play ${video.title}`}
                  onClick={(event) => openClip(index, event.currentTarget)}
                >
                  <span
                    className="relative block w-full bg-wood"
                    style={{ aspectRatio: `${video.width} / ${video.height}` }}
                  >
                    <Image
                      src={video.poster}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 46vw"
                      className="object-contain"
                    />
                    <span className="absolute inset-0 bg-[rgb(12_18_10/0.18)] transition group-hover:bg-[rgb(12_18_10/0.05)]" />
                    <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-[0_10px_24px_-12px_rgb(0_0_0/0.8)]">
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col px-3 py-3">
                    <span className="font-sans text-base font-semibold text-paper">
                      {video.title}
                    </span>
                    <span className="mt-1 text-sm leading-relaxed text-cream/80">
                      {video.description}
                    </span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="clip-dialog"
        onClose={() => {
          setActive(null);
          returnFocus.current?.focus();
        }}
        onKeyDown={onDialogKey}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {clip ? (
          <div className="flex max-h-[100dvh] flex-col [@media(max-height:520px)]:max-h-[calc(100dvh-0.5rem)] [@media(max-height:520px)]:flex-row [@media(max-height:520px)]:items-stretch">
            <div className="flex items-start justify-between gap-3 px-4 py-3 [@media(max-height:520px)]:w-40 [@media(max-height:520px)]:shrink-0 [@media(max-height:520px)]:flex-col [@media(max-height:520px)]:justify-between">
              <div>
                <p
                  id={titleId}
                  className="font-sans text-lg font-semibold text-paper"
                >
                  {clip.title}
                </p>
                <p className="text-sm text-cream/80">{clip.description}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="btn min-h-11 shrink-0 px-4 text-sm"
                onClick={close}
              >
                Close
              </button>
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-center bg-black px-3 pb-3 [@media(max-height:520px)]:flex-none [@media(max-height:520px)]:px-2 [@media(max-height:520px)]:py-2">
              <video
                key={clip.src}
                ref={videoRef}
                className="max-h-[min(70dvh,40rem)] w-auto max-w-full bg-black [@media(max-height:520px)]:max-h-[calc(100dvh-1.5rem)]"
                style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
                controls
                playsInline
                poster={clip.poster}
                aria-label={clip.description}
              >
                <source src={clip.src} type="video/mp4" />
              </video>
            </div>
            <div className="grid grid-cols-2 gap-3 px-4 py-4 [@media(max-height:520px)]:w-36 [@media(max-height:520px)]:shrink-0 [@media(max-height:520px)]:grid-cols-1 [@media(max-height:520px)]:content-center">
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-cream/30 text-base font-semibold text-paper"
                onClick={() => step(-1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-paper text-base font-semibold text-ink"
                onClick={() => step(1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 size-6">
      <path d="M8 6.2v11.6l9.2-5.8L8 6.2z" fill="currentColor" />
    </svg>
  );
}
