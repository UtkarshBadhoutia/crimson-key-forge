import { Shield, Zap, Users, Award, Headphones, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: "Ultra-Low Latency",
    description: "Professional-grade 1ms response time for competitive edge",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "3-Year Warranty",
    description: "Premium build quality backed by comprehensive coverage",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Pro Endorsed",
    description: "Trusted by 500+ esports professionals worldwide",
    color: "text-primary"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Multiple gaming industry awards for innovation",
    color: "text-primary"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert technical support whenever you need it",
    color: "text-primary"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on all orders above ₹5,000",
    color: "text-primary"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-carbon relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            WHY CHOOSE STRAFION
          </h2>
          <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto leading-relaxed">
            Born from the forge of competitive gaming, engineered for those who demand perfection in every click, every keystroke, every moment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group bg-card/50 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-crimson hover:transform hover:scale-105 animate-fade-in-scale"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                    <feature.icon className={`h-10 w-10 text-primary-foreground group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="font-orbitron font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground font-rajdhani text-lg leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-card/30 backdrop-blur-sm border border-primary/20 rounded-full px-8 py-4">
            <Award className="h-6 w-6 text-primary animate-glow-pulse" />
            <span className="font-rajdhani font-semibold text-foreground">
              Join 50,000+ satisfied gamers worldwide
            </span>
            <Award className="h-6 w-6 text-primary animate-glow-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};