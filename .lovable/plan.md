

# Visual Overhaul for Category Pages

## Problem
Category pages have plain text-only hero sections with no imagery, no energy, and no visual appeal. The Keyboards page has a massive vertical filter panel that pushes products far down. The overall feel is flat and uninspiring compared to gaming gear sites like Razer, SteelSeries, or Corsair.

## Design Direction
Inspired by Razer/SteelSeries category pages: bold hero banners with background imagery, glowing accents, compact inline filters, and a more immersive gaming aesthetic.

## Changes

### 1. Create a Reusable CategoryHero Component
**New file**: `src/components/CategoryHero.tsx`

A visually striking hero banner used across all category pages:
- Full-width section with a background image (Unsplash gaming imagery per category)
- Dark gradient overlay for text readability
- Animated crimson accent lines / glow effects
- Large bold title with gradient text
- Subtitle text
- Feature badges with icons (existing badge pattern)
- Product count indicator
- Subtle parallax-like effect on scroll (CSS only)
- Height: ~50vh on desktop, auto on mobile

### 2. Redesign ProductFilters as Compact Inline Bar
**Modify**: `src/components/ProductFilters.tsx`

Replace the tall card-based vertical layout with a sleek horizontal filter bar:
- Single-row layout: Search input + Category dropdown + Brand dropdown + Sort dropdown + Clear button
- Collapsible on mobile (toggle button)
- Price range as a popover instead of always-visible slider
- Currency display fixed to ₹
- Sticky below the navbar when scrolling past the hero
- Compact, dark-themed styling matching the brand

### 3. Update All Category Pages
**Modify**: `src/pages/Keyboards.tsx`, `src/pages/Mice.tsx`, `src/pages/Audio.tsx`, `src/pages/Accessories.tsx`

- Replace plain text hero with `<CategoryHero>` component
- Add compact inline filters to Mice, Audio, Accessories (currently only Keyboards has filters)
- Consistent grid layout: 1/2/3/4 columns across breakpoints
- Add product count and "showing X products" text
- Add subtle section dividers with crimson accent lines

### 4. Enhanced ProductCard Hover Effects
**Modify**: `src/components/ProductCard.tsx`

- Add a subtle crimson glow on hover (`shadow-crimson`)
- Make "Add to Cart" button always visible on mobile (not just on hover)
- Add a quick-view overlay effect on image hover
- Smoother transitions

### 5. Add Category Background Images
Use high-quality Unsplash images as hero backgrounds:
- Keyboards: mechanical keyboard close-up with RGB lighting
- Mice: gaming mouse with dramatic lighting
- Audio: headset/audio gear with moody lighting
- Accessories: gaming setup/desk with accessories

### 6. CSS Additions
**Modify**: `src/index.css`

- Add `.category-hero-gradient` overlay class
- Add crimson glow hover utilities
- Add sticky filter bar styles

## Files Summary

| Action | File |
|--------|------|
| Create | `src/components/CategoryHero.tsx` |
| Rewrite | `src/components/ProductFilters.tsx` |
| Modify | `src/pages/Keyboards.tsx` |
| Modify | `src/pages/Mice.tsx` |
| Modify | `src/pages/Audio.tsx` |
| Modify | `src/pages/Accessories.tsx` |
| Modify | `src/components/ProductCard.tsx` |
| Modify | `src/index.css` |

