// Turns the word frames exported from Figma (design/words/raw/*.svg) into data the site
// can animate letter by letter. Run with `npm run words` after re-exporting.
// Weekdays go to one JSON file each, loaded on demand: only today's is ever shown.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rawDir = join(root, 'design/words/raw');
const outFile = join(root, 'src/components/persona/words.generated.ts');
const daysDir = join(root, 'src/components/persona/days');
const PAD = 6;

// Figma writes absolute commands; this walks them to find the outline's extent.
const extent = (d, box) => {
  for (const [, cmd, args] of d.matchAll(/([MLCSQTHVZ])([^MLCSQTHVZ]*)/g)) {
    const n = (args.match(/-?\d*\.?\d+(?:e-?\d+)?/g) ?? []).map(Number);
    if (cmd === 'H') n.forEach((x) => { box.x0 = Math.min(box.x0, x); box.x1 = Math.max(box.x1, x); });
    else if (cmd === 'V') n.forEach((y) => { box.y0 = Math.min(box.y0, y); box.y1 = Math.max(box.y1, y); });
    else for (let i = 0; i + 1 < n.length; i += 2) {
      box.x0 = Math.min(box.x0, n[i]); box.x1 = Math.max(box.x1, n[i]);
      box.y0 = Math.min(box.y0, n[i + 1]); box.y1 = Math.max(box.y1, n[i + 1]);
    }
  }
  return box;
};

const round = (d) => d.replace(/-?\d+\.\d+/g, (v) => String(Math.round(Number(v))));

// Direct children of the frame group: each one is a letter layer (a path or a group).
const letterLayers = (svg, frameName) => {
  const open = `<g id="${frameName}">`;
  const start = svg.indexOf(open);
  if (start === -1) throw new Error(`frame group "${frameName}" not found`);
  let layers = childrenFrom(svg, start + open.length);
  // Letters grouped together in Figma (Cmd+G) still animate one by one. Only a plain
  // group is unwrapped, since dropping a transform or opacity would change the artwork.
  while (layers.length === 1 && /^<g(\s+id="[^"]*")?>/.test(layers[0])) {
    layers = childrenFrom(layers[0], layers[0].indexOf('>') + 1);
  }
  return layers;
};

// Elements nested exactly one level below the tag that ends at `from`.
const childrenFrom = (svg, from) => {
  const layers = [];
  let depth = 0;
  let childStart = -1;
  const tag = /<\/?[a-zA-Z][^>]*>/g;
  tag.lastIndex = from;
  for (let m; (m = tag.exec(svg)); ) {
    const t = m[0];
    const closing = t.startsWith('</');
    const selfClosing = t.endsWith('/>');
    if (closing && depth === 0) break;
    if (depth === 0 && !closing) childStart = m.index;
    if (!closing && !selfClosing) depth++;
    if (closing) depth--;
    if (depth === 0) layers.push(svg.slice(childStart, m.index + t.length));
  }
  return layers;
};

const words = {};
for (const file of readdirSync(rawDir).filter((f) => f.endsWith('.svg')).sort()) {
  const svg = readFileSync(join(rawDir, file), 'utf8');
  const frameName = file.replace(/\.svg$/, '').split('-').join('/');
  const layers = letterLayers(svg, frameName);
  // The export also paints the section behind the frame (2 paths); anything more is a
  // letter left loose in the section, which would silently go missing on the site.
  const countPaths = (s) => (s.match(/<path/g) ?? []).length;
  const loose = countPaths(svg) - layers.reduce((n, l) => n + countPaths(l), 0) - 2;
  if (loose > 0) console.warn(`⚠ ${frameName}: ${loose} layer(s) overlap the frame but sit outside it`);
  const letters = layers.map((layer) => round(layer.replace(/\s+id="[^"]*"/g, '').replace(/\n/g, '')));
  const box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  const lefts = letters.map((l) => {
    const own = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
    for (const [, d] of l.matchAll(/\sd="([^"]*)"/g)) { extent(d, own); extent(d, box); }
    return own.x0;
  });
  // Stagger letters left to right, whatever order the layers were stacked in.
  const order = lefts.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]).map(([, i]) => i);
  const rank = letters.map((_, i) => order.indexOf(i));
  const x = Math.floor(box.x0 - PAD);
  // Digits are set side by side to spell dates, so they keep the full frame height and
  // with it a shared baseline; words are cropped tight on every side.
  const frameHeight = Number(svg.match(/<svg[^>]*\sheight="([\d.]+)"/)[1]);
  const [y, h] = frameName.startsWith('numero/')
    ? [0, frameHeight]
    : [Math.floor(box.y0 - PAD), Math.ceil(box.y1 + PAD) - Math.floor(box.y0 - PAD)];
  words[frameName] = {
    viewBox: [x, y, Math.ceil(box.x1 + PAD) - x, h],
    letters: letters.map((markup, i) => ({ markup, rank: rank[i] })),
  };
}

rmSync(daysDir, { recursive: true, force: true });
mkdirSync(daysDir);
for (const name of Object.keys(words).filter((n) => n.startsWith('dia/'))) {
  // dia/es/lunes → days/es-lunes.json
  writeFileSync(join(daysDir, `${name.split('/').slice(1).join('-')}.json`), JSON.stringify(words[name]));
  delete words[name];
}

const body = `// Generated by scripts/build-words.mjs from design/words/raw — do not edit by hand.
export interface DesignedLetter {
  markup: string;
  /** Position counting from the left, for staggered animations. */
  rank: number;
}

export interface DesignedWordData {
  viewBox: [number, number, number, number];
  letters: DesignedLetter[];
}

export const WORDS = ${JSON.stringify(words, null, 2)} satisfies Record<string, DesignedWordData>;

export type WordName = keyof typeof WORDS;
`;
writeFileSync(outFile, body);
console.log(`${Object.keys(words).length} words → ${outFile}, weekdays → ${daysDir}`);
