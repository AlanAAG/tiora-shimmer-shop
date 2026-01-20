import { useQuery } from '@tanstack/react-query';
import { fetchShopifyProducts, fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(first: number = 50, query?: string) {
  return useQuery({
    queryKey: ['shopify-products', first, query],
    queryFn: () => fetchShopifyProducts(first, query),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useShopifyProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: () => handle ? fetchProductByHandle(handle) : null,
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

// Helper to format Shopify product for cart
export function formatProductForCart(product: ShopifyProduct) {
  const firstVariant = product.node.variants.edges[0]?.node;
  return {
    product,
    variantId: firstVariant?.id || '',
    variantTitle: firstVariant?.title || 'Default',
    price: firstVariant?.price || { amount: '0', currencyCode: 'USD' },
    quantity: 1,
    selectedOptions: firstVariant?.selectedOptions || [],
  };
}
