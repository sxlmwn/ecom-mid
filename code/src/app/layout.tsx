import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Poppins } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { GlobalCartToast } from "@/components/cart/GlobalCartToast";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CUI Cafe | COMSATS University Islamabad",
  description:
    "Official university cafe & student store prototype for COMSATS University Islamabad. Fresh dining, quick snacks, and stationery supplies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso font-sans">
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-cream border-b border-tan" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <GlobalCartToast />
        </CartProvider>
      </body>
    </html>
  );
}
