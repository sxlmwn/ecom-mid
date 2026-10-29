"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ShoppingBag, Check, RotateCw } from "lucide-react";
import FlipCardRaw from "@/components/FlipCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";

const FlipCard = FlipCardRaw as unknown as React.ComponentType<{
  front: React.ReactNode;
  back: React.ReactNode;
  width?: number | string;
  height?: number | string;
  radius?: number;
  background?: string;
  color?: string;
  shadow?: boolean;
  shadowColor?: string;
  className?: string;
}>;

const COMBOS = [
  {
    id: "combo-1",
    title: "Exam All-Nighter Fuel",
    slug: "zinger-burger",
    price: 680,
    oldPrice: 800,
    badge: "Save PKR 120",
    frontImage: "/images/final-web/17-zinger-burger.webp",
    subtitle: "Double Zinger Burger, Masala Fries & Steaming Karak Chai",
    items: [
      "1x Crispy Zinger Burger (Prime Fillet)",
      "1x Seasoned Crispy French Fries",
      "1x Copper Kettle Doodh Patti Chai",
      "Free Chai Refill during exam week",
    ],
  },
  {
    id: "combo-2",
    title: "Morning Lecture Kickstart",
    slug: "aloo-paratha-with-chai",
    price: 350,
    oldPrice: 420,
    badge: "8:00 AM Fresh",
    frontImage: "/images/final-web/07-cafe-wooden-table.webp",
    subtitle: "Crispy Aloo Paratha, Masala Omelette & Steaming Chai",
    items: [
      "1x Flaky Stuffed Aloo Paratha",
      "1x Fresh Masala Omelette",
      "1x Hot Cardamom Doodh Patti Chai",
      "Ready in 7 minutes for class",
    ],
  },
  {
    id: "combo-3",
    title: "Midterm Exam Survival Kit",
    slug: "cappuccino",
    price: 490,
    oldPrice: 580,
    badge: "Exam Kit",
    frontImage: "/images/final-web/00-your-cappuccino-4k.webp",
    subtitle: "Hot Cappuccino, A4 Lecture Register & Gel Pen Set",
    items: [
      "1x Freshly Brewed Rich Cappuccino",
      "1x A4 200-Page Lecture Register",
      "1x 5-Pack Smooth Gel Pens (Blue/Black)",
      "Pickup instantly at Counter #1",
    ],
  },
];

export function CampusCombosSection() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddCombo = (combo: (typeof COMBOS)[number]) => {
    const product = getProductBySlug(combo.slug);
    if (product) {
      addToCart(product, 1);
      setAddedId(combo.id);
      setTimeout(() => setAddedId(null), 1800);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-cream border-t border-tan/60">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/15 text-orange text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange" /> Interactive Student Combos
            </span>
            <SectionHeading
              title="Campus Secret Perk Deals"
              subtitle="Tap or drag each 3D card to flip and reveal exclusive student combo savings."
              align="left"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-espresso/60 bg-tan/40 px-3 py-1.5 rounded-xl border border-tan/60 self-start md:self-auto">
            <RotateCw className="w-3.5 h-3.5 text-orange animate-spin" style={{ animationDuration: "8s" }} />
            <span>Interactive 3D Cards • Flip to inspect</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {COMBOS.map((combo) => (
            <div key={combo.id} className="w-full flex justify-center">
              <FlipCard
                width={320}
                height={420}
                radius={24}
                background="#FFFFFF"
                color="#2B1B12"
                shadow={true}
                shadowColor="rgba(75, 46, 32, 0.15)"
                front={
                  <div className="relative w-full h-full flex flex-col justify-between p-5 rounded-3xl overflow-hidden border border-tan bg-white">
                    {/* Image Area */}
                    <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-tan/50 shadow-inner">
                      <Image
                        src={combo.frontImage}
                        alt={combo.title}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider bg-orange text-cream px-2.5 py-1 rounded-md shadow-xs">
                        {combo.badge}
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 text-xs font-bold bg-espresso/90 text-cream px-2 py-0.5 rounded-md">
                        PKR {combo.price}
                      </span>
                    </div>

                    {/* Front Details */}
                    <div className="space-y-1.5 pt-2">
                      <h3 className="font-serif text-lg font-bold text-coffee leading-snug">
                        {combo.title}
                      </h3>
                      <p className="text-xs text-espresso/70 font-sans line-clamp-2 leading-relaxed">
                        {combo.subtitle}
                      </p>
                    </div>

                    {/* Bottom Flip Hint */}
                    <div className="pt-2 border-t border-tan flex items-center justify-between text-xs text-orange font-semibold">
                      <span className="flex items-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" /> Tap card to flip
                      </span>
                      <span className="line-through text-espresso/40">PKR {combo.oldPrice}</span>
                    </div>
                  </div>
                }
                back={
                  <div className="relative w-full h-full flex flex-col justify-between p-6 rounded-3xl border border-coffee/20 bg-espresso text-cream shadow-xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-cream/20 pb-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-orange">
                          Combo Breakdown
                        </span>
                        <span className="text-xs font-semibold text-cream/70 flex items-center gap-1">
                          <RotateCw className="w-3 h-3" /> Flip back
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-cream">
                        {combo.title}
                      </h3>

                      <ul className="space-y-2 text-xs text-cream/85 font-sans pt-1">
                        {combo.items.map((it, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 shrink-0" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-cream/20 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-cream/70">Combo Special:</span>
                        <div className="text-right">
                          <span className="text-lg font-serif font-bold text-orange">
                            PKR {combo.price}
                          </span>
                          <span className="text-xs line-through text-cream/40 block">
                            PKR {combo.oldPrice}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddCombo(combo);
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          addedId === combo.id
                            ? "bg-green text-cream"
                            : "bg-orange hover:bg-orange-hover text-cream active:scale-95 shadow-md"
                        }`}
                      >
                        {addedId === combo.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Tray!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add Combo to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
