

# Connect Instagram & Remove Unused Social Icons

## Summary
Update the footer to use your real Instagram profile and remove Facebook and Pinterest icons since you don't have those accounts yet.

## Changes

### Footer Component (`src/components/layout/Footer.tsx`)

**1. Update Instagram URL**
- Change from placeholder `https://instagram.com` to your actual profile: `https://www.instagram.com/tiora.official`

**2. Remove Facebook and Pinterest**
- Remove the Facebook icon and link
- Remove the Pinterest icon and link (including the custom PinterestIcon component since it won't be needed)
- Remove the `Facebook` import from lucide-react

**3. Clean up imports**
- Remove unused `Facebook` import from lucide-react
- Remove the `PinterestIcon` component definition

## Visual Result
- Mobile: Single Instagram icon in the "Stay Connected" section
- Desktop: Single Instagram icon in the "Stay Connected" section

The Instagram icon will link directly to `https://www.instagram.com/tiora.official` and open in a new tab.

