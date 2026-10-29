import React from "react";
import CategoryPageTemplate from "@/components/categories/CategoryPageTemplate";

export const metadata = {
  title: "Fast Food Menu | CUI Cafe",
  description:
    "Crispy zinger burgers, smash beef burgers, pizza slices, wings, loaded fries, and shawarmas between lectures at COMSATS.",
};

export default function FastFoodPage() {
  return (
    <CategoryPageTemplate
      categorySlug="fast-food"
      title="Fast Food & Snacks"
      tagline="Crispy zinger burgers, beef smash burgers, hot pizza slices, crispy wings, and loaded fries ready fast between classes."
      bannerImage="/images/final-web/18-burger-2.webp"
    />
  );
}
