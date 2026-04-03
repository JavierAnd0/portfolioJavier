import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const NeonRing = () => {
  const ringRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (ringRef.current && glowRef.current) {
      // Rotación continua del anillo
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      // Efecto de pulso en el brillo
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, []);

  return (
    <svg
      ref={ringRef}
      viewBox="0 0 400 400"
      className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
      style={{ transformOrigin: 'center' }}
    >
      <defs>
        {/* Gradiente para el anillo */}
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="50%" stopColor="#ff6b9d" />
          <stop offset="100%" stopColor="#ff0066" />
        </linearGradient>

        {/* Filtro de brillo */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Filtro de brillo intenso */}
        <filter id="glow-intense" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="15" result="coloredBlur" />
          <feGaussianBlur stdDeviation="25" result="coloredBlur2" />
          <feMerge>
            <feMergeNode in="coloredBlur2" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Círculo de brillo exterior */}
      <circle
        ref={glowRef}
        cx="200"
        cy="200"
        r="160"
        fill="none"
        stroke="url(#ringGradient)"
        strokeWidth="2"
        opacity="0.8"
        filter="url(#glow-intense)"
      />

      {/* Anillo principal */}
      <circle
        cx="200"
        cy="200"
        r="150"
        fill="none"
        stroke="url(#ringGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        filter="url(#glow)"
      />
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
    { label: 'ABOUT', id: 'about' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'SKILLS', id: 'skills' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6 pr-20 md:pr-10 md:p-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-red flex items-center justify-center glow-red">
            <span className="font-heading font-bold text-lg md:text-xl text-white">D</span>
          </div>
          <span className="font-heading font-semibold text-sm md:text-base tracking-[0.2em] text-white hidden sm:block">
            DEV
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-right"
        >
          <h2 className="font-heading font-bold text-lg md:text-2xl tracking-[0.1em] text-pink text-glow-pink">
            Javier Andrade
          </h2>
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
            className="group relative font-heading text-xs tracking-[0.2em] text-white/70 hover:text-red transition-all duration-300"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            <span className="group-hover:tracking-[0.3em] transition-all duration-300">
              {item.label}
            </span>
            <span className="absolute -right-3 top-0 w-[2px] h-0 bg-red group-hover:h-full transition-all duration-300" />
          </motion.button>
        ))}
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        {/* Neon Ring Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="relative mb-8"
        >
          <NeonRing />

          {/* Silueta central (opcional - código representado) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <code className="font-mono text-xs md:text-sm text-white/50">
                &lt;/&gt;
              </code>
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white tracking-[0.05em] mb-4">
            Full Stack
            <span className="text-gradient"> Developer</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="font-light text-lg md:text-xl text-white/60"
          >
            Building digital experiences with code
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-end p-6 md:p-10"
      >
        {/* Role & Location */}
        <div className="text-left">
          <p className="font-heading text-sm md:text-base text-white/80 mb-1">
            Software Engineer
          </p>
          <p className="font-light text-xs md:text-sm text-white/50">
            From <span className="text-red font-medium">CO</span>
          </p>
        </div>

        {/* Social Icons */}
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
              whileHover={{ scale: 1.2 }}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-red hover:border-red hover:glow-red transition-all duration-300"
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
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
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

      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red/5 rounded-full blur-[150px]" />
      </div>
    </section>
  );
};

export default Hero;
