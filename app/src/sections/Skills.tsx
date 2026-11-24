import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '@/components/persona/SectionHeading';
import { useI18n } from '@/i18n/context';
import type { Dictionary } from '@/i18n/en';

interface SkillItem {
  name: string;
  tag: string;
  description: {
    en: string;
    es: string;
  };
}

interface SkillCategory {
  name: keyof Dictionary['skills']['categories'];
  arcanaNum: string;
  tilt: number;
  role: {
    en: string;
    es: string;
  };
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'frontend',
    arcanaNum: 'I',
    tilt: -1.5,
    role: {
      en: 'Client Architecture & Interfaces',
      es: 'Arquitectura cliente e interfaces',
    },
    skills: [
      {
        name: 'React / Next.js',
        tag: 'Framework',
        description: {
          en: 'SSR, Server Components, and high-velocity responsive UI architecture.',
          es: 'SSR, Server Components y arquitectura de interfaces reactivas.',
        },
      },
      {
        name: 'TypeScript',
        tag: 'Static Types',
        description: {
          en: 'Strict type safety, generics, schema validation, and solid API contracts.',
          es: 'Tipado estricto, genéricos, validación de esquemas y contratos sólidos.',
        },
      },
      {
        name: 'Tailwind CSS',
        tag: 'Styling',
        description: {
          en: 'Custom design systems, responsive layouts, and tailored motion.',
          es: 'Sistemas de diseño a medida, maquetación fluida y microinteracciones.',
        },
      },
      {
        name: 'Vue.js',
        tag: 'Reactive UI',
        description: {
          en: 'Composition API, modular state management, and reusable components.',
          es: 'Composition API, estado modular y componentes reactivos reutilizables.',
        },
      },
    ],
  },
  {
    name: 'backend',
    arcanaNum: 'IV',
    tilt: 1.2,
    role: {
      en: 'Server Runtimes & APIs',
      es: 'Servidores y APIs distribuidas',
    },
    skills: [
      {
        name: 'Node.js',
        tag: 'Runtime',
        description: {
          en: 'Asynchronous event loops, streams, and high-throughput server backends.',
          es: 'Bucle de eventos asíncrono, streams y servidores de alto rendimiento.',
        },
      },
      {
        name: 'Python',
        tag: 'Logic & Scripts',
        description: {
          en: 'Data pipelines, automation scripts, and maintainable web services.',
          es: 'Pipelines de datos, automatizaciones y servicios web mantenibles.',
        },
      },
      {
        name: 'Express / FastAPI',
        tag: 'REST API',
        description: {
          en: 'Secure routing, middleware chains, OpenAPI specs, and rate limiting.',
          es: 'Enrutamiento seguro, middlewares, documentación OpenAPI y rate limiting.',
        },
      },
      {
        name: 'GraphQL',
        tag: 'Query Graph',
        description: {
          en: 'Flexible schemas, typed resolvers, and lean data fetching.',
          es: 'Esquemas flexibles, resolvers tipados y consultas sin sobrecarga.',
        },
      },
    ],
  },
  {
    name: 'database',
    arcanaNum: 'V',
    tilt: -1.1,
    role: {
      en: 'Data Persistence & Caching',
      es: 'Persistencia de datos y caché',
    },
    skills: [
      {
        name: 'PostgreSQL',
        tag: 'ACID SQL',
        description: {
          en: 'Relational modeling, composite indexes, transactions, and query tuning.',
          es: 'Modelado relacional, índices compuestos, transacciones y optimización.',
        },
      },
      {
        name: 'MongoDB',
        tag: 'NoSQL',
        description: {
          en: 'Document modeling, aggregation pipelines, and flexible schemas.',
          es: 'Modelado documental, pipelines de agregación y esquemas flexibles.',
        },
      },
      {
        name: 'Redis',
        tag: 'In-Memory Cache',
        description: {
          en: 'Sub-millisecond caching, session stores, and Pub/Sub messaging.',
          es: 'Caché ultrarrápida, gestión de sesiones y mensajería Pub/Sub.',
        },
      },
      {
        name: 'MySQL',
        tag: 'RDBMS',
        description: {
          en: 'Schema normalization, triggers, query optimization, and migrations.',
          es: 'Normalización de datos, triggers, optimización y migraciones.',
        },
      },
    ],
  },
  {
    name: 'devops',
    arcanaNum: 'VII',
    tilt: 1.4,
    role: {
      en: 'Deployment & Cloud Pipeline',
      es: 'Despliegue y pipelines cloud',
    },
    skills: [
      {
        name: 'Docker',
        tag: 'Containers',
        description: {
          en: 'Multi-stage builds, reproducible environments, and local orchestration.',
          es: 'Builds multicapa, entornos reproducibles y orquestación local.',
        },
      },
      {
        name: 'AWS',
        tag: 'Cloud',
        description: {
          en: 'EC2, S3, serverless Lambda functions, IAM roles, and VPC networking.',
          es: 'Instancias EC2, buckets S3, funciones Lambda, roles IAM y redes VPC.',
        },
      },
      {
        name: 'Vercel / Netlify',
        tag: 'Edge Deploy',
        description: {
          en: 'Global edge networks, instant branch previews, and serverless functions.',
          es: 'Red global edge, vistas previas por rama y funciones serverless.',
        },
      },
      {
        name: 'GitHub Actions',
        tag: 'CI / CD',
        description: {
          en: 'Automated test runners, linting pipelines, and continuous releases.',
          es: 'Pipelines automatizados de pruebas, linting y despliegue continuo.',
        },
      },
    ],
  },
];

// Jagged cutout clips echoing the hand-cut Persona 5 menus in Hero and About.
const TAB_CLIP = 'polygon(0 5px, 100% 0, calc(100% - 14px) 100%, 4px calc(100% - 4px))';
const SKILL_STRIP_CLIP = 'polygon(0 0, 100% 2px, calc(100% - 16px) 100%, 0 calc(100% - 2px))';
const CALLOUT_CLIP = 'polygon(10px 0, 100% 4px, calc(100% - 8px) 100%, 0 calc(100% - 6px))';

// Same animated Persona 5 selection plate as PauseMenu: red block kicked up-right,
// black extrusion down-left, white face boiling in counter-phase.
const ActiveTabPlate = () => (
  <motion.span
    aria-hidden="true"
    className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 -z-10"
    initial={{ scaleX: 0, skewX: -20, opacity: 0 }}
    animate={{ scaleX: [0, 1.06, 1], skewX: [-20, 3, 0], opacity: 1 }}
    transition={{ duration: 0.26, times: [0, 0.65, 1], ease: 'easeOut' }}
    style={{ transformOrigin: '0% 50%' }}
  >
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <g className="plate-boil">
        <polygon points="10,-3 104,-5 101,28 8,30" fill="#e60012" />
      </g>
      <polygon points="-3,7 97,4 94,43 -5,44" fill="#0a0a0a" />
      <polygon points="1,1 100,0 97,38 -1,40" fill="#0a0a0a" />
      <g className="plate-boil plate-boil--alt">
        <polygon points="3,3.5 97.5,2 94.5,36 1,37.5" fill="#ffffff" />
      </g>
    </svg>
  </motion.span>
);

const Skills = () => {
  const { t, lang } = useI18n();
  const locale = (lang === 'en' ? 'en' : 'es') as 'en' | 'es';
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);

  const activeCategory = skillCategories[activeCatIndex];
  const activeSkill = activeCategory.skills[activeSkillIndex] ?? activeCategory.skills[0];

  const selectCategory = (idx: number) => {
    setActiveCatIndex(idx);
    setActiveSkillIndex(0);
  };

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Subtle diagonal red graphic slash in the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-[#e60012]/[0.07] lg:block"
        style={{ clipPath: 'polygon(24% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 halftone opacity-[0.07]"
      />

      {/* Section Header */}
      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-6 md:mb-16 md:px-10">
        <SectionHeading section="skills" intro={t.skills.intro} />
      </div>

      {/* Asymmetric Persona Loadout */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 px-6 md:px-10 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-12">
        {/* Left: Discipline Selector (all 16 skills scannable at a glance) */}
        <div
          role="tablist"
          aria-label={t.skills.backdrop}
          className="flex flex-col gap-4"
        >
          {skillCategories.map((category, idx) => {
            const isSelected = idx === activeCatIndex;
            const categoryLabel = t.skills.categories[category.name];
            return (
              <motion.button
                key={category.name}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`skills-panel-${category.name}`}
                id={`skills-tab-${category.name}`}
                onClick={() => selectCategory(idx)}
                onMouseEnter={() => selectCategory(idx)}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative text-left outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                style={{
                  transform: `rotate(${isSelected ? category.tilt * 1.15 : category.tilt * 0.5}deg)`,
                }}
              >
                {/* Animated Persona selection plate on active tab (same boil as PauseMenu) */}
                {isSelected && <ActiveTabPlate key={`plate-${category.name}`} />}

                {/* Inactive dark slanted border + face, or transparent over the active plate */}
                <div
                  className={`relative transition-colors duration-150 ${
                    isSelected
                      ? 'px-5 py-4 text-black'
                      : 'bg-white/25 p-[2px] group-hover:bg-white'
                  }`}
                  style={isSelected ? undefined : { clipPath: TAB_CLIP }}
                >
                  <div
                    className={
                      isSelected
                        ? ''
                        : 'bg-[#0e0e0e] px-5 py-4 text-white transition-colors duration-150 group-hover:bg-[#141414]'
                    }
                    style={isSelected ? undefined : { clipPath: TAB_CLIP }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`inline-flex h-10 w-10 shrink-0 -rotate-3 items-center justify-center font-display text-xl transition-colors ${
                            isSelected
                              ? 'bg-black text-white shadow-[3px_3px_0_#e60012]'
                              : 'bg-[#e60012] text-white'
                          }`}
                        >
                          {category.arcanaNum}
                        </span>
                        <div>
                          <span className="block font-display text-2xl uppercase tracking-wide leading-none md:text-[1.7rem]">
                            {categoryLabel}
                          </span>
                          <span
                            className={`mt-1 block text-xs font-medium tracking-wide ${
                              isSelected ? 'text-black/75' : 'text-white/55'
                            }`}
                          >
                            {category.skills.map((s) => s.name).join(' · ')}
                          </span>
                        </div>
                      </div>

                      {/* Sharp Persona arrow indicator */}
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 transition-transform duration-150 ${
                          isSelected
                            ? 'translate-x-0.5 text-[#e60012]'
                            : 'text-white/30 group-hover:translate-x-0.5 group-hover:text-white'
                        }`}
                      >
                        <polygon points="3,2 18,10 3,18 7,10" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right: Tilted Red & Black Persona Dossier Frame (matches About.tsx) */}
        <motion.div
          initial={{ opacity: 0, y: 36, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 170, damping: 20 }}
          className="relative"
        >
          <div
            role="tabpanel"
            id={`skills-panel-${activeCategory.name}`}
            aria-labelledby={`skills-tab-${activeCategory.name}`}
            className="border-[5px] border-white bg-black p-2 shadow-[12px_12px_0_#e60012]"
          >
            <div className="relative overflow-hidden bg-[#e60012] px-5 py-6 sm:px-7 sm:py-7">
              <div aria-hidden="true" className="hero-halftone opacity-25" />

              {/* Dossier Header */}
              <div className="relative mb-6 flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-black pb-4">
                <div className="flex items-center gap-3.5">
                  <span className="-rotate-6 bg-black px-3 py-1 font-display text-2xl text-white shadow-[4px_4px_0_#ffffff]">
                    {activeCategory.arcanaNum}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl uppercase leading-none text-white drop-shadow-[3px_3px_0_#0a0a0a] md:text-4xl">
                      {t.skills.categories[activeCategory.name]}
                    </h3>
                    <p className="mt-1 inline-block bg-black px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                      {activeCategory.role[locale]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Skill Strips */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative space-y-3"
                >
                  {activeCategory.skills.map((skill, sIdx) => {
                    const isActive = sIdx === activeSkillIndex;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => setActiveSkillIndex(sIdx)}
                        onMouseEnter={() => setActiveSkillIndex(sIdx)}
                        onFocus={() => setActiveSkillIndex(sIdx)}
                        aria-pressed={isActive}
                        className={`group/strip relative flex w-full items-center justify-between px-4 py-3.5 text-left transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-black ${
                          isActive
                            ? '-translate-x-1 bg-white text-black shadow-[6px_6px_0_#0a0a0a]'
                            : 'bg-black text-white hover:-translate-x-0.5 hover:bg-[#141414]'
                        }`}
                        style={{ clipPath: SKILL_STRIP_CLIP }}
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`font-display text-base leading-none px-2 py-1 ${
                              isActive
                                ? 'bg-[#e60012] text-white'
                                : 'bg-white/10 text-white/80'
                            }`}
                          >
                            {String(sIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-display text-xl uppercase tracking-wide md:text-2xl">
                            {skill.name}
                          </span>
                        </div>

                        <span
                          className={`mr-3 text-xs font-bold uppercase tracking-widest ${
                            isActive ? 'text-[#e60012]' : 'text-white/60'
                          }`}
                        >
                          {skill.tag}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Tactical Detail Callout */}
              <div
                className="relative mt-6 bg-black p-[3px] shadow-[6px_6px_0_rgba(10,10,10,0.45)]"
                style={{ clipPath: CALLOUT_CLIP }}
              >
                <div
                  className="bg-[#0a0a0a] px-5 py-4 text-white"
                  style={{ clipPath: CALLOUT_CLIP }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCategory.name}-${activeSkill.name}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-block -skew-x-12 bg-[#e60012] px-2 py-0.5 font-display text-xs uppercase tracking-wider text-white">
                          {activeSkill.tag}
                        </span>
                        <span className="font-display text-lg uppercase tracking-wide text-white">
                          {activeSkill.name}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/85 md:text-base">
                        {activeSkill.description[locale]}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
