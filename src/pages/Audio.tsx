import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Volume2, Headphones, Mic } from 'lucide-react';

const Audio = () => {
  const audioProducts = [
    {
      name: "Strafion Phoenix Headset",
      price: "₹16,517",
      image: "/placeholder.svg",
      rating: 4.9,
      features: ["7.1 Surround", "Noise Cancelling", "RGB", "Wireless"],
      description: "Premium wireless gaming headset with immersive surround sound"
    },
    {
      name: "Strafion Echo Pro",
      price: "₹12,367",
      image: "/placeholder.svg",
      rating: 4.8,
      features: ["Studio Quality", "Detachable Mic", "RGB", "Wired"],
      description: "Professional-grade headset for streamers and content creators"
    },
    {
      name: "Strafion Thunder Speakers",
      price: "₹7,387",
      image: "/placeholder.svg",
      rating: 4.7,
      features: ["2.1 System", "RGB", "Bluetooth", "Deep Bass"],
      description: "Powerful 2.1 speaker system with room-filling sound"
    },
    {
      name: "Strafion Pulse Earbuds",
      price: "₹10,707",
      image: "/placeholder.svg",
      rating: 4.8,
      features: ["True Wireless", "ANC", "Gaming Mode", "Low Latency"],
      description: "Premium wireless earbuds designed for mobile gaming"
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
              Gaming Audio
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Immersive audio experiences that put you in the center of the action. Hear every detail, feel every moment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Volume2 className="w-4 h-4 mr-2" />
                Immersive surround
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Headphones className="w-4 h-4 mr-2" />
                Studio quality
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Mic className="w-4 h-4 mr-2" />
                Crystal clear comms
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {audioProducts.map((product, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative mb-6 overflow-hidden rounded-lg bg-accent/20">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-primary-foreground font-semibold text-sm">{product.price}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
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

export default Audio;