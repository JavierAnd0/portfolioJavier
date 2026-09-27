import type { Dictionary } from './en';

const es: Dictionary = {
  locale: 'es-CO',
  meta: {
    title: 'Javier Andrade — Ladrón fantasma del código',
    description:
      'Portafolio de Javier Andrade, desarrollador Full Stack en Colombia. Proyectos web con React, Next.js, Node.js y más.',
    awayTitle: '★ ¡Vuelve, ladrón fantasma!',
  },
  language: {
    label: 'Idioma',
    names: { en: 'English', es: 'Español' },
  },
  a11y: {
    opensNewTab: '(abre en otra pestaña)',
    mainMenu: 'Menú principal',
    sections: 'Secciones',
    menu: 'Menú',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    home: 'Inicio',
    backToTop: 'Volver arriba',
  },
  menu: {
    about: { label: 'PERFIL', hint: 'Sobre mí' },
    projects: { label: 'OBJETIVOS', hint: 'Proyectos' },
    skills: { label: 'HABILIDADES', hint: 'Tecnologías' },
    contact: { label: 'SOLICITUD', hint: 'Contacto' },
    github: { label: 'GITHUB', hint: 'Repositorios' },
  },
  intro: {
    callingCard: 'una tarjeta de aviso de —',
    role: 'DESARROLLADOR FULL STACK',
    tagline: 'tómate tu tiempo ★',
    pressKey: 'PULSA CUALQUIER TECLA',
    tap: 'TOCA PARA CONTINUAR',
  },
  calendar: {
    periods: {
      lateNight: 'MADRUGADA',
      morning: 'MAÑANA',
      afternoon: 'TARDE',
      evening: 'NOCHE',
    },
    today: (date: string, period: string) => `Hoy en Colombia: ${date}, ${period}`,
  },
  hero: {
    callingCard: 'una tarjeta de aviso de —',
    role: 'DESARROLLADOR FULL STACK',
    country: 'COLOMBIA',
    github: 'GitHub de Javier Andrade',
    select: 'ELEGIR',
    confirm: 'CONFIRMAR',
    marquee: ['TÓMATE TU TIEMPO', 'JAVIER ANDRADE', 'DESARROLLADOR FULL STACK', 'LADRÓN FANTASMA DEL CÓDIGO'],
  },
  about: {
    kicker: 'EXPEDIENTE DE CONFIDENTE — 01',
    backdrop: 'Perfil',
    title: { before: '¿Quién está ', accent: 'tras la máscara', after: '?' },
    intro: {
      before: 'Soy un ',
      accent: 'desarrollador de software',
      after:
        ' apasionado por crear soluciones digitales innovadoras. Con experiencia en desarrollo full-stack, construyo aplicaciones web modernas, escalables y centradas en el usuario.',
    },
    body:
      'Un enfoque que combina código limpio, arquitectura sólida y diseño intuitivo para entregar productos que no solo funcionan perfectamente, sino que también dejan huella. Cada proyecto es un objetivo; cada bug, una sombra por vencer.',
    stats: {
      years: 'Años en el campo',
      heists: 'Golpes completados',
      commitment: 'Compromiso',
    },
  },
  projects: {
    kicker: 'REGISTRO DE MEMENTOS — OBJETIVOS ADQUIRIDOS',
    backdrop: 'Objetivos',
    title: { before: 'Golpes ', accent: 'destacados', after: '' },
    intro:
      'Una selección de proyectos que demuestran mi experiencia en desarrollo full-stack, desde aplicaciones web complejas hasta APIs escalables.',
    target: 'OBJETIVO',
    infiltrate: 'INFILTRAR',
    treasure: 'BOTÍN',
    viewAll: 'VER EXPEDIENTE COMPLETO EN GITHUB',
    items: {
      avelino: {
        title: 'Sitio web para la escuela de manejo Andres Avelino Longas',
        description:
          'Sitio web para la escuela Andres Avelino Longas con panel de administración intuitivo (CMS).',
      },
      fuego: {
        title: 'Restaurante Fuego',
        description:
          'Sitio web para restaurante con menú interactivo, información del local y diseño atractivo orientado a la experiencia del cliente.',
      },
      movie: {
        title: 'Movie as you feel',
        description:
          'Aplicación que recomienda películas según tu estado de ánimo, con búsqueda inteligente y catálogo interactivo.',
      },
      socialApi: {
        title: 'API de red social',
        description:
          'API RESTful escalable para red social con autenticación JWT, websockets y caché distribuido.',
      },
    },
  },
  skills: {
    kicker: 'ÁRBOL DE HABILIDADES — ATAQUE TOTAL LISTO',
    backdrop: 'Habilidades',
    title: { before: 'Arsenal ', accent: 'técnico', after: '' },
    intro:
      'Tecnologías y herramientas que utilizo para construir aplicaciones modernas, escalables y de alto rendimiento.',
    persona: 'Persona',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Bases de datos',
      devops: 'DevOps',
    },
  },
  contact: {
    kicker: 'SOLICITUD DE COOPERACIÓN',
    backdrop: 'Contacto',
    title: { before: 'Únete al ', accent: 'equipo', after: '' },
    intro: '¿Tienes un proyecto en mente? ¡Hablemos! Estoy siempre abierto a nuevas oportunidades y colaboraciones.',
    pitch: { before: 'Robemos algo ', accent: 'increíble', after: ' juntos' },
    body:
      'Ya sea que tengas una idea que quieras materializar o necesites ayuda con un proyecto existente, estaré encantado de escucharte. Sin tarjeta de aviso, sin Metaverso — solo un correo.',
    emailLabel: 'Correo',
    emailValue: 'tu@email.com',
    locationLabel: 'Ubicación',
    locationValue: 'Tu Ciudad, País',
    follow: 'SIGUE A LOS LADRONES',
    formHint: 'llena tu solicitud de cooperación',
    name: 'Tu nombre',
    email: 'Tu correo',
    message: 'Tu mensaje',
    send: 'ENVIAR LA TARJETA DE AVISO',
    sent: '¡TARJETA ENVIADA!',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    signature: '— el ladrón fantasma del código',
  },
  status: {
    onDuty: 'DE TURNO',
    offDuty: 'FUERA DE TURNO',
  },
};

export default es;
