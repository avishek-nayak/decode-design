import { useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';
import { useBoldMotion } from './useBoldMotion';

const SPRING = { stiffness: 240, damping: 18, mass: 0.4 };

/**
 * Magnetic pull: the element leans toward the cursor within its own bounds,
 * and snaps back with a spring on leave. Returns motion-ready bind props —
 * spread them onto a `motion.*` element.
 *
 * No-ops (identity transform, no listeners) when useBoldMotion() is false,
 * so touch and reduced-motion users get a perfectly normal button.
 */
export function useMagnetic(strength = 0.35) {
  const active = useBoldMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  if (!active) {
    return { ref, style: {}, onPointerMove: undefined, onPointerLeave: undefined };
  }

  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    style: { x: springX, y: springY },
    onPointerMove,
    onPointerLeave,
  };
}
