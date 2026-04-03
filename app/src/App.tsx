import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

// Loading Screen Component
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      onComplete();
    }, 2500);
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-10"
    >
      {/* Logo + Ring container */}
      <div className="relative w-20 h-20">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-full border-2 border-red flex items-center justify-center glow-red"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="font-heading font-bold text-2xl text-white"
          >
            D
          </motion.span>
        </motion.div>

        {/* Loading Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 w-20 h-20"
        >
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="url(#loadingGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 180"
            />
            <defs>
              <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="100%" stopColor="#ff6b9d" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-white/50 text-sm font-heading tracking-wider"
      >
        Loading...
      </motion.p>
    </motion.div>
  );
};

// Mobile Navigation
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-white block"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-0.5 bg-white block"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-white block"
        />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-lg"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="font-heading text-2xl text-white hover:text-red transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const scrollEventsRef = useRef(0);
  const rafPendingRef = useRef(false);
  const lastProgressRef = useRef(0);
  const latestScrollTopRef = useRef(0);
  const committedUpdatesRef = useRef(0);
  const skippedUpdatesRef = useRef(0);
  const resizeEventsRef = useRef(0);
  const resizeRafPendingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      latestScrollTopRef.current = scrollTop;
      scrollEventsRef.current += 1;
      if (rafPendingRef.current) {
        return;
      }

      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        rafPendingRef.current = false;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = docHeight > 0 ? (latestScrollTopRef.current / docHeight) * 100 : 0;
        const roundedProgress = Math.max(0, Math.min(100, Number(nextProgress.toFixed(2))));
        if (Math.abs(roundedProgress - lastProgressRef.current) < 0.5) {
          skippedUpdatesRef.current += 1;
        } else {
          lastProgressRef.current = roundedProgress;
          committedUpdatesRef.current += 1;
          setProgress(roundedProgress);
        }

      });
    };

    const handleResize = () => {
      resizeEventsRef.current += 1;
      if (resizeRafPendingRef.current) {
        return;
      }

      resizeRafPendingRef.current = true;
      requestAnimationFrame(() => {
        resizeRafPendingRef.current = false;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        const roundedProgress = Math.max(0, Math.min(100, Number(nextProgress.toFixed(2))));
        if (Math.abs(roundedProgress - lastProgressRef.current) >= 0.5) {
          lastProgressRef.current = roundedProgress;
          setProgress(roundedProgress);
        }
      });
    };

    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafPendingRef.current) {
        rafPendingRef.current = false;
      }
      if (resizeRafPendingRef.current) {
        resizeRafPendingRef.current = false;
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/10"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-red via-pink to-magenta"
        style={{ width: `${progress}%` }}
      />
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <ScrollProgress />
          <MobileNav />
          
          <main className="relative">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </main>
        </motion.div>
      )}
    </>
  );
}

export default App;
