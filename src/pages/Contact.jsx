import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Field } from '@/components/ui/Field';
import { Reveal } from '@/components/ui/Reveal';
import { DrawCheck } from '@/components/ui/DrawCheck';
import { Seo } from '@/components/ui/Seo';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  budgets,
  enquirySchema,
  projectTypes,
  submitEnquiry,
} from '@/lib/enquiry';
import { contact, socials } from '@/data/siteConfig';
import { engagementProcess } from '@/data/services';

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    await submitEnquiry(values);
  };

  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Start a design engagement or ask a question about the courses. Every enquiry gets a reply within one working day."
      />

      <section className="section rule-b">
        <Container>
          <Grid rowGap="var(--s-9)">
            <Col span={{ base: 12, lg: 6 }}>
              <Reveal>
                <Eyebrow>Contact</Eyebrow>
                <h1 className="t-h1" style={{ marginTop: 'var(--s-5)' }}>
                  Tell me what is not working.
                </h1>
                <p
                  className="t-body-lg muted measure"
                  style={{ marginTop: 'var(--s-6)' }}
                >
                  The more specific you are, the more useful the first reply
                  will be. Rough budgets are fine — the number is there to work
                  out the right shape of engagement, not to filter anyone out.
                </p>
              </Reveal>

              {isSubmitSuccessful ? (
                <SuccessState />
              ) : (
                <form
                  className="enquiry-form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <Grid rowGap="var(--s-6)">
                    <Col span={{ base: 12, md: 6 }}>
                      <Field
                        label="Name"
                        required
                        autoComplete="name"
                        error={errors.name?.message}
                        {...register('name')}
                      />
                    </Col>

                    <Col span={{ base: 12, md: 6 }}>
                      <Field
                        label="Email"
                        type="email"
                        required
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </Col>

                    <Col span={{ base: 12, md: 6 }}>
                      <Field
                        label="Company"
                        autoComplete="organization"
                        error={errors.company?.message}
                        {...register('company')}
                      />
                    </Col>

                    <Col span={{ base: 12, md: 6 }}>
                      <Field
                        label="Budget"
                        as="select"
                        required
                        options={budgets}
                        error={errors.budget?.message}
                        {...register('budget')}
                      />
                    </Col>

                    <Col span={12}>
                      <Field
                        label="What do you need"
                        as="select"
                        required
                        options={projectTypes}
                        error={errors.projectType?.message}
                        {...register('projectType')}
                      />
                    </Col>

                    <Col span={12}>
                      <Field
                        label="The problem"
                        as="textarea"
                        rows={6}
                        required
                        hint="What is happening now, what should be happening, and what you have already tried."
                        error={errors.message?.message}
                        {...register('message')}
                      />
                    </Col>

                    <Col span={12}>
                      <Button
                        variant="primary"
                        type="submit"
                        arrow
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending…' : 'Send enquiry'}
                      </Button>
                      <p
                        className="t-small subtle"
                        style={{ marginTop: 'var(--s-4)' }}
                      >
                        This form is a preview and does not yet deliver mail.
                        Email directly in the meantime.
                      </p>
                    </Col>
                  </Grid>
                </form>
              )}
            </Col>

            <Col span={{ base: 12, lg: 4 }} start={{ lg: 9 }}>
              <Reveal index={1}>
                <div className="contact-aside">
                  <div>
                    <p className="t-mono subtle">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="link-wipe t-body-lg"
                    >
                      {contact.email}
                    </a>
                  </div>

                  <div>
                    <p className="t-mono subtle">Book directly</p>
                    <a
                      href={contact.bookingUrl}
                      className="link-wipe t-body-lg"
                    >
                      45-minute diagnostic call
                    </a>
                  </div>

                  <div>
                    <p className="t-mono subtle">Where</p>
                    <p className="t-body">{contact.location}</p>
                    <p className="t-small subtle">{contact.timezone}</p>
                  </div>

                  <div>
                    <p className="t-mono subtle">Response time</p>
                    <p className="t-body">{contact.responseTime}</p>
                  </div>

                  <div>
                    <p className="t-mono subtle">Elsewhere</p>
                    <ul className="contact-aside__socials">
                      {socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            className="link-wipe t-small"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </Col>
          </Grid>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Reveal>
            <Eyebrow>What happens next</Eyebrow>
          </Reveal>

          <Grid rowGap="var(--s-7)" style={{ marginTop: 'var(--s-8)' }}>
            {engagementProcess.map((step, i) => (
              <Col key={step.index} span={{ base: 12, md: 6, lg: 3 }}>
                <Reveal index={i} className="process-step">
                  <span className="t-mono subtle">{step.index}</span>
                  <h2 className="t-h3">{step.title}</h2>
                  <p className="t-small muted">{step.body}</p>
                </Reveal>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>
    </>
  );
}

function SuccessState() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="success-state"
      role="status"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <DrawCheck />
      <p className="t-mono subtle">Sent</p>
      <p className="t-h2">Thanks — that has come through.</p>
      <p className="t-body muted measure">
        You will get a reply within one working day, usually sooner. If it is
        urgent, email directly at {contact.email}.
      </p>
      <p className="t-small subtle">
        Note: this is a preview build, so nothing was actually transmitted.
      </p>
    </motion.div>
  );
}
