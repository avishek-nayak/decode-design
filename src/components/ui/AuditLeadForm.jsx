import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Button } from '@/components/ui/Button';
import { auditLeadSchema, submitAuditLead } from '@/lib/auditLead';

/**
 * The compact "get a free UX report" lead form in the footer — a second,
 * lower-commitment path alongside the "Connect for Business Growth" CTA.
 * Same validate-then-stub-submit pattern as the full enquiry form on the
 * Contact page (see src/lib/enquiry.js), just with its own smaller schema
 * and boxed, placeholder-led field styling to match the footer's look.
 */
export function AuditLeadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(auditLeadSchema),
    defaultValues: {
      email: '',
      phone: '',
      businessLink: '',
      problem: '',
      otherDetails: '',
    },
  });

  const onSubmit = async (values) => {
    await submitAuditLead(values);
  };

  if (isSubmitSuccessful) {
    return (
      <div className="audit-lead-form__success" role="status">
        <p className="t-h3">Thanks — that's through.</p>
        <p className="t-small subtle" style={{ marginTop: 'var(--s-3)' }}>
          We will get back with your free UX report shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="audit-lead-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="audit-lead-form__row">
        <AuditField
          id="audit-email"
          label="Email ID"
          placeholder="EMAIL ID"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <AuditField
          id="audit-phone"
          label="Phone number"
          placeholder="PHONE NUMBER"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <AuditField
          id="audit-link"
          label="Business link"
          placeholder="BUSINESS LINK"
          type="text"
          error={errors.businessLink?.message}
          {...register('businessLink')}
        />
      </div>

      <AuditField
        as="textarea"
        id="audit-problem"
        label="Your business problem"
        placeholder="Enter your business problem under 100 characters"
        rows={3}
        maxLength={100}
        error={errors.problem?.message}
        {...register('problem')}
      />

      <AuditField
        as="textarea"
        id="audit-other"
        label="Anything else that would help"
        placeholder="Any other details that would help us in auditing better"
        rows={3}
        {...register('otherDetails')}
      />

      <Button
        variant="primary"
        type="submit"
        className="audit-lead-form__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending…' : 'Get FREE UX report'}
      </Button>
    </form>
  );
}

function AuditField({ as = 'input', id, label, error, className, ...rest }) {
  const Tag = as;
  const errorId = `${id}-error`;

  return (
    <div className={clsx('audit-lead-form__field', error && 'audit-lead-form__field--invalid', className)}>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <Tag
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error ? (
        <p id={errorId} role="alert" className="audit-lead-form__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
