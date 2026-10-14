/** FAQ content, grouped. Dummy copy — replace freely. */

export const faqGroups = [
  {
    id: 'consulting',
    title: 'Consulting',
    faqs: [
      {
        q: 'What does a typical engagement look like?',
        a: 'It starts with a free 45-minute diagnostic call. If there is a fit, you get a written proposal with fixed deliverables, a timeline and a fixed price. Once signed, we work in weekly cycles with a working session each week, so you see progress continuously rather than at a single reveal.',
      },
      {
        q: 'Do you work with early-stage startups?',
        a: 'Yes — MVP Design exists specifically for that. The constraint is funding rather than stage: the engagement needs a decision-maker available weekly and a budget that lets us do the work properly rather than in fragments.',
      },
      {
        q: 'Can you work with our in-house design team?',
        a: 'Often that is the better arrangement. Design Systems and Deep UX Strategy engagements are usually run alongside an existing team, with your designers involved throughout so the capability stays with you afterwards.',
      },
      {
        q: 'Do you do development as well?',
        a: 'No. The practice is design-only. We work closely with your engineers and provide implementation-ready specs, and can recommend development partners if you need one.',
      },
      {
        q: 'What if we need something outside the listed services?',
        a: 'Ask. The service list covers the majority of what comes in, but engagements are scoped individually and most real briefs land somewhere between two of them.',
      },
      {
        q: 'Who owns the work?',
        a: 'You do. On final payment, all deliverables, source files and IP transfer to you outright. We ask only for permission to reference the work publicly, and that is negotiable.',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments & policies',
    faqs: [
      {
        q: 'How do payments work?',
        a: 'Consulting engagements are billed 50% on signature and 50% on delivery, or monthly in advance for retainers.',
      },
      {
        q: 'Which payment methods are accepted?',
        a: 'Cards, UPI, net banking and international cards. The payment gateway is currently being finalised — the checkout page on this site is a preview and does not yet process live payments.',
      },
      {
        q: 'What is the refund policy?',
        a: 'Consulting deposits are non-refundable once the engagement has begun, since the time is reserved.',
      },
      {
        q: 'Do you invoice with GST?',
        a: 'Yes. A GST invoice is issued for every payment. International clients are invoiced in USD under export-of-services provisions.',
      },
    ],
  },
];

/** Flattened list — used for the FAQPage JSON-LD block. */
export const allFaqs = faqGroups.flatMap((g) => g.faqs);
