export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 bg-cream"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          <h2
            id="about-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            About
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg sm:leading-8">
            <p>
              Boots and Barns began in Ikot-Ekpene when Sifon-Glory Benson
              helped her father start a pig farm. He passed away before he could
              see it grow, but she and her brother, Senyie Benson, continued the
              work he started. Today, the farm carries forward his wish to give
              back to the community.
            </p>
            <p>
              What began as a small pig farm is now a place where we raise
              animals and grow food together. We care for our pigs and cultivate
              crops such as waterleaf, cucumbers, and plantains, using pig waste
              to feed the soil. People from the area work with us, we share food
              with the community, and some of the farm’s proceeds go toward
              small loans for neighboring farmers.
            </p>
          </div>
        </div>

        <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-6">
          <div>
            <dt className="font-serif text-xl text-ink">Place</dt>
            <dd className="mt-2 text-base leading-relaxed text-ink-soft">
              Ikot-Ekpene, Nigeria
            </dd>
          </div>
          <div>
            <dt className="font-serif text-xl text-ink">On the farm</dt>
            <dd className="mt-2 text-base leading-relaxed text-ink-soft">
              Pigs, waterleaf, cucumbers, and plantains
            </dd>
          </div>
          <div>
            <dt className="font-serif text-xl text-ink">With neighbors</dt>
            <dd className="mt-2 text-base leading-relaxed text-ink-soft">
              Local work, shared food, and small loans for farmers
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
