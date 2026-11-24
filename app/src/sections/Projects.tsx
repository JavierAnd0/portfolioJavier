import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Layers } from 'lucide-react';
import SectionHeading from '@/components/persona/SectionHeading';
import { useI18n } from '@/i18n/context';
import type { Dictionary } from '@/i18n/en';

type ProjectKey = keyof Dictionary['projects']['items'];

interface Project {
  key: ProjectKey;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    key: 'origen',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Three.js'],
    image: '/projects/origen-cafe.jpg',
    demo: 'https://origen.bestkofi.com/',
    featured: true,
  },
  {
    key: 'avelino',
    tech: ['Next.js', 'Node.js', 'MongoDB'],
    image: '/projects/screencapture-andresavelinolongas-app-2026-04-02-20_38_48.png',
    demo: 'https://andresavelinolongas.app/',
  },
  {
    key: 'elSolar',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    image: '/projects/el-solar-neiva.png',
    demo: 'https://el-solar-neiva.vercel.app/',
  },
  {
    key: 'movie',
    tech: ['Next.js', 'TypeScript', 'TMDB API'],
    image: '/projects/movie-as-u-feel.png',
    demo: 'https://movie-as-u-feel.vercel.app/',
  },
  {
    key: 'ofertas',
    tech: ['JavaScript', 'Keepa API', 'Vercel'],
    image: '/projects/ofertas-amazon-co.jpg',
    demo: 'https://ofertas-amazon-co.vercel.app/#juegos',
  },
];

const hasRealUrl = (url?: string) => Boolean(url && url !== '#');

const ProjectMedia = ({
  project,
  title,
  index,
  targetLabel,
  featured = false,
}: {
  project: Project;
  title: string;
  index: number;
  targetLabel: string;
  featured?: boolean;
}) => (
  <div
    className={`relative overflow-hidden bg-[#111111] ${
      featured ? 'aspect-[16/10] lg:aspect-auto lg:h-full' : 'aspect-[16/10]'
    }`}
  >
    {/* Crisp Persona target stamp */}
    <div className="pointer-events-none absolute left-3 top-3 z-20 -rotate-2 bg-[#e60012] px-3 py-1 shadow-[4px_4px_0_#0a0a0a]">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white">
        {targetLabel} {String(index + 1).padStart(2, '0')}
      </span>
    </div>

    {project.image.startsWith('/') ? (
      <img
        src={project.image}
        alt={title}
        loading={featured ? 'eager' : 'lazy'}
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    ) : (
      <div className="relative flex h-full w-full items-center justify-center bg-[#0c0c0c]">
        <div aria-hidden="true" className="absolute inset-0 halftone opacity-25" />
        <div className="relative flex h-16 w-16 -rotate-3 items-center justify-center border-2 border-white bg-black shadow-[5px_5px_0_#e60012]">
          <Layers className="h-7 w-7 text-[#e60012]" />
        </div>
      </div>
    )}
  </div>
);

const ProjectActions = ({ project }: { project: Project }) => {
  const { t } = useI18n();
  const showDemo = hasRealUrl(project.demo);
  const showGithub = hasRealUrl(project.github);

  if (!showDemo && !showGithub) return null;

  return (
    <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
      {showDemo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-white bg-[#e60012] px-4 py-2 font-display text-sm uppercase tracking-wider text-white shadow-[4px_4px_0_#ffffff] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-[4px_4px_0_#e60012]"
        >
          <span>{t.projects.infiltrate}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
      {showGithub && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-white/40 bg-black px-4 py-2 font-display text-sm uppercase tracking-wider text-white transition-colors duration-150 hover:border-white hover:bg-white hover:text-black"
        >
          <Github className="h-4 w-4" />
          <span>{t.projects.treasure}</span>
        </a>
      )}
    </div>
  );
};

const FeaturedProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useI18n();
  const { title, description } = t.projects.items[project.key];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group md:col-span-2"
    >
      <div className="border-[4px] border-white bg-black p-1.5 shadow-[10px_10px_0_#e60012]">
        <div className="grid bg-[#0d0d0d] lg:grid-cols-[1.35fr_1fr]">
          <ProjectMedia
            project={project}
            title={title}
            index={index}
            targetLabel={t.projects.target}
            featured
          />

          <div className="flex flex-col border-t-2 border-white/15 p-6 sm:p-7 lg:border-l-2 lg:border-t-0">
            <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-white transition-colors duration-200 group-hover:text-[#e60012] md:text-3xl">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
              {description}
            </p>

            {/* Tech Stack */}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-white/10 px-2.5 py-1 font-mono text-xs font-medium text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>

            <ProjectActions project={project} />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useI18n();
  const { title, description } = t.projects.items[project.key];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        delay: (index % 2) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex h-full flex-col border-2 border-white/20 bg-[#0d0d0d] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:border-white hover:shadow-[8px_8px_0_#e60012]"
    >
      <ProjectMedia
        project={project}
        title={title}
        index={index}
        targetLabel={t.projects.target}
      />

      <div className="flex flex-1 flex-col border-t-2 border-white/10 p-6">
        <h3 className="font-display text-xl uppercase leading-snug tracking-wide text-white transition-colors duration-200 group-hover:text-[#e60012] md:text-2xl">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/70 md:text-[15px]">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="bg-white/10 px-2.5 py-1 font-mono text-xs font-medium text-white/85"
            >
              {tech}
            </span>
          ))}
        </div>

        <ProjectActions project={project} />
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const { t } = useI18n();

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      {/* Subtle halftone texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 halftone opacity-[0.05]"
      />

      {/* Section Header */}
      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-6 md:mb-16 md:px-10">
        <SectionHeading section="projects" intro={t.projects.intro} />
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) =>
            project.featured ? (
              <FeaturedProjectCard key={project.key} project={project} index={index} />
            ) : (
              <ProjectCard key={project.key} project={project} index={index} />
            ),
          )}
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/JavierAnd0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-white bg-black px-8 py-4 font-display text-base uppercase tracking-wider text-white shadow-[6px_6px_0_#e60012] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#e60012] hover:text-white hover:shadow-[6px_6px_0_#ffffff]"
          >
            <Github className="h-5 w-5" />
            <span>{t.projects.viewAll}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
