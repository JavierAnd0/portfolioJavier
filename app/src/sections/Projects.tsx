import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'Sitio web para la escuela de manejo Andres Avelino Longas',
    description: 'Sitio web para la escuela Andres Avelino Longas con panel de administración intuitivo (CMS).',
    tech: ['Next.js', 'Node.js', 'MongoDB'],
    image: '/projects/screencapture-andresavelinolongas-app-2026-04-02-20_38_48.png',
    demo: 'https://andresavelinolongas.app/',
    featured: true,
  },
  {
    title: 'Restaurante Fuego',
    description: 'Sitio web para restaurante con menú interactivo, información del local y diseño atractivo orientado a la experiencia del cliente.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/restaurantefuego.png',
    demo: 'https://restaurantefuego.duckdns.org',
  },
  {
    title: 'Movie as you feel',
    description: 'Aplicación que recomienda películas según tu estado de ánimo, con búsqueda inteligente y catálogo interactivo.',
    tech: ['Next.js', 'TypeScript', 'TMDB API'],
    image: '/projects/movie-as-u-feel.png',
    demo: 'https://movie-as-u-feel.vercel.app/',
  },
  {
    title: 'Social Media API',
    description: 'API RESTful escalable para red social con autenticación JWT, websockets y caché distribuido.',
    tech: ['Node.js', 'Express', 'Redis', 'Docker'],
    image: 'gradient-4',
    github: '#',
    demo: '#',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`group relative ${project.featured ? 'md:col-span-2' : ''}`}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative h-full border-2 border-white/15 hover:border-red cut-corners overflow-hidden transition-colors duration-300"
      >
        {/* Target tag */}
        <div className="absolute top-0 left-0 z-20 bg-red border-b-2 border-r-2 border-black px-4 py-1.5 cut-corner-tag">
          <span className="font-mono text-[10px] text-black tracking-[0.2em] font-bold">
            TARGET {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Image/Gradient Area */}
        <div className={`relative h-48 md:h-56 overflow-hidden ${project.image.startsWith('/') ? 'bg-black' : 'bg-ink'}`}>
          {project.image.startsWith('/') ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <>
              <div className="absolute inset-0 halftone opacity-40" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-16 h-16 bg-black border-2 border-red cut-corners flex items-center justify-center">
                  <Layers className="w-8 h-8 text-red" />
                </div>
              </motion.div>
            </>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.demo && (
              <motion.a
                href={project.demo}
                whileHover={{ scale: 1.1, rotate: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-red text-black font-display text-xs tracking-wide cut-corners border-2 border-black"
              >
                <ExternalLink className="w-4 h-4" />
                INFILTRATE
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.1, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-black font-display text-xs tracking-wide cut-corners border-2 border-black"
              >
                <Github className="w-4 h-4" />
                TREASURE
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-dark-grey/90">
          <h3 className="font-display text-xl md:text-2xl font-normal text-white mb-2 group-hover:text-red transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + techIndex * 0.05 }}
                className="px-3 py-1 text-xs font-mono border border-white/20 text-white/70 hover:border-red hover:text-red transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative min-h-screen w-full bg-black py-24 md:py-32 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-xs tracking-[0.3em] text-red mb-2">
            MEMENTOS LOG — TARGETS ACQUIRED
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-normal text-white/10 uppercase tracking-[0.06em]">
            Targets
          </h2>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-3xl md:text-4xl font-normal text-white -mt-8 md:-mt-12 ml-2"
          >
            Featured <span className="text-red">Heists</span>
          </motion.h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-white/60 text-lg max-w-2xl"
        >
          Una selección de proyectos que demuestran mi experiencia en desarrollo full-stack, desde aplicaciones web complejas hasta APIs escalables.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://github.com/JavierAnd0"
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-display tracking-wide cut-corners hover:border-red hover:text-red transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            VIEW FULL RAP SHEET ON GITHUB
          </motion.a>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 halftone opacity-10 -z-10" />
    </section>
  );
};

export default Projects;
