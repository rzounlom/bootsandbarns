import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { founders } from "@/lib/media";

export function Founders() {
  return (
    <section
      id="founders"
      aria-labelledby="founders-heading"
      className="bg-[linear-gradient(180deg,#efe4d0_0%,#e8dcc6_100%)]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16 lg:py-24">
        <Reveal>
          <p className="kicker text-terracotta-dark">Founders</p>
          <h2
            id="founders-heading"
            className="mt-3 max-w-[12ch] font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            The family behind the farm
          </h2>
          <p className="mt-5 max-w-md text-[1.075rem] leading-relaxed text-ink-soft sm:text-xl">
            Together, Senyie and Sifon care for the farm their father started
            and the community he hoped it would serve.
          </p>
        </Reveal>

        <ul className="flex flex-col items-center gap-12 sm:flex-row sm:justify-center sm:gap-10 lg:gap-14">
          {founders.map((person, index) => (
            <li key={person.name} className="w-56 text-center sm:w-60 lg:w-72">
              <Reveal delay={index * 100}>
                <div
                  className={
                    "frameWidth" in person
                      ? "mx-auto flex size-56 items-start justify-center overflow-hidden rounded-full border-4 border-paper shadow-[0_0_0_6px_var(--color-marigold)] transition duration-300 hover:-translate-y-1 lg:size-64"
                      : "mx-auto size-56 overflow-hidden rounded-full border-4 border-paper shadow-[0_0_0_6px_var(--color-marigold)] transition duration-300 hover:-translate-y-1 lg:size-64"
                  }
                  style={
                    "frame" in person
                      ? { backgroundColor: person.frame }
                      : undefined
                  }
                >
                  <Image
                    src={person.src}
                    alt={person.alt}
                    width={person.width}
                    height={person.height}
                    sizes="256px"
                    className={
                      "frameWidth" in person
                        ? "h-auto max-w-none"
                        : "size-full object-cover"
                    }
                    style={{
                      objectPosition: person.objectPosition,
                      ...("frameWidth" in person
                        ? { width: person.frameWidth, height: "auto" }
                        : {}),
                    }}
                  />
                </div>
                <p className="mt-6 text-balance font-sans text-xl font-semibold text-ink lg:text-2xl">
                  {person.name}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
