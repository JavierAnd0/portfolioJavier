import type { Dictionary } from '@/i18n/en';
import type { Language } from '@/i18n/language';

export type MenuKey = keyof Dictionary['menu'];

export interface PauseMenuItem {
  key: MenuKey;
  href: string;
  /** Per-language seed picked by eye so each word reads cleanly. */
  seeds: Record<Language, number>;
  /** Fan spoke angle in degrees; positive tips the word's left end upward. */
  angle: number;
  /** Gap between the word's right end and the fan pivot, in em. */
  reach: number;
  external?: boolean;
}

export const MENU_ITEMS: PauseMenuItem[] = [
  { key: 'about', href: '#about', seeds: { en: 85, es: 85 }, angle: 26, reach: 3.7 },
  { key: 'projects', href: '#projects', seeds: { en: 204, es: 85 }, angle: 13, reach: 4.1 },
  { key: 'skills', href: '#skills', seeds: { en: 85, es: 187 }, angle: 0, reach: 4.4 },
  { key: 'contact', href: '#contact', seeds: { en: 85, es: 119 }, angle: -13, reach: 4.1 },
  {
    key: 'github',
    href: 'https://github.com/JavierAnd0',
    seeds: { en: 85, es: 85 },
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
