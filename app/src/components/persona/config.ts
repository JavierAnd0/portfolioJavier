export interface PauseMenuItem {
  label: string;
  hint: string;
  href: string;
  seed: number;
  /** Horizontal stagger in em, gives the cascading zig-zag. */
  offset: number;
  tilt: number;
  external?: boolean;
}

export const MENU_ITEMS: PauseMenuItem[] = [
  { label: 'PROFILE', hint: 'Sobre mí', href: '#about', seed: 85, offset: 1.5, tilt: -3 },
  { label: 'TARGETS', hint: 'Proyectos', href: '#projects', seed: 204, offset: 0.2, tilt: 2.5 },
  { label: 'SKILLS', hint: 'Habilidades', href: '#skills', seed: 85, offset: 1.9, tilt: -2 },
  { label: 'REQUEST', hint: 'Contacto', href: '#contact', seed: 85, offset: 0.7, tilt: 3 },
  {
    label: 'GITHUB',
    hint: 'Repositorios',
    href: 'https://github.com/JavierAnd0',
    seed: 85,
    offset: 2.3,
    tilt: -4,
    external: true,
  },
];

const SEEN_KEY = 'ja-intro-seen';

/** Play the intro only on the first visit of the session and when motion is welcome. */
export const shouldPlayIntro = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return true;
  }
};

export const markIntroSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage can be blocked; the intro just plays again */
  }
};
