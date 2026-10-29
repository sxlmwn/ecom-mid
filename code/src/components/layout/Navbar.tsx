"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CardNavComponent from "@/components/CardNav";
import type { CardNavProps } from "@/types/card-nav";

const CardNav = CardNavComponent as unknown as React.ComponentType<CardNavProps>;

const CARD_NAV_ITEMS = [
  {
    label: "Menu",
    description: "Fresh campus meals & daily artisan brews",
    bgColor: "#2B1B12", // deep espresso
    textColor: "#FFF8F0", // cream
    links: [
      { label: "Breakfast Platters", href: "/breakfast", ariaLabel: "Breakfast Platters" },
      { label: "Lunch & Biryani", href: "/lunch", ariaLabel: "Lunch & Biryani" },
      { label: "Fast Food & Snacks", href: "/fast-food", ariaLabel: "Fast Food & Snacks" },
      { label: "Hot & Chilled Beverages", href: "/beverages", ariaLabel: "Hot & Chilled Beverages" },
      { label: "Desserts & Bakery", href: "/desserts", ariaLabel: "Desserts & Bakery" },
    ],
  },
  {
    label: "Shop",
    description: "All student menu items & academic stationery",
    bgColor: "#F1E3D3", // soft tan
    textColor: "#2B1B12", // deep espresso
    links: [
      { label: "All Products Catalogue", href: "/shop", ariaLabel: "All Products Catalogue" },
      { label: "Desserts & Sweets", href: "/desserts", ariaLabel: "Desserts & Sweets" },
      { label: "Academic Stationery", href: "/stationery", ariaLabel: "Academic Stationery" },
    ],
  },
  {
    label: "Cafe",
    description: "COMSATS University student dining center",
    bgColor: "#4B2E20", // coffee brown
    textColor: "#FFF8F0", // cream
    links: [
      { label: "Home", href: "/", ariaLabel: "Home Page" },
      { label: "Contact Us", href: "/contact", ariaLabel: "Contact CUI Cafe" },
      { label: "Visit Us (Location)", href: "/contact", ariaLabel: "Visit Us Location" },
      { label: "How to Order", href: "/#how-to-order", ariaLabel: "How to Order Guide" },
    ],
  },
];

const emptySubscribe = () => () => {};

export function Navbar() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayCount = mounted ? totalCount : 0;
  const isHomeTop = pathname === "/" && !scrolled;

  const brandLogo = (
    <div className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-coffee flex items-center justify-center text-cream shadow-xs group-hover:bg-orange transition-colors duration-200 shrink-0">
        <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-cream" />
      </div>
      <div className="flex flex-col">
        <span className="cui-nav-title font-serif text-lg sm:text-xl font-bold text-coffee tracking-tight group-hover:text-orange transition-colors duration-200 leading-none">
          CUI Cafe
        </span>
        <span className="cui-nav-subtitle text-[9px] sm:text-[10px] text-espresso/70 font-sans uppercase tracking-widest mt-0.5 transition-colors duration-200 hidden sm:block">
          Campus Dining & Store
        </span>
      </div>
    </div>
  );

  const cartButton = (
    <Link
      href="/cart"
      className={`cui-nav-cart relative p-2 sm:p-2.5 rounded-xl border border-tan transition-all duration-150 flex items-center justify-center cursor-pointer ${
        pathname === "/cart"
          ? "bg-tan text-coffee border-orange/40"
          : "bg-white hover:bg-tan/40 text-coffee hover:border-coffee/30 shadow-2xs"
      }`}
      aria-label={`View Cart (${displayCount} items)`}
      data-testid="nav-cart-btn"
    >
      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-coffee transition-colors duration-200" />
      <span
        data-testid="nav-cart-count"
        suppressHydrationWarning
        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-warm-orange text-cream text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs transition-transform duration-200"
      >
        {displayCount}
      </span>
    </Link>
  );

  return (
    <header
      data-cui-navbar
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHomeTop
          ? "cui-navbar-hero-top bg-gradient-to-b from-[#2B1B12]/85 to-transparent border-transparent"
          : "bg-cream/95 backdrop-blur-md border-b border-tan shadow-xs"
      }`}
    >
      {/* Main Bar with CardNav Component */}
      <div className="py-2 px-3 sm:px-4 max-w-7xl mx-auto">
        <CardNav
          logo={brandLogo}
          logoAlt="CUI Cafe"
          logoHref="/"
          baseColor="#FFF8F0"
          menuColor="#4B2E20"
          buttonBgColor="#E67E22"
          buttonTextColor="#FFFFFF"
          ease="power3.out"
          items={CARD_NAV_ITEMS}
          cartSlot={cartButton}
          linkComponent={Link}
          currentPath={pathname}
          maxWidth="100%"
          className="w-full"
        />
      </div>
    </header>
  );
}
