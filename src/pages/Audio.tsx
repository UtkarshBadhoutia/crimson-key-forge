import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { CategoryHero } from '@/components/CategoryHero';
import { Volume2, Headphones, Mic } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';
import { motion } from 'framer-motion';

const Audio = () => {
  const audioProducts = getProductsByCategory('audio');
  const [filters, setFilters] = useState<any>({});

  const filteredProducts = useMemo(() => {
    let filtered = audioProducts;
    if (filters.search) filtered = filtered.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.brand) filtered = filtered.filter(p => p.brand === filters.brand);
    if (filters.minPrice) filtered = filtered.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice) filtered = filtered.filter(p => p.price <= filters.maxPrice);
    if (filters.sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (filters.sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (filters.sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [audioProducts, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <CategoryHero
        title="Gaming Audio"
        subtitle="Immersive audio experiences that put you in the center of the action. Hear every detail, feel every moment."
        backgroundImage="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1920&q=80"
        productCount={audioProducts.length}
        features={[
          { icon: Volume2, label: 'Immersive surround' },
          { icon: Headphones, label: 'Studio quality' },
          { icon: Mic, label: 'Crystal clear comms' },
        ]}
      />

      <ProductFilters
        onFiltersChange={setFilters}
        categories={['audio']}
        brands={[...new Set(audioProducts.map(p => p.brand))]}
      />

      <section className="py-12">
        <div className="container mx-auto px-6">
          <p className="text-sm text-muted-foreground mb-8">
            Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> products
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No audio products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Audio;
