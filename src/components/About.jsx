import { Reveal, SectionHead } from "./ui";
import { img } from "../data";

const offerings = [
  ["Italian", "Pizzas, lasagna and handmade pasta"],
  ["Mediterranean", "Kebabs, kofta and chargrilled meats"],
  ["Spanish", "Gambas pil pil, chorizo, patatas bravas"],
  ["Continental", "Steaks, grills and fresh salads"],
  ["Coffee bar", "Premium dark-roasted coffee"],
  ["Iced drinks", "Fruit-packed and refreshing"],
];

const stats = [
  ["2015", "Our legacy begins"],
  ["12", "Menu categories"],
  ["Uttara", "Our newest home"],
];


export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-forest-deep py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Our story" title={<>Now open in <em className="text-gold">Uttara</em></>} />

        {/* Story + photo collage */}
        <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative mx-auto h-[26rem] w-full max-w-lg sm:h-[30rem]">
              <img src={img("lobster")} alt="Butter grilled lobster" loading="lazy" className="absolute left-0 top-0 h-[78%] w-[62%] rounded-t-[999px] rounded-b-md border border-gold/60 object-cover shadow-2xl shadow-black/50" />
              <img src={img("ribeye")} alt="Rib eye steak" loading="lazy" className="absolute bottom-0 right-0 h-[58%] w-[52%] rounded-md border-[6px] border-forest-deep object-cover shadow-2xl shadow-black/50 ring-1 ring-gold/50" />
              <div className="absolute -left-2 bottom-6 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-gold/50 bg-forest text-center text-gold-soft shadow-xl sm:-left-6 sm:h-32 sm:w-32">
                <span className="font-serif text-4xl leading-none sm:text-5xl">2015</span>
                <span className="mt-1 text-[0.6rem] uppercase tracking-[0.25em]">Since</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-serif text-3xl leading-snug text-cream md:text-4xl">
              We are thrilled to bring our 2015 legacy of freshly prepared, globally inspired food and warm hospitality to a brand-new neighborhood.
            </p>
            <div className="my-8 h-px w-20 bg-gold" />
            <div className="space-y-5 text-lg leading-relaxed text-sand/70">
              <p>
                Whether you are craving Italian pizzas, Mediterranean kebabs, Spanish appetizers, or a fresh continental salad, our diverse menu has something for everyone.
              </p>
              <p>
                We take immense pride in using only the highest quality ingredients for all our signature mains and house-special meals. Pair your meal with our premium dark-roasted coffee or a refreshing, fruit-packed iced drink.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-gold/30 pt-8">
              {stats.map(([n, l]) => (
                <div key={l}>
                  <dt className="font-serif text-4xl text-gold">{n}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-sand/55">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* What we serve */}
        <div className="mt-28 grid gap-px border border-gold/25 bg-gold/25 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.08} className="group bg-forest-deep p-8 text-center transition-colors duration-500 hover:bg-forest-mid">
              <h3 className="text-3xl text-cream transition-colors group-hover:text-gold">{t}</h3>
              <p className="mt-2 text-sand/60">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
