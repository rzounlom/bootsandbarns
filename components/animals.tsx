import Image from "next/image";
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
    <section id="animals" aria-labelledby="animals-heading" className="scroll-mt-24 bg-olive text-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="kicker text-marigold">In the pens</p>
            <h2
              id="animals-heading"
              className="mt-3 font-sans text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Our Animals
            </h2>
            <p className="mt-5 max-w-xl text-[1.075rem] leading-relaxed text-cream sm:text-xl">
              The farm raises pigs. Their care is steady, practical, and close at hand.
            </p>
          </div>

          <figure className="overflow-hidden rounded-[1.25rem] bg-olive-mid shadow-[0_18px_40px_-24px_rgb(0_0_0/0.65)] sm:rounded-[1.5rem]">
              <Image
                src={carePhoto.src}
                alt={carePhoto.alt}
                width={carePhoto.width}
                height={carePhoto.height}
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="h-auto w-full"
              />
            </figure>
        </div>

        <ol className="mt-12 list-none border-t border-white/15 sm:mt-16">
          {practices.map((item, index) => (
            <li key={item.title}>
              <div className="grid gap-3 border-b border-white/15 py-6 sm:grid-cols-[5rem_minmax(0,14rem)_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:py-8">
                <p className="font-sans text-3xl font-semibold text-marigold sm:text-4xl">0{index + 1}</p>
                <h3 className="font-sans text-2xl font-semibold sm:text-3xl">{item.title}</h3>
                <p className="text-[1.05rem] leading-relaxed text-cream sm:text-lg">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
