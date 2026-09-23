import Image from "next/image";
import { galleryPhotos } from "@/lib/media";

const storyPhoto = galleryPhotos.find((photo) => photo.src.includes("081120")) ?? galleryPhotos[0];

const facts = [
  { label: "Place", value: "Ikot-Ekpene, Nigeria" },
  { label: "On the farm", value: "Pigs, waterleaf, cucumbers, and plantains" },
  { label: "With neighbors", value: "Local work, shared food, and small loans for farmers" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <p className="kicker text-terracotta-dark">About</p>
            <h2
              id="about-heading"
              className="mt-3 max-w-[12ch] font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              The work he started
            </h2>
          </div>

          <div className="space-y-5 text-[1.075rem] leading-relaxed text-ink-soft sm:text-lg sm:leading-8">
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
            </div>
        </div>

        <figure className="mt-12 overflow-hidden rounded-[1.25rem] border-2 border-marigold bg-cream-deep shadow-[0_20px_40px_-28px_rgb(36_25_16/0.55)] sm:mt-16 sm:rounded-[1.75rem]">
          <Image
            src={storyPhoto.src}
            alt={storyPhoto.alt}
            width={storyPhoto.width}
            height={storyPhoto.height}
            sizes="(min-width: 1152px) 72rem, 100vw"
            className="h-auto w-full"
          />
        </figure>

        <dl className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="h-full rounded-2xl border border-line bg-cream px-5 py-5">
              <dt className="font-serif text-2xl text-olive">{fact.label}</dt>
              <dd className="mt-2 text-base leading-relaxed text-ink-soft sm:text-[1.05rem]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
