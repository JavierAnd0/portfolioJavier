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
    role: 'DESARROLLADOR FULL STACK',
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
    chat: {
      header: 'Mensajes',
      contact: 'Javier',
      visitor: 'Tú',
      question: 'Oye… ¿quién eres realmente?',
      replies: { projects: 'Muéstrame tus objetivos', contact: 'Quiero enviarte una solicitud' },
      portraitAlt: 'Retrato de Javier Andrade',
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
      origen: {
        title: 'ORÍGEN — Café de especialidad',
        description:
          'Tienda en línea de café de especialidad colombiano con experiencia animada de inicio, catálogo, suscripciones mensuales, quiz de recomendación y carrito de compras.',
      },
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
      ofertas: {
        title: 'Ofertas reales de Amazon',
        description:
          'Catálogo de ofertas de Amazon con envío confirmado a Colombia: descuentos validados con el historial de precios de Keepa, precios en dólares y pesos, filtros por categoría y plataforma.',
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
    kicker: 'SOLICITUD DE COOPERACIÓN // PROTOCOLO 140.85',
    backdrop: 'Contacto',
    title: { before: 'Únete al ', accent: 'equipo', after: '' },
    intro: '¿Tienes un proyecto en mente? ¡Hablemos! Estoy siempre abierto a nuevas oportunidades y colaboraciones.',
    pitch: { before: 'Robemos algo ', accent: 'increíble', after: ' juntos' },
    body:
      'Ya sea que tengas una idea que quieras materializar o necesites ayuda con un proyecto existente, estaré encantado de escucharte.',
    emailLabel: 'Correo',
    emailValue: 'logijavier@gmail.com',
    locationLabel: 'Ubicación',
    locationValue: 'Neiva, Huila, Colombia',
    localTimeLabel: 'HORA COLOMBIA',
    follow: 'SIGUE A LOS LADRONES',
    formHint: 'llena tu solicitud de cooperación',
    cardHeader: 'AVISO DE COOPERACIÓN // CALLING CARD',
    badge: 'SOLICITUD DE MISIÓN',
    categoryLabel: 'TIPO DE CONTRATO',
    categories: {
      project: 'Nuevo Proyecto',
      work: 'Propuesta Laboral',
      collab: 'Colaboración',
      inquiry: 'Consulta Rápida',
    },
    senderTag: 'REMITENTE / CODENAME',
    emailTag: 'FRECUENCIA / EMAIL',
    subjectTag: 'OBJETIVO / ASUNTO',
    subjectPlaceholder: 'Ej. Desarrollo de aplicación web full-stack',
    messageTag: 'BRIEFING DE LA MISIÓN / MENSAJE',
    name: 'Tu nombre',
    namePlaceholder: 'Tu nombre o codename',
    email: 'Tu correo',
    emailPlaceholder: 'tu-correo@ejemplo.com',
    message: 'Tu mensaje',
    messagePlaceholder: 'Describe los detalles de la misión, alcance, metas y plazos esperados...',
    chars: 'caracteres',
    send: 'ENVIAR SOLICITUD',
    sending: 'TRANSMITIENDO AL METAVERSO...',
    sent: '¡SOLICITUD ENVIADA!',
    successTitle: '¡OBJETIVO IDENTIFICADO!',
    successStamp: 'SOLICITUD ACEPTADA',
    successMsg: 'Tu solicitud ha sido transmitida con éxito a los Ladrones de Corazones. Javier responderá a tu frecuencia en menos de 24 horas.',
    sendAnother: 'ENVIAR OTRA SOLICITUD',
    errorTitle: 'ERROR EN LA TRANSMISIÓN',
    retry: 'REINTENTAR ENVÍO',
    copyEmail: 'Copiar correo',
    copiedEmail: '¡COPIADO!',
    statusLabel: 'ESTADO DEL CONFIDENTE',
    statusActive: 'DISPONIBLE PARA MISIONES',
    responseTimeLabel: 'RESPUESTA',
    responseTime: '< 24 HORAS',
    confidantRank: 'RANGO COOP',
    confidantMax: 'RANGO 10 — MÁX',
    directContact: 'CANAL DIRECTO',
    simulationNotice: 'Modo simulación: para envíos reales por correo, añade RESEND_API_KEY a tu archivo .env.',
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
