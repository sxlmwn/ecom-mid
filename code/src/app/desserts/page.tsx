import React from "react";
import CategoryPageTemplate from "@/components/categories/CategoryPageTemplate";

export const metadata = {
  title: "Desserts & Bakery | CUI Cafe",
  description:
    "Freshly baked chocolate fudge cakes, sizzling walnut brownies, glazed donuts, and sundae ice creams at COMSATS University Islamabad.",
};

export default function DessertsPage() {
  return (
    <CategoryPageTemplate
      categorySlug="desserts"
      title="Desserts & Bakery"
      tagline="Indulgent sweet treats, artisan fudge cakes, warm brownies, and chilled desserts to celebrate after semester exams."
      bannerImage="/images/set2/34-chocolate-cake-2.webp"
    />
  );
}