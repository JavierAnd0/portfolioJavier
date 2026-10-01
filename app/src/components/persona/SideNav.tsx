import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MENU_ITEMS } from './config';
import { useI18n } from '@/i18n/context';

const SECTION_ITEMS = MENU_ITEMS.filter((item) => !item.external);

/** Vertical quick-nav on desktop; only shown once the pause menu has scrolled away. */
const SideNav = ({ visible }: { visible: boolean }) => {
  const { t } = useI18n();
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = SECTION_ITEMS.map((item) => document.querySelector(item.href)).filter(
      (el): el is Element => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label={t.a11y.sections}
          className="pointer-events-none fixed right-6 top-0 z-30 hidden h-full flex-col justify-center gap-7 lg:flex"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.25 }}
        >
          {SECTION_ITEMS.map((item) => {
            const isCurrent = current === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? 'location' : undefined}
                className={`group pointer-events-auto relative px-1.5 py-2 font-heavy text-[0.7rem] tracking-[0.22em] transition-colors ${
                  isCurrent ? 'bg-white text-black shadow-[3px_3px_0_#e60012]' : 'text-white/60 hover:text-white'
                }`}
                style={{ writingMode: 'vertical-rl' }}
              >
                {t.menu[item.key].label}
                <span className="sr-only"> — {t.menu[item.key].hint}</span>
              </a>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default SideNav;
