import { Container, Grid, Col } from '@/components/layout/Grid';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';

/** The standard opening block for every page except Home. */
export function PageHeader({ eyebrow, title, lead, aside }) {
  return (
    <section className="section rule-b">
      <Container>
        <Grid rowGap="var(--s-7)">
          <Col span={{ base: 12, lg: 8 }}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <SplitReveal as="h1" className="t-h1" style={{ marginTop: 'var(--s-5)' }}>
              {title}
            </SplitReveal>
            {lead ? (
              <Reveal index={2}>
                <p
                  className="t-body-lg muted measure"
                  style={{ marginTop: 'var(--s-6)' }}
                >
                  {lead}
                </p>
              </Reveal>
            ) : null}
          </Col>

          {aside ? (
            <Col span={{ base: 12, lg: 3 }} start={{ lg: 10 }}>
              <Reveal index={3}>{aside}</Reveal>
            </Col>
          ) : null}
        </Grid>
      </Container>
    </section>
  );
}
