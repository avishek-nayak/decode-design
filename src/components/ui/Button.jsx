import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useScrambleHover } from '@/hooks/useScrambleHover';

const MotionLink = motion.create(Link);

/**
 * One button component covering the three variants in the system.
 *
 * Renders <Link> for internal `to`, <a> for external `href`, <button>
 * otherwise — so an interactive element is always a real interactive element.
 *
 * `primary` and `secondary` get a magnetic pull toward the cursor — a no-op
 * on touch devices and under reduced motion, see useMagnetic().
 *
 * The label scrambles into place on hover/focus (see useScrambleHover).
 * The scrambling span is decorative (`aria-hidden`) with the real label
 * carried via `aria-label` on the element itself, so screen readers always
 * get the stable text regardless of what's mid-scramble on screen.
 */
export function Button({
  variant = 'secondary',
  to,
  href,
  arrow = false,
  icon: Icon,
  cursorLabel,
  className,
  children,
  ...rest
}) {
  const cls = clsx('btn', `btn--${variant}`, className);
  const magnetic = useMagnetic(variant === 'primary' ? 0.4 : 0.28);
  const magnetEnabled = variant === 'primary' || variant === 'secondary';
  const label = typeof children === 'string' ? children : null;
  const { display, handlers: scrambleHandlers } = useScrambleHover(label);

  const content = (
    <>
      {Icon ? <Icon size={15} strokeWidth={1.75} aria-hidden="true" /> : null}
      <span aria-hidden={label !== null || undefined}>
        {label !== null ? display : children}
      </span>
      {arrow ? (
        <ArrowRight
          size={15}
          strokeWidth={1.75}
          className="btn__icon"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const magnetProps = magnetEnabled
    ? {
        ref: magnetic.ref,
        style: magnetic.style,
        onPointerMove: magnetic.onPointerMove,
        onPointerLeave: magnetic.onPointerLeave,
        'data-cursor-label': cursorLabel,
        'aria-label': label ?? undefined,
        ...scrambleHandlers,
      }
    : {
        'data-cursor-label': cursorLabel,
        'aria-label': label ?? undefined,
        ...scrambleHandlers,
      };

  if (to) {
    return (
      <MotionLink to={to} className={cls} {...magnetProps} {...rest}>
        {content}
      </MotionLink>
    );
  }

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <motion.a
        href={href}
        className={cls}
        {...(external
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : null)}
        {...magnetProps}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={cls} {...magnetProps} {...rest}>
      {content}
    </motion.button>
  );
}
