import clsx from 'clsx';

/** The recurring section marker: mono index + label. */
export function Eyebrow({ index, children, className, ...rest }) {
  return (
    <p className={clsx('eyebrow t-mono', className)} {...rest}>
      {index ? (
        <span className="eyebrow__index" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
