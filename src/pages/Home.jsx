import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import clsx from 'clsx';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { Spotlight } from '@/components/ui/Spotlight';
import { Seo } from '@/components/ui/Seo';
import { services, work } from '@/data/services';
import { products } from '@/data/products';
import { clients, contact, site } from '@/data/siteConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrambleText } from '@/hooks/useScrambleText';

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

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={jsonLd} />

      <Hero />
      <ServicesPreview />
      <SelectedWork />
      <TeachingBand />
      <InHouseProducts />
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
 * applied to several results, instead of committing to just one. Each
 * change decodes in via useScrambleText rather than sliding. */
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
  const display = useScrambleText(word, { skip: reduced });

  return <span className="hero__rotating-word">{display}</span>;
}

function ServicesPreview() {
  return (
    <section className="section" id="services">
      <Container>
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>

        <Grid rowGap="var(--s-8)" style={{ marginTop: 'var(--s-8)' }}>
          <Col span={{ base: 12, lg: 5 }} className="services-preview__intro">
            <h2 className="t-h1">Design solutions that put people first.</h2>
            <Reveal>
              <p className="t-body muted" style={{ marginTop: 'var(--s-6)' }}>
                Every engagement is fixed-scope and fixed-price. You know
                what you are getting and when, before anything is signed —
                built around the people who will actually use it.
              </p>
              <div style={{ marginTop: 'var(--s-7)' }}>
                <Button variant="primary" to="/services" arrow>
                  Make humanized design solutions
                </Button>
              </div>
            </Reveal>
          </Col>

          <Col span={{ base: 12, lg: 7 }}>
            <Reveal index={1}>
              <ServicesStack />
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </section>
  );
}

/** A vertical, scroll-snapped card stack: whichever card sits at the
 * centre is sharp, everything above and below is blurred back — a sense
 * of depth instead of a flat scrolling row. */
function ServicesStack() {
  const stackRef = useRef(null);
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveSlug(entry.target.dataset.slug);
          }
        });
      },
      { root: stack, threshold: [0.6] },
    );

    stack
      .querySelectorAll('[data-slug]')
      .forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stackRef}
      className="services-stack"
      role="region"
      aria-label="Services, scroll vertically"
      tabIndex={0}
    >
      {services.map((service) => (
        <Link
          key={service.slug}
          to={`/services/${service.slug}`}
          data-slug={service.slug}
          className={clsx(
            'services-stack__card',
            service.slug === activeSlug && 'is-active',
          )}
        >
          <Placeholder ratio="4 / 3" className="services-stack__image" />
          <div className="services-stack__overlay">
            <h3 className="t-h3">{service.title}</h3>
            <p className="t-small">{service.outcome}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function SelectedWork() {
  return (
    <section className="section section--flush-top rule-t">
      <Reveal className="work-treemap" style={{ marginTop: 0 }}>
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
        <Reveal index={1} style={{ marginTop: 'var(--s-8)' }}>
          {/* TODO: point at a real case-studies page once one exists. */}
          <Button variant="secondary" href="#" arrow>
            Read case studies
          </Button>
        </Reveal>

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

/** Edge-to-edge — the one inverted, full-bleed moment on the page. */
function TeachingBand() {
  return (
    <section className="section section--flush">
      <Spotlight className="teaching-callout">
        <TeachingCalloutShapes />
        <Container className="teaching-callout__inner">
          <Reveal>
            <p className="t-body-lg">
              Are you the next upcoming digital geek looking to build on
              sustainability development for the betterment of the world,
              then this cohort is for you.
            </p>
          </Reveal>
          <Reveal index={1}>
            <Button variant="primary" to="/courses" arrow>
              Join the waitlist now
            </Button>
          </Reveal>
        </Container>
      </Spotlight>
    </section>
  );
}

/** Decorative wireframe shapes — subtle grey, sits behind the text. */
function TeachingCalloutShapes() {
  return (
    <svg
      className="teaching-callout__shapes"
      viewBox="0 0 900 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="780" cy="50" r="80" />
      <circle cx="700" cy="230" r="34" />
      <polygon points="830,130 872,160 830,190 788,160" />
      <rect x="600" y="30" width="44" height="44" transform="rotate(45 622 52)" />
      <line x1="560" y1="-10" x2="900" y2="140" />
      <line x1="480" y1="310" x2="760" y2="130" />
      <path d="M 500 0 L 500 300" strokeDasharray="2 10" />
    </svg>
  );
}

/** The studio's own products, built and run alongside client work. */
function InHouseProducts() {
  return (
    <section className="section rule-t">
      <Container>
        <Reveal>
          <Eyebrow>In house Products</Eyebrow>
        </Reveal>

        <Grid rowGap="var(--s-6)" style={{ marginTop: 'var(--s-8)' }}>
          {products.map((product, i) => (
            <Col key={product.slug} span={{ base: 12, md: 4 }}>
              <Reveal index={i} style={{ height: '100%' }}>
                <a
                  href={product.href}
                  className="mini-card product-card"
                  target={product.href.startsWith('http') ? '_blank' : undefined}
                  rel={product.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                >
                  <Placeholder ratio="4 / 3" />
                  <h3 className="t-h3">{product.title}</h3>
                  <p className="t-body muted">{product.tagline}</p>
                </a>
              </Reveal>
            </Col>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

