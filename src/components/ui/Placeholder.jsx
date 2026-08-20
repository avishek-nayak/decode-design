import clsx from 'clsx';

/**
 * Charcoal duotone stand-in for imagery that does not exist yet.
 * Delete this component once real assets land.
 */
export function Placeholder({ label, ratio = '4 / 3', className, style }) {
  return (
    <div
      className={clsx('placeholder', className)}
      style={{ aspectRatio: ratio, ...style }}
      role="img"
      aria-label={label ? `Placeholder: ${label}` : 'Placeholder image'}
    >
      {label ? (
        <span className="placeholder__label t-mono" aria-hidden="true">
          {label}
        </span>
      ) : null}
    </div>
  );
}
