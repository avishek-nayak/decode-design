import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DotWordmark } from './DotWordmark';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { introWords } from '@/data/introWords';

const SESSION_KEY = 'intro-seen';
const AUTO_DISMISS_MS = 4000;
const WORDMARK_TEXT = 'Decode.designers';
const ROWS_PER_SIDE = 3;
const WORDS_PER_ROW = 9;
const EASE = [0.22, 1, 0.36, 1];

function buildRows() {
  const build = (offset) =>
    Array.from({ length: ROWS_PER_SIDE }, (_, r) =>
      Array.from(
        { length: WORDS_PER_ROW },
        (_, w) => introWords[(offset + r * WORDS_PER_ROW + w * 7) % introWords.length],
      ),
    );

  return { top: build(0), bottom: build(ROWS_PER_SIDE * WORDS_PER_ROW) };
}

/**
 * First-load intro: a field of design vocabulary flies in from off-screen
 * top and bottom while a dot-matrix "Decode.designers" wordmark rains down
 * and settles into its letterforms in the centre (see DotWordmark).
 * Dismissing (click, Enter/Space, Escape, or a 4s timeout) flies the word
 * field back out and morphs the wordmark — via the `site-wordmark`
 * layoutId it shares with the header — into its resting place in the nav.
 *
 * Shows once per browser session, on whichever page loads first, and
 * never at all under prefers-reduced-motion. Always starts closed so
 * server-rendered and first-client-render markup match; the decision to
 * open happens in an effect, after hydration, same as everywhere else
 * animation-related on this site.
 */
export function IntroOverlay() {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const buttonRef = useRef(null);
  const timeoutRef = useRef(null);

  const rows = useMemo(() => buildRows(), []);
  const [dotPhase, setDotPhase] = useState('idle');
  const handleDotPhaseChange = useCallback((phase) => setDotPhase(phase), []);

  useEffect(() => {
    // `reduced` can read stale (false) for one render right after hydration
    // — useSyncExternalStore returns the SSR-safe snapshot until it syncs —
    // which can let this effect fire once before the correction lands. If
    // that correction then arrives as `reduced: true`, undo any `show` this
    // effect already set; otherwise a real reduced-motion visitor is left
    // with the overlay's keydown/focus-trap effects still active even once
    // its markup stops rendering.
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reverting a state set by this same effect's own earlier, stale-`reduced` run
      setShow(false);
      return;
    }

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      return; // storage unavailable (private browsing etc.) — skip the intro
    }

    setShow(true);
  }, [reduced]);

  const dismiss = () => {
    clearTimeout(timeoutRef.current);
    setClosing(true);
  };

  useEffect(() => {
    if (!show || closing) return undefined;

    buttonRef.current?.focus();
    timeoutRef.current = setTimeout(dismiss, AUTO_DISMISS_MS);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismiss();
        return;
      }
      // The button is the only focusable element while the overlay is open.
      if (event.key === 'Tab') {
        event.preventDefault();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(timeoutRef.current);
    };
  }, [show, closing]);

  // `reduced` can briefly read stale (false) on the very first client
  // render — useSyncExternalStore returns the SSR-safe snapshot until it
  // syncs — which could let the gating effect below fire once before the
  // correction lands. Guarding the render itself, not just the effect,
  // means that race can never leave the overlay visible.
  if (!show || reduced) return null;

  return (
    <AnimatePresence onExitComplete={() => setShow(false)}>
      {closing ? null : (
        <motion.div
          className="intro-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Decode.designers"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="intro-overlay__field intro-overlay__field--top" aria-hidden="true">
            {rows.top.map((words, r) => (
              <motion.div
                key={r}
                className="intro-overlay__row"
                initial={{ x: r % 2 === 0 ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.9, ease: EASE, delay: r * 0.08 }}
              >
                {words.map((word, i) => (
                  <span key={i} className="intro-overlay__word">
                    {word}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>

          <div className="intro-overlay__center">
            <button
              ref={buttonRef}
              type="button"
              className="intro-overlay__button"
              onClick={dismiss}
              aria-label="Enter Decode.designers"
            >
              <DotWordmark
                layoutId="site-wordmark"
                className="intro-overlay__wordmark"
                text={WORDMARK_TEXT}
                active={show && !closing}
                onPhaseChange={handleDotPhaseChange}
              />
            </button>
            <motion.p
              className="t-mono subtle intro-overlay__hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: dotPhase === 'settled' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Click to enter
            </motion.p>
          </div>

          <div className="intro-overlay__field intro-overlay__field--bottom" aria-hidden="true">
            {rows.bottom.map((words, r) => (
              <motion.div
                key={r}
                className="intro-overlay__row"
                initial={{ x: r % 2 === 0 ? '100%' : '-100%' }}
                animate={{ x: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.9, ease: EASE, delay: r * 0.08 }}
              >
                {words.map((word, i) => (
                  <span key={i} className="intro-overlay__word">
                    {word}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
