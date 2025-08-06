import { Navigation } from '@/components/Navigation';
import { HeroCarousel } from '@/components/HeroCarousel';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { LimitedTimeOffer } from '@/components/LimitedTimeOffer';
import { ProductCategories } from '@/components/ProductCategories';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Footer } from '@/components/Footer';
import RecentlyViewed from '@/components/RecentlyViewed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroCarousel />
      <FeaturedProducts />
      <LimitedTimeOffer />
      <RecentlyViewed />
      <ProductCategories />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Index;
