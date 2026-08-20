/**
 * The teaching offer — four pillars.
 *
 * Dummy content. `slug` drives /courses/:slug.
 * `priceValue` is in minor units (paise) so the payment adapter never has to
 * parse a formatted string.
 */

export const courses = [
  {
    slug: 'ux-foundations',
    index: '01',
    title: 'UX Foundations',
    subtitle: 'The thinking behind the screens',
    level: 'Beginner',
    duration: '6 weeks',
    commitment: '5–7 hrs / week',
    format: 'Cohort · Live + recorded',
    modules: 8,
    price: '₹14,999',
    priceValue: 1499900,
    currency: 'INR',
    seats: 40,
    nextCohort: 'Starts 6 October',
    summary:
      'Everything that happens before you open a design tool. Research, problem framing, information architecture, flows and usability testing — taught through one project you carry from brief to validated prototype.',
    outcomes: [
      'Run user interviews that produce usable insight, not polite conversation',
      'Turn raw research into a defensible problem statement',
      'Structure information so people find things without being told where',
      'Design and moderate a usability test, then act on what it tells you',
      'Present design decisions to people who disagree with you',
    ],
    curriculum: [
      {
        title: 'What UX actually is',
        lessons: [
          'The discipline beyond the deliverables',
          'Where UX sits inside a product team',
          'Reading a brief critically',
        ],
      },
      {
        title: 'Research without a budget',
        lessons: [
          'Interview technique and question design',
          'Contextual inquiry and diary studies',
          'Synthesis: from transcripts to themes',
        ],
      },
      {
        title: 'Framing the problem',
        lessons: [
          'Jobs to be done in practice',
          'Personas — when they help and when they lie',
          'Writing a problem statement that survives review',
        ],
      },
      {
        title: 'Information architecture',
        lessons: [
          'Mental models and category structure',
          'Card sorting and tree testing',
          'Navigation patterns and their trade-offs',
        ],
      },
      {
        title: 'Flows and states',
        lessons: [
          'Task flows versus user flows',
          'Designing for the unhappy path',
          'Empty, loading, error and success states',
        ],
      },
      {
        title: 'Wireframing with intent',
        lessons: [
          'Fidelity as a deliberate choice',
          'Layout before decoration',
          'Annotating for engineers',
        ],
      },
      {
        title: 'Usability testing',
        lessons: [
          'Writing tasks that do not lead the witness',
          'Moderating without rescuing',
          'Severity rating and prioritisation',
        ],
      },
      {
        title: 'Defending the work',
        lessons: [
          'Rationale over taste',
          'Handling stakeholder feedback',
          'Portfolio case-study structure',
        ],
      },
    ],
  },
  {
    slug: 'design-fundamentals',
    index: '02',
    title: 'Design Fundamentals',
    subtitle: 'Composition, type, colour, grid',
    level: 'Beginner → Intermediate',
    duration: '5 weeks',
    commitment: '4–6 hrs / week',
    format: 'Self-paced + weekly critique',
    modules: 7,
    price: '₹11,999',
    priceValue: 1199900,
    currency: 'INR',
    seats: 60,
    nextCohort: 'Rolling enrolment',
    summary:
      'The craft layer. Why some interfaces feel resolved and others feel amateur, taught as a set of decisions you can reason about rather than a style you copy.',
    outcomes: [
      'Build layouts on a grid instead of eyeballing alignment',
      'Set type with a real scale, measure and rhythm',
      'Use a restricted palette and still create clear hierarchy',
      'Apply spacing systems that hold up across breakpoints',
      'Critique your own work against principles, not vibes',
    ],
    curriculum: [
      {
        title: 'Seeing',
        lessons: [
          'Gestalt principles in interface work',
          'Visual weight and optical correction',
          'Why alignment reads as competence',
        ],
      },
      {
        title: 'Grid systems',
        lessons: [
          'Columns, gutters and margins',
          'Modular and baseline grids',
          'Breaking the grid deliberately',
        ],
      },
      {
        title: 'Typography',
        lessons: [
          'Anatomy, classification and pairing',
          'Type scales, measure and line height',
          'Hierarchy without reaching for bold',
        ],
      },
      {
        title: 'Colour',
        lessons: [
          'Building a value ramp before choosing a hue',
          'Monochrome interfaces and where contrast comes from',
          'Contrast, legibility and colour-blind safety',
        ],
      },
      {
        title: 'Space',
        lessons: [
          'Spacing scales and vertical rhythm',
          'Density as a product decision',
          'Whitespace as hierarchy',
        ],
      },
      {
        title: 'Composition',
        lessons: [
          'Page structure and focal order',
          'Balance, tension and repetition',
          'Editorial layout applied to product UI',
        ],
      },
      {
        title: 'Critique',
        lessons: [
          'A repeatable self-review checklist',
          'Giving and receiving critique',
          'Refining a piece to finished',
        ],
      },
    ],
  },
  {
    slug: 'product-design',
    index: '03',
    title: 'Product Design',
    subtitle: 'From craft to shipped software',
    level: 'Intermediate',
    duration: '8 weeks',
    commitment: '6–8 hrs / week',
    format: 'Cohort · Live + mentorship',
    modules: 9,
    price: '₹24,999',
    priceValue: 2499900,
    currency: 'INR',
    seats: 25,
    nextCohort: 'Starts 3 November',
    summary:
      'How design works inside a real product team — metrics, constraints, engineering, trade-offs and shipping. For designers who can make things look good and now need to make things that ship and work.',
    outcomes: [
      'Tie design decisions to product metrics without becoming a data analyst',
      'Design complex surfaces: dashboards, tables, permissions, settings',
      'Work with engineers in a way they actively want to repeat',
      'Build and maintain a component system as a product scales',
      'Run a design process inside real deadlines and real constraints',
    ],
    curriculum: [
      {
        title: 'The product context',
        lessons: [
          'Discovery, delivery and where design sits',
          'Reading a roadmap',
          'Constraint as material',
        ],
      },
      {
        title: 'Metrics for designers',
        lessons: [
          'Activation, retention, conversion',
          'Instrumenting a flow',
          'Reading a funnel honestly',
        ],
      },
      {
        title: 'Complex interfaces',
        lessons: [
          'Data tables and dense layouts',
          'Filtering, sorting and bulk actions',
          'Progressive disclosure',
        ],
      },
      {
        title: 'Onboarding & activation',
        lessons: [
          'First-run experience design',
          'Empty states that teach',
          'Time-to-value as a design target',
        ],
      },
      {
        title: 'Systems at scale',
        lessons: [
          'Tokens and theming',
          'Component API design',
          'Versioning and deprecation',
        ],
      },
      {
        title: 'Working with engineering',
        lessons: [
          'Handoff that does not need a meeting',
          'Feasibility conversations',
          'Design QA before release',
        ],
      },
      {
        title: 'Experimentation',
        lessons: [
          'Hypothesis writing',
          'A/B tests and their limits',
          'Guardrail metrics',
        ],
      },
      {
        title: 'Design leadership',
        lessons: [
          'Influence without authority',
          'Running a critique',
          'Managing up',
        ],
      },
      {
        title: 'Capstone',
        lessons: [
          'End-to-end feature design',
          'Presenting to a panel',
          'Portfolio-grade case study',
        ],
      },
    ],
  },
  {
    slug: 'accessibility',
    index: '04',
    title: 'Accessibility',
    subtitle: 'WCAG 2.2 in practice',
    level: 'All levels',
    duration: '4 weeks',
    commitment: '4–5 hrs / week',
    format: 'Self-paced + audit clinic',
    modules: 6,
    price: '₹9,999',
    priceValue: 999900,
    currency: 'INR',
    seats: 80,
    nextCohort: 'Rolling enrolment',
    summary:
      'Accessibility as a design skill rather than an engineering checklist. You will finish able to audit a product against WCAG 2.2 AA and design interfaces that pass without retrofitting.',
    outcomes: [
      'Read and apply WCAG 2.2 AA without needing a specialist to translate it',
      'Design colour, type and focus states that pass from the start',
      'Specify semantics, names, roles and states in your handoff',
      'Test with a keyboard and a screen reader competently',
      'Run an accessibility audit and write up the findings',
    ],
    curriculum: [
      {
        title: 'Why this matters',
        lessons: [
          'Disability models and real usage',
          'Legal landscape: RPwD Act, EAA, ADA',
          'The business case, honestly made',
        ],
      },
      {
        title: 'Perceivable',
        lessons: [
          'Contrast, and what the ratios really mean',
          'Text alternatives',
          'Content structure and headings',
        ],
      },
      {
        title: 'Operable',
        lessons: [
          'Keyboard interaction and focus order',
          'Target sizes and pointer gestures',
          'Motion, timing and reduced-motion',
        ],
      },
      {
        title: 'Understandable',
        lessons: [
          'Plain language in interfaces',
          'Form labelling and error recovery',
          'Predictable behaviour',
        ],
      },
      {
        title: 'Robust',
        lessons: [
          'Semantics and ARIA — and when not to use it',
          'Designing for assistive technology',
          'Specifying accessibility in handoff',
        ],
      },
      {
        title: 'Auditing',
        lessons: [
          'Manual and automated testing',
          'Screen reader walkthroughs',
          'Writing an audit report',
        ],
      },
    ],
  },
];

export const getCourse = (slug) => courses.find((c) => c.slug === slug);

/** Teaching promises shown on the courses index. */
export const teachingPrinciples = [
  {
    index: '01',
    title: 'Taught from practice',
    body: 'Every module comes out of client work, not a textbook. You get the version that survives contact with a real deadline.',
  },
  {
    index: '02',
    title: 'One project throughout',
    body: 'You leave with a finished, portfolio-grade case study — not eight disconnected exercises.',
  },
  {
    index: '03',
    title: 'Critique, not grading',
    body: 'Weekly written and live critique on your actual work. That is the part that changes how you design.',
  },
  {
    index: '04',
    title: 'Small cohorts',
    body: 'Capped seats so feedback stays specific. If it scales past that, it stops working.',
  },
];
