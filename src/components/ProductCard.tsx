import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className = "" }: ProductCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const inWishlist = isInWishlist(product.id);
  const mainImage = Array.isArray(product.images) ? product.images[0] : '/placeholder.svg';

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden rounded-t-lg">
            <div className="aspect-[4/3] bg-muted">
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src={mainImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setImageLoading(false)}
                loading="lazy"
              />
            </div>

            <div className="absolute top-3 left-3 space-y-1">
              {product.is_featured && (
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
              {product.stock_quantity === 0 && (
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-background/80 hover:bg-background"
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-4 w-4 ${inWishlist ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
              />
            </Button>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.short_description}
            </p>

            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.review_count} reviews)
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-2xl font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
              
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
