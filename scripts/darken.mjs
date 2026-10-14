// One-off: convert light sections to the dark theme.
import fs from "node:fs";

const edit = (file, pairs) => {
  const p = `src/components/${file}`;
  let s = fs.readFileSync(p, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) console.warn(`[${file}] not found: ${from}`);
    s = s.split(from).join(to);
  }
  fs.writeFileSync(p, s);
};

const text = [
  ["text-ink/70", "text-sand/70"], ["text-ink/60", "text-sand/60"], ["text-ink/55", "text-sand/55"], ["text-ink/50", "text-sand/50"],
];

edit("About.jsx", [
  ...text,
  ['bg-cream py-28 md:py-36', 'bg-forest-deep py-28 md:py-36'],
  ['border-[6px] border-cream', 'border-[6px] border-forest-deep'],
  ['shadow-forest/20', 'shadow-black/50'], ['shadow-forest/25', 'shadow-black/50'],
  ['bg-forest text-center text-gold-soft', 'border border-gold/50 bg-forest text-center text-gold-soft'],
  ['font-serif text-3xl leading-snug text-forest', 'font-serif text-3xl leading-snug text-cream'],
  ['group bg-cream p-8 text-center transition-colors duration-500 hover:bg-sand', 'group bg-forest-deep p-8 text-center transition-colors duration-500 hover:bg-forest-mid'],
  ['text-3xl text-forest transition-colors', 'text-3xl text-cream transition-colors'],
]);

edit("Sections.jsx", [
  ['bg-forest-mid py-28 md:py-36', 'bg-moss py-28 md:py-36'],
  ['id="gallery" className="bg-sand py-28 md:py-36"', 'id="gallery" className="bg-forest-deep py-28 md:py-36"'],
  ['var(--color-sand)', 'var(--color-forest-deep)'],
  ['font-serif text-xl italic text-forest', 'font-serif text-xl italic text-cream'],
  ['bg-forest-deep/60', 'bg-forest-deep/70'],
]);

edit("Menu.jsx", [
  ...text,
  ['id="menu" className="bg-cream py-28 md:py-36"', 'id="menu" className="bg-forest-mid py-28 md:py-36"'],
  ['from-cream via-cream/90', 'from-forest-mid via-forest-mid/90'],
  ['bg-cream p-1.5', 'bg-forest-mid p-1.5'],
  ['bg-cream/90 backdrop-blur-lg', 'bg-forest-mid/90 backdrop-blur-lg'],
  ['bg-gradient-to-r from-cream to-transparent', 'bg-gradient-to-r from-forest-mid to-transparent'],
  ['bg-gradient-to-l from-cream to-transparent', 'bg-gradient-to-l from-forest-mid to-transparent'],
  ['active ? "text-forest"', 'active ? "text-gold-soft"'],
  ['"border-gold bg-forest text-gold-soft"', '"border-gold bg-gold text-forest-deep"'],
  ['shadow-forest/10', 'shadow-black/40'],
  ['hover:bg-sand/60', 'hover:bg-white/5'],
  ['italic text-forest', 'italic text-cream'],
]);

edit("Reviews.jsx", [
  ...text,
  ['id="reviews" className="bg-sand py-28 md:py-36"', 'id="reviews" className="bg-moss py-28 md:py-36"'],
  ['bg-cream p-8', 'bg-forest-deep p-8'],
  ['italic leading-relaxed text-forest', 'italic leading-relaxed text-cream'],
  ['font-normal text-ink', 'font-normal text-cream'],
]);

edit("ui.jsx", [
  ['${light ? "text-cream" : "text-forest"}', 'text-cream'],
  ['${light ? "text-sand/70" : "text-ink/60"}', 'text-sand/70'],
]);

let css = fs.readFileSync("src/index.css", "utf8");
css = css.replace("--color-forest-soft: #1b4a33;", "--color-forest-soft: #1b4a33;\n  --color-moss: #0f2a1c;");
css = css.replace("@apply bg-cream font-sans font-light text-ink antialiased;", "@apply bg-forest-deep font-sans font-light text-sand antialiased;");
fs.writeFileSync("src/index.css", css);
console.log("done");
