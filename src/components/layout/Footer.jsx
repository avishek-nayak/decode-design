import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { AuditLeadForm } from '@/components/ui/AuditLeadForm';
import { contact, footerNav, site } from '@/data/siteConfig';
import { services } from '@/data/services';
import { courses } from '@/data/courses';

const footerGroups = [
  {
    title: 'Services',
    links: services.map((s) => ({ label: s.title, to: `/services/${s.slug}` })),
  },
  {
    title: 'Educate yourself',
    links: courses.map((c) => ({ label: c.title, to: `/courses/${c.slug}` })),
  },
  ...footerNav,
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer inverse">
      <div className="container">
        <div className="site-footer__intro">
          <div className="site-footer__intro-left">
            <p className="t-h2 measure-tight">
              Analyse if your product needs deciding, redesigning or pivoting ?
            </p>
            <p className="t-body muted" style={{ marginTop: 'var(--s-5)' }}>
              Decoding designers from India (UTC +5:30)
            </p>
            <a href="tel:+919925403798" className="link-wipe t-body-lg site-footer__phone">
              +91 9925403798
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="link-wipe t-body-lg site-footer__email"
            >
              {contact.email}
            </a>
            <div style={{ marginTop: 'var(--s-6)' }}>
              <Button variant="primary" to="/contact" arrow>
                Connect for Business Growth
              </Button>
            </div>
          </div>

          <div className="site-footer__intro-right">
            <AuditLeadForm />
          </div>
        </div>

        <div className="site-footer__nav-row">
          {footerGroups.map((group) => (
            <div key={group.title} className="site-footer__nav-col">
              <h2 className="t-mono subtle">{group.title}</h2>
              <ul className="site-footer__list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        className="link-wipe t-small"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="link-wipe t-small">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p className="t-mono subtle">
            © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
