# Progress Report 06: Hero Redesign with Cafe Furniture Backdrop & Text Component

**Date:** 2026-10-29  
**Status:** Complete & Verified  
**Target File:** `code/src/components/home/HeroPortal.tsx`  
**Image Used:** `/home/sal/Projects/Ecom-labmid/content/final-4k/09-cafe-furniture.jpg`  
**References:** `/home/sal/Projects/21st/another hero/promt.txt`, `/home/sal/Projects/21st/another hero/code.txt`

---

## 1. Objectives & Overview
- Replaced the initial hero backdrop with the 4K cafe furniture image (`09-cafe-furniture.jpg`) showcasing cozy wooden tables, ambient lighting, and campus cafe seating.
- Styled and structured the hero text elements according to the text component specifications in `demo.tsx` (`promt.txt`):
  - `data-sublime-header`: Campus cafe badge and branding.
  - `data-sublime-eyebrow`: University tagline positioned above the giant word.
  - Giant live glyph word: `"CAFE"`.
  - `data-sublime-support`: Campus hub support copy positioned below the giant word.
  - CTA action buttons: "Browse Menu" and "Contact Us" with smooth hover transitions.
  - `data-sublime-scroll`: Subtle animated scroll indicator.
  - `data-slipstream-copy`: Revealed section with balanced headline, numbered features (`01`, `02`, `03`) with divider borders, campus favorites quick-order cards, and category exploration CTAs.
- Resolved scroll parent containment: Removed `overflow-hidden` from `cui-hero-container` so `scrollParent` resolves to `window`, ensuring smooth camera zoom progression through live type.

---

## 2. Implementation Details

### A. Backdrop Image Integration
- Source 4K image: `/home/sal/Projects/Ecom-labmid/content/final-4k/09-cafe-furniture.jpg` (3840x2160, 1.5MB) copied into `code/public/images/09-cafe-furniture.jpg` with permissions `644`.
- Configured in `HeroPortal.tsx` for both the scroll-driven live `GlyphPortal` background and the `prefers-reduced-motion` accessible fallback.
- Added gradient overlay (`#2B1B12/75` with backdrop blur) to guarantee high WCAG AAA contrast for all text layers.

### B. Text Component Structure (`demo.tsx` spec)
- **Opening Frame (`front`):**
  - `<div data-sublime-header>`: Logo `CUI Cafe.` and category `COMSATS Campus Dining & Supplies`.
  - `<p data-sublime-eyebrow>`: `COMSATS UNIVERSITY ISLAMABAD • CAMPUS HUB`.
  - `<p data-sublime-support>`: `Fresh food, hot coffee and campus essentials, all in one place.`.
  - `<div className="cui-front-buttons">`: Interactive CTA links to `/shop` and `/contact`.
  - `<span data-sublime-scroll>`: `Scroll to step inside ↓`.
- **Revealed Content Frame (`data-slipstream-copy`):**
  - Section headline: `Everything you need between classes.`.
  - 3 numbered feature cards with top divider lines:
    - `<span data-slipstream-no>01</span>Breakfast, lunch & fast food`
    - `<span data-slipstream-no>02</span>Stationery on the same order`
    - `<span data-slipstream-no>03</span>Pre-order and skip the queue`
  - Quick-order campus favorites grid with instant "Add to Cart" triggers.

---

## 3. Verification & Evidence
- Browser automation verification script: `code/verify-hero-furniture.mjs`.
- Screenshots captured in `content/screenshots/hero-furniture/`:
  - `01-desktop-hero-closed.png` (183 KB): Opening frame showing "CAFE" with warm wooden furniture shining through the glyph letters.
  - `02-desktop-hero-midzoom.png` (470 KB): Mid-zoom state as camera dives into the letter "A".
  - `03-desktop-hero-revealed.png` (699 KB): Fully revealed 4K cafe furniture backdrop with slipstream copy, numbered features, and bestsellers.
  - `04-mobile-hero-closed.png` (51 KB): Responsive mobile view at 390x844 without overlapping elements.
  - `05-mobile-hero-revealed.png` (185 KB): Mobile revealed state with responsive grid.

---

## 4. Quality Gates
- `npm run lint`: **0 errors**
- `npx tsc --noEmit`: **0 errors**
- `npm run build`: **0 errors** (48/48 routes prerendered)
