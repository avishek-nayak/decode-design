import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { nav, site } from '@/data/siteConfig';
import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/ui/Wordmark';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Close the mobile panel on navigation. Adjusting during render rather than
  // in an effect avoids a frame where the panel is still open on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the panel is open it behaves as a modal dialog: background scroll
  // is locked, Escape closes, and focus is trapped inside.
  useEffect(() => {
    if (!open) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const panel = panelRef.current;
    panel?.querySelector('a, button')?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container site-header__bar">
          <Link
            to="/"
            className="site-header__logo"
            aria-label={`${site.name}, home`}
          >
            <Wordmark />
          </Link>

          <nav className="site-header__nav" aria-label="Primary">
            <ul className="site-header__list">
              {nav.map((item) => (
                <li key={item.to}>
                  {item.label === 'Contact' ? (
                    <Button variant="secondary" to={item.to}>
                      {item.label}
                    </Button>
                  ) : (
                    <NavLink to={item.to} className="link-wipe t-mono">
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={triggerRef}
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={22} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
            )}
            <span className="visually-hidden">
              {open ? 'Close menu' : 'Open menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Deliberately a sibling of <header>, not a child: the header's
          backdrop-filter makes it the containing block for fixed-position
          descendants, which collapses this panel to zero height. */}
      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="mobile-nav inverse"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="container mobile-nav__inner">
            <ul className="mobile-nav__list">
              {nav.map((item, i) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="mobile-nav__link t-h2">
                    <span className="t-mono subtle mobile-nav__index">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Button variant="primary" to="/contact" arrow>
              Book a call
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
