import clsx from 'clsx';
import { motion } from 'motion/react';

const WORDMARK = 'Decode.designers';
const WORDMARK_WEIGHTS = [400, 500, 600, 700];

/**
 * "Decode.designers" set in Outfit, each letter at a different weight —
 * regular through bold, cycling — so the wordmark itself reads as a
 * decoding gradient rather than a single static logotype.
 *
 * Shared between the header and the first-load intro sequence: passing the
 * same `layoutId` to both lets Motion morph one into the other when the
 * intro dismisses, instead of the header logo just appearing.
 */
export function Wordmark({ layoutId, className, text = WORDMARK }) {
  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden="true"
      className={clsx('wordmark', className)}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{ fontWeight: WORDMARK_WEIGHTS[i % WORDMARK_WEIGHTS.length] }}
        >
          {char}
        </span>
      ))}
    </motion.span>
  );
}
