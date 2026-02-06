import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://tiora.in';
// Use process.cwd() to be safe with paths in different environments
const PRODUCTS_FILE = resolve(process.cwd(), 'src/data/products.ts');
const OUTPUT_FILE = resolve(process.cwd(), 'public/sitemap.xml');

const staticRoutes = [
  '/',
  '/shop',
  '/about',
  '/reviews',
  '/faq',
  '/care-guide',
  '/privacy',
  '/terms',
  '/refund',
  '/contact',
  '/bracelets',
  '/necklaces'
];

function extractSlugs(content: string): string[] {
  const regex = /slug:\s*"([^"]+)"/g;
  const slugs: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function generateSitemap() {
  console.log('Reading products file from:', PRODUCTS_FILE);
  try {
    const content = readFileSync(PRODUCTS_FILE, 'utf-8');
    const slugs = extractSlugs(content);

    console.log(`Found ${slugs.length} products.`);

    const routes = [
      ...staticRoutes,
      ...slugs.map(slug => `/product/${slug}`)
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    console.log('Writing sitemap to:', OUTPUT_FILE);
    writeFileSync(OUTPUT_FILE, sitemap);
    console.log('Sitemap generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
