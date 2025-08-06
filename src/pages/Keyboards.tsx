import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { Badge } from '@/components/ui/badge';
import { Zap, Settings, Gamepad2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { motion } from 'framer-motion';

const Keyboards = () => {
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter keyboards only
  const keyboards = products.filter(product => product.category === 'keyboards');

  useEffect(() => {
    setFilteredProducts(keyboards);
  }, [keyboards]);

  const handleFiltersChange = (filters: any) => {
    // Apply filters to keyboards
    let filtered = keyboards;
    if (filters.search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice);
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-16 bg-gradient-to-br from-background to-background/50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
            >
              Mechanical Keyboards
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Precision-engineered keyboards that give you the competitive edge. Every keystroke matters.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Ultra-responsive
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Settings className="w-4 h-4 mr-2" />
                Fully customizable
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Gaming optimized
              </Badge>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Filters Section */}
      <section className="py-8 border-b border-border/20">
        <div className="container mx-auto px-6">
          {loading ? (
            <SkeletonLoader type="filters" />
          ) : (
            <ProductFilters 
              onFiltersChange={handleFiltersChange}
              categories={['keyboards']}
              brands={[...new Set(keyboards.map(k => k.brand))]}
            />
          )}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <SkeletonLoader type="product-grid" count={8} />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {!loading && filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">No keyboards found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Keyboards;