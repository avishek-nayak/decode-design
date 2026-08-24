import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useBoldMotion } from '@/hooks/useBoldMotion';

const HOVER_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';

/**
 * A dot-and-ring cursor that morphs into a filled circle over anything
 * interactive. Mounted once in RootLayout.
 *
 * Only renders when useBoldMotion() is true — a real mouse, motion allowed.
 * On touch and under reduced motion this renders nothing and the native
 * cursor is left completely alone.
 */
export function CustomCursor() {
  const active = useBoldMotion();

  if (!active) return null;
  return <CursorInner />;
}

function CursorInner() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const labelRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (event) => {
      const target = event.target.closest(HOVER_SELECTOR);
      setHovering(!!target);
      labelRef.current = target?.getAttribute('data-cursor-label') ?? null;
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerover', onOver);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{
          scale: hovering ? 0 : pressed ? 0.6 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 2.4 : pressed ? 0.85 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      />
    </div>
  );
}
