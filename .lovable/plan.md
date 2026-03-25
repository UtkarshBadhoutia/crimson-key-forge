

# Comprehensive Website Analysis & Supabase Removal Plan

## Issues Found

### Critical / Functional Bugs
1. **Mice, Audio, Accessories pages are non-functional** -- "Add to Cart" buttons do nothing (hardcoded data with no product IDs, no `addToCart` integration)
2. **Currency inconsistency** -- ProductCard shows `$`, FeaturedProducts/Cart/Mice/Audio/Accessories show `₹`
3. **Footer logo shows "X"** instead of actual Strafion logo image
4. **Footer year hardcoded to 2024** instead of dynamic
5. **FeaturedProducts "View" button** always navigates to `/keyboards` instead of the actual product detail
6. **RecentlyViewed never populated** -- `addToRecentlyViewed` is exported but never called from ProductDetail
7. **Support contact form** doesn't submit anywhere
8. **Newsletter subscription** doesn't work
9. **All footer links** point to `#` (dead links)

### UX / Design Issues
10. **Placeholder images** on Mice, Audio, Accessories, and CustomBuild pages
11. **HeroCarousel "WATCH REVIEW"** links to a non-existent YouTube URL
12. **CustomBuild "Start Custom Build"** button does nothing
13. **LiveChat** requires sign-in but doesn't redirect to auth page
14. **Keyboards page** fetches ALL products then filters client-side (inefficient)
15. **Search page** uses different product card layout than other pages (inconsistent)
16. **ProductDetail** quantity selector breaks when `stock_quantity` is 0 (empty array)

### Architecture Issues
17. **Duplicate auth state listeners** -- Navigation, CartContext, LiveChat, Profile, Auth all independently listen to auth state
18. **No error boundaries** -- any component crash takes down the whole app
19. **No SEO** -- missing meta tags, page titles
20. **Cart uses Supabase `image_url`** but products table uses `images` array -- schema mismatch likely causes broken cart images

---

## Plan: Remove Supabase & Make Fully Static/Local

### Phase 1: Create Local Data Layer

**Step 1: Create static product data file** (`src/data/products.ts`)
- Define all products (keyboards, mice, audio, accessories) with consistent data structure
- Include proper image URLs (use existing assets or quality placeholders from unsplash/pexels)
- Use consistent currency (₹) throughout
- Include IDs, names, prices, descriptions, images, ratings, features, specifications, stock quantities

**Step 2: Create local storage utilities** (`src/lib/localStorage.ts`)
- Cart management (add, remove, update quantity, clear) using localStorage
- Wishlist management using localStorage
- Recently viewed tracking using localStorage
- Simple user profile storage using localStorage

### Phase 2: Replace All Supabase Dependencies

**Step 3: Replace `useProducts` hook**
- Import from static data file instead of Supabase
- Keep filtering/search logic but operate on local data
- Remove Supabase imports

**Step 4: Replace `CartContext`**
- Use localStorage instead of Supabase `cart_items` table
- Remove auth requirement for cart (anyone can use cart)
- Product data looked up from static products file

**Step 5: Replace `useWishlist` hook**
- Use localStorage instead of Supabase `wishlists` table
- Remove auth requirement

**Step 6: Replace `useReviews` hook**
- Use localStorage for user's own reviews
- Include some hardcoded sample reviews for products
- Remove auth requirement for viewing, keep it for submitting

**Step 7: Replace Auth page**
- Convert to simple local auth (name/email stored in localStorage)
- Remove Supabase auth, Google OAuth
- Simple form that saves user info locally

**Step 8: Replace Profile page**
- Read/write profile from localStorage
- Show sample order history or localStorage-based orders
- Remove Supabase dependencies

**Step 9: Replace Navigation auth state**
- Check localStorage for user info instead of Supabase session
- Create a simple `useAuth` hook wrapping localStorage

**Step 10: Replace LiveChat**
- Remove AI chat (requires Supabase edge function + OpenAI)
- Replace with a simple static FAQ chatbot or remove entirely and keep only the Support page

**Step 11: Replace FeaturedProducts & Search page**
- Use static product data instead of Supabase queries

### Phase 3: Fix All Bugs

**Step 12: Fix Mice/Audio/Accessories pages**
- Use products from static data file
- Wire up actual `addToCart` functionality with product IDs
- Link to proper product detail pages

**Step 13: Fix currency consistency**
- Use ₹ everywhere with `toLocaleString('en-IN')`

**Step 14: Fix Footer**
- Use actual Strafion logo image
- Dynamic year
- Link footer items to actual pages where possible

**Step 15: Fix FeaturedProducts view button**
- Navigate to `/product/:id` instead of `/keyboards`

**Step 16: Wire up RecentlyViewed**
- Call `addToRecentlyViewed` in ProductDetail page

**Step 17: Fix ProductDetail quantity selector**
- Handle 0 stock gracefully

### Phase 4: Cleanup

**Step 18: Remove Supabase files and dependencies**
- Remove `src/integrations/supabase/` directory
- Remove `supabase/` directory (migrations, functions, config)
- Remove `@supabase/supabase-js` from package.json
- Remove `.env` Supabase variables
- Remove `capacitor.config.ts` if not needed

**Step 19: Create shared AuthContext**
- Single auth state provider replacing 5+ independent listeners
- Wrap app in AuthProvider

### Summary of Files to Create/Modify

| Action | File |
|--------|------|
| Create | `src/data/products.ts` |
| Create | `src/lib/localStorage.ts` |
| Create | `src/contexts/AuthContext.tsx` |
| Rewrite | `src/hooks/useProducts.ts` |
| Rewrite | `src/contexts/CartContext.tsx` |
| Rewrite | `src/hooks/useWishlist.ts` |
| Rewrite | `src/hooks/useReviews.ts` |
| Rewrite | `src/pages/Auth.tsx` |
| Rewrite | `src/pages/Profile.tsx` |
| Rewrite | `src/pages/Mice.tsx` |
| Rewrite | `src/pages/Audio.tsx` |
| Rewrite | `src/pages/Accessories.tsx` |
| Rewrite | `src/pages/Search.tsx` |
| Modify | `src/components/Navigation.tsx` |
| Modify | `src/components/FeaturedProducts.tsx` |
| Modify | `src/components/ProductCard.tsx` |
| Modify | `src/components/LiveChat.tsx` |
| Modify | `src/components/Footer.tsx` |
| Modify | `src/pages/ProductDetail.tsx` |
| Modify | `src/pages/Cart.tsx` |
| Modify | `src/App.tsx` |
| Delete | `src/integrations/supabase/*` |
| Delete | `src/hooks/useChat.ts` |
| Delete | `supabase/*` |

