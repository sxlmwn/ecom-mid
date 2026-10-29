import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UtensilsCrossed, Clock } from "lucide-react";

export default function LunchPage() {
  return (
    <div className="py-10 sm:py-16 space-y-8">
      <Container>
        <SectionHeading
          as="h1"
          tag="Afternoon Meals"
          title="Daily Lunch Menu"
          subtitle="Wholesome, hot daily lunch platters, chicken biryani, daal chawal, curries, and healthy student combos cooked fresh every afternoon."
        />

        <div className="mt-8 max-w-3xl mx-auto">
          <Card className="text-center py-10 px-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-green/10 flex items-center justify-center text-green">
              <UtensilsCrossed className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-coffee">
                Lunch Items Coming Up
              </h3>
              <p className="text-sm text-espresso/70 max-w-lg mx-auto">
                Full catalog of warm lunch meals, traditional platters, and student meal-deal combos will be populated in subsequent steps.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-coffee font-medium bg-tan/50 px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-orange" />
              <span>Served Monday to Friday: 12:00 PM - 4:00 PM</span>
            </div>
            <div className="pt-2">
              <Button href="/shop" variant="secondary">
                View All Categories
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
