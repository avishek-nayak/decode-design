import { site } from '@/data/siteConfig';

/**
 * Turns <Seo> props into a flat list of head tags.
 *
 * Metadata is deliberately kept out of the React tree. React 19 can render
 * <title>/<meta> inline and hoist them, but those hoisted tags then have to
 * stay exactly where the server put them or hydration fails — which rules it
 * out for a prerendered build. So: the prerender emits these tags into <head>
 * from this function, and the client re-applies them imperatively on
 * navigation. Both paths read the same descriptor, so they cannot drift.
 */
export function resolveMeta({
  title,
  description = site.description,
  path = '/',
  type = 'website',
  jsonLd,
} = {}) {
  const fullTitle = title
    ? `${title} — ${site.name}`
    : `${site.name} — ${site.tagline}`;
  const url = `${site.url}${path === '/' ? '' : path}`;
  const image = `${site.url}/og-default.svg`;

  return {
    title: fullTitle,
    canonical: url,
    metas: [
      { name: 'description', content: description },
      { property: 'og:site_name', content: site.name },
      { property: 'og:type', content: type },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:locale', content: site.locale },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    jsonLd: jsonLd ?? null,
  };
}

/** Serialises a descriptor to HTML — used by the prerender script. */
export function metaToHtml(meta) {
  const parts = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    ...meta.metas.map((tag) => {
      const key = tag.name ? 'name' : 'property';
      const value = tag.name ?? tag.property;
      return `<meta ${key}="${escapeHtml(value)}" content="${escapeHtml(tag.content)}" />`;
    }),
  ];

  if (meta.jsonLd) {
    // JSON.stringify cannot produce "<", but a data value could; escaping the
    // sequence keeps a stray </script> from closing the tag early.
    const json = JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c');
    parts.push(`<script type="application/ld+json">${json}</script>`);
  }

  return parts.join('\n    ');
}

/** Applies a descriptor to the live document — used on client navigation. */
export function applyMeta(meta) {
  document.title = meta.title;

  upsert('link[rel="canonical"]', () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    return link;
  }).setAttribute('href', meta.canonical);

  for (const tag of meta.metas) {
    const key = tag.name ? 'name' : 'property';
    const value = tag.name ?? tag.property;
    upsert(`meta[${key}="${cssEscape(value)}"]`, () => {
      const el = document.createElement('meta');
      el.setAttribute(key, value);
      return el;
    }).setAttribute('content', tag.content);
  }

  const existingJsonLd = document.querySelector(
    'script[type="application/ld+json"][data-route-meta]',
  );
  existingJsonLd?.remove();

  if (meta.jsonLd) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.routeMeta = '';
    script.textContent = JSON.stringify(meta.jsonLd);
    document.head.appendChild(script);
  }
}

function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function cssEscape(value) {
  return value.replace(/"/g, '\\"');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
