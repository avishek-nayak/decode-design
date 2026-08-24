import { useRef, useState } from 'react';
import { useBoldMotion } from '@/hooks/useBoldMotion';

/**
 * A soft light that follows the cursor across an inverted (dark) section.
 * Reserved for the one inverted band per page — it's an emphasis device on
 * top of an emphasis device, so it earns its keep only there.
 *
 * Renders children plain, with no wrapper markup or listeners, when
 * useBoldMotion() is false — touch and reduced-motion users get the section
 * exactly as it would look with this component deleted.
 */
export function Spotlight({ as: Tag = 'div', className = '', children, ...rest }) {
  const active = useBoldMotion();
  const ref = useRef(null);
  const [entered, setEntered] = useState(false);

  if (!active) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const onPointerMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      className={`spotlight ${entered ? 'is-active' : ''} ${className}`}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setEntered(true)}
      onPointerLeave={() => setEntered(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
