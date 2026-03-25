import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye, Zap } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getFeaturedProducts } from '@/data/products';
import { useNavigate } from 'react-router-dom';

export const FeaturedProducts = () => {
  const products = getFeaturedProducts().slice(0, 4);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-primary animate-glow-pulse" />
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              FEATURED DEALS
            </h2>
            <Zap className="h-8 w-8 text-primary animate-glow-pulse" />
          </div>
          <p className="text-xl text-muted-foreground font-rajdhani max-w-2xl mx-auto">
            Hand-picked premium gear with unbeatable performance and ratings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-crimson hover:transform hover:scale-105 animate-fade-in-scale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.rating >= 4.5 && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground font-rajdhani font-semibold">
                      TOP RATED
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="font-orbitron font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground font-rajdhani">
                      ({product.review_count})
                    </span>
                  </div>

                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs font-rajdhani border-primary/20 text-primary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="text-2xl font-orbitron font-bold text-primary">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button 
                  onClick={() => addToCart(product.id, 1)}
                  className="flex-1 font-rajdhani font-semibold"
                  variant="hero"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  ADD TO CART
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary/30 hover:bg-primary/10"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="gaming" 
            size="lg" 
            className="font-rajdhani font-semibold"
            onClick={() => navigate('/keyboards')}
          >
            VIEW ALL PRODUCTS
          </Button>
        </div>
      </div>
    </section>
  );
};
