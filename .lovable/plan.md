
# Remaining Improvements Plan

## Phase 1: Critical Bug Fixes
1. **Fix navigate-in-render** in `Auth.tsx` and `Profile.tsx` — replace bare `navigate()` calls with `<Navigate>` component
2. **Add password field** to Auth sign-in/sign-up forms for a realistic auth flow
3. **Fix LiveChat overlap** with MobileBottomNav — add `bottom-20` on mobile so the chat button sits above the nav bar

## Phase 2: SEO & Performance
4. **Lazy-load routes** — wrap all page imports in `React.lazy` + `Suspense` in `App.tsx`
5. **Add per-page meta tags** — use `document.title` and meta description via a custom `usePageMeta` hook
6. **Add favicon** — replace default Vite favicon with Strafion brand icon
7. **Add JSON-LD product schema** to `ProductDetail.tsx` for rich search results

## Phase 3: UX Polish
8. **Add breadcrumb navigation** to category and product detail pages
9. **Fix "Watch Review" hero button** — link to a relevant YouTube video or remove it
10. **Add newsletter form submission** — show success toast on submit (localStorage-based)
11. **Fix social media footer links** — point to actual social URLs or remove them
12. **Add Cmd/Ctrl+K search shortcut** — open search page via keyboard
13. **Add "Back to Top" button** on long pages

## Phase 4: E-commerce Polish
14. **Add order history to Profile** — store completed orders in localStorage, show in Orders tab
15. **Product image gallery** — add thumbnail strip to ProductDetail page
16. **Related products section** on ProductDetail page

## Files Summary

| Action | File |
|--------|------|
| Modify | `src/pages/Auth.tsx` |
| Modify | `src/pages/Profile.tsx` |
| Modify | `src/components/LiveChat.tsx` |
| Modify | `src/App.tsx` |
| Create | `src/hooks/usePageMeta.ts` |
| Modify | `src/pages/ProductDetail.tsx` |
| Modify | `src/components/Navigation.tsx` |
| Modify | `src/components/Footer.tsx` |
| Modify | `src/pages/Index.tsx` |
| Modify | `src/lib/localStorage.ts` |
| Modify | `index.html` |
