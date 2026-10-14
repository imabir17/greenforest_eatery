import { Reveal, SectionHead } from "./ui";

// Quotes are taken verbatim from public Google reviews (all 5 stars).
const reviews = [
  {
    quote: "The environment was calm, quiet, and beautifully decorated. The food was delicious and the portion sizes were even more than expected.",
    name: "张云熙",
    meta: "Dinner",
  },
  {
    quote: "The place is stunning… after a long time I am seeing a place that is spacious and has a plenty of natural light.",
    name: "Shams Yaard Khan",
    meta: "Local Guide · Lunch",
  },
  {
    quote: "The food was fresh, delicious, and beautifully presented. The atmosphere is clean, cozy, and perfect for spending quality time with family or friends. The staff were polite, attentive, and professional.",
    name: "Mohammad Abidur Rahman",
    meta: "Local Guide",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="#c9a24b" d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-moss py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="What guests say" title="Loved from the first month" />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="relative flex h-full flex-col border border-gold/30 bg-forest-deep p-8 transition duration-500 hover:-translate-y-1 hover:border-gold">
                <span aria-hidden="true" className="absolute right-6 top-2 font-serif text-8xl leading-none text-gold/25">“</span>
                <Stars />
                <blockquote className="mt-5 flex-1 font-serif text-xl italic leading-relaxed text-cream">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-gold/25 pt-4">
                  <span className="block text-sm font-normal text-cream">{r.name}</span>
                  <span className="text-xs uppercase tracking-[0.15em] text-sand/50">{r.meta} · Google review</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
