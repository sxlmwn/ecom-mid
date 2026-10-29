"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Coffee, UtensilsCrossed, Flame, CupSoda, BookOpen, Cake, LucideIcon } from "lucide-react";
import { CategorySlug } from "@/data/categories";

interface ProductImageProps {
  src: string;
  alt: string;
  category: CategorySlug;
  aspectRatio?: "video" | "square" | "4/3";
  sizes?: string;
  priority?: boolean;
  className?: string;
}

const CATEGORY_ICONS: Record<CategorySlug, LucideIcon> = {
  breakfast: Coffee,
  lunch: UtensilsCrossed,
  "fast-food": Flame,
  beverages: CupSoda,
  stationery: BookOpen,
  desserts: Cake,
};

const CATEGORY_GRADIENTS: Record<CategorySlug, string> = {
  breakfast: "from-[#4B2E20] via-[#E67E22] to-[#F1E3D3]",
  lunch: "from-[#2B1B12] via-[#5B8C5A] to-[#4B2E20]",
  "fast-food": "from-[#4B2E20] via-[#D35400] to-[#E67E22]",
  beverages: "from-[#2B1B12] via-[#4B2E20] to-[#7A5230]",
  stationery: "from-[#2B1B12] via-[#7A5230] to-[#F1E3D3]",
  desserts: "from-[#4B2E20] via-[#9C4149] to-[#F1E3D3]",
};

export default function ProductImage({
  src,
  alt,
  category,
  aspectRatio = "4/3",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
  className = "",
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const IconComponent = CATEGORY_ICONS[category] || Coffee;
  const gradientClass = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.breakfast;

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
      ? "aspect-video"
      : "aspect-[4/3]";

  // If there's an image error or no source specified, render the stylized fallback
  if (hasError || !src) {
    return (
      <div
        role="img"
        className={`relative w-full ${aspectClass} overflow-hidden rounded-t-2xl bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center p-4 text-cream shadow-inner ${className}`}
        aria-label={`${alt} illustration`}
      >
        <div className="absolute inset-0 bg-espresso/35 mix-blend-multiply" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream/20 backdrop-blur-md border border-cream/30 text-cream shadow-lg">
            <IconComponent className="h-7 w-7 stroke-[2]" />
          </div>
          <span className="font-serif text-sm font-bold text-cream drop-shadow-md line-clamp-1 px-2">
            {alt}
          </span>
          <span className="mt-1 text-[11px] font-medium tracking-wider uppercase text-cream/80 bg-espresso/50 px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-t-2xl bg-tan/40 ${className}`}
    >
      {/* Shimmer loading backdrop */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-tan/30 via-tan/60 to-tan/30" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-all duration-500 ease-out ${
          isLoading ? "scale-105 blur-sm opacity-0" : "scale-100 blur-0 opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
