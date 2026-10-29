import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  Sparkles,
  ShoppingBag,
  CreditCard,
  CheckCircle,
  Coffee,
} from "lucide-react";
import { HeroPortal } from "@/components/home/HeroPortal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import ProductCard from "@/components/products/ProductCard";
import { getBestsellers } from "@/data/products";
import { CampusCombosSection } from "@/components/home/CampusCombosSection";

const CATEGORIES = [
  {
    name: "Breakfast",
    slug: "breakfast",
    href: "/breakfast",
    tagline: "Halwa puri, parathas & morning chai sets",
    itemCount: "7 items",
    image: "/images/final-web/07-cafe-wooden-table.webp",
  },
  {
    name: "Lunch",
    slug: "lunch",
    href: "/lunch",
    tagline: "Chicken biryani, karahi plates & hearty meals",
    itemCount: "7 items",
    image: "/images/final-web/02-cafe-interior.webp",
  },
  {
    name: "Fast Food",
    slug: "fast-food",
    href: "/fast-food",
    tagline: "Zinger burgers, pizza slices & crispy wings",
    itemCount: "8 items",
    image: "/images/final-web/18-burger-2.webp",
  },
  {
    name: "Beverages",
    slug: "beverages",
    href: "/beverages",
    tagline: "Hot doodh patti chai, cappuccino & iced lattes",
    itemCount: "6 items",
    image: "/images/final-web/25-coffee-2.webp",
  },
  {
    name: "Stationery",
    slug: "stationery",
    href: "/stationery",
    tagline: "Registers, notebooks, lab gear & exam pens",
    itemCount: "7 items",
    image: "/images/final-web/04-cafe-rustic.webp",
  },
];

const ORDER_STEPS = [
  {
    step: "01",
    title: "Browse the Menu",
    description:
      "Explore breakfast platters, hot biryanis, crispy fast food, fresh coffees, and semester stationery essentials.",
    icon: Coffee,
  },
  {
    step: "02",
    title: "Add to Cart",
    description:
      "Select your items, adjust quantities, specify campus delivery notes or express counter pickup.",
    icon: ShoppingBag,
  },
  {
    step: "03",
    title: "Pay Cash on Delivery",
    description:
      "Instant order confirmation. Pay cash at the cafe express counter or upon delivery to your campus department.",
    icon: BanknoteIcon,
  },
];

function BanknoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return <CreditCard {...props} />;
}

export default function HomePage() {
  const bestsellers = getBestsellers().slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Scroll-driven Hero Glyph Portal */}
      <HeroPortal />

      {/* 2. Category Showcase */}
      <section className="py-16 sm:py-24 bg-cream border-t border-tan/60">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tan text-coffee text-xs font-semibold tracking-wider uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-orange" /> Campus Offerings
              </span>
              <SectionHeading
                title="Browse by Category"
                subtitle="From hot breakfast plates to exam-ready stationery, explore our curated student menu."
                align="left"
              />
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-coffee hover:text-orange transition-colors group self-start md:self-auto"
            >
              <span>View full catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="group relative flex flex-col justify-end h-72 sm:h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-tan/80"
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Card Content */}
                <div className="relative p-5 text-cream flex flex-col justify-end space-y-1.5 z-10">
                  <span className="inline-block self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange/90 text-cream">
                    {cat.itemCount}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream tracking-tight group-hover:text-orange transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-cream/80 font-sans line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-cream/90 group-hover:text-orange transition-colors">
                    <span>Explore menu</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Most Loved Bestsellers */}
      <section className="py-16 sm:py-24 bg-tan-light border-y border-tan/60">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange/15 text-orange text-xs font-semibold tracking-wider uppercase mb-2">
                <Award className="w-3.5 h-3.5 text-orange" /> Most Loved
              </span>
              <SectionHeading
                title="Student Campus Favorites"
                subtitle="The top dishes and drinks ordered every day during lecture breaks and study sessions."
                align="left"
              />
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-coffee text-cream hover:bg-coffee-light shadow-sm transition-all self-start md:self-auto"
            >
              <span>Explore All 35 Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3.5. Interactive FlipCard Student Combos */}
      <CampusCombosSection />

      {/* 4. How to Order */}
      <section className="py-16 sm:py-24 bg-cream">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tan text-coffee text-xs font-semibold tracking-wider uppercase mb-2">
              Fast & Simple
            </span>
            <SectionHeading
              title="How It Works"
              subtitle="Ordering lunch or stationery at COMSATS takes less than two minutes."
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {ORDER_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative p-6 sm:p-8 rounded-2xl bg-white border border-tan/80 shadow-xs hover:shadow-md transition-shadow flex flex-col space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center">
                      <StepIcon className="w-6 h-6 text-orange" />
                    </div>
                    <span className="font-serif text-3xl font-bold text-tan">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-espresso">
                    {step.title}
                  </h3>
                  <p className="text-sm text-espresso/70 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Student ID Reminder Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-coffee to-espresso text-cream flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-coffee-light/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange/20 text-orange flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-cream" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-cream">
                  10% Student & Faculty Campus Discount
                </h4>
                <p className="text-xs sm:text-sm text-cream/80">
                  Flash your active CUI Student or Faculty Card at the counter for instant combo savings!
                </p>
              </div>
            </div>
            <Link
              href="/shop"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-orange hover:bg-orange-hover text-cream text-sm font-semibold shadow-xs transition-colors"
            >
              Order Now
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. Visit Us */}
      <section className="py-16 sm:py-24 bg-tan-light border-t border-tan/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Visual Photo */}
            <div className="relative h-80 sm:h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-tan">
              <Image
                src="/images/final-web/05-cafe-outdoor-seating.webp"
                alt="COMSATS University CUI Cafe Seating"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-cream">
                <span className="inline-block text-[11px] uppercase tracking-wider font-bold bg-orange px-2.5 py-1 rounded-lg text-cream mb-2">
                  Student Social Hub
                </span>
                <p className="font-serif text-2xl font-bold">
                  Cozy Seating, Fast Wi-Fi & Friendly Service
                </p>
              </div>
            </div>

            {/* Information Cards */}
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tan text-coffee text-xs font-semibold tracking-wider uppercase mb-2">
                  Find Us On Campus
                </span>
                <SectionHeading
                  title="Visit CUI Cafe"
                  subtitle="Located right at the heart of the COMSATS Islamabad main campus, next to the central auditorium."
                  align="left"
                />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-tan/70 shadow-2xs">
                  <MapPin className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-espresso">Campus Location</h4>
                    <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed">
                      Student Center Ground Floor, COMSATS University Islamabad, Park Road, Tarlai Kalan, Islamabad
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-tan/70 shadow-2xs">
                  <Clock className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-espresso">Operating Hours</h4>
                    <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed">
                      Monday to Friday: 8:00 AM – 6:00 PM<br />
                      Saturday – Sunday: Closed (University Holiday)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-tan/70 shadow-2xs">
                  <Phone className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-espresso">Phone & WhatsApp Inquiries</h4>
                    <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed">
                      +92 51 9049 5000 (Ext. 204) • Direct Cafe Counter
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-tan/70 shadow-2xs">
                  <Mail className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-espresso">Campus Email</h4>
                    <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed">
                      cafe@comsats.edu.pk • Orders and Catering
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-coffee hover:bg-coffee-light text-cream font-semibold text-sm shadow-md transition-all"
                >
                  <span>Leave Feedback or Contact Cafe Manager</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
