import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * "How it runs" as an actual x/y quadrant diagram — each step lives inside
 * its own quadrant rather than in a list beside the chart. Quadrants are
 * assigned clockwise starting at Quadrant I (top-right, the mathematical
 * convention: positive x, positive y): step 1 → QI, step 2 → QIV
 * (bottom-right), step 3 → QIII (bottom-left), step 4 → QII (top-left).
 *
 * Purely presentational — the steps themselves are real content (h3 + p),
 * always visible, so there's nothing here that depends on hover or JS to
 * be understood.
 */
export function ProcessQuadrant({ steps, className = '' }) {
  const [q1, q4, q3, q2] = steps;

  return (
    <div className={`process-quadrant ${className}`}>
      <span className="process-quadrant__axis-arrow process-quadrant__axis-arrow--top">
        <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="process-quadrant__axis-arrow process-quadrant__axis-arrow--bottom">
        <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="process-quadrant__axis-arrow process-quadrant__axis-arrow--left">
        <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="process-quadrant__axis-arrow process-quadrant__axis-arrow--right">
        <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </span>

      <span className="t-mono t-mono--plain process-quadrant__axis-label process-quadrant__axis-label--top">
        y
      </span>
      <span className="t-mono t-mono--plain process-quadrant__axis-label process-quadrant__axis-label--bottom">
        -y
      </span>
      <span className="t-mono t-mono--plain process-quadrant__axis-label process-quadrant__axis-label--right">
        x
      </span>
      <span className="t-mono t-mono--plain process-quadrant__axis-label process-quadrant__axis-label--left">
        -x
      </span>

      <div className="process-quadrant__grid">
        <QuadrantCell step={q2} label="QII" position="top-left" />
        <QuadrantCell step={q1} label="QI" position="top-right" />
        <QuadrantCell step={q3} label="QIII" position="bottom-left" />
        <QuadrantCell step={q4} label="QIV" position="bottom-right" />
      </div>
    </div>
  );
}

function QuadrantCell({ step, label, position }) {
  return (
    <div className={`process-quadrant__cell process-quadrant__cell--${position}`}>
      <div className="process-quadrant__cell-head">
        <span className="t-mono subtle">{step.index}</span>
        <span className="t-mono subtle process-quadrant__q-label">{label}</span>
      </div>
      <h3 className="t-h3">{step.title}</h3>
      <p className="t-small muted">{step.body}</p>
    </div>
  );
}
