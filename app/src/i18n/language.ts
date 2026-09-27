export type Language = 'en' | 'es';

export const LANGUAGES: Language[] = ['en', 'es'];

const STORAGE_KEY = 'ja-lang';

const isLanguage = (value: unknown): value is Language => value === 'en' || value === 'es';

/** Saved choice first, then the browser's preferred languages in order, else English. */
export const detectLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    /* storage blocked: fall through to the browser preference */
  }

  const preferences = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferences) {
    const base = tag?.toLowerCase().split('-')[0];
    if (isLanguage(base)) return base;
  }
  return 'en';
};

export const saveLanguage = (lang: Language) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* the choice just won't persist */
  }
};
