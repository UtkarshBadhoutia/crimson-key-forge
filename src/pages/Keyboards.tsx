import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { CategoryHero } from '@/components/CategoryHero';
import { Zap, Settings, Gamepad2 } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';
import { motion } from 'framer-motion';

const Keyboards = () => {
  const keyboards = getProductsByCategory('keyboards');
  const [filters, setFilters] = useState<any>({});

  const filteredProducts = useMemo(() => {
    let filtered = keyboards;
    if (filters.search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (filters.sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (filters.sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [keyboards, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <CategoryHero
        title="Mechanical Keyboards"
        subtitle="Precision-engineered keyboards that give you the competitive edge. Every keystroke matters."
        backgroundImage="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1920&q=80"
        productCount={keyboards.length}
        features={[
          { icon: Zap, label: 'Ultra-responsive' },
          { icon: Settings, label: 'Fully customizable' },
          { icon: Gamepad2, label: 'Gaming optimized' },
        ]}
      />

      <ProductFilters
        onFiltersChange={setFilters}
        categories={['keyboards']}
        brands={[...new Set(keyboards.map(k => k.brand))]}
      />

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No keyboards found</h3>
              <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Keyboards;
