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
    title: 'E-Commerce Platform',
    description: 'Plataforma de comercio electrónico completa con carrito, pagos integrados y panel de administración intuitivo.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'gradient-1',
    github: '#',
    demo: '#',
    featured: true,
  },
  {
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con colaboración en tiempo real, notificaciones y tableros Kanban.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    image: 'gradient-2',
    github: '#',
    demo: '#',
  },
  {
    title: 'Portfolio Dashboard',
    description: 'Dashboard interactivo para visualización de datos financieros en tiempo real con gráficos avanzados.',
    tech: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
    image: 'gradient-3',
    github: '#',
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

const gradientMap: Record<string, string> = {
  'gradient-1': 'from-red/30 via-pink/20 to-magenta/30',
  'gradient-2': 'from-magenta/30 via-red/20 to-pink/30',
  'gradient-3': 'from-pink/30 via-magenta/20 to-red/30',
  'gradient-4': 'from-red/20 via-pink/30 to-magenta/20',
};

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
        whileHover={{ y: -12 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative h-full rounded-2xl overflow-hidden border border-white/10 hover:border-red/50 transition-all duration-400"
      >
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-red/10 to-transparent" />
          <div className="absolute inset-0 shadow-glow-lg" />
        </div>

        {/* Image/Gradient Area */}
        <div className={`relative h-48 md:h-56 overflow-hidden bg-gradient-to-br ${gradientMap[project.image]}`}>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill={`url(#grid-${index})`} />
            </svg>
          </div>
          
          {/* Floating Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-16 h-16 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Layers className="w-8 h-8 text-red" />
            </div>
          </motion.div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {project.demo && (
              <motion.a
                href={project.demo}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-red flex items-center justify-center text-white glow-red"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 bg-dark-grey/80 backdrop-blur-sm">
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-red transition-colors duration-300">
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
                className="px-3 py-1 text-xs font-mono rounded-full border border-white/20 text-white/70 hover:border-red hover:text-red transition-all duration-200"
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
    <section id="projects" className="relative min-h-screen w-full bg-black py-24 md:py-32">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-white/10 uppercase tracking-[0.1em]">
            Projects
          </h2>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-3xl md:text-4xl font-semibold text-white -mt-8 md:-mt-12 ml-2"
          >
            Featured <span className="text-red">Projects</span>
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
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white font-heading font-medium rounded-full hover:border-red hover:text-red transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-magenta/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default Projects;
