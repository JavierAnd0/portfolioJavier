import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RansomText from './RansomText';
import { MENU_ITEMS } from './config';
import { useI18n } from '@/i18n/context';

const isTypingTarget = (el: EventTarget | null) =>
  el instanceof HTMLElement &&
  (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

// White plate on a black shard, with a red wedge — kept inside the site palette.
const SelectionPlate = () => (
  <motion.span
    aria-hidden="true"
    className="pointer-events-none absolute -inset-y-[0.12em] -left-[0.5em] -right-[0.32em] -z-10"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 0.16, ease: [0.2, 0.9, 0.3, 1] }}
    style={{ transformOrigin: '0% 50%' }}
  >
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
      <g className="plate-boil">
        <polygon points="5,9 105,4 102,44 2,43" fill="#0a0a0a" />
      </g>
      <polygon points="1,3 99,1 96,38 -1,39" fill="#0a0a0a" />
      <g className="plate-boil plate-boil--alt">
        <polygon points="3,5 97,3 94,36 1,37" fill="#ffffff" />
      </g>
    </svg>
    {/* Red slashes live in their own tail so they never sit between letters. */}
    <svg
      viewBox="0 0 20 40"
      preserveAspectRatio="none"
      className="absolute -right-[0.34em] top-[0.1em] h-[calc(100%-0.2em)] w-[0.5em] overflow-visible"
    >
      <polygon points="0,1 20,0 17,40 -3,40" fill="#0a0a0a" />
      <polygon points="3,4 8,4 5,37 0,37" fill="#e60012" />
      <polygon points="11,3.5 16,3.4 13,36.6 8,36.8" fill="#e60012" />
    </svg>
  </motion.span>
);

const Cursor = ({ index }: { index: number }) => (
  <motion.span
    aria-hidden="true"
    className="pointer-events-none absolute right-full top-[18%] mr-[0.42em]"
    initial={{ x: -30, opacity: 0 }}
    animate={{ x: [0, -7, 0], opacity: 1 }}
    transition={{
      x: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' },
      opacity: { duration: 0.12 },
    }}
  >
    <svg viewBox="0 0 120 64" className="h-[0.62em] w-[1.16em] -rotate-6 overflow-visible">
      <polygon points="-4,14 78,6 118,34 76,62 -8,54" fill="#0a0a0a" />
      <polygon points="2,17 76,11 108,34 74,56 0,50" fill="#ffffff" />
      <text
        x="44"
        y="44"
        textAnchor="middle"
        fontFamily="Anton, sans-serif"
        fontSize="30"
        fill="#0a0a0a"
        transform="rotate(-4 44 34)"
      >
        No.{String(index + 1).padStart(2, '0')}
      </text>
    </svg>
  </motion.span>
);

const HintTag = ({ text }: { text: string }) => (
  <motion.span
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-[0.28em] right-[-0.5em] z-10 whitespace-nowrap rounded-full border-2 border-white bg-black px-[0.55em] py-[0.12em] font-sans text-[0.2em] font-bold italic tracking-wide text-white shadow-[3px_3px_0_#e60012]"
    initial={{ scale: 0, rotate: -30 }}
    animate={{ scale: 1, rotate: -9 }}
    transition={{ duration: 0.22, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }}
  >
    {text}
  </motion.span>
);

interface PauseMenuProps {
  /** Items slam in once the intro has finished. */
  ready: boolean;
  /** Keyboard shortcuts only listen while the menu is on screen. */
  keyboardEnabled: boolean;
  onNavigate?: () => void;
}

const PauseMenu = ({ ready, keyboardEnabled, onNavigate }: PauseMenuProps) => {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const move = useCallback((delta: number) => {
    setActive((current) => {
      const next = (current + delta + MENU_ITEMS.length) % MENU_ITEMS.length;
      const focused = document.activeElement;
      if (focused && linkRefs.current.includes(focused as HTMLAnchorElement)) {
        linkRefs.current[next]?.focus();
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!keyboardEnabled || !ready) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || isTypingTarget(e.target)) return;
      const key = e.key.toLowerCase();
      if (key === 'arrowdown' || key === 's') {
        e.preventDefault();
        move(1);
      } else if (key === 'arrowup' || key === 'w') {
        e.preventDefault();
        move(-1);
      } else if (key === 'enter' && !linkRefs.current.includes(e.target as HTMLAnchorElement)) {
        e.preventDefault();
        linkRefs.current[active]?.click();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keyboardEnabled, ready, active, move]);

  return (
    <nav aria-label={t.a11y.mainMenu} className="pause-menu">
      <ul className="flex flex-col gap-[0.1em]">
        {MENU_ITEMS.map((item, i) => {
          const isActive = active === i;
          const { label, hint } = t.menu[item.key];
          return (
            <motion.li
              key={item.key}
              className="relative"
              style={{ marginLeft: `${item.offset}em`, rotate: `${item.tilt}deg`, zIndex: isActive ? 10 : 1 }}
              initial={{ x: '60vw', opacity: 0, skewX: -20 }}
              animate={ready ? { x: 0, opacity: 1, skewX: 0 } : undefined}
              transition={{ type: 'spring', stiffness: 520, damping: 34, delay: 0.08 + i * 0.07 }}
            >
              <a
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={onNavigate}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${label} — ${hint}${item.external ? ` ${t.a11y.opensNewTab}` : ''}`}
                className="group relative isolate inline-block px-[0.08em] outline-none"
              >
                {isActive && <SelectionPlate key={`plate-${i}`} />}
                {isActive && <Cursor index={i} />}
                <motion.span
                  className="inline-block"
                  animate={{ scale: isActive ? 1.1 : 1, x: isActive ? '0.12em' : 0 }}
                  transition={{ type: 'spring', stiffness: 600, damping: 24 }}
                >
                  <RansomText text={label} seed={item.seeds[lang]} tone={isActive ? 'dark' : 'light'} />
                </motion.span>
                {isActive && <HintTag text={hint} />}
              </a>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PauseMenu;
