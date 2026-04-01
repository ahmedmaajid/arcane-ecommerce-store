import Hero from "@/components/Hero";
import EditorialSection from "@/components/EditorialSection";
import CollectionSelector from "@/components/CollectionSelector";
import FeaturedProducts from "@/components/FeaturedProducts";
import PreFooterSection from "@/components/PreFooterSection";
import Footer from "@/components/Footer";
import OfferBanner from "@/components/OfferBanner";

export const metadata = {
  title: "Arcane — Modern Luxury Fashion | New SS2025 Collection",
  description:
    "Shop the new Arcane Spring/Summer 2025 collection. Refined, timeless clothing crafted for those who value quiet luxury over trends.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <OfferBanner />
      <CollectionSelector />
      <EditorialSection />
      <FeaturedProducts />
      <PreFooterSection />
      <Footer />
    </main>
  );
}
