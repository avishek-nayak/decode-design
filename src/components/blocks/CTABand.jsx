import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

export function CTABand({
  eyebrow = 'Next step',
  index = '→',
  title = 'Tell me what is not working.',
  body = 'A 45-minute diagnostic call, free, with a written summary afterwards. If the practice is not the right fit, you will be told that on the call.',
  primary = { label: 'Book a diagnostic call', to: '/contact' },
  secondary,
}) {
  return (
    <section className="section rule-t">
      <Container>
        <Grid rowGap="var(--s-7)">
          <Col span={{ base: 12, lg: 6 }}>
            <Reveal>
              <Eyebrow index={index}>{eyebrow}</Eyebrow>
              <h2 className="t-h2" style={{ marginTop: 'var(--s-5)' }}>
                {title}
              </h2>
            </Reveal>
          </Col>

          <Col span={{ base: 12, lg: 5 }} start={{ lg: 8 }}>
            <Reveal index={1}>
              <p className="t-body muted">{body}</p>
              <div className="cta-band__actions">
                <Button variant="primary" to={primary.to} arrow>
                  {primary.label}
                </Button>
                {secondary ? (
                  <Button variant="secondary" to={secondary.to}>
                    {secondary.label}
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </Col>
        </Grid>
      </Container>
    </section>
  );
}
