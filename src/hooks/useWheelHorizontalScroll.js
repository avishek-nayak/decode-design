import { useEffect, useRef } from 'react';

/**
 * Translates vertical mouse-wheel input into horizontal scroll on a track.
 * Touch and trackpad already scroll a horizontal track natively; a plain
 * mouse wheel does not, and the track's scrollbar is hidden, so without
 * this a mouse-only visitor has no way to move it at all.
 *
 * Wired with a native (non-passive) listener via a ref rather than React's
 * onWheel, which is passive by default and can't preventDefault the page's
 * own vertical scroll.
 */
export function useWheelHorizontalScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const onWheel = (event) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      el.scrollLeft += event.deltaY;
      event.preventDefault();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return ref;
}
