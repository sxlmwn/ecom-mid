"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Compass, Sparkles } from "lucide-react";

interface DomeGalleryImage {
  src: string;
  alt: string;
}

interface DomeGalleryProps {
  images: DomeGalleryImage[];
  segments?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  overlayBlurColor?: string;
  grayscale?: boolean;
}

const DomeGallery = dynamic<DomeGalleryProps>(
  () =>
    import("@/components/DomeGallery").then(
      (mod) => mod.default as unknown as React.ComponentType<DomeGalleryProps>
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-espresso/40 rounded-2xl animate-pulse">
        <span className="text-xs text-cream/60 font-sans">Loading 3D Campus Dome...</span>
      </div>
    ),
  }
);

const DOME_CAFE_IMAGES = [
  { src: "/images/final-web/00-your-cafe-1-4k.webp", alt: "CUI Cafe Dining Hall" },
  { src: "/images/final-web/00-your-cafe-2-4k.webp", alt: "Campus Coffee Bar" },
  { src: "/images/final-web/02-cafe-interior.webp", alt: "Warm Wooden Tables" },
  { src: "/images/final-web/03-cafe-interior-2.webp", alt: "Cozy Study Corner" },
  { src: "/images/final-web/04-cafe-rustic.webp", alt: "Stationery & Order Counter" },
  { src: "/images/final-web/05-cafe-outdoor-seating.webp", alt: "Sunny Outdoor Patio" },
  { src: "/images/final-web/06-restaurant-tables.webp", alt: "Student Lounge Seating" },
  { src: "/images/final-web/07-cafe-wooden-table.webp", alt: "Morning Breakfast Platter" },
  { src: "/images/final-web/08-cafe-wooden-decor.webp", alt: "Artisan Cafe Decor" },
  { src: "/images/final-web/09-cafe-furniture.webp", alt: "Study Pods and Chairs" },
  { src: "/images/final-web/10-cafe-interior-3.webp", alt: "Main Campus Hub" },
  { src: "/images/final-web/22-coffee.webp", alt: "Fresh Roasted Coffee" },
  { src: "/images/final-web/23-latte-art.webp", alt: "Handcrafted Latte Art" },
  { src: "/images/final-web/25-coffee-2.webp", alt: "Espresso Machine Bar" },
  { src: "/images/final-web/14-pizza-restaurant.webp", alt: "Stone Oven Baking Area" },
  { src: "/images/final-web/17-zinger-burger.webp", alt: "Crispy Zinger Station" },
  { src: "/images/final-web/21-chai.webp", alt: "Copper Karak Chai Samovar" },
  { src: "/images/final-web/27-iced-coffee-2.webp", alt: "Iced Beverage Station" },
];

export function CampusDomeSection() {
  return (
    <section className="py-16 bg-espresso text-cream overflow-hidden border-t border-cream/15 relative">
      <Container className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/20 text-orange text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cream" /> 360° Atmosphere
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-cream tracking-tight">
              Experience the CUI Cafe Campus Vibe
            </h2>
            <p className="text-xs sm:text-sm text-cream/75 mt-1 max-w-xl font-sans">
              Drag around the 3D dome to explore our indoor study lounges, sunny outdoor patio, barista coffee bar, and dining halls. Click any tile to inspect.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange bg-orange/15 px-3.5 py-1.5 rounded-xl self-start md:self-auto">
            <Compass className="w-4 h-4" />
            <span>Interactive 3D Dome • Drag to Orbit</span>
          </div>
        </div>
      </Container>

      <div className="w-full h-[450px] sm:h-[550px] relative">
        <DomeGallery
          images={DOME_CAFE_IMAGES}
          segments={30}
          dragSensitivity={18}
          enlargeTransitionMs={300}
          overlayBlurColor="rgba(43, 27, 18, 0.9)"
          grayscale={false}
        />
      </div>
    </section>
  );
}
