import React from "react";
import CategoryPageTemplate from "@/components/categories/CategoryPageTemplate";

export const metadata = {
  title: "Lunch Menu | CUI Cafe",
  description:
    "Chicken biryani, karahi plates, daal chawal, creamy pasta, and handi platters served fresh daily for COMSATS students and faculty.",
};

export default function LunchPage() {
  return (
    <CategoryPageTemplate
      categorySlug="lunch"
      title="Campus Lunch Platters"
      tagline="Steaming chicken biryani, authentic karahi plates, daal chawal, and pasta platters prepared fresh for campus lunch breaks."
      bannerImage="/images/final-web/02-cafe-interior.webp"
    />
  );
}
