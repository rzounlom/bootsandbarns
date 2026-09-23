import Image from "next/image";
import { founders } from "@/lib/media";

export function Founders() {
  return (
    <section id="founders" aria-labelledby="founders-heading" className="scroll-mt-24 bg-cream-deep">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-28">
        <div>
          <p className="kicker text-terracotta-dark">Founders</p>
          <h2
            id="founders-heading"
            className="mt-3 max-w-[12ch] font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Carrying the farm forward
          </h2>
          <p className="mt-5 max-w-md text-[1.075rem] leading-relaxed text-ink-soft sm:text-xl">
            Sifon-Glory Benson and Senyie Benson carry the farm forward.
          </p>
        </div>

        <ul className="flex flex-col items-center gap-12 sm:flex-row sm:justify-center sm:gap-10 lg:gap-14">
          {founders.map((person) => (
            <li key={person.name} className="w-56 text-center sm:w-60 lg:w-72">
              <div
                className={
                  "frameWidth" in person
                    ? "mx-auto flex size-56 items-start justify-center overflow-hidden rounded-full border-4 border-paper shadow-[0_0_0_6px_var(--color-marigold)] lg:size-64"
                    : "mx-auto size-56 overflow-hidden rounded-full border-4 border-paper shadow-[0_0_0_6px_var(--color-marigold)] lg:size-64"
                }
                style={"frame" in person ? { backgroundColor: person.frame } : undefined}
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
              <p className="mt-6 whitespace-nowrap font-serif text-xl font-semibold text-ink lg:text-2xl">
                {person.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
