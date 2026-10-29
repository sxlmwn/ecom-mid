# Progress Log 01: Project Setup, Design System & Scaffold

**Project:** CUI Cafe — University Cafe E-Commerce Website Prototype  
**Institution:** COMSATS University Islamabad (Mid-term Project)  
**Date:** October 29, 2026  
**Status:** Completed, Audited & Verified (100% Green)

---

## 1. Executive Summary

In Step 01, we established the complete foundation for **CUI Cafe**, an on-campus e-commerce prototype tailored for the students, faculty, and staff of COMSATS University Islamabad.

The repository root is organized into three distinct workspaces:
1. `code/` — Complete Next.js (App Router 16.4.3) + TypeScript + Tailwind CSS v4 source code.
2. `content/` — Visual verification captures (`content/screenshots/step-01/`).
3. `progress/` — Markdown implementation logs (`progress/01-setup.md`).

---

## 2. Architecture & File Structure

```
~/Projects/Ecom-labmid/
├── .gitignore                           # Root Git ignore rules (node_modules, .next, etc.)
├── code/                                # All Next.js source code
│   ├── public/                          # Public static assets & svgs
│   ├── src/
│   │   ├── app/                         # App Router routes
│   │   │   ├── breakfast/page.tsx       # Morning specials route (h1 + subtitle)
│   │   │   ├── cart/page.tsx            # Shopping cart overview (h1 + subtitle)
│   │   │   ├── contact/page.tsx         # Campus location & helpdesk (h1 + subtitle)
│   │   │   ├── fast-food/page.tsx       # Quick bites & refreshments (h1 + subtitle)
│   │   │   ├── lunch/page.tsx           # Afternoon meal platters (h1 + subtitle)
│   │   │   ├── product/[id]/page.tsx    # Dynamic product detail (h1 + decoded ID)
│   │   │   ├── shop/page.tsx            # Full store catalog (h1 + category links)
│   │   │   ├── stationery/page.tsx      # Student books & supplies (h1 + subtitle)
│   │   │   ├── globals.css              # Design tokens & Tailwind v4 theme
│   │   │   ├── layout.tsx               # Root layout (Navbar, Footer, Suspense, Fonts)
│   │   │   └── page.tsx                 # Homepage with hero & categories
│   │   └── components/
│   │       ├── layout/
│   │       │   ├── Navbar.tsx           # Sticky nav, mobile drawer, cart badge
│   │       │   └── Footer.tsx           # Campus timings, address & quick links
│   │       └── ui/
│   │           ├── Button.tsx           # Primary, outline & secondary buttons
│   │           ├── Card.tsx             # Rounded-2xl cards with soft shadows
│   │           ├── Container.tsx        # Responsive layout wrapper
│   │           └── SectionHeading.tsx   # Semantic heading with badge & accent
│   ├── verify-and-screenshot.mjs        # Automated Playwright test & visual verifier
│   ├── package.json                     # Next.js 16, React 19, Lucide, Tailwind v4
│   └── tsconfig.json                    # Strict TypeScript configuration
├── content/
│   └── screenshots/
│       └── step-01/                     # 20 full-page screenshots (Desktop & Mobile)
└── progress/
    └── 01-setup.md                      # Progress documentation log
```

---

## 3. Design System Tokens

### Color Palette

| Token Name | Hex Code | Utility / CSS Var | Role in Interface |
|---|---|---|---|
| **Coffee Brown (Primary)** | `#4B2E20` | `--color-coffee` | Headers, brand accents, footer background, primary typography |
| **Deep Espresso (Text)** | `#2B1B12` | `--color-espresso` | High-contrast body typography, dark icons |
| **Cream (Background)** | `#FFF8F0` | `--color-cream` | Warm, comfortable canvas background across all viewports |
| **Warm Orange (Accent)** | `#E67E22` | `--color-orange` | Call-to-action buttons, active nav indicators, badges, highlights |
| **Soft Tan (Cards/Sections)** | `#F1E3D3` | `--color-tan` | Card backgrounds, pill tags, subtle borders, sub-containers |
| **Green (Vegetarian/Open)** | `#5B8C5A` | `--color-green` | Success indicators, campus open status, dietary tags |

### Typography

- **Headings Font:** `Playfair Display` (serif) loaded via `next/font/google` (`--font-playfair`) for an authentic, warm cafe aesthetic.
- **Body Font:** `Poppins` (sans-serif, weights 300/400/500/600/700) loaded via `next/font/google` (`--font-poppins`) for student-friendly readability.

### Reusable UI Primitives

1. **`Button` (`src/components/ui/Button.tsx`)**
   - Supports `primary`, `outline`, `secondary`, and `ghost` variants.
   - Polymorphic: renders Next.js `<Link>` when `href` is supplied; defaults `type="button"` when rendering `<button>`.
2. **`Container` (`src/components/ui/Container.tsx`)**
   - Centered container constrained to `max-w-7xl` with responsive padding (`px-4 sm:px-6 lg:px-8`).
3. **`SectionHeading` (`src/components/ui/SectionHeading.tsx`)**
   - Configurable semantic level (`as="h1" | "h2" | "h3"`), Playfair typography, category tag badges, and warm orange accent bar.
4. **`Card` (`src/components/ui/Card.tsx`)**
   - Rounded-2xl borders (`rounded-2xl`), border-tan outline, soft shadow (`shadow-sm hover:shadow-md`), and micro-interactions.

---

## 4. Navigation & Layout Implementation

### Shared Navbar (`src/components/layout/Navbar.tsx`)
- **Campus Notice Bar:** Top micro-bar displaying live campus open status and COMSATS University Islamabad branding.
- **Sticky Header:** Sticky positioning with backdrop blur (`backdrop-blur-md bg-cream/95`) and scroll-depth border.
- **Brand Identity:** Coffee cup icon badge + Playfair title "CUI Cafe" + "Campus Dining & Store" subline.
- **Links:** Home, Shop, Breakfast, Lunch, Fast Food, Stationery, Contact.
- **Active Route Highlighting:** Dynamically highlights current route with warm orange text and soft tan badge.
- **Shopping Cart Counter:** Header cart action with numeric badge (`0`) linking to `/cart`.
- **Mobile Experience:** Semantic `<nav id="mobile-nav" aria-label="Mobile Navigation">` with `aria-controls` linkage on the toggle button.

### Shared Footer (`src/components/layout/Footer.tsx`)
- **Brand Blurb:** University cafe overview and mission statement.
- **Quick Links:** Direct navigation to all menus, shop catalog, and cart.
- **Operating Hours:** Detailed campus timings (`Mon-Fri 8:00 AM - 6:00 PM`, `Sat-Sun Closed`).
- **Campus Coordinates:** Student Center, Ground Floor, Park Road, Tarlai Kalan, Islamabad, 45550.
- **Contact Channels:** Extension 304, official email `cafe@comsats.edu.pk`.
- **Copyright Notice:** `© 2026 CUI Cafe. All rights reserved.`

---

## 5. Routes Inventory

| Route | Route Type | Heading Level | Verification Status |
|---|---|---|---|
| `/` | Static | `h1` | 200 OK (Verified) |
| `/shop` | Static | `h1` | 200 OK (Verified) |
| `/breakfast` | Static | `h1` | 200 OK (Verified) |
| `/lunch` | Static | `h1` | 200 OK (Verified) |
| `/fast-food` | Static | `h1` | 200 OK (Verified) |
| `/stationery` | Static | `h1` | 200 OK (Verified) |
| `/cart` | Static | `h1` | 200 OK (Verified) |
| `/contact` | Static | `h1` | 200 OK (Verified) |
| `/product/[id]` | Dynamic (PPR) | `h1` | 200 OK (Verified) |

---

## 6. Verification & Screenshot Evidence

Real browser screenshots were recorded using Playwright Chromium across both **Desktop (1440px)** and **Mobile (390px)** viewports and saved in `content/screenshots/step-01/`:

| Screenshot File | Viewport | Target Route / State |
|---|---|---|
| `scaffold-default.png` | 1440 × 900 | Default scaffold verification |
| `home-desktop.png` | 1440 × 900 | Home (`/`) Desktop |
| `home-mobile.png` | 390 × 844 | Home (`/`) Mobile |
| `shop-desktop.png` | 1440 × 900 | Shop (`/shop`) Desktop |
| `shop-mobile.png` | 390 × 844 | Shop (`/shop`) Mobile |
| `breakfast-desktop.png` | 1440 × 900 | Breakfast (`/breakfast`) Desktop |
| `breakfast-mobile.png` | 390 × 844 | Breakfast (`/breakfast`) Mobile |
| `lunch-desktop.png` | 1440 × 900 | Lunch (`/lunch`) Desktop |
| `lunch-mobile.png` | 390 × 844 | Lunch (`/lunch`) Mobile |
| `fast-food-desktop.png` | 1440 × 900 | Fast Food (`/fast-food`) Desktop |
| `fast-food-mobile.png` | 390 × 844 | Fast Food (`/fast-food`) Mobile |
| `stationery-desktop.png` | 1440 × 900 | Stationery (`/stationery`) Desktop |
| `stationery-mobile.png` | 390 × 844 | Stationery (`/stationery`) Mobile |
| `cart-desktop.png` | 1440 × 900 | Cart (`/cart`) Desktop |
| `cart-mobile.png` | 390 × 844 | Cart (`/cart`) Mobile |
| `contact-desktop.png` | 1440 × 900 | Contact (`/contact`) Desktop |
| `contact-mobile.png` | 390 × 844 | Contact (`/contact`) Mobile |
| `product-desktop.png` | 1440 × 900 | Dynamic Product (`/product/special-chai-combo`) Desktop |
| `product-mobile.png` | 390 × 844 | Dynamic Product (`/product/special-chai-combo`) Mobile |
| `mobile-menu-open.png` | 390 × 844 | Mobile Hamburger Drawer Open State |

---

## 7. Issues Encountered & Resolved

1. **Initial Clone Destination Directory Non-Empty:**
   - *Issue:* Git clone encountered existing KDE metadata file `.directory` in the newly created folder.
   - *Fix:* Safely removed `.directory`, cloned repository cleanly, and verified Git origin.
2. **Next.js 16 Partial Prerendering Boundary with `usePathname()`:**
   - *Issue:* In Next.js 16 Turbopack with Partial Prerendering, invoking `usePathname()` in a Client Component inside `RootLayout` without an explicit `<Suspense>` boundary triggered a prerender streaming warning.
   - *Fix:* Wrapped `<Navbar />` inside `<Suspense fallback={<div className="h-20 bg-cream border-b border-tan" />}>` in `src/app/layout.tsx`.
3. **Dynamic Route `params` Await Boundary in `ProductDetailPage`:**
   - *Issue:* Directly awaiting `params` in dynamic route `[id]` triggered a prerender runtime data access check.
   - *Fix:* Refactored `ProductDetailPage` to wrap dynamic `ProductDetailContent` inside `<Suspense fallback={<ProductLoading />}>`.
4. **React 19 ESLint Cascading Render Warning in `Navbar.tsx`:**
   - *Issue:* Subagent code review flagged `setMobileMenuOpen(false)` inside `useEffect([pathname])`.
   - *Fix:* Removed redundant `useEffect` since mobile menu items already dismiss the drawer on link click.
5. **Unescaped Character in JSX:**
   - *Issue:* Unescaped apostrophe in `Today's Specials` triggered `react/no-unescaped-entities`.
   - *Fix:* Converted to `Today&apos;s Specials`.
6. **WCAG Heading Hierarchy & ARIA Semantics:**
   - *Issue:* Subagent code review recommended semantic `h1` per page, default `type="button"` in `Button`, and `aria-controls` on mobile nav.
   - *Fix:* Implemented `as="h1"` across all secondary pages, updated `Button` defaults, and wrapped mobile menu in semantic `<nav id="mobile-nav">`.
7. **Production Verification Pass:**
   - `npm run lint`: **0 errors, 0 warnings**
   - `npm run build`: **Compiled successfully in 411ms (12/12 routes generated)**
   - Headless Chromium verification: **0 console errors, 0 page errors, 100% 200 OK responses.**
