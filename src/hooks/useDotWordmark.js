import { useEffect, useRef, useState } from 'react';

const ALPHA_THRESHOLD = 128;
const GRAVITY = 2600; // css px / s^2
const NEAR_TARGET = 26; // css px — switch from free-fall to damped settle
const SETTLE_RATE = 14; // 1/s — higher snaps into place faster
const SETTLE_EPS = 0.4; // css px
const FALL_STAGGER_MS = 500; // spread of start delays across the field
const RIPPLE_RADIUS = 64; // css px
const RIPPLE_STRENGTH = 13; // css px, max outward push
const RIPPLE_LERP = 0.22; // per-frame ease toward the ripple's current target

// Fine enough at the mobile floor to resolve DotGothic16's strokes,
// without producing more dots than the desktop size can usefully hold.
function pitchForFontSize(fontSizePx) {
  return Math.max(2, Math.min(4, fontSizePx / 20));
}

function sampleLetterforms(text, fontSizePx, w, h, dpr) {
  const off = document.createElement('canvas');
  off.width = Math.max(1, Math.round(w * dpr));
  off.height = Math.max(1, Math.round(h * dpr));
  const ctx = off.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = `400 ${fontSizePx}px "DotGothic16"`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#000';
  ctx.fillText(text, 0, fontSizePx * 0.78);

  const { data } = ctx.getImageData(0, 0, off.width, off.height);
  const step = Math.max(1, Math.round(pitchForFontSize(fontSizePx) * dpr));
  const points = [];

  for (let gy = 0; gy < off.height; gy += step) {
    for (let gx = 0; gx < off.width; gx += step) {
      const alpha = data[(gy * off.width + gx) * 4 + 3];
      if (alpha > ALPHA_THRESHOLD) {
        points.push({ x: gx / dpr, y: gy / dpr });
      }
    }
  }

  return points;
}

/**
 * Drives the intro overlay's dot-matrix wordmark: samples the letterforms
 * of `text` into a dot grid, rains those dots down onto a canvas with a
 * gravity fall + damped settle, then — once every dot has landed — enables
 * a pointer-driven ripple that pushes nearby dots outward and lets them
 * ease back to rest.
 *
 * Fully inert until `active` flips true (mirrors `show && !closing` in
 * IntroOverlay), so it never touches `document`/canvas outside that window
 * and stays SSR/reduced-motion safe by construction — the caller simply
 * never sets `active` in those cases.
 */
export function useDotWordmark({ text, active, stencilRef }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (!active) return undefined;

    const canvas = canvasRef.current;
    const stencil = stencilRef.current;
    if (!canvas || !stencil) return undefined;

    let cancelled = false;
    let rafId = null;
    let particles = [];
    let fallStart = 0;
    let allSettled = false;
    const pointer = { x: -9999, y: -9999 };

    setPhase('falling');

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const setup = async () => {
      try {
        const fontSizePx = parseFloat(getComputedStyle(stencil).fontSize) || 64;
        await document.fonts.load(`400 ${fontSizePx}px "DotGothic16"`);
        await document.fonts.load(`400 ${fontSizePx}px "DotGothic16"`, text);
      } catch {
        // Font API unsupported or load failed — sample with whatever is
        // available; worst case the dots trace a fallback glyph shape.
      }
      if (cancelled) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;
      if (w < 1 || h < 1) return;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const fontSizePx = parseFloat(getComputedStyle(stencil).fontSize) || 64;
      const targets = sampleLetterforms(text, fontSizePx, w, h, dpr);
      if (cancelled || targets.length === 0) return;

      const color = getComputedStyle(canvas).color || '#141416';
      const dotRadius = pitchForFontSize(fontSizePx) * 0.4;

      particles = targets.map((t) => ({
        x: t.x,
        ty: t.y,
        y: -(40 + Math.random() * 360),
        vy: 0,
        delay: (t.y / h) * FALL_STAGGER_MS + Math.random() * FALL_STAGGER_MS,
        settled: false,
        offX: 0,
        offY: 0,
        offTargetX: 0,
        offTargetY: 0,
      }));

      fallStart = performance.now();
      let lastT = fallStart;

      const tick = (now) => {
        if (cancelled) return;
        const dt = Math.min(0.05, (now - lastT) / 1000);
        lastT = now;
        const elapsed = now - fallStart;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = color;

        let settledCount = 0;

        for (const p of particles) {
          if (!p.settled) {
            if (elapsed >= p.delay) {
              const distToTarget = p.ty - p.y;
              if (distToTarget > NEAR_TARGET) {
                p.vy += GRAVITY * dt;
                p.y += p.vy * dt;
              } else {
                p.y = p.ty + (p.y - p.ty) * Math.exp(-SETTLE_RATE * dt);
                if (Math.abs(p.ty - p.y) < SETTLE_EPS) {
                  p.y = p.ty;
                  p.vy = 0;
                  p.settled = true;
                }
              }
            }
          }
          if (p.settled) settledCount += 1;

          if (allSettled) {
            const dx = p.x - pointer.x;
            const dy = p.ty - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < RIPPLE_RADIUS) {
              const push = (1 - dist / RIPPLE_RADIUS) * RIPPLE_STRENGTH;
              const nx = dist === 0 ? 1 : dx / dist;
              const ny = dist === 0 ? 0 : dy / dist;
              p.offTargetX = nx * push;
              p.offTargetY = ny * push;
            } else {
              p.offTargetX = 0;
              p.offTargetY = 0;
            }
            p.offX += (p.offTargetX - p.offX) * RIPPLE_LERP;
            p.offY += (p.offTargetY - p.offY) * RIPPLE_LERP;
          }

          const drawX = p.x + p.offX;
          const drawY = (p.settled ? p.ty : p.y) + p.offY;
          ctx.beginPath();
          ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        if (!allSettled) {
          const progress = settledCount / particles.length;
          stencil.style.opacity = String(Math.max(0, 1 - Math.max(0, (progress - 0.55) / 0.45)));
          if (settledCount === particles.length) {
            allSettled = true;
            stencil.style.opacity = '0';
            setPhase('settled');
            canvas.addEventListener('pointermove', onPointerMove);
            canvas.addEventListener('pointerleave', onPointerLeave);
          }
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    setup();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [active, text, stencilRef]);

  return { canvasRef, phase };
}
