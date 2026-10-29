"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Coffee, Sparkles } from "lucide-react";

interface InfiniteSpiralItem {
  src: string;
  alt?: string;
  title?: string;
}

interface InfiniteSpiralProps {
  items: InfiniteSpiralItem[];
  speed?: number;
  direction?: "up" | "down";
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  cardRadius?: number;
  centerScale?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const InfiniteSpiral = dynamic<InfiniteSpiralProps>(
  () =>
    import("@/components/InfiniteSpiral").then(
      (mod) => mod.default as unknown as React.ComponentType<InfiniteSpiralProps>
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-tan/20 rounded-2xl animate-pulse">
        <span className="text-xs text-coffee/60 font-sans">Loading 3D Brew Spiral...</span>
      </div>
    ),
  }
);

const SPIRAL_DRINKS = [
  {
    src: "/images/final-web/00-your-cappuccino-4k.webp",
    alt: "Artisan Cappuccino",
    title: "Cappuccino",
  },
  {
    src: "/images/final-web/27-iced-coffee-2.webp",
    alt: "Chilled Iced Latte",
    title: "Iced Latte",
  },
  {
    src: "/images/final-web/21-chai.webp",
    alt: "Karak Doodh Patti Chai",
    title: "Doodh Patti Chai",
  },
  {
    src: "/images/final-web/26-iced-coffee.webp",
    alt: "Cold Brew Coffee",
    title: "Cold Coffee",
  },
  {
    src: "/images/products-4k/mint-margarita.webp",
    alt: "Fresh Mint Cooler",
    title: "Mint Margarita",
  },
  {
    src: "/images/products-4k/fresh-orange-juice.webp",
    alt: "Fresh Orange Juice",
    title: "Orange Juice",
  },
  {
    src: "/images/final-web/23-latte-art.webp",
    alt: "Barista Latte Art",
    title: "Specialty Latte",
  },
  {
    src: "/images/final-web/24-mocha.webp",
    alt: "Dark Chocolate Mocha",
    title: "Mocha",
  },
  {
    src: "/images/final-web/29-iced-cola.webp",
    alt: "Chilled Soda Cooler",
    title: "Iced Cooler",
  },
];

export function BeveragesSpiralSection() {
  return (
    <section className="py-14 bg-tan-light border-b border-tan/60 relative overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="max-w-md space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/15 text-orange text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> 3D Brew Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee tracking-tight">
              The Infinite Brew Spiral
            </h2>
            <p className="text-sm text-espresso/75 leading-relaxed font-sans">
              From our copper-kettle simmering doodh patti chai to precision espresso pulls and iced coolers, explore our handcrafted university beverage lineup in continuous 3D rotation.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-coffee/80 pt-2">
              <span className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-orange" /> Handcrafted daily
              </span>
              <span>•</span>
              <span>Pause on hover</span>
            </div>
          </div>

          {/* Right 3D Spiral */}
          <div className="w-full md:w-[480px] h-[360px] relative rounded-3xl bg-white border border-tan/80 shadow-md p-4 flex items-center justify-center overflow-hidden">
            <InfiniteSpiral
              items={SPIRAL_DRINKS}
              speed={0.45}
              direction="up"
              radius={140}
              cardWidth={110}
              cardHeight={110}
              verticalSpacing={50}
              perspective={900}
              cardsPerTurn={6}
              cardRadius={16}
              centerScale={1.15}
              pauseOnHover={true}
              className="w-full h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
