import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Tag, ShieldCheck, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function ProductDetailContent({ params }: ProductPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  return (
    <div className="space-y-8">
      <SectionHeading
        as="h1"
        tag="Product Overview"
        title={`Item: ${decodedId}`}
        subtitle="Detailed specifications, pricing, nutritional details, and campus ordering information for this selection."
        align="left"
      />

      <div className="mt-8">
        <Card className="max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-full sm:w-48 h-48 rounded-xl bg-tan/50 flex flex-col items-center justify-center text-espresso/40 border border-dashed border-coffee/20 p-4 text-center">
              <Tag className="w-10 h-10 text-orange/60 mb-2" />
              <span className="text-xs font-medium text-espresso/60">Product Image Preview</span>
              <span className="text-[10px] text-espresso/40 mt-1">Item #{decodedId}</span>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green/10 text-green mb-2">
                  Available in Campus Cafe
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-coffee">
                  {decodedId.replace(/-/g, " ").toUpperCase()}
                </h3>
                <p className="text-xs sm:text-sm text-espresso/70 mt-1">
                  Standard campus serving prepared with quality ingredients according to COMSATS food safety guidelines.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-espresso/80 pt-2 border-t border-tan/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-orange" />
                  <span>Prep Time: 5-10 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-green" />
                  <span>Halal & Fresh Daily</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <Button href="/cart" variant="primary" size="sm">
                  Add to Cart
                </Button>
                <Button href="/shop" variant="outline" size="sm">
                  Browse More Items
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProductLoading() {
  return (
    <div className="py-12 text-center text-coffee/60 animate-pulse">
      Loading campus product details...
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <div className="py-10 sm:py-16 space-y-8">
      <Container>
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-coffee hover:text-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop Menu</span>
          </Link>
        </div>

        <Suspense fallback={<ProductLoading />}>
          <ProductDetailContent params={params} />
        </Suspense>
      </Container>
    </div>
  );
}
