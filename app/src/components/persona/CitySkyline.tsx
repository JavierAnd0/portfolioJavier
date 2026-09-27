import { useEffect, useId, useMemo } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

// Worm's-eye city: every vertical edge converges on a vanishing point high above,
// and building bases sag toward the sides for a fisheye bulge.
const W = 1600;
const H = 720;
const VP: Pt = [800, -620];

type Pt = [number, number];

const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const f = (n: number) => n.toFixed(1);
const poly = (pts: Pt[]) => `M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}Z`;

const baseY = (x: number) => H + 40 + 210 * ((x - W / 2) / (W / 2)) ** 2;

/** A trapezoid rising `h` px from its base toward the vanishing point. */
const riseFrom = (x: number, w: number, h: number, y = baseY(x + w / 2)) => {
  const bl: Pt = [x, y];
  const br: Pt = [x + w, y];
  const t = h / (y - VP[1]);
  return { bl, br, tl: lerp(bl, VP, t), tr: lerp(br, VP, t) };
};

interface LayerSpec {
  seed: number;
  wMin: number;
  wMax: number;
  hMin: number;
  hMax: number;
  cell: [number, number];
  litChance: number;
  redChance: number;
}

interface LayerPaths {
  body: string;
  sides: string;
  windows: string;
  redWindows: string;
  rims: string;
  antennas: string;
}

const buildLayer = (spec: LayerSpec): LayerPaths => {
  const rand = mulberry32(spec.seed);
  const body: string[] = [];
  const sides: string[] = [];
  const windows: string[] = [];
  const redWindows: string[] = [];
  const rims: string[] = [];
  const antennas: string[] = [];

  let x = -140;
  while (x < W + 140) {
    const w = spec.wMin + rand() * (spec.wMax - spec.wMin);
    const centerBias = Math.max(0, 1 - Math.abs(x + w / 2 - W / 2) / (W * 0.62));
    const h = spec.hMin + (spec.hMax - spec.hMin) * (0.3 + 0.7 * rand()) * (0.45 + 0.55 * centerBias);
    const b = riseFrom(x, w, h);
    const leftOfCenter = x + w / 2 < W / 2;

    // Side face on the outer edge gives each tower volume.
    const depth = w * (0.22 + rand() * 0.18) * (leftOfCenter ? -1 : 1);
    const edge = leftOfCenter ? [b.bl, b.tl] : [b.br, b.tr];
    const back = edge.map(([px, py]) => [px + depth, py + Math.abs(depth) * 0.35] as Pt);
    const backTop = lerp(back[0], VP, h / (back[0][1] - VP[1]));
    sides.push(poly([edge[0], edge[1], backTop, back[0]]));

    body.push(poly([b.bl, b.tl, b.tr, b.br]));

    // Stepped crown on some towers.
    if (rand() < 0.35) {
      const inset = 0.18 + rand() * 0.18;
      const crownH = h * (0.08 + rand() * 0.14);
      const cl = lerp(b.tl, b.tr, inset);
      const cr = lerp(b.tl, b.tr, 1 - inset);
      const t = crownH / (cl[1] - VP[1]);
      const ctl = lerp(cl, VP, t);
      const ctr = lerp(cr, VP, t);
      body.push(poly([cl, ctl, ctr, cr]));
      if (rand() < 0.5) {
        const mid = lerp(ctl, ctr, 0.5);
        antennas.push(`M${f(mid[0])} ${f(mid[1])}L${f(lerp(mid, VP, 0.05)[0])} ${f(lerp(mid, VP, 0.05)[1])}`);
      }
    }

    // Rim light along the edge facing the center, carried over the roof.
    const [from, to, roofEnd] = leftOfCenter ? [b.br, b.tr, b.tl] : [b.bl, b.tl, b.tr];
    rims.push(`M${f(from[0])} ${f(from[1])}L${f(to[0])} ${f(to[1])}L${f(lerp(to, roofEnd, 0.7)[0])} ${f(lerp(to, roofEnd, 0.7)[1])}`);

    // Facade: floor bands on some towers, a lit window grid on the rest.
    const at = (u: number, v: number) => lerp(lerp(b.bl, b.br, u), lerp(b.tl, b.tr, u), v);
    const cols = Math.max(2, Math.floor(w / spec.cell[0]));
    const rows = Math.max(3, Math.floor(h / spec.cell[1]));
    if (rand() < 0.3) {
      for (let r = 1; r < rows; r++) {
        if (rand() > 0.75) continue;
        const v0 = r / rows;
        const v1 = v0 + 0.22 / rows;
        windows.push(poly([at(0.08, v0), at(0.08, v1), at(0.92, v1), at(0.92, v0)]));
      }
    } else {
      for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const roll = rand();
          if (roll > spec.litChance) continue;
          const u0 = (c + 0.3) / cols;
          const u1 = (c + 0.7) / cols;
          const v0 = r / rows;
          const v1 = (r + 0.45) / rows;
          const quad = poly([at(u0, v0), at(u0, v1), at(u1, v1), at(u1, v0)]);
          (roll < spec.redChance ? redWindows : windows).push(quad);
        }
      }
    }

    x += w * (0.62 + rand() * 0.5);
  }

  return {
    body: body.join(''),
    sides: sides.join(''),
    windows: windows.join(''),
    redWindows: redWindows.join(''),
    rims: rims.join(''),
    antennas: antennas.join(''),
  };
};

// Lattice radio tower for the far layer — generic, not a real landmark.
const buildTower = (x: number, height: number) => {
  const leg = riseFrom(x, 110, height);
  const lines: string[] = [
    `M${f(leg.bl[0])} ${f(leg.bl[1])}L${f(leg.tl[0])} ${f(leg.tl[1])}`,
    `M${f(leg.br[0])} ${f(leg.br[1])}L${f(leg.tr[0])} ${f(leg.tr[1])}`,
  ];
  const steps = 14;
  for (let i = 0; i < steps; i++) {
    const v0 = i / steps;
    const v1 = (i + 1) / steps;
    // The tower tapers much faster than the buildings around it.
    const taper = (v: number) => 0.5 - 0.5 * (1 - v) ** 1.6;
    const left = (v: number) => lerp(lerp(leg.bl, leg.br, taper(v)), lerp(leg.tl, leg.tr, taper(v)), v);
    const right = (v: number) => lerp(lerp(leg.bl, leg.br, 1 - taper(v)), lerp(leg.tl, leg.tr, 1 - taper(v)), v);
    const [a, b, c, d] = [left(v0), right(v0), left(v1), right(v1)];
    lines.push(`M${f(a[0])} ${f(a[1])}L${f(d[0])} ${f(d[1])}M${f(b[0])} ${f(b[1])}L${f(c[0])} ${f(c[1])}`);
    lines.push(`M${f(a[0])} ${f(a[1])}L${f(c[0])} ${f(c[1])}M${f(b[0])} ${f(b[1])}L${f(d[0])} ${f(d[1])}`);
  }
  const tip = lerp(leg.tl, leg.tr, 0.5);
  const spire = lerp(tip, VP, 0.06);
  lines.push(`M${f(tip[0])} ${f(tip[1])}L${f(spire[0])} ${f(spire[1])}`);
  return { path: lines.join(''), light: spire };
};

const LAYERS = {
  far: { seed: 11, wMin: 70, wMax: 150, hMin: 260, hMax: 600, cell: [16, 20], litChance: 0.16, redChance: 0.01 },
  mid: { seed: 29, wMin: 110, wMax: 210, hMin: 180, hMax: 430, cell: [20, 24], litChance: 0.2, redChance: 0.025 },
  near: { seed: 47, wMin: 170, wMax: 320, hMin: 90, hMax: 250, cell: [26, 30], litChance: 0.16, redChance: 0.03 },
} satisfies Record<string, LayerSpec>;

interface CitySkylineProps {
  ready: boolean;
  className?: string;
}

const CitySkyline = ({ ready, className }: CitySkylineProps) => {
  const fadeId = useId();
  const reduceMotion = useReducedMotion();
  const { far, mid, near, tower } = useMemo(
    () => ({
      far: buildLayer(LAYERS.far),
      mid: buildLayer(LAYERS.mid),
      near: buildLayer(LAYERS.near),
      tower: buildTower(1090, 640),
    }),
    [],
  );

  // Pointer parallax: deeper layers drift less.
  const pointer = useMotionValue(0);
  const smooth = useSpring(pointer, { stiffness: 60, damping: 20 });
  const farX = useTransform(smooth, (v) => v * -10);
  const midX = useTransform(smooth, (v) => v * -22);
  const nearX = useTransform(smooth, (v) => v * -40);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => pointer.set(e.clientX / window.innerWidth - 0.5);
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointer, reduceMotion]);

  const rise = (delay: number) => ({
    initial: { y: 320 },
    animate: ready ? { y: 0 } : undefined,
    transition: { type: 'spring' as const, stiffness: 90, damping: 18, delay },
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0a0a" stopOpacity="0" />
          <stop offset="1" stopColor="#0a0a0a" stopOpacity="1" />
        </linearGradient>
      </defs>

      <motion.g style={{ x: farX }} {...rise(0.05)}>
        <path d={tower.path} fill="none" stroke="#1d1d1d" strokeWidth="5" strokeLinecap="round" />
        <circle cx={tower.light[0]} cy={tower.light[1]} r="5" fill="#e60012" className="animate-pulse" />
        <path d={far.sides} fill="#2a2a2a" />
        <path d={far.body} fill="#1d1d1d" />
        <path d={far.antennas} stroke="#1d1d1d" strokeWidth="3" />
        <path d={far.windows} fill="#4a4a4a" />
        <path d={far.redWindows} fill="#8a0010" />
      </motion.g>

      <motion.g style={{ x: midX }} {...rise(0.15)}>
        <path d={mid.sides} fill="#262626" />
        <path d={mid.body} fill="#111111" />
        <path d={mid.antennas} stroke="#111111" strokeWidth="4" />
        <path d={mid.windows} fill="#cfcfcf" />
        <path d={mid.redWindows} fill="#e60012" />
      </motion.g>

      <motion.g style={{ x: nearX }} {...rise(0.25)}>
        <path d={near.sides} fill="#3a3a3a" />
        <path d={near.body} fill="#040404" />
        <path d={near.antennas} stroke="#040404" strokeWidth="5" />
        <path d={near.rims} fill="none" stroke="#ffffff" strokeWidth="4" strokeLinejoin="round" />
        <path d={near.windows} fill="#ffffff" />
        <path d={near.redWindows} fill="#e60012" />
      </motion.g>

      <rect x="-200" y={H * 0.72} width={W + 400} height={H * 0.28} fill={`url(#${fadeId})`} />
    </svg>
  );
};

export default CitySkyline;
