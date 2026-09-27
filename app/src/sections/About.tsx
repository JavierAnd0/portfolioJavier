import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Terminal, Braces } from 'lucide-react';
import gsap from 'gsap';
import { useI18n } from '@/i18n/context';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = '', duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      gsap.to({ value: 0 }, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: function () {
          setCount(Math.floor(this.targets()[0].value));
        },
      });
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const CodeDisplay = () => {
  const codeLines = [
    { text: 'const phantomThief = {', color: 'text-white' },
    { text: '  codename: "Javier Andrade",', color: 'text-white/80' },
    { text: '  role: "Full Stack Developer",', color: 'text-white/80' },
    { text: '  arsenal: ["React", "Next", "TypeScript", "Python", "MongoDB"],', color: 'text-red' },
    { text: '  motto: "Take your (digital) heart",', color: 'text-white/80' },
    { text: '  available: true', color: 'text-green-400' },
    { text: '};', color: 'text-white' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className="bg-ink border-2 border-red cut-corners p-6">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red" />
          <div className="w-3 h-3 rounded-full bg-white/40" />
          <div className="w-3 h-3 rounded-full bg-white/40" />
        </div>

        <div className="font-mono text-sm md:text-base">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex"
            >
              <span className="text-white/30 w-6 text-right mr-4 select-none">
                {index + 1}
              </span>
              <span className={line.color}>{line.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-5 bg-red ml-10 mt-1"
        />
      </div>

      <div className="absolute -top-4 -right-4 w-16 h-16 slash-stripes opacity-20 -z-10" />
      <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-red/10 -z-10" />
    </motion.div>
  );
};

const About = () => {
  const { t } = useI18n();
  const stats = [
    { value: 1, suffix: '+', label: t.about.stats.years },
    { value: 5, suffix: '+', label: t.about.stats.heists },
    { value: 100, suffix: '%', label: t.about.stats.commitment },
  ];

  const techIcons = [
    { Icon: Code2, label: 'Frontend' },
    { Icon: Terminal, label: 'Backend' },
    { Icon: Braces, label: 'APIs' },
  ];

  return (
    <section id="about" className="relative min-h-screen w-full bg-black py-24 md:py-32 overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 md:px-10 mb-16"
      >
        <span className="inline-block font-mono text-xs tracking-[0.3em] text-red mb-2">
          {t.about.kicker}
        </span>
        <h2 className="font-display text-5xl md:text-7xl font-normal text-white/10 uppercase tracking-[0.06em]">
          {t.about.backdrop}
        </h2>
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-3xl md:text-4xl font-normal text-white -mt-8 md:-mt-12 ml-2"
        >
          {t.about.title.before}
          <span className="text-red">{t.about.title.accent}</span>
          {t.about.title.after}
        </motion.h3>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                {t.about.intro.before}
                <span className="text-red font-medium">{t.about.intro.accent}</span>
                {t.about.intro.after}
              </p>
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                {t.about.body}
              </p>
            </motion.div>

            {/* Tech Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-6"
            >
              {techIcons.map(({ Icon, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5, rotate: -3 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 border-2 border-white/20 cut-corners flex items-center justify-center group-hover:border-red group-hover:bg-red/10 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white/60 group-hover:text-red transition-colors" />
                  </div>
                  <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors font-mono tracking-wide">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Code Display */}
          <CodeDisplay />
        </div>

        {/* Stats Section — status bars like a character sheet */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={`${stat.value}${stat.suffix}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 border-2 border-white/15 hover:border-red cut-corners bg-dark-grey/50 transition-all duration-300 w-52"
            >
              <div className="font-display text-4xl md:text-5xl font-normal text-red mb-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-white/50 uppercase tracking-[0.15em] font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 halftone opacity-10 -z-10" />
    </section>
  );
};

export default About;
