import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function Footer() {
  return (
    <footer className="bg-[linear-gradient(180deg,#3a2418_0%,#2c160c_38%,#1a100c_100%)] text-cream">
      <div className="h-px bg-gradient-to-r from-transparent via-marigold to-transparent" />
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-14 text-center sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-16 lg:text-left">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:text-left">
          <Image
            src="/img/logo/bb_logo_circle.png"
            alt=""
            width={1254}
            height={1254}
            className="size-36 shrink-0 sm:size-44"
          />
          <div>
            <p className="text-balance font-sans text-2xl font-semibold text-paper sm:text-3xl">
              Boots and Barns Animal Farm
            </p>
            <p className="mt-2 text-lg text-cream/85">Ikot-Ekpene, Nigeria</p>
            <p className="mt-3 text-base text-cream/65">
              © 2026 Boots and Barns Animal Farm
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
