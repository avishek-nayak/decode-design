import clsx from 'clsx';

/**
 * The recurring section marker.
 *
 * Deliberately takes no numbering — sections are identified by their label
 * alone, not a "01 / 02" index.
 */
export function Eyebrow({ children, className, ...rest }) {
  return (
    <p className={clsx('eyebrow t-mono', className)} {...rest}>
      <span>{children}</span>
    </p>
  );
}
