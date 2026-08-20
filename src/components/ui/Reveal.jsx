import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll reveal: 12px rise + fade, staggered across siblings via `index`.
 *
 * Collapses to a plain, instantly-visible element when the user prefers
 * reduced motion — no transform, no transition, nothing to sit through.
 */
/**
 * Fire as soon as any part of the element enters, held back slightly by a
 * bottom margin so the motion is actually seen.
 *
 * Deliberately not a percentage: an element taller than ~4x the viewport can
 * never have 25% of itself on screen at once, so a threshold-based trigger
 * leaves long sections — the privacy policy, course curricula — permanently
 * invisible.
 */
const VIEWPORT = { once: true, margin: '0px 0px -12% 0px', amount: 'some' };

export function Reveal({
  as = 'div',
  index = 0,
  delay = 0,
  viewport = VIEWPORT,
  className,
  children,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: 0.48,
        ease: EASE,
        delay: delay + index * 0.06,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
