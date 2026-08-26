import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { Spotlight } from '@/components/ui/Spotlight';
import { Seo } from '@/components/ui/Seo';
import { services, work } from '@/data/services';
import { courses } from '@/data/courses';
import { clients, contact, site } from '@/data/siteConfig';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -72]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 0.2],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 0.95],
  );

  return (
    <section ref={heroRef} className="section hero">
      <Container>
        <motion.div style={{ y, opacity, scale }}>
          <Grid rowGap="var(--s-8)">
            <Col span={{ base: 12, lg: 9 }}>
              <SplitReveal as="h1" className="t-display hero__title">
                DESIGN that decodes Business.
              </SplitReveal>
            </Col>

            <Col span={{ base: 12, md: 6, lg: 5 }}>
              <Reveal index={2}>
                <p className="t-body-lg muted">
                  Decode.designers is a product design practice for teams
                  shipping software that has to work — and a school for
                  designers who want to understand{' '}
                  <span className="em">why</span> it works.
                </p>
              </Reveal>
            </Col>

            <Col span={{ base: 12, md: 6, lg: 5 }} start={{ lg: 8 }}>
              <Reveal index={3} className="hero__actions">
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

function ServicesPreview() {
  return (
    <section className="section" id="services">
      <Container>
        <h2 className="visually-hidden">Services</h2>
        <Reveal>
          <div className="flip-card-grid">
            {services.map((service) => (
              <div key={service.slug} className="flip-card">
                <Link
                  to={`/services/${service.slug}`}
                  className="flip-card__inner"
                >
                  <div className="flip-card__face flip-card__face--front">
                    <h3 className="flip-card__title">{service.title}</h3>
                    <Placeholder
                      label={service.title}
                      ratio="auto"
                      className="flip-card__image"
                    />
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
      </Container>
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

        <Reveal index={2} style={{ marginTop: 'var(--s-8)' }}>
          <div
            className="work-carousel__track"
            role="region"
            aria-label="Selected work, scroll horizontally"
          >
            {work.map((item) => (
              <div key={item.slug} className="work-card" tabIndex={0}>
                <Placeholder
                  label={item.client}
                  ratio="4 / 3"
                  className="work-card__image"
                />
                <div className="work-card__overlay">
                  <p className="t-mono subtle">
                    {item.discipline} · {item.year}
                  </p>
                  <h3 className="t-h3">{item.title}</h3>
                  <p className="t-mono">{item.result}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="marquee client-marquee" index={3}>
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

/** The one inverted band on the page. It is the emphasis device — used once. */
function TeachingBand() {
  return (
    <Spotlight as="section" className="section inverse">
      <Container>
        <Grid rowGap="var(--s-8)">
          <Col span={{ base: 12, lg: 5 }}>
            <Reveal>
              <Eyebrow>Learn</Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className="t-h1" style={{ marginTop: 'var(--s-5)' }}>
              The same method, taught properly.
            </SplitReveal>
            <Reveal>
              <p className="t-body muted" style={{ marginTop: 'var(--s-6)' }}>
                Four courses covering UX, design fundamentals, product design
                and accessibility. Everything taught comes out of live client
                work — small cohorts, weekly critique, one portfolio-grade
                project you carry from start to finish.
              </p>
              <div style={{ marginTop: 'var(--s-7)' }}>
                <Button variant="primary" to="/courses" arrow>
                  Explore courses
                </Button>
              </div>
            </Reveal>
          </Col>

          <Col span={{ base: 12, lg: 6 }} start={{ lg: 7 }}>
            <ul className="course-mini-list">
              {courses.map((course, i) => (
                <Reveal as="li" key={course.slug} index={i}>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="course-mini hover-row"
                  >
                    <span className="t-mono subtle">{course.index}</span>
                    <span className="course-mini__body">
                      <span className="t-h3">{course.title}</span>
                      <span className="t-mono subtle">
                        {course.duration} · {course.level}
                      </span>
                    </span>
                    <span className="t-mono course-mini__price">
                      {course.price}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Col>
        </Grid>
      </Container>
    </Spotlight>
  );
}

