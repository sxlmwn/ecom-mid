import React from "react";
import Link from "next/link";
import { Coffee, Clock, MapPin, Phone, Mail, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto bg-coffee text-cream border-t border-coffee-dark/40">
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Column 1: Brand Blurb */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange flex items-center justify-center text-white shadow-sm">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cream tracking-tight">
                    CUI Cafe
                  </h3>
                  <p className="text-xs text-cream/70 uppercase tracking-wider">
                    COMSATS University Islamabad
                  </p>
                </div>
              </div>
              <p className="text-sm text-cream/80 leading-relaxed">
                The heart of campus dining and student essentials. Providing fresh coffee, hearty meals, quick snacks, and quality stationery to energize your university journey.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coffee-dark/60 border border-cream/10 text-xs text-cream/90">
                <span className="w-2 h-2 rounded-full bg-green" />
                <span>Open for Campus Orders</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-cream mb-4 pb-2 border-b border-cream/10 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm text-cream/80">
                <li>
                  <Link href="/" className="hover:text-orange transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-orange transition-colors">
                    Browse All Products
                  </Link>
                </li>
                <li>
                  <Link href="/breakfast" className="hover:text-orange transition-colors">
                    Breakfast Specials
                  </Link>
                </li>
                <li>
                  <Link href="/lunch" className="hover:text-orange transition-colors">
                    Daily Lunch Menu
                  </Link>
                </li>
                <li>
                  <Link href="/fast-food" className="hover:text-orange transition-colors">
                    Fast Food & Snacks
                  </Link>
                </li>
                <li>
                  <Link href="/desserts" className="hover:text-orange transition-colors">
                    Desserts & Bakery
                  </Link>
                </li>
                <li>
                  <Link href="/stationery" className="hover:text-orange transition-colors">
                    Stationery & Supplies
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-orange transition-colors">
                    View Shopping Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Hours & Timings */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-cream mb-4 pb-2 border-b border-cream/10 inline-block">
                Opening Hours
              </h4>
              <ul className="space-y-3 text-sm text-cream/80">
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-cream block">Monday – Friday</span>
                    <span className="text-xs text-cream/70">8:00 AM – 6:00 PM</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-cream/40 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-cream/60 block">Saturday – Sunday</span>
                    <span className="text-xs text-cream/50">Closed (Campus Weekend)</span>
                  </div>
                </li>
                <li className="pt-2 text-xs text-cream/70 bg-coffee-dark/40 p-2.5 rounded-xl border border-cream/5">
                  ☕ Hot breakfast starts serving at 8:15 AM sharp before morning lectures.
                </li>
              </ul>
            </div>

            {/* Column 4: Location & Contact */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-cream mb-4 pb-2 border-b border-cream/10 inline-block">
                Campus Location
              </h4>
              <ul className="space-y-3 text-sm text-cream/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-cream block">
                      COMSATS University Islamabad
                    </span>
                    <span className="text-xs text-cream/70">
                      Student Center, Ground Floor, Park Road, Tarlai Kalan, Islamabad, 45550
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-orange shrink-0" />
                  <span className="text-xs text-cream/90">+92 (051) 9247000-2 Ext: 304</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-orange shrink-0" />
                  <span className="text-xs text-cream/90">cafe@comsats.edu.pk</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="bg-coffee-dark border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 CUI Cafe. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-orange fill-orange" /> for COMSATS University Islamabad Students
          </p>
          <div className="flex items-center gap-4 text-cream/60">
            <Link href="/contact" className="hover:text-cream transition-colors">
              Help Desk
            </Link>
            <span>•</span>
            <Link href="/shop" className="hover:text-cream transition-colors">
              Campus Store
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
