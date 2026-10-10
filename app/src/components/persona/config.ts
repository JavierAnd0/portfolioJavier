import type { Dictionary } from '@/i18n/en';
import type { Language } from '@/i18n/language';
import type { WordName } from './words.generated';

export type MenuKey = keyof Dictionary['menu'];

type StemOf<T> = T extends `${infer Stem}/normal` ? Stem : never;
type WordStem = StemOf<WordName>;

// 215 Figma px make one em, so every word scales with its container's font size.
export const EM_PER_UNIT = 1 / 215;

export const wordFor = (stem: WordStem, selected: boolean) =>
  `${stem}/${selected ? 'seleccionada' : 'normal'}` as WordName;

export interface PauseMenuItem {
  key: MenuKey;
  href: string;
  /** Figma-lettered artwork per language; the selected state swaps the last segment. */
  words: Record<Language, WordStem>;
  /** Fan spoke angle in degrees; positive tips the word's left end upward. */
  angle: number;
  /** Gap between the word's right end and the fan pivot, in em. */
  reach: number;
  external?: boolean;
}

export const MENU_ITEMS: PauseMenuItem[] = [
  {
    key: 'about',
    href: '#about',
    words: { en: 'menu/en/profile', es: 'menu/es/perfil' },
    angle: 26,
    reach: 3.7,
  },
  {
    key: 'projects',
    href: '#projects',
    words: { en: 'menu/en/targets', es: 'menu/es/objetivos' },
    angle: 13,
    reach: 4.1,
  },
  {
    key: 'skills',
    href: '#skills',
    words: { en: 'menu/en/skills', es: 'menu/es/habilidades' },
    angle: 0,
    reach: 4.4,
  },
  {
    key: 'contact',
    href: '#contact',
    words: { en: 'menu/en/request', es: 'menu/es/solicitud' },
    angle: -13,
    reach: 4.1,
  },
  {
    key: 'github',
    href: 'https://github.com/JavierAnd0',
    // Same spelling in both languages, so one lettering serves both.
    words: { en: 'menu/es/github', es: 'menu/es/github' },
    angle: -26,
    reach: 3.8,
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
