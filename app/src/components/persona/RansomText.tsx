import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const FONTS = [
  'Anton',
  '"Bowlby One SC"',
  '"Rubik Mono One"',
  '"Dela Gothic One"',
];

const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

interface LetterStyle {
  char: string;
  font: string;
  rotate: number;
  y: number;
  scale: number;
  ring: boolean;
}

const buildLetters = (text: string, seed: number, uniformFont?: string): LetterStyle[] => {
  if (uniformFont) {
    return [...text].map((char) => ({
      char,
      font: uniformFont,
      rotate: 0,
      y: 0,
      scale: 1,
      ring: false,
    }));
  }
  const rand = mulberry32(seed);
  let prevFont = -1;
  let ringUsed = false;
  return [...text].map((char, i) => {
    let fontIdx = Math.floor(rand() * FONTS.length);
    if (fontIdx === prevFont) fontIdx = (fontIdx + 1) % FONTS.length;
    prevFont = fontIdx;
    const first = i === 0;
    // One ring per word at most, never the lead letter, so the word stays readable.
    const ring = char === 'O' && !first && !ringUsed;
    ringUsed ||= ring;
    const rotate = first ? -6 + rand() * 4 : -9 + rand() * 18;
    const y = first ? 0.04 : -0.07 + rand() * 0.14;
    const jitter = first ? 0 : rand();
    return {
      char,
      font: first ? '"Dela Gothic One"' : FONTS[fontIdx],
      rotate,
      y,
      scale: first ? 1.34 : ring ? 1.02 + jitter * 0.1 : 0.86 + jitter * 0.24,
      ring,
    };
  });
};

const STAR_PATH =
  'M50 18l9.4 20.9 22.6 2.2-17 15.1 5 22.3L50 66.6 30 78.5l5-22.3-17-15.1 22.6-2.2z';

// "O" drawn as a ring with a star inside, like the B☆ND entry in the P5 menu.
const RingGlyph = () => (
  <svg viewBox="-8 -4 112 112" className="ransom-ring">
    <circle cx="42" cy="58" r="47" className="ransom-ring-extrude" />
    <circle cx="50" cy="50" r="47" className="ransom-ring-stroke" />
    <circle cx="50" cy="50" r="38" className="ransom-ring-fill" />
    <path d={STAR_PATH} className="ransom-ring-star" />
  </svg>
);

const hiddenPose = (l: LetterStyle) => ({
  opacity: 0,
  scale: 2.4,
  rotate: l.rotate - 25,
  y: `${l.y}em`,
});

export type RansomTone = 'light' | 'dark' | 'red';

// Literal class names so Tailwind keeps them when purging @layer components.
const TONE_CLASS: Record<RansomTone, string> = {
  light: '',
  dark: 'ransom--dark',
  red: 'ransom--red',
};

interface RansomTextProps {
  text: string;
  seed?: number;
  /** Render every letter in this font, straight — for HUD numerals. */
  uniformFont?: string;
  tone?: RansomTone;
  className?: string;
  /** Slap the letters on one by one. */
  animateIn?: boolean;
  /** With animateIn: hold the letters hidden until this turns true. */
  play?: boolean;
  delay?: number;
}

const RansomText = ({
  text,
  seed = 1,
  uniformFont,
  tone = 'light',
  className,
  animateIn = false,
  play = true,
  delay = 0,
}: RansomTextProps) => {
  const letters = buildLetters(text, seed, uniformFont);

  return (
    <span className={cn('ransom', TONE_CLASS[tone], className)}>
      <span className="sr-only">{text}</span>
      {letters.map((l, i) =>
        l.char === ' ' ? (
          <span key={i} aria-hidden="true" className="inline-block w-[0.28em]" />
        ) : (
          <motion.span
            key={i}
            aria-hidden="true"
            className="ransom-letter"
            style={{ fontFamily: l.font }}
            initial={animateIn ? hiddenPose(l) : false}
            animate={
              animateIn && !play
                ? hiddenPose(l)
                : { opacity: 1, scale: l.scale, rotate: l.rotate, y: `${l.y}em` }
            }
            transition={
              animateIn
                ? { duration: 0.32, delay: delay + i * 0.045, ease: [0.34, 1.56, 0.64, 1] }
                : { duration: 0 }
            }
          >
            {l.ring ? (
              <RingGlyph />
            ) : (
              <>
                <span className="ransom-extrude">{l.char}</span>
                <span className="ransom-stroke">{l.char}</span>
                <span className="ransom-fill">{l.char}</span>
              </>
            )}
          </motion.span>
        ),
      )}
    </span>
  );
};

export default RansomText;
