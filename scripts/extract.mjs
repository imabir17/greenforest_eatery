// One-off: extracts menu data + images from the original single-file HTML.
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("..");
const src = path.join(dir, fs.readdirSync(dir).find((f) => f.endsWith(".html")));
const buf = fs.readFileSync(src);

// Lenient UTF-8 decode: bytes that are not valid UTF-8 are treated as Windows-1252.
const cp1252 = new TextDecoder("windows-1252");
let out = "";
for (let i = 0; i < buf.length; ) {
  const b = buf[i];
  if (b < 0x80) { out += String.fromCharCode(b); i++; continue; }
  const len = b >= 0xf0 ? 4 : b >= 0xe0 ? 3 : b >= 0xc0 ? 2 : 0;
  let ok = len > 0 && i + len <= buf.length;
  for (let k = 1; ok && k < len; k++) if ((buf[i + k] & 0xc0) !== 0x80) ok = false;
  if (ok) { out += buf.slice(i, i + len).toString("utf8"); i += len; }
  else { out += cp1252.decode(buf.slice(i, i + 1)); i++; }
}

const grab = (name) => {
  const m = out.match(new RegExp("const " + name + "=(\\{[\\s\\S]*?\\}|\\[\\[[\\s\\S]*?\\]\\]);\\n"));
  return JSON.parse(m[1]);
};
const M = grab("M"), T = grab("T"), P = grab("P"), F = grab("F"), G = grab("G");

const imgs = {};
for (const [k, v] of Object.entries(P)) {
  const m = v.match(/^data:image\/(\w+);base64,(.+)$/);
  const ext = m[1] === "jpeg" ? "jpg" : m[1];
  fs.writeFileSync(`src/assets/img/${k}.${ext}`, Buffer.from(m[2], "base64"));
  imgs[k] = ext;
}
fs.writeFileSync("src/data/menu.json", JSON.stringify({ menu: M, tabImages: T, flags: F, gallery: G, imgExt: imgs }, null, 1));
console.log(Object.keys(M).length, "categories;", Object.keys(imgs).length, "images");
const odd = [...new Set(out.match(/[^\x00-\x7f]/g) || [])];
console.log("non-ascii chars:", odd.join(" "));
