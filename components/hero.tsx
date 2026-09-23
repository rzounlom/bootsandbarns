import Image from "next/image";
import { heroPhoto } from "@/lib/media";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-olive text-paper">
      <div className="hero-grid mx-auto grid max-w-7xl md:min-h-[38rem] md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:min-h-[44rem]">
        <div className="hero-copy order-2 flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 md:order-1 md:py-16 lg:px-12 lg:py-20">
          <p className="kicker text-marigold">Ikot-Ekpene, Nigeria</p>
          <h1
            id="hero-heading"
            className="hero-title mt-4 font-serif text-[2.15rem] font-semibold leading-[1.05] tracking-tight text-paper min-[380px]:text-[2.55rem] md:text-[2.4rem] lg:text-5xl xl:text-6xl"
          >
            A family farm,
            <br />
            still at work.
          </h1>
          <p className="hero-lede mt-5 max-w-[34ch] text-lg leading-relaxed text-cream sm:text-xl">
            We raise pigs, grow food, and carry forward a father’s hope of giving back.
          </p>
          <div className="hero-cta mt-8">
            <a href="#about" className="btn">
              About the farm
            </a>
          </div>
        </div>

        <div className="hero-photo order-1 md:order-2 md:py-8 md:pr-8 lg:py-10 lg:pr-10">
          <div className="relative aspect-[16/10] max-h-[54svh] overflow-hidden bg-olive-mid shadow-[0_24px_50px_-28px_rgb(0_0_0/0.7)] sm:aspect-[16/9] md:aspect-auto md:h-full md:max-h-none md:min-h-[32rem] md:rounded-[1.75rem]">
            <Image
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              fill
              preload
              sizes="(min-width: 768px) 54vw, 100vw"
              className="object-cover object-[center_58%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
