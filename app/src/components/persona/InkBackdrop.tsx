import { useId } from 'react';
import { motion } from 'framer-motion';

/**
 * Manga-ink backdrop: posterized grey washes, patches of cross-hatching and a
 * ragged red brush band down the middle. All procedural (SVG filters), no bitmaps.
 */
const InkBackdrop = ({ ready }: { ready: boolean }) => {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${name}-${uid}`;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#161616]">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          {/* Posterized noise → flat grey ink washes. */}
          <filter id={id('wash')} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.009" numOctaves="4" seed="7" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1" />
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0.06 0.075 0.09 0.11 0.135 0.1 0.07" />
              <feFuncG type="discrete" tableValues="0.06 0.075 0.09 0.11 0.135 0.1 0.07" />
              <feFuncB type="discrete" tableValues="0.06 0.075 0.09 0.11 0.135 0.1 0.07" />
            </feComponentTransfer>
          </filter>

          {/* Keeps the hatch pattern only where the noise crosses a threshold. */}
          <filter id={id('hatchMask')} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.004" numOctaves="3" seed="21" result="n" />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  9 0 0 0 -4.6"
              result="mask"
            />
            <feComposite in="SourceGraphic" in2="mask" operator="in" />
          </filter>

          <pattern id={id('hatchA')} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
            <rect width="1.6" height="7" fill="#000" fillOpacity="0.55" />
          </pattern>
          <pattern id={id('hatchB')} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(52)">
            <rect width="1.2" height="9" fill="#3a3a3a" />
          </pattern>

          <pattern id={id('dots')} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.8" fill="#000" fillOpacity="0.45" />
          </pattern>
          <linearGradient id={id('dotFade')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id={id('dotMask')}>
            <rect width="100%" height="100%" fill={`url(#${id('dotFade')})`} />
          </mask>
        </defs>

        <rect width="100%" height="100%" filter={`url(#${id('wash')})`} />
        <rect width="100%" height="100%" fill={`url(#${id('hatchA')})`} filter={`url(#${id('hatchMask')})`} />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id('hatchB')})`}
          filter={`url(#${id('hatchMask')})`}
          opacity="0.6"
        />
      </svg>

      {/* Red brush band — its own SVG so it can use a 0–100 viewBox. */}
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={ready ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
        transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
      >
        <defs>
          {/* Ragged brush edge; numbers are in this SVG's 0–100 units. */}
          <filter id={id('brush')} x="-10%" y="-5%" width="120%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.22 0.035" numOctaves="3" seed="4" result="t" />
            <feDisplacementMap in="SourceGraphic" in2="t" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g filter={`url(#${id('brush')})`}>
          <polygon points="43,-5 71,-5 64,105 36,105" fill="#d8001a" />
          <polygon points="47,-5 66,-5 60,105 40,105" fill="#e60012" />
        </g>
        <polygon points="36,40 71,20 71,105 36,105" fill={`url(#${id('dots')})`} mask={`url(#${id('dotMask')})`} />
      </motion.svg>
    </div>
  );
};

export default InkBackdrop;
