"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowRight,
  Coffee,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import { getProductsByCategory } from "@/data/products";
import { categories } from "@/data/categories";

interface CategoryPageTemplateProps {
  categorySlug: string;
  title: string;
  tagline: string;
  bannerImage: string;
  extraSection?: React.ReactNode;
}

type FilterTag = "all" | "veg" | "spicy" | "bestseller";
type SortOption = "popular" | "price-asc" | "price-desc" | "rating";

export default function CategoryPageTemplate({
  categorySlug,
  title,
  tagline,
  bannerImage,
  extraSection,
}: CategoryPageTemplateProps) {
  const baseProducts = useMemo(
    () => getProductsByCategory(categorySlug),
    [categorySlug]
  );

  const [activeFilter, setActiveFilter] = useState<FilterTag>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  // Filtered & sorted products
  const displayedProducts = useMemo(() => {
    let result = [...baseProducts];

    // Filter
    if (activeFilter === "veg") {
      result = result.filter((p) => p.tags.includes("veg"));
    } else if (activeFilter === "spicy") {
      result = result.filter((p) => p.tags.includes("spicy"));
    } else if (activeFilter === "bestseller") {
      result = result.filter((p) => p.tags.includes("bestseller"));
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [baseProducts, activeFilter, sortBy]);

  const otherCategories = categories.filter((c) => c.slug !== categorySlug);
  const isStationery = categorySlug === "stationery";

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* 1. Category Hero Banner */}
      <section className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-espresso text-cream flex items-end">
        <Image
          src={bannerImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/30" />

        <Container className="relative pb-8 sm:pb-12 z-10 space-y-2">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-cream/75 mb-2 overflow-x-auto whitespace-nowrap"
          >
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-cream/50" />
            <Link href="/shop" className="hover:text-orange transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-cream/50" />
            <span className="font-semibold text-orange">{title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange text-cream shadow-xs">
              {baseProducts.length} items available
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream tracking-tight">
            {title}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-cream/85 font-sans max-w-2xl leading-relaxed">
            {tagline}
          </p>
        </Container>
      </section>

      {/* Optional Interactive Category Showcase (Spiral, Masonry, etc.) */}
      {extraSection}

      {/* 2. Main Catalogue Area */}
      <section className="py-10 sm:py-16">
        <Container>
          {/* Controls Bar: Filters & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-tan/80 shadow-xs mb-8">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-espresso/60 flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
              </span>
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-coffee text-cream shadow-xs"
                    : "bg-tan/50 hover:bg-tan text-coffee"
                }`}
              >
                All ({baseProducts.length})
              </button>

              {!isStationery && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("veg")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeFilter === "veg"
                        ? "bg-green text-cream shadow-xs"
                        : "bg-tan/50 hover:bg-tan text-coffee"
                    }`}
                  >
                    Vegetarian
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("spicy")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeFilter === "spicy"
                        ? "bg-[#D35400] text-cream shadow-xs"
                        : "bg-tan/50 hover:bg-tan text-coffee"
                    }`}
                  >
                    Spicy
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setActiveFilter("bestseller")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === "bestseller"
                    ? "bg-orange text-cream shadow-xs"
                    : "bg-tan/50 hover:bg-tan text-coffee"
                }`}
              >
                Bestsellers
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label htmlFor="sort-select" className="text-xs font-bold text-espresso/60">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 rounded-xl border border-tan bg-cream text-xs font-semibold text-coffee focus:outline-none focus:border-orange cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl bg-white border border-tan/80 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-tan/60 flex items-center justify-center text-orange">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-coffee">
                No items match this filter
              </h3>
              <p className="text-xs sm:text-sm text-espresso/70">
                Try switching your filter selection to view more options in {title}.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange hover:bg-orange-hover text-cream text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* 3. Explore Other Categories Strip */}
      <section className="py-12 bg-tan-light border-t border-tan/60 mt-auto">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-coffee">
              Explore Other Campus Categories
            </h3>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-semibold text-orange hover:underline flex items-center gap-1"
            >
              <span>All 35 products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.route}
                className="p-4 rounded-2xl bg-white border border-tan/80 hover:border-orange/60 shadow-2xs hover:shadow-md transition-all group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange block mb-1">
                  Category
                </span>
                <h4 className="font-serif text-base font-bold text-coffee group-hover:text-orange transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-espresso/60 line-clamp-1 mt-1 font-sans">
                  {cat.tagline}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
