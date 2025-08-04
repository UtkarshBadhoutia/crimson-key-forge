import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  verified_purchase: boolean;
  created_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
  } | null;
};

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (productId) {
      fetchReviews();
      fetchUserReview();
    }
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews((data as unknown as Review[]) || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReview = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .eq('product_id', productId)
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) throw error;
      setUserReview(data as unknown as Review | null);
    } catch (error) {
      console.error('Error fetching user review:', error);
    }
  };

  const submitReview = async (rating: number, title: string, comment: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to submit a review",
          variant: "destructive",
        });
        return;
      }

      const reviewData = {
        product_id: productId,
        user_id: session.user.id,
        rating,
        title,
        comment,
      };

      let error;
      if (userReview) {
        // Update existing review
        const { error: updateError } = await supabase
          .from('reviews')
          .update(reviewData)
          .eq('id', userReview.id);
        error = updateError;
      } else {
        // Create new review
        const { error: insertError } = await supabase
          .from('reviews')
          .insert([reviewData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: userReview ? "Review updated" : "Review submitted",
        description: `Your review has been ${userReview ? 'updated' : 'submitted'} successfully`,
      });

      fetchReviews();
      fetchUserReview();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    }
  };

  const deleteReview = async () => {
    try {
      if (!userReview) return;

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', userReview.id);

      if (error) throw error;

      toast({
        title: "Review deleted",
        description: "Your review has been deleted successfully",
      });

      fetchReviews();
      fetchUserReview();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      });
    }
  };

  return {
    reviews,
    userReview,
    loading,
    submitReview,
    deleteReview,
    refetch: fetchReviews
  };
};