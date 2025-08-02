import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Flame, ShoppingCart } from 'lucide-react';

export const LimitedTimeOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-primary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Offer Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Flame className="h-6 w-6 text-primary-foreground animate-bounce" />
            <Badge className="bg-primary-foreground text-primary font-orbitron font-bold text-lg px-6 py-2">
              FLASH SALE ACTIVE
            </Badge>
            <Flame className="h-6 w-6 text-primary-foreground animate-bounce" />
          </div>

          {/* Main Offer */}
          <h2 className="text-5xl md:text-7xl font-orbitron font-black text-primary-foreground mb-4">
            30% OFF
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-rajdhani font-bold text-primary-foreground mb-6">
            ALL MECHANICAL KEYBOARDS
          </h3>

          <p className="text-xl text-primary-foreground/90 font-rajdhani mb-8 max-w-2xl mx-auto">
            Limited stock available. Upgrade your gaming setup with premium mechanical switches and RGB lighting.
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Clock className="h-6 w-6 text-primary-foreground" />
            <span className="text-primary-foreground font-rajdhani font-semibold text-lg">ENDS IN:</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-10">
            {[
              { label: 'HRS', value: timeLeft.hours },
              { label: 'MIN', value: timeLeft.minutes },
              { label: 'SEC', value: timeLeft.seconds }
            ].map((unit, index) => (
              <div key={unit.label} className="flex items-center gap-2">
                <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-4 min-w-[80px]">
                  <div className="text-3xl font-orbitron font-bold text-primary-foreground">
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs font-rajdhani text-primary-foreground/70 font-semibold">
                    {unit.label}
                  </div>
                </div>
                {index < 2 && (
                  <div className="text-2xl font-bold text-primary-foreground animate-pulse">:</div>
                )}
              </div>
            ))}
          </div>

          {/* Stock indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-primary-foreground font-rajdhani font-semibold">
                Only 12 units left in stock
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="xl" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-rajdhani font-bold text-lg px-8 py-4 shadow-elevated hover:shadow-crimson transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              SHOP KEYBOARDS NOW
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-rajdhani font-semibold"
            >
              VIEW ALL DEALS
            </Button>
          </div>

          {/* Small print */}
          <p className="text-sm text-primary-foreground/60 font-rajdhani mt-6">
            *Offer valid while stocks last. Cannot be combined with other promotions.
          </p>
        </div>
      </div>
    </section>
  );
};