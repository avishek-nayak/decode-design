/**
 * Global site configuration.
 * Placeholder values are marked TODO — swap these first.
 */

export const site = {
  name: 'Decode.designers',
  shortName: 'Decode',
  // TODO: replace with the production domain once the site is live.
  url: 'https://decode.designers',
  tagline: 'Digital design consultancy & design education',
  description:
    'Decode.designers is a digital product design practice. We ship MVPs, audit and repair broken UX, build design systems, and teach designers the fundamentals behind the work.',
  locale: 'en_IN',
  founded: 2019,
};

export const contact = {
  // TODO: replace with your real business email.
  email: 'hello@decode.designers',
  // TODO: replace with your booking link (Cal.com, Calendly, etc.).
  bookingUrl: '#',
  location: 'Bengaluru, India — working worldwide',
  timezone: 'IST (UTC+5:30)',
  responseTime: 'Replies within one working day',
};

export const socials = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'Read.cv', href: '#' },
  { label: 'X', href: '#' },
];

export const nav = [
  { label: 'Services', to: '/services' },
  { label: 'Learn', to: '/courses' },
  { label: 'Contact', to: '/contact' },
];

export const footerNav = [
  {
    title: 'Our Products',
    links: [
      // TODO: confirm live URLs for each product before launch.
      { label: 'T-90.club', href: 'https://t-90.club' },
      { label: 'Decode Design Games', href: '#' },
      { label: 'ws.app', href: 'https://ws.app' },
    ],
  },
  {
    title: 'Others',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Who we are?', to: '/about' },
      { label: 'Contact team', to: '/contact' },
      { label: 'FAQs', to: '/faq' },
    ],
  },
];

export const stats = [
  { value: '7', label: 'Years in product design' },
  { value: '40+', label: 'Products shipped' },
  { value: '12', label: 'Design systems built' },
  { value: '900+', label: 'Designers taught' },
];

/** Placeholder client logos — replace with real marks or delete the block. */
export const clients = [
  'Northwind',
  'Aperture',
  'Halcyon',
  'Meridian',
  'Slate & Co',
  'Vantage',
  'Orbital',
  'Fieldnote',
];
