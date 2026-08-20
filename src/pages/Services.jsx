import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Reveal } from '@/components/ui/Reveal';
import { Seo } from '@/components/ui/Seo';
import { PageHeader } from '@/components/blocks/PageHeader';
import { CTABand } from '@/components/blocks/CTABand';
import { services } from '@/data/services';
import { site } from '@/data/siteConfig';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Design consulting services',
  itemListElement: services.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: service.title,
    description: service.outcome,
    url: `${site.url}/services/${service.slug}`,
  })),
};

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Design consulting: MVP design, UX audits, SaaS product design, design systems, prototyping and micro-interactions, deep UX strategy and behavioural design."
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="Services"
        index="01"
        title="Seven engagements, each with a fixed scope and a fixed price."
        lead="Most briefs land between two of these. The scoping call works out which combination is actually needed — sometimes it is a smaller engagement than the one you came for."
        aside={
          <dl className="meta-list">
            <div>
              <dt className="t-mono subtle">Engagements</dt>
              <dd className="t-mono">{services.length}</dd>
            </div>
            <div>
              <dt className="t-mono subtle">Typical start</dt>
              <dd className="t-mono">2–4 weeks out</dd>
            </div>
            <div>
              <dt className="t-mono subtle">Billing</dt>
              <dd className="t-mono">Fixed, never hourly</dd>
            </div>
          </dl>
        }
      />

      <section>
        <Container>
          <ul>
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} index={i % 3}>
                <Link
                  to={`/services/${service.slug}`}
                  className="service-detail-row hover-row"
                >
                  <Grid>
                    <Col span={{ base: 12, md: 1 }}>
                      <span className="t-mono subtle">{service.index}</span>
                    </Col>

                    <Col span={{ base: 12, md: 4 }}>
                      <h2 className="t-h2 service-detail-row__title">
                        {service.title}
                        <ArrowUpRight
                          size={20}
                          strokeWidth={1.5}
                          className="service-detail-row__arrow"
                          aria-hidden="true"
                        />
                      </h2>
                      <p className="t-small muted">{service.outcome}</p>
                    </Col>

                    <Col span={{ base: 12, md: 4 }}>
                      <ul className="deliverable-list t-small muted">
                        {service.deliverables.slice(0, 4).map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </Col>

                    <Col span={{ base: 12, md: 2 }} start={{ md: 11 }}>
                      <dl className="meta-list meta-list--tight">
                        <div>
                          <dt className="t-mono subtle">Timeline</dt>
                          <dd className="t-mono">{service.timeline}</dd>
                        </div>
                        <div>
                          <dt className="t-mono subtle">From</dt>
                          <dd className="t-mono">{service.startingAt}</dd>
                        </div>
                      </dl>
                    </Col>
                  </Grid>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CTABand
        eyebrow="Not sure which"
        title="Describe the problem and the right engagement gets recommended."
        body="Often the answer is a smaller piece of work than the one you had in mind. That conversation is free and there is no obligation attached to it."
      />
    </>
  );
}
