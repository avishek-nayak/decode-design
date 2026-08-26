import { Link } from 'react-router-dom';
import { Grid, Col } from './Grid';
import { Button } from '@/components/ui/Button';
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
        <Grid rowGap="var(--s-8)" className="site-footer__top">
          <Col span={{ base: 12, md: 5 }}>
            <p className="t-h2 measure-tight">
              Have a product that needs deciding, designing or repairing?
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
          </Col>

          <Col span={{ base: 12, md: 6 }} start={{ md: 7 }}>
            <Grid rowGap="var(--s-7)">
              {footerGroups.map((group) => (
                <Col key={group.title} span={{ base: 12, md: 6 }}>
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
                </Col>
              ))}
            </Grid>
          </Col>
        </Grid>

        <div className="site-footer__bottom">
          <p className="t-mono subtle">
            © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
