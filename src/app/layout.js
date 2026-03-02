import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Arcane — Modern Luxury Fashion",
  description:
    "Discover the new Arcane SS2025 collection. Timeless, refined fashion for the discerning few. Shop new arrivals in women's and men's luxury clothing.",
  keywords:
    "luxury fashion, designer clothing, minimalist fashion, SS2025, Arcane, editorial fashion",
  openGraph: {
    title: "Arcane — Modern Luxury Fashion",
    description:
      "Discover the new Arcane SS2025 collection. Timeless pieces for the discerning few.",
    type: "website",
    siteName: "Arcane",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcane — Modern Luxury Fashion",
    description: "Discover the new Arcane SS2025 collection.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
