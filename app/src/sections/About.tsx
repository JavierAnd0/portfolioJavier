import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Terminal, Braces } from 'lucide-react';
import gsap from 'gsap';

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
    { text: 'const developer = {', color: 'text-pink' },
    { text: '  name: "Javier Andrade",', color: 'text-white/80' },
    { text: '  role: "Full Stack Developer",', color: 'text-white/80' },
    { text: '  skills: ["React", "Next", "TypeScript", "Python", "MongoDB"],', color: 'text-red' },
    { text: '  passion: "Building apps",', color: 'text-white/80' },
    { text: '  available: true', color: 'text-green-400' },
    { text: '};', color: 'text-pink' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className="glass rounded-2xl p-6 border border-white/10">
        {/* Window Controls */}
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* Code Content */}
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

        {/* Blinking Cursor */}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-5 bg-red ml-10 mt-1"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 border border-red/30 rounded-lg -z-10" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red/10 rounded-lg -z-10" />
    </motion.div>
  );
};

const About = () => {
  const stats = [
    { value: 1, suffix: '+', label: 'Years Experience' },
    { value: 5, suffix: '+', label: 'Projects Completed' },
    { value: 100, suffix: '%', label: 'Commitment' },
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
        <h2 className="font-heading text-5xl md:text-7xl font-bold text-white/10 uppercase tracking-[0.1em]">
          About
        </h2>
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-3xl md:text-4xl font-semibold text-white -mt-8 md:-mt-12 ml-2"
        >
          About <span className="text-red">Me</span>
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
                Soy un <span className="text-red font-medium">desarrollador de software</span> apasionado por crear soluciones digitales innovadoras. Con experiencia en desarrollo full-stack, tengo experiencia en construir aplicaciones web modernas, escalables y centradas en el usuario.
              </p>
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                Un enfoque que combina código limpio, arquitectura sólida y diseño intuitivo para entregar productos que no solo funcionan perfectamente, sino que también ofrecen experiencias memorables.
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
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-xl border border-white/20 flex items-center justify-center group-hover:border-red group-hover:glow-red transition-all duration-300">
                    <Icon className="w-6 h-6 text-white/60 group-hover:text-red transition-colors" />
                  </div>
                  <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* 
              <motion.a
                href="/cv.pdf"
                download="CV_Javier_Andrade.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-red text-white font-heading font-medium rounded-full hover:bg-red hover:glow-red transition-all duration-300"
              >
                
                <Download className="w-5 h-5" />
                Download CV
              </motion.a>
              */}

            </motion.div>
          </div>

          {/* Right Column - Code Display */}
          <CodeDisplay />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-2xl border border-white/10 hover:border-red/50 hover:glow-red transition-all duration-300 w-48"
            >
              <div className="font-heading text-4xl md:text-5xl font-bold text-gradient mb-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/50 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-pink/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default About;
