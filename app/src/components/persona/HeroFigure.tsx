import { useId } from 'react';
import { motion } from 'framer-motion';
import { PORTRAIT_SRC } from './config';

type Pt = [number, number];
const f = (n: number) => n.toFixed(1);
const toPath = (pts: Pt[]) => `M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}Z`;

// ── Original bust silhouette, viewBox 600×760 ──────────────────────────────
// Hair is built from individual tapered locks that leave the scalp and fall
// under "gravity"; face, neck and coat use smooth curves.
const SCALP = { cx: 336, cy: 236, rx: 128, ry: 132 };

interface Lock {
  angle: number; // degrees, SVG space (270 = straight up)
  length: number;
  gravity: number; // how much the lock falls instead of sticking out
  width: number;
  curl?: number; // sideways bend of the tip
}

const lockPath = ({ angle, length, gravity, width, curl = 0 }: Lock, scale = 1) => {
  const a = (angle * Math.PI) / 180;
  const out: Pt = [Math.cos(a), Math.sin(a)];
  const base: Pt = [SCALP.cx + SCALP.rx * scale * out[0], SCALP.cy + SCALP.ry * scale * out[1]];
  const dir: Pt = [out[0] * (1 - gravity) + curl, out[1] * (1 - gravity) + gravity];
  const norm = Math.hypot(dir[0], dir[1]);
  const tip: Pt = [base[0] + (dir[0] / norm) * length, base[1] + (dir[1] / norm) * length];
  const ctrl: Pt = [base[0] + out[0] * length * 0.55, base[1] + out[1] * length * 0.55];
  const perp: Pt = [-out[1], out[0]];
  const half = width / 2;
  const l: Pt = [base[0] + perp[0] * half, base[1] + perp[1] * half];
  const r: Pt = [base[0] - perp[0] * half, base[1] - perp[1] * half];
  const cl: Pt = [ctrl[0] + perp[0] * half * 0.35, ctrl[1] + perp[1] * half * 0.35];
  const cr: Pt = [ctrl[0] - perp[0] * half * 0.35, ctrl[1] - perp[1] * half * 0.35];
  return `M${f(l[0])} ${f(l[1])}Q${f(cl[0])} ${f(cl[1])} ${f(tip[0])} ${f(tip[1])}Q${f(cr[0])} ${f(cr[1])} ${f(r[0])} ${f(r[1])}Z`;
};

const OUTER_LOCKS: Lock[] = [
  { angle: 168, length: 150, gravity: 0.8, width: 70, curl: -0.15 },
  { angle: 186, length: 150, gravity: 0.62, width: 74, curl: -0.2 },
  { angle: 204, length: 140, gravity: 0.45, width: 76 },
  { angle: 222, length: 128, gravity: 0.32, width: 74 },
  { angle: 240, length: 112, gravity: 0.38, width: 74, curl: -0.45 },
  { angle: 258, length: 104, gravity: 0.3, width: 72, curl: -0.6 },
  { angle: 276, length: 96, gravity: 0.24, width: 70, curl: -0.5 },
  { angle: 294, length: 100, gravity: 0.3, width: 70, curl: 0.45 },
  { angle: 310, length: 112, gravity: 0.34, width: 72, curl: 0.4 },
  { angle: 324, length: 128, gravity: 0.3, width: 74 },
  { angle: 344, length: 132, gravity: 0.45, width: 72 },
  { angle: 2, length: 128, gravity: 0.62, width: 66, curl: 0.12 },
  { angle: 18, length: 110, gravity: 0.78, width: 58, curl: 0.1 },
];

// Fringe locks hang over the brow and partly cover the eyes.
const FRINGE_LOCKS: Lock[] = [
  { angle: 150, length: 150, gravity: 0.9, width: 58, curl: -0.25 },
  { angle: 128, length: 120, gravity: 0.95, width: 44, curl: -0.3 },
  { angle: 112, length: 90, gravity: 0.95, width: 34, curl: -0.2 },
  { angle: 96, length: 72, gravity: 0.95, width: 30, curl: 0.15 },
].map((lock) => ({ ...lock }));

const HAIR = OUTER_LOCKS.map((lock) => lockPath(lock));
const FRINGE = FRINGE_LOCKS.map((lock) => lockPath(lock, 0.55));

const ellipse = (rx: number, ry: number, dy = 0) =>
  `M${SCALP.cx - rx} ${SCALP.cy + dy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0Z`;
const SKULL = ellipse(SCALP.rx, SCALP.ry);
// Slightly larger cap fills the gaps between lock roots.
const HAIR_CAP = ellipse(SCALP.rx * 1.16, SCALP.ry * 1.12, -6);

// Jaw turned three-quarters left: ear on the right, chin left of center.
const FACE =
  'M222 268C226 332 248 392 280 436C298 460 320 474 342 470C378 464 410 436 430 398C446 368 456 330 460 290Z';

const NECK_AND_COAT =
  'M300 440L292 492L238 500C160 520 90 548 44 600C14 634 0 690 0 760H600C600 690 590 640 560 600C528 560 490 536 452 516L404 500L400 432Z';

const COLLAR_LEFT = 'M296 452C262 440 236 420 214 392C220 440 232 480 250 512L338 600L318 480Z';
const COLLAR_RIGHT = 'M404 440C432 426 456 404 474 376C476 426 470 470 456 510L384 600L396 486Z';

// Separate paths: merged subpaths with opposite winding would punch holes.
const SILHOUETTE = [HAIR_CAP, SKULL, ...HAIR, FACE, NECK_AND_COAT, COLLAR_LEFT, COLLAR_RIGHT];

const Shapes = ({ paths, ...props }: { paths: string[] } & React.SVGProps<SVGGElement>) => (
  <g {...props}>
    {paths.map((d, i) => (
      <path key={i} d={d} />
    ))}
  </g>
);

// Narrow slits, outer corners raised.
const EYE_RIGHT: Pt[] = [[352, 346], [404, 322], [398, 338], [358, 354]];
const EYE_LEFT: Pt[] = [[318, 350], [282, 336], [286, 348], [314, 358]];

const Silhouette = () => {
  const uid = useId().replace(/:/g, '');
  const fade = `fade-${uid}`;
  const mask = `mask-${uid}`;

  return (
    <svg viewBox="0 0 600 760" className="h-full w-auto overflow-visible">
      <defs>
        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.62" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={mask} maskUnits="userSpaceOnUse" x="-80" y="-80" width="760" height="920">
          <rect x="-80" y="-80" width="760" height="920" fill={`url(#${fade})`} />
        </mask>
      </defs>

      <g mask={`url(#${mask})`}>
        {/* Red ink offset, then a white rim, then the black mass on top. */}
        <Shapes paths={SILHOUETTE} fill="#e60012" transform="translate(-28 20)" />
        <Shapes paths={SILHOUETTE} fill="#ffffff" transform="translate(9 -7)" />
        <Shapes paths={SILHOUETTE} fill="#070707" />
        <path d={COLLAR_LEFT} fill="#1f1f1f" />
        <path d={COLLAR_RIGHT} fill="#2a2a2a" />
        <path d="M322 520L350 560L342 700" fill="none" stroke="#2a2a2a" strokeWidth="6" />
      </g>

      <motion.g
        animate={{ opacity: [1, 1, 0.15, 1, 1] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] }}
      >
        <path d={toPath(EYE_RIGHT)} fill="#ffffff" />
        <path d={toPath(EYE_LEFT)} fill="#ffffff" opacity="0.85" />
      </motion.g>
      <Shapes paths={FRINGE} fill="#070707" />
    </svg>
  );
};

// Three-tone P5 treatment for a real cut-out photo (transparent PNG/WebP).
const Portrait = ({ src }: { src: string }) => {
  const uid = useId().replace(/:/g, '');
  const filter = `p5tone-${uid}`;
  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id={filter} colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0.03 0.03 0.28 0.62 0.97" />
            <feFuncG type="discrete" tableValues="0.03 0.03 0.28 0.62 0.97" />
            <feFuncB type="discrete" tableValues="0.03 0.03 0.28 0.62 0.97" />
          </feComponentTransfer>
        </filter>
      </svg>
      <img
        src={src}
        alt=""
        className="h-full w-auto object-contain drop-shadow-[-18px_14px_0_#e60012]"
        style={{ filter: `url(#${filter})` }}
      />
    </>
  );
};

const HeroFigure = ({ ready, className }: { ready: boolean; className?: string }) => (
  <motion.div
    aria-hidden="true"
    className={className}
    initial={{ x: 120, opacity: 0 }}
    animate={ready ? { x: 0, opacity: 1 } : undefined}
    transition={{ type: 'spring', stiffness: 140, damping: 20, delay: 0.12 }}
  >
    {PORTRAIT_SRC ? <Portrait src={PORTRAIT_SRC} /> : <Silhouette />}
  </motion.div>
);

export default HeroFigure;
