"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  location: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  timestamp: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  lastAddedItem: { product: Product; quantity: number; id: number } | null;
  dismissToast: () => void;
  lastOrder: OrderDetails | null;
  placeOrder: (details: {
    name: string;
    phone: string;
    location: string;
    notes?: string;
  }) => OrderDetails;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cui_cafe_cart_v1";

const EMPTY_ITEMS: CartItem[] = [];
let memoryCart: CartItem[] = [];
let isLoadedFromDisk = false;
const listeners = new Set<() => void>();

function getItemsSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_ITEMS;
  if (!isLoadedFromDisk) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          memoryCart = parsed;
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
    isLoadedFromDisk = true;
  }
  return memoryCart;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function updateItems(next: CartItem[]) {
  memoryCart = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore localStorage write errors
  }
  listeners.forEach((cb) => cb());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getItemsSnapshot, getServerSnapshot);
  const [lastAddedItem, setLastAddedItem] = useState<{
    product: Product;
    quantity: number;
    id: number;
  } | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    const current = getItemsSnapshot();
    const existingIndex = current.findIndex((i) => i.product.id === product.id);
    let next: CartItem[];
    if (existingIndex > -1) {
      next = current.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      next = [...current, { product, quantity }];
    }
    updateItems(next);

    // Trigger toast notification
    const toastPayload = { product, quantity, id: Date.now() };
    setLastAddedItem(toastPayload);

    // Auto clear toast after 3.5s
    setTimeout(() => {
      setLastAddedItem((c) => (c?.id === toastPayload.id ? null : c));
    }, 3500);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const current = getItemsSnapshot();
    updateItems(current.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const current = getItemsSnapshot();
    if (quantity <= 0) {
      updateItems(current.filter((i) => i.product.id !== productId));
      return;
    }
    updateItems(
      current.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    updateItems([]);
  }, []);

  const dismissToast = useCallback(() => {
    setLastAddedItem(null);
  }, []);

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const placeOrder = useCallback(
    (details: {
      name: string;
      phone: string;
      location: string;
      notes?: string;
    }): OrderDetails => {
      const orderId = `CUI-${Math.floor(100000 + Math.random() * 900000)}`;
      const currentItems = [...getItemsSnapshot()];
      const currentSubtotal = currentItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const deliveryFee = currentSubtotal > 1000 ? 0 : 50;
      const total = currentSubtotal + deliveryFee;

      const order: OrderDetails = {
        orderId,
        customerName: details.name,
        phone: details.phone,
        location: details.location,
        notes: details.notes,
        items: currentItems,
        subtotal: currentSubtotal,
        deliveryFee,
        total,
        timestamp: Date.now(),
      };

      setLastOrder(order);
      updateItems([]);

      return order;
    },
    []
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCount,
      subtotal,
      lastAddedItem,
      dismissToast,
      lastOrder,
      placeOrder,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCount,
      subtotal,
      lastAddedItem,
      dismissToast,
      lastOrder,
      placeOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
