import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/contexts/CartContext';
import { ReviewSystem } from '@/components/ReviewSystem';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || '');
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const images = Array.isArray(product.images) ? product.images : [product.images].filter(Boolean);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={images[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                {product.is_featured && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground text-lg">
                {product.short_description}
              </p>
            </div>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.review_count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.stock_quantity > 0 ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  In Stock ({product.stock_quantity} available)
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-border rounded px-3 py-2"
                  >
                    {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWishlistToggle}
                  size="lg"
                >
                  <Heart 
                    className={`h-5 w-5 ${inWishlist ? 'fill-primary text-primary' : ''}`} 
                  />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">2 Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">30-Day Returns</p>
                  <p className="text-xs text-muted-foreground">Easy returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                {product.specifications && typeof product.specifications === 'object' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="font-medium capitalize">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="text-muted-foreground">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No specifications available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ReviewSystem productId={product.id} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};