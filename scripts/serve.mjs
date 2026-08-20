/**
 * Static preview server for the prerendered build.
 *
 * `vite preview` falls back to dist/index.html for any unknown path, which
 * means /services would be served Home's HTML — it never shows you the
 * prerendered pages. This resolves clean URLs to their directory index the
 * way Netlify, Vercel, Cloudflare Pages and nginx do, so what you see locally
 * is what production serves.
 *
 *   node scripts/serve.mjs [port]
 */

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.join(process.cwd(), 'dist');
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
};

async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);

  // Keep every lookup inside dist, whatever the request says.
  const target = path.join(distDir, path.normalize(decoded));
  if (!target.startsWith(distDir)) return null;

  const candidates = path.extname(target)
    ? [target]
    : [path.join(target, 'index.html'), `${target}.html`];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      // try the next candidate
    }
  }

  return null;
}

const server = createServer(async (req, res) => {
  const file =
    (await resolveFile(req.url ?? '/')) ?? (await resolveFile('/404.html'));

  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const isFallback = file.endsWith('404.html');
  res.writeHead(isFallback ? 404 : 200, {
    'content-type': MIME[path.extname(file)] ?? 'application/octet-stream',
    'cache-control': file.includes(`${path.sep}assets${path.sep}`)
      ? 'public, max-age=31536000, immutable'
      : 'no-cache',
  });

  createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`› Serving dist/ at http://127.0.0.1:${port}`);
});
