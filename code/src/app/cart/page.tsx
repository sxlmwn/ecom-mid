"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  ShieldCheck,
  Coffee,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart, OrderDetails } from "@/context/CartContext";
import ProductImage from "@/components/ui/ProductImage";

const CAMPUS_LOCATIONS = [
  "Student Center (Self-Pickup at Counter #1)",
  "CS Department (Block B - Foyer)",
  "EE Department (Block A - Main Entrance)",
  "BBA Department (Block C - Faculty Lounge)",
  "Central Library (Discussion Area 1st Floor)",
  "Engineering Block (Workshop Entrance)",
  "Campus Sports Complex (Front Cafe Stall)",
];

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, totalCount, placeOrder } =
    useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const deliveryFee = subtotal > 1000 ? 0 : items.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) newErrors.name = "Please enter your full name";
    if (!phone.trim()) newErrors.phone = "Please enter a contact phone number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderNotes = [
      studentId.trim() ? `ID: ${studentId.trim()}` : "",
      notes.trim() ? `Note: ${notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const order = placeOrder({
      name: name.trim(),
      phone: phone.trim(),
      location,
      notes: orderNotes,
    });

    setCompletedOrder(order);
    setCheckoutOpen(false);
  };

  // 1. Order Success Screen
  if (completedOrder) {
    return (
      <div className="py-12 sm:py-20 bg-cream">
        <Container>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-tan/80 p-6 sm:p-10 shadow-xl space-y-8 text-espresso">
            {/* Celebration Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-green/15 text-green flex items-center justify-center shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>
              <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-green/10 text-green">
                Order Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-coffee">
                Order Placed Successfully!
              </h1>
              <p className="text-sm text-espresso/70 font-sans max-w-md mx-auto">
                Thank you, <span className="font-semibold text-coffee">{completedOrder.customerName}</span>. Your campus order has been sent straight to the cafe counter.
              </p>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-tan/40 border border-tan/80 text-xs sm:text-sm">
              <div>
                <span className="text-espresso/50 block text-xs">Order Number</span>
                <span className="font-mono text-base font-bold text-coffee">
                  {completedOrder.orderId}
                </span>
              </div>
              <div>
                <span className="text-espresso/50 block text-xs">Estimated Ready Time</span>
                <span className="font-bold text-orange flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-4 h-4" /> 15 - 20 minutes
                </span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-tan/60">
                <span className="text-espresso/50 block text-xs">Pickup / Delivery Spot</span>
                <span className="font-semibold text-coffee flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-orange shrink-0" />
                  {completedOrder.location}
                </span>
              </div>
              {completedOrder.notes && (
                <div className="sm:col-span-2 pt-2 border-t border-tan/60">
                  <span className="text-espresso/50 block text-xs">Order Notes</span>
                  <span className="italic text-espresso/80">{completedOrder.notes}</span>
                </div>
              )}
            </div>

            {/* Items Summary */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-coffee border-b border-tan pb-2">
                Order Items ({completedOrder.items.length})
              </h3>
              <div className="divide-y divide-tan/60 max-h-56 overflow-y-auto pr-1">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange">{item.quantity}x</span>
                      <span className="font-medium text-espresso">{item.product.name}</span>
                    </div>
                    <span className="font-semibold text-coffee">
                      PKR {item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-4 rounded-xl bg-tan/30 border border-tan space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-espresso/70">
                <span>Subtotal</span>
                <span>PKR {completedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between text-espresso/70">
                <span>Campus Delivery</span>
                <span>
                  {completedOrder.deliveryFee === 0 ? "FREE" : `PKR ${completedOrder.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-coffee pt-2 border-t border-tan">
                <span>Grand Total (Cash on Delivery)</span>
                <span className="text-orange">PKR {completedOrder.total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/shop"
                onClick={() => setCompletedOrder(null)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-orange hover:bg-orange-hover text-cream font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
              <Link
                href="/"
                onClick={() => setCompletedOrder(null)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-tan hover:bg-tan text-coffee font-semibold text-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 2. Empty Cart State
  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24 bg-cream">
        <Container>
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-tan/60 flex items-center justify-center text-orange shadow-inner">
              <Coffee className="w-12 h-12 text-orange" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange">
                Campus Tray Empty
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-coffee">
                Your tray is currently empty
              </h1>
              <p className="text-sm sm:text-base text-espresso/70 font-sans leading-relaxed">
                You haven&apos;t added any items to your order tray yet. Grab a warm lunch, steaming chai, or your lecture stationery supplies.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-orange hover:bg-orange-hover text-cream font-semibold text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Browse Cafe Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 3. Active Cart with Items
  return (
    <div className="py-10 sm:py-16 bg-cream">
      <Container>
        <div className="mb-8">
          <SectionHeading
            as="h1"
            tag="Campus Checkout"
            title="Your Order Tray"
            subtitle={`Review your ${totalCount} selected item${
              totalCount > 1 ? "s" : ""
            } before placing your order.`}
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Items List Area */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-tan">
              <span className="text-sm font-semibold text-espresso">
                Selected Products ({items.length})
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-espresso/60 hover:text-red-600 transition-colors cursor-pointer"
              >
                Clear Entire Tray
              </button>
            </div>

            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-tan/80 shadow-xs hover:border-orange/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-tan/40 border border-tan">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <ProductImage
                          src=""
                          alt={product.name}
                          category={product.category}
                          aspectRatio="square"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange">
                        {product.category.replace("-", " ")}
                      </span>
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-serif text-base sm:text-lg font-bold text-coffee hover:text-orange transition-colors block line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <span className="text-xs text-espresso/70 font-semibold block">
                        PKR {product.price} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-tan/50">
                    <div className="flex items-center border border-tan rounded-xl bg-tan-light px-2 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1 text-coffee hover:text-orange transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-coffee">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        aria-label="Increase quantity"
                        className="p-1 text-coffee hover:text-orange disabled:opacity-30 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <span className="font-serif font-bold text-base text-coffee">
                        PKR {product.price * quantity}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="p-2 text-espresso/40 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-coffee hover:text-orange transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add more items from Menu</span>
              </Link>
            </div>
          </div>

          {/* Order Summary & Checkout Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-white border border-tan/80 p-6 shadow-md space-y-6">
              <h2 className="font-serif text-xl font-bold text-coffee pb-3 border-b border-tan">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-espresso/70">
                  <span>Subtotal ({totalCount} items)</span>
                  <span className="font-semibold text-espresso">PKR {subtotal}</span>
                </div>
                <div className="flex justify-between text-espresso/70">
                  <span>Campus Delivery</span>
                  <span className="font-semibold text-espresso">
                    {deliveryFee === 0 ? (
                      <span className="text-green font-bold">FREE</span>
                    ) : (
                      `PKR ${deliveryFee}`
                    )}
                  </span>
                </div>
                {subtotal <= 1000 && (
                  <p className="text-[11px] text-orange bg-orange/10 p-2.5 rounded-xl leading-relaxed">
                    Add items worth PKR {1000 - subtotal} more to get <strong>FREE delivery</strong> across all campus departments!
                  </p>
                )}
                <div className="flex justify-between text-base sm:text-lg font-bold text-coffee pt-3 border-t border-tan">
                  <span>Grand Total</span>
                  <span className="text-orange">PKR {total}</span>
                </div>
              </div>

              {!checkoutOpen ? (
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-orange hover:bg-orange-hover text-cream font-semibold text-sm sm:text-base shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : null}

              {/* Checkout Form Modal/Accordion */}
              <AnimatePresence>
                {checkoutOpen && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleCheckoutSubmit}
                    className="space-y-4 pt-4 border-t border-tan overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base font-bold text-coffee">
                        Guest Checkout Details
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCheckoutOpen(false)}
                        className="text-xs text-espresso/50 hover:text-espresso cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-name" className="text-xs font-semibold text-coffee block">
                        Full Name *
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Usama Khan"
                        className="w-full px-3.5 py-2 rounded-xl border border-tan bg-tan/20 text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange"
                      />
                      {errors.name && (
                        <span className="text-[11px] text-red-500">{errors.name}</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-student-id" className="text-xs font-semibold text-coffee block">
                        Student / Faculty ID (Optional)
                      </label>
                      <input
                        id="checkout-student-id"
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g. SP23-BCS-042"
                        className="w-full px-3.5 py-2 rounded-xl border border-tan bg-tan/20 text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-phone" className="text-xs font-semibold text-coffee block">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="e.g. 0300 1234567"
                        className="w-full px-3.5 py-2 rounded-xl border border-tan bg-tan/20 text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange"
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-500">{errors.phone}</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-location" className="text-xs font-semibold text-coffee block">
                        Pickup / Delivery Spot *
                      </label>
                      <select
                        id="checkout-location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-tan bg-tan/20 text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange"
                      >
                        {CAMPUS_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="checkout-notes" className="text-xs font-semibold text-coffee block">
                        Order Notes (Optional)
                      </label>
                      <input
                        id="checkout-notes"
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Extra chutney, less spicy, deliver at 1:15 PM"
                        className="w-full px-3.5 py-2 rounded-xl border border-tan bg-tan/20 text-xs sm:text-sm text-espresso focus:outline-none focus:border-orange"
                      />
                    </div>

                    {/* Cash on Delivery notice */}
                    <div className="p-3 rounded-xl bg-tan/50 border border-tan flex items-start gap-2.5">
                      <CreditCard className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                      <div className="text-[11px] text-espresso/80 leading-relaxed">
                        <span className="font-bold text-coffee block">Cash on Delivery</span>
                        Pay cash when you pick up at the cafe counter or when delivered to your campus department. No online card required.
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-orange hover:bg-orange-hover text-cream font-semibold text-sm sm:text-base shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Place Order • PKR {total}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Guarantees */}
            <div className="p-4 rounded-2xl bg-white border border-tan/70 space-y-2 text-xs text-espresso/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green" />
                <span>100% Campus Certified Halal & Fresh</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange" />
                <span>Express 15-minute Break Pickup Available</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
