"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CheckCircle, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function GlobalCartToast() {
  const { lastAddedItem, dismissToast } = useCart();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {lastAddedItem && (
          <motion.div
            key={lastAddedItem.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl bg-espresso text-cream p-4 shadow-2xl border border-warm-orange/40 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warm-orange text-cream shadow-xs">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-green" />
                  <span className="text-xs font-bold text-cream">Added to Cart</span>
                </div>
                <span className="text-xs text-cream/90 font-medium line-clamp-1">
                  {lastAddedItem.quantity}x {lastAddedItem.product.name}
                </span>
                <span className="text-[11px] text-warm-orange font-semibold">
                  PKR {lastAddedItem.product.price * lastAddedItem.quantity}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Link
                href="/cart"
                onClick={dismissToast}
                className="flex items-center gap-1 rounded-lg bg-warm-orange/20 hover:bg-warm-orange text-warm-orange hover:text-cream px-2.5 py-1 text-xs font-bold transition-all"
              >
                <span>View</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <button
                onClick={dismissToast}
                aria-label="Dismiss notification"
                className="text-cream/50 hover:text-cream p-1 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
