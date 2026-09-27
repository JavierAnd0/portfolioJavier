import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/context';
import { LANGUAGES } from '@/i18n/language';

interface LanguageSwitchProps {
  /** `hud` is the larger tag used on the start screen; `bar` fits the status bar. */
  variant?: 'hud' | 'bar';
  className?: string;
}

const LanguageSwitch = ({ variant = 'hud', className }: LanguageSwitchProps) => {
  const { lang, setLang, t } = useI18n();
  const hud = variant === 'hud';

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn('flex items-center', hud ? '-rotate-3 gap-1.5' : 'gap-1', className)}
    >
      {LANGUAGES.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={t.language.names[code]}
            title={t.language.names[code]}
            onClick={() => setLang(code)}
            className={cn(
              'font-heavy leading-none tracking-[0.08em] transition-transform',
              hud ? 'px-2.5 py-1.5 text-xs md:text-sm' : 'px-1.5 py-1 text-[10px]',
              active
                ? cn('bg-white text-black', hud ? 'shadow-[3px_3px_0_#e60012]' : '')
                : cn(
                    'text-white/60 hover:-rotate-3 hover:text-white',
                    hud ? 'border-2 border-white/50 bg-black' : 'border border-white/25',
                  ),
            )}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitch;
