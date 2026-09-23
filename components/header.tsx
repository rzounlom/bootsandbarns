"use client";

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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8">
        <a
          href="#top"
          className="min-w-0 rounded-sm leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="block font-serif text-[1.15rem] font-semibold tracking-tight text-ink sm:text-2xl">
            Boots and Barns
          </span>
          <span className="block text-sm text-ink-soft">Animal Farm</span>
        </a>

        <nav aria-label="Page" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-[0.95rem] font-medium text-ink-soft hover:bg-cream hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 text-sm font-semibold text-ink md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
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
                  className="flex min-h-12 items-center text-lg text-ink"
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
