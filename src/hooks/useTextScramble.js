import { useEffect, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01';
const FRAME_MS = 45;
const LOCK_STEP = 0.6; // characters locked in per frame, left to right

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Scrambles `text` into place character by character, left to right — the
 * "decoding" reveal on the intro wordmark. Returns the current frame of
 * text plus whether the reveal has finished. Skips straight to the final
 * text, done, when `skip` is true (used for prefers-reduced-motion).
 */
export function useTextScramble(text, { skip = false } = {}) {
  const [display, setDisplay] = useState(() => (skip ? text : ''));
  const [done, setDone] = useState(skip);

  useEffect(() => {
    if (skip) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing to `skip`, which can flip true->false after mount
      setDisplay(text);
      setDone(true);
      return undefined;
    }

    setDone(false);
    let locked = 0;
    let cancelled = false;

    const id = setInterval(() => {
      locked += LOCK_STEP;
      const lockedCount = Math.min(text.length, Math.floor(locked));

      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ' || char === '.') return char;
          return i < lockedCount ? char : randomGlyph();
        })
        .join('');

      if (cancelled) return;
      setDisplay(next);

      if (lockedCount >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, FRAME_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [text, skip]);

  return { display, done };
}
