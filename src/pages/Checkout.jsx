import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Lock } from 'lucide-react';
import { Container, Grid, Col } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Field } from '@/components/ui/Field';
import { Reveal } from '@/components/ui/Reveal';
import { Seo } from '@/components/ui/Seo';
import {
  TAX_LABEL,
  TAX_RATE,
  defaultPlanId,
  formatAmount,
  getPlan,
  plans,
} from '@/data/plans';
import { createCheckout, isMockPayments } from '@/lib/payments';

const billingSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().min(6, 'Enter a contact number'),
  company: z.string().trim().optional(),
  gstin: z.string().trim().optional(),
  country: z.string().min(1, 'Select a country'),
});

const countries = [
  { value: 'IN', label: 'India' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SG', label: 'Singapore' },
  { value: 'OTHER', label: 'Elsewhere' },
];

export default function Checkout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState(null);
  const [failure, setFailure] = useState(null);

  const requestedPlan = searchParams.get('plan');
  const plan = getPlan(requestedPlan) ?? getPlan(defaultPlanId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      gstin: '',
      country: 'IN',
    },
  });

  const tax = Math.round(plan.amount * TAX_RATE);
  const total = plan.amount + tax;

  const onSubmit = async (values) => {
    setFailure(null);
    try {
      const checkout = await createCheckout({
        planId: plan.id,
        amount: total,
        currency: plan.currency,
        customer: values,
      });

      if (checkout.redirectUrl) {
        window.location.assign(checkout.redirectUrl);
        return;
      }

      setResult(checkout);
    } catch (error) {
      setFailure(
        error instanceof Error
          ? error.message
          : 'Payment could not be started. Please try again.',
      );
    }
  };

  return (
    <>
      <Seo
        title="Checkout"
        path="/checkout"
        description="Enrol in a Decode.designers course or reserve a consulting engagement."
      />

      <section className="section rule-b">
        <Container>
          <Reveal>
            <Eyebrow>Checkout</Eyebrow>
            <h1 className="t-h1" style={{ marginTop: 'var(--s-5)' }}>
              {result ? 'Order confirmed.' : 'Confirm and pay.'}
            </h1>
          </Reveal>

          {isMockPayments && !result ? (
            <Reveal index={1}>
              <p className="notice t-small" role="note">
                <Lock size={15} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  Preview mode — no payment gateway is connected yet, so nothing
                  is charged and no card details are collected. The flow below
                  is the real one.
                </span>
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="section">
        <Container>
          {result ? (
            <ConfirmationState plan={plan} total={total} result={result} />
          ) : (
            <Grid rowGap="var(--s-9)">
              <Col span={{ base: 12, lg: 7 }}>
                <Reveal>
                  <h2 className="t-mono subtle">
                    Choose what you are paying for
                  </h2>
                  <div
                    className="plan-picker"
                    role="radiogroup"
                    aria-label="Plan"
                  >
                    {plans.map((option) => (
                      <label
                        key={option.id}
                        className={`plan-option ${option.id === plan.id ? 'is-selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="plan"
                          value={option.id}
                          checked={option.id === plan.id}
                          onChange={() => setSearchParams({ plan: option.id })}
                          className="visually-hidden"
                        />
                        <span className="plan-option__body">
                          <span className="t-h3">{option.name}</span>
                          <span className="t-small muted">
                            {option.description}
                          </span>
                        </span>
                        <span className="plan-option__price t-mono">
                          {option.amount === 0
                            ? 'Free'
                            : formatAmount(option.amount, option.currency)}
                        </span>
                      </label>
                    ))}
                  </div>
                </Reveal>

                <Reveal index={1}>
                  <h2 className="t-mono subtle billing-heading">
                    Billing details
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid rowGap="var(--s-6)">
                      <Col span={{ base: 12, md: 6 }}>
                        <Field
                          label="Full name"
                          required
                          autoComplete="name"
                          error={errors.fullName?.message}
                          {...register('fullName')}
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
                          label="Phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                      </Col>
                      <Col span={{ base: 12, md: 6 }}>
                        <Field
                          label="Country"
                          as="select"
                          required
                          options={countries}
                          error={errors.country?.message}
                          {...register('country')}
                        />
                      </Col>
                      <Col span={{ base: 12, md: 6 }}>
                        <Field
                          label="Company"
                          autoComplete="organization"
                          hint="For a company invoice"
                          error={errors.company?.message}
                          {...register('company')}
                        />
                      </Col>
                      <Col span={{ base: 12, md: 6 }}>
                        <Field
                          label="GSTIN"
                          hint="Optional, for Indian input-tax credit"
                          error={errors.gstin?.message}
                          {...register('gstin')}
                        />
                      </Col>

                      <Col span={12}>
                        {failure ? (
                          <p className="field__error t-mono" role="alert">
                            {failure}
                          </p>
                        ) : null}

                        <Button
                          variant="primary"
                          type="submit"
                          arrow
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? 'Processing…'
                            : plan.amount === 0
                              ? 'Request this call'
                              : `Pay ${formatAmount(total, plan.currency)}`}
                        </Button>

                        <p
                          className="t-small subtle"
                          style={{ marginTop: 'var(--s-4)' }}
                        >
                          By continuing you agree to the{' '}
                          <Link to="/privacy" className="link-wipe">
                            privacy policy
                          </Link>
                          . Refunds are covered in the{' '}
                          <Link to="/faq" className="link-wipe">
                            FAQ
                          </Link>
                          .
                        </p>
                      </Col>
                    </Grid>
                  </form>
                </Reveal>
              </Col>

              <Col span={{ base: 12, lg: 4 }} start={{ lg: 9 }}>
                <Reveal index={2}>
                  <OrderSummary plan={plan} tax={tax} total={total} />
                </Reveal>
              </Col>
            </Grid>
          )}
        </Container>
      </section>
    </>
  );
}

function OrderSummary({ plan, tax, total }) {
  return (
    <aside className="summary" aria-label="Order summary">
      <p className="t-mono subtle">Order summary</p>

      <div className="summary__plan">
        <h2 className="t-h3">{plan.name}</h2>
        <p className="t-small muted">{plan.description}</p>
        <ul className="tag-row summary__tags">
          {plan.meta.map((item) => (
            <li key={item} className="tag t-mono">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <ul className="check-list summary__includes">
        {plan.includes.map((item) => (
          <li key={item} className="check-list__item">
            <Check size={15} strokeWidth={1.75} aria-hidden="true" />
            <span className="t-small muted">{item}</span>
          </li>
        ))}
      </ul>

      <dl className="summary__lines">
        <div>
          <dt className="t-mono subtle">Subtotal</dt>
          <dd className="t-mono">{formatAmount(plan.amount, plan.currency)}</dd>
        </div>
        <div>
          <dt className="t-mono subtle">{TAX_LABEL}</dt>
          <dd className="t-mono">{formatAmount(tax, plan.currency)}</dd>
        </div>
        <div className="summary__total">
          <dt className="t-mono">Total</dt>
          <dd className="t-h3">{formatAmount(total, plan.currency)}</dd>
        </div>
      </dl>
    </aside>
  );
}

function ConfirmationState({ plan, total, result }) {
  return (
    <Grid rowGap="var(--s-7)">
      <Col span={{ base: 12, lg: 7 }}>
        <div className="success-state" role="status">
          <p className="t-mono subtle">Reference {result.checkoutId}</p>
          <p className="t-h2">{plan.name} is confirmed.</p>
          <p className="t-body muted measure">
            A receipt and joining instructions are on their way to the email
            address you gave. Course access opens the day the cohort starts;
            consulting engagements are followed up with a scheduling link.
          </p>
          <dl className="summary__lines" style={{ maxWidth: '360px' }}>
            <div className="summary__total">
              <dt className="t-mono">Paid</dt>
              <dd className="t-h3">{formatAmount(total, plan.currency)}</dd>
            </div>
          </dl>
          {isMockPayments ? (
            <p className="t-small subtle">
              Preview mode: this is a simulated confirmation. No money moved and
              no email was sent.
            </p>
          ) : null}
          <div className="enrol-card__actions">
            <Button variant="primary" to="/courses" arrow>
              Back to courses
            </Button>
            <Button variant="secondary" to="/">
              Home
            </Button>
          </div>
        </div>
      </Col>
    </Grid>
  );
}
