import React from "react";
import CategoryPageTemplate from "@/components/categories/CategoryPageTemplate";

export const metadata = {
  title: "Breakfast Menu | CUI Cafe",
  description:
    "Morning parathas, halwa puri platters, masala omelettes, pancakes, and hot doodh patti chai at COMSATS University Islamabad.",
};

export default function BreakfastPage() {
  return (
    <CategoryPageTemplate
      categorySlug="breakfast"
      title="Breakfast Menu"
      tagline="Traditional halwa puri platters, crispy stuffed parathas, and morning chai sets to kickstart your university lectures."
      bannerImage="/images/final-web/07-cafe-wooden-table.webp"
    />
  );
}
