import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, SearchX, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { products, getProductBySlug, getRelatedProducts, getBestsellers } from "@/data/products";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import ProductCard from "@/components/products/ProductCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({
    id: p.slug,
  }));
}

async function ProductDetailLoader({ params }: ProductPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id).trim();

  // Support lookup by slug or id
  const product =
    getProductBySlug(decodedId) ||
    products.find(
      (p) =>
        p.id.toLowerCase() === decodedId.toLowerCase() ||
        p.slug.toLowerCase() === decodedId.toLowerCase()
    );

  // Friendly 404 Not Found Page
  if (!product) {
    const popularPicks = getBestsellers().slice(0, 4);

    return (
      <div className="py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-tan flex items-center justify-center text-orange shadow-inner">
              <SearchX className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-orange">
                Item Unavailable
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-coffee">
                Product Not Found
              </h1>
              <p className="text-sm sm:text-base text-espresso/70 font-sans max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find an item matching &ldquo;{decodedId}&rdquo;. It may have been rotated out of the semester menu or renamed.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange hover:bg-orange-hover text-cream text-sm font-semibold shadow-md transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Full Menu</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-tan bg-white hover:bg-tan text-coffee text-sm font-semibold transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>

          {/* Popular Alternative Suggestions */}
          <div className="mt-20 border-t border-tan/80 pt-12">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="font-serif text-2xl font-bold text-coffee">
                Popular Campus Favorites
              </h2>
              <p className="text-xs sm:text-sm text-espresso/70 mt-1">
                Here are some popular options available right now at Counter #1
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularPicks.map((pick) => (
                <ProductCard key={pick.id} product={pick} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-coffee/60 animate-pulse font-sans text-sm">
          Loading campus product details...
        </div>
      }
    >
      <ProductDetailLoader params={params} />
    </Suspense>
  );
}
