import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import heroKeyboard1 from '@/assets/hero-premium-1.jpg';
import heroKeyboard2 from '@/assets/hero-premium-2.jpg';
import heroKeyboard3 from '@/assets/hero-premium-3.jpg';

const slides = [
  {
    id: 1,
    image: heroKeyboard1,
    title: "FORGE YOUR LEGEND",
    subtitle: "Strafion Pro Series",
    description: "Precision-engineered mechanical switches with ultra-low 0.1ms latency for championship-level performance",
    cta: "SHOP NOW",
    price: "₹12,999",
    badge: "BESTSELLER"
  },
  {
    id: 2,
    image: heroKeyboard2,
    title: "WIRELESS REVOLUTION",
    subtitle: "Strafion Phantom Elite",
    description: "2.4GHz wireless technology with 100-hour battery life and hot-swappable switches",
    cta: "BUILD YOURS",
    price: "₹18,999",
    badge: "30% OFF"
  },
  {
    id: 3,
    image: heroKeyboard3,
    title: "TOURNAMENT READY",
    subtitle: "Strafion Championship Edition",
    description: "Tournament-approved gear trusted by 500+ esports professionals worldwide",
    cta: "JOIN PROS",
    price: "₹24,999",
    badge: "PRO CHOICE"
  }
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-carbon">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl animate-fade-in-scale">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2">
                <span className="text-primary font-orbitron text-sm font-bold tracking-wider uppercase">
                  {slides[currentSlide].badge}
                </span>
              </div>
              <span className="text-primary font-rajdhani text-sm tracking-wider uppercase">
                {slides[currentSlide].subtitle}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-orbitron font-black mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl leading-relaxed font-rajdhani">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="text-3xl font-orbitron font-bold text-primary">
                Starting {slides[currentSlide].price}
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-muted-foreground font-rajdhani">
                Free shipping • 3-year warranty
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="group font-rajdhani font-bold text-lg px-8 py-4"
                onClick={() => window.location.href = '/keyboards'}
              >
                {slides[currentSlide].cta}
                <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="gaming" 
                size="xl" 
                className="font-rajdhani font-semibold"
                onClick={() => window.open('https://www.youtube.com/results?search_query=mechanical+keyboard+review', '_blank')}
              >
                WATCH REVIEW
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="bg-black/20 hover:bg-primary/20 border border-primary/30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-primary' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="bg-black/20 hover:bg-primary/20 border border-primary/30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Auto-play toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-8 right-8 z-20 text-white/70 hover:text-primary transition-colors"
      >
        <Play className={`h-6 w-6 ${isAutoPlaying ? 'animate-pulse' : ''}`} />
      </button>
    </div>
  );
};