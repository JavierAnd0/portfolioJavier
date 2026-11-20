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
    role: 'FULL STACK DEVELOPER',
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
      origen: {
        title: 'ORÍGEN — Specialty Coffee',
        description:
          'Online store for Colombian specialty coffee with an animated intro experience, catalog, monthly subscriptions, a recommendation quiz and a shopping cart.',
      },
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
      ofertas: {
        title: 'Real Amazon Deals',
        description:
          'A catalog of Amazon deals with confirmed shipping to Colombia: discounts checked against Keepa price history, prices in USD and COP, and filters by category and platform.',
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
    kicker: 'REQUEST FOR COOPERATION // PROTOCOL 140.85',
    backdrop: 'Contact',
    title: { before: 'Join The ', accent: 'Team', after: '' },
    intro: "Got a project in mind? Let's talk! I'm always open to new opportunities and collaborations.",
    pitch: { before: "Let's steal something ", accent: 'amazing', after: ' together' },
    body:
      "Whether you have an idea you want to bring to life or need a hand with an existing project, I'd love to hear from you.",
    emailLabel: 'Email',
    emailValue: 'logijavier@gmail.com',
    locationLabel: 'Location',
    locationValue: 'Neiva, Huila, Colombia',
    localTimeLabel: 'COLOMBIA TIME',
    follow: 'FOLLOW THE THIEVES',
    formHint: 'fill in your request for cooperation',
    cardHeader: 'COOPERATION NOTICE // CALLING CARD',
    badge: 'MISSION REQUEST',
    categoryLabel: 'CONTRACT TYPE',
    categories: {
      project: 'New Project',
      work: 'Job Offer',
      collab: 'Collaboration',
      inquiry: 'Quick Inquiry',
    },
    senderTag: 'SENDER / CODENAME',
    emailTag: 'FREQUENCY / EMAIL',
    subjectTag: 'TARGET / SUBJECT',
    subjectPlaceholder: 'E.g. Full-Stack Web App Development',
    messageTag: 'MISSION BRIEFING / MESSAGE',
    name: 'Your Name',
    namePlaceholder: 'Your name or codename',
    email: 'Your Email',
    emailPlaceholder: 'your-email@example.com',
    message: 'Your Message',
    messagePlaceholder: 'Describe mission briefing, scope, goals and expected timeframe...',
    chars: 'chars',
    send: 'SEND REQUEST',
    sending: 'TRANSMITTING TO METAVERSE...',
    sent: 'REQUEST SENT!',
    successTitle: 'TARGET IDENTIFIED!',
    successStamp: 'REQUEST ACCEPTED',
    successMsg: 'Your request has been successfully transmitted to the Phantom Thieves. Javier will reply to your frequency in less than 24 hours.',
    sendAnother: 'SEND ANOTHER REQUEST',
    errorTitle: 'TRANSMISSION ERROR',
    retry: 'RETRY TRANSMISSION',
    copyEmail: 'Copy email',
    copiedEmail: 'COPIED!',
    statusLabel: 'CONFIDANT STATUS',
    statusActive: 'AVAILABLE FOR CONTRACT',
    responseTimeLabel: 'RESPONSE TIME',
    responseTime: '< 24 HOURS',
    confidantRank: 'COOP RANK',
    confidantMax: 'RANK 10 — MAX',
    directContact: 'DIRECT CHANNEL',
    simulationNotice: 'Simulation mode: to send real emails, add RESEND_API_KEY to your .env file.',
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
