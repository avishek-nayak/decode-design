import { useEffect, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01';
const FRAME_MS = 40;
const LOCK_STEP = 0.7; // characters locked in per frame, left to right

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Scrambles `text` into place character by character, left to right, every
 * time `text` or `playKey` changes — random glyphs settling into the real
 * string over a few hundred ms. Spaces are never scrambled. Skips straight
 * to the final text when `skip` is true (reduced motion, or no text yet).
 */
export function useScrambleText(text, { playKey, skip = false } = {}) {
  const [display, setDisplay] = useState(text ?? '');

  useEffect(() => {
    if (skip || !text) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing to a changed `text`/`skip`, not a self-triggered loop
      setDisplay(text ?? '');
      return undefined;
    }

    let locked = 0;
    let cancelled = false;

    const id = setInterval(() => {
      locked += LOCK_STEP;
      const lockedCount = Math.min(text.length, Math.floor(locked));

      const next = text
        .split('')
        .map((char, i) => (char === ' ' ? char : i < lockedCount ? char : randomGlyph()))
        .join('');

      if (cancelled) return;
      setDisplay(next);

      if (lockedCount >= text.length) {
        clearInterval(id);
      }
    }, FRAME_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [text, playKey, skip]);

  return display;
}
