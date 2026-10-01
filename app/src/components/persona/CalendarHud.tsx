import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DesignedWord from './DesignedWord';
import type { WordName } from './words.generated';
import { useI18n } from '@/i18n/context';

const TIMEZONE = 'America/Bogota';

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
    period: [...PERIODS].reverse().find((p) => hour >= p.from)?.key ?? 'morning',
    isWeekend: ['Sat', 'Sun'].includes(get('weekday')),
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
        <span
          aria-hidden="true"
          className={`mb-[0.18em] ml-[0.08em] -rotate-3 px-[0.22em] py-[0.02em] font-heavy text-[0.3em] leading-tight text-white shadow-[3px_3px_0_#0a0a0a] ${
            clock.isWeekend ? 'bg-[#e60012]' : 'bg-black outline outline-2 outline-white'
          }`}
        >
          {clock.weekday}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="-mt-1 ml-3 flex items-center gap-2 bg-white px-3 py-[3px] shadow-[4px_4px_0_#0a0a0a] [clip-path:polygon(0_0,100%_0,94%_100%,4%_100%)]"
      >
        <span className="text-[0.7rem] text-[#e60012]">★</span>
        <span className="font-heavy text-[0.8rem] tracking-[0.08em] text-black md:text-sm">
          {period}
        </span>
        <span className="font-mono text-[0.6rem] font-bold text-black/50">COL</span>
      </div>
    </motion.div>
  );
};

export default CalendarHud;
