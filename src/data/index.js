import raw from "./menu.json";

const files = import.meta.glob("../assets/img/*.jpg", { eager: true, import: "default" });

/** Image lookup by key, e.g. img("ribeye"). */
export const img = (key) => files[`../assets/img/${key}.jpg`];

export const menu = raw.menu;
export const categories = Object.keys(raw.menu);
export const tabImages = raw.tabImages;
export const flags = raw.flags; // item name -> string of s (recommended) c (spicy) v (vegetarian)
export const gallery = raw.gallery.map(([key, caption]) => ({ key, caption }));

/** Parses a price field: plain "500" or text like "Half 850 · Full 1,550". */
export const formatPrice = (p) => (/^\d/.test(p) ? `Tk ${Number(p).toLocaleString("en-US")}` : p);

export const MAPS_URL = "https://share.google/EKZWcRhgV23cbd82n";

export const signatures = [
  { name: "Classic Butter Grilled Lobster", desc: "Garlic butter, lemon wedges, fried rice or mash and lobster bisque.", price: "3,000", image: "lobster" },
  { name: "Rib Eye Steak", desc: "Well-marbled, grilled to your preference, with mash potatoes and mac & cheese.", price: "2,200", image: "ribeye" },
  { name: "Chicken Roulade", desc: "Stuffed chicken with spicy rice, house sauce and sautéed vegetables.", price: "1,050", image: "roulade" },
  { name: "Tiramisu Mocha", desc: "Coffee meets dessert with a tiramisu twist.", price: "375", image: "latte" },
];
