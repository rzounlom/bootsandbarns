import Image from "next/image";
import { heroPhoto } from "@/lib/media";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-paper">
      <div className="hero-grid mx-auto grid max-w-6xl md:min-h-[32rem] md:grid-cols-2 lg:min-h-[34rem]">
        <div className="hero-copy order-2 flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-12 md:order-1 md:py-14 lg:py-16 lg:pr-12">
          <p className="text-sm font-semibold tracking-wide text-sage">
            Ikot-Ekpene, Nigeria
          </p>
          <h1
            id="hero-heading"
            className="hero-title mt-3 max-w-[14ch] font-serif text-[2.05rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.6rem] lg:text-5xl lg:leading-[1.12]"
          >
            A family farm, still at work.
          </h1>
          <p className="hero-lede mt-4 max-w-[38ch] text-base leading-relaxed text-ink-soft sm:text-lg">
            We raise pigs, grow food, and carry forward a father’s hope of
            giving back.
          </p>
          <div className="hero-cta mt-7">
            <a
              href="#about"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-terracotta-dark px-5 text-base font-semibold text-paper hover:bg-ink"
            >
              About the farm
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="hero-photo relative aspect-[3/2] max-h-[42svh] w-full overflow-hidden bg-cream-deep sm:aspect-[16/10] sm:max-h-[48svh] md:aspect-auto md:h-full md:max-h-none md:min-h-[32rem]">
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              fill
              preload
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[center_58%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
