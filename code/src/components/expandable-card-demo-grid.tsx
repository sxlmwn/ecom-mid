"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";
import { Plus, Check, ShoppingBag, X } from "lucide-react";

export const CAFE_SPECIAL_CARDS = [
  {
    title: "Dum Biryani Special Pot",
    description: "Chef Rashid's Slow-Cooked Basmati Rice",
    src: "/images/products-4k/chicken-biryani.webp",
    slug: "chicken-biryani",
    price: 380,
    ctaText: "Add to Tray • PKR 380",
    prepTime: "Ready in 5-8 min",
    content: () => (
      <p>
        Prepared fresh every morning in authentic copper deghs using extra-long grain basmati rice, tender chicken pieces marinated in yogurt and saffron, green cardamoms, and whole roasted spices. Served steaming hot with house raita and spicy fresh coriander chutney.
      </p>
    ),
  },
  {
    title: "Crispy Double Zinger Burger",
    description: "Hand-Breaded Golden Chicken Fillet",
    src: "/images/final-web/17-zinger-burger.webp",
    slug: "zinger-burger",
    price: 420,
    ctaText: "Add to Tray • PKR 420",
    prepTime: "Ready in 8-10 min",
    content: () => (
      <p>
        Our most popular campus meal between lectures. Whole prime chicken breast double-dredged in secret herbs, fried to an audible crunch, topped with iceberg lettuce and signature spicy mayo on a toasted brioche bun.
      </p>
    ),
  },
  {
    title: "Copper Kettle Doodh Patti",
    description: "Authentic Slow-Simmered Karak Chai",
    src: "/images/final-web/21-chai.webp",
    slug: "doodh-patti-chai",
    price: 100,
    ctaText: "Add to Tray • PKR 100",
    prepTime: "Ready in 3-5 min",
    content: () => (
      <p>
        The lifeblood of COMSATS student life. Fresh dairy milk simmered continuously with rich Kenya tea dust and green cardamom pods in our heavy copper kettle. Unmatched richness to kickstart morning classes.
      </p>
    ),
  },
  {
    title: "Fajita Pizza Loaded Slice",
    description: "Stone-Baked Mozzarella & Chicken",
    src: "/images/final-web/12-pizza-slice.webp",
    slug: "fajita-pizza-slice",
    price: 280,
    ctaText: "Add to Tray • PKR 280",
    prepTime: "Ready in 3-5 min",
    content: () => (
      <p>
        Thick-crust pizza baked fresh every 30 minutes in our stone oven. Generously loaded with seasoned chicken fajita strips, bell peppers, sweet red onions, and 100% pure melted mozzarella cheese.
      </p>
    ),
  },
];

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof CAFE_SPECIAL_CARDS)[number] | null>(null);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const { addToCart } = useCart();
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleOrder = (card: (typeof CAFE_SPECIAL_CARDS)[number]) => {
    const fullProduct = getProductBySlug(card.slug);
    if (fullProduct) {
      addToCart(fullProduct, 1);
      setAddedSlug(card.slug);
      setTimeout(() => setAddedSlug(null), 1500);
    }
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2B1B12]/60 backdrop-blur-xs h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-50 p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-fit max-h-[90vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border border-tan"
            >
              <div className="relative w-full h-64 sm:h-72">
                <Image
                  src={active.src}
                  alt={active.title}
                  fill
                  sizes="500px"
                  className="object-cover object-center"
                />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-espresso/80 text-cream hover:bg-espresso flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="absolute bottom-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-orange text-cream px-2.5 py-1 rounded-lg shadow-xs">
                  {active.prepTime}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-serif text-xl sm:text-2xl font-bold text-coffee"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-xs sm:text-sm text-espresso/70 font-sans"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <span className="font-serif text-xl font-bold text-orange shrink-0">
                    PKR {active.price}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-espresso/80 leading-relaxed font-sans border-t border-tan pt-3">
                  {active.content()}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleOrder(active)}
                    className={`flex-1 py-3 px-5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      addedSlug === active.slug
                        ? "bg-green text-cream"
                        : "bg-orange hover:bg-orange-hover text-cream active:scale-95"
                    }`}
                  >
                    {addedSlug === active.slug ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Tray!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{active.ctaText}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="py-3 px-4 rounded-2xl border border-tan text-coffee hover:bg-tan text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CAFE_SPECIAL_CARDS.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(card);
              }
            }}
            aria-haspopup="dialog"
            aria-expanded={active?.slug === card.slug}
            aria-label={`${card.title} - View story and order for PKR ${card.price}`}
            className="group relative flex flex-col justify-between rounded-2xl bg-white border border-tan/80 p-4 shadow-xs hover:shadow-xl hover:border-orange/60 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange/50"
          >
            <div className="space-y-3">
              <motion.div
                layoutId={`image-${card.title}-${id}`}
                className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-tan/50"
              >
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-[#2B1B12]/80 text-cream px-2 py-0.5 rounded-md">
                  Chef&apos;s Special
                </span>
              </motion.div>

              <div className="space-y-1">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-serif text-lg font-bold text-coffee group-hover:text-orange transition-colors"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-xs text-espresso/70 line-clamp-1 font-sans"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-tan/60 flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-coffee">
                PKR {card.price}
              </span>
              <span className="text-xs font-semibold text-orange group-hover:underline flex items-center gap-1">
                View Story <Plus className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
