/**
 * Purchasable plans for the checkout page.
 *
 * Course plans are derived from courses.js so a price is never stated twice.
 * `amount` is in minor units (paise) — the payment adapter expects minor units,
 * which is what every gateway (Razorpay, Stripe) actually wants.
 */

import { courses } from './courses';

const coursePlans = courses.map((course) => ({
  id: `course-${course.slug}`,
  kind: 'course',
  name: course.title,
  description: course.subtitle,
  amount: course.priceValue,
  currency: course.currency,
  billing: 'One-time',
  meta: [course.duration, course.level, `${course.modules} modules`],
  includes: [
    'Full course access for 12 months',
    'Weekly written and live critique',
    'Portfolio-grade capstone project',
    'Certificate on completion',
    'Private cohort community',
  ],
}));

const consultingPlans = [
  {
    id: 'consult-discovery',
    kind: 'consulting',
    name: 'Diagnostic Call',
    description: 'A 45-minute call to work out what the real problem is',
    amount: 0,
    currency: 'INR',
    billing: 'Free',
    meta: ['45 minutes', 'No commitment'],
    includes: [
      'Review of your product before the call',
      'Problem framing and honest first read',
      'Recommended engagement, or a referral elsewhere',
      'Written summary afterwards',
    ],
  },
  {
    id: 'consult-deposit',
    kind: 'consulting',
    name: 'Engagement Deposit',
    description: 'Reserves your start date against a signed proposal',
    amount: 5000000,
    currency: 'INR',
    billing: '50% of scoped fee',
    meta: ['Against proposal', 'Balance on delivery'],
    includes: [
      'Start date held on the calendar',
      'Kick-off workshop scheduled',
      'Balance invoiced on final delivery',
      'GST invoice issued',
    ],
  },
];

export const plans = [...coursePlans, ...consultingPlans];

export const getPlan = (id) => plans.find((p) => p.id === id);

export const defaultPlanId = coursePlans[0].id;

/** Formats minor units for display, e.g. 1499900 → "₹14,999". */
export function formatAmount(amount, currency = 'INR') {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

/** GST is charged on Indian sales. Placeholder rate — confirm with your CA. */
export const TAX_RATE = 0.18;
export const TAX_LABEL = 'GST (18%)';
