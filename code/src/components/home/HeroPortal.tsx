"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Coffee, BookOpen, Clock, ArrowRight, ChevronDown } from "lucide-react";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";

const FONT_FAMILY = '"Poppins Portal", "Arial Black", Arial, sans-serif';
let fontLoadPromise: Promise<void> | undefined;

export function HeroPortal() {
  const [fontFace, setFontFace] = useState<string | null>(null);

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

  const portalStyles: GlyphPortalStyle = {
    "--gp-paper": "#FFF8F0",
    "--gp-ink": "#2B1B12",
    "--gp-field": "#4B2E20",
    "--gp-foreground": "#FFF8F0",
    fontFamily: fontFace,
  };

  return (
    <div className="relative w-full overflow-hidden cui-hero-container">
      <style>{`
        /* Scoped styling for CUI Cafe Glyph Portal */
        .cui-hero-container [data-gp-caption] {
          inset: calc(var(--gp-word-bottom, 50%) + 76px) 24px auto;
          justify-content: center;
          z-index: 10;
        }
        .cui-hero-container [data-gp-hint] {
          display: none;
        }
        .cui-hero-container [data-gp-enter] {
          min-height: 46px;
          padding: 0 24px;
          gap: 12px;
          background-color: #E67E22;
          border: 1px solid #D35400;
          border-radius: 12px;
          color: #FFF8F0;
          font-family: var(--font-poppins), system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 14px rgba(230, 126, 34, 0.3);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .cui-hero-container [data-gp-enter]:hover {
          background-color: #D35400;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(230, 126, 34, 0.4);
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
        }
        .cui-hero-container [data-gp-select] {
          min-height: 42px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #F1E3D3;
          background-color: #FFF8F0;
          color: #2B1B12;
          font-size: 12px;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(75, 46, 32, 0.08);
        }

        /* Front elements layout relative to the giant word */
        .cui-front-eyebrow {
          position: absolute;
          inset: auto 24px calc(100% - var(--gp-word-top, 35%) + 24px);
          margin: 0;
          text-align: center;
          font-family: var(--font-poppins), system-ui, sans-serif;
          font-size: clamp(11px, 1.3vw, 14px);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4B2E20;
        }
        .cui-front-support {
          position: absolute;
          inset: calc(var(--gp-word-bottom, 50%) + 24px) 24px auto;
          margin: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(calc(100% - 48px), 44ch);
          text-align: center;
          font-family: var(--font-poppins), system-ui, sans-serif;
          font-size: clamp(14px, 1.8vw, 18px);
          font-weight: 500;
          line-height: 1.5;
          color: #2B1B12;
        }
        .cui-front-scroll {
          position: absolute;
          inset: auto 24px 5%;
          text-align: center;
          font-family: var(--font-poppins), system-ui, sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #4B2E20;
          opacity: 0.75;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        @media (any-pointer: coarse) {
          .cui-front-scroll {
            bottom: 12%;
          }
        }
        @media (max-height: 520px) {
          .cui-front-scroll {
            display: none;
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
            {/* Real verified coffee photo from code/public/images/hero-coffee.jpg */}
            <Image
              src="/images/hero-coffee.jpg"
              alt="Freshly brewed coffee at COMSATS University CUI Cafe"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Rich dark brown overlay keeping text crisp and readable */}
            <div className="absolute inset-0 bg-[#2B1B12]/80 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B12] via-[#4B2E20]/75 to-[#2B1B12]/85" />
          </div>
        }
        front={
          <>
            <p className="cui-front-eyebrow">
              COMSATS University Islamabad&apos;s own cafe
            </p>
            <p className="cui-front-support">
              Fresh food, hot coffee and campus essentials, all in one place.
            </p>
            <div className="cui-front-scroll">
              <span>Scroll to step inside</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </>
        }
      >
        {/* Revealed section content on the warm brown field */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-cream space-y-8 sm:space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block px-3.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-cream/15 text-cream border border-cream/20">
              Welcome to the Hub
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream tracking-tight leading-tight">
              Everything you need between classes.
            </h2>
            <p className="text-sm sm:text-base text-cream/85 font-sans leading-relaxed">
              Serving the COMSATS campus community with quick pickup, freshly prepared meal platters, and quality semester stationery.
            </p>
          </div>

          {/* 3 Feature Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
            {/* Column 1: Food & Drink */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cream/10 border border-cream/15 backdrop-blur-xs flex flex-col justify-between space-y-4 hover:border-orange/60 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-orange/20 text-orange flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-cream" />
                </div>
                <h3 className="font-serif text-xl font-bold text-cream">
                  Breakfast, lunch and fast food
                </h3>
                <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-sans">
                  Steaming karak chai, morning parathas, hot biryani lunches, and quick crispy burgers ready fresh.
                </p>
              </div>
              <div className="text-xs font-semibold text-orange flex items-center gap-1 pt-1">
                <span>Serving daily from 8:00 AM</span>
              </div>
            </div>

            {/* Column 2: Stationery */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cream/10 border border-cream/15 backdrop-blur-xs flex flex-col justify-between space-y-4 hover:border-orange/60 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-green/20 text-green flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-cream" />
                </div>
                <h3 className="font-serif text-xl font-bold text-cream">
                  Stationery on the same order
                </h3>
                <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-sans">
                  Lecture registers, engineering notebooks, ballpoints, lab manuals, and exam supplies at Counter #1.
                </p>
              </div>
              <div className="text-xs font-semibold text-orange flex items-center gap-1 pt-1">
                <span>One-stop student checkout</span>
              </div>
            </div>

            {/* Column 3: Pre-order */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cream/10 border border-cream/15 backdrop-blur-xs flex flex-col justify-between space-y-4 hover:border-orange/60 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cream/20 text-cream flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cream" />
                </div>
                <h3 className="font-serif text-xl font-bold text-cream">
                  Pre-order and skip the queue
                </h3>
                <p className="text-xs sm:text-sm text-cream/80 leading-relaxed font-sans">
                  Place orders ahead of time and grab your meal or stationery during your 10-minute lecture breaks.
                </p>
              </div>
              <div className="text-xs font-semibold text-orange flex items-center gap-1 pt-1">
                <span>Express pickup counter</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans font-semibold text-sm sm:text-base bg-orange text-white hover:bg-orange-hover shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
            >
              <span>Browse Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans font-semibold text-sm sm:text-base border-2 border-cream text-cream hover:bg-cream hover:text-coffee transition-all duration-200 active:scale-[0.98]"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </GlyphPortal>
    </div>
  );
}
