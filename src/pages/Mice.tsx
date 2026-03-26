import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { CategoryHero } from '@/components/CategoryHero';
import { Target, Zap, Gamepad2 } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';
import { motion } from 'framer-motion';

const Mice = () => {
  const mice = getProductsByCategory('mice');
  const [filters, setFilters] = useState<any>({});

  const filteredProducts = useMemo(() => {
    let filtered = mice;
    if (filters.search) filtered = filtered.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.brand) filtered = filtered.filter(p => p.brand === filters.brand);
    if (filters.minPrice) filtered = filtered.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice) filtered = filtered.filter(p => p.price <= filters.maxPrice);
    if (filters.sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (filters.sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (filters.sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [mice, filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <CategoryHero
        title="Gaming Mice"
        subtitle="Precision tracking and lightning-fast response times. Dominate every game with pixel-perfect accuracy."
        backgroundImage="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1920&q=80"
        productCount={mice.length}
        features={[
          { icon: Target, label: 'Pixel-perfect tracking' },
          { icon: Zap, label: 'Ultra-responsive' },
          { icon: Gamepad2, label: 'Pro-level precision' },
        ]}
      />

      <ProductFilters
        onFiltersChange={setFilters}
        categories={['mice']}
        brands={[...new Set(mice.map(m => m.brand))]}
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
              <h3 className="text-xl font-semibold mb-2">No mice found</h3>
              <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mice;
