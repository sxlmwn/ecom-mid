import React from "react";
import Link from "next/link";
import { Coffee, UtensilsCrossed, Sparkles, BookOpen, Clock, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  const categories = [
    {
      title: "Breakfast Specials",
      subtitle: "Fresh parathas, eggs, teas & bakery treats",
      href: "/breakfast",
      icon: Coffee,
      timing: "8:00 AM - 11:30 AM",
      color: "bg-orange/10 text-orange",
    },
    {
      title: "Campus Lunch",
      subtitle: "Hearty biryani, daily curries & meal boxes",
      href: "/lunch",
      icon: UtensilsCrossed,
      timing: "12:00 PM - 4:00 PM",
      color: "bg-green/10 text-green",
    },
    {
      title: "Fast Food & Snacks",
      subtitle: "Burgers, crispy rolls, fries & cold drinks",
      href: "/fast-food",
      icon: Sparkles,
      timing: "All Day Serving",
      color: "bg-coffee/10 text-coffee",
    },
    {
      title: "Stationery & Supplies",
      subtitle: "Notebooks, pens, lab manuals & study tools",
      href: "/stationery",
      icon: BookOpen,
      timing: "8:00 AM - 6:00 PM",
      color: "bg-tan text-espresso",
    },
  ];

  return (
    <div className="py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <Container>
        <div className="bg-gradient-to-br from-coffee via-coffee to-coffee-dark rounded-3xl p-6 sm:p-10 lg:p-14 text-cream shadow-md relative overflow-hidden">
          {/* Subtle decorative background circle */}
          <div className="absolute -right-16 -top-16 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-orange/10 pointer-events-none blur-2xl" />
          
          <div className="max-w-2xl relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/10 border border-cream/15 text-xs text-cream/90 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span>COMSATS University Islamabad • Student Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-cream tracking-tight leading-[1.15]">
              Welcome to <span className="text-orange">CUI Cafe</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-cream/85 font-sans leading-relaxed">
              Your favorite campus destination for steaming coffee, delicious warm meals, quick between-class bites, and academic stationery supplies.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href="/shop" variant="primary" size="lg">
                Explore Full Menu
              </Button>
              <Button
                href="/breakfast"
                variant="outline"
                size="lg"
                className="border-cream/30 text-cream hover:bg-cream hover:text-coffee"
              >
                Today&apos;s Specials
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Campus Categories Section */}
      <Container>
        <SectionHeading
          tag="Campus Sections"
          title="Explore Our Campus Offerings"
          subtitle="From early morning breakfast to urgent assignment stationery, we have got you covered all semester long."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.title} href={cat.href} className="group focus:outline-none">
                <Card className="h-full flex flex-col justify-between group-hover:border-orange transition-all duration-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-espresso/60 bg-tan/50 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-orange" />
                        {cat.timing}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-coffee group-hover:text-orange transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-espresso/70 mt-1 leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-tan/60 flex items-center text-xs font-semibold text-orange group-hover:translate-x-1 transition-transform">
                    <span>View items</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
