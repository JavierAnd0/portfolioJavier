import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

// Rotating red emblem — stands in for the Phantom Thieves insignia
const Emblem = () => {
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 26,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <svg
      ref={ringRef}
      viewBox="0 0 400 400"
      className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px]"
      style={{ transformOrigin: 'center' }}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer diamond ring */}
      <polygon
        points="200,20 380,200 200,380 20,200"
        fill="none"
        stroke="#ff0022"
        strokeWidth="4"
        filter="url(#glow)"
      />
      {/* Inner diamond */}
      <polygon
        points="200,80 320,200 200,320 80,200"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.7"
      />
      {/* Corner ticks */}
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="200"
          y1="4"
          x2="200"
          y2="34"
          stroke="#ff0022"
          strokeWidth="4"
          transform={`rotate(${deg} 200 200)`}
        />
      ))}
    </svg>
  );
};

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'PROFILE', id: 'about' },
    { label: 'TARGETS', id: 'projects' },
    { label: 'ABILITIES', id: 'skills' },
    { label: 'COOPERATION', id: 'contact' },
  ];

  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-20 flex justify-between items-center p-6 pr-20 md:pr-10 md:p-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 md:w-14 md:h-14 bg-red border-2 border-white cut-corner-tag flex items-center justify-center">
            <span className="font-display text-lg md:text-2xl text-black">JA</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-right"
        >
          <h2 className="font-display text-lg md:text-2xl tracking-[0.08em] text-white">
            Javier Andrade
          </h2>
          <p className="font-mono text-[10px] md:text-xs text-red tracking-[0.2em]">
            RANK: FULL STACK
          </p>
        </motion.div>
      </motion.header>

      {/* Navigation - Vertical Right */}
      <motion.nav
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-8"
      >
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            onClick={() => scrollToSection(item.id)}
            className="group relative font-display text-xs tracking-[0.2em] text-white/70 hover:text-red transition-all duration-300"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span className="group-hover:tracking-[0.35em] transition-all duration-300">
              {item.label}
            </span>
            <span className="absolute -right-3 top-0 w-[3px] h-0 bg-red group-hover:h-full transition-all duration-300" />
          </motion.button>
        ))}
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="relative mb-4"
        >
          <Emblem />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <code className="font-mono text-xs md:text-sm text-white/60">
              &lt;/&gt;
            </code>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center -mt-6"
        >
          <p className="font-hand text-red text-base md:text-lg mb-2 tracking-wide">
            a calling card from the
          </p>
          <h1 className="font-display font-normal text-4xl md:text-6xl lg:text-8xl text-white tracking-[0.02em] leading-[0.95] mb-4">
            PHANTOM THIEF
            <br />
            <span className="text-outline">OF CODE</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="font-mono text-base md:text-lg text-white/60 tracking-wide"
          >
            Full Stack Developer — building digital experiences worth stealing.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="relative z-20 flex justify-between items-end p-6 md:p-10"
      >
        <div className="text-left">
          <p className="font-display text-sm md:text-base text-white/90 mb-1 tracking-wide">
            Software Engineer
          </p>
          <p className="font-mono text-xs md:text-sm text-white/50">
            Operating from <span className="text-red font-medium">COLOMBIA</span>
          </p>
        </div>

        <div className="flex gap-4">
          {[
            { Icon: Github, href: 'https://github.com/JavierAnd0' },
            { Icon: Linkedin, href: '#' }
          ].map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: -4 }}
              className="w-11 h-11 border-2 border-white/30 cut-corners flex items-center justify-center text-white/70 hover:text-black hover:bg-red hover:border-red transition-all duration-300"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/40 hover:text-red transition-colors duration-300"
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.div>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 halftone opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red/5 rounded-full blur-[150px]" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 slash-stripes opacity-[0.08] rotate-12" />
      </div>
    </section>
  );
};

export default Hero;
