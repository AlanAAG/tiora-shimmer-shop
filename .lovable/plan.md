

# Add Wishlist Button to Header

## Overview
Add a Heart icon button in the header (next to the profile icon) that opens a wishlist drawer showing saved items. The wishlist already persists across sessions via `localStorage` through the existing `useLocalWishlist` hook — no backend needed since Shopify's customer accounts are external.

## Changes

### 1. Create `WishlistDrawer` component (`src/components/cart/WishlistDrawer.tsx`)
A Sheet/drawer (same pattern as `CartDrawer`) that:
- Opens from the right side
- Shows all wishlisted products with images, names, prices
- Fetches product details from Shopify for each wishlisted ID (using the existing `useShopifyProducts` hook or individual product queries)
- Has a "Remove" button per item and an "Add to Bag" button
- Shows empty state when no items are saved
- Badge count on the Heart trigger icon showing number of wishlisted items

### 2. Update `Header.tsx`
- Import `WishlistDrawer` and add it between the User icon and CartDrawer in the right-side icon group (line 109-122)
- Also add a "Wishlist" link in the mobile menu

### 3. Persistence approach
The current `useLocalWishlist` hook already handles persistence via `localStorage` — wishlisted product IDs survive page refreshes and browser restarts for the same device/browser. This is the right approach given that:
- The customer account system is hosted on Shopify (no local auth)
- Cross-device sync would require a backend, which isn't needed at this stage
- The hook is already used by 5 product card components across the app

No changes needed to the wishlist hook itself.

## Technical Details
- The drawer will use `useLocalWishlist` for the set of IDs and `useShopifyProducts` (or a filtered query) to get product details for display
- Heart icon: outlined when empty, filled when items exist
- Badge shows count (same style as cart badge)
- "Add to Bag" uses `useCartStore.addItem` same as product cards

