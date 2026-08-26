import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { Spotlight } from '@/components/ui/Spotlight';
import { Seo } from '@/components/ui/Seo';
import { services, work } from '@/data/services';
import { clients, contact, site } from '@/data/siteConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWheelHorizontalScroll } from '@/hooks/useWheelHorizontalScroll';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  description: site.description,
  url: site.url,
  email: contact.email,
  areaServed: 'Worldwide',
  knowsAbout: [
    'User experience design',
    'Product design',
    'Design systems',
    'Accessibility',
    'Behavioural design',
  ],
};

const HERO_ROTATING_WORDS = [
  'Revenue Increase',
  'Customer Conversion',
  'Gamification in Product',
  'Growth & Scale',
];

// Kept under 50 characters — the flip-card back face has no room for the
// full service outcome copy used elsewhere.
const shortDescriptions = {
  'mvp-design': 'Idea to shippable product, fast.',
  'ux-audit': 'Find where users drop off, and why.',
  'saas-product-design': 'Design software people can operate.',
  'design-systems': 'One system, consistent everywhere.',
  'prototyping-and-micro-interactions': 'Interactions that feel inevitable.',
  'ux-strategy': 'Research that changes the roadmap.',
  'behavioural-design': 'Ethical nudges that lift conversion.',
};

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={jsonLd} />

      <Hero />
      <ServicesPreview />
      <SelectedWork />
      <TeachingBand />
    </>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The hero scrubs directly against scroll position as it exits — not a
 * one-shot reveal, but tied to how far the user has actually scrolled.
 * Neutralised (identity ranges) under reduced motion; the hooks are still
 * called so this never violates the rules of hooks.
 */
function Hero() {
  const heroRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Identity-range motion values (reduced ? [x,x] : [a,b]) can end up stuck
  // on the animated range if `reduced` corrects to true on a re-render
  // after mount — Framer Motion doesn't reliably re-evaluate an existing
  // transform against a changed output range. Passing the raw MotionValue
  // only when not reduced, and a plain static value otherwise, sidesteps
  // that entirely: reduced-motion visitors get a real constant, not a
  // transform that might still be tracking the old range.
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const y = reduced ? 0 : yRaw;
  const opacity = reduced ? 1 : opacityRaw;
  const scale = reduced ? 1 : scaleRaw;

  return (
    <section ref={heroRef} className="section hero">
      <Container>
        <motion.div style={{ y, opacity, scale }}>
          <Grid rowGap="var(--s-6)">
            <Col span={{ base: 12, lg: 9 }}>
              <h1 className="t-display hero__title">
                <SplitReveal as="span" className="hero__title-static">
                  DESIGN that decodes
                </SplitReveal>
                <br />
                <HeroRotatingWord />.
              </h1>
            </Col>

            <Col span={{ base: 12, lg: 9 }}>
              <Reveal index={2} className="hero__actions">
                <Button variant="primary" to="/contact" arrow>
                  Connect for Business Growth
                </Button>
              </Reveal>
            </Col>
          </Grid>
        </motion.div>
      </Container>
    </section>
  );
}

/** Cycles the hero's outcome word so the headline reads as one claim
 * applied to several results, instead of committing to just one. */
function HeroRotatingWord() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  const word = HERO_ROTATING_WORDS[index];

  if (reduced) {
    return <span className="hero__rotating-word">{word}</span>;
  }

  return (
    <span className="hero__rotating-word">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          className="hero__rotating-word-inner"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ServicesPreview() {
  const wheelRef = useWheelHorizontalScroll();

  return (
    <section className="section" id="services">
      <Container>
        <h2 className="visually-hidden">Services</h2>
      </Container>
      <Reveal>
        <div
          ref={wheelRef}
          className="flip-card-grid"
          role="region"
          aria-label="Services, scroll horizontally"
        >
          {services.map((service) => (
            <div key={service.slug} className="flip-card">
              <Link
                to={`/services/${service.slug}`}
                className="flip-card__inner"
              >
                <div className="flip-card__face flip-card__face--front">
                  <h3 className="flip-card__title">{service.title}</h3>
                  <Placeholder ratio="auto" className="flip-card__image" />
                </div>
                <div className="flip-card__face flip-card__face--back">
                  <p className="flip-card__description">
                    {shortDescriptions[service.slug]}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function SelectedWork() {
  return (
    <section className="section rule-t">
      <Container>
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
        </Reveal>
      </Container>

      <Reveal
        index={1}
        className="work-treemap"
        style={{ marginTop: 'var(--s-8)' }}
      >
        {work.map((item) => (
          <div key={item.slug} className="work-treemap__cell">
            <Placeholder
              label={item.client}
              ratio="auto"
              className="work-treemap__image"
            />
            <div className="work-treemap__overlay">
              <p className="t-mono subtle">
                {item.discipline} · {item.year}
              </p>
              <h3 className="t-h3">{item.title}</h3>
              <p className="t-mono">{item.result}</p>
            </div>
          </div>
        ))}
      </Reveal>

      <Container>
        <Reveal
          className="marquee client-marquee"
          index={3}
          style={{ marginTop: 'var(--s-8)' }}
        >
          <ul className="marquee__track" aria-label="Selected clients">
            {[...clients, ...clients].map((client, i) => (
              <li
                key={`${client}-${i}`}
                className="t-h3 subtle"
                aria-hidden={i >= clients.length}
              >
                {client}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

/** A small, contained callout — not full-bleed — rather than a full
 * inverted band. It is still the one inverted moment on the page. */
function TeachingBand() {
  return (
    <section className="section">
      <Container>
        <Spotlight className="teaching-callout inverse">
          <Reveal>
            <p className="t-body-lg">
              Are you looking to get some design learning, awareness session
              or want to dig deep into digital design framework.
            </p>
          </Reveal>
          <Reveal index={1}>
            <Button variant="primary" to="/courses" arrow>
              Explore Design Education
            </Button>
          </Reveal>
        </Spotlight>
      </Container>
    </section>
  );
}

