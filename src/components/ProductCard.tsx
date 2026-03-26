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
    <Card className={`group relative overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_hsl(0_84%_60%/0.15)] ${className}`}>
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3] bg-muted">
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src={mainImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setImageLoading(false)}
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="absolute top-3 left-3 space-y-1">
              {product.is_featured && (
                <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                  Featured
                </Badge>
              )}
              {product.stock_quantity === 0 && (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 bg-background/80 hover:bg-background backdrop-blur-sm"
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-4 w-4 ${inWishlist ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
              />
            </Button>
          </div>

          <div className="p-4 space-y-2.5">
            <div>
              <p className="text-xs text-primary/80 font-semibold tracking-wider uppercase">{product.brand}</p>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors text-sm mt-0.5">
                {product.name}
              </h3>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {product.short_description}
            </p>

            {product.rating > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium ml-1">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.review_count})
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="text-xl font-bold text-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              
              {/* Always visible on mobile, hover on desktop */}
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className="md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 h-8 text-xs"
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                Add
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
