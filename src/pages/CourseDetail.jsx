import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { Seo } from '@/components/ui/Seo';
import { CTABand } from '@/components/blocks/CTABand';
import { courses, getCourse } from '@/data/courses';
import { site } from '@/data/siteConfig';
import NotFound from './NotFound';

export default function CourseDetail() {
  const { slug } = useParams();
  const course = getCourse(slug);

  if (!course) return <NotFound />;

  const others = courses.filter((c) => c.slug !== slug);
  const lessonCount = course.curriculum.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary,
    url: `${site.url}/courses/${course.slug}`,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    educationalLevel: course.level,
    numberOfCredits: course.modules,
    offers: {
      '@type': 'Offer',
      price: course.priceValue / 100,
      priceCurrency: course.currency,
      category: 'Paid',
    },
  };

  return (
    <>
      <Seo
        title={course.title}
        path={`/courses/${course.slug}`}
        description={course.summary}
        jsonLd={jsonLd}
      />

      <section className="section rule-b">
        <Container>
          <Reveal>
            <Link to="/courses" className="link-wipe t-mono subtle">
              ← All courses
            </Link>
          </Reveal>

          <Grid rowGap="var(--s-8)" style={{ marginTop: 'var(--s-7)' }}>
            <Col span={{ base: 12, lg: 7 }}>
              <Reveal index={1}>
                <Eyebrow>Course</Eyebrow>
                <h1 className="t-h1" style={{ marginTop: 'var(--s-5)' }}>
                  {course.title}
                </h1>
                <p className="t-body-lg" style={{ marginTop: 'var(--s-4)' }}>
                  {course.subtitle}
                </p>
                <p
                  className="t-body muted measure"
                  style={{ marginTop: 'var(--s-6)' }}
                >
                  {course.summary}
                </p>
              </Reveal>
            </Col>

            <Col span={{ base: 12, lg: 4 }} start={{ lg: 9 }}>
              <Reveal index={2} className="enrol-card">
                <p className="t-mono subtle">Enrol</p>
                <p className="t-h1 enrol-card__price">{course.price}</p>
                <p className="t-mono subtle">One-time · {course.nextCohort}</p>

                <dl className="meta-list" style={{ marginTop: 'var(--s-6)' }}>
                  <div>
                    <dt className="t-mono subtle">Duration</dt>
                    <dd className="t-mono">{course.duration}</dd>
                  </div>
                  <div>
                    <dt className="t-mono subtle">Commitment</dt>
                    <dd className="t-mono">{course.commitment}</dd>
                  </div>
                  <div>
                    <dt className="t-mono subtle">Format</dt>
                    <dd className="t-mono">{course.format}</dd>
                  </div>
                  <div>
                    <dt className="t-mono subtle">Curriculum</dt>
                    <dd className="t-mono">
                      {course.modules} modules · {lessonCount} lessons
                    </dd>
                  </div>
                  <div>
                    <dt className="t-mono subtle">Seats</dt>
                    <dd className="t-mono">{course.seats} per cohort</dd>
                  </div>
                </dl>

                <div className="enrol-card__actions">
                  <Button
                    variant="primary"
                    to={`/checkout?plan=course-${course.slug}`}
                    arrow
                  >
                    Enrol now
                  </Button>
                  <Button variant="secondary" to="/contact">
                    Ask a question
                  </Button>
                </div>
              </Reveal>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Grid rowGap="var(--s-8)">
            <Col span={{ base: 12, lg: 4 }}>
              <Reveal>
                <Eyebrow>What you will be able to do</Eyebrow>
              </Reveal>
            </Col>

            <Col span={{ base: 12, lg: 7 }} start={{ lg: 6 }}>
              <ul className="check-list">
                {course.outcomes.map((outcome, i) => (
                  <Reveal
                    as="li"
                    key={outcome}
                    index={i}
                    className="check-list__item"
                  >
                    <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                    <span className="t-body">{outcome}</span>
                  </Reveal>
                ))}
              </ul>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section rule-t section--alt">
        <Container>
          <Grid rowGap="var(--s-8)">
            <Col span={{ base: 12, lg: 4 }}>
              <Reveal>
                <Eyebrow>Curriculum</Eyebrow>
                <p className="t-body muted" style={{ marginTop: 'var(--s-5)' }}>
                  {course.modules} modules, {lessonCount} lessons. Each module
                  ends with a piece of the capstone project rather than a quiz.
                </p>
              </Reveal>
            </Col>

            <Col span={{ base: 12, lg: 7 }} start={{ lg: 6 }}>
              <Reveal index={1}>
                <Accordion
                  items={course.curriculum}
                  defaultOpen={0}
                  headingLevel={2}
                />
              </Reveal>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section rule-t">
        <Container>
          <Reveal>
            <Eyebrow>Other courses</Eyebrow>
          </Reveal>

          <Grid rowGap="var(--s-6)" style={{ marginTop: 'var(--s-7)' }}>
            {others.map((other, i) => (
              <Col key={other.slug} span={{ base: 12, md: 4 }}>
                <Reveal index={i}>
                  <Link
                    to={`/courses/${other.slug}`}
                    className="mini-card hover-row"
                  >
                    <span className="t-mono subtle">{other.index}</span>
                    <span className="t-h3">{other.title}</span>
                    <span className="t-small muted">{other.subtitle}</span>
                    <span className="t-mono">{other.price}</span>
                  </Link>
                </Reveal>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      <CTABand
        eyebrow="Enrol"
        title={`Take a seat in ${course.title}.`}
        body={`${course.seats} seats per cohort so critique stays specific. Full refund within seven days of the start if it is not what you expected.`}
        primary={{
          label: 'Enrol now',
          to: `/checkout?plan=course-${course.slug}`,
        }}
        secondary={{ label: 'Read the FAQ', to: '/faq' }}
      />
    </>
  );
}
