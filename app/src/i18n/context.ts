import { createContext, useContext } from 'react';
import type { Dictionary } from './en';
import type { Language } from './language';

export interface I18nValue {
  lang: Language;
  t: Dictionary;
  setLang: (lang: Language) => void;
}

export const I18nContext = createContext<I18nValue | null>(null);

export const useI18n = () => {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
};
