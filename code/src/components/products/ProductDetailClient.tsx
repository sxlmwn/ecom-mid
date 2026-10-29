"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Clock,
  Flame,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/ui/ProductImage";
import ProductCard from "@/components/products/ProductCard";
import { Container } from "@/components/ui/Container";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [isAdded, setIsAdded] = useState(false);

  // Gallery images list (deduplicated)
  const galleryImages = Array.from(
    new Set([product.image, ...(product.gallery || [])].filter(Boolean))
  );

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) return product.stock;
      return next;
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isStationery = product.category === "stationery";

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-espresso/60 mb-8 overflow-x-auto whitespace-nowrap py-1"
        >
          <Link href="/" className="hover:text-orange transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-espresso/40" />
          <Link href="/shop" className="hover:text-orange transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-espresso/40" />
          <Link
            href={`/${product.category}`}
            className="capitalize hover:text-orange transition-colors"
          >
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 text-espresso/40" />
          <span className="font-semibold text-coffee truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image with Zoom on hover */}
            <div className="group relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-tan/40 border border-tan shadow-md">
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              ) : (
                <ProductImage
                  src=""
                  alt={product.name}
                  category={product.category}
                  aspectRatio="4/3"
                  className="w-full h-full"
                />
              )}

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                {product.tags.includes("bestseller") && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange text-cream shadow-sm">
                    <Sparkles className="w-3 h-3" /> Campus Bestseller
                  </span>
                )}
                {product.tags.includes("veg") && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green text-cream shadow-sm">
                    Vegetarian
                  </span>
                )}
                {product.tags.includes("spicy") && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#D35400] text-cream shadow-sm">
                    Spicy
                  </span>
                )}
              </div>

              {discountPercent && (
                <div className="absolute top-4 right-4 bg-espresso text-cream px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Gallery (if multiple) */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImage === img
                        ? "border-orange ring-2 ring-orange/30 scale-95"
                        : "border-tan/80 hover:border-orange/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-tan text-coffee">
                  {product.category.replace("-", " ")}
                </span>
                <div className="flex items-center gap-1 text-sm font-semibold text-espresso">
                  <Star className="w-4 h-4 fill-orange text-orange" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-espresso/50">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-coffee tracking-tight">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-espresso/80 font-sans leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-4 p-4 rounded-2xl bg-tan/40 border border-tan/80">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-coffee">
                PKR {product.price}
              </div>
              {product.oldPrice && product.oldPrice > product.price && (
                <div className="text-lg text-espresso/50 line-through">
                  PKR {product.oldPrice}
                </div>
              )}
              <span className="text-xs font-semibold text-green ml-auto">
                Tax inclusive
              </span>
            </div>

            {/* Quick Meta Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-tan/70">
                <Clock className="w-4 h-4 text-orange shrink-0" />
                <div className="text-xs">
                  <span className="text-espresso/50 block">Prep Time</span>
                  <span className="font-bold text-espresso">{product.prepTime}</span>
                </div>
              </div>

              {product.calories && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-tan/70">
                  <Flame className="w-4 h-4 text-[#D35400] shrink-0" />
                  <div className="text-xs">
                    <span className="text-espresso/50 block">Energy</span>
                    <span className="font-bold text-espresso">{product.calories} kcal</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-tan/70">
                <ShieldCheck className="w-4 h-4 text-green shrink-0" />
                <div className="text-xs">
                  <span className="text-espresso/50 block">Availability</span>
                  <span
                    className={`font-bold ${
                      product.stock > 0 ? "text-green" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Long Description */}
            <div className="space-y-2 border-t border-tan/60 pt-4">
              <h3 className="font-serif text-lg font-bold text-coffee">
                Description
              </h3>
              <p className="text-sm text-espresso/75 leading-relaxed font-sans">
                {product.longDescription}
              </p>
            </div>

            {/* Ingredients or Features List */}
            <div className="space-y-2 border-t border-tan/60 pt-4">
              <h3 className="font-serif text-lg font-bold text-coffee">
                {isStationery ? "Specifications & Features" : "Fresh Ingredients"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-tan/60 text-coffee border border-tan"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase Row */}
            <div className="space-y-3 border-t border-tan/60 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center justify-between sm:justify-center border border-tan rounded-2xl bg-white px-3 py-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-1 rounded-lg hover:bg-tan text-coffee disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-coffee text-base">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className="p-1 rounded-lg hover:bg-tan text-coffee disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-base transition-all duration-200 cursor-pointer ${
                    isAdded
                      ? "bg-green text-cream shadow-md"
                      : "bg-orange hover:bg-orange-hover text-cream shadow-lg hover:shadow-xl active:scale-[0.98]"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 animate-scaleIn" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add {quantity} to Cart • PKR {product.price * quantity}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick links to view cart */}
              <div className="flex items-center justify-between text-xs text-espresso/60 px-1 pt-1">
                <span>Free campus pickup at Counter #1</span>
                <Link
                  href="/cart"
                  className="font-semibold text-orange hover:underline flex items-center gap-1"
                >
                  <span>Go to Checkout</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-tan/80 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-tan text-coffee mb-1">
                  More in {product.category.replace("-", " ")}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-coffee">
                  Related Campus Favorites
                </h2>
              </div>
              <Link
                href={`/${product.category}`}
                className="text-xs sm:text-sm font-semibold text-orange hover:text-orange-hover flex items-center gap-1"
              >
                <span>View category</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
