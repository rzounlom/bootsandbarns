"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#animals", label: "Our Animals" },
  { href: "#gallery", label: "Gallery" },
  { href: "#founders", label: "Founders" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="h-1 bg-leaf" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-8">
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2.5 rounded-sm sm:gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/img/logo/bb_logo_circle.png"
            alt=""
            width={1254}
            height={1254}
            preload
            className="size-12 shrink-0 sm:size-14"
          />
          <span className="min-w-0 leading-tight">
            <span className="block font-sans text-lg font-semibold tracking-tight text-ink min-[380px]:text-xl sm:text-2xl">
              Boots and Barns
            </span>
            <span className="block text-sm font-semibold text-terracotta-dark">Animal Farm</span>
          </span>
        </a>

        <nav aria-label="Page" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-base font-semibold text-ink-soft hover:bg-cream hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-ink md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <nav
          id={menuId}
          aria-label="Page"
          className="border-t border-line bg-paper px-5 py-2 md:hidden"
        >
          <ul>
            {links.map((link) => (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <a
                  href={link.href}
                  className="flex min-h-14 items-center font-sans text-2xl text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
