import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DesignedWord from './DesignedWord';
import type { DesignedWordData, WordName } from './words.generated';
import type { Language } from '@/i18n/language';
import { useI18n } from '@/i18n/context';

const TIMEZONE = 'America/Bogota';

// Weekday artwork file per language, keyed by the short English weekday Intl returns.
const WEEKDAY_FILES: Record<string, Record<Language, string>> = {
  Mon: { es: 'es-lunes', en: 'en-monday' },
  Tue: { es: 'es-martes', en: 'en-tuesday' },
  Wed: { es: 'es-miercoles', en: 'en-wednesday' },
  Thu: { es: 'es-jueves', en: 'en-thursday' },
  Fri: { es: 'es-viernes', en: 'en-friday' },
  Sat: { es: 'es-sabado', en: 'en-saturday' },
  Sun: { es: 'es-domingo', en: 'en-sunday' },
};

// Each weekday is its own chunk, so the page only downloads today's lettering.
const weekdayArt = import.meta.glob<DesignedWordData>('./days/*.json', { import: 'default' });

const useWeekdayArt = (file: string) => {
  const [art, setArt] = useState<{ file: string; data: DesignedWordData } | null>(null);
  useEffect(() => {
    let live = true;
    weekdayArt[`./days/${file}.json`]?.().then((data) => live && setArt({ file, data }));
    return () => {
      live = false;
    };
  }, [file]);
  return art?.file === file ? art.data : null;
};

type PeriodKey = 'lateNight' | 'morning' | 'afternoon' | 'evening';

const PERIODS: { from: number; key: PeriodKey }[] = [
  { from: 0, key: 'lateNight' },
  { from: 5, key: 'morning' },
  { from: 12, key: 'afternoon' },
  { from: 18, key: 'evening' },
  { from: 22, key: 'lateNight' },
];

const readClock = (locale: string, timestamp: number) => {
  const now = new Date(timestamp);
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const hour = Number(get('hour'));
  const weekday = new Intl.DateTimeFormat(locale, { timeZone: TIMEZONE, weekday: 'short' })
    .format(now)
    .replace('.', '')
    .toUpperCase();
  return {
    month: get('month'),
    day: get('day'),
    weekday,
    weekdayKey: get('weekday'),
    period: [...PERIODS].reverse().find((p) => hour >= p.from)?.key ?? 'morning',
  };
};

// Digits lettered in Figma, set side by side and overlapping a little like cut-outs.
const Digits = ({ value }: { value: string }) => (
  <span className="flex items-end">
    {[...value].map((digit, i) => (
      <DesignedWord
        key={i}
        name={`numero/${digit}` as WordName}
        label={digit}
        className={i > 0 ? '-ml-[0.14em]' : undefined}
      />
    ))}
  </span>
);

/** P5-style calendar widget showing the date and time of day in Colombia. */
const CalendarHud = ({ ready }: { ready: boolean }) => {
  const { t, lang } = useI18n();
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const clock = readClock(t.locale, now);

  // Colombia writes day/month; the game's M/D stays for English.
  const [first, second] = lang === 'es' ? [clock.day, clock.month] : [clock.month, clock.day];
  const period = t.calendar.periods[clock.period];
  const dayArt = useWeekdayArt(WEEKDAY_FILES[clock.weekdayKey]?.[lang] ?? '');

  return (
    <motion.div
      className="relative inline-flex select-none flex-col items-start"
      initial={{ x: -80, opacity: 0, rotate: -14 }}
      animate={ready ? { x: 0, opacity: 1, rotate: -7 } : undefined}
      transition={{ type: 'spring', stiffness: 380, damping: 26, delay: 0.05 }}
      aria-label={t.calendar.today(`${clock.weekday} ${first}/${second}`, period)}
      role="img"
    >
      <div className="flex items-end gap-[0.12em] text-[3.1rem] md:text-[4.4rem]">
        <Digits value={first} />
        <DesignedWord name="numero/barra" label="/" className="-mx-[0.1em]" />
        <Digits value={second} />
      </div>

      {/* Full weekday under the numbers, like "TUESDAY" in the game; space is held while it loads. */}
      <div className="-mt-[0.45em] ml-[0.5em] min-h-[1.25em] -rotate-3 text-[1.45rem] md:text-[2rem]">
        {dayArt && <DesignedWord data={dayArt} label={clock.weekday} animateIn delay={0.15} />}
      </div>
    </motion.div>
  );
};

export default CalendarHud;
