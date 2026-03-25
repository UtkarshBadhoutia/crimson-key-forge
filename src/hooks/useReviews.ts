import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getReviews, saveReview, deleteReviewById, LocalReview } from '@/lib/localStorage';

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

// Some seed reviews so the site isn't empty
const seedReviews: Record<string, Review[]> = {
  'kb-001': [
    { id: 'seed-1', product_id: 'kb-001', user_id: 'seed', rating: 5, title: 'Best keyboard I\'ve ever used', comment: 'The hot-swap feature is incredible. Swapped from Cherry Reds to Blacks in minutes. Build quality is exceptional.', verified_purchase: true, created_at: '2024-06-15T00:00:00Z', profiles: { first_name: 'Arjun', last_name: 'M.' } },
    { id: 'seed-2', product_id: 'kb-001', user_id: 'seed', rating: 5, title: 'Tournament worthy', comment: 'Using this in local tournaments. Zero lag, great feel. The aluminum frame feels rock solid.', verified_purchase: true, created_at: '2024-07-02T00:00:00Z', profiles: { first_name: 'Priya', last_name: 'S.' } },
  ],
  'ms-001': [
    { id: 'seed-3', product_id: 'ms-001', user_id: 'seed', rating: 5, title: 'Featherlight and precise', comment: 'At 58g this mouse feels like air. The sensor is flawless — no spin-outs even at high speeds.', verified_purchase: true, created_at: '2024-05-20T00:00:00Z', profiles: { first_name: 'Rahul', last_name: 'K.' } },
  ],
  'au-001': [
    { id: 'seed-4', product_id: 'au-001', user_id: 'seed', rating: 5, title: 'Immersive surround sound', comment: 'The 7.1 surround is a game changer for FPS. I can pinpoint footsteps with ease. ANC works great too.', verified_purchase: true, created_at: '2024-06-10T00:00:00Z', profiles: { first_name: 'Sneha', last_name: 'P.' } },
  ],
};

export const useReviews = (productId: string) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const reviews = useMemo(() => {
    const localReviews = getReviews(productId).map(r => ({
      id: r.id,
      product_id: r.productId,
      user_id: r.userId,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      verified_purchase: false,
      created_at: r.createdAt,
      profiles: { first_name: r.userName.split(' ')[0] || '', last_name: r.userName.split(' ')[1] || '' },
    }));
    const seeds = seedReviews[productId] || [];
    return [...localReviews, ...seeds].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, refreshKey]);

  const userReview = useMemo(() => {
    if (!user) return null;
    return reviews.find(r => r.user_id === user.id) || null;
  }, [reviews, user]);

  const submitReview = useCallback(async (rating: number, title: string, comment: string) => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to submit a review', variant: 'destructive' });
      return;
    }
    const review: LocalReview = {
      id: userReview?.id || crypto.randomUUID(),
      productId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      rating,
      title,
      comment,
      createdAt: new Date().toISOString(),
    };
    saveReview(review);
    setRefreshKey(k => k + 1);
    toast({ title: userReview ? 'Review updated' : 'Review submitted', description: `Your review has been ${userReview ? 'updated' : 'submitted'} successfully` });
  }, [user, productId, userReview, toast]);

  const deleteReview = useCallback(async () => {
    if (!userReview) return;
    deleteReviewById(userReview.id);
    setRefreshKey(k => k + 1);
    toast({ title: 'Review deleted', description: 'Your review has been deleted successfully' });
  }, [userReview, toast]);

  return { reviews, userReview, loading: false, submitReview, deleteReview, refetch: () => setRefreshKey(k => k + 1) };
};
