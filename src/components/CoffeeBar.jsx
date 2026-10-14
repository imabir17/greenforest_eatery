import { Reveal, SectionHead } from "./ui";
import { img } from "../data";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
    title: "Signature Dark Roast",
    desc: "Single & double shots, Americanos, and velvety lattes brewed from our specialty dark roast blend.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Artisan Iced Coolers",
    desc: "Lychee & Hibiscus, Fizzy Fruit coolers, fresh lemonades, and thick dessert milkshakes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
      </svg>
    ),
    title: "Ambient Lounge",
    desc: "Warm backlit shelves, peaceful greenery, and a calm space for quiet conversations or slow afternoons.",
  },
];

export default function CoffeeBar() {
  return (
    <section id="coffeebar" className="grain relative overflow-hidden bg-forest-mid py-28 md:py-36 text-sand">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 h-[32rem] w-[32rem] -translate-y-1/2 -translate-x-1/2 rounded-full bg-forest-soft/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Specialty Brews & Lounge"
          title="The Coffee Bar"
          lede="From morning espresso rituals to serene late-night pours."
          light
        />

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visual Column - Real Coffee Bar Image */}
          <Reveal className="lg:col-span-7">
            <div className="group relative">
              {/* Outer decorative gold frame */}
              <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-forest-deep/80 p-2 shadow-2xl shadow-black/60 transition duration-700 hover:border-gold">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <img
                    src={img("coffeebar")}
                    alt="Greenforest Eatery Coffee Bar & Espresso Lounge in Uttara"
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle inner gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent opacity-60" />

                  {/* On-image badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-gold/30 bg-forest-deep/90 px-4 py-2.5 backdrop-blur-md">
                    <div>
                      <p className="font-serif text-lg text-cream">The Espresso Bar</p>
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-soft">Uttara, Dhaka · Open Daily 11 AM – 10 PM</p>
                    </div>
                    <span className="hidden sm:inline-block rounded-full border border-gold/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                      In-House Roastery
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative accent element behind */}
              <div className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl border border-gold/15" />
            </div>
          </Reveal>

          {/* Narrative & Details Column */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="space-y-6">
              <span className="inline-block border-b border-gold pb-1 font-serif text-2xl italic text-gold-soft">
                Brewed with precision.
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-cream leading-tight">
                A dedicated sanctuary for dark roasts & slow sips.
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-sand/75">
                At Greenforest Eatery, coffee is an art of its own. Centered around our illuminated coffee bar, our baristas pull rich espresso shots, craft velvety microfoam macchiatos, and shake fruit-packed iced coolers with equal care.
              </p>

              {/* Feature points */}
              <div className="mt-8 space-y-5 pt-2">
                {features.map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="mt-1 flex-none rounded-lg border border-gold/30 bg-forest-deep p-2">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-cream">{f.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-sand/65">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4 pt-4 border-t border-gold/25">
                <a
                  href="#menu"
                  className="bg-gold px-7 py-3.5 text-xs uppercase tracking-[0.22em] text-forest-deep font-medium transition hover:bg-gold-soft"
                >
                  Beverage Menu
                </a>
                <a
                  href="#visit"
                  className="border border-gold/50 px-7 py-3.5 text-xs uppercase tracking-[0.22em] text-gold-soft transition hover:bg-gold/10"
                >
                  Find Our Lounge
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
