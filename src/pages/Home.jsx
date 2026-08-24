import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { Spotlight } from '@/components/ui/Spotlight';
import { Seo } from '@/components/ui/Seo';
import { CTABand } from '@/components/blocks/CTABand';
import { ProcessLineChart } from '@/components/blocks/ProcessLineChart';
import { services, engagementProcess, work } from '@/data/services';
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

export default function Home() {
  return (
    <>
      <Seo path="/" jsonLd={jsonLd} />

      <Hero />
      <ServicesPreview />
      <Process />
      <SelectedWork />
      <TeachingBand />
      <CTABand secondary={{ label: 'See all services', to: '/services' }} />
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
                Design that decides what to build, not just how it looks.
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
                  Book a consultation
                </Button>
                <Button variant="secondary" to="/courses">
                  Explore courses
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
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.service-card');
    const amount = (card?.offsetWidth ?? 340) + 20;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <section className="section" id="services">
      <Container>
        <Grid rowGap="var(--s-8)">
          <Col span={{ base: 12, lg: 4 }} className="services-preview__intro">
            <Reveal>
              <Eyebrow>Services</Eyebrow>
              <h2 className="t-h2" style={{ marginTop: 'var(--s-5)' }}>
                Seven ways to work together.
              </h2>
              <p className="t-body muted" style={{ marginTop: 'var(--s-5)' }}>
                Every engagement is fixed-scope and fixed-price. You know what
                you are getting and when, before anything is signed.
              </p>
              <div style={{ marginTop: 'var(--s-6)' }}>
                <Button variant="secondary" to="/services" arrow>
                  All services
                </Button>
              </div>
            </Reveal>
          </Col>

          <Col span={{ base: 12, lg: 8 }}>
            <Reveal index={1} className="services-preview__arrows">
              <button
                type="button"
                className="work-carousel__arrow"
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll to previous service"
              >
                <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="work-carousel__arrow"
                onClick={() => scrollByCard(1)}
                aria-label="Scroll to next service"
              >
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </Reveal>

            <Reveal index={2}>
              <div
                className="services-carousel__track"
                ref={trackRef}
                role="region"
                aria-label="Services, scroll horizontally"
              >
                {services.map((service) => (
                  <div key={service.slug} className="service-card">
                    <Link
                      to={`/services/${service.slug}`}
                      className="service-card__link"
                    >
                      <div className="service-card__head">
                        <span className="t-mono subtle">{service.index}</span>
                        <span className="t-mono subtle">
                          {service.timeline}
                        </span>
                      </div>

                      <h3 className="t-h3 service-card__title">
                        {service.title}
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.5}
                          className="service-card__arrow"
                          aria-hidden="true"
                        />
                      </h3>
                      <p className="t-small muted">{service.outcome}</p>

                      <p className="t-mono service-card__price">
                        From {service.startingAt}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </section>
  );
}

function Process() {
  const [active, setActive] = useState(0);

  return (
    <section className="section rule-t section--alt">
      <Container>
        <Reveal>
          <Eyebrow>How it runs</Eyebrow>
        </Reveal>

        <Grid rowGap="var(--s-8)" style={{ marginTop: 'var(--s-8)' }}>
          <Col span={{ base: 12, lg: 5 }} className="process-chart-col">
            <Reveal>
              <ProcessLineChart steps={engagementProcess} active={active} />
            </Reveal>
          </Col>

          <Col span={{ base: 12, lg: 6 }} start={{ lg: 7 }}>
            <ol className="process-list">
              {engagementProcess.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.index}
                  index={i}
                  className={`process-list__item ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                >
                  <span className="t-mono subtle">{step.index}</span>
                  <span>
                    <span className="t-h3">{step.title}</span>
                    <span className="t-small muted process-list__body">
                      {step.body}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </Col>
        </Grid>
      </Container>
    </section>
  );
}

function SelectedWork() {
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.work-card');
    const amount = (card?.offsetWidth ?? 420) + 24;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <section className="section rule-t">
      <Container>
        <div className="section-head">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
          </Reveal>
          <Reveal index={1} className="work-carousel__controls">
            <div className="work-carousel__arrows">
              <button
                type="button"
                className="work-carousel__arrow"
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll to previous work"
              >
                <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="work-carousel__arrow"
                onClick={() => scrollByCard(1)}
                aria-label="Scroll to next work"
              >
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal index={2}>
          <div
            className="work-carousel__track"
            ref={trackRef}
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

