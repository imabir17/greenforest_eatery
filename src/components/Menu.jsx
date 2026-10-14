import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHead } from "./ui";
import { menu, categories, tabImages, flags, formatPrice, img } from "../data";

const ICONS = {
  s: { label: "Recommended", color: "#c9a24b", path: "M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" },
  c: { label: "Spicy", color: "#d9534a", path: "M19.5 5.5C18 9 15 11.5 11 13.8 8.2 15.4 5.5 17.8 3 21c-.2-3 .8-6.2 3.5-8.8C10 8.8 15 8.2 19.5 5.5z" },
  v: { label: "Vegetarian", color: "#5fae5a", path: "M4 20C4 10 10 4 21 3c0 11-6 17-14 17z" },
};

function Icon({ k, className = "h-4 w-4" }) {
  const i = ICONS[k];
  if (!i) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={i.label}>
      <title>{i.label}</title>
      <path fill={i.color} d={i.path} />
    </svg>
  );
}

const toCatId = (name) => `cat-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default function Menu() {
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [filter, setFilter] = useState(null); // null | 's' | 'c' | 'v'
  const navRef = useRef(null);

  // Scrollspy: update active category pill based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = categories.length - 1; i >= 0; i--) {
        const el = document.getElementById(toCatId(categories[i]));
        if (el && el.offsetTop <= scrollPos) {
          setActiveCat(categories[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll active pill into view within the horizontal category bar
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeBtn = nav.querySelector(`[data-cat="${activeCat}"]`);
    if (activeBtn) {
      nav.scrollTo({
        left: activeBtn.offsetLeft - nav.clientWidth / 2 + activeBtn.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeCat]);

  const scrollToCategory = (catName) => {
    setActiveCat(catName);
    const target = document.getElementById(toCatId(catName));
    if (target) {
      const navOffset = 135;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  // Filter items per category
  const filteredCategories = useMemo(() => {
    return categories.map((catName) => {
      const allItems = menu[catName] || [];
      const visibleItems = allItems.filter(
        (i) => i[0].startsWith("#") || !filter || (flags[i[0]] || "").includes(filter)
      );
      // Clean up orphaned subheadings if no actual items follow them
      const cleanedItems = [];
      let currentSubheading = null;
      visibleItems.forEach((item) => {
        if (item[0].startsWith("#")) {
          currentSubheading = item;
        } else {
          if (currentSubheading) {
            cleanedItems.push(currentSubheading);
            currentSubheading = null;
          }
          cleanedItems.push(item);
        }
      });
      const hasRealDishes = cleanedItems.some((i) => !i[0].startsWith("#"));
      return {
        name: catName,
        id: toCatId(catName),
        items: cleanedItems,
        images: tabImages[catName] || [],
        hasItems: hasRealDishes,
      };
    });
  }, [filter]);

  return (
    <section id="menu" className="relative bg-forest-mid py-28 md:py-36 text-sand">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="A la Carte"
          title="The Full Menu"
          lede="Crafted from premium ingredients, grilled to order, and served with pride."
          light
        />

        {/* Sticky Quick-Jump Category Navigation Bar */}
        <div className="sticky top-[72px] z-30 -mx-6 mt-14 border-y border-gold/30 bg-forest-deep/95 backdrop-blur-xl py-2 shadow-xl shadow-black/40">
          <div className="relative">
            <div
              ref={navRef}
              className="no-scrollbar flex items-center gap-2 overflow-x-auto px-6 py-1 scroll-smooth"
            >
              {categories.map((k) => {
                const isActive = k === activeCat;
                return (
                  <button
                    key={k}
                    data-cat={k}
                    onClick={() => scrollToCategory(k)}
                    className={`flex-none rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                      isActive
                        ? "bg-gold text-forest-deep font-medium shadow-md shadow-gold/20 scale-105"
                        : "border border-gold/20 text-sand/70 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dietary Legend & Filter Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setFilter(null)}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition ${
              filter === null
                ? "border-gold bg-gold text-forest-deep font-medium"
                : "border-gold/30 text-sand/60 hover:border-gold"
            }`}
          >
            All Items
          </button>
          {Object.keys(ICONS).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(filter === k ? null : k)}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition ${
                filter === k
                  ? "border-gold bg-gold text-forest-deep font-medium"
                  : "border-gold/30 text-sand/60 hover:border-gold"
              }`}
            >
              <Icon k={k} className="h-3.5 w-3.5" />
              {ICONS[k].label}
            </button>
          ))}
        </div>

        {/* Continuous Menu Sections */}
        <div className="mt-16 space-y-24">
          {filteredCategories.map((category) => {
            if (!category.hasItems && filter) return null;

            return (
              <div
                key={category.name}
                id={category.id}
                className="scroll-mt-36 border-t border-gold/20 pt-14 first:border-none first:pt-0"
              >
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gold/30">
                  <div>
                    <span className="text-[0.7rem] uppercase tracking-[0.35em] text-gold">Category</span>
                    <h3 className="mt-1 font-serif text-4xl md:text-5xl text-cream tracking-wide">
                      {category.name}
                    </h3>
                  </div>

                  {/* Thumbnail Previews for this Category */}
                  {category.images.length > 0 && (
                    <div className="flex items-center gap-3">
                      {category.images.map((imgKey) => (
                        <div
                          key={imgKey}
                          className="group relative h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full border border-gold/40 shadow-lg shadow-black/40"
                        >
                          <img
                            src={img(imgKey)}
                            alt={category.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Items Grid for this Category */}
                <div className="mt-6 grid gap-x-12 gap-y-2 md:grid-cols-2">
                  {category.items.map((item, idx) => {
                    const isSubheading = item[0].startsWith("#");

                    if (isSubheading) {
                      return (
                        <div key={idx} className="col-span-full pt-8 pb-2">
                          <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-gold/40" />
                            <h4 className="font-serif text-2xl text-gold-soft italic">
                              {item[0].slice(1)}
                            </h4>
                            <span className="h-px flex-1 bg-gold/20" />
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={item[0]}
                        className="group flex flex-col justify-between border-b border-dotted border-gold/25 py-4 transition-colors hover:bg-white/5 md:px-3 rounded"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="flex items-center gap-2 font-serif text-xl md:text-2xl italic text-cream group-hover:text-gold-soft transition-colors">
                            {item[0]}
                            <span className="inline-flex gap-1">
                              {(flags[item[0]] || "")
                                .split("")
                                .map((c) => <Icon key={c} k={c} />)}
                            </span>
                          </h4>
                          <span className="whitespace-nowrap font-serif text-lg md:text-xl font-semibold text-gold">
                            {formatPrice(item[2])}
                          </span>
                        </div>
                        {item[1] && (
                          <p className="mt-1.5 text-sm md:text-base leading-relaxed text-sand/65">
                            {item[1]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Notice */}
        <div className="mt-20 border-t border-gold/30 pt-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-sand/50">
            All prices are in Bangladeshi Taka (Tk) and exclusive of VAT.
          </p>
          <div className="mt-6">
            <a
              href="#visit"
              className="inline-block border border-gold/60 px-8 py-3 text-xs uppercase tracking-[0.2em] text-gold-soft transition hover:bg-gold hover:text-forest-deep"
            >
              Reserve a Table
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
