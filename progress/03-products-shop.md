# Step 03 Progress Log: Product Catalogue & Premium Animated Shop

**Date:** October 29, 2026  
**Status:** Completed & Step-Gated Verified  
**Route:** `/shop`  

---

## 1. Overview & Objectives

In Step 03, we built the complete data layer and an animated, student-friendly `/shop` page for **CUI Cafe** at COMSATS University Islamabad. This includes:
- Animation utility module powered by `framer-motion` respecting `prefers-reduced-motion`.
- Strongly typed categories (`categories.ts`) and product catalogue (`products.ts`) with all 35 required products across 5 categories and exact requested prices.
- Visual asset pipeline: 28 verified Unsplash images downloaded and converted to webp (`~800px` width) with graceful fallback gradients for 7 traditional dishes.
- Reusable `ProductCard` and `ProductGrid` components featuring layout transitions, shimmer skeletons, discount badges, and "+1" micro-interactions.
- Premium animated `/shop` page with coffee-brown banner, floating decorative icons, sticky search and filter toolbar, sliding active-tab pills (`layoutId`), price range slider, sort options, and URL query synchronization.
- Floating "Back to top" button and "Popular Right Now" draggable carousel.
- Fully step-gated verification using Playwright: 25 high-resolution screenshots saved to `content/screenshots/step-03/` with zero console errors.

---

## 2. Files Created & Modified

| File Path | Description |
|-----------|-------------|
| `code/src/lib/motion.ts` | Shared `framer-motion` variants (`fadeUp`, `staggerContainer`, `scaleIn`, `fadeIn`) with reduced-motion adaptation. |
| `code/src/lib/cart-placeholder.ts` | Event-driven Cart placeholder handler with structured console logging and listener subscription for toasts. |
| `code/src/data/categories.ts` | Category definitions (5 categories: Breakfast, Lunch, Fast Food, Beverages, Stationery) with icons and accent colors. |
| `code/src/data/products.ts` | All 35 products with exact PKR prices, descriptions, ingredients/features, prep times, ratings, review counts, stock, and query helpers (`getProductBySlug`, `getProductsByCategory`, `getRelatedProducts`, `getBestsellers`). |
| `code/src/components/ui/ProductImage.tsx` | Next.js `<Image>` component with blur-up loading, aspect ratio stability, and category-accented gradient fallback for items without images. |
| `code/src/components/products/ProductCard.tsx` | Reusable card with hover lift, zoom, tag badges (Veg green dot, Spicy, Bestseller, New, Chef's Pick, discount %), "+1" pop animation, and cart placeholder handler. |
| `code/src/components/products/ProductGrid.tsx` | Responsive animated grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) with `AnimatePresence layout` transitions and shimmer skeleton loading state. |
| `code/src/components/shop/ShopHeader.tsx` | Hero banner with coffee-brown gradient, animated typography, and floating drifting icons (`Coffee`, `Sparkles`, `BookOpen`, `Utensils`, `Flame`). |
| `code/src/components/shop/ShopToast.tsx` | Fixed floating toast notification listening to cart placeholder additions. |
| `code/src/components/shop/PopularRow.tsx` | "Popular Right Now" draggable horizontal scroll carousel featuring campus bestsellers. |
| `code/src/components/shop/BackToTop.tsx` | Animated floating button appearing after scrolling 350px with smooth scroll-to-top action. |
| `code/src/components/shop/ShopClient.tsx` | Interactive client component managing search, categories, filters, price slider, sort dropdown, and URL synchronization. |
| `code/src/app/shop/page.tsx` | Server Component wrapper with Next.js metadata and `<Suspense>` boundary wrapping `ShopClient`. |
| `code/verify-step03.mjs` | Automated Playwright verification script testing all 25 desktop and mobile scenarios. |

---

## 3. Product Catalogue Breakdown (35 Products Total)

### Category Counts
- **Breakfast (7 items):** Halwa Puri Platter (PKR 350), Aloo Paratha with Chai (PKR 250), Egg Paratha Roll (PKR 220), Masala Omelette & Toast (PKR 200), Honey Pancake Stack (PKR 320), Fruit & Yogurt Bowl (PKR 280), Cheese Croissant (PKR 240).
- **Lunch (7 items):** Chicken Biryani (PKR 380), Chicken Karahi Plate (PKR 520), Daal Chawal (PKR 260), Chicken Handi with Roti (PKR 450), Beef Pulao (PKR 360), Creamy Chicken Pasta (PKR 420), Chapli Kebab Plate (PKR 400).
- **Fast Food (8 items):** Zinger Burger (PKR 420), Beef Smash Burger (PKR 520), Club Sandwich (PKR 380), Loaded Fries (PKR 320), Chicken Shawarma (PKR 300), Crispy Wings (6 pcs) (PKR 450), Fajita Pizza Slice (PKR 280), Chicken Nuggets (8 pcs) (PKR 350).
- **Beverages (6 items):** Cappuccino (PKR 250), Iced Latte (PKR 300), Doodh Patti Chai (PKR 100), Mint Margarita (PKR 200), Cold Coffee (PKR 280), Fresh Orange Juice (PKR 220).
- **Stationery (7 items):** A4 Notebook (200 pages) (PKR 220), Gel Pen Pack (5 pcs) (PKR 150), Highlighter Set (6 colors) (PKR 180), Spiral Sketchbook (PKR 350), Sticky Notes Pack (PKR 120), Scientific Calculator (PKR 1800), Assignment File Folder (PKR 200).

---

## 4. Image Pipeline & Fallback Status

### Verified Images (28 products)
High-resolution photos verified on Unsplash (HTTP 200), downloaded, and converted to optimized WebP (`~800px` width) in `content/images/products/` and `code/public/images/products/`:
1. `honey-pancake-stack.webp`
2. `fruit-yogurt-bowl.webp`
3. `cheese-croissant.webp`
4. `cappuccino.webp`
5. `iced-latte.webp`
6. `cold-coffee.webp`
7. `fresh-orange-juice.webp`
8. `zinger-burger.webp`
9. `beef-smash-burger.webp`
10. `club-sandwich.webp`
11. `loaded-fries.webp`
12. `crispy-wings-6pcs.webp`
13. `fajita-pizza-slice.webp`
14. `chicken-nuggets-8pcs.webp`
15. `creamy-chicken-pasta.webp`
16. `a4-notebook-200-pages.webp`
17. `gel-pen-pack-5pcs.webp`
18. `highlighter-set-6colors.webp`
19. `spiral-sketchbook.webp`
20. `sticky-notes-pack.webp`
21. `chicken-biryani.webp`
22. `chicken-shawarma.webp`
23. `scientific-calculator.webp`
24. `assignment-file-folder.webp`
25. `doodh-patti-chai.webp`
26. `mint-margarita.webp`
27. `chicken-karahi-plate.webp`
28. `chapli-kebab-plate.webp`

### Fallback Gradient Images (7 products)
For traditional regional dishes without a verified Unsplash photograph, `ProductImage` renders a category-colored gradient container with a frosted glass badge containing the respective category Lucide icon and dish title:
1. `halwa-puri-platter` (Breakfast — Coffee/Orange/Tan gradient with Coffee icon)
2. `aloo-paratha-with-chai` (Breakfast — Coffee/Orange/Tan gradient with Coffee icon)
3. `egg-paratha-roll` (Breakfast — Coffee/Orange/Tan gradient with Coffee icon)
4. `masala-omelette-toast` (Breakfast — Coffee/Orange/Tan gradient with Coffee icon)
5. `daal-chawal` (Lunch — Espresso/Green/Coffee gradient with Utensils icon)
6. `chicken-handi-with-roti` (Lunch — Espresso/Green/Coffee gradient with Utensils icon)
7. `beef-pulao` (Lunch — Espresso/Green/Coffee gradient with Utensils icon)

---

## 5. URL Query Parameter API

Filters are synchronized with the browser address bar:
- Category Tab: `?category=breakfast|lunch|fast-food|beverages|stationery` (default: `all`)
- Search Query: `?q=chicken` (debounced by 250ms)
- Sort Order: `?sort=price-asc|price-desc|rating|name-asc` (default: `featured`)
- Vegetarian Toggle: `?veg=1`
- Spicy Toggle: `?spicy=1`
- Bestsellers Toggle: `?bestseller=1`
- Discounts Only: `?discount=1`
- Price Ceiling: `?maxPrice=300` (default: `1800`)

---

## 6. Issues Found & Fixed

1. **React 19 `react-hooks/set-state-in-effect` Lint Error:**
   - *Problem:* Initial attempt to sync `searchParams` into `useState` inside a `useEffect` triggered React 19's cascading render error.
   - *Fix:* Re-architected state to derive active filters directly from `searchParams` as the single source of truth, eliminating the effect and cascading renders.
2. **404 Console Errors on Missing Images:**
   - *Problem:* Setting placeholder image paths to non-existent URLs triggered 404 network errors in the browser console.
   - *Fix:* Set `image: ""` on the 7 fallback items so `<ProductImage>` immediately renders the styled fallback gradient without issuing unnecessary HTTP requests.
3. **Playwright Checkbox Verification with Controlled State:**
   - *Problem:* `locator.check()` timed out waiting for instantaneous DOM mutation on a router-driven controlled input.
   - *Fix:* Switched to `#filter-veg` with `.click()` and added explicit IDs and accessible `htmlFor` label bindings.
4. **HTML Range Slider Input in Playwright:**
   - *Problem:* `slider.fill("300")` did not trigger React 19's synthetic `onChange` on range inputs.
   - *Fix:* Dispatched native input setter and bubbles events in `page.evaluate()` to trigger React state updates cleanly.

---

## 7. Step 04 Hand-Off Notes (Cart Integration)

In Step 04, the placeholder module `src/lib/cart-placeholder.ts` must be replaced with:
1. A real global cart state store (e.g. React Context, Zustand, or custom hook with `localStorage` persistence).
2. Cart item increment/decrement, line-item removal, and order summary calculation (subtotal, university student discount, tax, delivery/pickup fee).
3. Live Cart icon count badge in the Navbar updating dynamically across pages.
4. Complete `/cart` page implementation with checkout form and receipt preview.
