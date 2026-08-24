import { Container, Grid, Col } from '@/components/layout/Grid';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { Seo } from '@/components/ui/Seo';
import { CTABand } from '@/components/blocks/CTABand';
import { intro, principles, timeline, toolkit } from '@/data/about';
import { contact, site } from '@/data/siteConfig';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${site.name}`,
  description: intro.lead,
  url: `${site.url}/about`,
};

export default function About() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Decode.designers is an independent product design practice — seven years of fintech, B2B SaaS, healthcare and marketplace work, now consulting and teaching."
        jsonLd={jsonLd}
      />

      <section className="section rule-b">
        <Container>
          <Grid rowGap="var(--s-8)">
            <Col span={{ base: 12, lg: 7 }}>
              <Reveal>
                <Eyebrow>{intro.eyebrow}</Eyebrow>
                <h1 className="t-h1" style={{ marginTop: 'var(--s-5)' }}>
                  {intro.heading}
                </h1>
                <p
                  className="t-body-lg muted measure"
                  style={{ marginTop: 'var(--s-6)' }}
                >
                  {intro.lead}
                </p>
              </Reveal>
            </Col>

            <Col span={{ base: 12, md: 6, lg: 4 }} start={{ lg: 9 }}>
              <Reveal index={1}>
                <Placeholder label="Portrait" ratio="3 / 4" />
              </Reveal>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Grid rowGap="var(--s-8)">
            <Col span={{ base: 12, lg: 3 }}>
              <Reveal>
                <Eyebrow>The practice</Eyebrow>
              </Reveal>
            </Col>

            <Col span={{ base: 12, lg: 7 }} start={{ lg: 5 }}>
              <div className="prose">
                {intro.body.map((paragraph, i) => (
                  <Reveal as="p" key={i} index={i} className="t-body-lg">
                    {paragraph}
                  </Reveal>
                ))}
              </div>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Grid rowGap="var(--s-8)">
            <Col span={{ base: 12, lg: 3 }}>
              <Reveal>
                <Eyebrow>Background</Eyebrow>
              </Reveal>
            </Col>

            <Col span={{ base: 12, lg: 8 }} start={{ lg: 5 }}>
              <ol className="timeline">
                {timeline.map((entry, i) => (
                  <Reveal
                    as="li"
                    key={entry.period}
                    index={i}
                    className="timeline__item"
                  >
                    <p className="t-mono subtle timeline__period">
                      {entry.period}
                    </p>
                    <div>
                      <h2 className="t-h3">{entry.title}</h2>
                      <p className="t-mono subtle">{entry.role}</p>
                      <p className="t-small muted timeline__body">
                        {entry.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section inverse">
        <Container>
          <Reveal>
            <Eyebrow>How I work</Eyebrow>
          </Reveal>

          <Grid rowGap="var(--s-8)" style={{ marginTop: 'var(--s-8)' }}>
            {principles.map((principle, i) => (
              <Col key={principle.index} span={{ base: 12, md: 6, lg: 4 }}>
                <Reveal index={i % 3} className="process-step">
                  <span className="t-mono subtle">{principle.index}</span>
                  <h3 className="t-h3">{principle.title}</h3>
                  <p className="t-small muted">{principle.body}</p>
                </Reveal>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      <section className="section--tight rule-b">
        <Container>
          <Grid rowGap="var(--s-5)">
            <Col span={{ base: 12, lg: 3 }}>
              <Reveal>
                <p className="t-mono subtle">Toolkit</p>
              </Reveal>
            </Col>
            <Col span={{ base: 12, lg: 8 }} start={{ lg: 5 }}>
              <Reveal index={1}>
                <ul className="tag-row">
                  {toolkit.map((tool) => (
                    <li key={tool} className="tag t-mono">
                      {tool}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </Col>
          </Grid>
        </Container>
      </section>

      <CTABand
        eyebrow="Get in touch"
        title="Working from India, with teams anywhere."
        body={`${contact.location}. ${contact.responseTime}. The first call is a diagnostic, not a pitch.`}
        secondary={{ label: 'Read the FAQ', to: '/faq' }}
      />
    </>
  );
}
