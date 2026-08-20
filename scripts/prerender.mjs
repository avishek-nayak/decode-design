/**
 * Static prerender.
 *
 * `vite build` produces a client bundle plus dist/index.html. This script
 * builds an SSR bundle of the same app, renders every route to HTML, and
 * writes one static file per route.
 *
 * Why not a framework: the site is a plain React + React Router SPA by
 * design, and this keeps it that way while still shipping crawlable HTML —
 * which matters, since search is a lead source for the consulting side.
 *
 * Metadata comes back from render() as a separate string rather than being
 * rendered into the tree — see src/lib/meta.js for why.
 */

import { build } from 'vite';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr-build');

async function main() {
  console.log('› Building SSR bundle');
  await build({
    logLevel: 'warn',
    build: {
      ssr: path.join(root, 'src/entry-server.jsx'),
      outDir: ssrDir,
      emptyOutDir: true,
      // The CSS is already emitted by the client build; the SSR pass only
      // needs the markup.
      cssCodeSplit: false,
    },
  });

  const entryPath = path.join(ssrDir, 'entry-server.js');
  const { render, getStaticPaths } = await import(
    pathToFileURL(entryPath).href
  );

  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
  const paths = getStaticPaths();

  console.log(`› Prerendering ${paths.length} routes`);

  for (const route of paths) {
    const { body, head, hasMeta } = render(route);

    if (!hasMeta) {
      throw new Error(
        `No <Seo> rendered for ${route} — that page would ship with the default title.`,
      );
    }

    const html = template
      .replace('</head>', `  ${head}\n  </head>`)
      .replace(
        '<div id="root"></div>',
        `<div id="root" data-prerendered="true">${body}</div>`,
      );

    const outPath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route.slice(1), 'index.html');

    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
    console.log(`  ✓ ${route}`);
  }

  // Netlify/Cloudflare-style SPA fallback for any route not prerendered.
  await writeFile(
    path.join(distDir, '404.html'),
    await readFile(path.join(distDir, '404/index.html'), 'utf8'),
    'utf8',
  );

  await writeSitemap(paths);
  await writeRobots();
  await rm(ssrDir, { recursive: true, force: true });

  console.log('› Done');
}

async function writeSitemap(paths) {
  const { site } = await import(
    pathToFileURL(path.join(root, 'src/data/siteConfig.js')).href
  );

  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .filter((route) => route !== '/404')
    .map(
      (route) =>
        `  <url>\n    <loc>${site.url}${route === '/' ? '/' : route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
    )
    .join('\n');

  await writeFile(
    path.join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8',
  );
}

async function writeRobots() {
  const { site } = await import(
    pathToFileURL(path.join(root, 'src/data/siteConfig.js')).href
  );

  await writeFile(
    path.join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
    'utf8',
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
