import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vue.js', level: 80 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Express / FastAPI', level: 88 },
      { name: 'GraphQL', level: 75 },
    ],
  },
  {
    name: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 80 },
      { name: 'MySQL', level: 82 },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 78 },
      { name: 'Vercel / Netlify', level: 90 },
      { name: 'GitHub Actions', level: 82 },
    ],
  },
];

const ProgressBar = ({ level, delay }: { level: number; delay: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true });

  useEffect(() => {
    if (isInView && barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        { 
          width: `${level}%`, 
          duration: 1.2, 
          delay,
          ease: 'power3.out'
        }
      );
    }
  }, [isInView, level, delay]);

  return (
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        ref={barRef}
        className="h-full rounded-full bg-gradient-to-r from-red via-pink to-magenta"
        style={{ width: '0%' }}
      />
    </div>
  );
};

const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group"
    >
      <div className="p-6 md:p-8 rounded-2xl border border-white/10 hover:border-red/50 bg-dark-grey/50 backdrop-blur-sm hover:glow-red transition-all duration-400">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-red/20 flex items-center justify-center">
            <span className="font-heading font-bold text-red">{category.name[0]}</span>
          </div>
          <h4 className="font-heading text-xl font-semibold text-white group-hover:text-red transition-colors">
            {category.name}
          </h4>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/70">{skill.name}</span>
                <span className="text-sm text-white/40 font-mono">{skill.level}%</span>
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
    <section id="skills" className="relative min-h-screen w-full bg-black py-24 md:py-32">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-white/10 uppercase tracking-[0.1em]">
            Skills
          </h2>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-3xl md:text-4xl font-semibold text-white -mt-8 md:-mt-12 ml-2"
          >
            Tech <span className="text-red">Stack</span>
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
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-magenta/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-red/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default Skills;
