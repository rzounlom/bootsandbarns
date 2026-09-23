import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function Footer() {
  return (
    <footer className="bg-wood text-cream">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-12 text-center sm:flex-row sm:items-center sm:gap-10 sm:px-8 sm:py-14 sm:text-left">
        <Image
          src="/img/logo/bb_logo_circle.png"
          alt=""
          width={1254}
          height={1254}
          className="size-40 shrink-0 sm:size-48"
        />
        <div className="flex flex-col gap-3">
          <div className="mx-auto mb-1 h-1 w-14 rounded-full bg-marigold sm:mx-0" />
          <p className="font-sans text-2xl font-semibold text-paper sm:text-3xl">Boots and Barns Animal Farm</p>
          <p className="text-lg text-cream/85">Ikot-Ekpene, Nigeria</p>
          <p className="text-base text-cream/70">© 2026 Boots and Barns Animal Farm</p>
        </div>
      </Reveal>
    </footer>
  );
}
