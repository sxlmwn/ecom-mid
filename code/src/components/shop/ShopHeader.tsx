"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, Flame, BookOpen, Utensils, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function ShopHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2B1B12] via-[#4B2E20] to-[#2B1B12] py-14 sm:py-20 text-cream border-b border-warm-orange/20">
      {/* Decorative floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          animate={{
            y: [-10, 15, -10],
            rotate: [0, 8, -6, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 left-[10%] text-warm-orange"
        >
          <Coffee className="w-14 h-14" />
        </motion.div>

        <motion.div
          animate={{
            y: [12, -14, 12],
            rotate: [0, -10, 8, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-12 right-[12%] text-cream"
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>

        <motion.div
          animate={{
            y: [-8, 12, -8],
            x: [0, 8, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-6 left-[22%] text-warm-orange"
        >
          <Utensils className="w-10 h-10" />
        </motion.div>

        <motion.div
          animate={{
            y: [15, -10, 15],
            rotate: [-5, 5, -5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-8 right-[25%] text-cream"
        >
          <BookOpen className="w-12 h-12" />
        </motion.div>

        <motion.div
          animate={{
            y: [-12, 10, -12],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/2 left-[5%] text-[#D35400]"
        >
          <Flame className="w-8 h-8" />
        </motion.div>
      </div>

      <Container className="relative z-10 text-center">
        {/* Campus Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full bg-cream/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-warm-orange border border-warm-orange/30 shadow-xs mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>COMSATS Islamabad Campus Kitchen & Stationery</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-cream tracking-tight"
        >
          Our Shop &amp; Menu
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3.5 max-w-2xl mx-auto text-sm sm:text-base text-cream/80 leading-relaxed font-sans"
        >
          Freshly cooked breakfast, student-budget lunch platters, quick bites between
          classes, chilled drinks, and exam stationery — ready when you are.
        </motion.p>
      </Container>
    </section>
  );
}
