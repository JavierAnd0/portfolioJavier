import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import RansomText from '@/components/persona/RansomText';
import PauseMenu from '@/components/persona/PauseMenu';
import CalendarHud from '@/components/persona/CalendarHud';
import CitySkyline from '@/components/persona/CitySkyline';
import InkBackdrop from '@/components/persona/InkBackdrop';
import HeroFigure from '@/components/persona/HeroFigure';
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
      className="flex -rotate-2 items-center gap-2 font-heavy text-xs tracking-[0.12em] text-white"
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

// Name tag in the spot the game uses for the money counter.
const IdentityHud = ({ ready }: { ready: boolean }) => {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-end text-right">
      <motion.p
        className="mb-1 font-hand text-xs text-white/85 md:text-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={ready ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 0.5 }}
      >
        {t.hero.callingCard}
      </motion.p>
      <h1 className="-rotate-3 text-[clamp(1.7rem,min(7.5vw,5vh),3.4rem)] leading-none">
        <RansomText text="JAVIER" seed={85} tone="red" animateIn play={ready} delay={0.45} />
        <span className="inline-block w-[0.3em]" />
        <RansomText text="ANDRADE" seed={85} tone="red" animateIn play={ready} delay={0.65} />
      </h1>
      <motion.div
        className="mt-3 flex flex-wrap items-center justify-end gap-2.5"
        initial={{ opacity: 0, y: 14 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.95, duration: 0.3 }}
      >
        <span className="-rotate-2 bg-white px-3 py-1 font-heavy text-xs tracking-[0.06em] text-black shadow-[4px_4px_0_#e60012] sm:text-sm">
          {t.hero.role}
        </span>
        <span className="rotate-1 bg-[#e60012] px-2 py-1 font-heavy text-xs tracking-[0.1em] text-white shadow-[3px_3px_0_#fff]">
          ★ {t.hero.country}
        </span>
        <a
          href="https://github.com/JavierAnd0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.hero.github} ${t.a11y.opensNewTab}`}
          className="hidden h-9 w-9 rotate-3 place-items-center border-2 border-white bg-black text-white transition-transform hover:-rotate-6 hover:scale-110 hover:bg-[#e60012] sm:grid"
        >
          <Github size={17} />
        </a>
      </motion.div>
    </div>
  );
};

interface HeroProps {
  ready: boolean;
  isOnScreen: boolean;
}

const Hero = ({ ready, isOnScreen }: HeroProps) => {
  const { t, lang } = useI18n();
  return (
    <section
      id="home"
      aria-label={t.a11y.home}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#161616]"
    >
      <InkBackdrop ready={ready} />

      {/* City far behind the figure, fading in from the right edge. */}
      <CitySkyline
        ready={ready}
        className="absolute bottom-0 right-0 h-[70%] w-full [mask-image:linear-gradient(to_right,transparent_38%,#000_58%)] lg:h-[86%]"
      />

      <HeroFigure
        ready={ready}
        className="absolute right-[-20vw] top-[7%] h-[50%] sm:right-[-6vw] sm:top-auto sm:bottom-0 sm:h-[74%] lg:right-[2vw] lg:h-[96%]"
      />

      {/* Calendar */}
      <div className="absolute left-5 top-5 origin-top-left scale-[0.8] md:left-10 md:top-8 md:scale-100 lg:left-12">
        <CalendarHud ready={ready} />
      </div>

      {/* Language */}
      <motion.div
        className="absolute right-5 top-6 z-20 md:right-10 lg:right-12 lg:top-10"
        initial={{ opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <LanguageSwitch />
      </motion.div>

      {/* Menu */}
      <div className="absolute left-[4vw] top-[57%] z-10 -translate-y-1/2 text-[clamp(2rem,min(10vw,5.6vh),3.4rem)] sm:top-[54%] md:left-[6vw] lg:top-[51%] lg:text-[clamp(3rem,min(5.4vw,8.2vh),5.4rem)]">
        {/* Spanish labels run longer; a slightly smaller size keeps the same footprint. */}
        <div className="-rotate-[5deg] pl-[1.3em]" style={{ fontSize: lang === 'es' ? '0.8em' : undefined }}>
          <PauseMenu ready={ready} keyboardEnabled={isOnScreen} />
        </div>
      </div>

      {/* Identity */}
      <div className="absolute bottom-12 right-5 z-10 md:right-10 lg:bottom-16 lg:right-12">
        <IdentityHud ready={ready} />
      </div>

      {/* Controls */}
      <div className="absolute bottom-16 left-12 z-10 hidden lg:block">
        <ControlsHint ready={ready} />
      </div>
    </section>
  );
};

export default Hero;
