import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const distDir = resolve('dist');
const indexPath = resolve(distDir, 'index.html');
const routes = ['booking', 'info', 'about', 'gallery'];

const indexHtml = await readFile(indexPath, 'utf8');

for (const route of routes) {
  const routeIndex = resolve(distDir, route, 'index.html');
  await mkdir(dirname(routeIndex), { recursive: true });
  await writeFile(routeIndex, indexHtml, 'utf8');
}

// Keep a stable, non-fingerprinted image URL for social previews and structured data.
await copyFile(
  resolve('assets/gallery/finished_tattoos/3.webp'),
  resolve(distDir, 'social-preview.webp')
);
