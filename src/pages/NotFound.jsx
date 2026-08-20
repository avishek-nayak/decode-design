import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Seo } from '@/components/ui/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" />

      <section className="section not-found">
        <Container>
          <Grid>
            <Col span={{ base: 12, lg: 7 }}>
              <Eyebrow index="404">Not found</Eyebrow>
              <h1 className="t-h1" style={{ marginTop: 'var(--s-5)' }}>
                This page does not exist.
              </h1>
              <p
                className="t-body muted measure"
                style={{ marginTop: 'var(--s-6)' }}
              >
                The link may be out of date, or the page may have moved. The
                services and courses are the two things most people are looking
                for.
              </p>
              <div
                className="hero__actions"
                style={{ marginTop: 'var(--s-7)' }}
              >
                <Button variant="primary" to="/" arrow>
                  Back home
                </Button>
                <Button variant="secondary" to="/services">
                  See services
                </Button>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>
    </>
  );
}
