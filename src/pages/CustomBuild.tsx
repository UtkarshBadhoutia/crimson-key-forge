import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Cpu, Palette, Zap } from 'lucide-react';

const CustomBuild = () => {
  const buildSteps = [
    {
      step: 1,
      title: "Choose Your Base",
      description: "Select your keyboard size and layout preference",
      options: ["60%", "65%", "75%", "TKL", "Full Size"]
    },
    {
      step: 2,
      title: "Select Switches",
      description: "Pick the perfect switch type for your playstyle",
      options: ["Linear", "Tactile", "Clicky", "Silent", "Speed"]
    },
    {
      step: 3,
      title: "Customize Keycaps",
      description: "Choose materials, colors, and artisan designs",
      options: ["ABS", "PBT", "Artisan", "Backlit", "Custom Print"]
    },
    {
      step: 4,
      title: "Add Features",
      description: "Select premium features and customizations",
      options: ["RGB Lighting", "Wireless", "OLED Display", "Rotary Encoder", "Custom Cable"]
    }
  ];

  const featuredBuilds = [
    {
      name: "Esports Elite",
      price: "$399",
      image: "/placeholder.svg",
      features: ["60% Layout", "Linear Switches", "Tournament Ready", "Ultra-lightweight"],
      description: "Optimized for competitive gaming with lightning-fast response"
    },
    {
      name: "Creator Pro",
      price: "$459",
      image: "/placeholder.svg",
      features: ["75% Layout", "Tactile Switches", "RGB Lighting", "Macro Keys"],
      description: "Perfect for content creators and productivity workflows"
    },
    {
      name: "Luxury Carbon",
      price: "$599",
      image: "/placeholder.svg",
      features: ["Full Size", "Premium Switches", "Carbon Fiber", "OLED Display"],
      description: "Ultimate premium build with carbon fiber construction"
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
              Custom Build Studio
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Design your perfect keyboard from the ground up. Every component, every detail, exactly how you want it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Settings className="w-4 h-4 mr-2" />
                Fully customizable
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Cpu className="w-4 h-4 mr-2" />
                Premium components
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Palette className="w-4 h-4 mr-2" />
                Unlimited designs
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Build Process */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Build Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {buildSteps.map((step, index) => (
              <Card key={index} className="text-center border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">{step.step}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.options.map((option, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs mr-1">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="px-8">
              <Zap className="w-5 h-5 mr-2" />
              Start Custom Build
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Featured Builds */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Custom Builds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBuilds.map((build, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative mb-6 overflow-hidden rounded-lg bg-accent/20">
                    <img 
                      src={build.image} 
                      alt={build.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-primary-foreground font-semibold text-sm">{build.price}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">{build.name}</h3>
                    <p className="text-muted-foreground text-sm">{build.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {build.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1" variant="outline">
                        Customize This Build
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

export default CustomBuild;