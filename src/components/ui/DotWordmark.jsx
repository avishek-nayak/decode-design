import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { useDotWordmark } from '@/hooks/useDotWordmark';

/**
 * The intro overlay's wordmark treatment: a hollow stencil outline of
 * `text` that a field of dots rains down and settles into, revealing the
 * name — then ripples outward from the pointer once fully settled.
 *
 * Decorative only (`aria-hidden`) — the dialog and its button already
 * carry the real accessible name via `aria-label`, so this never needs to
 * duplicate the text for screen readers.
 */
export function DotWordmark({ text, layoutId, className, active, onPhaseChange }) {
  const stencilRef = useRef(null);
  const { canvasRef, phase } = useDotWordmark({ text, active, stencilRef });

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  return (
    <motion.div layoutId={layoutId} className={clsx('dot-wordmark', className)} aria-hidden="true">
      <span ref={stencilRef} className="dot-wordmark__stencil">
        {text}
      </span>
      <canvas ref={canvasRef} className="dot-wordmark__canvas" />
    </motion.div>
  );
}
