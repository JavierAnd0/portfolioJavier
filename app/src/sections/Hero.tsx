import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import RansomText from '@/components/persona/RansomText';
import PauseMenu from '@/components/persona/PauseMenu';
import CalendarHud from '@/components/persona/CalendarHud';
import PhantomMask from '@/components/persona/PhantomMask';

const MARQUEE_TEXT =
  'TAKE YOUR TIME ★ JAVIER ANDRADE ★ FULL STACK DEVELOPER ★ PHANTOM THIEF OF CODE ★ ';

const Key = ({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) => (
  <kbd
    className={`inline-flex h-7 items-center justify-center bg-white font-heavy text-[0.7rem] text-black shadow-[3px_3px_0_#e60012] ${
      wide ? 'px-2' : 'w-7'
    }`}
  >
    {children}
  </kbd>
);

const ControlsHint = ({ ready }: { ready: boolean }) => (
  <motion.div
    aria-hidden="true"
    className="flex -rotate-3 items-center gap-2 font-heavy text-xs tracking-[0.12em] text-white"
    initial={{ opacity: 0, y: 20 }}
    animate={ready ? { opacity: 1, y: 0 } : undefined}
    transition={{ delay: 0.9, duration: 0.3 }}
  >
    <Key>↑</Key>
    <Key>↓</Key>
    <span className="mr-3 bg-black px-2 py-1">SELECCIONAR</span>
    <Key wide>ENTER</Key>
    <span className="bg-black px-2 py-1">CONFIRMAR</span>
  </motion.div>
);

const MarqueeBand = () => (
  <div
    aria-hidden="true"
    className="absolute -left-[5%] bottom-12 z-20 w-[110%] -rotate-2 overflow-hidden border-y-[3px] border-white bg-black py-1.5 md:bottom-14"
  >
    <div className="flex w-max animate-marquee whitespace-nowrap">
      {[0, 1].map((i) => (
        <span key={i} className="px-4 font-display text-sm tracking-[0.18em] text-white md:text-base">
          {MARQUEE_TEXT.repeat(3)
            .split('★')
            .map((chunk, j, arr) => (
              <span key={j}>
                {chunk}
                {j < arr.length - 1 && <span className="text-[#e60012]">★</span>}
              </span>
            ))}
        </span>
      ))}
    </div>
  </div>
);

const Backdrop = ({ ready }: { ready: boolean }) => (
  <div aria-hidden="true" className="absolute inset-0">
    <div className="absolute inset-0 halftone opacity-[0.14]" />
    <div className="hero-edge" />
    <div className="hero-panel">
      <div className="hero-rays" />
      <div className="hero-halftone" />
    </div>

    <div className="absolute right-[-12vw] top-[4.5%] w-[66vw] max-w-[420px] lg:left-[37%] lg:right-auto lg:top-[40%] lg:w-[min(44vw,80vh)] lg:max-w-[760px] lg:-translate-x-1/2 lg:-translate-y-1/2">
      <motion.div
        initial={{ scale: 1.5, opacity: 0, rotate: -30 }}
        animate={ready ? { scale: 1, opacity: 1, rotate: -13 } : undefined}
        transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.1 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 1.2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <PhantomMask className="h-auto w-full drop-shadow-[0_18px_0_rgba(0,0,0,0.35)]" />
        </motion.div>
      </motion.div>
    </div>
  </div>
);

interface HeroProps {
  ready: boolean;
  isOnScreen: boolean;
}

const Hero = ({ ready, isOnScreen }: HeroProps) => {
  return (
    <section
      id="home"
      aria-label="Inicio"
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
    >
      <Backdrop ready={ready} />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-32 pt-5 md:px-10 lg:block lg:p-0">
        {/* Calendar */}
        <div className="order-1 origin-top-left scale-[0.82] md:scale-100 lg:absolute lg:left-12 lg:top-9">
          <CalendarHud ready={ready} />
        </div>

        {/* Menu */}
        <div className="order-3 mt-8 flex flex-1 items-center justify-center text-[clamp(1.9rem,min(9.6vw,5.2vh),3.1rem)] lg:absolute lg:right-[5vw] lg:top-[46%] lg:mt-0 lg:block lg:-translate-y-1/2 lg:text-[clamp(2.9rem,min(4.3vw,7.4vh),4.6rem)]">
          <div className="-rotate-[9deg] pl-[1.3em]">
            <PauseMenu ready={ready} keyboardEnabled={isOnScreen} />
          </div>
        </div>

        {/* Identity */}
        <div className="order-2 mt-1 lg:absolute lg:bottom-40 lg:left-12 lg:mt-0">
          <motion.p
            className="mb-1 font-hand text-xs text-white/80 md:mb-2 md:text-base"
            initial={{ opacity: 0, x: -20 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.35 }}
          >
            a calling card from —
          </motion.p>
          <h1 className="flex -rotate-3 flex-col gap-1 text-[clamp(1.8rem,min(9vw,5vh),2.6rem)] leading-none md:text-[3.2rem] xl:text-[3.8rem]">
            <RansomText text="JAVIER" seed={85} tone="red" animateIn play={ready} delay={0.3} />
            <span className="pl-[0.8em]">
              <RansomText text="ANDRADE" seed={85} tone="red" animateIn play={ready} delay={0.5} />
            </span>
          </h1>
          <motion.div
            className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-5 md:gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.85, duration: 0.3 }}
          >
            <span className="-rotate-2 bg-white px-3 py-1 font-heavy text-xs tracking-[0.06em] sm:text-sm text-black shadow-[4px_4px_0_#e60012] md:text-base">
              FULL STACK DEVELOPER
            </span>
            <span className="rotate-1 bg-[#e60012] px-2 py-1 font-heavy text-xs tracking-[0.1em] text-white shadow-[3px_3px_0_#fff]">
              ★ COLOMBIA
            </span>
            <a
              href="https://github.com/JavierAnd0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Javier Andrade (abre en otra pestaña)"
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
