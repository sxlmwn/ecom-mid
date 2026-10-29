import React from "react";
import { ShoppingCart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  return (
    <div className="py-10 sm:py-16 space-y-8">
      <Container>
        <SectionHeading
          as="h1"
          tag="Order Summary"
          title="Your Shopping Cart"
          subtitle="Review your selected items before proceeding to campus counter pickup or express student checkout."
        />

        <div className="mt-8 max-w-2xl mx-auto">
          <Card className="text-center py-12 px-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-tan/60 flex items-center justify-center text-coffee">
              <ShoppingCart className="w-8 h-8 text-orange" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-coffee">
                Your cart is currently empty
              </h3>
              <p className="text-sm text-espresso/70 max-w-md mx-auto">
                Discover hot meals, fresh snacks, beverages, and student stationery at CUI Cafe to add to your order.
              </p>
            </div>
            <div className="pt-2">
              <Button href="/shop" variant="primary">
                Browse Cafe Menu
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
