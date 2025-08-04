import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, ThumbsUp, Edit, Trash2 } from 'lucide-react';
import { useReviews, Review } from '@/hooks/useReviews';
import { format } from 'date-fns';

interface ReviewSystemProps {
  productId: string;
}

export const ReviewSystem = ({ productId }: ReviewSystemProps) => {
  const { reviews, userReview, loading, submitReview, deleteReview } = useReviews(productId);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.comment.trim()) return;

    await submitReview(formData.rating, formData.title, formData.comment);
    setShowReviewForm(false);
    setFormData({ rating: 5, title: '', comment: '' });
  };

  const handleEdit = () => {
    if (userReview) {
      setFormData({
        rating: userReview.rating,
        title: userReview.title,
        comment: userReview.comment
      });
      setShowReviewForm(true);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            onClick={() => interactive && onRatingChange?.(star)}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            {!userReview && (
              <Button onClick={() => setShowReviewForm(true)}>
                Write a Review
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length > 0 ? (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {renderStars(Math.round(averageRating))}
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
          ) : (
            <p className="text-muted-foreground mb-6">No reviews yet. Be the first to review this product!</p>
          )}

          {/* User's Review */}
          {userReview && (
            <Card className="mb-6 border-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-primary">Your Review</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleEdit}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={deleteReview}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {renderStars(userReview.rating)}
                  <h4 className="font-semibold">{userReview.title}</h4>
                  <p className="text-muted-foreground">{userReview.comment}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(userReview.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{userReview ? 'Edit Review' : 'Write a Review'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    {renderStars(formData.rating, true, (rating) => 
                      setFormData({ ...formData, rating })
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="title">Review Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Summarize your experience"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="comment">Your Review</Label>
                    <Textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Share your thoughts about this product"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit">
                      {userReview ? 'Update Review' : 'Submit Review'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* All Reviews */}
          <div className="space-y-4">
            {reviews.filter(review => review.id !== userReview?.id).map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        {renderStars(review.rating)}
                        <h4 className="font-semibold mt-1">{review.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          By {review.profiles?.first_name} {review.profiles?.last_name}
                          {review.verified_purchase && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(review.created_at), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};