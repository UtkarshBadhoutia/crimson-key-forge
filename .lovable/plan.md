

# Plan: Contact Info Update, Scroll-to-Top, and Brand Loading Animation

## 1. Update Contact Info in Footer

Replace the placeholder address and phone with V Horizon Properties' actual details:
- **Address**: Delhi NCR, India (from vhorizonproperties.com)
- **Phone**: +91 92175 64977 (from their WhatsApp link)

**File**: `src/components/Footer.tsx` -- update the MapPin and Phone text values.

## 2. Scroll to Top on Page Navigation

Currently, navigating between pages keeps the scroll position. Fix by creating a `ScrollToTop` component that listens to route changes and scrolls to top.

**New file**: `src/components/ScrollToTop.tsx`
- Uses `useLocation` from react-router-dom
- `useEffect` calls `window.scrollTo(0, 0)` on pathname change

**Modified file**: `src/App.tsx`
- Add `<ScrollToTop />` inside `<BrowserRouter>` before `<Routes>`

## 3. Brand Logo Loading Animation (Comet-style)

Wearcomet.com shows a fullscreen loading screen with their logo (animated GIF) that plays on initial page load before revealing the site content. We'll replicate this with Strafion's logo:

**New file**: `src/components/LoadingScreen.tsx`
- Fullscreen overlay with black background
- Strafion logo centered, with a pulse/scale animation
- A crimson circular progress ring animating around the logo
- After ~2 seconds, fades out and unmounts
- Uses `useState` + `useEffect` with a timer
- Stores a sessionStorage flag so it only shows once per session

**Modified file**: `src/App.tsx`
- Import and render `<LoadingScreen />` at the top level
- It auto-dismisses after the animation completes

**Modified file**: `src/index.css`
- Add `@keyframes logo-pulse` and `@keyframes ring-spin` for the loading animation

### Technical Details

```text
LoadingScreen Flow:
┌──────────────────────┐
│  Full-screen black   │
│  overlay (z-[9999])  │
│                      │
│   ┌──────────────┐   │
│   │  Strafion    │   │  Logo pulses/scales
│   │    Logo      │   │  Crimson ring spins
│   └──────────────┘   │
│                      │
│   Loading...         │  Fades out after 2s
└──────────────────────┘
```

- `sessionStorage.getItem('strafion-loaded')` check -- skip animation on subsequent navigations within the same session
- CSS animation: logo scales from 0.8 to 1.1 with a pulse, crimson glow ring rotates around it
- Fade-out transition: opacity 1 -> 0 over 500ms, then `display: none`

## Files Summary

| Action | File |
|--------|------|
| Create | `src/components/ScrollToTop.tsx` |
| Create | `src/components/LoadingScreen.tsx` |
| Modify | `src/components/Footer.tsx` (lines 112, 116) |
| Modify | `src/App.tsx` (add ScrollToTop + LoadingScreen) |
| Modify | `src/index.css` (add loading keyframes) |

