import { motion } from 'framer-motion';
import DesignedWord from './DesignedWord';
import { MENU_ITEMS, wordFor, type MenuKey } from './config';
import { useI18n } from '@/i18n/context';

interface SectionHeadingProps {
  section: Exclude<MenuKey, 'github'>;
  intro?: string;
}

/**
 * Clean section header using the project's hand-lettered white Figma SVG
 * artwork (`DesignedWord`, `/normal` variant) directly on the dark surface.
 */
const SectionHeading = ({ section, intro }: SectionHeadingProps) => {
  const { t, lang } = useI18n();
  const item = MENU_ITEMS.find((entry) => entry.key === section) ?? MENU_ITEMS[0];
  const { label } = t.menu[section];
  const word = wordFor(item.words[lang], false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10"
    >
      <h2 className="inline-block -rotate-2 text-[clamp(2.4rem,6.5vw,4.2rem)] leading-none">
        <DesignedWord name={word} label={label} animateIn />
      </h2>

      {intro && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          {intro}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
