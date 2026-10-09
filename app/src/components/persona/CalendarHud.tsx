import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DesignedWord from './DesignedWord';
import { EM_PER_UNIT } from './config';
import { WORDS, type DesignedWordData, type WordName } from './words.generated';
import type { Language } from '@/i18n/language';
import { useI18n } from '@/i18n/context';

const TIMEZONE = 'America/Bogota';

// Weekday artwork file per language, keyed by the short English weekday Intl returns.
const WEEKDAY_FILES: Record<string, Record<Language, string>> = {
  Mon: { es: 'es-lunes', en: 'en-monday' },
  Tue: { es: 'es-martes', en: 'en-tuesday' },
  Wed: { es: 'es-miercoles', en: 'en-wednesday' },
  Thu: { es: 'es-jueves', en: 'en-thursday' },
  Fri: { es: 'es-viernes', en: 'en-friday' },
  Sat: { es: 'es-sabado', en: 'en-saturday' },
  Sun: { es: 'es-domingo', en: 'en-sunday' },
};

// Each weekday is its own chunk, so the page only downloads today's lettering.
const weekdayArt = import.meta.glob<DesignedWordData>('./days/*.json', { import: 'default' });

const useWeekdayArt = (file: string) => {
  const [art, setArt] = useState<{ file: string; data: DesignedWordData } | null>(null);
  useEffect(() => {
    let live = true;
    weekdayArt[`./days/${file}.json`]?.().then((data) => live && setArt({ file, data }));
    return () => {
      live = false;
    };
  }, [file]);
  return art?.file === file ? art.data : null;
};

type PeriodKey = 'lateNight' | 'morning' | 'afternoon' | 'evening';

const PERIODS: { from: number; key: PeriodKey }[] = [
  { from: 0, key: 'lateNight' },
  { from: 5, key: 'morning' },
  { from: 12, key: 'afternoon' },
  { from: 18, key: 'evening' },
  { from: 22, key: 'lateNight' },
];

const readClock = (locale: string, timestamp: number) => {
  const now = new Date(timestamp);
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const hour = Number(get('hour'));
  const weekday = new Intl.DateTimeFormat(locale, { timeZone: TIMEZONE, weekday: 'short' })
    .format(now)
    .replace('.', '')
    .toUpperCase();
  return {
    month: get('month'),
    day: get('day'),
    weekday,
    weekdayKey: get('weekday'),
    period: [...PERIODS].reverse().find((p) => hour >= p.from)?.key ?? 'morning',
  };
};

const digitName = (digit: string) => `cifra/${digit}` as WordName;
// The month has its own, finer style ("mes/9" in Figma); until a digit is drawn there, the
// big style stands in.
const monthDigitName = (digit: string) =>
  (`mes/${digit}` in WORDS ? `mes/${digit}` : `cifra/${digit}`) as WordName;

// Recolour only what each layer actually paints, so stroke-only lines stay unfilled.
const WHITE_INK = '[&_[fill]:not([fill=none])]:fill-white [&_[stroke]]:stroke-white';

// Thin white rim around the big day's black extrusion and the weekday, so their black parts
// don't sink into the dark hero (the Figma composition was drawn on a light canvas).
const WHITE_RIM =
  '[filter:drop-shadow(1.5px_0_0_#fff)_drop-shadow(-1.5px_0_0_#fff)_drop-shadow(0_1.5px_0_#fff)_drop-shadow(0_-1.5px_0_#fff)]';

// Layout measured from the "9/30 WEDNESDAY" composition in Figma, in Figma px. Pieces are
// placed by these numbers and scaled with --u (CSS px per Figma px), so any date reuses it.
const LAYOUT = {
  /** Big day digits: top-left of each glyph for one and two digits. */
  big: { one: [{ x: 152, y: 20 }], two: [{ x: 152, y: 62 }, { x: 310, y: 0 }] },
  /** Black copy behind the big digits, pushed right for the extruded look. */
  extrude: 24,
  /** Small month: right edge, top and glyph height of the "9". */
  small: { right: 144, top: 129, height: 211, overlap: 12 },
  /** The slash hangs off the month's right edge, between month and day. */
  slash: { dx: -144, y: 217 },
  /** Weekday: centre relative to the big digits' centre, width per letter and tilt.
      WEDNESDAY spans about 665 Figma px for its 9 letters. */
  weekday: { dx: 139, y: 321, perLetter: 74, rotate: -16 },
};

// build-words.mjs pads every viewBox by this much around the artwork.
const PAD = 6;
const u = (n: number) => `calc(var(--u) * ${n}px)`;

interface Piece {
  key: string;
  name?: WordName;
  data?: DesignedWordData;
  label: string;
  x: number;
  y: number;
  scale: number;
  rotate?: number;
  className?: string;
  animate?: boolean;
}

const contentSize = (viewBox: number[]) => [viewBox[2] - 2 * PAD, viewBox[3] - 2 * PAD];

/** Places every glyph of a date like the Figma composition: small month, slash, big day. */
const composeDate = (
  month: string,
  day: string,
  weekday: { art: DesignedWordData; letters: number; label: string } | null,
) => {
  const pieces: Piece[] = [];

  // Big day digits with their two black copies underneath (extrusion, then outline).
  const slots = day.length === 1 ? LAYOUT.big.one : LAYOUT.big.two;
  const bigBoxes = [...day].map((digit, i) => {
    const [w, h] = contentSize(WORDS[digitName(digit)].viewBox);
    return { digit, x: slots[i].x, y: slots[i].y, w, h };
  });
  const bigLeft = Math.min(...bigBoxes.map((b) => b.x));
  const bigRight = Math.max(...bigBoxes.map((b) => b.x + b.w));

  // Small month, laid right to left from its right edge so it always meets the day.
  const smallBoxes: { digit: string; x: number; y: number; scale: number; w: number }[] = [];
  let edge = LAYOUT.small.right;
  const monthDigits = [...month].reverse();
  for (const digit of monthDigits) {
    const [w, h] = contentSize(WORDS[monthDigitName(digit)].viewBox);
    const scale = LAYOUT.small.height / h;
    const x = edge - w * scale;
    smallBoxes.push({ digit, x, y: LAYOUT.small.top, scale, w: w * scale });
    edge = x + LAYOUT.small.overlap;
  }

  for (const b of bigBoxes) {
    pieces.push({ key: `x${b.x}`, name: digitName(b.digit), label: '', x: b.x + LAYOUT.extrude, y: b.y, scale: 1, className: WHITE_RIM });
  }
  for (const b of bigBoxes) {
    pieces.push({ key: `o${b.x}`, name: digitName(b.digit), label: '', x: b.x, y: b.y, scale: 1 });
  }
  for (const b of bigBoxes) {
    pieces.push({
      key: `w${b.x}`,
      name: digitName(b.digit),
      label: b.digit,
      x: b.x,
      y: b.y,
      scale: 1,
      className: WHITE_INK,
    });
  }
  for (const b of smallBoxes) {
    // White over a black copy pushed right, like the big day, so it reads on the dark hero.
    const name = monthDigitName(b.digit);
    pieces.push({ key: `mx${b.x}`, name, label: '', x: b.x + LAYOUT.extrude * b.scale, y: b.y, scale: b.scale });
    pieces.push({ key: `m${b.x}`, name, label: b.digit, x: b.x, y: b.y, scale: b.scale, className: WHITE_INK });
  }
  const slash = { x: LAYOUT.small.right + LAYOUT.slash.dx, y: LAYOUT.slash.y };
  pieces.push({ key: 'slashx', name: 'cifra/barra', label: '', x: slash.x + LAYOUT.extrude, y: slash.y, scale: 1 });
  pieces.push({ key: 'slash', name: 'cifra/barra', label: '/', ...slash, scale: 1, className: WHITE_INK });

  if (weekday) {
    // Sized by letter count: the drawings carry their own tilt, so their boxes vary too much.
    const [w, h] = contentSize(weekday.art.viewBox);
    const scale = (LAYOUT.weekday.perLetter * weekday.letters) / w;
    const cx = (bigLeft + bigRight) / 2 + LAYOUT.weekday.dx;
    pieces.push({
      key: 'weekday',
      data: weekday.art,
      label: weekday.label,
      x: cx - (w * scale) / 2,
      y: LAYOUT.weekday.y - (h * scale) / 2,
      scale,
      rotate: LAYOUT.weekday.rotate,
      className: WHITE_RIM,
      animate: true,
    });
  }

  // Shift so nothing hangs off the left edge, and size the box to the artwork.
  const minX = Math.min(...pieces.map((p) => p.x));
  for (const p of pieces) p.x -= minX;
  const sizes = pieces.map((p) => contentSize(p.data ? p.data.viewBox : WORDS[p.name!].viewBox));
  const width = Math.max(...pieces.map((p, i) => p.x + sizes[i][0] * p.scale));
  const height = Math.max(...pieces.map((p, i) => p.y + sizes[i][1] * p.scale));
  return { pieces, width, height };
};

/** P5-style calendar widget showing the date in Colombia, laid out like the Figma date. */
const CalendarHud = ({ ready }: { ready: boolean }) => {
  const { t, lang } = useI18n();
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const clock = readClock(t.locale, now);

  const [first, second] = lang === 'es' ? [clock.day, clock.month] : [clock.month, clock.day];
  const period = t.calendar.periods[clock.period];
  const dayFile = WEEKDAY_FILES[clock.weekdayKey]?.[lang] ?? '';
  const dayArt = useWeekdayArt(dayFile);
  // "en-wednesday" → 9 letters.
  const weekday = dayArt && { art: dayArt, letters: dayFile.length - 3, label: clock.weekday };
  // Same composition in both languages, as in the Figma date: small month, big day.
  const { pieces, width, height } = composeDate(clock.month, clock.day, weekday);

  return (
    <motion.div
      className="relative select-none [--u:0.3] md:[--u:0.42]"
      style={{ width: u(width), height: u(height) }}
      initial={{ x: -80, opacity: 0, rotate: -14 }}
      animate={ready ? { x: 0, opacity: 1, rotate: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 380, damping: 26, delay: 0.05 }}
      aria-label={t.calendar.today(`${clock.weekday} ${first}/${second}`, period)}
      role="img"
    >
      {pieces.map((p) => {
        const style = {
          position: 'absolute' as const,
          left: u(p.x - PAD * p.scale),
          top: u(p.y - PAD * p.scale),
          fontSize: u(p.scale / EM_PER_UNIT),
          rotate: p.rotate ? `${p.rotate}deg` : undefined,
        };
        return p.data ? (
          <DesignedWord key={p.key} data={p.data} label={p.label} className={p.className} style={style} animateIn={p.animate} delay={0.15} />
        ) : (
          <DesignedWord key={p.key} name={p.name!} label={p.label} className={p.className} style={style} />
        );
      })}
    </motion.div>
  );
};

export default CalendarHud;
