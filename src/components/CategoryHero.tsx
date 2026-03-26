import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureBadge {
  icon: LucideIcon;
  label: string;
}

interface CategoryHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  features: FeatureBadge[];
  productCount: number;
}

export const CategoryHero = ({ title, subtitle, backgroundImage, features, productCount }: CategoryHeroProps) => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      
      {/* Crimson Glow Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Animated accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4"
          >
            {productCount} Products Available
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="text-foreground">{title.split(' ')[0]}</span>{' '}
            <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {features.map((feature, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="px-5 py-2.5 text-sm bg-secondary/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
              >
                <feature.icon className="w-4 h-4 mr-2 text-primary" />
                {feature.label}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
