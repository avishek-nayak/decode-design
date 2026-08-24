import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * A checkmark that draws itself in — the circle traces first, then the tick.
 * Used at the one or two moments a business outcome actually lands (an
 * enquiry sent, a payment confirmed), so it earns the attention.
 *
 * Renders fully drawn and static under reduced motion.
 */
export function DrawCheck({ size = 44, className }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.circle
        cx="20"
        cy="20"
        r="19"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.55, ease: 'easeInOut' }}
      />
      <motion.path
        d="M12 20.5l5.2 5.2L28.5 14.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduced ? 0 : 0.35,
          ease: 'easeInOut',
          delay: reduced ? 0 : 0.4,
        }}
      />
    </motion.svg>
  );
}
