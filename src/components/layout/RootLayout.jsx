import { useEffect, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { IntroOverlay } from '@/components/ui/IntroOverlay';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGridOverlay } from '@/hooks/useGridOverlay';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function RootLayout() {
  const { pathname, hash } = useLocation();
  const outlet = useOutlet();
  const gridVisible = useGridOverlay();
  const reduced = usePrefersReducedMotion();
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
      <IntroOverlay />

      {/*
        popLayout lets the entering page mount while the previous one is
        still fading out, without the exiting page pushing new content down —
        which is also what makes the shared-element morph on service/course
        titles possible: Motion tracks matching layoutId nodes across both
        trees for the one frame they briefly coexist. Neutralised to an
        instant swap under reduced motion.
      */}
      <main id="main" tabIndex={-1} className="main-outlet">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduced ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <CustomCursor />

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
