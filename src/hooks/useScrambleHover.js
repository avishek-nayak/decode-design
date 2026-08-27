import { useState } from 'react';
import { useScrambleText } from './useScrambleText';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Text that scrambles into place on pointer-enter or focus — the hover
 * "decode" effect used on buttons and text links. No-ops entirely under
 * prefers-reduced-motion or when `text` isn't a string, so callers can
 * pass through non-text children unchanged.
 *
 * Returns `{ display, handlers }` — render `display` in place of the
 * plain text and spread `handlers` onto the interactive element.
 */
export function useScrambleHover(text) {
  const reduced = usePrefersReducedMotion();
  const [playKey, setPlayKey] = useState(0);
  const skip = reduced || typeof text !== 'string';
  const display = useScrambleText(text ?? '', { playKey, skip });

  if (skip) {
    return { display: text, handlers: {} };
  }

  const replay = () => setPlayKey((k) => k + 1);
  return { display, handlers: { onPointerEnter: replay, onFocus: replay } };
}
