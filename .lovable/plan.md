

## Problem

After Shopify login, Shopify redirects back to `tiora.co/customer_authentication/sso_hint?...`. This path doesn't have a route, so it hits the `*` catch-all and shows a 404. The fix is to add a catch-all route for `/customer_authentication/*` that forwards these requests to `shopify.com/customer_authentication/...`.

## Change

**`src/App.tsx`** — Add one new route before the `*` catch-all:

```tsx
<Route path="/customer_authentication/*" element={<ShopifyCatchAllRedirect />} />
```

This will intercept any `/customer_authentication/...` path (like the `sso_hint` callback) and redirect it to `shopify.com/customer_authentication/...` with all query parameters preserved, using the existing `ShopifyCatchAllRedirect` component.

