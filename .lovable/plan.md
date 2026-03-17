

# Plan: Migrate to Shopify Customer Accounts

## Overview

Remove the entire Supabase-based authentication and account system. Replace it with redirects to Shopify's built-in customer account portal (`tiora-2025.myshopify.com/account`), which natively handles profiles, order history, tracking, and order confirmations.

## What Changes

### 1. Remove custom auth system
- **Delete** `src/contexts/AuthContext.tsx` — no longer needed
- **Delete** `src/pages/AuthPage.tsx` — login/signup handled by Shopify
- **Delete** `src/pages/UpdatePasswordPage.tsx` — password reset handled by Shopify
- **Delete** `src/pages/AccountPage.tsx` — account dashboard replaced by Shopify
- **Delete** all `src/components/account/*` components (AccountOrders, AccountProfile, AccountAddresses, etc.)
- **Delete** `src/services/accountService.ts` — Supabase account operations no longer needed
- **Delete** `supabase/functions/fetch-shopify-orders/` — orders viewed on Shopify directly
- **Delete** `src/lib/validation.ts` (if only used for account operations)

### 2. Update routes in App.tsx
- Remove `AuthProvider` wrapper
- Replace `/login`, `/signup`, `/account`, `/update-password` routes with redirect components that send users to `https://tiora-2025.myshopify.com/account/login`, `/account/register`, `/account` respectively
- Keep all shop, product, cart, and content routes unchanged

### 3. Update Header component
- Replace the "Account" icon/link that currently goes to `/account` with a link that opens `https://tiora-2025.myshopify.com/account` (new tab or same window)
- Remove any auth-state-dependent UI (e.g., showing user name, login/logout toggles)

### 4. Clean up imports and dependencies
- Remove `useAuth` hook usage from any remaining components (Header, CartDrawer, etc.)
- Remove Supabase auth-related imports throughout the codebase
- Update `supabase/config.toml` to remove the `fetch-shopify-orders` function entry

## What Stays the Same
- Cart system (Storefront API + Zustand) — unchanged
- Checkout flow (Shopify hosted checkout) — unchanged
- All shop pages, product pages, content pages — unchanged
- Supabase connection itself can remain if used for other things (wishlists stored locally, etc.)

## Shopify Customer Account URLs
```text
Login:    https://tiora-2025.myshopify.com/account/login
Register: https://tiora-2025.myshopify.com/account/register
Account:  https://tiora-2025.myshopify.com/account
Orders:   https://tiora-2025.myshopify.com/account (orders tab built-in)
Tracking: Handled via Shopify order status page URLs
```

## Important Note
For Shopify's customer account pages to work properly with your custom domain (tiora.co), you need to ensure customer accounts are enabled in Shopify Admin → Settings → Customer accounts. The account portal will live on the `myshopify.com` domain unless you configure Shopify's custom domain settings to handle `/account` routes.

