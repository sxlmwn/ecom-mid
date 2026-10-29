import React, { Suspense } from "react";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopClient from "@/components/shop/ShopClient";
import { CampusDriftStream } from "@/components/shop/CampusDriftStream";
import { Container } from "@/components/ui/Container";
import { ProductSkeletonGrid } from "@/components/products/ProductGrid";

function ShopLoading() {
  return (
    <div className="min-h-screen bg-cream py-10">
      <Container>
        <div className="h-12 w-full max-w-md rounded-xl bg-tan/50 animate-pulse mb-8" />
        <ProductSkeletonGrid count={8} />
      </Container>
    </div>
  );
}

export const metadata = {
  title: "Shop & Campus Cafe Menu | CUI Cafe",
  description:
    "Order hot meals, snacks, breakfast platters, drinks, and academic stationery at COMSATS University Islamabad.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-cream">
      <ShopHeader />
      <CampusDriftStream />
      <Suspense fallback={<ShopLoading />}>
        <ShopClient />
      </Suspense>
    </main>
  );
}
