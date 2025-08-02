import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Zap, Gamepad2 } from 'lucide-react';

const Accessories = () => {
  const accessories = [
    {
      name: "Strafion Carbon Mousepad",
      price: "₹4,067",
      image: "/placeholder.svg",
      rating: 4.8,
      features: ["XXL Size", "Carbon Fiber", "Anti-slip", "RGB Edge"],
      description: "Premium carbon fiber mousepad with RGB lighting"
    },
    {
      name: "Strafion Wrist Rest Pro",
      price: "₹2,407",
      image: "/placeholder.svg",
      rating: 4.7,
      features: ["Memory Foam", "Ergonomic", "Anti-slip", "RGB"],
      description: "Ergonomic memory foam wrist support with RGB accents"
    },
    {
      name: "Strafion Cable Management",
      price: "₹1,577",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["Magnetic", "Adjustable", "RGB", "Cable Organizer"],
      description: "Magnetic cable management system for clean setups"
    },
    {
      name: "Strafion Gaming Glasses",
      price: "₹6,557",
      image: "/placeholder.svg",
      rating: 4.6,
      features: ["Blue Light Filter", "Anti-glare", "Lightweight", "UV Protection"],
      description: "Professional gaming glasses to reduce eye strain"
    },
    {
      name: "Strafion Phone Stand",
      price: "₹3,237",
      image: "/placeholder.svg",
      rating: 4.8,
      features: ["Adjustable", "RGB", "Wireless Charging", "Aluminum"],
      description: "Premium aluminum phone stand with wireless charging"
    },
    {
      name: "Strafion Cleaning Kit",
      price: "₹1,992",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["Complete Kit", "Safe Formula", "Microfiber", "Brush Set"],
      description: "Professional cleaning kit for gaming peripherals"
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
              Gaming Accessories
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Complete your gaming setup with premium accessories designed for performance and style.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Premium quality
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Performance focused
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Setup optimization
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessories.map((accessory, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative mb-6 overflow-hidden rounded-lg bg-accent/20">
                    <img 
                      src={accessory.image} 
                      alt={accessory.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-primary-foreground font-semibold text-sm">{accessory.price}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-foreground">{accessory.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-semibold">{accessory.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm">{accessory.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {accessory.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1" size="sm">
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

export default Accessories;