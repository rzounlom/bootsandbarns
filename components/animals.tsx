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
      className="scroll-mt-24 bg-cream-deep"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <h2
            id="animals-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Our Animals
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            The farm raises pigs. Their care is steady, practical, and close at
            hand.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {practices.map((item) => (
            <li
              key={item.title}
              className="border-t-2 border-terracotta bg-paper px-5 py-6 sm:px-6"
            >
              <h3 className="font-serif text-2xl font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
