import { Link } from 'react-router-dom';
import { Grid, Col } from './Grid';
import { contact, footerNav, site, socials } from '@/data/siteConfig';

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
              {contact.responseTime}. {contact.location}.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="link-wipe t-body-lg site-footer__email"
            >
              {contact.email}
            </a>
          </Col>

          <Col span={{ base: 12, md: 6 }} start={{ md: 7 }}>
            <Grid rowGap="var(--s-7)">
              {footerNav.map((group) => (
                <Col key={group.title} span={{ base: 6, md: 4 }}>
                  <h2 className="t-mono subtle">{group.title}</h2>
                  <ul className="site-footer__list">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className="link-wipe t-small">
                          {link.label}
                        </Link>
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

          <ul className="site-footer__socials">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="link-wipe t-mono"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="t-mono subtle">{contact.timezone}</p>
        </div>
      </div>
    </footer>
  );
}
