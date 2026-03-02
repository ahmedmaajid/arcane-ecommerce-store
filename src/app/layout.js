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
  title: "Arcane — Quiet Luxury",
  description:
    "A curated collection of refined clothing. Crafted without compromise.",

  // OG tags — for WhatsApp, Facebook, LinkedIn
  openGraph: {
    title: "Arcane — Quiet Luxury",
    description:
      "A curated collection of refined clothing. Crafted without compromise.",
    url: "https://arcane-store.vercel.app",
    siteName: "Arcane",
    images: [
      {
        url: "/og-image.png", // place this in /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Arcane — Quiet Luxury Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter card — for Twitter/X previews
  twitter: {
    card: "summary_large_image",
    title: "Arcane — Quiet Luxury",
    description:
      "A curated collection of refined clothing. Crafted without compromise.",
    images: ["/og-image.png"],
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
