import React from "react";
import CategoryPageTemplate from "@/components/categories/CategoryPageTemplate";

export const metadata = {
  title: "Campus Stationery | CUI Cafe",
  description:
    "Semester registers, engineering graph pads, ballpoint packs, scientific calculators, lab manuals, and exam supplies at Counter #1.",
};

export default function StationeryPage() {
  return (
    <CategoryPageTemplate
      categorySlug="stationery"
      title="Semester Stationery Supplies"
      tagline="Lecture registers, ballpoints, lab record notebooks, scientific calculators, and exam kits available directly at Counter #1."
      bannerImage="/images/final-web/04-cafe-rustic.webp"
    />
  );
}
