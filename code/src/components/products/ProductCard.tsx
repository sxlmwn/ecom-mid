"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Plus, Flame, Sparkles, Award, Check } from "lucide-react";
import { Product } from "@/data/products";
import ProductImage from "@/components/ui/ProductImage";
import { addToCartPlaceholder } from "@/lib/cart-placeholder";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger placeholder handler
    addToCartPlaceholder(product, 1);

    // Show +1 pop animation
    setShowPlusOne(true);
    setIsAdded(true);

    setTimeout(() => {
      setShowPlusOne(false);
    }, 900);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <motion.div
      layout="position"
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col justify-between rounded-2xl bg-tan/50 border border-tan/80 p-3 shadow-sm hover:shadow-xl hover:border-warm-orange/30 transition-shadow duration-300"
    >
      <Link
        href={`/product/${product.slug}`}
        className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-orange rounded-xl"
        aria-label={`View details for ${product.name}`}
      >
        {/* Image Container with Badges */}
        <div className="relative overflow-hidden rounded-xl">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            priority={priority}
            aspectRatio="4/3"
            className="group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Top Badges overlay */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-1 pointer-events-none z-10">
            <div className="flex flex-wrap gap-1">
              {product.tags.includes("veg") && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cream/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-green border border-green/30 shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                  Veg
                </span>
              )}
              {product.tags.includes("spicy") && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cream/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-[#D35400] border border-[#D35400]/30 shadow-xs">
                  <Flame className="h-3 w-3 fill-current" />
                  Spicy
                </span>
              )}
              {product.tags.includes("bestseller") && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-cream shadow-xs">
                  <Award className="h-3 w-3" />
                  Bestseller
                </span>
              )}
              {product.tags.includes("new") && (
                <span className="inline-flex items-center gap-1 rounded-full bg-warm-orange/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-cream shadow-xs">
                  <Sparkles className="h-3 w-3" />
                  New
                </span>
              )}
              {product.tags.includes("chef-pick") && (
                <span className="inline-flex items-center gap-1 rounded-full bg-coffee/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-cream shadow-xs">
                  Chef&apos;s Pick
                </span>
              )}
            </div>

            {/* Discount Badge */}
            {discountPercent && (
              <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-extrabold text-cream shadow-sm">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Prep time chip (bottom right of image) */}
          <div className="absolute bottom-2 right-2 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-espresso/75 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-cream/95">
              <Clock className="h-3 w-3 text-cream/80" />
              {product.prepTime}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-3 flex flex-col flex-1 px-1">
          {/* Rating & Category header */}
          <div className="flex items-center justify-between text-xs text-espresso/70 mb-1">
            <span className="capitalize font-medium text-coffee/80">{product.category.replace("-", " ")}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-espresso">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-espresso/50">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base font-bold text-espresso group-hover:text-coffee transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description (2-line clamp) */}
          <p className="mt-1 text-xs text-espresso/75 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </Link>

      {/* Footer: Price & Add Button */}
      <div className="mt-3 pt-2.5 border-t border-tan/90 flex items-center justify-between px-1">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans text-base font-extrabold text-coffee">
              PKR {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-espresso/45 line-through">
                PKR {product.oldPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] text-espresso/55 font-medium">In stock ({product.stock})</span>
        </div>

        {/* Add to Cart Button */}
        <div className="relative">
          <AnimatePresence>
            {showPlusOne && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: -28, scale: 1.15 }}
                exit={{ opacity: 0, y: -38, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 z-20 rounded-full bg-warm-orange px-2 py-0.5 text-xs font-black text-cream shadow-md"
              >
                +1
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 shadow-sm ${
              isAdded
                ? "bg-green text-cream"
                : "bg-warm-orange text-cream hover:bg-warm-orange/90 hover:shadow-md active:bg-[#D35400]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
