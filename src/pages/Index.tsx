import { Navigation } from '@/components/Navigation';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ProductCategories } from '@/components/ProductCategories';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroCarousel />
      <ProductCategories />
      <Footer />
    </div>
  );
};

export default Index;
