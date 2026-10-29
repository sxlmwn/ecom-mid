"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          className="rounded-2xl border border-tan/60 bg-tan/30 p-3 shadow-xs animate-pulse"
        >
          {/* Image skeleton */}
          <div className="relative aspect-[4/3] w-full rounded-xl bg-tan/70 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-cream/40 to-transparent" />
          </div>

          {/* Text lines */}
          <div className="mt-3 px-1 space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 rounded-md bg-tan/80" />
              <div className="h-3 w-12 rounded-md bg-tan/80" />
            </div>
            <div className="h-4 w-3/4 rounded-md bg-tan/90" />
            <div className="h-3 w-full rounded-md bg-tan/60" />
            <div className="h-3 w-4/5 rounded-md bg-tan/60" />
          </div>

          {/* Footer skeleton */}
          <div className="mt-4 pt-2.5 border-t border-tan/60 flex items-center justify-between px-1">
            <div className="h-5 w-20 rounded-md bg-tan/80" />
            <div className="h-8 w-16 rounded-xl bg-tan/80" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return <ProductSkeletonGrid count={8} />;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <motion.div
      layout
      data-testid="main-product-grid"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, idx) => (
          <motion.div
            layout
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
              delay: Math.min(idx * 0.03, 0.25),
            }}
          >
            <ProductCard product={product} priority={idx < 4} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
