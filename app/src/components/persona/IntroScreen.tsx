import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import DesignedWord from './DesignedWord';
import { useI18n } from '@/i18n/context';
import { markIntroSeen } from './config';

const HOLD_MS = 1900;
const EXIT_MS = 520;

interface IntroScreenProps {
  /** Fired as the panels start splitting, so the hero can animate in underneath. */
  onReveal: () => void;
  onDone: () => void;
}

const IntroScreen = ({ onReveal, onDone }: IntroScreenProps) => {
  const { t } = useI18n();
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);

  const leave = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    markIntroSeen();
    setLeaving(true);
    onReveal();
    window.setTimeout(onDone, EXIT_MS);
  }, [onReveal, onDone]);

  useEffect(() => {
    const { style } = document.body;
    const prevOverflow = style.overflow;
    style.overflow = 'hidden';
    const timer = window.setTimeout(leave, HOLD_MS);
    // Let the card land before a stray click can dismiss it.
    const armTimer = window.setTimeout(() => {
      window.addEventListener('keydown', leave);
      window.addEventListener('pointerdown', leave);
    }, 350);
    return () => {
      style.overflow = prevOverflow;
      window.clearTimeout(timer);
      window.clearTimeout(armTimer);
      window.removeEventListener('keydown', leave);
      window.removeEventListener('pointerdown', leave);
    };
  }, [leave]);

  useEffect(() => {
    if (leaving) document.body.style.overflow = '';
  }, [leaving]);

  // Fast-out: the screen clears quickly so the menu slam-in is visible.
  const exitEase = [0.55, 0, 0.1, 1] as const;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden ${leaving ? 'pointer-events-none' : 'cursor-pointer'}`}
    >
      {/* Upper black shard */}
      <motion.div
        className="absolute inset-0 bg-black [clip-path:polygon(0_0,100%_0,100%_38%,0_68%)]"
        animate={leaving ? { x: '-18%', y: '-75%' } : { x: 0, y: 0 }}
        transition={{ duration: EXIT_MS / 1000, ease: exitEase }}
      >
        <div className="absolute inset-0 halftone opacity-20" />
      </motion.div>

      {/* Lower red shard, with a white seam along the cut */}
      <motion.div
        className="absolute inset-0"
        animate={leaving ? { x: '18%', y: '80%' } : { x: 0, y: 0 }}
        transition={{ duration: EXIT_MS / 1000, ease: exitEase }}
      >
        <div className="absolute inset-0 bg-white [clip-path:polygon(0_67%,100%_37%,100%_100%,0_100%)]" />
        <div className="absolute inset-0 overflow-hidden bg-[#e60012] [clip-path:polygon(0_68.5%,100%_38.5%,100%_100%,0_100%)]">
          <div className="hero-rays" />
        </div>
      </motion.div>

      {/* Slash streak that cuts across before the card lands */}
      <motion.div
        className="absolute left-0 top-1/2 h-3 w-[140%] -translate-y-1/2 bg-white"
        style={{ rotate: -11, transformOrigin: '0% 50%' }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 0.45, times: [0, 0.6, 1], ease: 'easeOut' }}
      />

      {/* Calling card */}
      <div className="absolute inset-0 grid place-items-center px-5">
        <motion.div
          initial={{ scale: 0.15, rotate: -40, opacity: 0 }}
          animate={
            leaving
              ? { scale: 1.35, rotate: 6, opacity: 0 }
              : { scale: 1, rotate: -6, opacity: 1 }
          }
          transition={
            leaving
              ? { duration: 0.35, ease: 'easeIn' }
              : { type: 'spring', stiffness: 260, damping: 17, delay: 0.18 }
          }
          className="relative border-[5px] border-black bg-[#e60012] px-6 pb-6 pt-5 shadow-[12px_12px_0_#ffffff] md:px-10 md:pb-8"
        >
          <div className="pointer-events-none absolute inset-0 hero-halftone opacity-40" />
          <p className="relative mb-2 font-hand text-sm text-white md:text-lg">{t.intro.callingCard}</p>
          <div className="relative text-[2.3rem] sm:text-[3rem] md:text-[4.4rem]">
            <DesignedWord name="nombre/javier/normal" label="JAVIER" animateIn delay={0.45} />
            <span className="inline-block w-[0.3em]" />
            <DesignedWord name="nombre/andrade/normal" label="ANDRADE" animateIn delay={0.72} />
          </div>
          <div className="relative mt-4 flex items-center justify-between gap-4">
            <span className="whitespace-nowrap bg-black px-3 py-1 font-heavy text-[0.65rem] tracking-[0.12em] text-white sm:text-xs md:text-sm">
              {t.intro.role}
            </span>
            <span className="hidden whitespace-nowrap font-hand text-sm text-black sm:inline md:text-base">
              {t.intro.tagline}
            </span>
          </div>
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-10 left-0 right-0 text-center font-heavy text-[0.65rem] tracking-[0.3em] text-white md:text-xs"
        initial={{ opacity: 0 }}
        animate={leaving ? { opacity: 0 } : { opacity: [0, 1, 0.35, 1] }}
        transition={leaving ? { duration: 0.1 } : { delay: 1.1, duration: 1.2 }}
      >
        <span className="md:hidden">{t.intro.tap}</span>
        <span className="hidden md:inline">{t.intro.pressKey}</span>
      </motion.p>
    </div>
  );
};

export default IntroScreen;
