import React from "react";
import CategoryPageTemplate from "@/components/categories/CategoryPageTemplate";

export const metadata = {
  title: "Beverages & Coffee | CUI Cafe",
  description:
    "Hot doodh patti chai, cappuccino, espresso, cold coffee, iced lattes, and fresh mint margaritas at COMSATS University Islamabad.",
};

export default function BeveragesPage() {
  return (
    <CategoryPageTemplate
      categorySlug="beverages"
      title="Hot & Chilled Beverages"
      tagline="Aromatic karak doodh patti chai, rich espresso coffees, iced lattes, and invigorating mint coolers crafted daily."
      bannerImage="/images/final-web/25-coffee-2.webp"
    />
  );
}
