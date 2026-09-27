import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RansomText from './RansomText';

const TIMEZONE = 'America/Bogota';

const PERIODS = [
  { from: 0, label: 'LATE NIGHT' },
  { from: 5, label: 'MORNING' },
  { from: 12, label: 'AFTERNOON' },
  { from: 18, label: 'EVENING' },
  { from: 22, label: 'LATE NIGHT' },
];

const readClock = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const hour = Number(get('hour'));
  const period = [...PERIODS].reverse().find((p) => hour >= p.from)?.label ?? 'MORNING';
  return {
    month: get('month'),
    day: get('day'),
    weekday: get('weekday').toUpperCase(),
    period,
    isWeekend: ['SAT', 'SUN'].includes(get('weekday').toUpperCase()),
  };
};

/** P5-style calendar widget showing the date and time of day in Colombia. */
const CalendarHud = ({ ready }: { ready: boolean }) => {
  const [clock, setClock] = useState(readClock);

  useEffect(() => {
    const id = setInterval(() => setClock(readClock()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="relative inline-flex select-none flex-col items-start"
      initial={{ x: -80, opacity: 0, rotate: -14 }}
      animate={ready ? { x: 0, opacity: 1, rotate: -7 } : undefined}
      transition={{ type: 'spring', stiffness: 380, damping: 26, delay: 0.05 }}
      aria-label={`Hoy en Colombia: ${clock.weekday} ${clock.month}/${clock.day}, ${clock.period}`}
      role="img"
    >
      <div className="flex items-end gap-[0.12em] text-[3.1rem] md:text-[4.4rem]">
        <RansomText text={clock.month} uniformFont="Anton" />
        <span
          aria-hidden="true"
          className="mb-[0.1em] h-[0.8em] w-[0.12em] rotate-[24deg] bg-white shadow-[-3px_3px_0_#0a0a0a]"
        />
        <RansomText text={clock.day} uniformFont="Anton" />
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
          {clock.period}
        </span>
        <span className="font-mono text-[0.6rem] font-bold text-black/50">COL</span>
      </div>
    </motion.div>
  );
};

export default CalendarHud;
