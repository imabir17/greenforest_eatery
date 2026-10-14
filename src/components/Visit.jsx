import { Reveal, SectionHead } from "./ui";
import { MAPS_URL } from "../data";
import logo from "../assets/logo.png";

export function Visit() {
  const link = "text-gold-soft underline-offset-4 hover:underline";
  const cols = [
    ["Location", <>Plot 37, Sonargaon Janapath Rd<br />Dhaka 1230<br /><a href={MAPS_URL} target="_blank" rel="noopener" className={link}>Open on Google Maps</a></>],
    ["Hours", <>Every day<br /><span className="font-serif text-2xl text-sand">11 AM – 10 PM</span></>],
    ["Reservations", <>Call us to book a table<br /><a href="tel:+8801806972856" className={`${link} font-serif text-2xl`}>01806-972856</a></>],
  ];
  return (
    <section id="visit" className="grain relative overflow-hidden bg-forest-deep py-28 text-center text-sand md:py-36">
      <div className="absolute -bottom-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-forest-soft/40 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHead eyebrow="Reserve a table" title="Visit us" lede="Dinner, lunch or just a coffee. We'd be glad to host you." light />
        <div className="mt-16 grid gap-px border border-gold/25 bg-gold/25 md:grid-cols-3">
          {cols.map(([t, c], i) => (
            <Reveal key={t} delay={i * 0.1} className="bg-forest-deep p-10">
              <h3 className="mb-3 text-3xl text-gold-soft">{t}</h3>
              <p className="leading-relaxed text-sand/65">{c}</p>
            </Reveal>
          ))}
        </div>
        <a href={MAPS_URL} target="_blank" rel="noopener" className="mt-14 inline-block bg-gold px-10 py-4 text-xs uppercase tracking-[0.25em] text-forest-deep transition hover:bg-gold-soft">
          Get directions
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#040d08] px-6 py-12 text-center">
      <img src={logo} alt="Greenforest Eatery" className="mx-auto h-16 w-auto" />
      <p className="mt-5 text-xs uppercase tracking-[0.25em] text-sand/40">Plot 37 Sonargaon Janapath Rd, Dhaka 1230 · 01806-972856</p>
      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-sand/30">Open daily 11 AM – 10 PM · All prices exclusive of VAT</p>
    </footer>
  );
}
