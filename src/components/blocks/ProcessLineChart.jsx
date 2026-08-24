const WIDTH = 460;
const HEIGHT = 260;
const PAD_LEFT = 36;
const PAD_RIGHT = 34;
const PAD_TOP = 20;
const PAD_BOTTOM = 44;

const PLOT_W = WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM;
const BASELINE = PAD_TOP + PLOT_H;

/**
 * A 4-point line chart standing in for "How it runs" — purely decorative
 * (aria-hidden) and illustrative, not real data: an ascending line simply
 * reads as "things build toward the outcome." The step list beside it is
 * the actual content and drives which point (and its guide lines) is
 * highlighted, on hover or keyboard focus.
 */
export function ProcessLineChart({ steps, active, className = '' }) {
  const n = steps.length;

  const points = steps.map((step, i) => ({
    x: PAD_LEFT + (i / (n - 1)) * PLOT_W,
    y: PAD_TOP + PLOT_H - (i / (n - 1)) * PLOT_H,
    step,
  }));

  const linePath = points
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

        {/* y-axis */}
        <line
          x1={PAD_LEFT}
          y1={BASELINE}
          x2={PAD_LEFT}
          y2={PAD_TOP - 10}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          markerEnd="url(#process-axis-arrow)"
        />
        {/* x-axis */}
        <line
          x1={PAD_LEFT}
          y1={BASELINE}
          x2={WIDTH - PAD_RIGHT + 10}
          y2={BASELINE}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          markerEnd="url(#process-axis-arrow)"
        />

        <text
          x={PAD_LEFT - 10}
          y={PAD_TOP - 6}
          textAnchor="end"
          className="t-mono t-mono--plain process-line-chart__axis-label"
        >
          y
        </text>
        <text
          x={WIDTH - PAD_RIGHT + 12}
          y={BASELINE - 6}
          textAnchor="middle"
          className="t-mono t-mono--plain process-line-chart__axis-label"
        >
          x
        </text>

        {activePoint ? (
          <g className="process-line-chart__guides">
            <line
              x1={activePoint.x}
              y1={activePoint.y}
              x2={activePoint.x}
              y2={BASELINE}
              strokeDasharray="3 4"
            />
            <line
              x1={PAD_LEFT}
              y1={activePoint.y}
              x2={activePoint.x}
              y2={activePoint.y}
              strokeDasharray="3 4"
            />
          </g>
        ) : null}

        <path d={linePath} fill="none" stroke="var(--hairline-strong)" strokeWidth="1.5" />

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

        {points.map((p) => (
          <text
            key={`label-${p.step.title}`}
            x={p.x}
            y={BASELINE + 24}
            textAnchor="middle"
            className="t-mono process-line-chart__tick"
          >
            {p.step.index}
          </text>
        ))}
      </svg>

      <div className="process-line-chart__label">
        <span className="t-mono subtle">{steps[active].index}</span>
        <span className="t-h3">{steps[active].title}</span>
      </div>
    </div>
  );
}
