import type { Dictionary } from '@/i18n/en';
import type { Language } from '@/i18n/language';

export type MenuKey = keyof Dictionary['menu'];

export interface PauseMenuItem {
  key: MenuKey;
  href: string;
  /** Per-language seed picked by eye so each word reads cleanly. */
  seeds: Record<Language, number>;
  /** Horizontal stagger in em, gives the cascading zig-zag. */
  offset: number;
  tilt: number;
  external?: boolean;
}

// Offsets trace a "(" arc like the P5 Strikers pause menu; tilts vary per word.
export const MENU_ITEMS: PauseMenuItem[] = [
  { key: 'about', href: '#about', seeds: { en: 85, es: 85 }, offset: 1.7, tilt: -7 },
  { key: 'projects', href: '#projects', seeds: { en: 204, es: 85 }, offset: 0.8, tilt: -3 },
  { key: 'skills', href: '#skills', seeds: { en: 85, es: 187 }, offset: 0.15, tilt: -9 },
  { key: 'contact', href: '#contact', seeds: { en: 85, es: 119 }, offset: 0.55, tilt: -4 },
  {
    key: 'github',
    href: 'https://github.com/JavierAnd0',
    seeds: { en: 85, es: 85 },
    offset: 1.5,
    tilt: -13,
    external: true,
  },
];

/**
 * Optional cut-out photo (transparent PNG/WebP in /public) for the start screen.
 * It gets the three-tone P5 treatment; with null an original silhouette is shown.
 */
export const PORTRAIT_SRC: string | null = null;

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
