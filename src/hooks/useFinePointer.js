import { useSyncExternalStore } from 'react';

const QUERY = '(pointer: fine) and (hover: hover)';

function subscribe(onChange) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// No fine pointer on the server, so cursor/magnetic/spotlight effects never
// render into the prerendered HTML — they mount only once the client
// confirms a mouse is actually present.
const getServerSnapshot = () => false;

/**
 * True only for a real mouse/trackpad (touch and coarse pointers report
 * false). Gates every cursor-driven effect — custom cursor, magnetic pull,
 * spotlight glow — none of which make sense on a touchscreen.
 */
export function useFinePointer() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
