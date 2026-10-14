import { motion } from "framer-motion";

/** Fade-up on scroll wrapper. */
export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow + heading + lede, shared by every section. */
export function SectionHead({ eyebrow, title, lede, light = false }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <div className="mb-5 flex items-center justify-center gap-4 text-gold">
        <span className="h-px w-12 bg-current opacity-60" />
        <span className="text-[0.7rem] uppercase tracking-[0.4em]">{eyebrow}</span>
        <span className="h-px w-12 bg-current opacity-60" />
      </div>
      <h2 className={`text-5xl md:text-6xl text-cream`}>{title}</h2>
      {lede && <p className={`mt-5 text-lg text-sand/70`}>{lede}</p>}
    </Reveal>
  );
}
