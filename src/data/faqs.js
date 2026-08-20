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
    id: 'courses',
    title: 'Courses',
    faqs: [
      {
        q: 'Do I need design experience to start?',
        a: 'Not for UX Foundations, Design Fundamentals or Accessibility — those assume nothing. Product Design assumes you already design interfaces and want to work effectively inside a product team.',
      },
      {
        q: 'What software do I need?',
        a: 'Figma, on the free tier, is enough for everything. Any additional tools used in a module have a free option, and none of them are mandatory.',
      },
      {
        q: 'How much time should I budget?',
        a: 'Between four and eight hours a week depending on the course. Cohort courses have fixed live sessions; self-paced courses do not, but the weekly critique deadline is what keeps people finishing.',
      },
      {
        q: 'Is there a certificate?',
        a: 'Yes, on completion. Be realistic about it though — the portfolio case study you build during the course is what actually gets you hired.',
      },
      {
        q: 'What happens if I miss a live session?',
        a: 'Every session is recorded and available within 24 hours, and you keep access for twelve months. Critique can be submitted asynchronously if you cannot attend live.',
      },
      {
        q: 'Do you offer scholarships?',
        a: 'A number of need-based places are set aside for each cohort. Write in with your situation before enrolment opens.',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments & policies',
    faqs: [
      {
        q: 'How do payments work?',
        a: 'Courses are paid up front at enrolment. Consulting engagements are billed 50% on signature and 50% on delivery, or monthly in advance for retainers.',
      },
      {
        q: 'Which payment methods are accepted?',
        a: 'Cards, UPI, net banking and international cards. The payment gateway is currently being finalised — the checkout page on this site is a preview and does not yet process live payments.',
      },
      {
        q: 'What is the refund policy?',
        a: 'Courses can be refunded in full within seven days of the cohort start, provided no more than two modules have been accessed. Consulting deposits are non-refundable once the engagement has begun, since the time is reserved.',
      },
      {
        q: 'Do you invoice with GST?',
        a: 'Yes. A GST invoice is issued for every payment. International clients are invoiced in USD under export-of-services provisions.',
      },
      {
        q: 'Can my employer pay for a course?',
        a: 'Frequently the case. Request a pro-forma invoice at checkout and it will be raised against your company details, with a purchase order accommodated if needed.',
      },
    ],
  },
];

/** Flattened list — used for the FAQPage JSON-LD block. */
export const allFaqs = faqGroups.flatMap((g) => g.faqs);
