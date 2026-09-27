import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WORK_START = 8;
const WORK_END = 18;
const TIMEZONE = 'America/Bogota';
const TIMEZONE_LABEL = 'GMT-5';

const getColombiaTime = () => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const hour = parts.find(p => p.type === 'hour')?.value ?? '00';
  const minute = parts.find(p => p.type === 'minute')?.value ?? '00';
  const hourNum = parseInt(hour, 10);
  const isWorking = hourNum >= WORK_START && hourNum < WORK_END;
  return { hour, minute, isWorking };
};

export const StatusBar = () => {
  const [time, setTime] = useState(getColombiaTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getColombiaTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.4 }}
      className="fixed bottom-0 left-0 right-0 z-40 h-9 bg-black border-t-2 border-red flex items-center justify-between px-4 md:px-6 select-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Left — Contact */}
      <button
        onClick={scrollToContact}
        className="group hidden items-center gap-1.5 font-mono text-[11px] tracking-widest text-white/40 transition-colors duration-200 hover:text-red sm:flex"
      >
        <span className="text-red">▸</span>
        <span>REQUEST COOPERATION</span>
      </button>

      {/* Center — Clock */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/40">
        <span>
          {time.hour}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            {' '}
          </motion.span>
          {time.minute}
        </span>
        <span className="text-white/20">{TIMEZONE_LABEL}</span>
      </div>

      {/* Right — Work status */}
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest">
        <span className={time.isWorking ? 'text-red' : 'text-white/30'}>
          {time.isWorking ? 'ON DUTY' : 'OFF DUTY'}
        </span>
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="inline-block text-sm leading-none text-red"
        >
          ✦
        </motion.span>
      </div>
    </motion.div>
  );
};
