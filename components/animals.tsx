import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { galleryPhotos } from "@/lib/media";

const carePhoto = galleryPhotos.find((photo) => photo.src.includes("081501")) ?? galleryPhotos[0];

const practices = [
  {
    title: "Thoughtful breeding",
    body: "We decide when to breed with the pigs and the farm in mind, so the animals that follow can be looked after properly.",
  },
  {
    title: "Daily care",
    body: "The pigs receive suitable feed and clean water. We watch their health and arrange veterinary care when it is needed.",
  },
  {
    title: "Clean surroundings",
    body: "Pens are cleaned as part of the regular routine, so the animals have a manageable place to live.",
  },
];

export function Animals() {
  return (
    <section
      id="animals"
      aria-labelledby="animals-heading"
      className="bg-[linear-gradient(165deg,#1a6b3a_0%,#0f4d2c_46%,#102818_100%)] text-paper"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="kicker text-marigold">In the pens</p>
          <h2
            id="animals-heading"
            className="mt-3 font-sans text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Our Animals
          </h2>
          <p className="mt-4 max-w-xl text-[1.075rem] leading-relaxed text-cream sm:text-xl">
            The farm raises pigs. Their care is steady, practical, and close at hand.
          </p>
        </Reveal>

        <div className="mt-10 lg:mt-12">
          <Reveal>
            <figure className="media-zoom overflow-hidden rounded-[1.35rem] bg-olive-mid shadow-[0_24px_40px_-28px_rgb(0_0_0/0.7)] ring-1 ring-white/15">
              <Image
                src={carePhoto.src}
                alt={carePhoto.alt}
                width={carePhoto.width}
                height={carePhoto.height}
                sizes="(min-width: 1152px) 72rem, 100vw"
                className="h-auto w-full"
              />
            </figure>
          </Reveal>

          <ol className="mt-5 grid list-none gap-3 sm:mt-6 lg:grid-cols-3 lg:gap-5">
            {practices.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 80}>
                  <div className="rounded-2xl border border-white/12 bg-[rgb(8_28_18/0.42)] px-5 py-5 transition-colors duration-300 hover:bg-[rgb(8_28_18/0.62)]">
                    <p className="font-sans text-sm font-semibold tracking-[0.16em] text-marigold">
                      0{index + 1}
                    </p>
                    <h3 className="mt-2 font-sans text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-[1.05rem] leading-relaxed text-cream">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
