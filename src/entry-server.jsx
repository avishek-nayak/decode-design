import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { MetaSink } from './components/ui/Seo';
import { metaToHtml, resolveMeta } from './lib/meta';
import { services } from './data/services';
import { courses } from './data/courses';

/** Every URL that gets a static HTML file at build time. */
export function getStaticPaths() {
  return [
    '/',
    '/services',
    ...services.map((s) => `/services/${s.slug}`),
    '/courses',
    ...courses.map((c) => `/courses/${c.slug}`),
    '/about',
    '/faq',
    '/contact',
    '/checkout',
    '/privacy',
    '/terms',
    '/404',
  ];
}

/**
 * Renders one route to markup plus its head tags. The sink collects whatever
 * the page's <Seo> resolved during this synchronous render.
 */
export function render(url) {
  let collected = null;
  const collect = (meta) => {
    collected = meta;
  };

  const body = renderToString(
    <MetaSink value={collect}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </MetaSink>,
  );

  return {
    body,
    head: metaToHtml(collected ?? resolveMeta({ path: url })),
    hasMeta: collected !== null,
  };
}
