import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { StatusBar } from './components/StatusBar';
import IntroScreen from './components/persona/IntroScreen';
import { shouldPlayIntro } from './components/persona/config';
import PauseMenu from './components/persona/PauseMenu';
import SideNav from './components/persona/SideNav';
import LanguageSwitch from './components/persona/LanguageSwitch';
import { useI18n } from './i18n/context';
import type { Dictionary } from './i18n/en';
import './App.css';

// Swap the tab title while the visitor is on another tab.
const useAwayTitle = ({ title, awayTitle }: Dictionary['meta']) => {
  useEffect(() => {
    const onChange = () => {
      document.title = document.hidden ? awayTitle : title;
    };
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, [title, awayTitle]);
};

const useHeroOnScreen = () => {
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 1] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return onScreen;
};

// On small screens the hamburger opens the same pause menu over a red backdrop.
const MobileNav = ({ visible }: { visible: boolean }) => {
  const { t, lang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  return (
    <>
      <AnimatePresence>
        {(visible || isOpen) && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: isOpen ? 0 : -6 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            className="fixed right-5 top-5 z-[60] flex h-12 w-12 flex-col items-center justify-center gap-1.5 border-[3px] border-black bg-white shadow-[4px_4px_0_#e60012] lg:hidden"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="block h-[3px] w-6 bg-black"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[3px] w-5 bg-black"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="block h-[3px] w-6 bg-black"
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.a11y.menu}
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#e60012] lg:hidden"
          >
            <div aria-hidden="true" className="hero-rays" />
            <LanguageSwitch className="absolute left-5 top-6" />
            <div aria-hidden="true" className="hero-halftone" />
            <div
              className="relative text-[clamp(1.8rem,8.4vw,2.8rem)]"
              style={{ fontSize: lang === 'es' ? 'clamp(1.5rem,6.8vw,2.3rem)' : undefined }}
            >
              <PauseMenu ready keyboardEnabled onNavigate={close} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-white/10">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-[#e60012]" />
    </div>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
  const [ready, setReady] = useState(!showIntro);
  const heroOnScreen = useHeroOnScreen();
  const { t } = useI18n();
  useAwayTitle(t.meta);

  const reveal = useCallback(() => setReady(true), []);
  const finishIntro = useCallback(() => setShowIntro(false), []);

  return (
    <>
      {showIntro && <IntroScreen onReveal={reveal} onDone={finishIntro} />}

      <ScrollProgress />
      <SideNav visible={!heroOnScreen} />
      <MobileNav visible={!heroOnScreen} />

      <main className="relative pb-8">
        <Hero ready={ready} isOnScreen={heroOnScreen && !showIntro} />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
      <StatusBar />
    </>
  );
}

export default App;
