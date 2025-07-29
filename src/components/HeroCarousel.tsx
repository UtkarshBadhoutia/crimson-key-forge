import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import heroKeyboard1 from '@/assets/hero-keyboard-1.jpg';
import heroKeyboard2 from '@/assets/hero-keyboard-2.jpg';
import heroKeyboard3 from '@/assets/hero-keyboard-3.jpg';

const slides = [
  {
    id: 1,
    image: heroKeyboard1,
    title: "PRECISION REDEFINED",
    subtitle: "Pro Gaming Mechanical Keyboard",
    description: "Ultra-responsive switches with customizable RGB lighting for the ultimate gaming experience",
    cta: "EXPLORE NOW"
  },
  {
    id: 2,
    image: heroKeyboard2,
    title: "WIRELESS DOMINANCE",
    subtitle: "Hot-Swappable Gaming Board",
    description: "Freedom meets performance with hot-swap switches and 2.4GHz ultra-low latency",
    cta: "CUSTOMIZE"
  },
  {
    id: 3,
    image: heroKeyboard3,
    title: "ARTISAN CRAFTED",
    subtitle: "Limited Edition Series",
    description: "Hand-crafted keycaps with circuit-inspired designs and premium aluminum chassis",
    cta: "RESERVE"
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
          <div className="max-w-2xl animate-fade-in-scale">
            <div className="mb-4">
              <span className="text-primary font-mono text-sm tracking-wider uppercase">
                {slides[currentSlide].subtitle}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              {slides[currentSlide].description}
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="xl" className="group">
                {slides[currentSlide].cta}
                <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="gaming" size="xl">
                LEARN MORE
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