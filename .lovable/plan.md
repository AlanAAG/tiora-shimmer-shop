

# Plan: Fix Shopify Customer Account Redirects

## The Problem

Two issues are preventing customer accounts from working:

1. **Broken order confirmation email links**: Shopify sends emails with "View Order" links pointing to `tiora.co/94442127661/orders/...`. Your headless site has no route for these paths, so customers see a blank page or 404. These links need to be caught and redirected to `shopify.com/94442127661/orders/...`.

2. **Permanent domain mismatch**: The codebase hardcodes `tiora-2025.myshopify.com` as the Shopify domain, but the actual store permanent domain is `jtv22j-ew.myshopify.com`. This may affect checkout URLs and other API calls.

## Changes

### 1. Add catch-all route for Shopify order/account paths

In `App.tsx`, add a new route component that catches any path starting with `/94442127661/` and redirects to `https://shopify.com/94442127661/...` (preserving the full path and query string). This fixes all broken email links — order status, account authentication tokens, etc.

```text
tiora.co/94442127661/orders/abc123/authenticate?key=xyz
  → redirects to →
shopify.com/94442127661/orders/abc123/authenticate?key=xyz
```

### 2. Fix the Shopify permanent domain

Update `src/lib/shopify.ts` to use the correct permanent domain `jtv22j-ew.myshopify.com` instead of `tiora-2025.myshopify.com`. This ensures checkout URLs and API calls work correctly.

### 3. Update ShopifyRedirect component

Make the component more generic so it can handle both account redirects and the catch-all order paths — extracting the full path + query string and forwarding to `shopify.com`.

## What This Fixes

- Order confirmation email "View Order" buttons will work (redirected to Shopify)
- Account icon click will open Shopify's hosted login/account portal
- `/login`, `/signup`, `/account` routes continue redirecting to Shopify
- Checkout URLs will use the correct store domain

