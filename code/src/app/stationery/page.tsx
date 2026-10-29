import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BookOpen, MapPin } from "lucide-react";

export default function StationeryPage() {
  return (
    <div className="py-10 sm:py-16 space-y-8">
      <Container>
        <SectionHeading
          as="h1"
          tag="Academic Supplies"
          title="Student Stationery & Supplies"
          subtitle="Spiral registers, lecture notebooks, ballpoints, highlighters, engineering graph paper, lab files, and study essentials on campus."
        />

        <div className="mt-8 max-w-3xl mx-auto">
          <Card className="text-center py-10 px-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-tan flex items-center justify-center text-coffee">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-coffee">
                Stationery Catalog Coming Up
              </h3>
              <p className="text-sm text-espresso/70 max-w-lg mx-auto">
                Full catalog of notebooks, lab manuals, stationery packs, calculators, and exam accessories will be populated in subsequent steps.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-coffee font-medium bg-tan/50 px-3 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-orange" />
              <span>Available at Counter #1, CUI Student Center</span>
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
