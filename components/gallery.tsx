"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { farmVideos, galleryPhotos } from "@/lib/media";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => setActive(null), []);

  const showPrevious = useCallback(() => {
    setActive((current) => {
      if (current === null) return current;
      return (current - 1 + galleryPhotos.length) % galleryPhotos.length;
    });
  }, []);

  const showNext = useCallback(() => {
    setActive((current) => {
      if (current === null) return current;
      return (current + 1) % galleryPhotos.length;
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (active !== null && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (active === null && dialog.open) {
      dialog.close();
    }
  }, [active]);

  useEffect(() => {
    if (active === null) return;

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
  }, [active, showNext, showPrevious]);

  const photo = active === null ? null : galleryPhotos[active];

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 bg-cream">
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
          <p className="max-w-sm text-[1.075rem] leading-relaxed text-ink-soft sm:text-lg">
            Photographs and short clips from the pens.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {galleryPhotos.map((item, index) => (
            <li key={item.src} className={index === 0 ? "lg:col-span-2" : undefined}>
              <button
                type="button"
                className="photo-tile block w-full overflow-hidden rounded-[1.15rem] bg-cream-deep text-left shadow-[0_16px_36px_-28px_rgb(36_25_16/0.7)] sm:rounded-[1.35rem]"
                aria-label={item.alt}
                onClick={() => setActive(index)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes={index === 0 ? "(min-width: 1024px) 72rem, 100vw" : "(min-width: 1024px) 36rem, 100vw"}
                  className="h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-[1.5rem] bg-olive px-5 py-8 text-paper sm:mt-20 sm:px-8 sm:py-10">
          <div>
            <h3 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Videos</h3>
            <p className="mt-3 max-w-2xl text-[1.075rem] leading-relaxed text-cream sm:text-lg">
              Five clips from the farm. Nothing plays until you start it.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-5">
            {farmVideos.map((video) => (
              <li
                key={video.src}
                className="w-full min-[540px]:w-[calc(50%-0.7rem)] lg:w-[calc(33.333%-0.9rem)]"
              >
                <figure className="overflow-hidden rounded-[1.15rem] bg-olive-mid shadow-[0_16px_30px_-24px_rgb(0_0_0/0.8)]">
                  <div className="relative aspect-[9/16] w-full">
                    <video
                      className="absolute inset-0 h-full w-full bg-olive-mid object-contain"
                      controls
                      playsInline
                      preload="none"
                      poster={video.poster}
                      aria-label={video.description}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </div>
                  <figcaption className="px-4 py-4">
                    <p className="text-lg font-semibold text-paper">{video.title}</p>
                    <p className="mt-1 text-base leading-relaxed text-cream/85">{video.description}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
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
        {photo ? (
          <div className="flex max-h-[100dvh] flex-col overflow-y-auto">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
              <p id={titleId} className="text-sm text-cream">
                Photo {active! + 1} of {galleryPhotos.length}
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

            <div className="relative aspect-[20/9] w-full bg-ink">
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
              <button
                type="button"
                className="btn"
                onClick={showNext}
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
