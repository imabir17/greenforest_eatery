import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHead } from "./ui";
import { menu, categories, tabImages, flags, formatPrice, img } from "../data";

const ICONS = {
  s: { label: "Recommended", color: "#c9a24b", path: "M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" },
  c: { label: "Spicy", color: "#d9534a", path: "M19.5 5.5C18 9 15 11.5 11 13.8 8.2 15.4 5.5 17.8 3 21c-.2-3 .8-6.2 3.5-8.8C10 8.8 15 8.2 19.5 5.5z" },
  v: { label: "Vegetarian", color: "#5fae5a", path: "M4 20C4 10 10 4 21 3c0 11-6 17-14 17z" },
};

function Icon({ k, className = "h-4 w-4" }) {
  const i = ICONS[k];
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={i.label}>
      <title>{i.label}</title>
      <path fill={i.color} d={i.path} />
    </svg>
  );
}

function CategoryTabs({ cat, setCat }) {
  const ref = useRef(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Keep the active tab centred when it changes.
  useEffect(() => {
    const el = ref.current;
    const btn = el?.querySelector('[aria-selected="true"]');
    if (!btn) return;
    el.scrollTo({ left: btn.offsetLeft - el.clientWidth / 2 + btn.offsetWidth / 2, behavior: "smooth" });
  }, [cat]);

  // Vertical mouse wheel scrolls the strip sideways while hovering it.
  useEffect(() => {
    const el = ref.current;
    const onWheel = (e) => {
      if (el.scrollWidth <= el.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 && e.deltaY > 0;
      if (atStart || atEnd) return; // let the page scroll
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const by = (dir) => ref.current.scrollBy({ left: dir * ref.current.clientWidth * 0.7, behavior: "smooth" });

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return; // touch already scrolls natively
    drag.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    ref.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => { drag.current.down = false; };

  const arrow = (dir, hidden) => (
    <button
      aria-label={dir < 0 ? "Scroll categories left" : "Scroll categories right"}
      onClick={() => by(dir)}
      tabIndex={hidden ? -1 : 0}
      className={`absolute top-0 z-10 hidden h-full w-14 items-center transition-opacity md:flex ${
        dir < 0 ? "left-0 justify-start bg-gradient-to-r" : "right-0 justify-end bg-gradient-to-l"
      } from-forest-mid via-forest-mid/90 to-transparent ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <svg viewBox="0 0 24 24" className="mx-1 h-8 w-8 rounded-full border border-gold/60 bg-forest-mid p-1.5 text-gold hover:bg-gold hover:text-forest-deep" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );

  return (
    <div className="sticky top-[72px] z-30 -mx-6 mt-14 border-b border-gold/30 bg-forest-mid/90 backdrop-blur-lg">
      <div className="relative">
        {arrow(-1, edge.start)}
        {arrow(1, edge.end)}
        {/* Edge fades hint that more tabs exist (mobile) */}
        <div className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-forest-mid to-transparent transition-opacity md:hidden ${edge.start ? "opacity-0" : "opacity-100"}`} />
        <div className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-forest-mid to-transparent transition-opacity md:hidden ${edge.end ? "opacity-0" : "opacity-100"}`} />
        <div
          ref={ref}
          role="tablist"
          aria-label="Menu categories"
          onScroll={update}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={(e) => { if (drag.current.moved) { e.stopPropagation(); e.preventDefault(); drag.current.moved = false; } }}
          className="no-scrollbar flex cursor-grab touch-pan-x gap-1 overflow-x-auto px-6 active:cursor-grabbing md:px-14"
        >
          {categories.map((k) => {
            const active = k === cat;
            return (
              <button
                key={k}
                role="tab"
                aria-selected={active}
                onClick={() => setCat(k)}
                className={`relative flex-none select-none whitespace-nowrap px-5 py-4 text-xs uppercase tracking-[0.18em] transition-colors ${active ? "text-gold-soft" : "text-sand/50 hover:text-gold"}`}
              >
                {k}
                {active && <motion.span layoutId="tab-underline" className="absolute inset-x-3 bottom-0 h-0.5 bg-gold" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [cat, setCat] = useState(categories[0]);
  const [filter, setFilter] = useState(null); // null | 's' | 'c' | 'v'

  const items = useMemo(
    () => menu[cat].filter((i) => i[0][0] === "#" || !filter || (flags[i[0]] || "").includes(filter)),
    [cat, filter]
  );
  const hasItems = items.some((i) => i[0][0] !== "#");

  return (
    <section id="menu" className="bg-forest-mid py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHead eyebrow="Taste" title="The menu" lede="Choose a category below." />

        <CategoryTabs cat={cat} setCat={setCat} />


        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {Object.keys(ICONS).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(filter === k ? null : k)}
              aria-pressed={filter === k}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition ${
                filter === k ? "border-gold bg-gold text-forest-deep" : "border-gold/30 text-sand/60 hover:border-gold"
              }`}
            >
              <Icon k={k} className="h-3.5 w-3.5" />
              {ICONS[k].label}
            </button>
          ))}
        </div>

        <div role="tabpanel" aria-live="polite" className="mt-12 min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat + filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-12 flex justify-center gap-5">
                {(tabImages[cat] || []).map((s) => (
                  <img key={s} src={img(s)} alt={cat} loading="lazy" className="h-36 w-36 rounded-t-full rounded-b-md border border-gold/50 object-cover shadow-xl shadow-black/40 md:h-52 md:w-52" />
                ))}
              </div>

              {!hasItems && <p className="py-10 text-center font-serif text-2xl italic text-sand/50">Nothing here matches that filter.</p>}

              <div className="mx-auto max-w-3xl">
                {items.map((i) =>
                  i[0][0] === "#" ? (
                    hasItems && <h3 key={i[0]} className="mb-2 mt-12 text-center font-serif text-3xl text-gold">{i[0].slice(1)}</h3>
                  ) : (
                    <div key={i[0]} className="group grid grid-cols-[1fr_auto] gap-x-6 border-b border-dotted border-gold/50 py-5 transition-colors hover:bg-white/5 md:px-4">
                      <h3 className="flex items-center gap-2 font-serif text-2xl italic text-cream">
                        {i[0]}
                        <span className="flex gap-1">{(flags[i[0]] || "").split("").map((c) => <Icon key={c} k={c} />)}</span>
                      </h3>
                      <span className="whitespace-nowrap font-serif text-xl font-semibold text-gold">{formatPrice(i[2])}</span>
                      {i[1] && <p className="col-start-1 mt-1 text-[0.95rem] leading-relaxed text-sand/60">{i[1]}</p>}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-sand/50">
          All prices are in Bangladeshi Taka (Tk) and exclusive of VAT.
        </p>
      </div>
    </section>
  );
}
