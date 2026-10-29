"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Utensils } from "lucide-react";

interface DriftWallItem {
  image: string;
  title: string;
  href?: string;
}

interface DriftWallProps {
  items: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  speed?: number;
  tilt?: number;
  turn?: number;
  depth?: number;
  pauseOnHover?: boolean;
  overlayColor?: string;
  className?: string;
}

const DriftWall = dynamic<DriftWallProps>(
  () =>
    import("@/components/DriftWall").then(
      (mod) => mod.default as unknown as React.ComponentType<DriftWallProps>
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-espresso/40 rounded-2xl animate-pulse">
        <span className="text-xs text-cream/60 font-sans">Loading 3D Campus Dining Stream...</span>
      </div>
    ),
  }
);

const DRIFT_ITEMS = [
  {
    image: "/images/final-web/17-zinger-burger.webp",
    title: "Zinger Burger • PKR 420",
    href: "/product/zinger-burger",
  },
  {
    image: "/images/products-4k/chicken-biryani.webp",
    title: "Chicken Biryani • PKR 380",
    href: "/product/chicken-biryani",
  },
  {
    image: "/images/final-web/00-your-cappuccino-4k.webp",
    title: "Cappuccino • PKR 250",
    href: "/product/cappuccino",
  },
  {
    image: "/images/final-web/12-pizza-slice.webp",
    title: "Fajita Pizza • PKR 280",
    href: "/product/fajita-pizza-slice",
  },
  {
    image: "/images/final-web/21-chai.webp",
    title: "Karak Chai • PKR 100",
    href: "/product/doodh-patti-chai",
  },
  {
    image: "/images/final-web/30-chicken-wings.webp",
    title: "Crispy Wings • PKR 450",
    href: "/product/crispy-wings-6pcs",
  },
  {
    image: "/images/products-4k/loaded-fries.webp",
    title: "Loaded Fries • PKR 320",
    href: "/product/loaded-fries",
  },
  {
    image: "/images/final-web/27-iced-coffee-2.webp",
    title: "Iced Latte • PKR 300",
    href: "/product/iced-latte",
  },
  {
    image: "/images/products-4k/chicken-karahi-plate.webp",
    title: "Chicken Karahi • PKR 520",
    href: "/product/chicken-karahi-plate",
  },
  {
    image: "/images/products-4k/cheese-croissant.webp",
    title: "Cheese Croissant • PKR 240",
    href: "/product/cheese-croissant",
  },
  {
    image: "/images/products-4k/creamy-chicken-pasta.webp",
    title: "Creamy Pasta • PKR 420",
    href: "/product/creamy-chicken-pasta",
  },
  {
    image: "/images/products-4k/mint-margarita.webp",
    title: "Mint Cooler • PKR 200",
    href: "/product/mint-margarita",
  },
  {
    image: "/images/final-web/16-burger.webp",
    title: "Beef Burger • PKR 520",
    href: "/product/beef-smash-burger",
  },
  {
    image: "/images/final-web/26-iced-coffee.webp",
    title: "Cold Coffee • PKR 280",
    href: "/product/cold-coffee",
  },
  {
    image: "/images/final-web/07-cafe-wooden-table.webp",
    title: "Halwa Puri • PKR 350",
    href: "/product/halwa-puri-platter",
  },
];

export function CampusDriftStream() {
  return (
    <section className="py-12 bg-espresso text-cream overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-transparent to-espresso z-10 pointer-events-none" />

      <Container className="relative z-20 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cream/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange/20 text-orange flex items-center justify-center">
              <Utensils className="w-4 h-4 text-cream" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-cream">
                Live Campus Dining Stream
              </h3>
              <p className="text-xs text-cream/70 font-sans">
                Interactive 3D parallax wall of meals freshly rotating between lecture breaks
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-orange bg-orange/15 px-3 py-1 rounded-full self-start sm:self-auto">
            Interactive 3D Parallax • Move Mouse to Tilt
          </span>
        </div>
      </Container>

      <div className="w-full h-[320px] sm:h-[380px] relative">
        <DriftWall
          items={DRIFT_ITEMS}
          columns={5}
          tileWidth={220}
          tileHeight={140}
          gap={16}
          speed={32}
          tilt={12}
          turn={-8}
          depth={80}
          pauseOnHover={true}
          overlayColor="rgba(43, 27, 18, 0.4)"
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
