import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MAPS_URL } from "../data";
import logo from "../assets/logo.png";

const links = [
  ["About", "#about"],
  ["Signatures", "#signature"],
  ["Coffee Bar", "#coffeebar"],
  ["Gallery", "#gallery"],
  ["Menu", "#menu"],
  ["Visit", "#visit"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-forest-deep/90 backdrop-blur-xl border-b border-gold/25"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <a href="#top" aria-label="Greenforest Eatery — home" className="block">
          <img src={logo} alt="Greenforest Eatery" className="h-11 w-auto md:h-12" />
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="group relative text-xs uppercase tracking-[0.22em] text-sand/85 transition-colors hover:text-gold">
                {label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="border border-gold/60 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold-soft transition hover:bg-gold hover:text-forest-deep">
              Find us
            </a>
          </li>
        </ul>

        <button
          className="relative h-10 w-10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`absolute left-2 right-2 h-px bg-gold-soft transition-all ${open ? "top-5 rotate-45" : "top-3.5"}`} />
          <span className={`absolute left-2 right-2 top-5 h-px bg-gold-soft transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-2 right-2 h-px bg-gold-soft transition-all ${open ? "top-5 -rotate-45" : "top-[26px]"}`} />
        </button>
      </nav>

      <div className={`grid transition-all duration-500 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <ul className="overflow-hidden px-6">
          {links.map(([label, href]) => (
            <li key={href} className="border-t border-gold/15">
              <a href={href} onClick={() => setOpen(false)} className="block py-4 font-serif text-2xl text-sand">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.header>
  );
}
