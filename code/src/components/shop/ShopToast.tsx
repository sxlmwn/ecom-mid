"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CheckCircle, X } from "lucide-react";
import { subscribeToCartPlaceholder } from "@/lib/cart-placeholder";
import { Product } from "@/data/products";

interface ToastMessage {
  id: number;
  product: Product;
  quantity: number;
}

export default function ShopToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCartPlaceholder((item) => {
      const newToast: ToastMessage = {
        id: item.timestamp,
        product: item.product,
        quantity: item.quantity,
      };

      setToasts((prev) => [...prev.slice(-2), newToast]);

      // Auto dismiss after 3.5s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3500);
    });

    return () => unsubscribe();
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl bg-espresso text-cream p-3.5 shadow-2xl border border-warm-orange/30 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warm-orange text-cream">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-green" />
                  <span className="text-xs font-bold text-cream">Added to Cart!</span>
                </div>
                <span className="text-xs text-cream/80 font-medium line-clamp-1">
                  {toast.quantity}x {toast.product.name} (PKR {toast.product.price})
                </span>
                <span className="text-[10px] text-warm-orange font-semibold">
                  (Demo preview — Full cart in Step 04)
                </span>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss toast"
              className="text-cream/50 hover:text-cream p-1 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
