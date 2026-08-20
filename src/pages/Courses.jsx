import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Seo } from '@/components/ui/Seo';
import { PageHeader } from '@/components/blocks/PageHeader';
import { CTABand } from '@/components/blocks/CTABand';
import { courses, teachingPrinciples } from '@/data/courses';
import { testimonials } from '@/data/testimonials';
import { site } from '@/data/siteConfig';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Design courses',
  itemListElement: courses.map((course, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      name: course.title,
      description: course.summary,
      url: `${site.url}/courses/${course.slug}`,
      provider: { '@type': 'Organization', name: site.name, url: site.url },
    },
  })),
};

export default function Courses() {
  const courseQuotes = testimonials.filter((t) => t.kind === 'course');

  return (
    <>
      <Seo
        title="Courses"
        path="/courses"
        description="Four courses for designers: UX Foundations, Design Fundamentals, Product Design and Accessibility. Small cohorts, weekly critique, one portfolio-grade project."
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="Courses"
        index="01"
        title="Learn the method behind the work, not a set of screenshots."
        lead="Four courses built out of live client engagements. Small cohorts, weekly critique on your actual work, and one project you carry from brief to finished case study."
        aside={
          <dl className="meta-list">
            <div>
              <dt className="t-mono subtle">Courses</dt>
              <dd className="t-mono">{courses.length}</dd>
            </div>
            <div>
              <dt className="t-mono subtle">Format</dt>
              <dd className="t-mono">Cohort & self-paced</dd>
            </div>
            <div>
              <dt className="t-mono subtle">Access</dt>
              <dd className="t-mono">12 months</dd>
            </div>
          </dl>
        }
      />

      <section className="section">
        <Container>
          <Grid rowGap="var(--s-8)">
            {courses.map((course, i) => (
              <Col key={course.slug} span={{ base: 12, md: 6 }}>
                <Reveal index={i % 2} className="course-card">
                  <Link
                    to={`/courses/${course.slug}`}
                    className="course-card__link"
                  >
                    <div className="course-card__head">
                      <span className="t-mono subtle">{course.index}</span>
                      <span className="tag t-mono">{course.level}</span>
                    </div>

                    <h2 className="t-h2 course-card__title">
                      {course.title}
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className="course-card__arrow"
                        aria-hidden="true"
                      />
                    </h2>
                    <p className="t-mono subtle">{course.subtitle}</p>

                    <p className="t-body muted course-card__summary">
                      {course.summary}
                    </p>

                    <dl className="course-card__meta">
                      <div>
                        <dt className="t-mono subtle">Duration</dt>
                        <dd className="t-mono">{course.duration}</dd>
                      </div>
                      <div>
                        <dt className="t-mono subtle">Modules</dt>
                        <dd className="t-mono">{course.modules}</dd>
                      </div>
                      <div>
                        <dt className="t-mono subtle">Price</dt>
                        <dd className="t-mono">{course.price}</dd>
                      </div>
                    </dl>

                    <p className="t-mono course-card__cohort">
                      {course.nextCohort}
                    </p>
                  </Link>
                </Reveal>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      <section className="section rule-t section--alt">
        <Container>
          <Reveal>
            <Eyebrow index="02">How the teaching works</Eyebrow>
          </Reveal>

          <Grid rowGap="var(--s-7)" style={{ marginTop: 'var(--s-8)' }}>
            {teachingPrinciples.map((principle, i) => (
              <Col key={principle.index} span={{ base: 12, md: 6, lg: 3 }}>
                <Reveal index={i} className="process-step">
                  <span className="t-mono subtle">{principle.index}</span>
                  <h3 className="t-h3">{principle.title}</h3>
                  <p className="t-small muted">{principle.body}</p>
                </Reveal>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      <section className="section rule-t">
        <Container>
          <Reveal>
            <Eyebrow index="03">From past cohorts</Eyebrow>
          </Reveal>

          <Grid rowGap="var(--s-8)" style={{ marginTop: 'var(--s-8)' }}>
            {courseQuotes.map((item, i) => (
              <Col
                key={item.company}
                span={{ base: 12, lg: 10 }}
                start={{ lg: i % 2 === 0 ? 1 : 3 }}
              >
                <Reveal index={i}>
                  <figure className="quote">
                    <blockquote className="t-h2">“{item.quote}”</blockquote>
                    <figcaption className="t-mono subtle">
                      {item.name} · {item.role}, {item.company}
                    </figcaption>
                  </figure>
                </Reveal>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      <CTABand
        eyebrow="Enrol"
        title="Pick a course and take a seat."
        body="Cohorts are capped so critique stays specific. If you are unsure which course fits where you are, write in and describe your situation."
        primary={{ label: 'Go to checkout', to: '/checkout' }}
        secondary={{ label: 'Ask a question', to: '/contact' }}
      />
    </>
  );
}
