import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SIZE = 220;
const STROKE = 20;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 8;

/**
 * A 4-segment donut, purely decorative (aria-hidden) — the actual content is
 * the labelled step list a caller renders alongside it, which is what stays
 * readable without JS and what a screen reader announces. `active` controls
 * which segment (and centre label) is highlighted; the caller owns that
 * state so hovering the step list and hovering the chart drive each other.
 */
export function ProcessDonut({ steps, active, className = '' }) {
  const reduced = usePrefersReducedMotion();
  const segmentLength = CIRCUMFERENCE / steps.length - GAP;

  return (
    <div className={`process-donut ${className}`}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--hairline)"
            strokeWidth={STROKE - 8}
          />
          {steps.map((step, i) => {
            const isActive = i === active;
            const offset = -(i * (CIRCUMFERENCE / steps.length));

            return (
              <circle
                key={step.title}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={isActive ? 'var(--ink-200)' : 'var(--hairline-strong)'}
                strokeWidth={isActive ? STROKE : STROKE - 8}
                strokeLinecap="butt"
                strokeDasharray={`${segmentLength} ${CIRCUMFERENCE - segmentLength}`}
                strokeDashoffset={offset}
                className={reduced ? '' : 'process-donut__segment'}
              />
            );
          })}
        </g>
      </svg>

      <div className="process-donut__center">
        <p className="t-mono subtle">{steps[active].index}</p>
        <p className="t-h3">{steps[active].title}</p>
      </div>
    </div>
  );
}
