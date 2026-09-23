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
    <section id="gallery" aria-labelledby="gallery-heading" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <h2
            id="gallery-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Gallery
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Photographs and short clips from the pens.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          {galleryPhotos.map((item, index) => (
            <li key={item.src}>
              <button
                type="button"
                className="block w-full overflow-hidden rounded-md bg-cream-deep text-left"
                aria-label={item.alt}
                onClick={() => setActive(index)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className="h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-16 sm:mt-20">
          <h3 className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Videos
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Five clips from the farm. Nothing plays until you start it.
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-5">
            {farmVideos.map((video) => (
              <li
                key={video.src}
                className="w-full min-[540px]:w-[calc(50%-0.7rem)] lg:w-[calc(33.333%-0.9rem)]"
              >
                <figure className="overflow-hidden rounded-md bg-[#2a221c] ring-1 ring-black/10">
                  <div className="relative aspect-[9/16] w-full">
                    <video
                      className="absolute inset-0 h-full w-full bg-[#2a221c] object-contain"
                      controls
                      playsInline
                      preload="none"
                      poster={video.poster}
                      aria-label={video.description}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </div>
                  <figcaption className="bg-paper px-4 py-3">
                    <p className="font-medium text-ink">{video.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {video.description}
                    </p>
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
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-paper px-4 text-sm font-semibold text-ink"
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
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-paper text-base font-semibold text-ink"
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
