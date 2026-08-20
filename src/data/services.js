/**
 * The consulting offer.
 *
 * Every field is dummy copy — replace the strings, keep the shape.
 * `slug` drives the /services/:slug route, so changing it changes the URL.
 */

export const services = [
  {
    slug: 'mvp-design',
    index: '01',
    title: 'MVP Design',
    outcome: 'Get from idea to a shippable first version without guessing.',
    summary:
      'A focused engagement that turns a rough concept into a designed, buildable product. We cut scope to the smallest thing that can prove the idea, then design it properly — not a wireframe dump, a real interface your engineers can build from.',
    timeline: '4–6 weeks',
    startingAt: '₹2,40,000',
    bestFor:
      'Founders and early-stage teams with funding and no design partner',
    deliverables: [
      'Product definition and scope cut',
      'Core user flows and information architecture',
      'Full high-fidelity UI for every screen in scope',
      'Interactive prototype for user testing and investor demos',
      'Component library and handoff documentation',
      'Two weeks of build support',
    ],
    process: [
      {
        title: 'Frame',
        body: 'We agree on who this is for, what it must do, and — more importantly — what it will not do in v1.',
      },
      {
        title: 'Structure',
        body: 'Flows, IA and states before any visual work. Most MVPs fail here, not in the pixels.',
      },
      {
        title: 'Design',
        body: 'High-fidelity screens built on a small system so the product stays consistent as it grows.',
      },
      {
        title: 'Hand off',
        body: 'Documented specs, a live prototype, and availability while your team builds it.',
      },
    ],
  },
  {
    slug: 'ux-audit',
    index: '02',
    title: 'UX Audit',
    outcome: 'Find out exactly where your product loses people, and why.',
    summary:
      'A structured teardown of an existing product against heuristics, analytics and real user behaviour. You get a prioritised list of problems ranked by impact and effort — not a 90-slide deck nobody reads.',
    timeline: '2–3 weeks',
    startingAt: '₹90,000',
    bestFor:
      'Live products with traffic but weak activation, retention or conversion',
    deliverables: [
      'Heuristic evaluation across every core flow',
      'Funnel and drop-off analysis against your analytics',
      'Accessibility conformance review (WCAG 2.2 AA)',
      'Prioritised issue register scored by impact and effort',
      'Annotated redesign direction for the top ten issues',
      'Walkthrough session with your product and engineering teams',
    ],
    process: [
      {
        title: 'Baseline',
        body: 'We establish what "working" would look like in numbers before judging anything.',
      },
      {
        title: 'Teardown',
        body: 'Flow-by-flow evaluation against heuristics, accessibility standards and your own data.',
      },
      {
        title: 'Prioritise',
        body: 'Every finding gets scored. You get a queue, not a wish list.',
      },
      {
        title: 'Direct',
        body: 'Concrete redesign direction for the issues that actually move the number.',
      },
    ],
  },
  {
    slug: 'saas-product-design',
    index: '03',
    title: 'SaaS Product Design',
    outcome: 'Design complex software that people can actually operate.',
    summary:
      'Ongoing design partnership for B2B and SaaS products — dashboards, data tables, permissions, settings, billing, onboarding. The unglamorous surfaces where most SaaS products quietly lose their users.',
    timeline: 'Retainer, 3 months minimum',
    startingAt: '₹1,60,000 / month',
    bestFor:
      'Teams shipping continuously who need design capacity, not a one-off project',
    deliverables: [
      'Embedded design capacity across your sprint cycle',
      'Dashboard, data-table and reporting patterns',
      'Onboarding, activation and empty-state design',
      'Permissions, roles and account architecture',
      'Billing, plan and upgrade surfaces',
      'Continuous system maintenance as the product grows',
    ],
    process: [
      {
        title: 'Embed',
        body: 'We join your cycle — standups, planning, the actual backlog. Not a vendor lobbing files over a wall.',
      },
      {
        title: 'Systematise',
        body: 'Recurring patterns get solved once and reused, so velocity increases rather than decays.',
      },
      {
        title: 'Ship',
        body: 'Design lands sprint by sprint, with engineering in the room from the start.',
      },
      {
        title: 'Review',
        body: 'Monthly review against product metrics, and a re-cut of priorities.',
      },
    ],
  },
  {
    slug: 'design-systems',
    index: '04',
    title: 'Design Systems',
    outcome: 'Stop rebuilding the same button for the fourth time.',
    summary:
      'We build, document and hand over a design system your designers and engineers will genuinely use — tokens, components, usage rules and governance. Including the boring parts that decide whether a system survives its first year.',
    timeline: '6–10 weeks',
    startingAt: '₹3,20,000',
    bestFor:
      'Teams past product-market fit whose interface has started drifting',
    deliverables: [
      'Interface audit and component inventory',
      'Token architecture — colour, type, space, motion, elevation',
      'Component library in Figma, built for variants and theming',
      'Code-side component specs and API guidance',
      'Usage, contribution and governance documentation',
      'Team enablement workshops',
    ],
    process: [
      {
        title: 'Inventory',
        body: 'Every existing component gets catalogued. Teams are usually shocked by the count.',
      },
      {
        title: 'Tokenise',
        body: 'A token layer first, so theming and future change cost nothing.',
      },
      {
        title: 'Build',
        body: 'Components built with real variants and states, mirrored to how they will be coded.',
      },
      {
        title: 'Govern',
        body: 'Contribution rules and ownership — the part that decides whether the system lasts.',
      },
    ],
  },
  {
    slug: 'prototyping-and-micro-interactions',
    index: '05',
    title: 'Prototyping & Micro-interactions',
    outcome: 'Make the product feel considered, not just look considered.',
    summary:
      'High-fidelity motion and interaction design — transitions, state changes, loading, feedback, gesture. Delivered as prototypes plus implementation-ready motion specs your engineers can build against exactly.',
    timeline: '2–4 weeks',
    startingAt: '₹1,20,000',
    bestFor: 'Products that look right but feel flat, cheap or unresponsive',
    deliverables: [
      'Motion principles specific to your product',
      'Interactive prototypes of key flows',
      'Micro-interaction specs — easing, duration, choreography',
      'Loading, empty, error and success state design',
      'Reduced-motion variants for every animation',
      'Implementation notes for web or native',
    ],
    process: [
      {
        title: 'Define',
        body: 'Motion principles first. Without them, animation becomes decoration.',
      },
      {
        title: 'Prototype',
        body: 'Working prototypes, not videos — so the timing can be judged honestly.',
      },
      {
        title: 'Specify',
        body: 'Exact curves and durations, documented so engineering does not have to guess.',
      },
      {
        title: 'Support',
        body: 'We review the built implementation and correct the drift.',
      },
    ],
  },
  {
    slug: 'ux-strategy',
    index: '06',
    title: 'Deep UX Strategy',
    outcome: 'Decide what to build, for whom, and in what order.',
    summary:
      'For teams where the real problem is upstream of the interface. Research, segmentation, journey mapping and a prioritised roadmap that ties design decisions to business outcomes leadership actually cares about.',
    timeline: '4–8 weeks',
    startingAt: '₹2,80,000',
    bestFor: 'Teams shipping steadily but not moving the numbers that matter',
    deliverables: [
      'Stakeholder and user research programme',
      'Segmentation and jobs-to-be-done definition',
      'End-to-end journey maps with opportunity scoring',
      'Service blueprint across product and support touchpoints',
      'Prioritised experience roadmap',
      'Measurement framework tying design work to business metrics',
    ],
    process: [
      {
        title: 'Listen',
        body: 'Interviews with your users and your team. Both stories matter; they rarely match.',
      },
      {
        title: 'Map',
        body: 'The real journey, including the parts that happen outside your product.',
      },
      {
        title: 'Score',
        body: 'Opportunities ranked by value and feasibility, not by who argued loudest.',
      },
      {
        title: 'Roadmap',
        body: 'A sequenced plan with a measurement framework attached to it.',
      },
    ],
  },
  {
    slug: 'behavioural-design',
    index: '07',
    title: 'Behavioural Design',
    outcome:
      'Grow conversion with psychology your users would still respect if they saw the plan.',
    summary:
      'Conversion and growth design grounded in behavioural science — framing, defaults, friction placement, social proof, commitment and timing. Applied ethically and tested properly. We do not build dark patterns: they win the quarter and lose the customer, and they are increasingly illegal under the DPDP Act, the EU Digital Services Act and FTC enforcement.',
    timeline: '3–5 weeks',
    startingAt: '₹1,40,000',
    bestFor:
      'Teams with traffic and a conversion, activation or retention problem',
    deliverables: [
      'Behavioural audit of your acquisition and activation funnels',
      'Friction and defaults map across the decision path',
      'Pricing and plan presentation redesign',
      'Prioritised experiment backlog with hypotheses',
      'Designed variants ready for A/B testing',
      'Deceptive-pattern risk review against DPDP, DSA and FTC guidance',
    ],
    process: [
      {
        title: 'Observe',
        body: 'Where users hesitate, abandon or hedge — mapped against the decisions you are asking them to make.',
      },
      {
        title: 'Hypothesise',
        body: 'Each intervention is tied to a named behavioural mechanism, not a growth-blog screenshot.',
      },
      {
        title: 'Design',
        body: 'Variants built to be tested honestly, with guardrail metrics defined up front.',
      },
      {
        title: 'Verify',
        body: 'We check long-term effects, not just the click. Persuasion that erodes trust is a loss.',
      },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

/** Shown on the home page — an abridged version of the full process. */
export const engagementProcess = [
  {
    index: '01',
    title: 'Diagnose',
    body: 'A free 45-minute call to work out what the actual problem is. Often it is not the one you came with.',
  },
  {
    index: '02',
    title: 'Scope',
    body: 'A written proposal with fixed deliverables, timeline and price. No hourly billing, no surprises.',
  },
  {
    index: '03',
    title: 'Design',
    body: 'Weekly working sessions. You see progress continuously rather than at a reveal.',
  },
  {
    index: '04',
    title: 'Hand over',
    body: 'Documented, specced and supported through build — not dropped at the file export.',
  },
];

/** Placeholder case studies. Replace with real work before launch. */
export const work = [
  {
    slug: 'fintech-onboarding',
    client: 'Northwind',
    title: 'Cutting a 9-step onboarding to 3',
    discipline: 'Fintech · UX Audit',
    result: '+34% activation',
    year: '2025',
  },
  {
    slug: 'saas-analytics',
    client: 'Aperture',
    title: 'A reporting surface analysts stopped avoiding',
    discipline: 'B2B SaaS · Product Design',
    result: '2.1× weekly active use',
    year: '2025',
  },
  {
    slug: 'healthcare-system',
    client: 'Meridian',
    title: 'One design system across four products',
    discipline: 'Healthcare · Design Systems',
    result: '−60% design debt',
    year: '2024',
  },
  {
    slug: 'marketplace-mvp',
    client: 'Fieldnote',
    title: 'Marketplace MVP, concept to launch in five weeks',
    discipline: 'Marketplace · MVP',
    result: 'Seed round closed',
    year: '2024',
  },
];
