import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { Seo } from '@/components/ui/Seo';
import { CTABand } from '@/components/blocks/CTABand';
import { getService, services } from '@/data/services';
import { site } from '@/data/siteConfig';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <NotFound />;

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    url: `${site.url}/services/${service.slug}`,
  };

  return (
    <>
      <Seo
        title={service.title}
        path={`/services/${service.slug}`}
        description={service.summary}
        jsonLd={jsonLd}
      />

      <section className="section rule-b">
        <Container>
          <Reveal>
            <Link to="/services" className="link-wipe t-mono subtle">
              ← All services
            </Link>
          </Reveal>

          <Grid rowGap="var(--s-8)" style={{ marginTop: 'var(--s-7)' }}>
            <Col span={{ base: 12, lg: 8 }}>
              <Reveal index={1}>
                <Eyebrow>Service</Eyebrow>
              </Reveal>
              <SplitReveal
                as="h1"
                layoutId={`service-title-${service.slug}`}
                className="t-h1"
                style={{ marginTop: 'var(--s-5)' }}
              >
                {service.title}
              </SplitReveal>
              <Reveal index={1}>
                <p
                  className="t-body-lg measure"
                  style={{ marginTop: 'var(--s-6)' }}
                >
                  {service.outcome}
                </p>
                <p
                  className="t-body muted measure"
                  style={{ marginTop: 'var(--s-5)' }}
                >
                  {service.summary}
                </p>
              </Reveal>
            </Col>

            <Col span={{ base: 12, lg: 3 }} start={{ lg: 10 }}>
              <Reveal index={2}>
                <dl className="meta-list">
                  <div>
                    <dt className="t-mono subtle">Timeline</dt>
                    <dd className="t-mono">{service.timeline}</dd>
                  </div>
                  <div>
                    <dt className="t-mono subtle">Starting at</dt>
                    <dd className="t-mono">{service.startingAt}</dd>
                  </div>
                  <div>
                    <dt className="t-mono subtle">Best for</dt>
                    <dd className="t-small muted">{service.bestFor}</dd>
                  </div>
                </dl>

                <div style={{ marginTop: 'var(--s-6)' }}>
                  <Button variant="primary" to="/contact" arrow>
                    Discuss this
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
                <Eyebrow>What you get</Eyebrow>
              </Reveal>
            </Col>

            <Col span={{ base: 12, lg: 7 }} start={{ lg: 6 }}>
              <ul className="check-list">
                {service.deliverables.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item}
                    index={i}
                    className="check-list__item"
                  >
                    <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                    <span className="t-body">{item}</span>
                  </Reveal>
                ))}
              </ul>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section rule-t section--alt">
        <Container>
          <Reveal>
            <Eyebrow>How it runs</Eyebrow>
          </Reveal>

          <Grid rowGap="var(--s-7)" style={{ marginTop: 'var(--s-8)' }}>
            {service.process.map((step, i) => (
              <Col key={step.title} span={{ base: 12, md: 6, lg: 3 }}>
                <Reveal index={i} className="process-step">
                  <span className="t-mono subtle">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="t-h3">{step.title}</h2>
                  <p className="t-small muted">{step.body}</p>
                </Reveal>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      <section className="section rule-t">
        <Container>
          <Reveal>
            <Eyebrow>Other services</Eyebrow>
          </Reveal>

          <Grid rowGap="var(--s-6)" style={{ marginTop: 'var(--s-7)' }}>
            {others.map((other, i) => (
              <Col key={other.slug} span={{ base: 12, md: 4 }}>
                <Reveal index={i}>
                  <Link
                    to={`/services/${other.slug}`}
                    className="mini-card hover-row"
                  >
                    <span className="t-mono subtle">{other.index}</span>
                    <span className="t-h3">{other.title}</span>
                    <span className="t-small muted">{other.outcome}</span>
                  </Link>
                </Reveal>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      <CTABand title={`Ready to talk about ${service.title.toLowerCase()}?`} />
    </>
  );
}
