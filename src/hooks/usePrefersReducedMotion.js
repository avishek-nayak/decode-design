import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The prerender has no media query to read. Returning false there means the
// static HTML always matches the animated first client render; if the user
// does prefer reduced motion, useSyncExternalStore corrects it during
// hydration, before anything animates.
const getServerSnapshot = () => false;

/**
 * Tracks the reduced-motion preference, and keeps tracking it — the setting
 * can change without a reload.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
