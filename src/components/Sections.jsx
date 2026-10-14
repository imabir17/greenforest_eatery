import { Reveal, SectionHead } from "./ui";
import { signatures, gallery, img } from "../data";


export function Signature() {
  return (
    <section id="signature" className="grain relative overflow-hidden bg-moss py-28 md:py-36">
      <div className="absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-forest-soft/40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Chef's favourites" title="Signature plates" lede="Four dishes our guests order again and again." light />
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {signatures.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <article className="group h-full border border-gold/25 bg-forest-deep/70 p-3 transition duration-500 hover:-translate-y-2 hover:border-gold/70">
                <div className="aspect-[4/5] overflow-hidden rounded-t-[999px]">
                  <img src={img(s.image)} alt={s.name} loading="lazy" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110" />
                </div>
                <div className="px-3 pb-5 pt-6 text-center">
                  <h3 className="text-2xl text-gold-soft">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand/60">{s.desc}</p>
                  <p className="mt-5 font-serif text-xl text-gold">Tk {s.price}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="bg-forest-deep py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Gallery" title="From the kitchen" lede="A few plates and pours from the menu." />
        <div className="mt-20 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.key} delay={(i % 4) * 0.08} className={i % 2 ? "lg:translate-y-10" : ""}>
              <figure className="group text-center">
                <div className="aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-md border border-gold/60 p-1.5 shadow-[0_0_0_6px_var(--color-forest-deep),0_0_0_7px_rgba(201,162,75,0.4)]">
                  <img src={img(g.key)} alt={g.caption} loading="lazy" className="h-full w-full rounded-t-[999px] object-cover transition duration-[1200ms] group-hover:scale-110" />
                </div>
                <figcaption className="mt-8 font-serif text-xl italic text-cream">{g.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
