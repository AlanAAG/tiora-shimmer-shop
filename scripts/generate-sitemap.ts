import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://tiora.co';
const OUTPUT_FILE = resolve(process.cwd(), 'public/sitemap.xml');

// Shopify Constants
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'jtv22j-ew.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = 'e4ae94ae9cc93e3130d277bcd0f1df39';
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

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
  '/shop/best-sellers',
  '/shop/rings',
  '/shop/earrings',
  '/shop/bracelets',
  '/shop/necklaces'
];

async function fetchProductHandles() {
  const query = `
    query GetProductHandles($first: Int!) {
      products(first: $first) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
      },
      body: JSON.stringify({
        query,
        variables: { first: 250 }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`);
    }

    return json.data.products.edges.map((edge: { node: { handle: string } }) => edge.node.handle);
  } catch (error) {
    console.error('Error fetching product handles:', error);
    return [];
  }
}

async function generateSitemap() {
  console.log('Generating sitemap...');

  const productHandles = await fetchProductHandles();
  console.log(`Found ${productHandles.length} products from Shopify.`);

  const routes = [
    ...staticRoutes,
    ...productHandles.map((handle: string) => `/product/${handle}`)
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
}

generateSitemap();
