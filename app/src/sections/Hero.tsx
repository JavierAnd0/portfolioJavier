import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import DesignedWord from '@/components/persona/DesignedWord';
import PauseMenu from '@/components/persona/PauseMenu';
import CalendarHud from '@/components/persona/CalendarHud';
import LanguageSwitch from '@/components/persona/LanguageSwitch';
import { useI18n } from '@/i18n/context';

const Key = ({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) => (
  <kbd
    className={`inline-flex h-7 items-center justify-center bg-white font-heavy text-[0.7rem] text-black shadow-[3px_3px_0_#e60012] ${
      wide ? 'px-2' : 'w-7'
    }`}
  >
    {children}
  </kbd>
);

const ControlsHint = ({ ready }: { ready: boolean }) => {
  const { t } = useI18n();
  return (
    <motion.div
      aria-hidden="true"
      className="flex -rotate-3 items-center gap-2 font-heavy text-xs tracking-[0.12em] text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: 0.9, duration: 0.3 }}
    >
      <Key>↑</Key>
      <Key>↓</Key>
      <span className="mr-3 bg-black px-2 py-1">{t.hero.select}</span>
      <Key wide>ENTER</Key>
      <span className="bg-black px-2 py-1">{t.hero.confirm}</span>
    </motion.div>
  );
};

const MarqueeBand = () => {
  const { t } = useI18n();
  const phrases = [...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee];
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[5%] bottom-12 z-20 w-[110%] -rotate-2 overflow-hidden border-y-[3px] border-white bg-black py-1.5 md:bottom-14"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((i) => (
          <span key={i} className="font-display text-sm tracking-[0.18em] text-white md:text-base">
            {phrases.map((phrase, j) => (
              <span key={j} className="px-3">
                {phrase}
                <span className="pl-6 text-[#e60012]">★</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

const CITY_SRC = `${import.meta.env.BASE_URL}bg/city-night.webp`;

// Both copies share the same box so the skyline lines up across the diagonal.
const CityImage = ({ ready, className }: { ready: boolean; className: string }) => (
  <motion.img
    src={CITY_SRC}
    alt=""
    draggable={false}
    className={`absolute inset-0 h-full w-full select-none object-cover object-[50%_80%] ${className}`}
    initial={{ scale: 1.12 }}
    animate={ready ? { scale: 1 } : undefined}
    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
  />
);

const Backdrop = ({ ready }: { ready: boolean }) => (
  <div aria-hidden="true" className="absolute inset-0">
    {/* Black side: the city sunk into the dark. */}
    <CityImage ready={ready} className="grayscale brightness-[0.55] contrast-[1.15]" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60" />
    <div className="absolute inset-0 halftone opacity-[0.14]" />

    <div className="hero-edge" />
    {/* Red side: same city multiplied into the red, like the P5 menus. */}
    <div className="hero-panel">
      <CityImage ready={ready} className="grayscale contrast-[1.25] brightness-[1.15] mix-blend-multiply" />
      <div className="hero-rays opacity-60" />
      <div className="hero-halftone" />
    </div>
  </div>
);

interface HeroProps {
  ready: boolean;
  isOnScreen: boolean;
}

const Hero = ({ ready, isOnScreen }: HeroProps) => {
  const { t } = useI18n();
  return (
    <section
      id="home"
      aria-label={t.a11y.home}
      className="relative min-h-[100svh] w-full overflow-clip bg-black"
    >
      <Backdrop ready={ready} />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-32 pt-5 md:px-10 lg:block lg:p-0">
        {/* Calendar */}
        <div className="order-1 origin-top-left scale-[0.82] md:scale-100 lg:absolute lg:left-12 lg:top-9">
          <CalendarHud ready={ready} />
        </div>

        {/* Language */}
        <motion.div
          className="absolute right-5 top-6 md:right-10 lg:right-12 lg:top-10"
          initial={{ opacity: 0, y: -16 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <LanguageSwitch />
        </motion.div>

        {/* Menu */}
        <div className="order-3 mt-4 flex flex-1 items-center justify-end text-[clamp(1.7rem,min(8.4vw,4.6vh),2.8rem)] lg:absolute lg:right-[2vw] lg:top-[47%] lg:mt-0 lg:block lg:-translate-y-1/2 lg:text-[clamp(2.6rem,min(4vw,6.6vh),4.4rem)]">
          <PauseMenu ready={ready} keyboardEnabled={isOnScreen} />
        </div>

        {/* Identity */}
        <div className="order-2 mt-1 lg:absolute lg:bottom-40 lg:left-12 lg:mt-0">
          <h1 className="flex -rotate-3 flex-col gap-1 text-[clamp(1.8rem,min(9vw,5vh),2.6rem)] leading-none md:text-[3.2rem] xl:text-[3.8rem]">
            <DesignedWord name="nombre/javier/normal" label="JAVIER" animateIn play={ready} delay={0.3} />
            <span className="pl-[0.8em]">
              <DesignedWord name="nombre/andrade/normal" label="ANDRADE" animateIn play={ready} delay={0.5} />
            </span>
          </h1>
          <motion.div
            className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-5 md:gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.85, duration: 0.3 }}
          >
            <span className="-rotate-2 bg-white px-3 py-1 font-heavy text-xs tracking-[0.06em] sm:text-sm text-black shadow-[4px_4px_0_#e60012] md:text-base">
              {t.hero.role}
            </span>
            <a
              href="https://github.com/JavierAnd0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.hero.github} ${t.a11y.opensNewTab}`}
              className="hidden h-9 w-9 rotate-3 place-items-center border-2 border-white bg-black text-white transition-transform sm:grid hover:-rotate-6 hover:scale-110 hover:bg-[#e60012]"
            >
              <Github size={17} />
            </a>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="hidden lg:absolute lg:bottom-40 lg:right-12 lg:block">
          <ControlsHint ready={ready} />
        </div>
      </div>

      <MarqueeBand />
    </section>
  );
};

export default Hero;
