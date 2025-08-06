import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/hooks/useProducts';

export const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const { products = [] } = useProducts();

  useEffect(() => {
    // Get recently viewed products from localStorage
    const recent = localStorage.getItem('recentlyViewed');
    if (recent) {
      const recentIds = JSON.parse(recent);
      const recentProducts = products.filter(product => 
        recentIds.includes(product.id)
      ).slice(0, 4);
      setRecentlyViewed(recentProducts);
    }
  }, [products]);

  // Function to add product to recently viewed (call from ProductDetail page)
  const addToRecentlyViewed = (productId: string) => {
    const recent = localStorage.getItem('recentlyViewed');
    let recentIds = recent ? JSON.parse(recent) : [];
    
    // Remove if already exists and add to beginning
    recentIds = recentIds.filter((id: string) => id !== productId);
    recentIds.unshift(productId);
    
    // Keep only last 10 items
    recentIds = recentIds.slice(0, 10);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentIds));
  };

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Recently Viewed</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continue exploring products you've shown interest in
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {recentlyViewed.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard 
                product={product}
                className="group-hover:shadow-crimson transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {recentlyViewed.length >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>Showing your most recent views</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Export the function to be used in ProductDetail page
export default RecentlyViewed;
export const addToRecentlyViewed = (productId: string) => {
  const recent = localStorage.getItem('recentlyViewed');
  let recentIds = recent ? JSON.parse(recent) : [];
  
  recentIds = recentIds.filter((id: string) => id !== productId);
  recentIds.unshift(productId);
  recentIds = recentIds.slice(0, 10);
  
  localStorage.setItem('recentlyViewed', JSON.stringify(recentIds));
};
