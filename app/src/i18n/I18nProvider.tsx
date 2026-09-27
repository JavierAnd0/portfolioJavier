import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import en from './en';
import es from './es';
import { I18nContext } from './context';
import { detectLanguage, saveLanguage, type Language } from './language';

const DICTIONARIES = { en, es };

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(detectLanguage);
  const t = DICTIONARIES[lang];

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    saveLanguage(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
