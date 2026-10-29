/**
 * Cart Placeholder Module
 * 
 * STEP 03 PLACEHOLDER:
 * The complete cart functionality, persistence, checkout, and state management
 * will be fully implemented in a subsequent step.
 * 
 * This module provides the placeholder handler for "Add to Cart" interactions
 * with console logging and lightweight toast notification triggers.
 */

import { Product } from "@/data/products";

// Event listener type for toast notifications
export type CartPlaceholderListener = (item: {
  product: Product;
  quantity: number;
  timestamp: number;
}) => void;

const listeners: Set<CartPlaceholderListener> = new Set();

/**
 * Subscribe to cart placeholder addition events (used by Toast / Notification UI)
 */
export function subscribeToCartPlaceholder(listener: CartPlaceholderListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Trigger an "Add to Cart" placeholder event.
 * Logs to console as required by Step 03 specification and dispatches
 * to active toast subscribers.
 */
export function addToCartPlaceholder(product: Product, quantity = 1): void {
  const eventPayload = {
    product,
    quantity,
    timestamp: Date.now(),
  };

  // Structured console log required by Step 03
  console.log(
    `[CUI Cafe - Cart Placeholder] Added "${product.name}" (${quantity}x @ PKR ${product.price}) to cart. [Pending full cart implementation in Step 04]`
  );

  // Notify any active toast listener
  listeners.forEach((listener) => {
    try {
      listener(eventPayload);
    } catch (err) {
      console.error("[CartPlaceholder] Error in listener:", err);
    }
  });
}
