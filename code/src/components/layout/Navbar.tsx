"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, ShoppingCart, Menu, X, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Breakfast", href: "/breakfast" },
  { name: "Lunch", href: "/lunch" },
  { name: "Fast Food", href: "/fast-food" },
  { name: "Stationery", href: "/stationery" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-cream/95 backdrop-blur-md border-b border-tan ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/* Top micro-bar for university branding */}
      <div className="bg-coffee text-cream text-[11px] sm:text-xs py-1 border-b border-coffee-dark/30">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green animate-pulse" />
            <span>COMSATS University Islamabad • Student Campus Cafe</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-cream/80">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-orange" /> Mon-Fri: 8:00 AM - 6:00 PM
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-orange" /> CUI Main Campus, Student Center
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            aria-label="CUI Cafe Homepage"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-coffee flex items-center justify-center text-cream shadow-xs group-hover:bg-orange transition-colors duration-200">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-cream" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold text-coffee tracking-tight group-hover:text-orange transition-colors duration-200 leading-none">
                CUI Cafe
              </span>
              <span className="text-[10px] sm:text-xs text-espresso/70 font-sans uppercase tracking-widest mt-0.5">
                Campus Dining & Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 relative ${
                    active
                      ? "text-orange bg-tan/70 font-semibold shadow-xs"
                      : "text-espresso/80 hover:text-coffee hover:bg-tan/30"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions: Cart & Mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <Link
              href="/cart"
              className={`relative p-2.5 rounded-xl border border-tan transition-all duration-150 flex items-center justify-center ${
                isActive("/cart")
                  ? "bg-tan text-coffee border-orange/40"
                  : "bg-white hover:bg-tan/40 text-coffee hover:border-coffee/30 shadow-2xs"
              }`}
              aria-label="View Cart (0 items)"
            >
              <ShoppingCart className="w-5 h-5 text-coffee" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                0
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-tan bg-white hover:bg-tan/40 text-coffee transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-orange/30"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile Navigation"
          data-testid="mobile-menu-dropdown"
          className="lg:hidden border-t border-tan bg-cream px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-colors ${
                    active
                      ? "bg-tan text-orange font-semibold shadow-xs"
                      : "text-espresso/90 hover:bg-tan/40 hover:text-coffee"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-orange" />
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-tan/60 mt-2">
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-colors ${
                  isActive("/cart")
                    ? "bg-tan text-orange font-semibold"
                    : "text-espresso/90 hover:bg-tan/40 hover:text-coffee"
                }`}
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-coffee" />
                  <span>My Cart</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-orange text-white text-xs font-bold">
                  0 items
                </span>
              </Link>
            </div>

            {/* Mobile Cafe Info */}
            <div className="mt-4 p-3 rounded-xl bg-tan/40 border border-tan/60 text-xs text-espresso/70 space-y-1">
              <p className="font-semibold text-coffee">Campus Timings & Location:</p>
              <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p>Student Center, COMSATS Islamabad</p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
