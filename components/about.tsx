import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { galleryPhotos } from "@/lib/media";

const storyPhoto = galleryPhotos.find((photo) => photo.src.includes("081120")) ?? galleryPhotos[0];

const facts = [
  { label: "Place", value: "Ikot-Ekpene, Nigeria" },
  { label: "On the farm", value: "Pigs, waterleaf, cucumbers, and plantains" },
  { label: "With neighbors", value: "Local work, shared food, and small loans for farmers" },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[linear-gradient(180deg,#fbf6ee_0%,#f3e7d4_100%)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <p className="kicker text-terracotta-dark">About</p>
            <h2
              id="about-heading"
              className="mt-3 max-w-[11ch] font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              The work he started
            </h2>
          </Reveal>

          <Reveal delay={90} className="max-w-[62ch] space-y-5 text-[1.075rem] leading-relaxed text-ink-soft sm:text-lg sm:leading-8 lg:pt-9">
            <p>
              Boots and Barns began in Ikot-Ekpene when Sifon-Glory Benson helped her father
              start a pig farm. He passed away before he could see it grow, but she and her
              brother, Senyie Benson, continued the work he started. Today, the farm carries
              forward his wish to give back to the community.
            </p>
            <p>
              What began as a small pig farm is now a place where we raise animals and grow food
              together. We care for our pigs and cultivate crops such as waterleaf, cucumbers, and
              plantains, using pig waste to feed the soil. People from the area work with us, we
              share food with the community, and some of the farm’s proceeds go toward small loans
              for neighboring farmers.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12 sm:mt-14">
          <figure className="media-zoom overflow-hidden rounded-[1.35rem] bg-cream-deep shadow-[0_28px_50px_-32px_rgb(44_22_12/0.65)] ring-1 ring-marigold/80 sm:rounded-[1.75rem]">
            <Image
              src={storyPhoto.src}
              alt={storyPhoto.alt}
              width={storyPhoto.width}
              height={storyPhoto.height}
              sizes="(min-width: 1152px) 72rem, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>

        <dl className="mt-8 overflow-hidden rounded-[1.25rem] border border-line bg-paper/80 shadow-[0_16px_36px_-28px_rgb(44_22_12/0.45)] sm:mt-10 sm:grid sm:grid-cols-3">
          {facts.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 70}
              className="border-b border-line last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <dt className="font-sans text-xl font-semibold text-olive">{fact.label}</dt>
                <dd className="mt-2 text-base leading-relaxed text-ink-soft">{fact.value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
