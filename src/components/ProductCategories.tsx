import { Button } from '@/components/ui/button';
import { Keyboard, Mouse, Headphones, Gamepad2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'keyboards',
    title: 'Mechanical Keyboards',
    description: 'Premium switches, RGB lighting, and endless customization',
    icon: Keyboard,
    features: ['Hot-swappable switches', 'RGB per-key lighting', 'Programmable macros'],
    gradient: 'from-primary/20 to-transparent'
  },
  {
    id: 'mice',
    title: 'Gaming Mice',
    description: 'Precision sensors and ergonomic designs for competitive edge',
    icon: Mouse,
    features: ['25,600 DPI sensor', 'Ultra-light design', 'Customizable weights'],
    gradient: 'from-accent/20 to-transparent'
  },
  {
    id: 'audio',
    title: 'Audio Gear',
    description: 'Crystal-clear sound and noise isolation for immersive gaming',
    icon: Headphones,
    features: ['7.1 surround sound', 'Active noise canceling', 'Detachable mic'],
    gradient: 'from-primary/15 to-transparent'
  },
  {
    id: 'accessories',
    title: 'Gaming Accessories',
    description: 'Complete your setup with premium cables and tools',
    icon: Gamepad2,
    features: ['Artisan keycaps', 'Custom cables', 'Switch pullers'],
    gradient: 'from-accent/15 to-transparent'
  }
];

export const ProductCategories = () => {
  return (
    <section className="py-24 bg-gradient-carbon relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(0 84% 60% / 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(0 84% 60% / 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Precision Engineered
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our complete ecosystem of gaming peripherals designed for peak performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-crimson"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                      <category.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {category.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button variant="gaming" className="group/btn" asChild>
                      <Link to={`/${category.id}`}>
                        Explore Collection
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};