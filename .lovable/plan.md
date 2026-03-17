

# Plan: Connect Shopify Orders to Account Orders Tab

## The Problem

The current AccountOrders component reads from Supabase `orders` table, which is empty. Real orders live in Shopify. The Storefront API (client-side) cannot query order data -- it requires the **Admin API** which needs a secret access token that must stay server-side.

## Architecture

```text
User's Account Page
       │
       ▼
Supabase Edge Function  ──►  Shopify Admin API
  (fetch-orders)              (Orders endpoint)
       │                      - by customer email
       ▼                      - includes fulfillment
  Returns order data          & tracking info
  to frontend
```

## Implementation Steps

### 1. Store Shopify Admin API token as a secret
- The Shopify Admin API access token is a private key (different from the public Storefront token already in the code)
- It will be stored as a Supabase Edge Function secret, never exposed client-side
- You'll need to get this token from your Shopify Admin > Settings > Apps and sales channels > Develop apps

### 2. Create Supabase Edge Function `fetch-shopify-orders`
- Accepts the authenticated user's email (from Supabase JWT, not from the client request body -- prevents spoofing)
- Calls Shopify Admin REST API: `GET /admin/api/2025-07/orders.json?email={email}&status=any`
- Returns orders with: order number, line items (product title, image, quantity, price), fulfillment status, tracking number, tracking URL, and order status page URL
- Includes CORS headers for the frontend

### 3. Update AccountOrders component
- Replace the current Supabase `getOrders` call with a `supabase.functions.invoke('fetch-shopify-orders')` call
- Display real Shopify order data: order name (#1001, etc.), line items with product images and titles, fulfillment status, total price
- Add a "Track Order" button per order that links to Shopify's tracking URL or order status page
- Show fulfillment status badges (unfulfilled, in transit, delivered)

### 4. Update types
- Add a `ShopifyOrder` interface with fields for line items, fulfillments (with tracking), financial status, and the order status URL

## Key Details

- **Tracking link**: Each Shopify fulfillment contains `tracking_number`, `tracking_url`, and `tracking_company`. The order also has an `order_status_url` which is the Shopify-hosted tracking page customers can visit.
- **Security**: The edge function validates the user's JWT and extracts their email server-side. No email is passed from the client.
- **No database sync needed**: Orders are fetched directly from Shopify on demand, keeping data always current.

## What You'll Need to Provide

Before implementation, I'll need you to add your **Shopify Admin API access token** as a secret. I'll walk you through getting it from your Shopify admin panel.

