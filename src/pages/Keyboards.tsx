import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Settings, Gamepad2 } from 'lucide-react';

const Keyboards = () => {
  const keyboards = [
    {
      name: "XTECH Apex Pro",
      price: "$299",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["Hot-swap", "RGB", "Wireless", "Tournament Ready"],
      description: "Professional esports mechanical keyboard with ultra-responsive switches"
    },
    {
      name: "XTECH Carbon Elite",
      price: "$249",
      image: "/placeholder.svg",
      rating: 4.8,
      features: ["Carbon Fiber", "RGB", "Macro Keys", "Anti-ghosting"],
      description: "Premium carbon fiber construction for ultimate durability"
    },
    {
      name: "XTECH Stealth",
      price: "$199",
      image: "/placeholder.svg",
      rating: 4.7,
      features: ["Silent Switches", "RGB", "Compact", "USB-C"],
      description: "Silent operation without compromising performance"
    },
    {
      name: "XTECH Thunder",
      price: "$349",
      image: "/placeholder.svg",
      rating: 5.0,
      features: ["OLED Display", "Hot-swap", "RGB", "Cloud Sync"],
      description: "Next-gen keyboard with integrated OLED display"
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
            {keyboards.map((keyboard, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative mb-6 overflow-hidden rounded-lg bg-accent/20">
                    <img 
                      src={keyboard.image} 
                      alt={keyboard.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-primary-foreground font-semibold text-sm">{keyboard.price}</span>
                    </div>
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
                      {keyboard.features.map((feature, idx) => (
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

export default Keyboards;