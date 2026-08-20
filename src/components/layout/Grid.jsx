import clsx from 'clsx';

/**
 * The 12-column grid. Page-level layout goes through Grid/Col — never
 * ad-hoc flex — so the whole site stays on one visible structure.
 */
export function Grid({ as: Tag = 'div', rowGap, className, style, ...rest }) {
  return (
    <Tag
      className={clsx('grid-12', className)}
      style={{ ...(rowGap ? { '--row-gap': rowGap } : null), ...style }}
      {...rest}
    />
  );
}

/**
 * A grid child.
 *
 * `span` and `start` accept either a number (applies at every breakpoint) or
 * an object keyed by breakpoint: { base, md, lg }. Below md the grid drops to
 * 4 columns and below that most things want full width, so `base` defaults to
 * spanning everything.
 */
export function Col({
  as: Tag = 'div',
  span = 12,
  start,
  className,
  style,
  ...rest
}) {
  const spanMap = normalise(span, 'span');
  const startMap = normalise(start, 'start');

  return (
    <Tag
      className={clsx('col', className)}
      style={{ ...spanMap, ...startMap, ...style }}
      {...rest}
    />
  );
}

function normalise(value, name) {
  if (value === undefined || value === null) return null;
  const v = typeof value === 'object' ? value : { lg: value };
  const out = {};
  if (v.base !== undefined) out[`--col-${name}-base`] = v.base;
  if (v.md !== undefined) out[`--col-${name}-md`] = v.md;
  if (v.lg !== undefined) out[`--col-${name}-lg`] = v.lg;
  return out;
}

export function Container({ as: Tag = 'div', className, ...rest }) {
  return <Tag className={clsx('container', className)} {...rest} />;
}

/**
 * A page section. `tone="inverse"` flips the token roles for the whole
 * subtree — used at most once per page, since it is the emphasis device.
 */
export function Section({
  as: Tag = 'section',
  tone,
  tight,
  ruleTop,
  ruleBottom,
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={clsx(
        'section',
        tight && 'section--tight',
        tone === 'inverse' && 'inverse',
        tone === 'alt' && 'section--alt',
        ruleTop && 'rule-t',
        ruleBottom && 'rule-b',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
