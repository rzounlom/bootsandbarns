import Image from "next/image";
import { founders } from "@/lib/media";

export function Founders() {
  return (
    <section
      id="founders"
      aria-labelledby="founders-heading"
      className="scroll-mt-24 bg-cream"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="founders-heading"
            className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            Founders
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Sifon-Glory Benson and Senyie Benson carry the farm forward.
          </p>
        </div>

        <ul className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-12 min-[480px]:flex-row min-[480px]:justify-center min-[480px]:gap-16">
          {founders.map((person) => (
            <li key={person.name} className="w-56 text-center sm:w-64">
              <div className="mx-auto size-52 overflow-hidden rounded-full border-4 border-paper shadow-[0_0_0_1px_var(--color-line)] sm:size-60">
                <Image
                  src={person.src}
                  alt={person.alt}
                  width={person.width}
                  height={person.height}
                  sizes="240px"
                  className="size-full object-cover"
                  style={{ objectPosition: person.objectPosition }}
                />
              </div>
              <p className="mt-5 font-serif text-xl text-ink sm:text-2xl">{person.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
