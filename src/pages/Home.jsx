import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { Spotlight } from '@/components/ui/Spotlight';
import { Seo } from '@/components/ui/Seo';
import { CTABand } from '@/components/blocks/CTABand';
import { services, engagementProcess, work } from '@/data/services';
import { courses } from '@/data/courses';
import { testimonials } from '@/data/testimonials';
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
      <Testimonials />
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
  return (
    <section className="section" id="services">
      <Container>
        <Grid rowGap="var(--s-8)">
          <Col span={{ base: 12, lg: 4 }}>
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
                <Button variant="ghost" to="/services" arrow>
                  All services
                </Button>
              </div>
            </Reveal>
          </Col>

          <Col span={{ base: 12, lg: 7 }} start={{ lg: 6 }}>
            <ul className="service-list">
              {services.map((service, i) => (
                <Reveal as="li" key={service.slug} index={i % 4}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="service-row hover-row"
                  >
                    <span className="t-mono subtle service-row__index">
                      {service.index}
                    </span>
                    <span className="service-row__body">
                      <span className="t-h3">{service.title}</span>
                      <span className="t-small muted">{service.outcome}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="service-row__arrow"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Col>
        </Grid>
      </Container>
    </section>
  );
}

function Process() {
  return (
    <section className="section rule-t section--alt">
      <Container>
        <Reveal>
          <Eyebrow>How it runs</Eyebrow>
        </Reveal>

        <Grid rowGap="var(--s-7)" style={{ marginTop: 'var(--s-8)' }}>
          {engagementProcess.map((step, i) => (
            <Col key={step.index} span={{ base: 12, md: 6, lg: 3 }}>
              <Reveal index={i} className="process-step">
                <span className="t-mono subtle">{step.index}</span>
                <h3 className="t-h3">{step.title}</h3>
                <p className="t-small muted">{step.body}</p>
              </Reveal>
            </Col>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

function SelectedWork() {
  return (
    <section className="section rule-t">
      <Container>
        <div className="section-head">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
          </Reveal>
          <Reveal index={1}>
            <p className="t-mono subtle">Placeholder case studies</p>
          </Reveal>
        </div>

        <Grid rowGap="var(--s-8)" style={{ marginTop: 'var(--s-8)' }}>
          {work.map((item, i) => (
            <Col key={item.slug} span={{ base: 12, md: 6 }}>
              <Reveal index={i % 2} className="work-card">
                <Placeholder label={item.client} ratio="16 / 10" />
                <div className="work-card__meta">
                  <p className="t-mono subtle">
                    {item.discipline} · {item.year}
                  </p>
                  <h3 className="t-h3">{item.title}</h3>
                  <p className="t-mono">{item.result}</p>
                </div>
              </Reveal>
            </Col>
          ))}
        </Grid>

        <Reveal className="marquee client-marquee" index={2}>
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

function Testimonials() {
  return (
    <section className="section">
      <Container>
        <Reveal>
          <Eyebrow>What people say</Eyebrow>
        </Reveal>

        <Reveal index={1} className="testimonial-row">
          {testimonials.map((item) => (
            <figure key={item.name + item.role} className="testimonial-card">
              <blockquote className="t-small">“{item.quote}”</blockquote>
              <figcaption className="t-mono subtle">
                {item.name} — {item.role}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
