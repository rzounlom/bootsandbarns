import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { galleryPhotos } from "@/lib/media";

const storyPhoto = galleryPhotos.find((photo) => photo.src.includes("081120")) ?? galleryPhotos[0];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[linear-gradient(180deg,#fbf6ee_0%,#f3e7d4_100%)]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:gap-10 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 lg:py-24">
        <Reveal>
          <p className="kicker text-terracotta-dark">About</p>
          <h2
            id="about-heading"
            className="mt-3 font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-ink sm:text-5xl"
          >
            The work he started
          </h2>
          <div className="mt-6 max-w-[40rem] space-y-5 text-[1.075rem] leading-relaxed text-ink-soft sm:text-lg sm:leading-8">
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
        </Reveal>

        <Reveal delay={80}>
          <figure className="overflow-hidden rounded-[1.35rem] bg-cream-deep shadow-[0_24px_40px_-28px_rgb(44_22_12/0.55)] ring-1 ring-marigold/70">
            <Image
              src={storyPhoto.src}
              alt={storyPhoto.alt}
              width={storyPhoto.width}
              height={storyPhoto.height}
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
