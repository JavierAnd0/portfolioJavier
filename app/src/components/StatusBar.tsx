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

const Asterisk = ({ isWorking }: { isWorking: boolean }) => (
  <motion.span
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    className="inline-block text-base leading-none"
    style={{ color: isWorking ? '#4ade80' : '#ff0000' }}
  >
    ✳
  </motion.span>
);

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
      transition={{ duration: 0.6, delay: 2.2 }}
      className="fixed bottom-0 left-0 right-0 z-40 h-8 bg-[#080808] border-t border-white/[0.06] flex items-center justify-between px-4 md:px-6 select-none"
      style={{ fontFamily: "'Geist Mono', monospace" }}
    >
      {/* Left — Contact */}
      <button
        onClick={scrollToContact}
        className="group flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-white/30 hover:text-white/60 transition-colors duration-200"
      >
        <span className="text-white/15 group-hover:text-red transition-colors duration-200">\</span>
        <span>CONTACT</span>
      </button>

      {/* Center — Clock */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/25">
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
        <span className="text-white/10">{TIMEZONE_LABEL}</span>
      </div>

      {/* Right — Work status */}
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest">
        <span className={time.isWorking ? 'text-green-400/60' : 'text-white/25'}>
          {time.isWorking ? 'IN WORK' : 'OFF WORK'}
        </span>
        <Asterisk isWorking={time.isWorking} />
      </div>
    </motion.div>
  );
};
