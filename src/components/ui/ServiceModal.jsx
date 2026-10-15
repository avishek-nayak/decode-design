import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

/**
 * A quick look at one service, opened from a service card. The full
 * /services/:slug pages are only linked from the footer for now; every
 * card in the site opens this instead, and its one action sends the
 * visitor to the contact page.
 *
 * Built on a native <dialog> opened with showModal(), which gives focus
 * trapping, Escape-to-close and an inert page underneath for free.
 */
export function ServiceModal({ service, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !service) return undefined;

    if (!dialog.open) dialog.showModal();

    // Lock the page behind it; native scroll lock doesn't cover Lenis.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    return () => {
      root.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [service]);

  if (!service) return null;

  return (
    <dialog
      ref={dialogRef}
      className="service-modal"
      aria-labelledby="service-modal-title"
      data-lenis-prevent
      onClose={onClose}
      // A click that lands on the <dialog> itself, not its content, is a
      // click on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="service-modal__body">
        <div className="service-modal__head">
          <span className="t-mono subtle">{service.index}</span>
          <button
            type="button"
            className="service-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <h2 id="service-modal-title" className="t-h2">
          {service.title}
        </h2>
        <p className="t-body-lg" style={{ marginTop: 'var(--s-4)' }}>
          {service.outcome}
        </p>
        <p className="t-body muted" style={{ marginTop: 'var(--s-4)' }}>
          {service.summary}
        </p>

        <dl className="service-modal__meta">
          <div>
            <dt className="t-mono subtle">Timeline</dt>
            <dd className="t-mono">{service.timeline}</dd>
          </div>
          <div>
            <dt className="t-mono subtle">Starting at</dt>
            <dd className="t-mono">{service.startingAt}</dd>
          </div>
        </dl>

        <p className="t-mono subtle">What you get</p>
        <ul className="deliverable-list t-small muted service-modal__list">
          {service.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <div className="service-modal__actions">
          <Button variant="primary" to="/contact" arrow onClick={onClose}>
            Connect with the team
          </Button>
        </div>
      </div>
    </dialog>
  );
}
