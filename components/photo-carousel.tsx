"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { galleryPhotos } from "@/lib/media";
import { SlideControls } from "@/components/slide-controls";

export function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const count = galleryPhotos.length;
  const photo = galleryPhotos[index];

  const go = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + count) % count);
    },
    [count],
  );

  const showPrevious = useCallback(() => go(index - 1), [go, index]);
  const showNext = useCallback(() => go(index + 1), [go, index]);

  const close = useCallback(() => setLightbox(false), []);

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
      aria-roledescription="carousel"
      aria-label="Photo gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-24 overflow-x-clip bg-cream"
      onKeyDown={onKeyDown}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker text-terracotta-dark">Gallery</p>
            <h2
              id="gallery-heading"
              className="mt-3 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Life in the pens
            </h2>
          </div>
        </div>

        <div
          className="mt-10"
          onPointerDown={(event) => {
            if (
              (event.target as HTMLElement).closest("[data-carousel-control]")
            )
              return;
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
            className="block w-full overflow-hidden rounded-[1.15rem] bg-cream-deep text-left shadow-[0_16px_36px_-28px_rgb(36_25_16/0.7)] sm:rounded-[1.35rem]"
            aria-label={photo.alt}
            onClick={() => {
              if (dragged.current) {
                dragged.current = false;
                return;
              }
              setLightbox(true);
            }}
          >
            <div className="relative aspect-[20/9] w-full">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 72rem, 100vw"
                className="carousel-in object-contain"
              />
            </div>
          </button>

          <SlideControls
            index={index}
            length={count}
            label="photo"
            onPrevious={showPrevious}
            onNext={showNext}
            onSelect={go}
          />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="gallery-dialog"
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
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
              onClick={close}
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
            <p className="text-sm leading-relaxed text-cream sm:text-base">
              {photo.alt}
            </p>
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
    </section>
  );
}
