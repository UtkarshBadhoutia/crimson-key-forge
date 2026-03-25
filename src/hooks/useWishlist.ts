import { useState, useCallback } from 'react';
import { getWishlist, toggleWishlistItem } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';

export const useWishlist = () => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(getWishlist);
  const { toast } = useToast();

  const addToWishlist = useCallback((productId: string) => {
    const { added, list } = toggleWishlistItem(productId);
    setWishlistIds([...list]);
    if (added) {
      toast({ title: 'Added to wishlist', description: 'Item has been added to your wishlist' });
    }
  }, [toast]);

  const removeFromWishlist = useCallback((productId: string) => {
    const { list } = toggleWishlistItem(productId);
    setWishlistIds([...list]);
    toast({ title: 'Removed from wishlist', description: 'Item has been removed from your wishlist' });
  }, [toast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  return {
    wishlistItems: wishlistIds,
    loading: false,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refetch: () => setWishlistIds(getWishlist()),
  };
};
