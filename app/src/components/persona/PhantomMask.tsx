import { useId } from 'react';

// Cat-eye domino mask: flared tips, dipped bridge, narrow slanted eyes.
const MASK_OUTLINE =
  'M0 70L70 78C140 58 225 70 272 108C288 118 312 118 328 108C375 70 460 58 530 78L600 70C588 150 540 222 452 226C392 228 350 200 320 176C308 168 292 168 280 176C250 200 208 228 148 226C60 222 12 150 0 70Z';
const LEFT_EYE = 'M92 128C128 100 200 102 244 138C206 168 128 168 92 128Z';
const RIGHT_EYE = 'M508 128C472 100 400 102 356 138C394 168 472 168 508 128Z';

/** Original domino-mask emblem drawn for the hero (not a game asset). */
const PhantomMask = ({ className }: { className?: string }) => {
  const dots = useId();

  return (
    <svg viewBox="-24 30 648 230" className={className} aria-hidden="true">
      <defs>
        <pattern id={dots} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <circle cx="4.5" cy="4.5" r="2.2" fill="#ffffff" />
        </pattern>
      </defs>

      {/* offset halftone shadow */}
      <path
        d={`${MASK_OUTLINE}${LEFT_EYE}${RIGHT_EYE}`}
        fillRule="evenodd"
        fill={`url(#${dots})`}
        opacity="0.35"
        transform="translate(-18 18)"
      />
      <path
        d={`${MASK_OUTLINE}${LEFT_EYE}${RIGHT_EYE}`}
        fillRule="evenodd"
        fill="#0a0a0a"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* ink highlights */}
      <g fill="none" stroke="#ffffff" strokeLinecap="round">
        <path d="M40 92C100 76 170 76 226 98" strokeWidth="7" />
        <path d="M374 98C430 76 500 76 560 92" strokeWidth="7" />
        <path d="M84 188C112 208 150 214 184 208" strokeWidth="3.5" opacity="0.75" />
        <path d="M416 208C450 214 488 208 516 188" strokeWidth="3.5" opacity="0.75" />
      </g>
    </svg>
  );
};

export default PhantomMask;
