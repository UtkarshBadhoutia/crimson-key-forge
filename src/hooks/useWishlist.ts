import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          id,
          created_at,
          products (
            id,
            name,
            price,
            images,
            short_description,
            rating,
            review_count
          )
        `)
        .eq('user_id', session.user.id);

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to add items to your wishlist",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('wishlists')
        .insert([{ user_id: session.user.id, product_id: productId }]);

      if (error) throw error;

      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist",
      });

      fetchWishlist();
    } catch (error: any) {
      if (error?.code === '23505') {
        toast({
          title: "Already in wishlist",
          description: "This item is already in your wishlist",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add item to wishlist",
          variant: "destructive",
        });
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', session.user.id)
        .eq('product_id', productId);

      if (error) throw error;

      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });

      fetchWishlist();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.products?.id === productId);
  };

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refetch: fetchWishlist
  };
};