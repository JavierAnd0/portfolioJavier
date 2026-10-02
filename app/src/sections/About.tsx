import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/context';

// Slanted outline of the reply box; fixed offsets keep the slant the same at any height.
const REPLY = 'polygon(0 6px, 100% 0, calc(100% - 12px) 100%, 12px calc(100% - 6px))';

const OUTER_SHAPE =
  'M294 332L155 700L189 820L102 958L0 995L411 1059L433 1325L1325 820L1400 516L1276 28L751 111L294 1L102 185Z';
const INNER_SHAPE =
  'M371 358L250 695L280 804L204 931L116 964L473 1023V1238L1265 804L1331 526L1223 80L768 156L371 55L204 223Z';

const pop = (delay: number) => ({
  initial: { opacity: 0, scale: 0.7, x: -24, rotate: -4 },
  whileInView: { opacity: 1, scale: 1, x: 0, rotate: 0 },
  viewport: { once: true, margin: '-15% 0px' },
  transition: { type: 'spring' as const, stiffness: 420, damping: 22, delay },
});

// Javier talks in black bubbles on the left; the visitor answers in white on the right,
// the way the game sets the player's lines apart.
type Speaker = 'javier' | 'visitor';

const INK: Record<Speaker, { rim: string; fill: string; text: string }> = {
  javier: { rim: 'bg-white', fill: 'bg-black', text: 'text-white' },
  visitor: { rim: 'bg-black', fill: 'bg-white', text: 'text-black' },
};

// A tilted tile framing who is talking.
const Avatar = ({ children, tilt, from }: { children: ReactNode; tilt: number; from: Speaker }) => (
  <div
    aria-hidden="true"
    className={`relative hidden h-14 w-14 shrink-0 p-[3px] shadow-[4px_4px_0_#0a0a0a] sm:block md:h-16 md:w-16 ${INK[from].rim}`}
    style={{ rotate: `${tilt}deg`, clipPath: 'polygon(6% 0, 100% 4%, 94% 100%, 0 96%)' }}
  >
    <div
      className={`flex h-full w-full items-center justify-center overflow-hidden ${INK[from].fill}`}
      style={{ clipPath: 'polygon(6% 0, 100% 4%, 94% 100%, 0 96%)' }}
    >
      {children}
    </div>
  </div>
);

// Speech banners drawn in Figma ("Vector 2", "Vector 4" and "Group 23", next to the IM
// reference). Each one is cut in three: the tail and the paper flag keep their drawn size,
// while the body between them stretches with the text, so long messages never squash the
// tail. Coordinates below are Figma px, scaled by --banner-scale (smaller on phones).
type BannerShape = 'flag' | 'plain' | 'visitor';

const px = (figmaPx: number) => `calc(${figmaPx}px * var(--banner-scale))`;

interface Piece {
  viewBox: [number, number, number, number];
  paths: { d: string; fill: string; stroke?: string }[];
  /** Offset of the piece's top-left from the body's top-left corner, in Figma px. */
  at: [number, number];
  /** Measure `at` from the body's top-right corner instead. */
  right?: boolean;
}

const BANNERS: Record<BannerShape, { body: string; pieces: Piece[]; ink: string; text: string }> = {
  // Black strip whose far end is cut into a notch with a white paper flag.
  flag: {
    body: 'polygon(0 15px, 100% 0, 100% 100%, 0 100%)',
    ink: '#0a0a0a',
    text: 'text-white',
    pieces: [
      {
        viewBox: [0, 0, 160, 199],
        at: [-141, -41.6],
        paths: [
          {
            d: 'M69.6 12.4L3.6 79.9H15.1L25.1 72.9H64.6V103.4L92.1 116.4L120.1 130.4L141.1 143.4V197.4L160 197.2V71.7L106.1 72.9V60.9H69.6Z',
            fill: '#0a0a0a',
          },
        ],
      },
      {
        viewBox: [745, 0, 152, 199],
        at: [-7, -41.6],
        right: true,
        paths: [
          { d: 'M745 41.9L798.6 39.4L792.4 58.5L750.1 107.9L754.1 154.9L752.6 190.4H745Z', fill: '#0a0a0a' },
          {
            d: 'M792.4 58.5L840.6 2.4L894.1 72.4L754.1 154.9L750.1 107.9Z',
            fill: '#ffffff',
            stroke: '#0a0a0a',
          },
        ],
      },
    ],
  },
  // Plain black strip with a slanted far end.
  plain: {
    body: 'polygon(0 10px, 100% 0, calc(100% - 29px) 100%, 0 100%)',
    ink: '#0a0a0a',
    text: 'text-white',
    pieces: [
      {
        viewBox: [0, 0, 160, 129],
        at: [-143, -1],
        paths: [
          { d: 'M1.5 55L75 1V44.5H143V22L160 21.6V128.5H157V109L62.5 79.5V55H1.5Z', fill: '#0a0a0a' },
        ],
      },
    ],
  },
  // White strip for the visitor; mirrored so the tail points right, at the visitor.
  visitor: {
    body: 'polygon(0 0, 100% 7px, 100% 100%, 35px calc(100% - 16px), 0 calc(100% - 16px))',
    ink: '#ffffff',
    text: 'text-black',
    pieces: [
      {
        viewBox: [0, 0, 215, 133],
        at: [-138, -1.5],
        paths: [{ d: 'M0.5 68L199.5 131L208 99L215 99.9V2.1L138 1.5V52L0.5 68Z', fill: '#ffffff' }],
      },
    ],
  },
};

// A thin dark outline traced around the whole silhouette, so pieces join without seams.
const OUTLINE =
  'drop-shadow(1.5px 0 0 #0a0a0a) drop-shadow(-1.5px 0 0 #0a0a0a) drop-shadow(0 1.5px 0 #0a0a0a) drop-shadow(0 -1.5px 0 #0a0a0a)';

const Bubble = ({ children, shape }: { children: ReactNode; shape: BannerShape }) => {
  const banner = BANNERS[shape];
  return (
    <div className="relative min-w-0 flex-1 drop-shadow-[5px_5px_0_rgba(10,10,10,0.9)]">
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${shape === 'visitor' ? '-scale-x-100' : ''}`}
        style={{ filter: shape === 'visitor' ? OUTLINE : undefined }}
      >
        <div className="absolute inset-0" style={{ background: banner.ink, clipPath: banner.body }} />
        {banner.pieces.map(({ viewBox, paths, at, right }, i) => (
          <svg
            key={i}
            viewBox={viewBox.join(' ')}
            className="absolute"
            style={{
              width: px(viewBox[2]),
              height: px(viewBox[3]),
              top: px(at[1]),
              left: right ? `calc(100% + ${px(at[0])})` : px(at[0]),
            }}
          >
            {paths.map(({ d, fill, stroke }) => (
              <path key={d} d={d} fill={fill} stroke={stroke} strokeWidth={stroke ? 3 : undefined} />
            ))}
          </svg>
        ))}
      </div>
      <div className={`relative px-4 py-4 text-sm font-bold leading-relaxed sm:px-6 md:text-base ${banner.text}`}>
        {children}
      </div>
    </div>
  );
};

const Message = ({
  from,
  shape,
  avatar,
  tilt,
  delay,
  children,
}: {
  from: Speaker;
  shape: BannerShape;
  avatar: ReactNode;
  tilt: number;
  delay: number;
  children: ReactNode;
}) => {
  const visitor = from === 'visitor';
  const motionProps = pop(delay);
  return (
    <motion.li
      className={`flex items-start gap-1 ${visitor ? 'flex-row-reverse' : ''}`}
      style={{ transformOrigin: visitor ? '100% 50%' : '0% 50%' }}
      {...motionProps}
      initial={{ ...motionProps.initial, x: visitor ? 24 : -24, rotate: visitor ? 4 : -4 }}
    >
      <Avatar tilt={tilt} from={from}>
        {avatar}
      </Avatar>
      {/* Margins make room for what hangs off the banner: the tail toward the avatar and,
          on the far side, the paper flag. */}
      <div
        className="flex min-w-0 flex-1"
        style={{
          [visitor ? 'marginRight' : 'marginLeft']: px(150),
          [visitor ? 'marginLeft' : 'marginRight']: shape === 'flag' ? px(80) : 0,
        }}
      >
        <Bubble shape={shape}>{children}</Bubble>
      </div>
    </motion.li>
  );
};

const Portrait = ({ alt }: { alt: string }) => (
  <motion.div
    className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
    initial={{ opacity: 0, x: -80, rotate: -12, scale: 0.9 }}
    whileInView={{ opacity: 1, x: 0, rotate: -3, scale: 1 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ type: 'spring', stiffness: 170, damping: 18 }}
  >
    {/* Shapes and photo crop come from the "perfil/retrato" frame in Figma. */}
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 0 1401 1326"
      className="relative z-10 h-auto w-full overflow-visible drop-shadow-[10px_10px_0_#0a0a0a]"
    >
      <defs>
        <clipPath id="portrait-shape">
          <path d={INNER_SHAPE} />
        </clipPath>
        <clipPath id="portrait-crop">
          <rect x={420} y={162} width={559} height={791} />
        </clipPath>
      </defs>
      <path d={OUTER_SHAPE} fill="#e60012" stroke="#0a0a0a" strokeWidth={4} />
      <path d={INNER_SHAPE} fill="#0a0a0a" />
      <g clipPath="url(#portrait-shape)">
        <image
          href="/profile/foto.webp"
          x={314.5}
          y={138}
          width={806.8}
          height={806.8}
          clipPath="url(#portrait-crop)"
        />
      </g>
    </svg>
    <motion.div
      className="absolute bottom-[12%] right-[2%] z-20 -rotate-6 bg-white px-4 py-1.5 shadow-[5px_5px_0_#e60012]"
      initial={{ scale: 0, rotate: -30 }}
      whileInView={{ scale: 1, rotate: -6 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 500, damping: 16, delay: 0.35 }}
    >
      <span className="font-heavy text-lg tracking-[0.04em] text-black md:text-xl">JAVIER ANDRADE</span>
    </motion.div>
  </motion.div>
);

const About = () => {
  const { t } = useI18n();
  const { chat } = t.about;
  const me = <img src="/profile/avatar.webp" alt="" className="h-full w-full object-cover" />;

  return (
    <section id="about" className="relative min-h-screen w-full overflow-hidden bg-black py-24 md:py-32">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-7xl px-6 md:px-10"
      >
        <span className="mb-2 inline-block font-mono text-xs tracking-[0.3em] text-red">
          {t.about.kicker}
        </span>
        <h2 className="font-display text-5xl font-normal uppercase tracking-[0.06em] text-white/10 md:text-7xl">
          {t.about.backdrop}
        </h2>
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="-mt-8 ml-2 font-display text-3xl font-normal text-white md:-mt-12 md:text-4xl"
        >
          {t.about.title.before}
          <span className="text-red">{t.about.title.accent}</span>
          {t.about.title.after}
        </motion.h3>
      </motion.div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[5fr_6fr] lg:gap-10">
        <Portrait alt={chat.portraitAlt} />

        {/* IM screen: a red phone panel held at an angle; the margin clears the side nav. */}
        <motion.div
          className="relative lg:mr-12"
          initial={{ opacity: 0, y: 60, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 2 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ type: 'spring', stiffness: 150, damping: 18 }}
        >
          <div className="border-[6px] border-white bg-black p-2 shadow-[14px_14px_0_#e60012]">
            <div className="relative overflow-hidden bg-[#e60012] px-4 pb-6 pt-4 md:px-7">
              <div aria-hidden="true" className="hero-halftone opacity-30" />

              <div className="relative mb-6 flex items-center gap-3">
                <span className="-rotate-3 bg-black px-3 py-0.5 font-heavy text-2xl text-white shadow-[3px_3px_0_#ffffff]">
                  IM
                </span>
                <span className="font-heavy text-sm tracking-[0.12em] text-black">{chat.header}</span>
                <span className="ml-auto -rotate-2 border-2 border-black bg-white px-2 py-0.5 font-heavy text-xs text-black">
                  {chat.contact}
                </span>
              </div>

              <ul className="relative space-y-5 [--banner-scale:0.36] sm:[--banner-scale:0.5]">
                <Message
                  from="visitor"
                  shape="visitor"
                  tilt={4}
                  delay={0.2}
                  avatar={<span className="font-heavy text-2xl text-black">?</span>}
                >
                  <span className="sr-only">{chat.visitor}: </span>
                  {chat.question}
                </Message>
                <Message from="javier" shape="flag" tilt={-4} delay={0.7} avatar={me}>
                  <span className="sr-only">{chat.contact}: </span>
                  {t.about.intro.before}
                  <span className="text-[#ff4d5e]">{t.about.intro.accent}</span>
                  {t.about.intro.after}
                </Message>
                <Message from="javier" shape="plain" tilt={3} delay={1.2} avatar={me}>
                  <span className="sr-only">{chat.contact}: </span>
                  {t.about.body}
                </Message>
              </ul>

              {/* Answer choices, like picking a reply in the game. */}
              <motion.div
                className="relative ml-auto mt-7 w-[92%] drop-shadow-[6px_6px_0_rgba(10,10,10,0.9)] md:w-[80%]"
                {...pop(1.7)}
              >
                <div className="bg-black p-[3px]" style={{ clipPath: REPLY }}>
                  <div className="flex flex-col gap-1 bg-white px-4 py-3" style={{ clipPath: REPLY }}>
                    {[
                      { href: '#projects', label: chat.replies.projects },
                      { href: '#contact', label: chat.replies.contact },
                    ].map(({ href, label }) => (
                      <a
                        key={href}
                        href={href}
                        className="group relative isolate px-3 py-1.5 text-sm font-bold text-black outline-none md:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 origin-left -skew-x-12 scale-x-0 bg-[#e60012] transition-transform duration-150 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        />
                        <span className="transition-colors group-hover:text-white group-focus-visible:text-white">
                          {label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-red/5 blur-[150px]" />
    </section>
  );
};

export default About;
