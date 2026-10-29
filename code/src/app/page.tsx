import React from "react";
import { HeroPortal } from "@/components/home/HeroPortal";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Scroll-driven Hero Glyph Portal */}
      <HeroPortal />

      {/* Empty placeholder section for subsequent steps */}
      <section className="py-24 bg-cream border-t border-tan text-center">
        <div className="max-w-md mx-auto px-4">
          <p className="text-sm font-medium text-espresso/60 tracking-wider">
            More sections coming in the next steps
          </p>
        </div>
      </section>
    </div>
  );
}
