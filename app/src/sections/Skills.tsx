import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

interface SkillCategory {
  name: string;
  arcana: string;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    arcana: 'MAGICIAN',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vue.js', level: 80 },
    ],
  },
  {
    name: 'Backend',
    arcana: 'EMPEROR',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Express / FastAPI', level: 88 },
      { name: 'GraphQL', level: 75 },
    ],
  },
  {
    name: 'Database',
    arcana: 'HIEROPHANT',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 80 },
      { name: 'MySQL', level: 82 },
    ],
  },
  {
    name: 'DevOps',
    arcana: 'CHARIOT',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 78 },
      { name: 'Vercel / Netlify', level: 90 },
      { name: 'GitHub Actions', level: 82 },
    ],
  },
];

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const ProgressBar = ({ level, delay }: { level: number; delay: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView && barRef.current) {
      const mobile = isMobile();
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: mobile ? 0.7 : 1.2,
          delay: mobile ? delay * 0.4 : delay,
          ease: 'power3.out',
        }
      );
    }
  }, [isInView, level, delay]);

  return (
    <div className="h-3 bg-white/10 border border-white/10 overflow-hidden">
      <div
        ref={barRef}
        className="h-full slash-stripes"
        style={{ width: '0%' }}
      />
    </div>
  );
};

const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const mobile = isMobile();
  return (
    <motion.div
      initial={{ opacity: 0, y: mobile ? 20 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{
        duration: mobile ? 0.4 : 0.6,
        delay: mobile ? index * 0.08 : index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
    >
      <div className="p-6 md:p-8 border-2 border-white/15 hover:border-red cut-corners bg-dark-grey/60 transition-all duration-400">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red flex items-center justify-center cut-corner-tag">
              <span className="font-display text-black">{category.name[0]}</span>
            </div>
            <h4 className="font-display text-xl font-normal text-white group-hover:text-red transition-colors">
              {category.name}
            </h4>
          </div>
          <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
            Persona: {category.arcana}
          </span>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/70 font-mono">{skill.name}</span>
                <span className="text-sm text-red font-mono font-bold">LV.{Math.round(skill.level / 10)}</span>
              </div>
              <ProgressBar level={skill.level} delay={0.3 + skillIndex * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative min-h-screen w-full bg-black py-24 md:py-32 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-xs tracking-[0.3em] text-red mb-2">
            SKILL TREE — ALL-OUT ATTACK READY
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-normal text-white/10 uppercase tracking-[0.06em]">
            Abilities
          </h2>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-3xl md:text-4xl font-normal text-white -mt-8 md:-mt-12 ml-2"
          >
            Tech <span className="text-red">Arsenal</span>
          </motion.h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-white/60 text-lg max-w-2xl"
        >
          Tecnologías y herramientas que utilizo para construir aplicaciones modernas, escalables y de alto rendimiento.
        </motion.p>
      </div>

      {/* Skills Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 halftone opacity-10 -z-10" />
    </section>
  );
};

export default Skills;
