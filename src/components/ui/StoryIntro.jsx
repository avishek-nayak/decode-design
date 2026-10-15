import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SESSION_KEY = 'story-seen';
const EASE = [0.22, 1, 0.36, 1];

// How long each chapter holds before the next one takes over.
const SCENES = [
  { id: 'world', caption: 'First, the world got connected.', ms: 3400 },
  { id: 'phone', caption: 'Then every website moved into a pocket.', ms: 3600 },
  { id: 'slop', caption: 'Then came the flood of AI slop.', ms: 3600 },
  { id: 'human', caption: null, ms: 4600 },
];

/**
 * First-load story: a short four-chapter loader — a connected world, the
 * web shrinking into a phone, a wall of identical AI-generated sameness,
 * and then the line it's all building to. A Skip button (and Escape)
 * ends it at any point.
 *
 * Shows once per browser session, on whichever page loads first. The
 * overlay only mounts after hydration so the prerendered HTML never
 * contains it; the inline script in index.html paints a solid cover over
 * the page until then, so a first-time visitor doesn't see the site flash
 * before the story starts. This component lifts that cover either way.
 */
export function StoryIntro() {
  const [open, setOpen] = useState(false);
  const [scene, setScene] = useState(0);
  const reduced = usePrefersReducedMotion();
  const skipRef = useRef(null);

  useEffect(() => {
    let seen = true;
    try {
      seen = Boolean(sessionStorage.getItem(SESSION_KEY));
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // storage unavailable (private browsing etc.) — skip the story
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- the decision needs sessionStorage, which only exists after hydration
    setOpen(!seen);
    document.documentElement.classList.remove('story-pending');
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Advance through the chapters, then close.
  useEffect(() => {
    if (!open) return undefined;
    const id = setTimeout(() => {
      if (scene < SCENES.length - 1) setScene(scene + 1);
      else close();
    }, SCENES[scene].ms);
    return () => clearTimeout(id);
  }, [open, scene, close]);

  // Lock the page underneath, keep Tab on Skip, and let Escape out. Skip
  // isn't auto-focused — that would paint a focus ring on it for every
  // mouse visitor; the first Tab lands there instead.
  useEffect(() => {
    if (!open) return undefined;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'Tab') {
        // Skip is the only control while the story runs.
        event.preventDefault();
        skipRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  const fade = reduced ? 0 : 0.6;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="story"
          role="dialog"
          aria-modal="true"
          aria-label="Intro"
          data-lenis-prevent
          initial={{ opacity: 1 }}
          exit={{ y: reduced ? 0 : '-100%', opacity: reduced ? 0 : 1 }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: EASE }}
        >
          <div className="story__top">
            <span className="t-mono story__count" aria-hidden="true">
              {String(scene + 1).padStart(2, '0')} / {String(SCENES.length).padStart(2, '0')}
            </span>
            <button
              ref={skipRef}
              type="button"
              className="story__skip t-mono"
              onClick={close}
            >
              Skip intro →
            </button>
          </div>

          <div className="story__stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={SCENES[scene].id}
                className="story__scene"
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -16 }}
                transition={{ duration: fade, ease: EASE }}
              >
                {scene === 0 ? <WorldScene reduced={reduced} /> : null}
                {scene === 1 ? <PhoneScene reduced={reduced} /> : null}
                {scene === 2 ? <SlopScene reduced={reduced} /> : null}
                {scene === 3 ? <HumanScene reduced={reduced} /> : null}

                {SCENES[scene].caption ? (
                  <p className="story__caption" aria-live="polite">
                    {SCENES[scene].caption}
                  </p>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="story__progress" aria-hidden="true">
            {SCENES.map((s, i) => (
              <span key={s.id} className="story__bar">
                <span
                  className={
                    i < scene
                      ? 'story__fill is-done'
                      : i === scene
                        ? 'story__fill is-active'
                        : 'story__fill'
                  }
                  style={i === scene ? { animationDuration: `${s.ms}ms` } : undefined}
                />
              </span>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---- 01: a connected world ----------------------------------------------
   A wireframe globe — the meridians breathe to suggest rotation — with
   cities lighting up and arcs being drawn between them. */

const NODES = [
  [150, 95],
  [232, 78],
  [268, 140],
  [196, 168],
  [138, 150],
  [244, 196],
  [176, 62],
];

const ARCS = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 5],
  [4, 2],
  [6, 2],
  [4, 1],
  [6, 3],
];

function arcPath([x1, y1], [x2, y2]) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.35;
  return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
}

function WorldScene({ reduced }) {
  return (
    <svg className="story__art" viewBox="0 0 400 260" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35">
        <circle cx="200" cy="130" r="100" />
        {[-60, -30, 0, 30, 60].map((lat) => (
          <ellipse
            key={lat}
            cx="200"
            cy={130 + lat}
            rx={Math.sqrt(100 ** 2 - lat ** 2)}
            ry={Math.sqrt(100 ** 2 - lat ** 2) * 0.16}
          />
        ))}
        {[0, 1, 2, 3].map((m) => (
          <motion.ellipse
            key={m}
            cx="200"
            cy="130"
            ry="100"
            initial={{ rx: 100 - m * 25 }}
            animate={reduced ? undefined : { rx: [100 - m * 25, 0, 100 - m * 25] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: m }}
          />
        ))}
      </g>

      <g fill="none" stroke="currentColor" strokeWidth="1.25">
        {ARCS.map(([a, b], i) => (
          <motion.path
            key={i}
            d={arcPath(NODES[a], NODES[b])}
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.5 + i * 0.22, ease: EASE }}
          />
        ))}
      </g>

      {NODES.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3.5"
          fill="currentColor"
          initial={{ scale: reduced ? 1 : 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.12, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* ---- 02: website → smartphone -------------------------------------------
   A desktop browser window narrows into a phone. Its content is a real
   flex layout, so the three columns genuinely reflow to a single stack
   as it shrinks — the responsive web, in one gesture. */

function PhoneScene({ reduced }) {
  const [phone, setPhone] = useState(reduced);

  useEffect(() => {
    const id = setTimeout(() => setPhone(true), 1100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="story__art story__device-wrap" aria-hidden="true">
      <div className={phone ? 'story__device is-phone' : 'story__device'}>
        <div className="story__device-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="story__device-body">
          <div className="story__block story__block--nav" />
          <div className="story__block story__block--hero" />
          <div className="story__cols">
            <div className="story__block" />
            <div className="story__block" />
            <div className="story__block" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- 03: AI slop ---------------------------------------------------------
   The same generated card, over and over, multiplying faster than you can
   read it. Every one says nothing. */

const SLOP_LINES = [
  'Unlock your potential ✦',
  'Revolutionize your workflow',
  'Seamless. Scalable. Smart.',
  'Elevate your experience ✦',
  'Supercharge growth with AI',
  'The future of everything',
];

function SlopScene({ reduced }) {
  return (
    <div className="story__art story__slop" aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => (
        <motion.div
          key={i}
          className="story__slop-card"
          initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.6 }}
          animate={
            reduced
              ? undefined
              : { opacity: 1, scale: 1, x: [0, -1.5, 1.5, 0] }
          }
          transition={{
            opacity: { duration: 0.25, delay: i * 0.07 },
            scale: { duration: 0.25, delay: i * 0.07 },
            x: { duration: 0.18, repeat: Infinity, repeatDelay: 0.6 + (i % 5) * 0.3 },
          }}
        >
          <span className="story__slop-blob" />
          <span className="story__slop-text">{SLOP_LINES[i % SLOP_LINES.length]}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ---- 04: the point ---------------------------------------------------- */

const HUMAN_LEAD = 'In this AI slop industry,';
const HUMAN_LINE = 'we are here to create human approach design for business.';

function HumanScene({ reduced }) {
  const words = HUMAN_LINE.split(' ');
  return (
    <div className="story__human">
      <motion.p
        className="story__human-lead"
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {HUMAN_LEAD}
      </motion.p>
      <p className="story__human-line">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="story__human-word"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : '0.4em' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.09, ease: EASE }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
