"use client";

import React, { useState, useEffect, useMemo, useTransition, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Coffee,
  UtensilsCrossed,
  Flame,
  CupSoda,
  BookOpen,
  LayoutGrid,
  SearchX,
  Sparkles,
  Cake,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { products as allProducts, getBestsellers } from "@/data/products";
import { categories } from "@/data/categories";
import ProductGrid from "@/components/products/ProductGrid";
import ExpandableCardDemo from "@/components/expandable-card-demo-grid";
import PopularRow from "./PopularRow";
import BackToTop from "./BackToTop";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "name-asc";

const CATEGORY_TABS: { slug: string; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { slug: "all", name: "All Menu", icon: LayoutGrid },
  { slug: "breakfast", name: "Breakfast", icon: Coffee },
  { slug: "lunch", name: "Lunch", icon: UtensilsCrossed },
  { slug: "fast-food", name: "Fast Food", icon: Flame },
  { slug: "beverages", name: "Beverages", icon: CupSoda },
  { slug: "desserts", name: "Desserts & Bakery", icon: Cake },
  { slug: "stationery", name: "Stationery", icon: BookOpen },
];

export default function ShopClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Derive filter state directly from URL query parameters (single source of truth)
  const selectedCategory = searchParams.get("category") || "all";
  const urlQuery = searchParams.get("q") || "";
  const selectedSort = (searchParams.get("sort") as SortOption) || "featured";
  const vegOnly = searchParams.get("veg") === "1";
  const spicyOnly = searchParams.get("spicy") === "1";
  const bestsellerOnly = searchParams.get("bestseller") === "1";
  const discountOnly = searchParams.get("discount") === "1";
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 1800;

  // Local state for fast responsive typing in the search bar
  const [searchInput, setSearchInput] = useState<string>(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState<string>(urlQuery);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [shimmerLoading, setShimmerLoading] = useState<boolean>(false);

  // Synchronize search input if URL changes externally (e.g. back/forward or clear)
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setSearchInput(urlQuery);
  }

  // Helper to update URL params cleanly
  const updateUrlParams = useCallback(
    (updates: Record<string, string | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || (key === "category" && value === "all") || (key === "sort" && value === "featured") || (key === "maxPrice" && value === "1800")) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";

      // Trigger a brief skeleton shimmer feedback on filter updates
      setShimmerLoading(true);
      setTimeout(() => setShimmerLoading(false), 240);

      startTransition(() => {
        router.replace(`${pathname}${query}`, { scroll: false });
      });
    },
    [searchParams, pathname, router]
  );

  // Debounce search input (250ms) to sync with URL query
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== urlQuery) {
        updateUrlParams({ q: searchInput.trim() ? searchInput.trim() : null });
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [searchInput, urlQuery, updateUrlParams]);


  // Calculate item counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProducts.length };
    categories.forEach((cat) => {
      counts[cat.slug] = allProducts.filter((p) => p.category === cat.slug).length;
    });
    return counts;
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query matching (matches name, description, ingredients, category)
    const effectiveQuery = (searchInput || urlQuery).toLowerCase().trim();
    if (effectiveQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(effectiveQuery) ||
          p.shortDescription.toLowerCase().includes(effectiveQuery) ||
          p.longDescription.toLowerCase().includes(effectiveQuery) ||
          p.category.toLowerCase().includes(effectiveQuery) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(effectiveQuery))
      );
    }

    // Price slider filter
    result = result.filter((p) => p.price <= maxPrice);

    // Dietary & Tag filters
    if (vegOnly) {
      result = result.filter((p) => p.tags.includes("veg"));
    }
    if (spicyOnly) {
      result = result.filter((p) => p.tags.includes("spicy"));
    }
    if (bestsellerOnly) {
      result = result.filter((p) => p.tags.includes("bestseller"));
    }
    if (discountOnly) {
      result = result.filter((p) => p.oldPrice && p.oldPrice > p.price);
    }

    // Sorting
    switch (selectedSort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          const aBest = a.tags.includes("bestseller") ? 1 : 0;
          const bBest = b.tags.includes("bestseller") ? 1 : 0;
          if (aBest !== bBest) return bBest - aBest;
          return b.rating - a.rating;
        });
        break;
    }

    return result;
  }, [
    selectedCategory,
    searchInput,
    urlQuery,
    maxPrice,
    vegOnly,
    spicyOnly,
    bestsellerOnly,
    discountOnly,
    selectedSort,
  ]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (urlQuery || searchInput ? 1 : 0) +
    (selectedSort !== "featured" ? 1 : 0) +
    (vegOnly ? 1 : 0) +
    (spicyOnly ? 1 : 0) +
    (bestsellerOnly ? 1 : 0) +
    (discountOnly ? 1 : 0) +
    (maxPrice < 1800 ? 1 : 0);

  const clearAllFilters = () => {
    setSearchInput("");
    updateUrlParams({
      category: null,
      q: null,
      sort: null,
      veg: null,
      spicy: null,
      bestseller: null,
      discount: null,
      maxPrice: null,
    });
  };

  const bestsellerList = useMemo(() => getBestsellers(8), []);

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Sticky Filter & Search Toolbar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-cream/95 backdrop-blur-md border-b border-tan/80 py-3 shadow-xs">
        <Container>
          <div className="flex flex-col gap-3">
            {/* Top row: Search input + Sort dropdown + Filter Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-espresso/50" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search biryani, burgers, coffee, stationery..."
                  aria-label="Search campus store products"
                  className="w-full rounded-xl bg-tan/50 border border-tan py-2 pl-10 pr-9 text-xs sm:text-sm text-espresso placeholder:text-espresso/45 focus:border-warm-orange focus:bg-cream focus:outline-none focus:ring-2 focus:ring-warm-orange/20 transition-all"
                />
                {searchInput && (
                  <button
                    onClick={() => {
                      setSearchInput("");
                      updateUrlParams({ q: null });
                    }}
                    aria-label="Clear search input"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso p-0.5 rounded-md transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Controls on Right */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5">
                {/* Sort Dropdown */}
                <div className="relative flex items-center">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-espresso/60 pointer-events-none" />
                  <select
                    value={selectedSort}
                    onChange={(e) => updateUrlParams({ sort: e.target.value })}
                    aria-label="Sort products by"
                    className="appearance-none rounded-xl bg-tan/50 border border-tan py-2 pl-9 pr-8 text-xs sm:text-sm font-semibold text-espresso hover:bg-tan/80 focus:border-warm-orange focus:outline-none focus:ring-2 focus:ring-warm-orange/20 transition-all cursor-pointer"
                  >
                    <option value="featured">Featured / Top Picks</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </div>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  aria-label="Toggle advanced filters"
                  className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-bold transition-all shadow-xs ${
                    isFilterOpen || activeFiltersCount > 0
                      ? "bg-warm-orange text-cream border-warm-orange"
                      : "bg-tan/50 text-espresso border-tan hover:bg-tan"
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cream text-[10px] font-black text-warm-orange">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Category Sliding Tabs with layoutId pill */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {CATEGORY_TABS.map((tab) => {
                const isSelected = selectedCategory === tab.slug;
                const Icon = tab.icon;
                const count = categoryCounts[tab.slug] || 0;

                return (
                  <button
                    key={tab.slug}
                    onClick={() => updateUrlParams({ category: tab.slug })}
                    className={`relative flex items-center gap-1.5 shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      isSelected ? "text-cream" : "text-espresso/75 hover:text-espresso hover:bg-tan/40"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="category-active-pill"
                        className="absolute inset-0 rounded-full bg-coffee shadow-xs"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                          isSelected ? "bg-warm-orange text-cream" : "bg-tan text-espresso/70"
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content Area */}
      <Container className="mt-6">
        {/* Collapsible Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden mb-8"
            >
              <div className="rounded-2xl border border-tan bg-tan/40 p-5 shadow-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range Slider */}
                  <div className="flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs font-bold text-coffee mb-2">
                      <span>Max Price</span>
                      <span className="text-warm-orange font-extrabold text-sm">
                        PKR {maxPrice}
                      </span>
                    </div>
                    <input
                      id="filter-price-slider"
                      type="range"
                      min={100}
                      max={1800}
                      step={20}
                      value={maxPrice}
                      onChange={(e) => updateUrlParams({ maxPrice: e.target.value })}
                      className="w-full accent-warm-orange cursor-pointer"
                      aria-label="Price range filter"
                    />
                    <div className="flex justify-between text-[10px] text-espresso/50 mt-1 font-medium">
                      <span>PKR 100</span>
                      <span>PKR 1,800</span>
                    </div>
                  </div>

                  {/* Dietary & Style Toggles */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-coffee">Dietary &amp; Style</span>
                    <label htmlFor="filter-veg" className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-espresso">
                      <input
                        id="filter-veg"
                        type="checkbox"
                        checked={vegOnly}
                        onChange={(e) => updateUrlParams({ veg: e.target.checked ? "1" : null })}
                        className="rounded accent-green w-4 h-4 cursor-pointer"
                      />
                      <span>Vegetarian Only</span>
                    </label>
                    <label htmlFor="filter-spicy" className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-espresso">
                      <input
                        id="filter-spicy"
                        type="checkbox"
                        checked={spicyOnly}
                        onChange={(e) => updateUrlParams({ spicy: e.target.checked ? "1" : null })}
                        className="rounded accent-orange-600 w-4 h-4 cursor-pointer"
                      />
                      <span>Spicy Favorites Only</span>
                    </label>
                  </div>

                  {/* Highlights Toggles */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-coffee">Store Highlights</span>
                    <label htmlFor="filter-bestseller" className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-espresso">
                      <input
                        id="filter-bestseller"
                        type="checkbox"
                        checked={bestsellerOnly}
                        onChange={(e) => updateUrlParams({ bestseller: e.target.checked ? "1" : null })}
                        className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                      />
                      <span>Bestsellers Only</span>
                    </label>
                    <label htmlFor="filter-discount" className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-espresso">
                      <input
                        id="filter-discount"
                        type="checkbox"
                        checked={discountOnly}
                        onChange={(e) => updateUrlParams({ discount: e.target.checked ? "1" : null })}
                        className="rounded accent-red-600 w-4 h-4 cursor-pointer"
                      />
                      <span>Discounted Deals (% Off)</span>
                    </label>
                  </div>

                  {/* Clear Actions */}
                  <div className="flex flex-col justify-end items-start md:items-end">
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-1.5 rounded-xl border border-coffee/30 bg-cream px-4 py-2 text-xs font-bold text-coffee hover:bg-tan active:scale-95 transition-all shadow-xs"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset All Filters</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-espresso/70 mb-6 px-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-coffee">
              Showing {filteredProducts.length} of {allProducts.length} items
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-[11px] font-medium text-warm-orange bg-warm-orange/10 px-2 py-0.5 rounded-full">
                ({activeFiltersCount} active {activeFiltersCount === 1 ? "filter" : "filters"})
              </span>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-coffee hover:text-warm-orange transition-colors flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} isLoading={shimmerLoading || isPending} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-tan/80 bg-tan/30 py-16 px-6 text-center shadow-xs"
          >
            <motion.div
              animate={{ y: [-4, 6, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-tan text-coffee mb-4 shadow-inner"
            >
              <SearchX className="h-10 w-10 text-coffee/80" />
            </motion.div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso">
              No items match your filters
            </h3>
            <p className="mt-2 max-w-md text-xs sm:text-sm text-espresso/70 leading-relaxed font-sans">
              We couldn&apos;t find any cafe or stationery items matching &ldquo;{searchInput || "current filters"}&rdquo;. Try adjusting your keywords, price range, or dietary toggles.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-6 flex items-center gap-2 rounded-xl bg-warm-orange px-5 py-2.5 text-xs sm:text-sm font-bold text-cream shadow-md hover:bg-warm-orange/90 active:scale-95 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset all filters</span>
            </button>
          </motion.div>
        )}

        {/* Chef's Signature Specials & Stories (Interactive Expandable Cards) */}
        <section className="mt-14 pt-10 border-t border-tan/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/15 text-orange text-xs font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-orange" /> Kitchen Stories
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-coffee tracking-tight">
                Chef&apos;s Handcrafted Specials
              </h2>
              <p className="text-xs sm:text-sm text-espresso/70 mt-1 max-w-xl font-sans">
                Click any dish to expand its kitchen story, secret ingredients, and instant tray ordering.
              </p>
            </div>
            <span className="text-xs font-semibold text-coffee/70 bg-tan/40 px-3 py-1 rounded-xl border border-tan/60 self-start sm:self-auto">
              Interactive Expansion Cards
            </span>
          </div>
          <ExpandableCardDemo />
        </section>

        {/* Popular Right Now Carousel */}
        <PopularRow products={bestsellerList} />
      </Container>

      {/* Back to top floating button */}
      <BackToTop />
    </div>
  );
}
