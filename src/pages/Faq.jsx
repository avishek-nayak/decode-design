import { Container, Grid, Col } from '@/components/layout/Grid';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { Seo } from '@/components/ui/Seo';
import { PageHeader } from '@/components/blocks/PageHeader';
import { CTABand } from '@/components/blocks/CTABand';
import { allFaqs, faqGroups } from '@/data/faqs';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function Faq() {
  return (
    <>
      <Seo
        title="FAQ"
        path="/faq"
        description="Common questions about consulting engagements, courses, payments and refund policies at Decode.designers."
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="FAQ"
        index="01"
        title="Questions that come up before people get in touch."
        lead="If what you need is not answered here, ask directly — every enquiry gets a reply within one working day."
        aside={
          <nav aria-label="FAQ sections">
            <ul className="toc">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a href={`#${group.id}`} className="link-wipe t-mono">
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {faqGroups.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          className={groupIndex > 0 ? 'section rule-t' : 'section'}
        >
          <Container>
            <Grid rowGap="var(--s-7)">
              <Col span={{ base: 12, lg: 3 }}>
                <Reveal>
                  <Eyebrow index={String(groupIndex + 1).padStart(2, '0')}>
                    {group.title}
                  </Eyebrow>
                </Reveal>
              </Col>

              <Col span={{ base: 12, lg: 8 }} start={{ lg: 5 }}>
                <Reveal index={1}>
                  <Accordion items={group.faqs} headingLevel={2} />
                </Reveal>
              </Col>
            </Grid>
          </Container>
        </section>
      ))}

      <CTABand
        eyebrow="Still unclear"
        title="Ask the thing this page did not answer."
        body="Questions about scope, timelines, pricing or whether a course is the right level — all fine. You will get a straight answer rather than a sales call."
      />
    </>
  );
}
