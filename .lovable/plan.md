

# Product Card Redesign: Add to Bag Button Below Card + Wishlist Heart Icon

## Overview
Move the "Add to Bag" action from a hover overlay inside the product image to a visible button below the product card. Replace it with a heart icon on the lower-right corner of the image for wishlist functionality.

## Components to Update

### 1. ShopifyProductCard (`src/components/shop/ShopifyProductCard.tsx`)
Used on collection/shop pages.

- **Remove**: The hover-only ShoppingBag button overlay inside the image container
- **Add**: A Heart icon button (lower-right corner of the image), always visible or shown on hover, which calls `addToWishlist` from `accountService`
- **Add**: A full-width "ADD+" button below the product info (outside the Link), using the existing `addItem` cart logic
- The heart should toggle filled/unfilled based on wishlist state (if user is logged in)

### 2. MostPopular ProductCard (`src/components/home/MostPopular.tsx`)
Used on the homepage "Most Popular" section. Has the same hover ShoppingBag pattern.

- **Remove**: The hover-only ShoppingBag button overlay
- **Add**: Heart icon button on lower-right corner of image
- **Add**: "ADD+" button below product info, outside the Link wrapper

### 3. ProductCard (`src/components/shop/ProductCard.tsx`)
Used for local/mock product data on shop pages.

- **Remove**: The hover-only ShoppingBag button overlay
- **Add**: Heart icon button on lower-right corner of image
- **Add**: "ADD+" button below product info

### 4. FeaturedProducts (`src/components/home/FeaturedProducts.tsx`)
Homepage featured section with "Quick Add" hover button.

- **Remove**: The hover-only "Quick Add" button overlay
- **Add**: Heart icon button on lower-right corner of image
- **Add**: "ADD+" button below product info

### 5. RecommendedCarousel (`src/components/product/RecommendedCarousel.tsx`)
Already has an "ADD+" button below -- just needs the heart icon added to the image.

- **Add**: Heart icon button on lower-right corner of image

## Wishlist Integration
- Use existing `addToWishlist` / `removeFromWishlist` from `src/services/accountService.ts`
- Use `useAuth` to check if user is logged in
- If not logged in, tapping heart shows a toast prompting login
- Heart icon: outlined by default, filled red when item is in wishlist

## Visual Design
- **Heart button**: Small circular button (w-8 h-8), semi-transparent background, positioned `absolute bottom-3 right-3` inside the image container. Always visible (not hover-only).
- **ADD+ button**: Full-width `Button` with `variant="outline"`, placed below the material indicator, outside the `<Link>` wrapper to prevent navigation on click.

## Technical Details
- Import `Heart` from `lucide-react`
- Import `useAuth` from `@/contexts/AuthContext`
- Import `addToWishlist`, `removeFromWishlist`, `getWishlist` from `@/services/accountService`
- Each card component will need a small wishlist state check (could be a shared hook later, but for now inline per component to keep changes minimal)
- The "ADD+" button uses `e.preventDefault()` / `e.stopPropagation()` to avoid navigation since it sits outside the Link

