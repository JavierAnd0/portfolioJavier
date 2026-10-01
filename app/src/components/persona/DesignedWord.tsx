import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EM_PER_UNIT } from './config';
import { WORDS, type WordName } from './words.generated';

const hidden = { opacity: 0, scale: 2.4, rotate: -25 };
const shown = { opacity: 1, scale: 1, rotate: 0, y: 0 };

interface DesignedWordProps {
  name: WordName;
  /** Read by screen readers in place of the artwork. */
  label: string;
  className?: string;
  /** Slap the letters on one by one. */
  animateIn?: boolean;
  /** With animateIn: hold the letters hidden until this turns true. */
  play?: boolean;
  delay?: number;
  /** On mount, the letters hop once, staggered left to right. */
  pop?: boolean;
}

/** A word lettered by hand in Figma, rendered as SVG with one animatable layer per letter. */
const DesignedWord = ({
  name,
  label,
  className,
  animateIn = false,
  play = true,
  delay = 0,
  pop = false,
}: DesignedWordProps) => {
  const { viewBox, letters } = WORDS[name];
  const [, , width, height] = viewBox;

  return (
    <span className={cn('inline-block align-middle leading-none', className)}>
      <span className="sr-only">{label}</span>
      <svg
        aria-hidden="true"
        viewBox={viewBox.join(' ')}
        className="block overflow-visible"
        style={{ width: `${width * EM_PER_UNIT}em`, height: `${height * EM_PER_UNIT}em` }}
      >
        {letters.map(({ markup, rank }, i) => (
          <motion.g
            key={i}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 60%' }}
            initial={animateIn ? hidden : pop ? shown : false}
            animate={
              animateIn && !play
                ? hidden
                : pop
                  ? { opacity: 1, scale: [1, 1.18, 1], rotate: [0, -10, 0], y: [0, -24, 0] }
                  : shown
            }
            transition={
              pop
                ? { duration: 0.34, delay: 0.06 + rank * 0.03, ease: 'easeOut' }
                : animateIn
                  ? { duration: 0.32, delay: delay + rank * 0.045, ease: [0.34, 1.56, 0.64, 1] }
                  : { duration: 0 }
            }
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        ))}
      </svg>
    </span>
  );
};

export default DesignedWord;
