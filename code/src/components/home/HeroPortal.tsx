"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { Coffee, BookOpen, Clock, ArrowRight, ChevronDown, Plus, Check } from "lucide-react";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";

const FONT_FAMILY = '"Poppins Portal", "Arial Black", Arial, sans-serif';
let fontLoadPromise: Promise<void> | undefined;

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const HERO_BESTSELLERS = [
  {
    slug: "fajita-pizza-slice",
    name: "Fajita Pizza Slice",
    price: 280,
    image: "/images/final-web/12-pizza-slice.webp",
    category: "Fast Food",
  },
  {
    slug: "zinger-burger",
    name: "Zinger Burger",
    price: 420,
    image: "/images/final-web/17-zinger-burger.webp",
    category: "Fast Food",
  },
  {
    slug: "iced-latte",
    name: "Iced Latte",
    price: 300,
    image: "/images/final-web/27-iced-coffee-2.webp",
    category: "Beverages",
  },
  {
    slug: "crispy-wings-6pcs",
    name: "Crispy Wings (6 pcs)",
    price: 450,
    image: "/images/final-web/30-chicken-wings.webp",
    category: "Fast Food",
  },
  {
    slug: "doodh-patti-chai",
    name: "Doodh Patti Chai",
    price: 100,
    image: "/images/final-web/21-chai.webp",
    category: "Beverages",
  },
  {
    slug: "cappuccino",
    name: "Cappuccino",
    price: 250,
    image: "/images/final-web/00-your-cappuccino-4k.webp",
    category: "Beverages",
  },
];

function HeroBestsellerCard({
  slug,
  name,
  price,
  image,
  category,
}: {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
}) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const fullProduct = getProductBySlug(slug);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fullProduct) {
      addToCart(fullProduct, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-cream/10 hover:bg-cream/15 border border-cream/15 hover:border-orange/60 p-2.5 transition-all duration-200">
      <Link href={`/product/${slug}`} className="block focus:outline-none">
        <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden bg-coffee">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-1.5 left-1.5 text-[9px] uppercase tracking-wider font-bold bg-[#2B1B12]/85 text-cream px-1.5 py-0.5 rounded-sm">
            {category}
          </span>
        </div>
        <div className="mt-2 space-y-0.5">
          <h4 className="text-xs font-semibold text-cream line-clamp-1 group-hover:text-orange transition-colors">
            {name}
          </h4>
          <p className="text-[11px] font-bold text-orange">PKR {price}</p>
        </div>
      </Link>
      <button
        onClick={handleAdd}
        aria-label={`Add ${name} to cart`}
        className={`mt-2 w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
          justAdded
            ? "bg-green text-cream"
            : "bg-orange hover:bg-orange-hover text-cream active:scale-95 cursor-pointer"
        }`}
      >
        {justAdded ? (
          <>
            <Check className="w-3 h-3" />
            <span>Added</span>
          </>
        ) : (
          <>
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </>
        )}
      </button>
    </div>
  );
}

export function HeroPortal() {
  const [fontFace, setFontFace] = useState<string | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    let settled = false;
    const finish = (value: string) => {
      if (!settled) {
        settled = true;
        setFontFace(value);
      }
    };

    if (typeof window !== "undefined" && "fonts" in document) {
      fontLoadPromise ??= new FontFace(
        "Poppins Portal",
        'url("/fonts/poppins-extrabold.woff2")',
        { weight: "700 800" }
      )
        .load()
        .then((font) => {
          document.fonts.add(font);
        });

      const timeout = window.setTimeout(() => {
        finish('"Arial Black", Arial, sans-serif');
      }, 1600);

      void fontLoadPromise.then(
        () => finish(FONT_FAMILY),
        () => finish('"Arial Black", Arial, sans-serif')
      );

      return () => {
        settled = true;
        clearTimeout(timeout);
      };
    } else {
      finish('"Arial Black", Arial, sans-serif');
    }
  }, []);

  // Clean up portal dark attribute on unmount
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        delete document.documentElement.dataset.heroDark;
      }
    };
  }, []);

  if (!fontFace) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full min-h-[80vh] flex flex-col items-center justify-center gap-3 bg-cream text-coffee"
      >
        <div className="w-8 h-8 rounded-full border-3 border-orange border-t-transparent animate-spin" />
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-espresso/70">
          Loading CUI Cafe…
        </span>
      </div>
    );
  }

  // Fallback for users preferring reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full overflow-hidden bg-espresso text-cream py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/09-cafe-furniture.jpg"
            alt="COMSATS University CUI Cafe Cozy Wooden Seating and Tables"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B12] via-[#4B2E20]/80 to-[#2B1B12]/90" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-cream/15 text-cream border border-cream/20">
              COMSATS UNIVERSITY ISLAMABAD
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-cream tracking-tight">
              CUI Cafe
            </h1>
            <p className="text-base sm:text-lg text-cream/85 font-sans">
              Fresh food, hot coffee and campus essentials, all in one place.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold text-sm bg-orange text-cream hover:bg-orange-hover shadow-lg transition-all"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold text-sm border-2 border-cream text-cream hover:bg-cream hover:text-espresso transition-all"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-cream/10 border border-cream/15 space-y-3">
              <Coffee className="w-6 h-6 text-orange" />
              <h3 className="font-serif text-xl font-bold text-cream">Breakfast, lunch & fast food</h3>
              <p className="text-xs sm:text-sm text-cream/80">Steaming karak chai, morning parathas, hot biryani lunches, and quick crispy burgers ready fresh.</p>
            </div>
            <div className="p-6 rounded-2xl bg-cream/10 border border-cream/15 space-y-3">
              <BookOpen className="w-6 h-6 text-green" />
              <h3 className="font-serif text-xl font-bold text-cream">Stationery on the same order</h3>
              <p className="text-xs sm:text-sm text-cream/80">Lecture registers, engineering notebooks, ballpoints, lab manuals, and exam supplies at Counter #1.</p>
            </div>
            <div className="p-6 rounded-2xl bg-cream/10 border border-cream/15 space-y-3">
              <Clock className="w-6 h-6 text-orange" />
              <h3 className="font-serif text-xl font-bold text-cream">Pre-order and skip the queue</h3>
              <p className="text-xs sm:text-sm text-cream/80">Place orders ahead of time and grab your meal or stationery during your 10-minute lecture breaks.</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-cream/20 pb-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream">Campus Favorites</h3>
                <p className="text-xs sm:text-sm text-cream/70 font-sans">Quick-order campus bestsellers ready for pickup</p>
              </div>
              <Link href="/shop" className="text-xs sm:text-sm text-orange hover:text-cream flex items-center gap-1 font-semibold transition-colors">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {HERO_BESTSELLERS.map((item) => (
                <HeroBestsellerCard key={item.slug} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const portalStyles: GlyphPortalStyle = {
    "--gp-paper": "#FFF8F0",
    "--gp-ink": "#2B1B12",
    "--gp-field": "#4B2E20",
    "--gp-foreground": "#FFF8F0",
    fontFamily: fontFace,
  };

  return (
    <div className="relative w-full cui-hero-container">
      <style>{`
        /* Scoped styling for CUI Cafe Glyph Portal matching demo.tsx text component specification */
        .cui-hero-container [data-gp-caption] {
          inset: calc(var(--gp-word-bottom, 50%) + 128px) 24px auto;
          justify-content: center;
          z-index: 10;
        }
        .cui-hero-container [data-gp-hint] {
          display: none;
        }
        .cui-hero-container [data-gp-enter] {
          min-height: 46px;
          padding: 0 24px;
          gap: 16px;
          background-color: #E67E22;
          border: 1px solid #D35400;
          border-radius: 12px;
          color: #FFF8F0;
          font-family: var(--font-poppins), system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 14px rgba(230, 126, 34, 0.35);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .cui-hero-container [data-gp-enter]:hover {
          background-color: #D35400;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(230, 126, 34, 0.45);
        }
        .cui-hero-container [data-gp-enter]:focus-visible {
          outline: 2px solid #E67E22;
          outline-offset: 4px;
        }
        .cui-hero-container [data-gp-touch-picker] {
          top: auto;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          max-width: calc(100vw - 32px);
          padding: 0 8px;
        }
        .cui-hero-container [data-gp-select] {
          min-height: 42px;
          max-width: 100%;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #F1E3D3;
          background-color: #FFF8F0;
          color: #2B1B12;
          font-size: 12px;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(75, 46, 32, 0.08);
        }

        /* demo.tsx text component specification styles */
        .cui-hero-container [data-sublime-header] {
          position: absolute;
          inset: clamp(16px, 3.5vw, 32px) clamp(20px, 4vw, 48px) auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          z-index: 12;
          pointer-events: none;
        }
        .cui-hero-container [data-sublime-logo] {
          font-size: clamp(16px, 1.8vw, 20px);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #2B1B12;
          font-family: var(--font-playfair), Georgia, serif;
        }
        .cui-hero-container [data-sublime-category] {
          font-size: 12px;
          line-height: 1.5;
          color: #4B2E20;
          opacity: 0.85;
          font-weight: 500;
          font-family: var(--font-poppins), system-ui, sans-serif;
        }
        .cui-hero-container [data-sublime-eyebrow] {
          position: absolute;
          inset: auto 24px calc(100% - var(--gp-word-top, 35%) + 24px);
          margin: 0;
          text-align: center;
          font-family: var(--font-poppins), system-ui, sans-serif;
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #4B2E20;
        }
        .cui-hero-container [data-sublime-support] {
          position: absolute;
          inset: calc(var(--gp-word-bottom, 50%) + 18px) 24px auto;
          margin: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(calc(100% - 48px), 48ch);
          text-align: center;
          font-family: var(--font-poppins), system-ui, sans-serif;
          font-size: clamp(14px, 1.6vw, 17px);
          font-weight: 500;
          line-height: 1.5;
          color: #2B1B12;
        }
        .cui-hero-container .cui-front-buttons {
          position: absolute;
          top: calc(var(--gp-word-bottom, 50%) + 72px);
          left: 50%;
          right: auto;
          transform: translateX(-50%);
          width: max-content;
          max-width: calc(100% - 32px);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;
          z-index: 15;
        }
        .cui-hero-container [data-sublime-scroll] {
          position: absolute;
          inset: auto 24px clamp(68px, 9vh, 88px);
          text-align: center;
          font-family: var(--font-poppins), system-ui, sans-serif;
          color: #4B2E20;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          opacity: 0.85;
        }
        @media (any-pointer: coarse) {
          .cui-hero-container [data-sublime-scroll] {
            bottom: clamp(72px, 11vh, 92px);
          }
        }
        @media (max-height: 520px) {
          .cui-hero-container [data-sublime-scroll] {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .cui-hero-container .cui-front-buttons {
            top: calc(var(--gp-word-bottom, 50%) + 62px);
            gap: 8px;
          }
          .cui-hero-container [data-gp-caption] {
            top: calc(var(--gp-word-bottom, 50%) + 124px);
          }
        }

        /* Revealed slipstream copy and features layout */
        .cui-hero-container [data-slipstream-copy] {
          display: flex;
          width: min(100%, 80rem);
          margin: auto;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(2rem, 4svh, 3rem);
        }
        .cui-hero-container [data-slipstream-copy] h2 {
          max-width: 48rem;
          margin: 0;
          color: #FFF8F0;
          font-size: clamp(1.75rem, 1.1rem + 2.1vw, 2.75rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          text-wrap: balance;
        }
        .cui-hero-container [data-slipstream-features] {
          display: grid;
          width: 100%;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }
        .cui-hero-container [data-slipstream-feature] {
          border-top: 1px solid rgba(255, 248, 240, 0.22);
          padding-top: 1.25rem;
          transition: border-color 0.2s ease;
        }
        .cui-hero-container [data-slipstream-feature]:hover {
          border-top-color: #E67E22;
        }
        .cui-hero-container [data-slipstream-feature] h3 {
          margin: 0;
          color: #FFF8F0;
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.25;
        }
        .cui-hero-container [data-slipstream-feature] p {
          margin: 0.55rem 0 0;
          color: rgba(255, 248, 240, 0.85);
          font-size: 0.9375rem;
          line-height: 1.55;
          font-family: var(--font-poppins), system-ui, sans-serif;
        }
        .cui-hero-container [data-slipstream-no] {
          display: inline-block;
          margin-right: 0.7rem;
          color: #E67E22;
          font: 700 0.85rem ui-monospace, monospace;
          letter-spacing: 0.08em;
          transform: translateY(-0.05em);
        }
        @media (min-width: 768px) {
          .cui-hero-container [data-slipstream-features] {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2.5rem;
          }
        }
      `}</style>

      <GlyphPortal
        word="CAFE"
        fontFamily={fontFace}
        fontWeight={700}
        scrollLength={2.4}
        interactive={true}
        annotations={false}
        enterLabel="Step inside"
        style={portalStyles}
        onProgress={(progress) => {
          if (typeof document !== "undefined") {
            const isDark = progress > 0.55;
            document.documentElement.dataset.heroDark = isDark ? "true" : "false";
          }
        }}
        background={
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* 4K cafe furniture image from content/final-4k/09-cafe-furniture.jpg */}
            <Image
              src="/images/09-cafe-furniture.jpg"
              alt="COMSATS University CUI Cafe Wooden Furniture & Cozy Seating"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Rich dark brown overlay keeping text crisp and readable */}
            <div className="absolute inset-0 bg-[#2B1B12]/75 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B12] via-[#4B2E20]/70 to-[#2B1B12]/85" />
          </div>
        }
        front={
          <>
            <div data-sublime-header>
              <h1 data-sublime-logo className="m-0 text-inherit font-inherit">CUI Cafe.</h1>
              <span data-sublime-category>COMSATS Campus Dining & Supplies</span>
            </div>
            <p data-sublime-eyebrow>
              COMSATS UNIVERSITY ISLAMABAD • CAMPUS HUB
            </p>
            <p data-sublime-support>
              Fresh food, hot coffee and campus essentials, all in one place.
            </p>
            <div className="cui-front-buttons">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-sans font-semibold text-xs sm:text-sm bg-orange text-cream hover:bg-orange-hover shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-sans font-semibold text-xs sm:text-sm border border-coffee/60 text-coffee hover:bg-coffee hover:text-cream transition-all duration-200 active:scale-95 bg-cream/90 backdrop-blur-xs shadow-xs cursor-pointer"
              >
                <span>Contact Us</span>
              </Link>
            </div>
            <span data-sublime-scroll>
              <span>Scroll to step inside</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </span>
          </>
        }
      >
        {/* Revealed section content on the warm brown field with 09-cafe-furniture backdrop */}
        <div data-slipstream-copy className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-cream">
          <div className="space-y-3">
            <span className="inline-block px-3.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-cream/15 text-cream border border-cream/20 font-sans">
              Welcome to the Hub
            </span>
            <h2 className="font-serif font-bold text-cream tracking-tight leading-tight">
              Everything you need between classes.
            </h2>
            <p className="text-sm sm:text-base text-cream/85 font-sans leading-relaxed max-w-2xl">
              Serving the COMSATS campus community with quick pickup, freshly prepared meal platters, and quality semester stationery.
            </p>
          </div>

          {/* 3 Feature Columns using data-slipstream-features and data-slipstream-feature */}
          <div data-slipstream-features>
            {/* Column 01: Food & Drink */}
            <div data-slipstream-feature className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange/20 text-orange flex items-center justify-center mb-1">
                <Coffee className="w-5 h-5 text-cream" />
              </div>
              <h3 className="font-serif">
                <span data-slipstream-no>01</span>Breakfast, lunch & fast food
              </h3>
              <p>
                Steaming karak chai, morning parathas, hot biryani lunches, and quick crispy burgers ready fresh daily.
              </p>
              <div className="text-xs font-semibold text-orange flex items-center gap-1 pt-1">
                <span>Serving daily from 8:00 AM</span>
              </div>
            </div>

            {/* Column 02: Stationery */}
            <div data-slipstream-feature className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green/20 text-green flex items-center justify-center mb-1">
                <BookOpen className="w-5 h-5 text-cream" />
              </div>
              <h3 className="font-serif">
                <span data-slipstream-no>02</span>Stationery on the same order
              </h3>
              <p>
                Lecture registers, engineering notebooks, ballpoints, lab manuals, and exam supplies ready at Counter #1.
              </p>
              <div className="text-xs font-semibold text-orange flex items-center gap-1 pt-1">
                <span>One-stop student checkout</span>
              </div>
            </div>

            {/* Column 03: Pre-order */}
            <div data-slipstream-feature className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cream/20 text-cream flex items-center justify-center mb-1">
                <Clock className="w-5 h-5 text-cream" />
              </div>
              <h3 className="font-serif">
                <span data-slipstream-no>03</span>Pre-order and skip the queue
              </h3>
              <p>
                Place orders ahead of time and grab your meal or stationery during your 10-minute lecture breaks.
              </p>
              <div className="text-xs font-semibold text-orange flex items-center gap-1 pt-1">
                <span>Express pickup counter</span>
              </div>
            </div>
          </div>

          {/* Bestsellers image grid with Add buttons */}
          <div className="w-full pt-4 space-y-4">
            <div className="flex items-center justify-between border-b border-cream/20 pb-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream">Campus Favorites</h3>
                <p className="text-xs sm:text-sm text-cream/70 font-sans">Quick-order campus bestsellers ready for pickup</p>
              </div>
              <Link href="/shop" className="text-xs sm:text-sm text-orange hover:text-cream flex items-center gap-1 font-semibold transition-colors">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {HERO_BESTSELLERS.map((item) => (
                <HeroBestsellerCard key={item.slug} {...item} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans font-semibold text-sm sm:text-base bg-orange text-white hover:bg-orange-hover shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans font-semibold text-sm sm:text-base border-2 border-cream text-cream hover:bg-cream hover:text-coffee transition-all duration-200 active:scale-[0.98]"
            >
              <span>Visit Campus Cafe</span>
            </Link>
          </div>
        </div>
      </GlyphPortal>
    </div>
  );
}
