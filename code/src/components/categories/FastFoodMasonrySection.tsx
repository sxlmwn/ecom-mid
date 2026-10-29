"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Flame } from "lucide-react";

interface MasonryItem {
  id: string | number;
  img: string;
  title?: string;
  description?: string;
  url?: string;
  width?: number;
  height?: number;
}

interface MasonryProps {
  items: MasonryItem[];
  columns?: number | "auto";
  columnWidth?: number;
  gap?: number;
  radius?: number;
  animateFrom?: string;
  scaleOnHover?: boolean;
  hoverEffect?: "zoom" | "lift" | "tilt" | "none";
  captionMode?: "hover" | "always" | "none";
  lightbox?: boolean;
  className?: string;
}

const Masonry = dynamic<MasonryProps>(
  () =>
    import("@/components/Masonry").then(
      (mod) => mod.default as unknown as React.ComponentType<MasonryProps>
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[380px] flex items-center justify-center bg-tan/20 rounded-2xl animate-pulse">
        <span className="text-xs text-coffee/60 font-sans">Loading Kitchen Visual Feast...</span>
      </div>
    ),
  }
);

const FAST_FOOD_MASONRY_ITEMS = [
  {
    id: "ff-1",
    img: "/images/final-web/17-zinger-burger.webp",
    title: "Double Zinger Burger",
    description: "Crispy prime chicken fillet, secret spicy sauce & brioche bun (PKR 420)",
    url: "/product/zinger-burger",
    width: 600,
    height: 400,
  },
  {
    id: "ff-2",
    img: "/images/final-web/11-pizza.webp",
    title: "Stone Oven Chicken Fajita Pizza",
    description: "Hand-tossed dough with bubbling 100% mozzarella (PKR 280 slice)",
    url: "/product/fajita-pizza-slice",
    width: 600,
    height: 600,
  },
  {
    id: "ff-3",
    img: "/images/final-web/30-chicken-wings.webp",
    title: "Glazed Hot Wings (6 pcs)",
    description: "Crispy skin coated in tangy Buffalo spice sauce (PKR 450)",
    url: "/product/crispy-wings-6pcs",
    width: 600,
    height: 450,
  },
  {
    id: "ff-4",
    img: "/images/products-4k/loaded-fries.webp",
    title: "Chipotle Loaded Fries",
    description: "Crisp golden fries drenched in cheese and diced jalapeños (PKR 320)",
    url: "/product/loaded-fries",
    width: 600,
    height: 420,
  },
  {
    id: "ff-5",
    img: "/images/final-web/16-burger.webp",
    title: "Beef Smash Double Burger",
    description: "Caramelized crust beef patties with melted cheddar cheese (PKR 520)",
    url: "/product/beef-smash-burger",
    width: 600,
    height: 500,
  },
  {
    id: "ff-6",
    img: "/images/final-web/13-pizza-2.webp",
    title: "Pepperoni & Cheese Feast",
    description: "Freshly sliced beef pepperoni on rich tomato marinara",
    url: "/product/fajita-pizza-slice",
    width: 600,
    height: 400,
  },
  {
    id: "ff-7",
    img: "/images/products-4k/chicken-nuggets-8pcs.webp",
    title: "Crispy Golden Nuggets",
    description: "8-piece tender breast nuggets served with garlic dip (PKR 350)",
    url: "/product/chicken-nuggets-8pcs",
    width: 600,
    height: 420,
  },
  {
    id: "ff-8",
    img: "/images/final-web/31-chicken-wings-2.webp",
    title: "Smoky BBQ Wings",
    description: "Slow-roasted wings tossed in sweet hickory glaze (PKR 450)",
    url: "/product/crispy-wings-6pcs",
    width: 600,
    height: 450,
  },
];

export function FastFoodMasonrySection() {
  return (
    <section className="py-14 bg-cream border-b border-tan/60 relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/15 text-orange text-xs font-semibold tracking-wider uppercase mb-2">
              <Flame className="w-3.5 h-3.5 text-orange" /> Visual Kitchen Gallery
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-coffee tracking-tight">
              Crispy Campus Visual Feast
            </h2>
            <p className="text-xs sm:text-sm text-espresso/70 mt-1 max-w-xl font-sans">
              Click any photo to open the interactive full-screen gallery lightbox with high-res details and ordering info.
            </p>
          </div>
          <span className="text-xs font-semibold text-coffee/70 bg-tan/40 px-3.5 py-1.5 rounded-xl border border-tan/60 self-start md:self-auto">
            Interactive Masonry • Lightbox Enabled
          </span>
        </div>

        <div className="w-full rounded-3xl overflow-hidden border border-tan/80 bg-white p-4 shadow-sm min-h-[500px]">
          <Masonry
            items={FAST_FOOD_MASONRY_ITEMS}
            columns={4}
            columnWidth={260}
            gap={14}
            radius={18}
            hoverEffect="lift"
            captionMode="always"
            lightbox={true}
            animateFrom="bottom"
          />
        </div>
      </Container>
    </section>
  );
}
