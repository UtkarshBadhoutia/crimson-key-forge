import { useMemo } from 'react';
import { products as allProducts, Product, getProductById, searchProducts as searchFn } from '@/data/products';

export type { Product } from '@/data/products';

export const useProducts = (filters?: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) => {
  const products = useMemo(() => {
    let result = allProducts.filter(p => p.is_active);

    if (filters?.category) {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters?.brand) {
      result = result.filter(p => p.brand === filters.brand);
    }
    if (filters?.minPrice) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [filters?.category, filters?.brand, filters?.minPrice, filters?.maxPrice, filters?.search]);

  return { products, loading: false, error: null, refetch: () => {} };
};

export const useProduct = (id: string) => {
  const product = useMemo(() => getProductById(id) || null, [id]);
  return { product, loading: false, error: product ? null : 'Product not found', refetch: () => {} };
};
