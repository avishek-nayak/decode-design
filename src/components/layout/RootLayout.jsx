import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGridOverlay } from '@/hooks/useGridOverlay';

export function RootLayout() {
  const { pathname, hash } = useLocation();
  const gridVisible = useGridOverlay();
  const isFirstRender = useRef(true);
  useSmoothScroll();

  // On navigation, reset scroll and move focus to the main region — otherwise
  // screen-reader and keyboard users are left wherever the previous page left
  // them, which on a long page is nowhere useful.
  //
  // Skipped on first render on purpose: focusing <main> on load would put the
  // skip link and the entire header behind the user's first Tab press, which
  // is the opposite of what a skip link is for. A hash link is left alone too,
  // so /faq#courses still lands where it should.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (hash) return;

    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />

      {gridVisible ? <GridOverlay /> : null}
    </>
  );
}

function GridOverlay() {
  return (
    <div className="grid-overlay" aria-hidden="true">
      <div className="container grid-overlay__inner">
        <div className="grid-12" style={{ height: '100%' }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="grid-overlay__col" />
          ))}
        </div>
      </div>
    </div>
  );
}
