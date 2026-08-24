import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import SplitType from 'split-type';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * A headline whose words rise into place one after another as it scrolls
 * into view, instead of arriving as one block.
 *
 * The server (and the pre-JS client) render plain text — exactly what the
 * prerendered HTML already contains, so there's nothing here for a crawler
 * to miss. split-type only rewrites the DOM into word spans after mount, as
 * a progressive enhancement; if that fails to load, the heading is still
 * there, just static. Reduced-motion skips the split entirely.
 */
export function SplitReveal({ as: Tag = 'h2', className = '', children, ...rest }) {
  // motion.h1/h2 etc. so a caller can also pass layoutId for a shared-element
  // transition on the same headline — falls back to the plain tag for
  // anything motion doesn't have a preset for.
  const MotionTag = motion[Tag] ?? Tag;
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [split, setSplit] = useState(false);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  useEffect(() => {
    if (reduced || !ref.current) return undefined;

    const instance = new SplitType(ref.current, { types: 'words' });
    setSplit(true);

    return () => {
      instance.revert();
      setSplit(false);
    };
  }, [reduced, children]);

  useEffect(() => {
    if (!split || !inView || !ref.current) return;

    const words = ref.current.querySelectorAll('.word');
    words.forEach((word, i) => {
      word.style.transitionDelay = `${i * 35}ms`;
    });

    // One frame so the delay assignments above land before the class flips —
    // otherwise the browser can coalesce both into a single paint and skip
    // the stagger.
    requestAnimationFrame(() => {
      ref.current?.classList.remove('split-reveal--pending');
    });
  }, [split, inView]);

  return (
    <MotionTag
      ref={ref}
      className={`split-reveal ${split ? 'split-reveal--pending' : ''} ${className}`}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
