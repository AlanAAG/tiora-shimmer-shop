/**
 * Meta Pixel (Facebook Pixel) tracking utilities.
 * Pixel ID: 896348986199542 — initialized in index.html.
 *
 * Provides typed helpers for standard e-commerce events:
 * - PageView (fired automatically by base code)
 * - ViewContent (product pages)
 * - AddToCart (cart interactions)
 * - InitiateCheckout (checkout redirect)
 */

// Extend window with fbq
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(...args);
  }
}

/** Extract numeric Shopify product ID from GID for Meta matching */
export function extractShopifyId(gid: string): string {
  // gid://shopify/Product/123456 → "123456"
  const match = gid.match(/\/(\d+)$/);
  return match ? match[1] : gid;
}

export function trackViewContent(params: {
  contentName: string;
  contentIds: string[];
  contentType?: string;
  value: number;
  currency: string;
}) {
  fbq('track', 'ViewContent', {
    content_name: params.contentName,
    content_ids: params.contentIds,
    content_type: params.contentType || 'product',
    value: params.value,
    currency: params.currency,
  });
}

export function trackAddToCart(params: {
  contentName: string;
  contentIds: string[];
  contentType?: string;
  value: number;
  currency: string;
}) {
  fbq('track', 'AddToCart', {
    content_name: params.contentName,
    content_ids: params.contentIds,
    content_type: params.contentType || 'product',
    value: params.value,
    currency: params.currency,
  });
}

export function trackInitiateCheckout(params: {
  contentIds: string[];
  value: number;
  currency: string;
  numItems: number;
}) {
  fbq('track', 'InitiateCheckout', {
    content_ids: params.contentIds,
    value: params.value,
    currency: params.currency,
    num_items: params.numItems,
  });
}
