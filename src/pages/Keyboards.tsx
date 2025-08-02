import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Settings, Gamepad2, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';

const Keyboards = () => {
  const [keyboards, setKeyboards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchKeyboards();
  }, []);

  const fetchKeyboards = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'keyboards')
        .order('name');

      if (error) throw error;
      setKeyboards(data || []);
    } catch (error) {
      console.error('Error fetching keyboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading keyboards...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-text bg-clip-text text-transparent">
              Mechanical Keyboards
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Precision-engineered keyboards that give you the competitive edge. Every keystroke matters.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Ultra-responsive
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Settings className="w-4 h-4 mr-2" />
                Fully customizable
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Gaming optimized
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {keyboards.map((keyboard) => (
              <Card key={keyboard.id} className="group hover:shadow-glow transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative mb-6 overflow-hidden rounded-lg bg-accent/20">
                    <img 
                      src={keyboard.image_url || '/placeholder.svg'} 
                      alt={keyboard.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-primary-foreground font-semibold text-sm">₹{keyboard.price?.toLocaleString('en-IN')}</span>
                    </div>
                    {!keyboard.in_stock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground">{keyboard.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-semibold">{keyboard.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{keyboard.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {keyboard.features?.map((feature: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleAddToCart(keyboard.id)}
                        disabled={!keyboard.in_stock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {keyboard.in_stock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Keyboards;