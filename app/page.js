import { HeroSection } from "@/components/home/HeroSection";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";

export default function Home() {
  return (
     <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        {/* <FeaturedProducts />
        <CategoriesSection />
        <TrendingProducts />
        <FeaturedSellers />
        <CustomerReviews /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
