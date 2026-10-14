import { motion } from "framer-motion";
import { img } from "../data";
import logo from "../assets/logo.png";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } };
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <header id="top" className="grain relative isolate flex min-h-screen items-center overflow-hidden bg-forest-deep text-sand">
      <img src={img("ribeye")} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover opacity-40 blur-[2px]" />
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        src="/hero.mp4"
        poster={img("ribeye")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,rgba(7,22,14,0.55),rgba(7,22,14,0.85)_75%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/70 via-transparent to-forest-deep" />
      <div className="pointer-events-none absolute inset-6 -z-10 border border-gold/30 md:inset-8" />
      <div className="pointer-events-none absolute inset-8 -z-10 border border-gold/10 md:inset-10" />

      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl px-6 pt-20 pb-16 md:px-8 md:pt-24 md:pb-20 text-center">
        <motion.p variants={rise} className="mb-6 md:mb-10 text-[0.7rem] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-gold-soft">Uttara · Dhaka</motion.p>
        <motion.h1 variants={rise} className="mx-auto w-[min(84vw,760px)]">
          <img src={logo} alt="Greenforest Eatery" className="w-full drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]" />
        </motion.h1>
        <motion.p variants={rise} className="mx-auto mt-6 md:mt-10 max-w-lg text-base md:text-lg leading-relaxed text-sand/75">
          Steaks, seafood and wood-fired pizza in an unhurried, elegant room. From a morning espresso to a late dinner.
        </motion.p>
        <motion.div variants={rise} className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
          <a href="#menu" className="w-full sm:w-auto bg-gold px-8 py-3.5 md:px-9 md:py-4 text-xs uppercase tracking-[0.25em] text-forest-deep transition hover:bg-gold-soft text-center">Explore the menu</a>
          <a href="#visit" className="w-full sm:w-auto border border-gold/60 px-8 py-3.5 md:px-9 md:py-4 text-xs uppercase tracking-[0.25em] text-gold-soft transition hover:bg-gold/10 text-center">Visit us</a>
        </motion.div>
      </motion.div>

      <a href="#about" aria-label="Scroll down" className="hidden md:flex absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-gold/70 transition-colors hover:text-gold">
        <span className="text-[0.6rem] uppercase tracking-[0.4em]">Scroll</span>
        <motion.span animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="h-8 lg:h-10 w-px origin-top bg-gold" />
      </a>
    </header>
  );
}
