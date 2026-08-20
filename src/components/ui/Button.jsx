import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * One button component covering the three variants in the system.
 *
 * Renders <Link> for internal `to`, <a> for external `href`, <button>
 * otherwise — so an interactive element is always a real interactive element.
 */
export function Button({
  variant = 'secondary',
  to,
  href,
  arrow = false,
  icon: Icon,
  className,
  children,
  ...rest
}) {
  const cls = clsx('btn', `btn--${variant}`, className);

  const content = (
    <>
      {Icon ? <Icon size={15} strokeWidth={1.75} aria-hidden="true" /> : null}
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          size={15}
          strokeWidth={1.75}
          className="btn__icon"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(external
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : null)}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
