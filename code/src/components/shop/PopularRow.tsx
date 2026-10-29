"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

interface PopularRowProps {
  products: Product[];
}

export default function PopularRow({ products }: PopularRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16 sm:mt-24 pt-12 border-t border-tan/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-warm-orange/15 px-3 py-0.5 text-xs font-bold text-warm-orange mb-2">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Campus Favorites</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-coffee">
            Popular Right Now
          </h2>
          <p className="text-xs sm:text-sm text-espresso/70 mt-1">
            Top-rated picks ordered most frequently by students and faculty today.
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-tan bg-cream text-espresso shadow-xs hover:bg-tan/60 active:scale-95 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-tan bg-cream text-espresso shadow-xs hover:bg-tan/60 active:scale-95 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Draggable & Scrollable Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          drag="x"
          dragConstraints={scrollContainerRef}
          dragElastic={0.1}
          className="flex gap-5"
        >
          {products.map((product) => (
            <div
              key={`popular-${product.id}`}
              className="w-[280px] sm:w-[310px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
