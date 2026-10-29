import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Compass,
  Navigation,
  Car,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | CUI Cafe • COMSATS University Islamabad",
  description:
    "Get in touch with CUI Cafe for daily inquiries, department catering, food feedback, and campus directions at COMSATS University Islamabad.",
};

const CONTACT_INFO = [
  {
    title: "Campus Location",
    desc: "Student Center Ground Floor, COMSATS University Islamabad, Park Road, Tarlai Kalan, Islamabad",
    subdesc: "Directly adjacent to the Central Auditorium & Examination Halls",
    icon: MapPin,
  },
  {
    title: "Operating Hours",
    desc: "Monday – Friday: 8:00 AM – 6:00 PM",
    subdesc: "Closed Saturdays, Sundays & Official University Holidays",
    icon: Clock,
  },
  {
    title: "Phone & WhatsApp Desk",
    desc: "+92 51 9049 5000 (Ext: 204)",
    subdesc: "Counter WhatsApp orders: +92 300 9049500",
    icon: Phone,
  },
  {
    title: "Official Campus Email",
    desc: "cafe@comsats.edu.pk",
    subdesc: "Society catering: catering@cuicafe.pk",
    icon: Mail,
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* 1. Hero Banner */}
      <section className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-espresso text-cream flex items-end">
        <Image
          src="/images/final-web/05-cafe-outdoor-seating.webp"
          alt="CUI Cafe Outdoor Campus Patio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/30" />

        <Container className="relative pb-8 sm:pb-12 z-10 space-y-2">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-cream/75 mb-2 overflow-x-auto whitespace-nowrap"
          >
            <Link href="/" className="hover:text-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-cream/50" />
            <span className="font-semibold text-orange">Contact Us</span>
          </nav>

          <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange text-cream shadow-xs">
            Student Support & Inquiries
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream tracking-tight">
            Contact CUI Cafe
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-cream/85 font-sans max-w-2xl leading-relaxed">
            We are here to serve the COMSATS student body and faculty. Reach out for catering bookings, special meal requests, or daily suggestions.
          </p>
        </Container>
      </section>

      {/* 2. Main Content: Info & Interactive Form */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Info Cards & Campus Directions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-orange">
                  Direct Inquiries
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-coffee">
                  Get in Touch with Our Campus Team
                </h2>
                <p className="text-xs sm:text-sm text-espresso/70 leading-relaxed">
                  Have questions about our daily menu, student discounts, or event catering? Visit us at Counter #1 or reach out through our contact desk.
                </p>
              </div>

              {/* 4 Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {CONTACT_INFO.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-tan/80 shadow-xs space-y-2 hover:border-orange/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-base font-bold text-coffee">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-espresso/85 leading-relaxed">
                        {item.desc}
                      </p>
                      <p className="text-[11px] text-espresso/50">
                        {item.subdesc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Styled Campus Map & Directions Card */}
              <div className="p-6 rounded-3xl bg-tan/40 border border-tan/80 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-coffee text-cream flex items-center justify-center">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-coffee">
                        Campus Directions & Parking
                      </h3>
                      <span className="text-xs text-espresso/60">
                        Navigating CUI Main Campus Park Road
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green px-2.5 py-1 rounded-full bg-green/10">
                    Open for Walk-ins
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-espresso/80 pt-2 border-t border-tan">
                  <div className="space-y-1">
                    <span className="font-bold text-coffee flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-orange" /> Main Gate 1
                    </span>
                    <p className="text-[11px] leading-relaxed text-espresso/70">
                      Walk straight past the fountain towards the Central Library. CUI Cafe is 150m ahead on the ground floor.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-coffee flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-orange" /> Academic Gate 2
                    </span>
                    <p className="text-[11px] leading-relaxed text-espresso/70">
                      Direct access from Engineering & CS faculty blocks. Enter student corridor to reach express Counter #2.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-coffee flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-orange" /> Student Parking
                    </span>
                    <p className="text-[11px] leading-relaxed text-espresso/70">
                      Designated two-wheeler and student vehicle parking right outside the sports complex adjacent to the cafe.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-5">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
