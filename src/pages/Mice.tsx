import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Target, Zap, Gamepad2 } from 'lucide-react';

const Mice = () => {
  const mice = [
    {
      name: "Strafion Viper Pro",
      price: "₹10,707",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["25,600 DPI", "Wireless", "RGB", "Ultra-light"],
      description: "Esports-grade wireless gaming mouse with precision tracking"
    },
    {
      name: "Strafion Striker",
      price: "₹7,387",
      image: "/placeholder.svg",
      rating: 4.8,
      features: ["16,000 DPI", "Wired", "RGB", "Ergonomic"],
      description: "Comfortable ergonomic design for extended gaming sessions"
    },
    {
      name: "Strafion Phantom",
      price: "₹13,197",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["30,000 DPI", "Wireless", "OLED", "Modular"],
      description: "Revolutionary modular mouse with swappable components"
    },
    {
      name: "Strafion Nano",
      price: "₹6,557",
      image: "/placeholder.svg",
      rating: 4.7,
      features: ["12,000 DPI", "Compact", "RGB", "Ambidextrous"],
      description: "Ultra-portable gaming mouse for on-the-go gamers"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-text bg-clip-text text-transparent">
              Gaming Mice
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Precision tracking and lightning-fast response times. Dominate every game with pixel-perfect accuracy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Target className="w-4 h-4 mr-2" />
                Pixel-perfect tracking
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Ultra-responsive
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Pro-level precision
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {mice.map((mouse, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative mb-6 overflow-hidden rounded-lg bg-accent/20">
                    <img 
                      src={mouse.image} 
                      alt={mouse.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-primary-foreground font-semibold text-sm">{mouse.price}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground">{mouse.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-semibold">{mouse.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{mouse.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {mouse.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1">
                        Add to Cart
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

export default Mice;