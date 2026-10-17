import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Zap,
  Wind,
  Snowflake,
  Swords,
  Eye,
  Atom,
  Star,
  Shield,
  Database as DbIcon,
  Cpu,
  Layers,
  Terminal,
  ChevronRight,
} from 'lucide-react';
import { useI18n } from '@/i18n/context';
import type { Dictionary } from '@/i18n/en';

interface SkillItem {
  name: string;
  element: string; // P5 element affinity: AGI, ZIO, GARU, BUFU, PHYS, PSI, FREI, MEGIDO, BUFF
  icon: typeof Flame;
  color: string; // Accent color for element
  tag: string; // Dev classification
  description: {
    en: string;
    es: string;
  };
}

interface SkillCategory {
  name: keyof Dictionary['skills']['categories'];
  arcanaNum: string;
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
    role: {
      en: 'CLIENT ARCHITECTURE & INTERFACES',
      es: 'ARQUITECTURA CLIENTE E INTERFACES',
    },
    skills: [
      {
        name: 'React / Next.js',
        element: 'AGI',
        icon: Flame,
        color: '#ff4d00',
        tag: 'FRAMEWORK',
        description: {
          en: 'SSR, Server Components, high-velocity responsive UI architecture.',
          es: 'SSR, Server Components y arquitectura de interfaces reactivas.',
        },
      },
      {
        name: 'TypeScript',
        element: 'ZIO',
        icon: Zap,
        color: '#ffdd00',
        tag: 'STATIC TYPES',
        description: {
          en: 'Strict type safety, generics, schema validation and robust APIs.',
          es: 'Tipado estricto, genéricos, validación de esquemas y contratos sólidos.',
        },
      },
      {
        name: 'Tailwind CSS',
        element: 'GARU',
        icon: Wind,
        color: '#00e5ff',
        tag: 'STYLING',
        description: {
          en: 'Custom design systems, responsive micro-animations and layouts.',
          es: 'Sistemas de diseño custom, microanimaciones y maquetación fluida.',
        },
      },
      {
        name: 'Vue.js',
        element: 'BUFU',
        icon: Snowflake,
        color: '#00b4d8',
        tag: 'REACTIVE UI',
        description: {
          en: 'Composition API, state management, and component modularity.',
          es: 'Composition API, manejo de estado modular y componentes reactivos.',
        },
      },
    ],
  },
  {
    name: 'backend',
    arcanaNum: 'IV',
    role: {
      en: 'SERVER RUNTIMES & DISTRIBUTED APIS',
      es: 'SERVIDORES Y APIS DISTRIBUIDAS',
    },
    skills: [
      {
        name: 'Node.js',
        element: 'PHYS',
        icon: Swords,
        color: '#e60012',
        tag: 'RUNTIME',
        description: {
          en: 'Asynchronous event loops, streams, and high-throughput server backends.',
          es: 'Bucle de eventos asíncrono, streams y servidores de alto rendimiento.',
        },
      },
      {
        name: 'Python',
        element: 'PSI',
        icon: Eye,
        color: '#e040fb',
        tag: 'LOGIC & SCRIPT',
        description: {
          en: 'Data pipelines, scripting, automation and scalable web services.',
          es: 'Pipelines de datos, scripts, automatizaciones y servicios web.',
        },
      },
      {
        name: 'Express / FastAPI',
        element: 'FREI',
        icon: Atom,
        color: '#ff9100',
        tag: 'REST API',
        description: {
          en: 'Secure routing, middleware chains, OpenAPI specs and rate limiting.',
          es: 'Enrutamiento seguro, cadenas de middlewares, OpenAPI y rate limiting.',
        },
      },
      {
        name: 'GraphQL',
        element: 'MEGIDO',
        icon: Star,
        color: '#b388ff',
        tag: 'QUERY GRAPH',
        description: {
          en: 'Flexible schema definitions, resolvers, and efficient data queries.',
          es: 'Esquemas flexibles, resolvers tipados y consultas sin sobrecarga.',
        },
      },
    ],
  },
  {
    name: 'database',
    arcanaNum: 'V',
    role: {
      en: 'DATA PERSISTENCE & CACHING',
      es: 'PERSISTENCIA DE DATOS Y CACHÉ',
    },
    skills: [
      {
        name: 'PostgreSQL',
        element: 'BLESS',
        icon: DbIcon,
        color: '#29b6f6',
        tag: 'ACID SQL',
        description: {
          en: 'Complex relational schemas, indexes, transactions and queries.',
          es: 'Esquemas relacionales complejos, índices, transacciones y consultas.',
        },
      },
      {
        name: 'MongoDB',
        element: 'CURSE',
        icon: Layers,
        color: '#00e676',
        tag: 'NOSQL',
        description: {
          en: 'Document modeling, aggregations, flexible unstructured collections.',
          es: 'Modelado documental, agregaciones y colecciones flexibles.',
        },
      },
      {
        name: 'Redis',
        element: 'GARU',
        icon: Cpu,
        color: '#ff1744',
        tag: 'IN-MEMORY CACHE',
        description: {
          en: 'Sub-millisecond key-value caching, sessions and Pub/Sub queues.',
          es: 'Caché ultrarrápida, gestión de sesiones y colas Pub/Sub en memoria.',
        },
      },
      {
        name: 'MySQL',
        element: 'PHYS',
        icon: Swords,
        color: '#ffab00',
        tag: 'RDBMS',
        description: {
          en: 'Data normalization, triggers, query optimization and migrations.',
          es: 'Normalización de datos, triggers, optimización y migraciones.',
        },
      },
    ],
  },
  {
    name: 'devops',
    arcanaNum: 'VII',
    role: {
      en: 'DEPLOYMENT & CLOUD PIPELINE',
      es: 'DESPLIEGUE Y PIPELINES CLOUD',
    },
    skills: [
      {
        name: 'Docker',
        element: 'BUFF',
        icon: Shield,
        color: '#00b0ff',
        tag: 'CONTAINERS',
        description: {
          en: 'Multi-stage container builds, reproducible environments, Docker Compose.',
          es: 'Builds multicapa, entornos reproducibles y orquestación local.',
        },
      },
      {
        name: 'AWS',
        element: 'MEGIDO',
        icon: Star,
        color: '#ff9800',
        tag: 'CLOUD',
        description: {
          en: 'EC2, S3, Lambda serverless, IAM roles and secure VPC networking.',
          es: 'Instancias EC2, buckets S3, funciones Lambda serverless y redes VPC.',
        },
      },
      {
        name: 'Vercel / Netlify',
        element: 'AGI',
        icon: Flame,
        color: '#ffffff',
        tag: 'JAMSTACK',
        description: {
          en: 'Global edge networks, instant branch previews, serverless backends.',
          es: 'Red global edge, vistas previas por rama y funciones serverless.',
        },
      },
      {
        name: 'GitHub Actions',
        element: 'ZIO',
        icon: Terminal,
        color: '#69f0ae',
        tag: 'CI / CD',
        description: {
          en: 'Automated test runners, build pipelines, linting and CD releases.',
          es: 'Pipelines automatizados de pruebas, linting y despliegue continuo.',
        },
      },
    ],
  },
];

const SkillSlot = ({
  skill,
  isActive,
  onHover,
}: {
  skill: SkillItem;
  isActive: boolean;
  onHover: () => void;
}) => {
  const Icon = skill.icon;
  return (
    <div
      onMouseEnter={onHover}
      onClick={onHover}
      className={`group/slot relative isolate flex cursor-pointer items-center justify-between border px-3 py-2.5 transition-all duration-200 ${
        isActive
          ? 'scale-[1.02] border-white bg-[#e60012] shadow-[4px_4px_0_#000]'
          : 'border-white/10 bg-black/60 hover:border-white/40 hover:bg-black/90'
      }`}
      style={{
        clipPath: 'polygon(0 0, 100% 0, 97% 100%, 0% 100%)',
      }}
    >
      {/* Left indicator arrow */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -left-1 top-1/2 -translate-y-1/2 font-heavy text-xs text-white transition-opacity ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        ▶
      </span>

      {/* Left side: Element Affinity badge + Skill Name */}
      <div className="flex items-center gap-3 pl-1.5">
        {/* P5 Affinity Tag */}
        <span
          className={`flex items-center gap-1.5 px-2 py-0.5 font-heavy text-[10px] tracking-wider transition-colors ${
            isActive
              ? 'bg-black text-white'
              : 'border border-white/20 bg-white/10 text-white'
          }`}
          style={{
            borderColor: isActive ? '#000' : undefined,
          }}
        >
          <Icon size={12} style={{ color: isActive ? '#ff0022' : skill.color }} />
          <span>{skill.element}</span>
        </span>

        {/* Skill Name */}
        <div className="flex flex-col">
          <span
            className={`font-sans text-sm font-bold tracking-wide transition-colors ${
              isActive ? 'text-white' : 'text-white/90'
            }`}
          >
            {skill.name}
          </span>
          <span
            className={`font-mono text-[9px] uppercase tracking-wider transition-colors ${
              isActive ? 'text-black/80 font-bold' : 'text-white/40'
            }`}
          >
            {skill.tag}
          </span>
        </div>
      </div>

      {/* Right side: Clean interactive chevron */}
      <div className="pr-1.5">
        <ChevronRight
          size={14}
          className={`transition-transform duration-200 ${
            isActive
              ? 'translate-x-1 text-white'
              : 'text-white/20 group-hover/slot:text-white/60'
          }`}
        />
      </div>
    </div>
  );
};

const PersonaCard = ({
  category,
  index,
  lang,
}: {
  category: SkillCategory;
  index: number;
  lang: 'en' | 'es';
}) => {
  const { t } = useI18n();
  const categoryLabel = t.skills.categories[category.name];
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const activeSkill = category.skills[activeSkillIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative flex flex-col justify-between border-2 border-white/20 bg-[#0e0e11]/95 transition-all duration-300 hover:border-[#e60012] hover:shadow-[10px_10px_0_#000]"
      style={{
        clipPath:
          'polygon(18px 0%, 100% 0%, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0% 100%, 0% 18px)',
      }}
    >
      {/* Top diagonal stripe accent */}
      <div className="h-1.5 w-full slash-stripes" />

      {/* Card Body */}
      <div className="p-5 sm:p-6 md:p-7">
        {/* Header Ribbon */}
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            {/* Roman Arcana Badge */}
            <div className="relative flex h-11 w-11 -rotate-3 items-center justify-center border-2 border-white bg-black font-display text-xl text-[#e60012] shadow-[3px_3px_0_#e60012]">
              {category.arcanaNum}
            </div>

            <h4 className="font-display text-2xl tracking-wide text-white transition-colors group-hover:text-[#e60012]">
              {categoryLabel}
            </h4>
          </div>
        </div>

        {/* Subtitle / Role Tag */}
        <div className="mb-4 text-[10px] font-mono tracking-widest text-white/40 uppercase">
          <span>{category.role[lang]}</span>
        </div>

        {/* Skills Loadout */}
        <div className="space-y-2.5">
          {category.skills.map((skill, sIdx) => (
            <SkillSlot
              key={skill.name}
              skill={skill}
              isActive={activeSkillIndex === sIdx}
              onHover={() => setActiveSkillIndex(sIdx)}
            />
          ))}
        </div>

        {/* Interactive Tactical Description Footer */}
        <div className="mt-4 border-t border-white/10 pt-3">
          <div className="flex items-start gap-2 text-xs text-white/70">
            <span className="select-none font-heavy text-[#e60012]">★</span>
            <p className="font-sans text-[11px] leading-relaxed text-white/60">
              <strong className="text-white">{activeSkill.name}:</strong>{' '}
              {activeSkill.description[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* Card Base Bar */}
      <div className="flex items-center justify-between border-t border-white/10 bg-black/80 px-5 py-2 font-mono text-[10px] tracking-widest text-white/40">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e60012] animate-pulse" />
          <span>ALL-OUT ATTACK READY</span>
        </span>
        <span className="text-white/60 font-bold">CONFIDANT RANK: MAX</span>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { t, lang } = useI18n();

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ff0022 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="pointer-events-none absolute top-1/4 right-0 h-[32rem] w-[32rem] rounded-full bg-[#e60012]/5 blur-[160px] -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-80 w-80 rounded-full bg-[#e60012]/5 blur-[140px] -z-10" />

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 mb-16">
        {/* Graphic Backdrop Stamp */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 md:-top-16 right-4 md:right-10 select-none overflow-hidden"
        >
          <span className="block font-display text-6xl sm:text-7xl md:text-9xl uppercase tracking-[0.12em] text-white/[0.04] -rotate-2">
            {t.skills.backdrop}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {/* Kicker with P5 stars */}
          <div className="mb-3 flex items-center gap-2">
            <span className="font-heavy text-xs text-[#e60012]">★</span>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#e60012]">
              {t.skills.kicker}
            </span>
            <span className="font-heavy text-xs text-[#e60012]">★</span>
          </div>

          {/* Dynamic Ransom Title */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block -rotate-2 bg-white px-4 py-1 font-display text-3xl md:text-5xl uppercase text-black shadow-[4px_4px_0_#e60012]">
              {t.skills.title.before}
            </span>
            <span className="inline-block rotate-1 font-display text-3xl md:text-5xl uppercase tracking-wider text-[#e60012]">
              {t.skills.title.accent}
            </span>
          </div>

          {/* Subtitle / Intro */}
          <p className="mt-5 max-w-2xl border-l-4 border-[#e60012] pl-4 text-base md:text-lg text-white/70 font-sans">
            {t.skills.intro}
          </p>
        </motion.div>
      </div>

      {/* Persona 5 Arcana Cards Grid */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-7 md:gap-8">
          {skillCategories.map((category, index) => (
            <PersonaCard
              key={category.name}
              category={category}
              index={index}
              lang={lang as 'en' | 'es'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
