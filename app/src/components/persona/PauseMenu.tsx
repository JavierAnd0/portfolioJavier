import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import DesignedWord from './DesignedWord';
import { MENU_ITEMS, wordFor, wordWidthEm } from './config';
import type { WordName } from './words.generated';
import { useI18n } from '@/i18n/context';

const isTypingTarget = (el: EventTarget | null) =>
  el instanceof HTMLElement &&
  (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

// Neighbours swing this far away from the selected spoke to give it room.
const SPREAD = 4;
// The selected word grows toward the fan's centre; long words grow only up to this width.
const MAX_SELECTED_EM = 5;

// Fan box in em; the pivot sits on its right edge, vertically centered.
const FAN_WIDTH = 12;
const FAN_HEIGHT = 9;

// Slab with depth: black extrusion down-left, white face, red block kicked up-right.
const SelectionPlate = () => (
  <motion.span
    aria-hidden="true"
    className="pointer-events-none absolute -inset-y-[0.14em] -left-[0.45em] -right-[0.35em] -z-10"
    initial={{ scaleX: 0, skewX: -25, opacity: 0 }}
    animate={{ scaleX: [0, 1.12, 1], skewX: [-25, 4, 0], opacity: 1 }}
    transition={{ duration: 0.28, times: [0, 0.65, 1], ease: 'easeOut' }}
    style={{ transformOrigin: '0% 50%' }}
  >
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
      <g className="plate-boil">
        <polygon points="14,-7 106,-11 103,24 10,28" fill="#e60012" />
      </g>
      <polygon points="-4,9 96,6 93,46 -7,47" fill="#0a0a0a" />
      <polygon points="1,2 100,0 97,38 -2,40" fill="#0a0a0a" />
      <g className="plate-boil plate-boil--alt">
        <polygon points="3,4.5 97.5,2.5 94.5,35.5 0.5,37.5" fill="#ffffff" />
      </g>
    </svg>
  </motion.span>
);

// Numbered arrow pointing at the selection, like the game's side counters.
const Cursor = ({ index }: { index: number }) => (
  <motion.span
    aria-hidden="true"
    className="pointer-events-none absolute right-full top-1/2 z-20 mr-[0.6em] -translate-y-1/2"
    initial={{ x: '-0.8em', opacity: 0, rotate: -20 }}
    animate={{ x: ['0em', '-0.12em', '0em'], opacity: 1, rotate: 0 }}
    transition={{
      x: { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.25 },
      opacity: { duration: 0.1 },
      rotate: { type: 'spring', stiffness: 500, damping: 14 },
    }}
  >
    {/* Numbered arrow drawn in Figma ("seleccion/1" … "seleccion/5"). */}
    <DesignedWord name={`seleccion/${index + 1}` as WordName} label="" className="text-[2.2em]" />
  </motion.span>
);

const HintTag = ({ text }: { text: string }) => (
  <motion.span
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-[0.34em] right-[-0.2em] z-10 whitespace-nowrap rounded-full border-2 border-white bg-black px-[0.55em] py-[0.12em] font-sans text-[0.2em] font-bold italic tracking-wide text-white shadow-[3px_3px_0_#e60012]"
    initial={{ scale: 0, rotate: -30 }}
    animate={{ scale: 1, rotate: -9 }}
    transition={{ duration: 0.22, delay: 0.12, ease: [0.34, 1.56, 0.64, 1] }}
  >
    {text}
  </motion.span>
);

interface PauseMenuProps {
  /** Items fan open once the intro has finished. */
  ready: boolean;
  /** Keyboard shortcuts only listen while the menu is on screen. */
  keyboardEnabled: boolean;
  onNavigate?: () => void;
}

const PauseMenu = ({ ready, keyboardEnabled, onNavigate }: PauseMenuProps) => {
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // After the opening flourish, selection changes animate without stagger delays.
  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(() => setOpened(true), 1200);
    return () => window.clearTimeout(id);
  }, [ready]);

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

  const middle = (MENU_ITEMS.length - 1) / 2;

  return (
    <nav
      aria-label={t.a11y.mainMenu}
      className="pause-menu relative"
      style={{ width: `${FAN_WIDTH}em`, height: `${FAN_HEIGHT}em` }}
    >
      {/* Dark mass behind the fan gives the lettering something to sit on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[1.5em] top-1/2 h-[9em] w-[10em] -translate-y-1/2 rounded-[50%] bg-black/60 blur-[1.4em]"
      />

      <ul>
        {MENU_ITEMS.map((item, i) => {
          const isActive = active === i;
          const { label, hint } = t.menu[item.key];
          const word = wordFor(item.words[lang], isActive);
          const grow = Math.min(1.16, Math.max(1, MAX_SELECTED_EM / wordWidthEm(word)));
          const push = i === active ? 0 : i < active ? SPREAD : -SPREAD;
          const angle = item.angle + push;
          return (
            <motion.li
              key={item.key}
              className="absolute top-1/2 -mt-[0.5em] leading-none"
              style={{
                right: `${item.reach}em`,
                // Rotate every spoke around the shared pivot on the fan's right edge.
                transformOrigin: `calc(100% + ${item.reach}em) 50%`,
                zIndex: isActive ? 10 : 1,
              }}
              initial={{ rotate: 0, opacity: 0, scale: 0.7 }}
              animate={ready ? { rotate: angle, opacity: 1, scale: 1 } : undefined}
              transition={{
                type: 'spring',
                stiffness: opened ? 380 : 120,
                damping: opened ? 22 : 13,
                delay: opened ? 0 : 0.1 + Math.abs(i - middle) * 0.08,
              }}
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
                {isActive && <Cursor key={`cursor-${i}`} index={i} />}
                {/* The plate rides inside the scaled word so it always covers every letter. */}
                <motion.span
                  className="relative isolate inline-block"
                  style={{ transformOrigin: '100% 60%' }}
                  animate={
                    isActive
                      ? { scale: [1, grow + 0.1, grow], rotate: [0, -4, 0], x: '-0.1em' }
                      : { scale: 1, rotate: 0, x: 0 }
                  }
                  transition={
                    isActive
                      ? { duration: 0.32, times: [0, 0.55, 1], ease: 'easeOut' }
                      : { type: 'spring', stiffness: 500, damping: 30 }
                  }
                >
                  {isActive && <SelectionPlate key={`plate-${i}`} />}
                  <DesignedWord
                    key={isActive ? 'selected' : 'normal'}
                    name={word}
                    label={label}
                    pop={isActive && opened}
                  />
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
