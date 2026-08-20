import { Container, Grid, Col } from '@/components/layout/Grid';
import { Reveal } from '@/components/ui/Reveal';
import { Seo } from '@/components/ui/Seo';
import { lastUpdated, privacySections } from '@/data/privacy';
import { contact } from '@/data/siteConfig';

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy policy"
        path="/privacy"
        description="How Decode.designers collects, uses and retains personal data, and the rights you have over it."
      />

      <section className="section rule-b">
        <Container>
          <Grid rowGap="var(--s-6)">
            <Col span={{ base: 12, lg: 8 }}>
              <Reveal>
                <p className="t-mono subtle">Legal</p>
                <h1 className="t-h1" style={{ marginTop: 'var(--s-5)' }}>
                  Privacy policy
                </h1>
                <p
                  className="t-mono subtle"
                  style={{ marginTop: 'var(--s-5)' }}
                >
                  Last updated {lastUpdated}
                </p>
              </Reveal>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Grid rowGap="var(--s-8)">
            <Col span={{ base: 12, lg: 3 }}>
              <nav className="toc-sticky" aria-label="Sections">
                <p className="t-mono subtle">Contents</p>
                <ul className="toc">
                  {privacySections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="link-wipe t-small">
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Col>

            <Col span={{ base: 12, lg: 7 }} start={{ lg: 5 }}>
              <div className="prose">
                {privacySections.map((section, i) => (
                  <Reveal
                    key={section.id}
                    as="section"
                    id={section.id}
                    index={i % 3}
                    className="policy-section"
                  >
                    <h2 className="t-h3">{section.title}</h2>
                    {section.body.map((paragraph, j) => (
                      <p key={j} className="t-body muted">
                        {paragraph}
                      </p>
                    ))}
                    {section.list ? (
                      <ul className="bullet-list t-body muted">
                        {section.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </Reveal>
                ))}

                <p className="t-small subtle policy-footnote">
                  Questions about any of the above:{' '}
                  <a href={`mailto:${contact.email}`} className="link-wipe">
                    {contact.email}
                  </a>
                  .
                </p>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>
    </>
  );
}
