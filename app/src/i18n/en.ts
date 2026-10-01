const en = {
  locale: 'en-US',
  meta: {
    title: 'Javier Andrade — Phantom Thief of Code',
    description:
      'Portfolio of Javier Andrade, Full Stack Developer based in Colombia. Web projects built with React, Next.js, Node.js and more.',
    awayTitle: '★ Come back, Phantom Thief!',
  },
  language: {
    label: 'Language',
    names: { en: 'English', es: 'Español' },
  },
  a11y: {
    opensNewTab: '(opens in a new tab)',
    mainMenu: 'Main menu',
    sections: 'Sections',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'Home',
    backToTop: 'Back to top',
  },
  menu: {
    about: { label: 'PROFILE', hint: 'About me' },
    projects: { label: 'TARGETS', hint: 'Projects' },
    skills: { label: 'SKILLS', hint: 'Tech stack' },
    contact: { label: 'REQUEST', hint: 'Contact' },
    github: { label: 'GITHUB', hint: 'Repositories' },
  },
  intro: {
    callingCard: 'a calling card from —',
    role: 'FULL STACK DEVELOPER',
    tagline: 'take your time ★',
    pressKey: 'PRESS ANY KEY',
    tap: 'TAP TO CONTINUE',
  },
  calendar: {
    periods: {
      lateNight: 'LATE NIGHT',
      morning: 'MORNING',
      afternoon: 'AFTERNOON',
      evening: 'EVENING',
    },
    today: (date: string, period: string) => `Today in Colombia: ${date}, ${period}`,
  },
  hero: {
    callingCard: 'a calling card from —',
    role: 'FULL STACK DEVELOPER',
    country: 'COLOMBIA',
    github: "Javier Andrade's GitHub",
    select: 'SELECT',
    confirm: 'CONFIRM',
    marquee: ['TAKE YOUR TIME', 'JAVIER ANDRADE', 'FULL STACK DEVELOPER', 'PHANTOM THIEF OF CODE'],
  },
  about: {
    kicker: 'CONFIDANT FILE — 01',
    backdrop: 'Profile',
    title: { before: "Who's ", accent: 'Behind the Mask', after: '' },
    intro: {
      before: "I'm a ",
      accent: 'software developer',
      after:
        ' passionate about building innovative digital solutions. With full-stack experience, I build modern, scalable, user-centered web applications.',
    },
    body:
      "My approach blends clean code, solid architecture and intuitive design to ship products that don't just work flawlessly — they leave a lasting impression. Every project is a target; every bug, a shadow to defeat.",
    chat: {
      header: 'Messages',
      contact: 'Javier',
      visitor: 'You',
      question: 'Hey… who are you, really?',
      replies: { projects: 'Show me your targets', contact: "I'd like to send a request" },
      portraitAlt: 'Portrait of Javier Andrade',
    },
  },
  projects: {
    kicker: 'MEMENTOS LOG — TARGETS ACQUIRED',
    backdrop: 'Targets',
    title: { before: 'Featured ', accent: 'Heists', after: '' },
    intro:
      'A selection of projects that show my full-stack experience, from complex web applications to scalable APIs.',
    target: 'TARGET',
    infiltrate: 'INFILTRATE',
    treasure: 'TREASURE',
    viewAll: 'VIEW FULL RAP SHEET ON GITHUB',
    items: {
      avelino: {
        title: 'Andres Avelino Longas Driving School website',
        description:
          'Website for the Andres Avelino Longas driving school, with an intuitive admin panel (CMS).',
      },
      fuego: {
        title: 'Restaurante Fuego',
        description:
          'Restaurant website with an interactive menu, venue information and an appealing design focused on the guest experience.',
      },
      movie: {
        title: 'Movie as you feel',
        description:
          'An app that recommends movies based on your mood, with smart search and an interactive catalog.',
      },
      socialApi: {
        title: 'Social Media API',
        description:
          'Scalable RESTful API for a social network with JWT authentication, websockets and distributed caching.',
      },
    },
  },
  skills: {
    kicker: 'SKILL TREE — ALL-OUT ATTACK READY',
    backdrop: 'Abilities',
    title: { before: 'Tech ', accent: 'Arsenal', after: '' },
    intro: 'Technologies and tools I use to build modern, scalable, high-performance applications.',
    persona: 'Persona',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      devops: 'DevOps',
    },
  },
  contact: {
    kicker: 'REQUEST FOR COOPERATION',
    backdrop: 'Contact',
    title: { before: 'Join The ', accent: 'Team', after: '' },
    intro: "Got a project in mind? Let's talk! I'm always open to new opportunities and collaborations.",
    pitch: { before: "Let's steal something ", accent: 'amazing', after: ' together' },
    body:
      "Whether you have an idea you want to bring to life or need a hand with an existing project, I'd love to hear from you. No calling card, no Metaverse — just an email.",
    emailLabel: 'Email',
    emailValue: 'logijavier@gmail.com',
    locationLabel: 'Location',
    locationValue: 'Neiva, Huila, Colombia',
    follow: 'FOLLOW THE THIEVES',
    formHint: 'fill in your request for cooperation',
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    send: 'SEND THE CALLING CARD',
    sent: 'CALLING CARD SENT!',
  },
  footer: {
    rights: 'All rights reserved.',
    signature: '— the Phantom Thief of Code',
  },
  status: {
    onDuty: 'ON DUTY',
    offDuty: 'OFF DUTY',
  },
};

export type Dictionary = typeof en;
export default en;
