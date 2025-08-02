import { Navigation } from '@/components/Navigation';
import { HeroCarousel } from '@/components/HeroCarousel';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { LimitedTimeOffer } from '@/components/LimitedTimeOffer';
import { ProductCategories } from '@/components/ProductCategories';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroCarousel />
      <FeaturedProducts />
      <LimitedTimeOffer />
      <ProductCategories />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Index;
