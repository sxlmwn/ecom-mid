import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ShopPage() {
  const sections = [
    { name: "Breakfast Specials", href: "/breakfast", desc: "Fresh teas, parathas & quick morning bites" },
    { name: "Campus Lunch", href: "/lunch", desc: "Wholesome biryani, curries & combo meals" },
    { name: "Fast Food", href: "/fast-food", desc: "Burgers, loaded fries & wraps" },
    { name: "Stationery & Books", href: "/stationery", desc: "Pens, notebooks & campus study essentials" },
  ];

  return (
    <div className="py-10 sm:py-16 space-y-10">
      <Container>
        <SectionHeading
          as="h1"
          tag="Store Catalog"
          title="Campus Shop & Cafe Menu"
          subtitle="Explore the complete collection of student favorites, warm meals, refreshing beverages, and essential campus study materials."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link key={section.name} href={section.href} className="group">
              <Card className="h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-tan text-coffee flex items-center justify-center mb-4 group-hover:bg-orange group-hover:text-white transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-coffee group-hover:text-orange transition-colors">
                    {section.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso/70 mt-1.5">
                    {section.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-tan/60 flex items-center justify-between text-xs font-semibold text-orange">
                  <span>Browse Category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
