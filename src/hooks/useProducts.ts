import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Product = {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  brand: string;
  model: string;
  sku: string;
  stock_quantity: number;
  weight: number;
  dimensions: any;
  specifications: any;
  images: string[];
  tags: string[];
  is_featured: boolean;
  is_active: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
};

export const useProducts = (filters?: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.category) {
        query = query.eq('category', filters.category as any);
      }
      if (filters?.brand) {
        query = query.eq('brand', filters.brand);
      }
      if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, refetch: fetchProduct };
};