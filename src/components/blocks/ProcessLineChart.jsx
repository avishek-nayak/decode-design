const WIDTH = 460;
const HEIGHT = 320;
const PAD = 40;

const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const HALF_W = WIDTH / 2 - PAD;
const HALF_H = HEIGHT / 2 - PAD;

// Point offset from centre, as a fraction of each half-axis — keeps points
// clear of both the axes and the outer edge.
const OFFSET = 0.55;

// Reading order (top-left, top-right, bottom-left, bottom-right) rather than
// mathematical quadrant order — it maps the 4 steps to a 2x2 grid the way
// people actually scan one, left to right then down.
const QUADRANTS = [
  { dx: -1, dy: -1 }, // step 1 — top-left
  { dx: 1, dy: -1 }, // step 2 — top-right
  { dx: -1, dy: 1 }, // step 3 — bottom-left
  { dx: 1, dy: 1 }, // step 4 — bottom-right
];

/**
 * A 4-quadrant chart standing in for "How it runs" — one step per quadrant
 * on a full x/y plane, purely decorative (aria-hidden) and illustrative,
 * not real data. The step list beside it is the actual content and drives
 * which quadrant's point (and its guide lines) is highlighted, on hover or
 * keyboard focus.
 */
export function ProcessLineChart({ steps, active, className = '' }) {
  const points = steps.map((step, i) => {
    const q = QUADRANTS[i % QUADRANTS.length];
    return {
      x: CX + q.dx * HALF_W * OFFSET,
      y: CY + q.dy * HALF_H * OFFSET,
      step,
    };
  });

  const flowPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const activePoint = points[active];

  return (
    <div className={`process-line-chart ${className}`}>
      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        aria-hidden="true"
      >
        <defs>
          <marker
            id="process-axis-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--hairline-strong)" />
          </marker>
        </defs>

        {/* y-axis: full line through the centre, arrowheads both ends */}
        <line
          x1={CX}
          y1={PAD}
          x2={CX}
          y2={HEIGHT - PAD}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          markerStart="url(#process-axis-arrow)"
          markerEnd="url(#process-axis-arrow)"
        />
        {/* x-axis: full line through the centre, arrowheads both ends */}
        <line
          x1={PAD}
          y1={CY}
          x2={WIDTH - PAD}
          y2={CY}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          markerStart="url(#process-axis-arrow)"
          markerEnd="url(#process-axis-arrow)"
        />

        <text x={CX + 10} y={PAD + 4} className="t-mono t-mono--plain process-line-chart__axis-label">
          y
        </text>
        <text x={CX + 10} y={HEIGHT - PAD + 4} className="t-mono t-mono--plain process-line-chart__axis-label">
          -y
        </text>
        <text x={WIDTH - PAD - 4} y={CY - 8} textAnchor="end" className="t-mono t-mono--plain process-line-chart__axis-label">
          x
        </text>
        <text x={PAD + 4} y={CY - 8} className="t-mono t-mono--plain process-line-chart__axis-label">
          -x
        </text>

        {/* Faint flow line showing the sequence across quadrants — the
            quadrants are the point, this is just a secondary "and in this
            order" cue. */}
        <path
          d={flowPath}
          fill="none"
          stroke="var(--hairline)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        {activePoint ? (
          <g className="process-line-chart__guides">
            <line x1={activePoint.x} y1={activePoint.y} x2={activePoint.x} y2={CY} strokeDasharray="3 4" />
            <line x1={activePoint.x} y1={activePoint.y} x2={CX} y2={activePoint.y} strokeDasharray="3 4" />
          </g>
        ) : null}

        {points.map((p, i) => (
          <circle
            key={p.step.title}
            cx={p.x}
            cy={p.y}
            r={i === active ? 7 : 4}
            fill={i === active ? 'var(--ink-200)' : 'var(--surface)'}
            stroke="var(--ink-200)"
            strokeWidth={i === active ? 0 : 1.5}
            className="process-line-chart__point"
          />
        ))}

        {points.map((p) => {
          const labelY = p.y < CY ? p.y - 16 : p.y + 24;
          return (
            <text
              key={`label-${p.step.title}`}
              x={p.x}
              y={labelY}
              textAnchor="middle"
              className="t-mono process-line-chart__tick"
            >
              {p.step.index}
            </text>
          );
        })}
      </svg>

      <div className="process-line-chart__label">
        <span className="t-mono subtle">{steps[active].index}</span>
        <span className="t-h3">{steps[active].title}</span>
      </div>
    </div>
  );
}
